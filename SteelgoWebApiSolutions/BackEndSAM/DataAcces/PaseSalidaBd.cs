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
using System.Globalization;

namespace BackEndSAM.DataAcces
{
    public class PaseSalidaBd
    {
        private static readonly object _mutex = new object();
        private static PaseSalidaBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private PaseSalidaBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static PaseSalidaBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new PaseSalidaBd();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerInfoPaseSalida(int folioAvisoLlegadaId, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    //verificar que el folio de llegada de material ya tenga cargados al menos un packing list firmado
                    bool tienePackingListFirmado = ctx.Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo
                        .Where(x => x.FolioAvisoLlegadaID == folioAvisoLlegadaId).AsParallel().Any();

                    if (tienePackingListFirmado)
                    {
                        //traemos la informacion del folio de aviso de llegada
                        Sam3_FolioAvisoLlegada folioBd = ctx.Sam3_FolioAvisoLlegada.Where(x => x.FolioAvisoLlegadaID == folioAvisoLlegadaId)
                            .AsParallel().SingleOrDefault();

                        PaseSalidaJson infoPase = new PaseSalidaJson();
                        infoPase.Fecha = DateTime.Now.ToString("dd/MM/yyyy");
                        infoPase.FechaFinDescarga = DateTime.Now.ToString("hh:mm:ss tt");
                        infoPase.FechaInicioDescarga = folioBd.Sam3_FolioAvisoEntrada.Select(x => x.FechainicioDescarga).SingleOrDefault()
                            .Value.ToString("hh:mm:ss tt");
                        infoPase.FechaLlegada = folioBd.FechaRecepcion.Value.ToString("hh:mm:ss tt");
                        infoPase.NombreOperador = folioBd.Sam3_Chofer.Nombre;

                        infoPase.Planas = (from r in ctx.Sam3_Rel_FolioAvisoLlegada_Vehiculo
                                           join v in ctx.Sam3_Vehiculo on r.VehiculoID equals v.VehiculoID
                                           join t in ctx.Sam3_TipoVehiculo on v.TipoVehiculoID equals t.TipoVehiculoID
                                           where r.Activo && v.Activo && t.Activo
                                           && r.FolioAvisoLlegadaID == folioAvisoLlegadaId
                                           && t.Nombre == "Plana"
                                           select v.Placas).AsParallel().ToList();

                        infoPase.NumeroPlanas = infoPase.Planas.Count();

                        infoPase.PackingListFirmado = (from r in folioBd.Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo
                                                       join t in ctx.Sam3_TipoArchivo on r.TipoArchivoID equals t.TipoArchivoID
                                                       where r.Activo && t.Activo &&
                                                       t.Nombre == "Packing List Firmado"
                                                       select r).AsParallel().Any();

                        infoPase.Proyecto = (from r in folioBd.Sam3_Rel_FolioAvisoLlegada_Proyecto
                                             join p in ctx.Sam3_Proyecto on r.ProyectoID equals p.ProyectoID
                                             where r.Activo && p.Activo
                                             select p.Nombre).AsParallel().FirstOrDefault();

                        infoPase.Tracto = (from r in ctx.Sam3_Vehiculo
                                           where r.Activo
                                           && r.VehiculoID == folioBd.VehiculoID
                                           select r.Placas).AsParallel().SingleOrDefault();

                        return infoPase;

                    }
                    else
                    {
                        TransactionalInformation result = new TransactionalInformation();
                        result.ReturnMessage.Add("Error");
                        result.ReturnMessage.Add("El Folio no cuanta con Packing list firmado");
                        result.ReturnCode = 500;
                        result.ReturnStatus = false;
                        result.IsAuthenicated = true;

                        return result;
                    }
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

        public object GenerarPaseSalida(int folioAvisoLlegadaID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_FolioAvisoLlegada foliollegadaBd = ctx.Sam3_FolioAvisoLlegada.Where(x => x.FolioAvisoLlegadaID == folioAvisoLlegadaID)
                        .AsParallel().SingleOrDefault();
                    foliollegadaBd.PaseSalidaEnviado = true;
                    foliollegadaBd.FechaModificacion = DateTime.Now;
                    foliollegadaBd.UsuarioModificacion = usuario.UsuarioID;

                    Sam3_FolioAvisoEntrada folioEntradaBd = ctx.Sam3_FolioAvisoEntrada.Where(x => x.FolioAvisoLlegadaID == folioAvisoLlegadaID)
                        .AsParallel().SingleOrDefault();
                    folioEntradaBd.FechaFinDescarga = DateTime.Now;
                    folioEntradaBd.FechaModificacion = DateTime.Now;
                    folioEntradaBd.UsuarioModificacion = usuario.UsuarioID;

                    ctx.SaveChanges();

                    if (!(bool)EnviarAvisosBd.Instance.EnviarNotificación(3,
                        string.Format("Se generó un nuevo pase de salida para el folio {0} con fecha {1}",
                        foliollegadaBd.FolioAvisoLlegadaID, foliollegadaBd.FechaModificacion), usuario))
                    {
                        //Agregar error a la bitacora  PENDIENTE
                    }

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("Ok");
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

        public object TienePaseSalida(int folioAvisollegada, Sam3_Usuario usuario)
        {
            try 
            {
                using (SamContext ctx = new SamContext())
                {
                    return ctx.Sam3_FolioAvisoLlegada.Where(x => x.FolioAvisoLlegadaID == folioAvisollegada).Select(x => x.PaseSalidaEnviado)
                        .SingleOrDefault();
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

        public List<ListadoIncidencias> ListadoIncidencias(int clienteID, int proyectoID, List<int> proyectos, List<int> patios, List<int> incidenciaIDs,
            DateTime fechaInicial, DateTime fechaFinal)
        {
            try
            {
                List<ListadoIncidencias> listado;
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_FolioAvisoLlegada> registros = new List<Sam3_FolioAvisoLlegada>();

                    if (proyectoID > 0)
                    {
                        registros = (from fa in ctx.Sam3_FolioAvisoLlegada
                                     join rfp in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on fa.FolioAvisoLlegadaID equals rfp.FolioAvisoLlegadaID
                                     join p in ctx.Sam3_Proyecto on rfp.ProyectoID equals p.ProyectoID
                                     join pa in ctx.Sam3_Patio on p.PatioID equals pa.PatioID
                                     join rfps in ctx.Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo on fa.FolioAvisoLlegadaID equals rfps.FolioAvisoLlegadaID
                                     where fa.Activo && rfp.Activo && p.Activo && pa.Activo && rfps.Activo
                                     && proyectos.Contains(p.ProyectoID)
                                     && patios.Contains(pa.PatioID)
                                     && (fa.FechaModificacion >= fechaInicial && fa.FechaModificacion <= fechaFinal)
                                     && p.ProyectoID == proyectoID
                                     select fa).AsParallel().Distinct().ToList();
                    }
                    else
                    {
                        registros = (from fa in ctx.Sam3_FolioAvisoLlegada
                                     join rfp in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on fa.FolioAvisoLlegadaID equals rfp.FolioAvisoLlegadaID
                                     join p in ctx.Sam3_Proyecto on rfp.ProyectoID equals p.ProyectoID
                                     join pa in ctx.Sam3_Patio on p.PatioID equals pa.PatioID
                                     join rfps in ctx.Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo on fa.FolioAvisoLlegadaID equals rfps.FolioAvisoLlegadaID
                                     where fa.Activo && rfp.Activo && p.Activo && pa.Activo && rfps.Activo
                                     && proyectos.Contains(p.ProyectoID)
                                     && patios.Contains(pa.PatioID)
                                     && (fa.FechaModificacion >= fechaInicial && fa.FechaModificacion <= fechaFinal)
                                     select fa).AsParallel().Distinct().ToList();
                    }

                    if (clienteID > 0)
                    {
                        registros = registros.Where(x => x.ClienteID == clienteID).ToList();
                    }

                    listado = (from r in registros
                               join rip in ctx.Sam3_Rel_Incidencia_PaseSalida on r.FolioAvisoLlegadaID equals rip.FolioAvisoLlegadaID
                               join inc in ctx.Sam3_Incidencia on rip.IncidenciaID equals inc.IncidenciaID
                               join clas in ctx.Sam3_ClasificacionIncidencia on inc.ClasificacionID equals clas.ClasificacionIncidenciaID
                               join ti in ctx.Sam3_TipoIncidencia on inc.TipoIncidenciaID equals ti.TipoIncidenciaID
                               join us in ctx.Sam3_Usuario on inc.UsuarioID equals us.UsuarioID
                               where rip.Activo && inc.Activo && clas.Activo && ti.Activo
                               && incidenciaIDs.Contains(inc.IncidenciaID)
                               select new ListadoIncidencias
                               {
                                   Clasificacion = clas.Nombre,
                                   Estatus = inc.Estatus,
                                   FechaRegistro = inc.FechaCreacion.ToString(),
                                   FolioIncidenciaID = inc.IncidenciaID.ToString(),
                                   RegistradoPor = us.Nombre + " " + us.ApellidoPaterno,
                                   TipoIncidencia = ti.Nombre
                               }).AsParallel().Distinct().ToList();


                }
                return listado;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}