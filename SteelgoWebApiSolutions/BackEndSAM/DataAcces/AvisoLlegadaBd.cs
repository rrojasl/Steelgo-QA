using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DatabaseManager.Sam3;
using DatabaseManager.EntidadesPersonalizadas;
using BackEndSAM.Utilities;
using System.Web.Script.Serialization;
using BackEndSAM.Models;
using SecurityManager.Api.Models;
using BackEndSAM.Utilities;
using System.Web.Mvc;
using System.Net.Http;
using System.Net;
using System.IO;
using System.Net.Http.Headers;

namespace BackEndSAM.DataAcces
{
    public class AvisoLlegadaBd
    {
        private static readonly object _mutex = new object();
        private static AvisoLlegadaBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private AvisoLlegadaBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static AvisoLlegadaBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new AvisoLlegadaBd();
                    }
                }
                return _instance;
            }
        }

        public object GenerarAvisoLlegada(AvisoLlegadaJson avisoJson, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    //Buscamos el folio maximo en los avisos de Legada
                    int? nuevoFolio;

                    if (ctx.Sam3_FolioAvisoLlegada.Any())
                    {
                        nuevoFolio = ctx.Sam3_FolioAvisoLlegada.Select(x => x.Consecutivo).Max();
                    }
                    else
                    {
                        nuevoFolio = 0;
                    }

                    if (nuevoFolio > 0)
                    {
                        nuevoFolio = nuevoFolio + 1;
                    }
                    else
                    {
                        nuevoFolio = 1;
                    }

                    DateTime temp = new DateTime();
                    DateTime.TryParse(avisoJson.FechaRecepcion, out temp);

                    //asignamos campos al nueva aviso de llegada
                    Sam3_FolioAvisoLlegada nuevoAvisoLlegada = new Sam3_FolioAvisoLlegada();
                    nuevoAvisoLlegada.Activo = true;
                    nuevoAvisoLlegada.ChoferID = avisoJson.Chofer[0].ChoferID;
                    nuevoAvisoLlegada.Consecutivo = nuevoFolio;
                    nuevoAvisoLlegada.Estatus = "Generado";
                    nuevoAvisoLlegada.EsVirtual = false;
                    nuevoAvisoLlegada.PaseSalidaEnviado = false;
                    nuevoAvisoLlegada.PatioID = avisoJson.Patio[0].PatioID;
                    nuevoAvisoLlegada.TransportistaID = avisoJson.Transportista[0].TransportistaID;
                    nuevoAvisoLlegada.FechaRecepcion = Convert.ToDateTime(avisoJson.FechaRecepcion);
                    nuevoAvisoLlegada.UsuarioModificacion = usuario.UsuarioID;
                    nuevoAvisoLlegada.FechaModificacion = DateTime.Now;
                    nuevoAvisoLlegada.VehiculoID = avisoJson.Tracto.VehiculoID != null ? Convert.ToInt32(avisoJson.Tracto.VehiculoID) : 0;
                    nuevoAvisoLlegada.ClienteID = avisoJson.Cliente.ClienteID != string.Empty || avisoJson.Cliente.ClienteID != "-1"
                        ? Convert.ToInt32(avisoJson.Cliente.ClienteID) : 0;
                    nuevoAvisoLlegada.TipoAvisoID = avisoJson.TipoAviso.TipoAvisoID != null ? Convert.ToInt32(avisoJson.TipoAviso.TipoAvisoID) : 0;
                    //Guardamos los cambios
                    ctx.Sam3_FolioAvisoLlegada.Add(nuevoAvisoLlegada);
                    ctx.SaveChanges();

                    int nuevoID = nuevoAvisoLlegada.FolioAvisoLlegadaID;

                    //guardamos en la relacion entre folios y proyectos
                    List<int> lstProyectos = avisoJson.Proyectos.Select(x => x.ProyectoID).Distinct().ToList();
                    foreach (int proyectoId in lstProyectos)
                    {
                        Sam3_Rel_FolioAvisoLlegada_Proyecto avisoProyecto = new Sam3_Rel_FolioAvisoLlegada_Proyecto();
                        avisoProyecto.Activo = true;
                        avisoProyecto.FolioAvisoLlegadaID = nuevoID;
                        avisoProyecto.ProyectoID = proyectoId;
                        avisoProyecto.UsuarioModificacion = usuario.UsuarioID;
                        avisoProyecto.FechaModificacion = DateTime.Now;

                        ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto.Add(avisoProyecto);
                    }

                    //Guardamos en la relacion de Avisos y planas
                    foreach (PlanaAV plana in avisoJson.Plana)
                    {
                        if (plana.PlanaID > 0)
                        {
                            Sam3_Rel_FolioAvisoLlegada_Vehiculo nuevaPlana = new Sam3_Rel_FolioAvisoLlegada_Vehiculo();
                            nuevaPlana.Activo = true;
                            nuevaPlana.FolioAvisoLlegadaID = nuevoID;
                            nuevaPlana.VehiculoID = plana.PlanaID;
                            nuevaPlana.UsuarioModificacion = usuario.UsuarioID;
                            nuevaPlana.FechaModificacion = DateTime.Now;

                            ctx.Sam3_Rel_FolioAvisoLlegada_Vehiculo.Add(nuevaPlana);
                        }
                    }

                    //guardamos todos los cambios pendientes
                    ctx.SaveChanges();

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("Ok");
                    result.ReturnMessage.Add(nuevoAvisoLlegada.FolioAvisoLlegadaID.ToString());
                    result.ReturnCode = 200;
                    result.ReturnStatus = true;
                    result.IsAuthenicated = true;

                    return result;
                }
            }
            catch (Exception ex)
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object ObtenerListadoAvisoLlegada(FiltrosJson filtros, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<int> lstFoliosAvisoLlegada = new List<int>();
                    DateTime fechaInicial = new DateTime();
                    DateTime fechaFinal = new DateTime();
                    DateTime.TryParse(filtros.FechaInicial, out fechaInicial);
                    DateTime.TryParse(filtros.FechaFinal, out fechaFinal);

                    List<int> patiosUsuario;
                    List<int> proyectosUsuario;
                    UsuarioBd.Instance.ObtenerPatiosYProyectosDeUsuario(usuario.UsuarioID, out proyectosUsuario, out patiosUsuario);

                    if (fechaFinal.ToShortDateString() == "1/1/0001")
                    {
                        fechaFinal = DateTime.Now;
                    }

                    if (fechaInicial.ToShortDateString() == "1/1/0001")
                    {
                        int mes = DateTime.Now.Month != 1 ? DateTime.Now.Month - 1 : 12;
                        int year = DateTime.Now.Month == 1 ? DateTime.Now.Year - 1 : DateTime.Now.Year;
                        fechaInicial = new DateTime(year, mes, DateTime.Now.Day);
                    }

                    int folioLlegadaID = filtros.FolioLlegadaID != null ? Convert.ToInt32(filtros.FolioLlegadaID) : 0;
                    int folioAvisoLlegadaID = filtros.FolioAvisoLlegadaID != null ? Convert.ToInt32(filtros.FolioAvisoLlegadaID) : 0;

                    //List<int> proyectos = filtros.Proyectos.Where(x => x.ProyectoID > 0).Select(x => x.ProyectoID).ToList();
                    //List<int> patios = filtros.Patio.Where(x => x.PatioID > 0).Select(x => x.PatioID).ToList();

                    if (folioLlegadaID > 0)
                    {
                        lstFoliosAvisoLlegada = (from r in ctx.Sam3_FolioAvisoEntrada
                                                 join a in ctx.Sam3_FolioAvisoLlegada on r.FolioAvisoLlegadaID equals a.FolioAvisoLlegadaID
                                                 where r.FolioAvisoEntradaID == folioLlegadaID
                                                 && r.Activo == true
                                                 && (a.FechaRecepcion >= fechaInicial && a.FechaRecepcion <= fechaFinal)
                                                 select a.FolioAvisoLlegadaID).AsParallel().ToList();
                    }
                    else
                    {
                        List<Sam3_FolioAvisoLlegada> result = new List<Sam3_FolioAvisoLlegada>();
                        if (fechaInicial != null && fechaFinal != null)
                        {
                            result = (from r in ctx.Sam3_FolioAvisoLlegada
                                      join p in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on r.FolioAvisoLlegadaID equals p.FolioAvisoLlegadaID
                                      where r.Activo == true && p.Activo
                                      && patiosUsuario.Contains(r.PatioID)
                                      && proyectosUsuario.Contains(p.ProyectoID)
                                      && r.FechaRecepcion >= fechaInicial && r.FechaRecepcion <= fechaFinal
                                      select r).AsParallel().ToList();
                                
                                //ctx.Sam3_FolioAvisoLlegada
                                //.Where(x => x.FechaRecepcion >= fechaInicial && x.FechaRecepcion <= fechaFinal && x.Activo.Value == true).ToList();

                        }
                        else
                        {
                            if (fechaInicial != null)
                            {
                                result = ctx.Sam3_FolioAvisoLlegada.Where(x => x.FechaRecepcion >= fechaInicial).ToList();
                            }

                            if (fechaFinal != null)
                            {
                                result = ctx.Sam3_FolioAvisoLlegada.Where(x => x.FechaRecepcion <= fechaFinal).ToList();
                            }
                        }

                        if (result.Count > 0)
                        {
                            int temp = 0;

                            if (folioAvisoLlegadaID > 0)
                            {
                                result = result.Where(x => x.FolioAvisoLlegadaID == folioAvisoLlegadaID).ToList();
                            }

                            if (filtros.PatioID != "" && Convert.ToInt32(filtros.PatioID) > 0)
                            {
                                temp = Convert.ToInt32(filtros.PatioID);
                                result = result.Where(x => x.PatioID == temp).ToList();
                            }

                            if (filtros.ClienteID != "" && Convert.ToInt32(filtros.ClienteID) > 0)
                            {
                                temp = Convert.ToInt32(filtros.ClienteID);
                                result = result.Where(x => x.ClienteID == temp).ToList();
                            }
                        }
                        else
                        {
                            int temp = 0;
                            if (folioAvisoLlegadaID > 0)
                            {
                                result = ctx.Sam3_FolioAvisoLlegada.Where(x => x.FolioAvisoLlegadaID == folioAvisoLlegadaID).ToList();
                            }

                            if (filtros.PatioID != "" && Convert.ToInt32(filtros.PatioID) > 0)
                            {
                                temp = Convert.ToInt32(filtros.PatioID);
                                if (result.Count > 0)
                                {
                                    result = result.Where(x => x.PatioID == temp).ToList();
                                }
                                else
                                {
                                    result = ctx.Sam3_FolioAvisoLlegada.Where(x => x.PatioID == temp).ToList();
                                }
                            }

                            if (filtros.ClienteID != "" && Convert.ToInt32(filtros.ClienteID) > 0)
                            {
                                temp = Convert.ToInt32(filtros.ClienteID);

                                if (result.Count > 0)
                                {
                                    result = result.Where(x => x.ClienteID == temp).ToList();
                                }
                                else
                                {
                                    result = ctx.Sam3_FolioAvisoLlegada.Where(x => x.ClienteID == temp).AsParallel().ToList();
                                }
                            }
                        }

                        //Filtros Rapidos

                        if (filtros.Completos)
                        {
                            if (result.Count > 0)
                            {
                                result = (from r in result
                                          join p in ctx.Sam3_PermisoAduana on r.FolioAvisoLlegadaID equals p.FolioAvisoLlegadaID
                                          where p.PermisoAutorizado == true
                                          select r).AsParallel().ToList();
                            }
                            else
                            {
                                result = (from r in ctx.Sam3_FolioAvisoLlegada
                                          join p in ctx.Sam3_PermisoAduana on r.FolioAvisoLlegadaID equals p.FolioAvisoLlegadaID
                                          where r.Activo == true && p.PermisoAutorizado == true
                                          select r).AsParallel().ToList();
                            }
                        }

                        if (filtros.SinAutorizacion)
                        {
                            if (result.Count > 0)
                            {
                                result = (from r in result
                                          join p in ctx.Sam3_PermisoAduana on r.FolioAvisoLlegadaID equals p.FolioAvisoLlegadaID
                                          where r.Activo == true && p.PermisoAutorizado == false
                                          select r).AsParallel().ToList();

                            }
                            else
                            {
                                result = (from r in ctx.Sam3_FolioAvisoLlegada
                                          join p in ctx.Sam3_PermisoAduana on r.FolioAvisoLlegadaID equals p.FolioAvisoLlegadaID
                                          where r.Activo == true && p.PermisoAutorizado == false
                                          select r).AsParallel().ToList();
                            }
                        }

                        if (filtros.SinPermiso)
                        {
                            if (result.Count > 0)
                            {
                                result = (from r in result
                                          where r.Activo == true
                                          && !(from x in ctx.Sam3_PermisoAduana select x.FolioAvisoLlegadaID).Contains(r.FolioAvisoLlegadaID)
                                          select r).AsParallel().ToList();
                            }
                            else
                            {
                                result = (from r in ctx.Sam3_FolioAvisoLlegada
                                          where r.Activo == true
                                          && !(from x in ctx.Sam3_PermisoAduana select x.FolioAvisoLlegadaID).Contains(r.FolioAvisoLlegadaID)
                                          select r).AsParallel().ToList();
                            }
                        }

                        result = result.GroupBy(x => x.FolioAvisoLlegadaID).Select(x => x.First()).ToList(); 

                        lstFoliosAvisoLlegada = result.Select(x => x.FolioAvisoLlegadaID).ToList();

                    }

                    List<ElementoListadoFolioAvisoLlegada> resultados = new List<ElementoListadoFolioAvisoLlegada>();
                    ElementoListadoFolioAvisoLlegada elemento = new ElementoListadoFolioAvisoLlegada();
                    foreach (int folio in lstFoliosAvisoLlegada)
                    {
                        int proyectoId = ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto.Where(x => x.FolioAvisoLlegadaID == folio)
                            .Select(x => x.ProyectoID).FirstOrDefault();

                        if (ctx.Sam3_PermisoAduana.Where(x => x.FolioAvisoLlegadaID == folio).Any())
                        {
                            Sam3_FolioAvisoLlegada temp = (from r in ctx.Sam3_FolioAvisoLlegada
                                        join p in ctx.Sam3_PermisoAduana on r.FolioAvisoLlegadaID equals p.FolioAvisoLlegadaID
                                        where r.Activo == true
                                        && r.FolioAvisoLlegadaID == folio
                                        select r).AsParallel().SingleOrDefault();

                            string fechaR = temp.FechaRecepcion.HasValue ? temp.FechaRecepcion.Value.ToString("dd/MM/yyyy") : string.Empty;
                            string fechag = temp.Sam3_PermisoAduana.Select(x => x.FechaGeneracion).SingleOrDefault().HasValue ?
                                temp.Sam3_PermisoAduana.Select(x => x.FechaGeneracion).SingleOrDefault().Value.ToString("dd/MM/yyyy") 
                                : string.Empty;

                            elemento = new ElementoListadoFolioAvisoLlegada
                            {
                                FolioAvisoLlegadaID = temp.FolioAvisoLlegadaID.ToString(),
                                FechaGeneracion = fechag,
                                FechaRecepcion = fechaR
                            };
                        }
                        else
                        {
                            Sam3_FolioAvisoLlegada temp = (from r in ctx.Sam3_FolioAvisoLlegada
                                                           where r.Activo == true
                                                           && r.FolioAvisoLlegadaID == folio
                                                           select r).AsParallel().SingleOrDefault();

                            string fechaR = temp.FechaRecepcion.HasValue ? temp.FechaRecepcion.Value.ToString("dd/MM/yyyy") : string.Empty;

                            elemento = new ElementoListadoFolioAvisoLlegada
                            {
                                FolioAvisoLlegadaID = temp.FolioAvisoLlegadaID.ToString(),
                                FechaGeneracion = string.Empty,
                                FechaRecepcion = fechaR
                            };

                        }


                        if (elemento != null)
                        {
                            resultados.Add(elemento);
                        }

                    }

                    return resultados;
                }
            }
            catch (Exception ex)
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object ObtenerAvisoLlegadaPorID(int avisoLlegadaID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    AvisoLlegadaJson aviso = new AvisoLlegadaJson();
                    Sam3_FolioAvisoLlegada registroBd = ctx.Sam3_FolioAvisoLlegada.Where(x =>
                        x.FolioAvisoLlegadaID == avisoLlegadaID && x.Activo)
                        .AsParallel().SingleOrDefault();
                    //agregamos el listado de archivos del aviso de llegada
                    aviso.Archivos = (from r in ctx.Sam3_Rel_FolioAvisoLlegada_Documento
                                      join t in ctx.Sam3_TipoArchivo on r.TipoArchivoID equals t.TipoArchivoID
                                      where r.Activo && r.FolioAvisoLlegadaID == registroBd.FolioAvisoLlegadaID
                                      select new ArchivosAV
                                      {
                                          ArchivoID = r.DocumentoID,
                                          Extension = r.Extencion,
                                          Nombre = r.Nombre,
                                          Url = r.Url,
                                          TipoArchivo = t.Nombre
                                      }).ToList();

                    //agregamog los choferes
                    aviso.Chofer = (from r in ctx.Sam3_Chofer
                                    where r.ChoferID == registroBd.ChoferID && r.Activo
                                    select new ChoferAV { ChoferID = r.ChoferID, Nombre = r.Nombre }).AsParallel().ToList();

                    aviso.FechaRecepcion = registroBd.FechaRecepcion.ToString();
                    aviso.FolioAvisoLlegadaID = registroBd.FolioAvisoLlegadaID;
                    aviso.Estatus = registroBd.Estatus;

                    TractoAV tractoBd = (from r in ctx.Sam3_Vehiculo
                                         where r.Activo
                                         && r.VehiculoID == registroBd.VehiculoID
                                         select new TractoAV
                                         {
                                             VehiculoID = r.VehiculoID.ToString(),
                                             Placas = r.Placas
                                         }).AsParallel().SingleOrDefault();

                    aviso.Tracto = tractoBd != null ? tractoBd : new TractoAV { VehiculoID = "0", Placas = string.Empty };



                    TipoAvisoAV tipoAvisoBD = (from r in ctx.Sam3_TipoAviso
                                               where r.TipoAvisoID == registroBd.TipoAvisoID
                                               select new TipoAvisoAV
                                               {
                                                   Nombre = r.Nombre,
                                                   TipoAvisoID = r.TipoAvisoID.ToString()
                                               }).AsParallel().SingleOrDefault();

                    aviso.TipoAviso = tipoAvisoBD != null ? tipoAvisoBD : new TipoAvisoAV { Nombre = string.Empty, TipoAvisoID = "0" };

                    int clienteId = registroBd.ClienteID.Value;

                    aviso.Cliente = (Models.Cliente)ClienteBd.Instance.ObtnerElementoClientePorID(clienteId);

                    //agregamos los patios
                    aviso.Patio = (from r in ctx.Sam3_Patio
                                   where r.PatioID == registroBd.PatioID && r.Activo
                                   select new PatioAV
                                   {
                                       Nombre = r.Nombre,
                                       PatioID = r.PatioID,
                                       RequierePermisoAduana = r.RequierePermisoAduana
                                   }).AsParallel().ToList();

                    //agregar permisos de aduana
                    //primero obtenemos los archivos de permisos de aduana
                    List<Sam3_PermisoAduana> lstpermisosAduana = ctx.Sam3_PermisoAduana
                        .Where(x => x.FolioAvisoLlegadaID == registroBd.FolioAvisoLlegadaID && x.Activo)
                        .AsParallel().ToList();

                    foreach (Sam3_PermisoAduana p in lstpermisosAduana)
                    {
                        //List<ArchivoAutorizadoAV> lstarchivosPermisoAduana = (from r in ctx.Sam3_Rel_PermisoAduana_Documento
                        //                                                      where r.PermisoAduanaID == p.PermisoAduanaID && r.Activo
                        //                                                      select new ArchivoAutorizadoAV
                        //                                                      {
                        //                                                          ArchivoID = r.DocumentoID,
                        //                                                          Extension = r.Extencion,
                        //                                                          Nombre = r.Nombre
                        //                                                      }).AsParallel().ToList();

                        aviso.PermisoAduana.Add(new PermisoAduanaAV
                        {
                            NumeroPermiso = p.NumeroPermiso.ToString(),
                            PermisoAutorizado = p.PermisoAutorizado,
                            PermisoTramite = p.PermisoTramite,
                            FechaAutorizacion = p.FechaAutorización.ToString(),
                            FechaGeneracion = p.FechaGeneracion.ToString()
                        });
                    }

                    if (aviso.PermisoAduana.Count <= 0)
                    {
                        aviso.PermisoAduana.Add(new PermisoAduanaAV
                        {
                            NumeroPermiso = string.Empty,
                            PermisoAutorizado = false,
                            PermisoTramite = false,
                            FechaAutorizacion = string.Empty,
                            FechaGeneracion = string.Empty
                        });
                    }

                    aviso.Plana = (from r in ctx.Sam3_Vehiculo
                                   join p in ctx.Sam3_Rel_FolioAvisoLlegada_Vehiculo on r.VehiculoID equals p.VehiculoID
                                   where (p.FolioAvisoLlegadaID == registroBd.FolioAvisoLlegadaID)
                                   select new PlanaAV
                                   {
                                       PlanaID = r.VehiculoID
                                   }).AsParallel().ToList();

                    aviso.Proyectos = (from r in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto
                                       where r.FolioAvisoLlegadaID == registroBd.FolioAvisoLlegadaID && r.Activo
                                       select new ProyectosAV
                                       {
                                           ProyectoID = r.ProyectoID
                                       }).AsParallel().ToList();

                    aviso.Transportista = (from r in ctx.Sam3_Transportista
                                           where r.TransportistaID == registroBd.TransportistaID && r.Activo
                                           select new TransportistaAV
                                           {
                                               Nombre = r.Nombre,
                                               TransportistaID = r.TransportistaID
                                           }).AsParallel().ToList();

                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    string json = serializer.Serialize(aviso);

                    return aviso;
                }
            }
            catch (Exception ex)
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object EliminarAvisoLlegada(int avisoLlegadaID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_FolioAvisoLlegada aviso = ctx.Sam3_FolioAvisoLlegada.Where(x => x.FolioAvisoLlegadaID == avisoLlegadaID)
                        .AsParallel().SingleOrDefault();


                    aviso.Activo = false;
                    aviso.UsuarioModificacion = usuario.UsuarioID;
                    aviso.FechaModificacion = DateTime.Now;

                    ctx.SaveChanges();

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("Ok");
                    result.ReturnCode = 200;
                    result.ReturnStatus = false;
                    result.IsAuthenicated = true;

                    return result;
                }
            }
            catch (Exception ex)
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object ActualizarAvisoLlegada(AvisoLlegadaJson cambios, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_FolioAvisoLlegada avisoBd = ctx.Sam3_FolioAvisoLlegada.Where(x => x.FolioAvisoLlegadaID == cambios.FolioAvisoLlegadaID)
                        .AsParallel().SingleOrDefault();
                    if (avisoBd != null)
                    {
                        //modificamos los parametros generales
                        avisoBd.Activo = true;
                        avisoBd.ChoferID = cambios.Chofer[0].ChoferID;
                        avisoBd.FechaModificacion = DateTime.Now;
                        avisoBd.FechaRecepcion = Convert.ToDateTime(cambios.FechaRecepcion);
                        avisoBd.PatioID = cambios.Patio[0].PatioID;
                        avisoBd.TransportistaID = cambios.Transportista[0].TransportistaID;
                        avisoBd.UsuarioModificacion = usuario.UsuarioID;
                        avisoBd.VehiculoID = cambios.Tracto.VehiculoID != null ? Convert.ToInt32(cambios.Tracto.VehiculoID) : 0;
                        avisoBd.ClienteID = cambios.Cliente.ClienteID != string.Empty || cambios.Cliente.ClienteID != "-1"
                            ? Convert.ToInt32(cambios.Cliente.ClienteID) : 0;
                        avisoBd.TipoAvisoID = cambios.TipoAviso.TipoAvisoID != null ? Convert.ToInt32(cambios.TipoAviso.TipoAvisoID) : 0;
                        avisoBd.PaseSalidaEnviado = cambios.PaseSalidaEnviado;

                        //Actualizar informacion de las planas
                        foreach (PlanaAV plana in cambios.Plana)
                        {
                            if (!avisoBd.Sam3_Rel_FolioAvisoLlegada_Vehiculo
                                .Where(x => x.VehiculoID == plana.PlanaID && x.FolioAvisoLlegadaID == cambios.FolioAvisoLlegadaID).Any()) // varificamos si existe la plana
                            {
                                //agregamos una nuevo registro a la relacion de aviso y planas
                                Sam3_Rel_FolioAvisoLlegada_Vehiculo nuevoRegistro = new Sam3_Rel_FolioAvisoLlegada_Vehiculo();
                                nuevoRegistro.Activo = true;
                                nuevoRegistro.FechaModificacion = DateTime.Now;
                                nuevoRegistro.FolioAvisoLlegadaID = avisoBd.FolioAvisoLlegadaID;
                                nuevoRegistro.VehiculoID = plana.PlanaID;
                                nuevoRegistro.UsuarioModificacion = usuario.UsuarioID;

                                ctx.Sam3_Rel_FolioAvisoLlegada_Vehiculo.Add(nuevoRegistro);
                            }
                        }

                        //actualizar la información de los documentos de Aviso de llegada
                        foreach (ArchivosAV archivo in cambios.Archivos)
                        {
                            //verificamos si ya existe el archivo actual
                            if (!ctx.Sam3_Rel_FolioAvisoLlegada_Documento
                                .Where(x => x.Rel_FolioAvisoLlegada_DocumentoID == archivo.ArchivoID 
                                    && x.FolioAvisoLlegadaID == avisoBd.FolioAvisoLlegadaID).Any())
                            {
                                //si el archivo no existe, agregamos uno nuevo
                                Sam3_Rel_FolioAvisoLlegada_Documento nuenoDoc = new Sam3_Rel_FolioAvisoLlegada_Documento();
                                nuenoDoc.Activo = true;
                                nuenoDoc.DocumentoID = archivo.ArchivoID;
                                nuenoDoc.Extencion = archivo.Extension;
                                nuenoDoc.FechaModificacion = DateTime.Now;
                                nuenoDoc.FolioAvisoLlegadaID = avisoBd.FolioAvisoLlegadaID;
                                nuenoDoc.Nombre = archivo.Nombre;
                                nuenoDoc.UsuarioModificacion = usuario.UsuarioID;

                                ctx.Sam3_Rel_FolioAvisoLlegada_Documento.Add(nuenoDoc);
                            }
                        }

                        foreach (ProyectosAV proyecto in cambios.Proyectos)
                        {
                            //verificamos si existe el registro
                            if (!ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto.Where(x => x.ProyectoID == proyecto.ProyectoID
                                && x.FolioAvisoLlegadaID == cambios.FolioAvisoLlegadaID).Any())
                            {
                                Sam3_Rel_FolioAvisoLlegada_Proyecto nuevoProyecto = new Sam3_Rel_FolioAvisoLlegada_Proyecto();
                                nuevoProyecto.Activo = true;
                                nuevoProyecto.FechaModificacion = DateTime.Now;
                                nuevoProyecto.FolioAvisoLlegadaID = cambios.FolioAvisoLlegadaID;
                                nuevoProyecto.ProyectoID = proyecto.ProyectoID;
                                nuevoProyecto.UsuarioModificacion = usuario.UsuarioID;

                                ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto.Add(nuevoProyecto);
                            }
                        }

                        avisoBd.UsuarioModificacion = usuario.UsuarioID;
                        avisoBd.FechaModificacion = DateTime.Now;

                        ctx.SaveChanges();

                    }

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("Ok");
                    result.ReturnCode = 200;
                    result.ReturnStatus = false;
                    result.IsAuthenicated = true;

                    return result;
                }
            }
            catch (Exception ex)
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object ObtenerListadoFoliosParaFiltro()
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<ListaCombos> lstFolios = (from r in ctx.Sam3_FolioAvisoLlegada
                                                   where r.Activo
                                                   select new ListaCombos
                                                  {
                                                      id = r.FolioAvisoLlegadaID.ToString(),
                                                      value = r.Consecutivo.ToString()
                                                  }).AsParallel().ToList();

                    return lstFolios;
                }
            }
            catch (Exception ex)
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object ObtenerListadoFoliosRequierePermiso()
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<ListaCombos> lstFolios = (from r in ctx.Sam3_FolioAvisoLlegada
                                                   join p in ctx.Sam3_Patio on r.PatioID equals p.PatioID
                                                   join pe in ctx.Sam3_PermisoAduana on r.FolioAvisoLlegadaID equals pe.FolioAvisoLlegadaID  
                                                   where r.Activo && p.RequierePermisoAduana && pe.Activo 
                                                   select new ListaCombos
                                                   {
                                                       id = r.FolioAvisoLlegadaID.ToString(),
                                                       value = r.Consecutivo.ToString()
                                                   }).AsParallel().ToList();

                    return lstFolios;
                }
            }
            catch (Exception ex)
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object VerificarPermisoAduana(int folioAvisoLlegadaID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    bool permisoAutorizado = (from r in ctx.Sam3_FolioAvisoLlegada
                                              join p in ctx.Sam3_PermisoAduana on r.FolioAvisoLlegadaID equals p.FolioAvisoLlegadaID
                                              where r.FolioAvisoLlegadaID == folioAvisoLlegadaID && p.PermisoAutorizado == true
                                              select p.PermisoAduanaID).AsParallel().Any();

                    return permisoAutorizado;
                }
            }
            catch (Exception ex)
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object VerificarDocumentoAduana(int folioAvisoLlegadaID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    DocumentoPermisoAduana permiso = (from r in ctx.Sam3_PermisoAduana
                                                      join d in ctx.Sam3_Rel_PermisoAduana_Documento on r.PermisoAduanaID equals d.PermisoAduanaID
                                                      join p in ctx.Sam3_PermisoAduana on d.PermisoAduanaID equals p.PermisoAduanaID
                                                      where r.FolioAvisoLlegadaID == folioAvisoLlegadaID && r.Activo && d.Activo
                                                      select new DocumentoPermisoAduana
                                                      {
                                                          DocumentoID = d.Rel_Permiso_Documento_ID.ToString(),
                                                          NumeroPermiso = p.NumeroPermiso.ToString(),
                                                          PermisoAutorizado = p.PermisoAutorizado,
                                                          Url = d.Url
                                  
                                                      }).AsParallel().SingleOrDefault();

                   
                    return permiso;
                }
            }
            catch (Exception ex)
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

    }//Fin Clase
}