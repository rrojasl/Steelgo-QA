using BackEndSAM.Models;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

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

        //obtener proyectos del usuario
        //public object ObtenerProyectosOrdenAlmacenaje(/*Sam3_Usuario usuario*/)
        //{
        //    try
        //    {
        //        using (SamContext ctx = new SamContext())
        //        {
        //            List<int> proyectos = ctx.Sam3_Rel_Usuario_Proyecto.Where(x => x.UsuarioID == 1/*usuario.UsuarioID*/).Select(x => x.ProyectoID).AsParallel().ToList();

        //            List<Proyecto> listProy = new List<Proyecto>();
        //            Proyecto proy = new Proyecto();
        //            proyectos.ForEach(x =>
        //            {
        //                proy = ctx.Sam3_Proyecto.Where(p => p.ProyectoID == x)
        //                    .Select(o => new Proyecto
        //                    {
        //                        Nombre = o.Nombre,
        //                        ProyectoID = o.ProyectoID.ToString()
        //                    }).AsParallel().SingleOrDefault();
        //                listProy.Add(proy);
        //            });

        //            return listProy;
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        TransactionalInformation result = new TransactionalInformation();
        //        result.ReturnMessage.Add(ex.Message);
        //        result.ReturnCode = 500;
        //        result.ReturnStatus = false;
        //        result.IsAuthenicated = true;

        //        return result;
        //    }
        //}

        //obtener los folios de cuantificacion
        public object ObtenerFoliosCuantificacionOrdenAlmacenaje(int proyectoID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    //Si es Folio Cuantificacion
                    List<ListaCombos> lstFolios = (from fc in ctx.Sam3_FolioCuantificacion
                                                   where fc.ProyectoID == proyectoID
                                                   && fc.Activo
                                                   select new ListaCombos { 
                                                        id= fc.FolioCuantificacionID.ToString(),
                                                        value=fc.FolioCuantificacionID.ToString()
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

        public object ObtenerItemCodesOrdenAlmacenaje(int folioCuantificacion, Sam3_Usuario usuario)
        {
            List<ListaCombos> ComboItemCode = new List<ListaCombos>();

            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ComboItemCode = (from ic in ctx.Sam3_ItemCode
                                     join rfc in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on ic.ItemCodeID equals rfc.ItemCodeID
                                     where ic.Activo && rfc.Activo
                                     && rfc.FolioCuantificacionID == folioCuantificacion
                                     && (from ror in ctx.Sam3_Rel_OrdenRecepcion_ItemCode
                                         where ror.Activo
                                         select ror.ItemCodeID).Contains(ic.ItemCodeID)
                                     select new ListaCombos
                                     {
                                         id = ic.ItemCodeID.ToString(),
                                         value = ic.Codigo
                                     }).AsParallel().ToList();
                }

                return ComboItemCode;
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
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object ObtenerListadoGenerarOrdenAlmacenaje(FiltrosOrdenAlmacenaje filtros/*, Sam3_Usuario usuario*/)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    int proyectoID = filtros.ProyectoID != "" ? Convert.ToInt32(filtros.ProyectoID) : 0;
                    int folioCuantificacionID = filtros.FolioCuantificacionID != "" ? Convert.ToInt32(filtros.FolioCuantificacionID) : 0;
                    int itemCodeID = filtros.ItemCodeID != "" ? Convert.ToInt32(filtros.ItemCodeID) : 0;
                    int numeroUnicoID = filtros.NumeroUnicoID != "" ? Convert.ToInt32(filtros.NumeroUnicoID) : 0;

                    //Patios y proyectos del usuario
                    List<int> proyectos = ctx.Sam3_Rel_Usuario_Proyecto.Where(x => x.UsuarioID == 1/*usuario.UsuarioID*/).Select(x => x.ProyectoID).AsParallel().ToList();

                    List<int> patios = (from r in ctx.Sam3_Proyecto
                                        join p in ctx.Sam3_Patio on r.PatioID equals p.PatioID
                                        where r.Activo && proyectos.Contains(r.ProyectoID)
                                        select p.PatioID).AsParallel().GroupBy(x => x).Select(x => x.First()).ToList();
                    List<Sam3_FolioCuantificacion> registros;

                    //Obtengo los folios cuantificacion del usuario
                    if (proyectoID > 0)
                    {
                        registros = (from fc in ctx.Sam3_FolioCuantificacion
                                     join fe in ctx.Sam3_FolioAvisoEntrada on fc.FolioAvisoEntradaID equals fe.FolioAvisoEntradaID
                                     join rfp in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on fe.FolioAvisoLlegadaID equals rfp.FolioAvisoLlegadaID
                                     join p in ctx.Sam3_Proyecto on rfp.ProyectoID equals p.ProyectoID
                                     join pa in ctx.Sam3_Patio on p.PatioID equals pa.PatioID
                                     join rfc in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on fc.FolioCuantificacionID equals rfc.FolioCuantificacionID
                                     join ic in ctx.Sam3_ItemCode on rfc.ItemCodeID equals ic.ItemCodeID
                                     join nu in ctx.Sam3_NumeroUnico on rfc.ItemCodeID equals nu.ItemCodeID
                                     where fc.Activo && fe.Activo && rfp.Activo && p.Activo && pa.Activo && rfc.Activo && ic.Activo && nu.Activo
                                      && (from ror in ctx.Sam3_Rel_OrdenRecepcion_ItemCode
                                          where ror.Activo
                                          select ror.ItemCodeID).Contains(ic.ItemCodeID)
                                             && !(from roa in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico
                                                  where roa.Activo
                                                  select roa.NumeroUnicoID).Contains(nu.NumeroUnicoID)
                                     && proyectos.Contains(p.ProyectoID)
                                     && patios.Contains(pa.PatioID)
                                     && p.ProyectoID == proyectoID
                                     select fc).AsParallel().Distinct().ToList();

                    }
                    else
                    {
                        registros = (from fc in ctx.Sam3_FolioCuantificacion
                                     join fe in ctx.Sam3_FolioAvisoEntrada on fc.FolioAvisoEntradaID equals fe.FolioAvisoEntradaID
                                     join rfp in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on fe.FolioAvisoLlegadaID equals rfp.FolioAvisoLlegadaID
                                     join p in ctx.Sam3_Proyecto on rfp.ProyectoID equals p.ProyectoID
                                     join pa in ctx.Sam3_Patio on p.PatioID equals pa.PatioID
                                     join rfc in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on fc.FolioCuantificacionID equals rfc.FolioCuantificacionID
                                     join ic in ctx.Sam3_ItemCode on rfc.ItemCodeID equals ic.ItemCodeID
                                     join nu in ctx.Sam3_NumeroUnico on rfc.ItemCodeID equals nu.ItemCodeID

                                     where fc.Activo && fe.Activo && rfp.Activo && p.Activo && pa.Activo && rfc.Activo && ic.Activo && nu.Activo
                                      && (from ror in ctx.Sam3_Rel_OrdenRecepcion_ItemCode
                                          where ror.Activo
                                          select ror.ItemCodeID).Contains(ic.ItemCodeID)
                                             && !(from roa in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico
                                                  where roa.Activo
                                                  select roa.NumeroUnicoID).Contains(nu.NumeroUnicoID)
                                     && proyectos.Contains(p.ProyectoID)
                                     && patios.Contains(pa.PatioID)
                                     select fc).AsParallel().Distinct().ToList();
                    }

                    //Que sea igual al folio cuantificacion seleccionado 
                    if (folioCuantificacionID > 0)
                    {
                        registros = registros.Where(x => x.FolioCuantificacionID == folioCuantificacionID && x.Activo).AsParallel().ToList();

                    }

                    List<ListadoGenerarOrdenAlmacenaje> listado = new List<ListadoGenerarOrdenAlmacenaje>();


                    foreach (Sam3_FolioCuantificacion item in registros)
                    {
                        ListadoGenerarOrdenAlmacenaje orden = new ListadoGenerarOrdenAlmacenaje();
                        orden.FolioCuantificacion = item.FolioCuantificacionID.ToString();

                        orden.ItemCodes = (from rfc in ctx.Sam3_Rel_FolioCuantificacion_ItemCode
                                           join ic in ctx.Sam3_ItemCode on rfc.ItemCodeID equals ic.ItemCodeID
                                           join rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on rfc.ItemCodeID equals rics.ItemCodeID
                                           join ics in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                           where rfc.Activo && ic.Activo && rics.Activo && ics.Activo
                                           && rfc.FolioCuantificacionID == item.FolioCuantificacionID
                                           && (from ror in ctx.Sam3_Rel_OrdenRecepcion_ItemCode
                                               where ror.Activo
                                               select ror.ItemCodeID).Contains(ic.ItemCodeID)
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
                                               D1 = ics.Diametro1.ToString(),
                                               D2 = ics.Diametro2.ToString(),
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
                                           }).AsParallel().ToList();

                        


                        foreach (var i in orden.ItemCodes)
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

                        if (itemCodeID > 0)
                        {
                            orden.ItemCodes.Where(x => x.ItemCodeID == itemCodeID.ToString()).ToList();
                        }

                        if (numeroUnicoID > 0)
                        {
                        }

                        listado.Add(orden);
                    }
                    return listado;
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

        //public object ObtenerListadoGeneracionOrdenAlmacenaje(int proyectoID, int folioCuantificacion, int itemCodeID, int numeroUnicoID, Sam3_Usuario usuario)
        //{
        //    try
        //    {
        //        using (SamContext ctx = new SamContext())
        //        {
        //            List<OrdenAlmacenaje> listado = new List<OrdenAlmacenaje>();


        //            //Proyectos y patios del usuario
        //            List<int> proyectos = ctx.Sam3_Rel_Usuario_Proyecto.Where(x => x.UsuarioID == usuario.UsuarioID).Select(x => x.ProyectoID).AsParallel().ToList();

        //            List<int> patios = (from r in ctx.Sam3_Proyecto
        //                                join p in ctx.Sam3_Patio on r.PatioID equals p.PatioID
        //                                where r.Activo && proyectos.Contains(r.ProyectoID)
        //                                select p.PatioID).AsParallel().Distinct().ToList();

        //            List<Sam3_FolioAvisoEntrada> registros;

        //            if (proyectoID > 0)
        //            {
        //registros = (from fe in ctx.Sam3_FolioAvisoEntrada
        //             join rfp in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on fe.FolioAvisoLlegadaID equals rfp.FolioAvisoLlegadaID
        //             join p in ctx.Sam3_Proyecto on rfp.ProyectoID equals p.ProyectoID
        //             join pa in ctx.Sam3_Patio on p.PatioID equals pa.PatioID
        //             where fe.Activo && rfp.Activo && p.Activo && pa.Activo
        //             && proyectos.Contains(p.ProyectoID)
        //             && patios.Contains(pa.PatioID)
        //             select fe).AsParallel().Distinct().ToList();
        //            }
        //            else
        //            {
        //                registros = (from fe in ctx.Sam3_FolioAvisoEntrada
        //                             join rfp in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on fe.FolioAvisoLlegadaID equals rfp.FolioAvisoLlegadaID
        //                             join p in ctx.Sam3_Proyecto on rfp.ProyectoID equals p.ProyectoID
        //                             join pa in ctx.Sam3_Patio on p.PatioID equals pa.PatioID
        //                             where fe.Activo && rfp.Activo && p.Activo && pa.Activo
        //                             && proyectos.Contains(p.ProyectoID)
        //                             && patios.Contains(pa.PatioID)
        //                             && p.ProyectoID == proyectoID
        //                             select fe).AsParallel().Distinct().ToList();
        //            }

        //            foreach (Sam3_FolioAvisoEntrada r in registros)
        //            {
        //                List<Sam3_FolioCuantificacion> ordenes = new List<Sam3_FolioCuantificacion>();
        //                List<Sam3_FolioCuantificacion> folioscuantificacion = new List<Sam3_FolioCuantificacion>();


        //                folioscuantificacion = (from oa in ctx.Sam3_OrdenAlmacenaje
        //                                         join ronu in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico on oa.OrdenAlmacenajeID equals ronu.OrdenAlmacenajeID
        //                                         join nu in ctx.Sam3_NumeroUnico on ronu.NumeroUnicoID equals nu.NumeroUnicoID
        //                                         join roi in ctx.Sam3_Rel_OrdenRecepcion_ItemCode on nu.ItemCodeID equals roi.ItemCodeID
        //                                         join rfo in ctx.Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion on roi.OrdenRecepcionID equals rfo.OrdenRecepcionID
        //                                         join fe in ctx.Sam3_FolioAvisoEntrada on rfo.FolioAvisoEntradaID equals fe.FolioAvisoEntradaID
        //                                         join rfci in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on nu.ItemCodeID equals rfci.ItemCodeID
        //                                         join fc in ctx.Sam3_FolioCuantificacion on rfci.FolioCuantificacionID equals fc.FolioCuantificacionID
        //                                        where oa.Activo && ronu.Activo && nu.Activo && roi.Activo && rfo.Activo && fe.Activo
        //                                                   && fe.FolioAvisoEntradaID == r.FolioAvisoEntradaID
        //                                         select fc).AsParallel().ToList();

        //                folioscuantificacion = folioscuantificacion.GroupBy(x => x.FolioCuantificacionID).Select(x => x.First()).ToList();

        //                foreach (Sam3_FolioCuantificacion folios in folioscuantificacion)
        //                {

        //                }


        //            }


        //            //listado = (from ic in ctx.Sam3_ItemCode
        //            //           join ric in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on ic.ItemCodeID equals ric.ItemCodeID
        //            //           join nu in ctx.Sam3_NumeroUnico on ic.ItemCodeID equals nu.ItemCodeID
        //            //           join fc in ctx.Sam3_FolioCuantificacion on ric.FolioCuantificacionID equals fc.FolioCuantificacionID
        //            //           where ic.ProyectoID == proyectoID && ric.FolioCuantificacionID == folioCuantificacion && nu.NumeroUnicoID == numeroUnicoID && ic.ItemCodeID == itemCodeID
        //            //           select new OrdenAlmacenaje
        //            //           {

        //            //               ItemCodeID = ic.ItemCodeID.ToString(),
        //            //               Descripcion = ic.DescripcionEspanol,
        //            //               D1 = ic.Diametro1.ToString(),
        //            //               D2 = ic.Diametro2.ToString(),
        //            //               Cantidad = ic.Cantidad.ToString(),
        //            //               FolioCuantificacion = fc.PackingList,
        //            //               NumerosUnicos = (from numerounico in ctx.Sam3_NumeroUnico
        //            //                              where numerounico.NumeroUnicoID == numeroUnicoID
        //            //                              select numerounico.NumeroUnicoID).ToList()
        //            //           }).AsParallel().ToList();
        //            //return listado;
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        TransactionalInformation result = new TransactionalInformation();
        //        result.ReturnMessage.Add(ex.Message);
        //        result.ReturnCode = 500;
        //        result.ReturnStatus = false;
        //        result.IsAuthenicated = true;

        //        return result;
        //    }
        //}

        public object GenerarOrdenAlmacenaje(List<int> listaNU, Sam3_Usuario usuario)
        {
            try
            {
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

                    Sam3_OrdenAlmacenaje ordenAlmacenaje = new Sam3_OrdenAlmacenaje();
                    //Guardar en Orden de Almacenaje
                    ordenAlmacenaje.Folio = consecutivo;
                    ordenAlmacenaje.FechaCreacion = DateTime.Now;
                    ordenAlmacenaje.Activo = true;
                    ordenAlmacenaje.FechaModificacion = DateTime.Now;
                    ordenAlmacenaje.UsuarioModificacion = usuario.UsuarioID;

                    ctx.Sam3_OrdenAlmacenaje.Add(ordenAlmacenaje);
                    ctx.SaveChanges();

                    //guardar relacion OA con NU
                    foreach (var item in listaNU)
                    {
                        Sam3_Rel_OrdenAlmacenaje_NumeroUnico relOrdenAlmacenaje = new Sam3_Rel_OrdenAlmacenaje_NumeroUnico();
                        relOrdenAlmacenaje.OrdenAlmacenajeID = ordenAlmacenaje.OrdenAlmacenajeID;
                        relOrdenAlmacenaje.NumeroUnicoID = item;
                        relOrdenAlmacenaje.FechaCreacion = DateTime.Now;
                        relOrdenAlmacenaje.Activo = true;
                        relOrdenAlmacenaje.FechaModificacion = DateTime.Now;
                        relOrdenAlmacenaje.UsuarioModificacion = 1; //usuario.UsuarioID;
                        ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico.Add(relOrdenAlmacenaje);
                    }

                    ctx.SaveChanges();


                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("Ok");
                    result.ReturnMessage.Add(ordenAlmacenaje.OrdenAlmacenajeID.ToString());
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
                        int mes = DateTime.Now.Month != 1 ? DateTime.Now.Month - 1 : 12;
                        int year = DateTime.Now.Month == 1 ? DateTime.Now.Year - 1 : DateTime.Now.Year;
                        fechaInicial = new DateTime(year, mes, DateTime.Now.Day);
                    }

                    int proyectoID = filtros.ProyectoID != "" ? Convert.ToInt32(filtros.ProyectoID) : 0;
                    int clienteID = filtros.ClienteID != "" ? Convert.ToInt32(filtros.ClienteID) : 0;
                    int folioAvisoLlegadaID = filtros.FolioAvisoLlegadaID != null ? Convert.ToInt32(filtros.FolioAvisoLlegadaID) : 0;
                    int packingListID = filtros.PackingListID != "" ? Convert.ToInt32(filtros.PackingListID) : 0;

                    //Proyectos y patios del usuario
                    List<int> proyectos = ctx.Sam3_Rel_Usuario_Proyecto.Where(x => x.UsuarioID == usuario.UsuarioID).Select(x => x.ProyectoID).AsParallel().ToList();

                    List<int> patios = (from r in ctx.Sam3_Proyecto
                                        join p in ctx.Sam3_Patio on r.PatioID equals p.PatioID
                                        where r.Activo && proyectos.Contains(r.ProyectoID)
                                        select p.PatioID).AsParallel().Distinct().ToList();

                    List<Sam3_FolioAvisoEntrada> registros;
                    if (proyectoID > 0)
                    {
                        registros = (from fe in ctx.Sam3_FolioAvisoEntrada
                                     join rfp in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on fe.FolioAvisoLlegadaID equals rfp.FolioAvisoLlegadaID
                                     join p in ctx.Sam3_Proyecto on rfp.ProyectoID equals p.ProyectoID
                                     join pa in ctx.Sam3_Patio on p.PatioID equals pa.PatioID
                                     where fe.Activo && rfp.Activo && p.Activo && pa.Activo
                                     && proyectos.Contains(p.ProyectoID)
                                     && patios.Contains(pa.PatioID)
                                     && (fe.FechaCreacion >= fechaInicial && fe.FechaCreacion <= fechaFinal)
                                     select fe).AsParallel().Distinct().ToList();
                    }
                    else
                    {
                        registros = (from fe in ctx.Sam3_FolioAvisoEntrada
                                     join rfp in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on fe.FolioAvisoLlegadaID equals rfp.FolioAvisoLlegadaID
                                     join p in ctx.Sam3_Proyecto on rfp.ProyectoID equals p.ProyectoID
                                     join pa in ctx.Sam3_Patio on p.PatioID equals pa.PatioID
                                     where fe.Activo && rfp.Activo && p.Activo && pa.Activo
                                     && proyectos.Contains(p.ProyectoID)
                                     && patios.Contains(pa.PatioID)
                                     && (fe.FechaCreacion >= fechaInicial && fe.FechaCreacion <= fechaFinal)
                                     && p.ProyectoID == proyectoID
                                     select fe).AsParallel().Distinct().ToList();
                    }

                    if (clienteID > 0)
                    {
                        registros = registros.Where(x => x.ClienteID == clienteID).AsParallel().ToList();
                    }

                    if (folioAvisoLlegadaID > 0)
                    {
                        registros = registros.Where(x => x.FolioAvisoLlegadaID == folioAvisoLlegadaID).AsParallel().ToList();
                    }

                    registros = registros.GroupBy(x => x.FolioAvisoEntradaID).Select(x => x.First()).ToList();

                    List<OrdenAlmacenajeJson> listado = new List<OrdenAlmacenajeJson>();


                    foreach (Sam3_FolioAvisoEntrada r in registros)
                    {
                        List<Sam3_OrdenAlmacenaje> ordenes = new List<Sam3_OrdenAlmacenaje>();

                        ordenes = (from oa in ctx.Sam3_OrdenAlmacenaje
                                   join ronu in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico on oa.OrdenAlmacenajeID equals ronu.OrdenAlmacenajeID
                                   join nu in ctx.Sam3_NumeroUnico on ronu.NumeroUnicoID equals nu.NumeroUnicoID
                                   join roi in ctx.Sam3_Rel_OrdenRecepcion_ItemCode on nu.ItemCodeID equals roi.ItemCodeID
                                   join rfo in ctx.Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion on roi.OrdenRecepcionID equals rfo.OrdenRecepcionID
                                   join fe in ctx.Sam3_FolioAvisoEntrada on rfo.FolioAvisoEntradaID equals fe.FolioAvisoEntradaID
                                   where oa.Activo && ronu.Activo && nu.Activo && roi.Activo && rfo.Activo && fe.Activo
                                   && fe.FolioAvisoEntradaID == r.FolioAvisoEntradaID
                                   select oa).AsParallel().ToList();

                        ordenes = ordenes.GroupBy(x => x.OrdenAlmacenajeID).Select(x => x.First()).ToList();

                        foreach (Sam3_OrdenAlmacenaje orden in ordenes)
                        {
                            OrdenAlmacenajeJson elemento = new OrdenAlmacenajeJson();
                            elemento.FechaOrdenAlmacenaje = orden.FechaCreacion != null ? orden.FechaCreacion.ToString("dd/MM/yyyy") : "";
                            elemento.OrdenAlmacenaje = orden.OrdenAlmacenajeID.ToString();

                            if (packingListID > 0)
                            {
                                elemento.FolioCuantificacion = (from ronu in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico
                                                                join nu in ctx.Sam3_NumeroUnico on ronu.NumeroUnicoID equals nu.NumeroUnicoID
                                                                join rfci in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on nu.ItemCodeID equals rfci.ItemCodeID
                                                                join fc in ctx.Sam3_FolioCuantificacion on rfci.FolioCuantificacionID equals fc.FolioCuantificacionID
                                                                where ronu.OrdenAlmacenajeID == orden.OrdenAlmacenajeID
                                                                && fc.FolioCuantificacionID == packingListID
                                                                select new PackingListCuantificacion
                                                                {
                                                                    FolioCuantificacionID = fc.FolioCuantificacionID,
                                                                    FolioCuantificacion = fc.PackingList,
                                                                    OrdenAlmacenaje = orden.OrdenAlmacenajeID.ToString()
                                                                }).AsParallel().ToList();
                            }
                            else
                            {
                                elemento.FolioCuantificacion = (from ronu in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico
                                                                join nu in ctx.Sam3_NumeroUnico on ronu.NumeroUnicoID equals nu.NumeroUnicoID
                                                                join rfci in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on nu.ItemCodeID equals rfci.ItemCodeID
                                                                join fc in ctx.Sam3_FolioCuantificacion on rfci.FolioCuantificacionID equals fc.FolioCuantificacionID
                                                                where ronu.OrdenAlmacenajeID == orden.OrdenAlmacenajeID
                                                                select new PackingListCuantificacion
                                                                {
                                                                    FolioCuantificacionID = fc.FolioCuantificacionID,
                                                                    FolioCuantificacion = fc.PackingList,
                                                                    OrdenAlmacenaje = orden.OrdenAlmacenajeID.ToString()
                                                                }).AsParallel().ToList();
                            }

                            foreach (PackingListCuantificacion folio in elemento.FolioCuantificacion)
                            {
                                folio.ItemCodes = (from rfci in ctx.Sam3_Rel_FolioCuantificacion_ItemCode
                                                   join nu in ctx.Sam3_NumeroUnico on rfci.ItemCodeID equals nu.ItemCodeID
                                                   join ronu in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico on nu.NumeroUnicoID equals ronu.NumeroUnicoID
                                                   join it in ctx.Sam3_ItemCode on rfci.ItemCodeID equals it.ItemCodeID
                                                   where rfci.FolioCuantificacionID == folio.FolioCuantificacionID
                                                   select new ElementoItemCodeGenerarOrdenAlmacenaje
                                                   {
                                                       OrdenAlmacenaje = orden.OrdenAlmacenajeID.ToString(),
                                                       ItemCodeID = it.ItemCodeID.ToString(),
                                                       Codigo = it.Codigo,
                                                       NumeroUnico = nu.Prefijo + "-" + nu.Consecutivo,
                                                       NumeroUnicoID = ronu.NumeroUnicoID.ToString()
                                                   }).AsParallel().ToList();

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

                            listado.Add(elemento);
                        }

                    }



#if DEBUG
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    string json = serializer.Serialize(listado);
#endif
                    return listado;
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
                using (SamContext ctx = new SamContext())
                {
                    int numerounicoid = Convert.ToInt32(numerounico);
                    Sam3_Rel_OrdenAlmacenaje_NumeroUnico almacenaje = ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico.Where(x => x.NumeroUnicoID == numerounicoid)
                        .AsParallel().SingleOrDefault();


                    almacenaje.Activo = false;
                    almacenaje.UsuarioModificacion = usuario.UsuarioID;
                    almacenaje.FechaModificacion = DateTime.Now;

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

        public object EliminarOrdenAlmacenaje(int OrdenAlmacenajeID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_OrdenAlmacenaje orden = ctx.Sam3_OrdenAlmacenaje.Where(x => x.OrdenAlmacenajeID == OrdenAlmacenajeID).AsParallel().SingleOrDefault();
                    orden.Activo = false;
                    orden.FechaModificacion = DateTime.Now;
                    orden.UsuarioModificacion = usuario.UsuarioID;

                    List<Sam3_Rel_OrdenAlmacenaje_NumeroUnico> relacion = ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico.Where(x => x.OrdenAlmacenajeID == OrdenAlmacenajeID)
                        .AsParallel().ToList();

                    foreach (Sam3_Rel_OrdenAlmacenaje_NumeroUnico r in relacion)
                    {
                        r.Activo = false;
                        r.FechaModificacion = DateTime.Now;
                        r.UsuarioModificacion = usuario.UsuarioID;
                    }

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

    }
}