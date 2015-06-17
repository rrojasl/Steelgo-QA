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
                    AvisoLlegadaJson jsonAvisoLlegada = new AvisoLlegadaJson();

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

                    //asignamos campos al nueva aviso de llegada
                    Sam3_FolioAvisoLlegada nuevoAvisoLlegada = new Sam3_FolioAvisoLlegada();
                    nuevoAvisoLlegada.Activo = true;
                    nuevoAvisoLlegada.CamionID = ctx.Sam3_Plana.Where(x => x.PlanaID == jsonAvisoLlegada.Plana[0].PlanaID)
                        .Select(x => x.CamionID).SingleOrDefault();
                    nuevoAvisoLlegada.ChoferID = jsonAvisoLlegada.Chofer[0].ChoferID;
                    nuevoAvisoLlegada.Consecutivo = nuevoFolio;
                    nuevoAvisoLlegada.Estatus = "Creado";
                    nuevoAvisoLlegada.EsVirtual = false;
                    nuevoAvisoLlegada.PaseSalidaEnviado = jsonAvisoLlegada.PaseSalida[0].PaseSalidaEnviado;
                    nuevoAvisoLlegada.PatioID = jsonAvisoLlegada.Patio[0].PatioID;
                    nuevoAvisoLlegada.ProveedorID = jsonAvisoLlegada.Proveedor[0].ProveedorID;
                    nuevoAvisoLlegada.TransportistaID = jsonAvisoLlegada.Transportista[0].TransportistaID;
                    nuevoAvisoLlegada.OrdenCompra = jsonAvisoLlegada.OrdenCompra;
                    nuevoAvisoLlegada.FechaRecepcion = jsonAvisoLlegada.FechaRecepcion;
                    nuevoAvisoLlegada.PaseSalidaEnviado = jsonAvisoLlegada.PaseSalida[0].PaseSalidaEnviado;
                    nuevoAvisoLlegada.UsuarioModificacion = usuario.UsuarioID;
                    nuevoAvisoLlegada.FechaModificacion = DateTime.Now;
                    //Guardamos los cambios
                    ctx.Sam3_FolioAvisoLlegada.Add(nuevoAvisoLlegada);
                    ctx.SaveChanges();

                    //Guardamos el permisos aduana
                    foreach (PermisoAduanaAV permisoAv in jsonAvisoLlegada.PermisoAduana)
                    {
                        Sam3_PermisoAduana nuevoPermiso = new Sam3_PermisoAduana();
                        nuevoPermiso.Activo = true;
                        nuevoPermiso.Estatus = "Creado";
                        nuevoPermiso.FolioAvisoLlegadaID = nuevoAvisoLlegada.FolioAvisoLlegadaID;
                        nuevoPermiso.NumeroPermiso = Convert.ToInt32(permisoAv.NumeroPermiso);
                        nuevoPermiso.PermisoAutorizado = permisoAv.PermisoAutorizado;
                        nuevoPermiso.PermisoTramite = permisoAv.PermisoTramite;
                        nuevoPermiso.UsuarioModificacion = usuario.UsuarioID;
                        nuevoPermiso.FechaModificacion = DateTime.Now;
                        ctx.Sam3_PermisoAduana.Add(nuevoPermiso);
                        ctx.SaveChanges();
                        //guardamos en la relacion de Permiso de aduana y documentos
                        foreach (ArchivoAutorizadoAV archivosPermiso in permisoAv.ArchivoAutorizado)
                        {
                            Sam3_Rel_PermisoAduana_Documento permisoDocumento = new Sam3_Rel_PermisoAduana_Documento();
                            permisoDocumento.Activo = true;
                            permisoDocumento.PermisoAduanaID = nuevoPermiso.PermisoAduanaID;
                            permisoDocumento.DocumentoID = archivosPermiso.ArchivoID;
                            permisoDocumento.Extencion = archivosPermiso.Extension;
                            permisoDocumento.Nombre = archivosPermiso.Nombre;
                            permisoDocumento.UsuarioModificacion = usuario.UsuarioID;
                            permisoDocumento.FechaModificacion = DateTime.Now;
                            ctx.Sam3_Rel_PermisoAduana_Documento.Add(permisoDocumento);
                        }
                    }


                    //guardamos en la relacion entre folios y proyectos
                    foreach (ProyectosAV p in jsonAvisoLlegada.Proyectos)
                    {
                        Sam3_Rel_FolioAvisoLlegada_Proyecto avisoProyecto = new Sam3_Rel_FolioAvisoLlegada_Proyecto();
                        avisoProyecto.Activo = true;
                        avisoProyecto.FolioAvisoLlegadaID = nuevoAvisoLlegada.FolioAvisoLlegadaID;
                        avisoProyecto.ProyectoID = p.ProyectoID;
                        avisoProyecto.UsuarioModificacion = usuario.UsuarioID;
                        avisoProyecto.FechaModificacion = DateTime.Now;

                        ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto.Add(avisoProyecto);
                    }

                    //Guardamos en la relacion de Avisos y planas
                    foreach (PlanaAV plana in jsonAvisoLlegada.Plana)
                    {
                        Sam3_Rel_AvisoLlegada_Plana nuevaPlana = new Sam3_Rel_AvisoLlegada_Plana();
                        nuevaPlana.Activo = true;
                        nuevaPlana.FolioAvisoLlegadaID = nuevoAvisoLlegada.FolioAvisoLlegadaID;
                        nuevaPlana.PlanaID = plana.PlanaID;
                        nuevaPlana.UsuarioModificacion = usuario.UsuarioID;
                        nuevaPlana.FechaModificacion = DateTime.Now;

                        ctx.Sam3_Rel_AvisoLlegada_Plana.Add(nuevaPlana);
                    }

                    //guardamos en relacion de documentos de pases de salida, Folios
                    foreach (PaseSalidaAV paseSalidaAv in jsonAvisoLlegada.PaseSalida)
                    {
                        foreach (ArchivosPaseSalida archivoSalida in paseSalidaAv.Archivos)
                        {
                            Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo nuevoArchivoSalida = new Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo();
                            nuevoArchivoSalida.Activo = true;
                            nuevoArchivoSalida.DocumentoID = Convert.ToInt32(archivoSalida.ArchivoID);
                            nuevoArchivoSalida.Extencion = archivoSalida.Extension;
                            nuevoArchivoSalida.FolioAvisoLlegadaID = nuevoAvisoLlegada.FolioAvisoLlegadaID;
                            nuevoArchivoSalida.Nombre = archivoSalida.Nombre;
                            nuevoArchivoSalida.UsuarioModificacion = usuario.UsuarioID;
                            nuevoArchivoSalida.FechaModificacion = DateTime.Now;
                            ctx.Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo.Add(nuevoArchivoSalida);
                        }
                    }

                    //Guardamos los archivos del pase de salida
                    foreach (ArchivosAV archivosAvisollegada in jsonAvisoLlegada.Archivos)
                    {
                        Sam3_Rel_FolioAvisoLlegada_Documento documentoLlegada = new Sam3_Rel_FolioAvisoLlegada_Documento();
                        documentoLlegada.Activo = true;
                        documentoLlegada.DocumentoID = archivosAvisollegada.ArchivoID;
                        documentoLlegada.Extencion = archivosAvisollegada.Extension;
                        documentoLlegada.Nombre = archivosAvisollegada.Nombre;
                        documentoLlegada.FolioAvisoLlegadaID = nuevoAvisoLlegada.FolioAvisoLlegadaID;
                        documentoLlegada.UsuarioModificacion = usuario.UsuarioID;
                        documentoLlegada.FechaModificacion = DateTime.Now;
                        ctx.Sam3_Rel_FolioAvisoLlegada_Documento.Add(documentoLlegada);
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

        public object ObtenerListadoAvisoLlegada(FiltrosJson filtros)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<int> lstFoliosAvisoLlegada;

                    if (filtros.FolioLlegadaID > 0)
                    {
                        lstFoliosAvisoLlegada = (from r in ctx.Sam3_FolioLlegada
                                                 join a in ctx.Sam3_FolioAvisoLlegada on r.FolioAvisoLlegadaID equals a.FolioAvisoLlegadaID
                                                 where r.FolioLlegadaID == filtros.FolioLlegadaID
                                                 && r.Activo.Value
                                                 && (a.FechaRecepcion >= filtros.FechaInicial && a.FechaRecepcion <= filtros.FechaFinal)
                                                 select a.FolioAvisoLlegadaID).AsParallel().ToList();
                    }
                    else
                    {
                        lstFoliosAvisoLlegada = (from r in ctx.Sam3_FolioAvisoLlegada
                                                 join p in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on r.FolioAvisoLlegadaID equals p.FolioAvisoLlegadaID
                                                 where r.FolioAvisoLlegadaID == filtros.FolioAvisoLlegadaID
                                                 && r.Activo.Value
                                                 && filtros.Proyectos.Select(y => y.ProyectoID).Contains(p.ProyectoID)
                                                 && (r.FechaRecepcion >= filtros.FechaInicial && r.FechaRecepcion <= filtros.FechaFinal)
                                                 && filtros.Patio.Select(z => z.PatioID).Contains(r.PatioID)
                                                 && filtros.Proveedor.Select(x => x.ProveedorID).Contains(r.ProveedorID)
                                                 select r.FolioAvisoLlegadaID).AsParallel().ToList();
                    }

                    List<AvisoLlegadaJson> resultados = new List<AvisoLlegadaJson>();

                    foreach (int folio in lstFoliosAvisoLlegada)
                    {
                        AvisoLlegadaJson aviso = new AvisoLlegadaJson();
                        Sam3_FolioAvisoLlegada registroBd = ctx.Sam3_FolioAvisoLlegada.Where(x => x.FolioAvisoLlegadaID == folio && x.Activo.Value)
                            .AsParallel().SingleOrDefault();
                        //agregamos el listado de archivos del aviso de llegada
                        aviso.Archivos = (from r in registroBd.Sam3_Rel_FolioAvisoLlegada_Documento
                                          where r.Activo
                                          select new ArchivosAV
                                          {
                                              ArchivoID = r.DocumentoID,
                                              Extension = r.Extencion,
                                              Nombre = r.Nombre,
                                              TipoArchivo = ""
                                          }).ToList();

                        //agregamog los choferes
                        aviso.Chofer = (from r in ctx.Sam3_Chofer
                                        where r.ChoferID == registroBd.ChoferID && r.Activo
                                        select new ChoferAV { ChoferID = r.ChoferID, Nombre = r.Nombre }).AsParallel().ToList();
                        aviso.Factura = registroBd.Factura;
                        aviso.FechaRecepcion = registroBd.FechaRecepcion.Value;
                        aviso.FolioAvisoLlegadaID = registroBd.FolioAvisoLlegadaID;
                        aviso.OrdenCompra = registroBd.OrdenCompra;

                        //Obtenemos el listado de archivos de pase de salida
                        List<ArchivosPaseSalida> archivosPaseSalida = (from r in ctx.Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo
                                                                       where r.FolioAvisoLlegadaID == registroBd.FolioAvisoLlegadaID
                                                                       && r.Activo
                                                                       select new ArchivosPaseSalida
                                                                       {
                                                                           Nombre = r.Nombre,
                                                                           Extension = r.Extencion,
                                                                           ArchivoID = r.DocumentoID.ToString()
                                                                       }).AsParallel().ToList();
                        aviso.PaseSalida.Add(new PaseSalidaAV
                        {
                            PaseSalidaEnviado = registroBd.PaseSalidaEnviado.Value,
                            Archivos = archivosPaseSalida
                        });

                        //agregamos los patios
                        aviso.Patio = (from r in ctx.Sam3_Patio
                                       where r.PatioID == registroBd.PatioID && r.Activo
                                       select new PatioAV
                                       {
                                           Nombre = r.Nombre,
                                           PatioID = r.PatioID
                                       }).AsParallel().ToList();

                        //agregar permisos de aduana
                        //primero obtenemos los archivos de permisos de aduana
                        List<Sam3_PermisoAduana> lstpermisosAduana = ctx.Sam3_PermisoAduana
                            .Where(x => x.FolioAvisoLlegadaID == registroBd.FolioAvisoLlegadaID && x.Activo)
                            .AsParallel().ToList();
                        foreach (Sam3_PermisoAduana p in lstpermisosAduana)
                        {
                            List<ArchivoAutorizadoAV> lstarchivosPermisoAduana = (from r in ctx.Sam3_Rel_PermisoAduana_Documento
                                                                                  where r.PermisoAduanaID == p.PermisoAduanaID && r.Activo
                                                                                  select new ArchivoAutorizadoAV
                                                                                  {
                                                                                      ArchivoID = r.DocumentoID,
                                                                                      Extension = r.Extencion,
                                                                                      Nombre = r.Nombre
                                                                                  }).AsParallel().ToList();
                            aviso.PermisoAduana.Add(new PermisoAduanaAV
                            {
                                ArchivoAutorizado = lstarchivosPermisoAduana,
                                NumeroPermiso = p.NumeroPermiso.ToString(),
                                PermisoAutorizado = p.PermisoAutorizado.Value,
                                PermisoTramite = p.PermisoTramite.Value
                            });
                        }

                        aviso.Plana = (from r in ctx.Sam3_Plana
                                       join p in ctx.Sam3_Rel_AvisoLlegada_Plana on r.PlanaID equals p.PlanaID
                                       where (p.FolioAvisoLlegadaID == registroBd.FolioAvisoLlegadaID)
                                       select new PlanaAV
                                       {
                                           PlanaID = r.PlanaID
                                       }).AsParallel().ToList();

                        aviso.Proveedor = (from r in ctx.Sam3_Proveedor
                                           where r.ProveedorID == registroBd.ProveedorID && r.Activo
                                           select new ProveedorAV
                                           {
                                               Nombre = r.Nombre,
                                               ProveedorID = r.ProveedorID
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

                        resultados.Add(aviso);


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
                        x.FolioAvisoLlegadaID == avisoLlegadaID && x.Activo.Value)
                        .AsParallel().SingleOrDefault();
                    //agregamos el listado de archivos del aviso de llegada
                    aviso.Archivos = (from r in registroBd.Sam3_Rel_FolioAvisoLlegada_Documento
                                      where r.Activo
                                      select new ArchivosAV
                                      {
                                          ArchivoID = r.DocumentoID,
                                          Extension = r.Extencion,
                                          Nombre = r.Nombre,
                                          TipoArchivo = ""
                                      }).ToList();

                    //agregamog los choferes
                    aviso.Chofer = (from r in ctx.Sam3_Chofer
                                    where r.ChoferID == registroBd.ChoferID && r.Activo
                                    select new ChoferAV { ChoferID = r.ChoferID, Nombre = r.Nombre }).AsParallel().ToList();
                    aviso.Factura = registroBd.Factura;
                    aviso.FechaRecepcion = registroBd.FechaRecepcion.Value;
                    aviso.FolioAvisoLlegadaID = registroBd.FolioAvisoLlegadaID;
                    aviso.OrdenCompra = registroBd.OrdenCompra;

                    //Obtenemos el listado de archivos de pase de salida
                    List<ArchivosPaseSalida> archivosPaseSalida = (from r in ctx.Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo
                                                                   where r.FolioAvisoLlegadaID == registroBd.FolioAvisoLlegadaID
                                                                   && r.Activo
                                                                   select new ArchivosPaseSalida
                                                                   {
                                                                       Nombre = r.Nombre,
                                                                       Extension = r.Extencion,
                                                                       ArchivoID = r.DocumentoID.ToString()
                                                                   }).AsParallel().ToList();
                    aviso.PaseSalida.Add(new PaseSalidaAV
                    {
                        PaseSalidaEnviado = registroBd.PaseSalidaEnviado.Value,
                        Archivos = archivosPaseSalida
                    });

                    //agregamos los patios
                    aviso.Patio = (from r in ctx.Sam3_Patio
                                   where r.PatioID == registroBd.PatioID && r.Activo
                                   select new PatioAV
                                   {
                                       Nombre = r.Nombre,
                                       PatioID = r.PatioID
                                   }).AsParallel().ToList();

                    //agregar permisos de aduana
                    //primero obtenemos los archivos de permisos de aduana
                    List<Sam3_PermisoAduana> lstpermisosAduana = ctx.Sam3_PermisoAduana
                        .Where(x => x.FolioAvisoLlegadaID == registroBd.FolioAvisoLlegadaID && x.Activo)
                        .AsParallel().ToList();
                    foreach (Sam3_PermisoAduana p in lstpermisosAduana)
                    {
                        List<ArchivoAutorizadoAV> lstarchivosPermisoAduana = (from r in ctx.Sam3_Rel_PermisoAduana_Documento
                                                                              where r.PermisoAduanaID == p.PermisoAduanaID && r.Activo
                                                                              select new ArchivoAutorizadoAV
                                                                              {
                                                                                  ArchivoID = r.DocumentoID,
                                                                                  Extension = r.Extencion,
                                                                                  Nombre = r.Nombre
                                                                              }).AsParallel().ToList();
                        aviso.PermisoAduana.Add(new PermisoAduanaAV
                        {
                            ArchivoAutorizado = lstarchivosPermisoAduana,
                            NumeroPermiso = p.NumeroPermiso.ToString(),
                            PermisoAutorizado = p.PermisoAutorizado.Value,
                            PermisoTramite = p.PermisoTramite.Value
                        });
                    }

                    aviso.Plana = (from r in ctx.Sam3_Plana
                                   join p in ctx.Sam3_Rel_AvisoLlegada_Plana on r.PlanaID equals p.PlanaID
                                   where (p.FolioAvisoLlegadaID == registroBd.FolioAvisoLlegadaID)
                                   select new PlanaAV
                                   {
                                       PlanaID = r.PlanaID
                                   }).AsParallel().ToList();

                    aviso.Proveedor = (from r in ctx.Sam3_Proveedor
                                       where r.ProveedorID == registroBd.ProveedorID && r.Activo
                                       select new ProveedorAV
                                       {
                                           Nombre = r.Nombre,
                                           ProveedorID = r.ProveedorID
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
                        avisoBd.CamionID = ctx.Sam3_Plana.Where(x => x.PlanaID == cambios.Plana[0].PlanaID).Select(x => x.CamionID).SingleOrDefault();
                        avisoBd.ChoferID = cambios.Chofer[0].ChoferID;
                        avisoBd.Factura = cambios.Factura;
                        avisoBd.FechaModificacion = DateTime.Now;
                        avisoBd.FechaRecepcion = cambios.FechaRecepcion;
                        avisoBd.OrdenCompra = cambios.OrdenCompra;
                        avisoBd.PaseSalidaEnviado = cambios.PaseSalida[0].PaseSalidaEnviado;
                        avisoBd.PatioID = cambios.Patio[0].PatioID;
                        avisoBd.ProveedorID = cambios.Proveedor[0].ProveedorID;
                        avisoBd.TransportistaID = cambios.Transportista[0].TransportistaID;
                        avisoBd.UsuarioModificacion = usuario.UsuarioID;

                        
                        //Actualizar informacion de las planas
                        foreach (PlanaAV plana in cambios.Plana)
                        {
                            if (!avisoBd.Sam3_Rel_AvisoLlegada_Plana.Where(x => x.PlanaID == plana.PlanaID).Any()) // varificamos si existe la plana
                            {
                                //agregamos una nuevo registro a la relacion de aviso y planas
                                Sam3_Rel_AvisoLlegada_Plana nuevoRegistro = new Sam3_Rel_AvisoLlegada_Plana();
                                nuevoRegistro.Activo = true;
                                nuevoRegistro.FechaModificacion = DateTime.Now;
                                nuevoRegistro.FolioAvisoLlegadaID = avisoBd.FolioAvisoLlegadaID;
                                nuevoRegistro.PlanaID = plana.PlanaID;
                                nuevoRegistro.UsuarioModificacion = usuario.UsuarioID;

                                ctx.Sam3_Rel_AvisoLlegada_Plana.Add(nuevoRegistro);
                            }
                        }

                        //actualizar la información de los documentos de Aviso de llegada
                        foreach (ArchivosAV archivo in cambios.Archivos)
                        {
                            //verificamos si ya existe el archivo actual
                            if (!ctx.Sam3_Rel_FolioAvisoLlegada_Documento
                                .Where(x => x.DocumentoID == archivo.ArchivoID && x.FolioAvisoLlegadaID == avisoBd.FolioAvisoLlegadaID).Any())
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


    }//Fin Clase
}