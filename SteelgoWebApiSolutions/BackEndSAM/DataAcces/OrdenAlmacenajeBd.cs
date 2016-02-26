using BackEndSAM.Models;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Configuration;
using BackEndSAM.Utilities;

namespace BackEndSAM.DataAcces
{
    public class OrdenAlmacenajeBd
    {
        private static readonly object _mutex = new object();
        private static OrdenAlmacenajeBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private OrdenAlmacenajeBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static OrdenAlmacenajeBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new OrdenAlmacenajeBd();
                    }
                }
                return _instance;
            }
        }

        //obtener los folios de cuantificacion
        public object ObtenerFoliosCuantificacionOrdenAlmacenaje(int proyectoID, Sam3_Usuario usuario)
        {
            try
            {
                Boolean activarFolioConfiguracionCuantificacion = !string.IsNullOrEmpty(ConfigurationManager.AppSettings["ActivarFolioConfiguracionCuantificacion"]) ? 
                    (ConfigurationManager.AppSettings["ActivarFolioConfiguracionCuantificacion"].Equals("1") ? true : false) : false;
                bool activaConfigFolioLlegada = ConfigurationManager.AppSettings["ActivarFolioConfiguracion"].Equals("1") ? true : false;

                using (SamContext ctx = new SamContext())
                {
                    //Si es Folio Cuantificacion
                    List<ListaCombos> lstFolios = (from fc in ctx.Sam3_FolioCuantificacion
                                                   join fe in ctx.Sam3_FolioAvisoEntrada on fc.FolioAvisoEntradaID equals fe.FolioAvisoEntradaID
                                                   join fa in ctx.Sam3_FolioAvisoLlegada on fe.FolioAvisoLlegadaID equals fa.FolioAvisoLlegadaID
                                                   where fc.ProyectoID == proyectoID
                                                   && fc.Activo && fe.Activo && fa.Activo
                                                   select new ListaCombos
                                                   {
                                                       id = fc.FolioCuantificacionID.ToString(),
                                                       value = fc.FolioCuantificacionID.ToString()
                                                   }).AsParallel().ToList();


                    foreach (ListaCombos item in lstFolios)
                    {
                        int folioCuantificacionID = Convert.ToInt32(item.id);
                        Sam3_FolioCuantificacion FolioCuantificacion = ctx.Sam3_FolioCuantificacion.Where(x => x.FolioCuantificacionID == folioCuantificacionID).FirstOrDefault();

                        Sam3_FolioAvisoLlegada folioLl = (from fc in ctx.Sam3_FolioCuantificacion
                                                          join fe in ctx.Sam3_FolioAvisoEntrada on fc.FolioAvisoEntradaID equals fe.FolioAvisoEntradaID
                                                          join fa in ctx.Sam3_FolioAvisoLlegada on fe.FolioAvisoLlegadaID equals fa.FolioAvisoLlegadaID
                                                          where fc.Activo && fe.Activo && fa.Activo
                                                          && fc.FolioCuantificacionID == folioCuantificacionID
                                                          select fa).AsParallel().FirstOrDefault();

                        string NombreFolioAvisoLlegada = (from pc in ctx.Sam3_Rel_Proyecto_Entidad_Configuracion
                                                          where pc.Proyecto == folioLl.ProyectoNombrado
                                                          && pc.Entidad == folioLl.Entidad
                                                          select pc.PreFijoFolioAvisoLlegada + ","
                                                          + pc.CantidadCerosFolioAvisoLlegada.ToString() + ","
                                                          + folioLl.Consecutivo + ","
                                                          + pc.PostFijoFolioAvisoLlegada.Trim()).FirstOrDefault();

                        string NombreFolioCuantificacion = (from pc in ctx.Sam3_Rel_Proyecto_Entidad_Configuracion
                                                            where pc.Rel_Proyecto_Entidad_Configuracion_ID == FolioCuantificacion.Rel_Proyecto_Entidad_Configuracion_ID
                                                            select pc.PreFijoFolioPackingList + ","
                                                            + pc.CantidadCerosFolioPackingList.ToString() + ","
                                                            + FolioCuantificacion.ConsecutivoConfiguracion.ToString() + ","
                                                            + pc.PostFijoFolioPackingList).FirstOrDefault();

                        int FolioAvisoLlegadaID = folioLl.FolioAvisoLlegadaID;
                        int ConsecutivoFolioCuanificacion = FolioCuantificacion.Consecutivo.Value;
                        int ConsecutivoFolioLlegada = folioLl.Consecutivo.Value;

                        NombreFolioAvisoLlegada = Conversiones.Instance.FormatearCadenasdeElementos(NombreFolioAvisoLlegada);
                        NombreFolioCuantificacion = Conversiones.Instance.FormatearCadenasdeElementos(NombreFolioCuantificacion);

                        if (activaConfigFolioLlegada && activarFolioConfiguracionCuantificacion)
                        {
                            item.value = NombreFolioAvisoLlegada + "-" + NombreFolioCuantificacion;
                        }

                        if (activaConfigFolioLlegada && !activarFolioConfiguracionCuantificacion)
                        {
                            item.value = NombreFolioAvisoLlegada + "-" + ConsecutivoFolioCuanificacion;
                        }

                        if (!activaConfigFolioLlegada && activarFolioConfiguracionCuantificacion)
                        {
                            item.value = FolioAvisoLlegadaID + "-" + NombreFolioCuantificacion;
                        }

                        if (!activaConfigFolioLlegada && !activarFolioConfiguracionCuantificacion)
                        {
                            item.value = FolioAvisoLlegadaID + "-" + ConsecutivoFolioCuanificacion;
                        }
                    }
                    return lstFolios;
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object ObtenerItemCodesOrdenAlmacenaje(int folioCuantificacion, Sam3_Usuario usuario)
        {
            List<ListaCombos> ComboItemCode = new List<ListaCombos>();

            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ComboItemCode = (from ic in ctx.Sam3_ItemCode
                                     join rid in ctx.Sam3_Rel_ItemCode_Diametro on ic.ItemCodeID equals rid.ItemCodeID
                                     join rfc in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on rid.Rel_ItemCode_Diametro_ID equals rfc.Rel_ItemCode_Diametro_ID
                                     where ic.Activo && rfc.Activo
                                     && rfc.FolioCuantificacionID == folioCuantificacion
                                     && (from ror in ctx.Sam3_Rel_OrdenRecepcion_ItemCode
                                         join rd in ctx.Sam3_Rel_ItemCode_Diametro on ror.Rel_ItemCode_Diametro_ID equals rd.Rel_ItemCode_Diametro_ID
                                         where ror.Activo && ror.Rel_ItemCode_Diametro_ID == rid.Rel_ItemCode_Diametro_ID
                                         select rd.ItemCodeID).Contains(ic.ItemCodeID)
                                     select new ListaCombos
                                     {
                                         id = ic.ItemCodeID.ToString(),
                                         value = ic.Codigo
                                     }).AsParallel().ToList();

                    ComboItemCode.AddRange((from ic in ctx.Sam3_ItemCode
                                            join rid in ctx.Sam3_Rel_ItemCode_Diametro on ic.ItemCodeID equals rid.ItemCodeID
                                            join rbi in ctx.Sam3_Rel_Bulto_ItemCode on rid.Rel_ItemCode_Diametro_ID equals rbi.Rel_ItemCode_Diametro_ID
                                            join b in ctx.Sam3_Bulto on rbi.BultoID equals b.BultoID
                                            join fc in ctx.Sam3_FolioCuantificacion on b.FolioCuantificacionID equals fc.FolioCuantificacionID
                                            where ic.Activo && rbi.Activo && rid.Activo && b.Activo && fc.Activo
                                            && fc.FolioCuantificacionID == folioCuantificacion
                                            && (from ror in ctx.Sam3_Rel_OrdenRecepcion_ItemCode
                                                join rdi in ctx.Sam3_Rel_ItemCode_Diametro on ror.Rel_ItemCode_Diametro_ID equals rdi.Rel_ItemCode_Diametro_ID
                                                where ror.Activo
                                                select rdi.ItemCodeID).Contains(ic.ItemCodeID)
                                            select new ListaCombos
                                            {
                                                id = ic.ItemCodeID.ToString(),
                                                value = ic.Codigo
                                            }).AsParallel().ToList());

                    ComboItemCode = ComboItemCode.GroupBy(x => x.id).Select(x => x.First()).OrderBy(x => x.value).ToList();
                }

                return ComboItemCode;
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object ObtenerNumerosUnicosOrdenAlmacenaje(int itemCode, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<NumerosUnicos> listado = new List<NumerosUnicos>();
                    listado = (from nu in ctx.Sam3_NumeroUnico
                               where nu.Activo
                               && nu.ItemCodeID == itemCode
                               && !(from roa in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico
                                    where roa.Activo
                                    select roa.NumeroUnicoID).Contains(nu.NumeroUnicoID)
                               select new NumerosUnicos
              {
                  NumeroUnicoID = nu.NumeroUnicoID.ToString(),
                  NumeroUnico = nu.Prefijo + "-" + nu.Consecutivo
              }).AsParallel().ToList();

                    foreach (var nu in listado)
                    {
                        int numeroDigitos = (from it in ctx.Sam3_ItemCode
                                             join pc in ctx.Sam3_ProyectoConfiguracion on it.ProyectoID equals pc.ProyectoID
                                             where it.ItemCodeID == itemCode
                                             select pc.DigitosNumeroUnico).AsParallel().SingleOrDefault();

                        string formato = "D" + numeroDigitos.ToString();

                        string[] codigo = nu.NumeroUnico.Split('-').ToArray();
                        int consecutivo = Convert.ToInt32(codigo[1]);
                        nu.NumeroUnico = codigo[0] + "-" + consecutivo.ToString(formato);
                    }
                    return listado;
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object ObtenerListadoGenerarOrdenAlmacenaje(FiltrosOrdenAlmacenaje filtros, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Boolean activarFolioConfiguracionCuantificacion = !string.IsNullOrEmpty(ConfigurationManager.AppSettings["ActivarFolioConfiguracionCuantificacion"]) ? 
                        (ConfigurationManager.AppSettings["ActivarFolioConfiguracionCuantificacion"].Equals("1") ? true : false) : false;
                    bool activaConfigFolioLlegada = ConfigurationManager.AppSettings["ActivarFolioConfiguracion"].Equals("1") ? true : false;

                    int proyectoID = filtros.ProyectoID != "" ? Convert.ToInt32(filtros.ProyectoID) : 0;
                    int folioCuantificacionID = filtros.FolioCuantificacionID != "" ? Convert.ToInt32(filtros.FolioCuantificacionID) : 0;
                    int itemCodeID = filtros.ItemCodeID != "" ? Convert.ToInt32(filtros.ItemCodeID) : 0;
                    int numeroUnicoID = filtros.NumeroUnicoID != "" ? Convert.ToInt32(filtros.NumeroUnicoID) : 0;

                    //Patios y proyectos del usuario
                    List<int> proyectos = ctx.Sam3_Rel_Usuario_Proyecto.Where(x => x.UsuarioID == usuario.UsuarioID).Select(x => x.ProyectoID).AsParallel().ToList();

                    List<int> patios = (from r in ctx.Sam3_Proyecto
                                        join p in ctx.Sam3_Patio on r.PatioID equals p.PatioID
                                        where r.Activo && proyectos.Contains(r.ProyectoID)
                                        select p.PatioID).AsParallel().GroupBy(x => x).Select(x => x.First()).ToList();
                    List<Sam3_FolioCuantificacion> registros;

                    //Obtengo los folios cuantificacion del usuario
                    if (proyectoID > 0)
                    {
                        registros = (from fc in ctx.Sam3_FolioCuantificacion
                                     join p in ctx.Sam3_Proyecto on fc.ProyectoID equals p.ProyectoID
                                     join rfi in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on fc.FolioCuantificacionID equals rfi.FolioCuantificacionID
                                     join rdi in ctx.Sam3_Rel_ItemCode_Diametro on rfi.Rel_ItemCode_Diametro_ID equals rdi.Rel_ItemCode_Diametro_ID
                                     join ood in ctx.Sam3_Rel_OrdenRecepcion_ItemCode on rdi.Rel_ItemCode_Diametro_ID equals ood.Rel_ItemCode_Diametro_ID
                                     join pa in ctx.Sam3_Patio on p.PatioID equals pa.PatioID
                                     where fc.Activo && p.Activo && rfi.Activo && pa.Activo
                                     && proyectos.Contains(p.ProyectoID)
                                     && patios.Contains(pa.PatioID)
                                     && fc.ProyectoID == proyectoID
                                     select fc).AsParallel().ToList();

                        registros.AddRange((from fc in ctx.Sam3_FolioCuantificacion
                                            join p in ctx.Sam3_Proyecto on fc.ProyectoID equals p.ProyectoID
                                            join b in ctx.Sam3_Bulto on fc.FolioCuantificacionID equals b.FolioCuantificacionID
                                            join rbi in ctx.Sam3_Rel_Bulto_ItemCode on b.BultoID equals rbi.BultoID
                                            join rdi in ctx.Sam3_Rel_ItemCode_Diametro on rbi.Rel_ItemCode_Diametro_ID equals rdi.Rel_ItemCode_Diametro_ID
                                            join ood in ctx.Sam3_Rel_OrdenRecepcion_ItemCode on rdi.Rel_ItemCode_Diametro_ID equals ood.Rel_ItemCode_Diametro_ID
                                            join pa in ctx.Sam3_Patio on p.PatioID equals pa.PatioID
                                            where fc.Activo && p.Activo && b.Activo && rbi.Activo && pa.Activo
                                            && proyectos.Contains(p.ProyectoID)
                                            && patios.Contains(pa.PatioID)
                                            && fc.ProyectoID == proyectoID
                                            select fc).AsParallel().ToList());

                    }
                    else
                    {
                        registros = (from fc in ctx.Sam3_FolioCuantificacion
                                     join p in ctx.Sam3_Proyecto on fc.ProyectoID equals p.ProyectoID
                                     join rfi in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on fc.FolioCuantificacionID equals rfi.FolioCuantificacionID
                                     join rdi in ctx.Sam3_Rel_ItemCode_Diametro on rfi.Rel_ItemCode_Diametro_ID equals rdi.Rel_ItemCode_Diametro_ID
                                     join ood in ctx.Sam3_Rel_OrdenRecepcion_ItemCode on rdi.Rel_ItemCode_Diametro_ID equals ood.Rel_ItemCode_Diametro_ID
                                     join pa in ctx.Sam3_Patio on p.PatioID equals pa.PatioID
                                     where fc.Activo && p.Activo && rfi.Activo && pa.Activo
                                     && proyectos.Contains(p.ProyectoID)
                                     && patios.Contains(pa.PatioID)
                                     select fc).AsParallel().ToList();

                        registros.AddRange((from fc in ctx.Sam3_FolioCuantificacion
                                            join p in ctx.Sam3_Proyecto on fc.ProyectoID equals p.ProyectoID
                                            join b in ctx.Sam3_Bulto on fc.FolioCuantificacionID equals b.FolioCuantificacionID
                                            join rbi in ctx.Sam3_Rel_Bulto_ItemCode on b.BultoID equals rbi.BultoID
                                            join rdi in ctx.Sam3_Rel_ItemCode_Diametro on rbi.Rel_ItemCode_Diametro_ID equals rdi.Rel_ItemCode_Diametro_ID
                                            join ood in ctx.Sam3_Rel_OrdenRecepcion_ItemCode on rdi.Rel_ItemCode_Diametro_ID equals ood.Rel_ItemCode_Diametro_ID
                                            join pa in ctx.Sam3_Patio on p.PatioID equals pa.PatioID
                                            where fc.Activo && p.Activo && b.Activo && rbi.Activo && pa.Activo
                                            && proyectos.Contains(p.ProyectoID)
                                            && patios.Contains(pa.PatioID)
                                            select fc).AsParallel().ToList());
                    }

                    //Que sea igual al folio cuantificacion seleccionado 
                    if (folioCuantificacionID > 0)
                    {
                        registros = registros.Where(x => x.FolioCuantificacionID == folioCuantificacionID && x.Activo).AsParallel().ToList();

                    }

                    registros = registros.GroupBy(x => x.FolioCuantificacionID).Select(x => x.First()).ToList();

                    List<ListadoGenerarOrdenAlmacenaje> listado = new List<ListadoGenerarOrdenAlmacenaje>();

                    foreach (Sam3_FolioCuantificacion item in registros)
                    {
                        ListadoGenerarOrdenAlmacenaje orden = new ListadoGenerarOrdenAlmacenaje();
                        orden.FolioCuantificacion = item.FolioCuantificacionID.ToString();

                        Sam3_FolioAvisoLlegada folioLlegada = (from fc in ctx.Sam3_FolioCuantificacion
                                                               join fe in ctx.Sam3_FolioAvisoEntrada on fc.FolioAvisoEntradaID equals fe.FolioAvisoEntradaID
                                                               join fa in ctx.Sam3_FolioAvisoLlegada on fe.FolioAvisoLlegadaID equals fa.FolioAvisoLlegadaID
                                                               where fc.Activo && fe.Activo && fa.Activo
                                                               && fc.FolioCuantificacionID == item.FolioCuantificacionID
                                                               select fa).AsParallel().FirstOrDefault();

                        string NombreFolioAvisoLlegada = (from pc in ctx.Sam3_Rel_Proyecto_Entidad_Configuracion
                                                          where pc.Proyecto == folioLlegada.ProyectoNombrado
                                                          && pc.Entidad == folioLlegada.Entidad
                                                          select pc.PreFijoFolioAvisoLlegada + ","
                                                          + pc.CantidadCerosFolioAvisoLlegada.ToString() + ","
                                                          + folioLlegada.Consecutivo + ","
                                                          + pc.PostFijoFolioAvisoLlegada.Trim()).FirstOrDefault();

                        string NombreFolioCuantificacion = (from pc in ctx.Sam3_Rel_Proyecto_Entidad_Configuracion
                                                            where pc.Rel_Proyecto_Entidad_Configuracion_ID == item.Rel_Proyecto_Entidad_Configuracion_ID
                                                            select pc.PreFijoFolioPackingList + ","
                                                            + pc.CantidadCerosFolioPackingList.ToString() + ","
                                                            + item.ConsecutivoConfiguracion.ToString() + ","
                                                            + pc.PostFijoFolioPackingList).FirstOrDefault();

                        int FolioAvisoLlegadaID = folioLlegada.FolioAvisoLlegadaID;
                        int ConsecutivoFolioCuanificacion = item.Consecutivo.Value;
                        int ConsecutivoFolioLlegada = folioLlegada.Consecutivo.Value;

                        NombreFolioAvisoLlegada = Conversiones.Instance.FormatearCadenasdeElementos(NombreFolioAvisoLlegada);
                        NombreFolioCuantificacion = Conversiones.Instance.FormatearCadenasdeElementos(NombreFolioCuantificacion);

                        if (activaConfigFolioLlegada && activarFolioConfiguracionCuantificacion)
                        {
                            orden.FolioConfiguracionCuantificacion = NombreFolioAvisoLlegada + "-" + NombreFolioCuantificacion;
                        }

                        if (activaConfigFolioLlegada && !activarFolioConfiguracionCuantificacion)
                        {
                            orden.FolioConfiguracionCuantificacion = NombreFolioAvisoLlegada + "-" + ConsecutivoFolioCuanificacion;
                        }

                        if (!activaConfigFolioLlegada && activarFolioConfiguracionCuantificacion)
                        {
                            orden.FolioConfiguracionCuantificacion = FolioAvisoLlegadaID + "-" + NombreFolioCuantificacion;
                        }

                        if (!activaConfigFolioLlegada && !activarFolioConfiguracionCuantificacion)
                        {
                            orden.FolioConfiguracionCuantificacion = FolioAvisoLlegadaID + "-" + ConsecutivoFolioCuanificacion;
                        }


                        orden.ItemCodes = (from rfc in ctx.Sam3_Rel_FolioCuantificacion_ItemCode
                                           join rid in ctx.Sam3_Rel_ItemCode_Diametro on rfc.Rel_ItemCode_Diametro_ID equals rid.Rel_ItemCode_Diametro_ID
                                           join ic in ctx.Sam3_ItemCode on rid.ItemCodeID equals ic.ItemCodeID
                                           join rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on rid.Rel_ItemCode_Diametro_ID equals rics.Rel_ItemCode_Diametro_ID
                                           join rids in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro on rics.Rel_ItemCodeSteelgo_Diametro_ID equals rids.Rel_ItemCodeSteelgo_Diametro_ID
                                           join ics in ctx.Sam3_ItemCodeSteelgo on rids.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                           join numu in ctx.Sam3_NumeroUnico on ic.ItemCodeID equals numu.ItemCodeID
                                           join d1 in ctx.Sam3_Diametro on rids.Diametro1ID equals d1.DiametroID
                                           join d2 in ctx.Sam3_Diametro on rids.Diametro2ID equals d2.DiametroID
                                           where rfc.Activo && ic.Activo && rics.Activo && ics.Activo
                                           && rfc.FolioCuantificacionID == item.FolioCuantificacionID
                                           && (from ror in ctx.Sam3_Rel_OrdenRecepcion_ItemCode
                                               where ror.Activo
                                               select ror.Rel_ItemCode_Diametro_ID).Contains(rid.Rel_ItemCode_Diametro_ID)
                                               && !(from roa in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico
                                                    where roa.Activo
                                                    select roa.NumeroUnicoID).Contains(numu.NumeroUnicoID)
                                           select new ElementoCuantificacionItemCode
                                           {
                                               ItemCodeID = ic.ItemCodeID.ToString(),
                                               Codigo = ic.Codigo,
                                               Descripcion = ics.DescripcionEspanol,
                                               Cantidad = (from nu in ctx.Sam3_NumeroUnico
                                                           where nu.ItemCodeID == ic.ItemCodeID
                                                           && !(from roa in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico
                                                                where roa.Activo
                                                                select roa.NumeroUnicoID).Contains(nu.NumeroUnicoID)
                                                           && nu.Activo
                                                           select nu.NumeroUnicoID).Count().ToString(),
                                               D1 = d1.Valor.ToString(),
                                               D2 = d2.Valor.ToString(),
                                               FolioCuantificacion = item.FolioCuantificacionID.ToString(),
                                               NumerosUnicos = (from nu in ctx.Sam3_NumeroUnico
                                                                where nu.ItemCodeID == ic.ItemCodeID
                                                                && !(from roa in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico
                                                                     where roa.Activo
                                                                     select roa.NumeroUnicoID).Contains(nu.NumeroUnicoID)
                                                                && nu.Activo
                                                                select new ElementoNumeroUnico
                                                                {
                                                                    FolioCuantificacion = item.FolioCuantificacionID.ToString(),
                                                                    ItemCodeID = ic.ItemCodeID.ToString(),
                                                                    NumeroUnicoID = nu.NumeroUnicoID.ToString(),
                                                                    NumeroUnico = nu.Prefijo + "-" + nu.Consecutivo
                                                                }).ToList()
                                           }).AsParallel().GroupBy(x => x.ItemCodeID).Select(x => x.First()).ToList();

                        orden.ItemCodes.AddRange((from rfc in ctx.Sam3_FolioCuantificacion
                                                  join bu in ctx.Sam3_Bulto on rfc.FolioCuantificacionID equals bu.FolioCuantificacionID
                                                  join relbu in ctx.Sam3_Rel_Bulto_ItemCode on bu.BultoID equals relbu.BultoID
                                                  join rid in ctx.Sam3_Rel_ItemCode_Diametro on relbu.Rel_ItemCode_Diametro_ID equals rid.Rel_ItemCode_Diametro_ID
                                                  join ic in ctx.Sam3_ItemCode on rid.ItemCodeID equals ic.ItemCodeID
                                                  join rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on rid.Rel_ItemCode_Diametro_ID equals rics.Rel_ItemCode_Diametro_ID
                                                  join rids in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro on rics.Rel_ItemCodeSteelgo_Diametro_ID equals rids.Rel_ItemCodeSteelgo_Diametro_ID
                                                  join ics in ctx.Sam3_ItemCodeSteelgo on rids.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                                  join numu in ctx.Sam3_NumeroUnico on ic.ItemCodeID equals numu.ItemCodeID
                                                  join d1 in ctx.Sam3_Diametro on rids.Diametro1ID equals d1.DiametroID
                                                  join d2 in ctx.Sam3_Diametro on rids.Diametro2ID equals d2.DiametroID
                                                  where rfc.Activo && ic.Activo && rics.Activo && ics.Activo && bu.Activo && relbu.Activo
                                                  && rfc.FolioCuantificacionID == item.FolioCuantificacionID
                                                  && (from ror in ctx.Sam3_Rel_OrdenRecepcion_ItemCode
                                                      where ror.Activo
                                                      select ror.Rel_ItemCode_Diametro_ID).Contains(relbu.Rel_ItemCode_Diametro_ID)
                                                      && !(from roa in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico
                                                           where roa.Activo
                                                           select roa.NumeroUnicoID).Contains(numu.NumeroUnicoID)
                                                  select new ElementoCuantificacionItemCode
                                                  {
                                                      ItemCodeID = ic.ItemCodeID.ToString(),
                                                      Codigo = ic.Codigo,
                                                      Descripcion = ics.DescripcionEspanol,
                                                      Cantidad = (from nu in ctx.Sam3_NumeroUnico
                                                                  where nu.ItemCodeID == ic.ItemCodeID
                                                                  && !(from roa in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico
                                                                       where roa.Activo
                                                                       select roa.NumeroUnicoID).Contains(nu.NumeroUnicoID)
                                                                  && nu.Activo
                                                                  select nu.NumeroUnicoID).Count().ToString(),
                                                      D1 = d1.Valor.ToString(),
                                                      D2 = d2.Valor.ToString(),
                                                      FolioCuantificacion = item.FolioCuantificacionID.ToString(),
                                                      NumerosUnicos = (from nu in ctx.Sam3_NumeroUnico
                                                                       where nu.ItemCodeID == ic.ItemCodeID
                                                                       && !(from roa in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico
                                                                            where roa.Activo
                                                                            select roa.NumeroUnicoID).Contains(nu.NumeroUnicoID)
                                                                       && nu.Activo
                                                                       select new ElementoNumeroUnico
                                                                       {
                                                                           FolioCuantificacion = item.FolioCuantificacionID.ToString(),
                                                                           ItemCodeID = ic.ItemCodeID.ToString(),
                                                                           NumeroUnicoID = nu.NumeroUnicoID.ToString(),
                                                                           NumeroUnico = nu.Prefijo + "-" + nu.Consecutivo
                                                                       }).ToList()
                                                  }).AsParallel().GroupBy(x => x.ItemCodeID).Select(x => x.First()).ToList()



                            );

                        //orden.ItemCodes = orden.ItemCodes.GroupBy(x => x.ItemCodeID).Select(x => x.First()).ToList();


                        if (itemCodeID > 0)
                        {
                            orden.ItemCodes = orden.ItemCodes.Where(x => x.ItemCodeID == itemCodeID.ToString()).ToList();
                        }

                        if (orden.ItemCodes.Count > 0)
                        {
                            listado.Add(orden);
                        }
                    }


                    foreach (var j in listado)
                    {
                        foreach (var i in j.ItemCodes)
                        {
                            foreach (var nu in i.NumerosUnicos)
                            {
                                int itemcodeID = Convert.ToInt32(i.ItemCodeID);
                                int numeroDigitos = (from it in ctx.Sam3_ItemCode
                                                     join pc in ctx.Sam3_ProyectoConfiguracion on it.ProyectoID equals pc.ProyectoID
                                                     where it.ItemCodeID == itemcodeID
                                                     select pc.DigitosNumeroUnico).AsParallel().SingleOrDefault();

                                string formato = "D" + numeroDigitos.ToString();

                                string[] codigo = nu.NumeroUnico.Split('-').ToArray();
                                int consecutivo = Convert.ToInt32(codigo[1]);
                                nu.NumeroUnico = codigo[0] + "-" + consecutivo.ToString(formato);
                            }

                            if (numeroUnicoID > 0)
                            {
                                i.NumerosUnicos = i.NumerosUnicos.Where(x => x.NumeroUnicoID == numeroUnicoID.ToString()).ToList();
                            }
                        }
                    }

                    return listado.OrderBy(x => x.FolioCuantificacion).ToList();
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public List<int> ObtenerNumerosUnicosPorItemCode(List<int> itemcodes)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<int> numerosunicos = new List<int>();
                    foreach (var item in itemcodes)
                    {
                        numerosunicos.AddRange(from nu in ctx.Sam3_NumeroUnico
                                               where nu.Activo && nu.ItemCodeID == item
                                               select nu.NumeroUnicoID);
                    }
                    return numerosunicos;
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                return null;
            }
        }

        public List<int> ObtenerItemCodesPorFolioCuantificacion(List<int> folioscuantificacion)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<int> itemcodes = new List<int>();

                    foreach (int i in folioscuantificacion)
                    {
                        itemcodes.AddRange(from rfc in ctx.Sam3_Rel_FolioCuantificacion_ItemCode
                                           join rid in ctx.Sam3_Rel_ItemCode_Diametro on rfc.Rel_ItemCode_Diametro_ID equals rid.Rel_ItemCode_Diametro_ID
                                           where rfc.Activo && rfc.FolioCuantificacionID == i
                                           select rid.ItemCodeID);
                    }

                    return itemcodes;
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return null;
            }
        }

        public object GenerarOrdenAlmacenaje(ListadosFolios listaDatos, Sam3_Usuario usuario)
        {
            try
            {
                List<int> numerosunicos = new List<int>();
                string ordenAlmacenajeFolio = "";
                Boolean activarFolioConfiguracion = !string.IsNullOrEmpty(ConfigurationManager.AppSettings["ActivarFolioConfiguracionOrdenAlmacenaje"]) ?
                    (ConfigurationManager.AppSettings["ActivarFolioConfiguracionOrdenAlmacenaje"].Equals("1") ? true : false) : false;


                if (listaDatos.listaNumerosUnicos.Count > 0)
                {
                    numerosunicos = listaDatos.listaNumerosUnicos.Select(x => x.ID).ToList();
                }

                if (listaDatos.listaItemCodes.Count > 0)
                {
                    //Obtengo los numero unicos
                    numerosunicos.AddRange(ObtenerNumerosUnicosPorItemCode(listaDatos.listaItemCodes.Select(x => x.ID).ToList()));
                }

                if (listaDatos.listaFoliosCuantificacion.Count > 0)
                {
                    //Se obtienen item codes Rel FC_IC
                    //se obtienen numeros unicos
                    List<int> ICporFolioCuantificacion = (ObtenerItemCodesPorFolioCuantificacion(listaDatos.listaFoliosCuantificacion.Select(x => x.ID).ToList()));

                    numerosunicos.AddRange(ObtenerNumerosUnicosPorItemCode(ICporFolioCuantificacion));
                }

                numerosunicos = numerosunicos.GroupBy(x => x).Select(x => x.First()).ToList();

                int consecutivo = 0;
                using (SamContext ctx = new SamContext())
                {
                    if (ctx.Sam3_OrdenAlmacenaje.Select(x => x.Folio).Any())
                    {
                        consecutivo = ctx.Sam3_OrdenAlmacenaje.Select(x => x.Folio).Max();
                        consecutivo = consecutivo > 0 ? consecutivo + 1 : 1;
                    }
                    else
                    {
                        consecutivo = 1;
                    }

                    //Insertamos en la tabla Orden Almacenaje
                    Sam3_OrdenAlmacenaje ordenAlmacenaje = new Sam3_OrdenAlmacenaje();
                    ordenAlmacenaje.Folio = consecutivo;
                    ordenAlmacenaje.FechaCreacion = DateTime.Now;
                    ordenAlmacenaje.Activo = true;
                    ordenAlmacenaje.FechaModificacion = DateTime.Now;
                    ordenAlmacenaje.UsuarioModificacion = usuario.UsuarioID;

                    ctx.Sam3_OrdenAlmacenaje.Add(ordenAlmacenaje);
                    ctx.SaveChanges();

                    List<int> proyectos = (from nu in ctx.Sam3_NumeroUnico
                                           where nu.Activo && numerosunicos.Contains(nu.NumeroUnicoID)
                                           select nu.ProyectoID).AsParallel().ToList();

                    Sam3_Rel_Proyecto_Entidad_Configuracion rel_proy = (from rel in ctx.Sam3_Rel_Proyecto_Entidad_Configuracion
                                                                        where rel.Proyecto == proyectos.Min() && rel.Activo == 1
                                                                        select rel).AsParallel().SingleOrDefault();

                    Sam3_OrdenAlmacenaje orden = ctx.Sam3_OrdenAlmacenaje.Where(x => x.OrdenAlmacenajeID == ordenAlmacenaje.OrdenAlmacenajeID && x.Activo).AsParallel().SingleOrDefault();
                    orden.Rel_Proyecto_Entidad_Configuracion_ID = rel_proy.Rel_Proyecto_Entidad_Configuracion_ID;
                    orden.Consecutivo = rel_proy.ConsecutivoFolioOrdenAlmacenaje;
                    rel_proy.ConsecutivoFolioOrdenAlmacenaje += 1;
                    ctx.SaveChanges();

                    if (activarFolioConfiguracion)
                    {
                        ordenAlmacenajeFolio = rel_proy.PreFijoFolioOrdenAlmacenaje + ","
                            + rel_proy.CantidadCerosFolioOrdenAlmacenaje.ToString() + ","
                            + rel_proy.ConsecutivoFolioOrdenAlmacenaje.ToString() + ","
                            + rel_proy.PostFijoFolioOrdenAlmacenaje;

                        string[] elemntos = ordenAlmacenajeFolio.Split(',').ToArray();
                        int digitos = Convert.ToInt32(elemntos[1]);
                        int cons = Convert.ToInt32(elemntos[2]);
                        string formato = "D" + digitos.ToString();

                        ordenAlmacenajeFolio = elemntos[0].Trim() + cons.ToString(formato).Trim() + elemntos[3].Trim();
                    }

                    //guardar relacion OA con cada numero unico
                    foreach (int item in numerosunicos)
                    {
                        Sam3_Rel_OrdenAlmacenaje_NumeroUnico relOrdenAlmacenaje = new Sam3_Rel_OrdenAlmacenaje_NumeroUnico();
                        relOrdenAlmacenaje.OrdenAlmacenajeID = ordenAlmacenaje.OrdenAlmacenajeID;
                        relOrdenAlmacenaje.NumeroUnicoID = item;
                        relOrdenAlmacenaje.FechaCreacion = DateTime.Now;
                        relOrdenAlmacenaje.Activo = true;
                        relOrdenAlmacenaje.FechaModificacion = DateTime.Now;
                        relOrdenAlmacenaje.UsuarioModificacion = usuario.UsuarioID;
                        ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico.Add(relOrdenAlmacenaje);
                    }

                    ctx.SaveChanges();

                    if (!(bool)EnviarAvisosBd.Instance.EnviarNotificación(1,
                       string.Format("Se generó un nuevo aviso de Entrada para el folio {0} con fecha {1}",
                       ordenAlmacenaje.OrdenAlmacenajeID, ordenAlmacenaje.FechaCreacion), usuario))
                    {
                        //Agregar error a la bitacora  PENDIENTE
                    }

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("Ok");
                    result.ReturnMessage.Add(activarFolioConfiguracion ? ordenAlmacenajeFolio : ordenAlmacenaje.Folio.ToString());
                    result.ReturnMessage.Add(ordenAlmacenaje.Folio.ToString());
                    result.ReturnCode = 200;
                    result.ReturnStatus = true;
                    result.IsAuthenicated = true;

                    return result;
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        /// <summary>
        /// Genera un set de datos para el grid de listado de Ordenes de almacenaje
        /// </summary>
        /// <param name="filtros"></param>
        /// <param name="usuario"></param>
        /// <returns></returns>
        public object ListadoOrdeAlmacenaje(FiltrosJson filtros, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Boolean activarFolioConfiguracion = !string.IsNullOrEmpty(ConfigurationManager.AppSettings["ActivarFolioConfiguracionOrdenAlmacenaje"]) ?
                 (ConfigurationManager.AppSettings["ActivarFolioConfiguracionOrdenAlmacenaje"].Equals("1") ? true : false) : false;

                    DateTime fechaInicial = new DateTime();
                    DateTime fechaFinal = new DateTime();
                    DateTime.TryParse(filtros.FechaInicial, out fechaInicial);
                    DateTime.TryParse(filtros.FechaFinal, out fechaFinal);

                    if (fechaFinal.ToShortDateString() == "1/1/0001")
                    {
                        fechaFinal = DateTime.Now;
                    }

                    if (fechaInicial.ToShortDateString() == "1/1/0001")
                    {
                        //int mes = DateTime.Now.Month != 1 ? DateTime.Now.Month - 1 : 12;
                        //int year = DateTime.Now.Month == 1 ? DateTime.Now.Year - 1 : DateTime.Now.Year;
                        //fechaInicial = new DateTime(year, mes, DateTime.Now.Day);
                        fechaInicial = new DateTime(2000, 01, 01);
                    }

                    int proyectoID = filtros.ProyectoID != "" ? Convert.ToInt32(filtros.ProyectoID) : 0;
                    int clienteID = filtros.ClienteID != "" ? Convert.ToInt32(filtros.ClienteID) : 0;
                    int folioAvisoLlegadaID = filtros.FolioAvisoLlegadaID != null ? Convert.ToInt32(filtros.FolioAvisoLlegadaID) : 0;
                    //int packingListID = filtros.PackingListID != "" ? Convert.ToInt32(filtros.PackingListID) : 0;

                    //Proyectos y patios del usuario
                    List<int> proyectos = ctx.Sam3_Rel_Usuario_Proyecto
                        .Where(x => x.UsuarioID == usuario.UsuarioID).Select(x => x.ProyectoID).AsParallel().ToList();

                    List<int> patios = (from r in ctx.Sam3_Proyecto
                                        join p in ctx.Sam3_Patio on r.PatioID equals p.PatioID
                                        where r.Activo && proyectos.Contains(r.ProyectoID)
                                        select p.PatioID).AsParallel().Distinct().ToList();

                    List<OrdenAlmacenajeJson> listado = new List<OrdenAlmacenajeJson>();

                    List<Sam3_OrdenAlmacenaje> ordenes = (from oa in ctx.Sam3_OrdenAlmacenaje
                                                          where oa.Activo
                                                          && (oa.FechaCreacion >= fechaInicial && oa.FechaCreacion <= fechaFinal)
                                                          select oa).AsParallel().ToList();

                    ordenes = ordenes.GroupBy(x => x.OrdenAlmacenajeID).Select(x => x.First()).ToList();

                    foreach (Sam3_OrdenAlmacenaje orden in ordenes)
                    {
                        OrdenAlmacenajeJson elemento = new OrdenAlmacenajeJson();
                        elemento.FechaOrdenAlmacenaje = orden.FechaCreacion != null ? orden.FechaCreacion.ToString("dd/MM/yyyy") : "";
                        elemento.OrdenAlmacenaje = orden.Folio.ToString();
                        elemento.OrdenAlmacenajeID = orden.Folio.ToString();

                        if (activarFolioConfiguracion)
                        {
                            Sam3_Rel_Proyecto_Entidad_Configuracion rel_proy = (from rel in ctx.Sam3_Rel_Proyecto_Entidad_Configuracion
                                                                                where rel.Rel_Proyecto_Entidad_Configuracion_ID == orden.Rel_Proyecto_Entidad_Configuracion_ID
                                                                                select rel).AsParallel().SingleOrDefault();
                            if (rel_proy != null)
                            {
                                string folioOA = rel_proy.PreFijoFolioOrdenAlmacenaje + ","
                                    + rel_proy.CantidadCerosFolioOrdenAlmacenaje.ToString() + ","
                                    + orden.Consecutivo.ToString() + ","
                                    + rel_proy.PostFijoFolioOrdenAlmacenaje;

                                string[] elemntos = folioOA.Split(',').ToArray();
                                int digitos = Convert.ToInt32(elemntos[1]);
                                int cons = Convert.ToInt32(elemntos[2]);
                                string formato_proy = "D" + digitos.ToString();

                                elemento.OrdenAlmacenaje = elemntos[0].Trim() + cons.ToString(formato_proy).Trim() + elemntos[3].Trim();
                            }
                        }

                        if (folioAvisoLlegadaID > 0)
                        {
                            elemento.FolioCuantificacion = (from ronu in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico
                                                            join nu in ctx.Sam3_NumeroUnico on ronu.NumeroUnicoID equals nu.NumeroUnicoID
                                                            join rid in ctx.Sam3_Rel_ItemCode_Diametro on nu.ItemCodeID equals rid.ItemCodeID
                                                            join rfci in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on rid.Rel_ItemCode_Diametro_ID equals rfci.Rel_ItemCode_Diametro_ID
                                                            join fc in ctx.Sam3_FolioCuantificacion on rfci.FolioCuantificacionID equals fc.FolioCuantificacionID
                                                            join fe in ctx.Sam3_FolioAvisoEntrada on fc.FolioAvisoEntradaID equals fe.FolioAvisoEntradaID
                                                            where ronu.OrdenAlmacenajeID == orden.OrdenAlmacenajeID
                                                            && fe.FolioAvisoLlegadaID == folioAvisoLlegadaID
                                                            && ronu.Activo && nu.Activo && rfci.Activo && fc.Activo && fe.Activo
                                                            select new PackingListCuantificacion
                                                            {
                                                                FolioCuantificacionID = fc.FolioCuantificacionID,
                                                                FolioCuantificacion = fc.PackingList,
                                                                OrdenAlmacenaje = orden.OrdenAlmacenajeID.ToString()
                                                            }).AsParallel().ToList();

                            elemento.FolioCuantificacion.AddRange((from ronu in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico
                                                                   join nu in ctx.Sam3_NumeroUnico on ronu.NumeroUnicoID equals nu.NumeroUnicoID
                                                                   join rid in ctx.Sam3_Rel_ItemCode_Diametro on nu.ItemCodeID equals rid.ItemCodeID
                                                                   join rbi in ctx.Sam3_Rel_Bulto_ItemCode on rid.Rel_ItemCode_Diametro_ID equals rbi.Rel_ItemCode_Diametro_ID
                                                                   join b in ctx.Sam3_Bulto on rbi.BultoID equals b.BultoID
                                                                   join fc in ctx.Sam3_FolioCuantificacion on b.FolioCuantificacionID equals fc.FolioCuantificacionID
                                                                   join fe in ctx.Sam3_FolioAvisoEntrada on fc.FolioAvisoEntradaID equals fe.FolioAvisoEntradaID
                                                                   where ronu.OrdenAlmacenajeID == orden.OrdenAlmacenajeID
                                                                   && fe.FolioAvisoLlegadaID == folioAvisoLlegadaID
                                                                   && ronu.Activo && nu.Activo && rbi.Activo && fc.Activo && b.Activo && fe.Activo
                                                                   select new PackingListCuantificacion
                                                                   {
                                                                       FolioCuantificacionID = fc.FolioCuantificacionID,
                                                                       FolioCuantificacion = fc.PackingList,
                                                                       OrdenAlmacenaje = orden.OrdenAlmacenajeID.ToString()
                                                                   }).AsParallel().ToList());
                        }
                        else
                        {
                            elemento.FolioCuantificacion = (from ronu in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico
                                                            join nu in ctx.Sam3_NumeroUnico on ronu.NumeroUnicoID equals nu.NumeroUnicoID
                                                            join rid in ctx.Sam3_Rel_ItemCode_Diametro on nu.ItemCodeID equals rid.ItemCodeID
                                                            join rfci in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on rid.Rel_ItemCode_Diametro_ID equals rfci.Rel_ItemCode_Diametro_ID
                                                            join fc in ctx.Sam3_FolioCuantificacion on rfci.FolioCuantificacionID equals fc.FolioCuantificacionID
                                                            where ronu.OrdenAlmacenajeID == orden.OrdenAlmacenajeID
                                                            && ronu.Activo && nu.Activo && rfci.Activo && fc.Activo
                                                            select new PackingListCuantificacion
                                                            {
                                                                FolioCuantificacionID = fc.FolioCuantificacionID,
                                                                FolioCuantificacion = fc.PackingList,
                                                                OrdenAlmacenaje = orden.OrdenAlmacenajeID.ToString()
                                                            }).AsParallel().ToList();

                            elemento.FolioCuantificacion.AddRange((from ronu in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico
                                                                   join nu in ctx.Sam3_NumeroUnico on ronu.NumeroUnicoID equals nu.NumeroUnicoID
                                                                   join rid in ctx.Sam3_Rel_ItemCode_Diametro on nu.ItemCodeID equals rid.ItemCodeID
                                                                   join rbi in ctx.Sam3_Rel_Bulto_ItemCode on rid.Rel_ItemCode_Diametro_ID equals rbi.Rel_ItemCode_Diametro_ID
                                                                   join b in ctx.Sam3_Bulto on rbi.BultoID equals b.BultoID
                                                                   join fc in ctx.Sam3_FolioCuantificacion on b.FolioCuantificacionID equals fc.FolioCuantificacionID
                                                                   where ronu.OrdenAlmacenajeID == orden.OrdenAlmacenajeID
                                                                   && ronu.Activo && nu.Activo && rbi.Activo && fc.Activo && b.Activo
                                                                   select new PackingListCuantificacion
                                                                   {
                                                                       FolioCuantificacionID = fc.FolioCuantificacionID,
                                                                       FolioCuantificacion = fc.PackingList,
                                                                       OrdenAlmacenaje = orden.OrdenAlmacenajeID.ToString()
                                                                   }).AsParallel().ToList());
                        }

                        if (proyectoID > 0)
                        {
                            elemento.FolioCuantificacion = (from fc in elemento.FolioCuantificacion
                                                            join bfc in ctx.Sam3_FolioCuantificacion on fc.FolioCuantificacionID equals bfc.FolioCuantificacionID
                                                            where bfc.ProyectoID == proyectoID
                                                            && bfc.Activo
                                                            select fc).AsParallel().ToList();
                        }

                        if (clienteID > 0)
                        {
                            int sam3Cliente = (from c in ctx.Sam3_Cliente
                                               where c.Activo && c.Sam2ClienteID == clienteID
                                               select c.ClienteID).AsParallel().SingleOrDefault();
                            elemento.FolioCuantificacion = (from tfc in elemento.FolioCuantificacion
                                                            join fc in ctx.Sam3_FolioCuantificacion on tfc.FolioCuantificacionID equals fc.FolioCuantificacionID
                                                            join fe in ctx.Sam3_FolioAvisoEntrada on fc.FolioAvisoEntradaID equals fe.FolioAvisoEntradaID
                                                            where fc.Activo && fe.Activo
                                                            && fe.ClienteID == sam3Cliente
                                                            select tfc).AsParallel().ToList();
                        }

                        elemento.FolioCuantificacion = elemento.FolioCuantificacion.GroupBy(x => x.FolioCuantificacionID).Select(x => x.First()).ToList();

                        foreach (PackingListCuantificacion folio in elemento.FolioCuantificacion)
                        {
                            folio.ItemCodes = (from rfci in ctx.Sam3_Rel_FolioCuantificacion_ItemCode
                                               join rid in ctx.Sam3_Rel_ItemCode_Diametro on rfci.Rel_ItemCode_Diametro_ID equals rid.Rel_ItemCode_Diametro_ID
                                               join nu in ctx.Sam3_NumeroUnico on rid.ItemCodeID equals nu.ItemCodeID
                                               join ronu in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico on nu.NumeroUnicoID equals ronu.NumeroUnicoID
                                               join it in ctx.Sam3_ItemCode on rid.ItemCodeID equals it.ItemCodeID
                                               where rfci.FolioCuantificacionID == folio.FolioCuantificacionID
                                               && rfci.Activo && nu.Activo && ronu.Activo && it.Activo
                                               select new ElementoItemCodeGenerarOrdenAlmacenaje
                                               {
                                                   OrdenAlmacenaje = orden.OrdenAlmacenajeID.ToString(),
                                                   ItemCodeID = it.ItemCodeID.ToString(),
                                                   Codigo = it.Codigo,
                                                   NumeroUnico = nu.Prefijo + "-" + nu.Consecutivo,
                                                   NumeroUnicoID = ronu.NumeroUnicoID.ToString()
                                               }).AsParallel().GroupBy(x => x.ItemCodeID).Select(x => x.First()).ToList();

                            folio.ItemCodes.AddRange((from rbi in ctx.Sam3_Rel_Bulto_ItemCode
                                                      join b in ctx.Sam3_Bulto on rbi.BultoID equals b.BultoID
                                                      join rid in ctx.Sam3_Rel_ItemCode_Diametro on rbi.Rel_ItemCode_Diametro_ID equals rid.Rel_ItemCode_Diametro_ID
                                                      join nu in ctx.Sam3_NumeroUnico on rid.ItemCodeID equals nu.ItemCodeID
                                                      join ronu in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico on nu.NumeroUnicoID equals ronu.NumeroUnicoID
                                                      join it in ctx.Sam3_ItemCode on rid.ItemCodeID equals it.ItemCodeID
                                                      where b.FolioCuantificacionID == folio.FolioCuantificacionID
                                                      && rbi.Activo && nu.Activo && ronu.Activo && it.Activo && b.Activo
                                                      select new ElementoItemCodeGenerarOrdenAlmacenaje
                                                      {
                                                          OrdenAlmacenaje = orden.OrdenAlmacenajeID.ToString(),
                                                          ItemCodeID = it.ItemCodeID.ToString(),
                                                          Codigo = it.Codigo,
                                                          NumeroUnico = nu.Prefijo + "-" + nu.Consecutivo,
                                                          NumeroUnicoID = ronu.NumeroUnicoID.ToString()
                                                      }).AsParallel().GroupBy(x => x.ItemCodeID).Select(x => x.First()).ToList());

                            foreach (var i in folio.ItemCodes)
                            {
                                int itemcodeID = Convert.ToInt32(i.ItemCodeID);
                                int numeroDigitos = (from it in ctx.Sam3_ItemCode
                                                     join pc in ctx.Sam3_ProyectoConfiguracion on it.ProyectoID equals pc.ProyectoID
                                                     where it.ItemCodeID == itemcodeID
                                                     select pc.DigitosNumeroUnico).AsParallel().SingleOrDefault();

                                string formato = "D" + numeroDigitos.ToString();

                                string[] codigo = i.NumeroUnico.Split('-').ToArray();
                                int consecutivo = Convert.ToInt32(codigo[1]);
                                i.NumeroUnico = codigo[0] + "-" + consecutivo.ToString(formato);
                            }
                        }

                        if (elemento.FolioCuantificacion.Count > 0)
                        {
                            listado.Add(elemento);
                        }
                    }


#if DEBUG
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    string json = serializer.Serialize(listado);
#endif
                    return listado.OrderBy(x => x.OrdenAlmacenaje).ToList();
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        /// <summary>
        /// Elimina un numero unico de la orden de almacenaje
        /// </summary>
        /// <param name="avisoLlegadaID"></param>
        /// <param name="usuario"></param>
        /// <returns>Aviso de exito o error</returns>
        public object EliminarNumeroUnicoOrdenAlmacenaje(string numerounico, Sam3_Usuario usuario)
        {
            try
            {
                TransactionalInformation result = new TransactionalInformation();
                using (SamContext ctx = new SamContext())
                {
                    int numerounicoid = Convert.ToInt32(numerounico);
                    Sam3_Rel_OrdenAlmacenaje_NumeroUnico almacenaje = ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico
                        .Where(x => x.NumeroUnicoID == numerounicoid && x.Activo)
                        .AsParallel().SingleOrDefault();


                    if (ctx.Sam3_NumeroUnico.Where(x => x.NumeroUnicoID == numerounicoid && !(x.Rack == null || x.Rack.Equals(""))).Any())
                    {
                        result.ReturnMessage.Add("No se puede eliminar el numero unico. Se encuentra almacenado.");
                        result.ReturnCode = 500;
                        result.ReturnStatus = false;
                        result.IsAuthenicated = true;

                        return result;
                    }
                    else
                    {
                        almacenaje.Activo = false;
                        almacenaje.UsuarioModificacion = usuario.UsuarioID;
                        almacenaje.FechaModificacion = DateTime.Now;

                        ctx.SaveChanges();


                        result.ReturnMessage.Add("Ok");
                        result.ReturnCode = 200;
                        result.ReturnStatus = false;
                        result.IsAuthenicated = true;
                    }



                    return result;
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object EliminarOrdenAlmacenaje(int folio, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    TransactionalInformation result = new TransactionalInformation();
                    Sam3_OrdenAlmacenaje orden = ctx.Sam3_OrdenAlmacenaje.Where(x => x.Folio == folio).AsParallel().SingleOrDefault();

                    if (orden != null)
                    {
                        orden.Activo = false;
                        orden.FechaModificacion = DateTime.Now;
                        orden.UsuarioModificacion = usuario.UsuarioID;

                        List<Sam3_Rel_OrdenAlmacenaje_NumeroUnico> relacion = ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico.Where(x => x.OrdenAlmacenajeID == orden.OrdenAlmacenajeID)
                            .AsParallel().ToList();
                        List<int> numeros = relacion.Select(x => x.NumeroUnicoID).AsParallel().ToList();

                        if (ctx.Sam3_NumeroUnico.Where(x => numeros.Contains(x.NumeroUnicoID) && !(x.Rack == null || x.Rack.Equals(""))).Any())
                        {
                            result.ReturnMessage.Add("No se puede eliminar la orden de almacenaje. Los numeros unicos tienen asignado un Rack.");
                            result.ReturnCode = 500;
                            result.ReturnStatus = false;
                            result.IsAuthenicated = true;

                            return result;
                        }
                        else
                        {
                            foreach (Sam3_Rel_OrdenAlmacenaje_NumeroUnico r in relacion)
                            {
                                r.Activo = false;
                                r.FechaModificacion = DateTime.Now;
                                r.UsuarioModificacion = usuario.UsuarioID;
                            }
                        }



                        ctx.SaveChanges();
                    }
                    else
                    {
                        result.ReturnMessage.Add("Error al eliminar la Orden de almacenaje");
                        result.ReturnCode = 500;
                        result.ReturnStatus = false;
                        result.IsAuthenicated = true;

                        return result;
                    }


                    result.ReturnMessage.Add("Ok");
                    result.ReturnCode = 200;
                    result.ReturnStatus = true;
                    result.IsAuthenicated = true;

                    return result;
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object ObtenerDetalleOrdenAlmacenaje(int folio, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Boolean activarFolioConfiguracionOA = !string.IsNullOrEmpty(ConfigurationManager.AppSettings["ActivarFolioConfiguracionOrdenAlmacenaje"]) ? 
                        (ConfigurationManager.AppSettings["ActivarFolioConfiguracionOrdenAlmacenaje"].Equals("1") ? true : false) : false;

                    Boolean activarFolioConfiguracionCuantificacion = !string.IsNullOrEmpty(ConfigurationManager.AppSettings["ActivarFolioConfiguracionCuantificacion"]) ? 
                        (ConfigurationManager.AppSettings["ActivarFolioConfiguracionCuantificacion"].Equals("1") ? true : false) : false;

                    bool activaConfigFolioLlegada = ConfigurationManager.AppSettings["ActivarFolioConfiguracion"].Equals("1") ? true : false;

                    ListadoDetalleOrdenAlmacenaje listadoDetalleOrdenAlmacenaje = new ListadoDetalleOrdenAlmacenaje();
                    List<ListadoGenerarOrdenAlmacenaje> listado = new List<ListadoGenerarOrdenAlmacenaje>();

                    Sam3_OrdenAlmacenaje ordenAlmacenaje = ctx.Sam3_OrdenAlmacenaje.Where(x => x.Folio == folio).AsParallel().SingleOrDefault();
                    int ordenAlmacenajeID = ordenAlmacenaje.OrdenAlmacenajeID;
                    List<Sam3_FolioCuantificacion> folios = (from roa in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico
                                                             join rel in ctx.Sam3_Rel_NumeroUnico_RelFC_RelB on roa.NumeroUnicoID equals rel.NumeroUnicoID
                                                             join rfi in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on rel.Rel_FolioCuantificacion_ItemCode_ID equals rfi.Rel_FolioCuantificacion_ItemCode_ID
                                                             join fc in ctx.Sam3_FolioCuantificacion on rfi.FolioCuantificacionID equals fc.FolioCuantificacionID
                                                             where roa.Activo && rel.Activo && rfi.Activo && fc.Activo
                                                             && roa.OrdenAlmacenajeID == ordenAlmacenajeID
                                                             select fc).AsParallel().Distinct().ToList();

                    folios.AddRange((from roa in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico
                                     join rel in ctx.Sam3_Rel_NumeroUnico_RelFC_RelB on roa.NumeroUnicoID equals rel.NumeroUnicoID
                                     join rbi in ctx.Sam3_Rel_Bulto_ItemCode on rel.Rel_Bulto_ItemCode_ID equals rbi.Rel_Bulto_ItemCode_ID
                                     join b in ctx.Sam3_Bulto on rbi.BultoID equals b.BultoID
                                     join fc in ctx.Sam3_FolioCuantificacion on b.FolioCuantificacionID equals fc.FolioCuantificacionID
                                     where roa.Activo && rel.Activo && rbi.Activo && b.Activo && fc.Activo
                                     && roa.OrdenAlmacenajeID == ordenAlmacenajeID
                                     select fc).AsParallel().Distinct().ToList());

                    if (folios.Count <= 0)
                    {
                        TransactionalInformation result = new TransactionalInformation();
                        result.ReturnMessage.Add("Error al obtener el detalle de la Orden de almacenaje");
                        result.ReturnCode = 500;
                        result.ReturnStatus = false;
                        result.IsAuthenicated = true;

                        return result;
                    }


                    int ProyectoID = folios.Select(b => b.ProyectoID).FirstOrDefault();
                    folios = folios.GroupBy(x => x.FolioCuantificacionID).Select(x => x.First()).ToList();

                    foreach (Sam3_FolioCuantificacion item in folios)
                    {
                        ListadoGenerarOrdenAlmacenaje listadoOrdenAlmacenaje = new ListadoGenerarOrdenAlmacenaje();

                        listadoOrdenAlmacenaje.FolioCuantificacion = item.FolioCuantificacionID.ToString();

                        Sam3_FolioAvisoLlegada folioLlegada = (from fc in ctx.Sam3_FolioCuantificacion
                                                               join fe in ctx.Sam3_FolioAvisoEntrada on fc.FolioAvisoEntradaID equals fe.FolioAvisoEntradaID
                                                               join fa in ctx.Sam3_FolioAvisoLlegada on fe.FolioAvisoLlegadaID equals fa.FolioAvisoLlegadaID
                                                               where fc.Activo && fe.Activo && fa.Activo
                                                               && fc.FolioCuantificacionID == item.FolioCuantificacionID
                                                               select fa).AsParallel().FirstOrDefault();

                        string NombreFolioAvisoLlegada = (from pc in ctx.Sam3_Rel_Proyecto_Entidad_Configuracion
                                                          where pc.Proyecto == folioLlegada.ProyectoNombrado
                                                          && pc.Entidad == folioLlegada.Entidad
                                                          select pc.PreFijoFolioAvisoLlegada + ","
                                                          + pc.CantidadCerosFolioAvisoLlegada.ToString() + ","
                                                          + folioLlegada.Consecutivo + ","
                                                          + pc.PostFijoFolioAvisoLlegada.Trim()).FirstOrDefault();

                        string NombreFolioCuantificacion = (from pc in ctx.Sam3_Rel_Proyecto_Entidad_Configuracion
                                                            where pc.Rel_Proyecto_Entidad_Configuracion_ID == item.Rel_Proyecto_Entidad_Configuracion_ID
                                                            select pc.PreFijoFolioPackingList + ","
                                                            + pc.CantidadCerosFolioPackingList.ToString() + ","
                                                            + item.ConsecutivoConfiguracion.ToString() + ","
                                                            + pc.PostFijoFolioPackingList).FirstOrDefault();

                        int FolioAvisoLlegadaID = folioLlegada.FolioAvisoLlegadaID;
                        int ConsecutivoFolioCuanificacion = item.Consecutivo.Value;
                        int ConsecutivoFolioLlegada = folioLlegada.Consecutivo.Value;

                        NombreFolioAvisoLlegada = Conversiones.Instance.FormatearCadenasdeElementos(NombreFolioAvisoLlegada);
                        NombreFolioCuantificacion = Conversiones.Instance.FormatearCadenasdeElementos(NombreFolioCuantificacion);

                        if (activaConfigFolioLlegada && activarFolioConfiguracionCuantificacion)
                        {
                            listadoOrdenAlmacenaje.FolioConfiguracionCuantificacion = NombreFolioAvisoLlegada + "-" + NombreFolioCuantificacion;
                        }

                        if (activaConfigFolioLlegada && !activarFolioConfiguracionCuantificacion)
                        {
                            listadoOrdenAlmacenaje.FolioConfiguracionCuantificacion = NombreFolioAvisoLlegada + "-" + ConsecutivoFolioCuanificacion;
                        }

                        if (!activaConfigFolioLlegada && activarFolioConfiguracionCuantificacion)
                        {
                            listadoOrdenAlmacenaje.FolioConfiguracionCuantificacion = FolioAvisoLlegadaID + "-" + NombreFolioCuantificacion;
                        }

                        if (!activaConfigFolioLlegada && !activarFolioConfiguracionCuantificacion)
                        {
                            listadoOrdenAlmacenaje.FolioConfiguracionCuantificacion = FolioAvisoLlegadaID + "-" + ConsecutivoFolioCuanificacion;
                        }


                        listadoOrdenAlmacenaje.ItemCodes = (from roa in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico
                                                            join num in ctx.Sam3_NumeroUnico on roa.NumeroUnicoID equals num.NumeroUnicoID
                                                            join ic in ctx.Sam3_ItemCode on num.ItemCodeID equals ic.ItemCodeID
                                                            join rid in ctx.Sam3_Rel_ItemCode_Diametro on ic.ItemCodeID equals rid.ItemCodeID
                                                            join rfc in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on rid.Rel_ItemCode_Diametro_ID equals rfc.Rel_ItemCode_Diametro_ID
                                                            join ric in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on rid.Rel_ItemCode_Diametro_ID equals ric.Rel_ItemCode_Diametro_ID
                                                            join rids in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro on ric.Rel_ItemCodeSteelgo_Diametro_ID equals rids.Rel_ItemCodeSteelgo_Diametro_ID
                                                            join ics in ctx.Sam3_ItemCodeSteelgo on rids.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                                            join p in ctx.Sam3_Proyecto on item.ProyectoID equals p.ProyectoID
                                                            join d1 in ctx.Sam3_Diametro on rids.Diametro1ID equals d1.DiametroID
                                                            join d2 in ctx.Sam3_Diametro on rids.Diametro2ID equals d2.DiametroID
                                                            where roa.Activo && num.Activo && ic.Activo && rfc.Activo && ric.Activo && ics.Activo && p.Activo
                                                            && roa.OrdenAlmacenajeID == ordenAlmacenajeID
                                                            && rfc.FolioCuantificacionID == item.FolioCuantificacionID
                                                            select new ElementoCuantificacionItemCode
                                                            {
                                                                ItemCodeID = ic.ItemCodeID.ToString(),
                                                                Codigo = ic.Codigo,
                                                                Descripcion = ics.DescripcionEspanol,
                                                                Cantidad = (from oar in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico
                                                                            join numuni in ctx.Sam3_NumeroUnico on oar.NumeroUnicoID equals numuni.NumeroUnicoID
                                                                            join itc in ctx.Sam3_ItemCode on numuni.ItemCodeID equals itc.ItemCodeID
                                                                            //join rfcic in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on itc.ItemCodeID equals rfcic.ItemCodeID
                                                                            where oar.Activo && numuni.Activo && itc.Activo //&& rfcic.Activo
                                                                            && oar.OrdenAlmacenajeID == ordenAlmacenajeID
                                                                                //&& rfcic.FolioCuantificacionID == item.FolioCuantificacionID
                                                                            && itc.ItemCodeID == ic.ItemCodeID
                                                                            select oar.NumeroUnicoID).Count().ToString(),
                                                                D1 = d1.Valor.ToString(),
                                                                D2 = d2.Valor.ToString(),
                                                                FolioCuantificacion = item.FolioCuantificacionID.ToString(),
                                                                Proyecto = p.Nombre,
                                                                ProyectoID = item.ProyectoID.ToString(),
                                                                NumerosUnicos = (from oar in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico
                                                                                 join numuni in ctx.Sam3_NumeroUnico on oar.NumeroUnicoID equals numuni.NumeroUnicoID
                                                                                 join itc in ctx.Sam3_ItemCode on numuni.ItemCodeID equals itc.ItemCodeID
                                                                                 where oar.Activo && numuni.Activo && itc.Activo //&& rfcic.Activo
                                                                                 && oar.OrdenAlmacenajeID == ordenAlmacenajeID
                                                                                 && numuni.ItemCodeID == ic.ItemCodeID
                                                                                 select new ElementoNumeroUnico
                                                                                 {
                                                                                     FolioCuantificacion = item.FolioCuantificacionID.ToString(),
                                                                                     ItemCodeID = ic.ItemCodeID.ToString(),
                                                                                     NumeroUnicoID = oar.NumeroUnicoID.ToString(),
                                                                                     NumeroUnico = numuni.Prefijo + "-" + numuni.Consecutivo
                                                                                 }).ToList()
                                                            }).AsParallel().ToList();

                        listadoOrdenAlmacenaje.ItemCodes.AddRange((from roa in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico
                                                                   join num in ctx.Sam3_NumeroUnico on roa.NumeroUnicoID equals num.NumeroUnicoID
                                                                   join ic in ctx.Sam3_ItemCode on num.ItemCodeID equals ic.ItemCodeID
                                                                   join rid in ctx.Sam3_Rel_ItemCode_Diametro on ic.ItemCodeID equals rid.ItemCodeID
                                                                   join rbi in ctx.Sam3_Rel_Bulto_ItemCode on rid.Rel_ItemCode_Diametro_ID equals rbi.Rel_ItemCode_Diametro_ID
                                                                   join b in ctx.Sam3_Bulto on rbi.BultoID equals b.BultoID
                                                                   join ric in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on rid.Rel_ItemCode_Diametro_ID equals ric.Rel_ItemCode_Diametro_ID
                                                                   join rids in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro on ric.Rel_ItemCodeSteelgo_Diametro_ID equals rids.Rel_ItemCodeSteelgo_Diametro_ID
                                                                   join ics in ctx.Sam3_ItemCodeSteelgo on rids.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                                                   join p in ctx.Sam3_Proyecto on item.ProyectoID equals p.ProyectoID
                                                                   join d1 in ctx.Sam3_Diametro on rids.Diametro1ID equals d1.DiametroID
                                                                   join d2 in ctx.Sam3_Diametro on rids.Diametro2ID equals d2.DiametroID
                                                                   where roa.Activo && num.Activo && ic.Activo && rbi.Activo && ric.Activo && ics.Activo && p.Activo
                                                                   && roa.OrdenAlmacenajeID == ordenAlmacenajeID
                                                                   && b.FolioCuantificacionID == item.FolioCuantificacionID
                                                                   select new ElementoCuantificacionItemCode
                                                                   {
                                                                       ItemCodeID = ic.ItemCodeID.ToString(),
                                                                       Codigo = ic.Codigo,
                                                                       Descripcion = ics.DescripcionEspanol,
                                                                       Cantidad = (from oar in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico
                                                                                   join numuni in ctx.Sam3_NumeroUnico on oar.NumeroUnicoID equals numuni.NumeroUnicoID
                                                                                   join itc in ctx.Sam3_ItemCode on numuni.ItemCodeID equals itc.ItemCodeID
                                                                                   //join rfcic in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on itc.ItemCodeID equals rfcic.ItemCodeID
                                                                                   where oar.Activo && numuni.Activo && itc.Activo //&& rfcic.Activo
                                                                                   && oar.OrdenAlmacenajeID == ordenAlmacenajeID
                                                                                       //&& rfcic.FolioCuantificacionID == item.FolioCuantificacionID
                                                                                   && itc.ItemCodeID == ic.ItemCodeID
                                                                                   select oar.NumeroUnicoID).Count().ToString(),
                                                                       D1 = d1.Valor.ToString(),
                                                                       D2 = d2.Valor.ToString(),
                                                                       FolioCuantificacion = item.FolioCuantificacionID.ToString(),
                                                                       Proyecto = p.Nombre,
                                                                       ProyectoID = item.ProyectoID.ToString(),
                                                                       NumerosUnicos = (from oar in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico
                                                                                        join numuni in ctx.Sam3_NumeroUnico on oar.NumeroUnicoID equals numuni.NumeroUnicoID
                                                                                        join itc in ctx.Sam3_ItemCode on numuni.ItemCodeID equals itc.ItemCodeID
                                                                                        where oar.Activo && numuni.Activo && itc.Activo //&& rfcic.Activo
                                                                                        && oar.OrdenAlmacenajeID == ordenAlmacenajeID
                                                                                        && numuni.ItemCodeID == ic.ItemCodeID
                                                                                        select new ElementoNumeroUnico
                                                                                        {
                                                                                            FolioCuantificacion = item.FolioCuantificacionID.ToString(),
                                                                                            ItemCodeID = ic.ItemCodeID.ToString(),
                                                                                            NumeroUnicoID = oar.NumeroUnicoID.ToString(),
                                                                                            NumeroUnico = numuni.Prefijo + "-" + numuni.Consecutivo
                                                                                        }).ToList()
                                                                   }).AsParallel().ToList());

                        listadoOrdenAlmacenaje.ItemCodes = listadoOrdenAlmacenaje.ItemCodes.GroupBy(x => x.ItemCodeID).Select(x => x.First()).ToList();

                        foreach (var i in listadoOrdenAlmacenaje.ItemCodes)
                        {
                            foreach (var nu in i.NumerosUnicos)
                            {
                                int itemcodeID = Convert.ToInt32(i.ItemCodeID);
                                int numeroDigitos = (from it in ctx.Sam3_ItemCode
                                                     join pc in ctx.Sam3_ProyectoConfiguracion on it.ProyectoID equals pc.ProyectoID
                                                     where it.ItemCodeID == itemcodeID
                                                     select pc.DigitosNumeroUnico).AsParallel().SingleOrDefault();
                                string formato = "D" + numeroDigitos.ToString();

                                string[] codigo = nu.NumeroUnico.Split('-').ToArray();
                                int consecutivo = Convert.ToInt32(codigo[1]);
                                nu.NumeroUnico = codigo[0] + "-" + consecutivo.ToString(formato);
                            }
                        }
                        listado.Add(listadoOrdenAlmacenaje);
                    };

                    string OrdenAlmacenajeFolio = activarFolioConfiguracionOA ?
                        ordenAlmacenaje.Rel_Proyecto_Entidad_Configuracion_ID != null ?
                       (from pc in ctx.Sam3_Rel_Proyecto_Entidad_Configuracion
                        where pc.Rel_Proyecto_Entidad_Configuracion_ID == ordenAlmacenaje.Rel_Proyecto_Entidad_Configuracion_ID
                        select pc.PreFijoFolioOrdenAlmacenaje + ","
                        + pc.CantidadCerosFolioOrdenAlmacenaje.ToString() + ","
                        + ordenAlmacenaje.Consecutivo + ","
                        + pc.PostFijoFolioOrdenAlmacenaje).FirstOrDefault() : ordenAlmacenaje.Folio.ToString() : ordenAlmacenaje.Folio.ToString();

                    if (activarFolioConfiguracionOA && ordenAlmacenaje.Rel_Proyecto_Entidad_Configuracion_ID != null)
                    {
                        string[] elemntos = OrdenAlmacenajeFolio.Split(',').ToArray();
                        int digitos = Convert.ToInt32(elemntos[1]);
                        int consecutivo = Convert.ToInt32(elemntos[2]);
                        string formato = "D" + digitos.ToString();

                        OrdenAlmacenajeFolio = elemntos[0].Trim() + consecutivo.ToString(formato).Trim() + elemntos[3].Trim();
                    }

                    listadoDetalleOrdenAlmacenaje.FolioConfiguracionOrdenAlmacenaje = OrdenAlmacenajeFolio;
                    listadoDetalleOrdenAlmacenaje.Activo = ordenAlmacenaje.Activo;
                    listadoDetalleOrdenAlmacenaje.ProyectoID = ProyectoID;
                    listadoDetalleOrdenAlmacenaje.ListadoGenerarOrdenAlmacenaje = listado.OrderBy(x => x.FolioCuantificacion).ToList();

                    return listadoDetalleOrdenAlmacenaje;
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public List<ListadoIncidencias> ListadoIncidencias(int clienteID, int proyectoID, List<int> proyectos, List<int> patios, List<int> IDs)
        {
            try
            {
                List<ListadoIncidencias> listado;
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_OrdenAlmacenaje> registros = new List<Sam3_OrdenAlmacenaje>();
                    Boolean ActivarFolioConfiguracionIncidencias = !string.IsNullOrEmpty(ConfigurationManager.AppSettings["ActivarFolioConfiguracionIncidencias"]) ? (ConfigurationManager.AppSettings["ActivarFolioConfiguracionIncidencias"].Equals("1") ? true : false) : false;

                    if (proyectoID > 0)
                    {
                        registros = (from oa in ctx.Sam3_OrdenAlmacenaje
                                     join ron in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico on oa.OrdenAlmacenajeID equals ron.OrdenAlmacenajeID
                                     join nu in ctx.Sam3_NumeroUnico on ron.NumeroUnicoID equals nu.NumeroUnicoID
                                     join p in ctx.Sam3_Proyecto on nu.ProyectoID equals p.ProyectoID
                                     join pa in ctx.Sam3_Patio on p.PatioID equals pa.PatioID
                                     where oa.Activo && ron.Activo && nu.Activo && p.Activo && pa.Activo
                                     && proyectos.Contains(p.ProyectoID)
                                     && patios.Contains(pa.PatioID)
                                     && p.ProyectoID == proyectoID
                                     && IDs.Contains(oa.OrdenAlmacenajeID)
                                     select oa).AsParallel().Distinct().ToList();

                    }
                    else
                    {
                        registros = (from oa in ctx.Sam3_OrdenAlmacenaje
                                     join ron in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico on oa.OrdenAlmacenajeID equals ron.OrdenAlmacenajeID
                                     join nu in ctx.Sam3_NumeroUnico on ron.NumeroUnicoID equals nu.NumeroUnicoID
                                     join p in ctx.Sam3_Proyecto on nu.ProyectoID equals p.ProyectoID
                                     join pa in ctx.Sam3_Patio on p.PatioID equals pa.PatioID
                                     where oa.Activo && ron.Activo && nu.Activo && p.Activo && pa.Activo
                                     && proyectos.Contains(p.ProyectoID)
                                     && patios.Contains(pa.PatioID)
                                     && IDs.Contains(oa.OrdenAlmacenajeID)
                                     select oa).AsParallel().Distinct().ToList();
                    }

                    if (clienteID > 0)
                    {
                        int sam3Cliente = (from c in ctx.Sam3_Cliente
                                           where c.Activo && c.Sam2ClienteID == clienteID
                                           select c.ClienteID).AsParallel().SingleOrDefault();
                        registros = (from r in registros
                                     join ron in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico on r.OrdenAlmacenajeID equals ron.OrdenAlmacenajeID
                                     join nu in ctx.Sam3_NumeroUnico on ron.NumeroUnicoID equals nu.NumeroUnicoID
                                     join p in ctx.Sam3_Proyecto on nu.ProyectoID equals p.ProyectoID
                                     where ron.Activo && nu.Activo && p.Activo
                                     && p.ClienteID == sam3Cliente
                                     select r).AsParallel().Distinct().ToList();
                    }

                    listado = (from r in registros
                               join rio in ctx.Sam3_Rel_Incidencia_OrdenAlmacenaje on r.OrdenAlmacenajeID equals rio.OrdenalmacenajeID
                               join inc in ctx.Sam3_Incidencia on rio.IncidenciaID equals inc.IncidenciaID
                               join c in ctx.Sam3_ClasificacionIncidencia on inc.ClasificacionID equals c.ClasificacionIncidenciaID
                               join tpi in ctx.Sam3_TipoIncidencia on inc.TipoIncidenciaID equals tpi.TipoIncidenciaID
                               where rio.Activo && inc.Activo && c.Activo && tpi.Activo
                               select new ListadoIncidencias
                               {
                                   FechaRegistro = inc.FechaCreacion.ToString(),
                                   FolioIncidenciaID = inc.IncidenciaID.ToString(),
                                   RegistradoPor = (from us in ctx.Sam3_Usuario
                                                    where us.Activo && us.UsuarioID == inc.UsuarioID
                                                    select us.Nombre + " " + us.ApellidoPaterno).SingleOrDefault(),
                                   TipoIncidencia = tpi.Nombre,
                                   Estatus = inc.Estatus,
                                   Clasificacion = c.Nombre,
                                   FolioConfiguracionIncidencia = ActivarFolioConfiguracionIncidencias ? (from pc in ctx.Sam3_Rel_Proyecto_Entidad_Configuracion
                                                                                                          where pc.Rel_Proyecto_Entidad_Configuracion_ID == inc.Rel_Proyecto_Entidad_Configuracion_ID
                                                                                                          select pc.PreFijoFolioIncidencias + ","
                                                                                                           + pc.CantidadCerosFolioIncidencias.ToString() + ","
                                                                                                           + inc.Consecutivo.ToString() + ","
                                                                                                           + pc.PostFijoFolioIncidencias).FirstOrDefault() : inc.IncidenciaID.ToString()
                               }).AsParallel().Distinct().ToList();

                    if (ActivarFolioConfiguracionIncidencias)
                    {
                        foreach (ListadoIncidencias item in listado)
                        {
                            if (!string.IsNullOrEmpty(item.FolioConfiguracionIncidencia))
                            {
                                string[] elemntos = item.FolioConfiguracionIncidencia.Split(',').ToArray();
                                int digitos = Convert.ToInt32(elemntos[1]);
                                int consecutivo = Convert.ToInt32(elemntos[2]);
                                string formato = "D" + digitos.ToString();

                                item.FolioConfiguracionIncidencia = elemntos[0].Trim() + consecutivo.ToString(formato).Trim() + elemntos[3].Trim();
                            }
                            else {
                                item.FolioConfiguracionIncidencia = item.FolioIncidenciaID.ToString();
                            }
                        }
                    }
                }

                return listado;
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                return null;
            }
        }

    }
}