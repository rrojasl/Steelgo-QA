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
using System.Web.Mvc;
using System.Net.Http;
using System.Net;
using System.IO;
using System.Net.Http.Headers;
using System.Transactions;

namespace BackEndSAM.DataAcces
{
    /// <summary>
    /// Clase que contiene funciones relacionadas con los avisos de Llegada 
    /// </summary>
    public class AlmacenajeBd
    {
        private static readonly object _mutex = new object();
        private static AlmacenajeBd _instance;
        

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private AlmacenajeBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static AlmacenajeBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new AlmacenajeBd();
                    }
                }
                return _instance;
            }
        }


        /// <summary>
        /// Obtiene las ordenes de almacenaje de un proyecto seleccionado
        /// </summary>
        /// <param name="avisoLlegadaID"></param>
        /// <returns>Regresa un JSON object con las propiedades de la orden de almacenaje</returns>
        public object ObtenerOrdenesAlmacenaje(int ProyectoID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Almacenaje lstAlmacenaje = new Almacenaje();
                    List<ListaCombos> ordenesAlmacenaje = new List<ListaCombos>();
                    //Patios y proyectos del usuario
                    List<int> proyectos = ctx.Sam3_Rel_Usuario_Proyecto.Where(x => x.UsuarioID == usuario.UsuarioID).Select(x => x.ProyectoID).AsParallel().ToList();

                    List<int> patios = (from r in ctx.Sam3_Proyecto
                                        join p in ctx.Sam3_Patio on r.PatioID equals p.PatioID
                                        where r.Activo && proyectos.Contains(r.ProyectoID)
                                        select p.PatioID).AsParallel().GroupBy(x => x).Select(x => x.First()).ToList();


                    List<Sam3_Rel_OrdenAlmacenaje_NumeroUnico> lstRelONU = (from fc in ctx.Sam3_FolioCuantificacion
                                                                            join fe in ctx.Sam3_FolioAvisoEntrada on fc.FolioAvisoEntradaID equals fe.FolioAvisoEntradaID
                                                                            join rfp in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on fe.FolioAvisoLlegadaID equals rfp.FolioAvisoLlegadaID
                                                                            join rfc in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on fc.FolioCuantificacionID equals rfc.FolioCuantificacionID
                                                                            join ic in ctx.Sam3_ItemCode on rfc.ItemCodeID equals ic.ItemCodeID
                                                                            join nu in ctx.Sam3_NumeroUnico on rfc.ItemCodeID equals nu.ItemCodeID
                                                                            join pr in ctx.Sam3_Proyecto on rfp.ProyectoID equals pr.ProyectoID
                                                                            join ora in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico on nu.NumeroUnicoID equals ora.NumeroUnicoID
                                                                            join oa in ctx.Sam3_OrdenAlmacenaje on ora.OrdenAlmacenajeID equals oa.OrdenAlmacenajeID
                                                                            where proyectos.Contains(fc.ProyectoID) && patios.Contains(pr.PatioID)
                                                                                  && fc.Activo && fe.Activo && rfp.Activo
                                                                                  && rfc.Activo && ic.Activo && nu.Activo
                                                                                  && pr.Activo && ora.Activo && oa.Activo
                                                                                  && fc.ProyectoID == ProyectoID
                                                                            select ora).AsParallel().ToList();

                    List<Sam3_Rel_OrdenAlmacenaje_NumeroUnico> agruparOrdenesAlmacenaje = lstRelONU.GroupBy(x => x.OrdenAlmacenajeID).Select(x => x.First()).OrderBy(x => x.OrdenAlmacenajeID).AsParallel().ToList();

                    ordenesAlmacenaje = (from roa in agruparOrdenesAlmacenaje
                                         join oa in ctx.Sam3_OrdenAlmacenaje on roa.OrdenAlmacenajeID equals oa.OrdenAlmacenajeID
                                             select new ListaCombos 
                                             {
                                                 id = oa.Folio.ToString(),
                                                 value = oa.Folio.ToString()
                                             }
                                        ).AsParallel().Distinct().ToList();

                    List<ListaCombos> OrdenarAlmacenaje = ordenesAlmacenaje.GroupBy(x => x.id).Select(x => x.First()).OrderBy(x => x.id).AsParallel().ToList();

                    //List<ListadoAlmacenaje> ListadoAlmacenaje = (from roa in agruparOrdenesAlmacenaje
                    //                                             join nu in ctx.Sam3_NumeroUnico on roa.NumeroUnicoID equals nu.NumeroUnicoID
                    //                                             select new ListadoAlmacenaje
                    //                                             {
                    //                                                 NumeroUnicoID = roa.NumeroUnicoID.ToString(),
                    //                                                 NumeroUnico = nu.Prefijo + "-" + nu.Consecutivo,
                    //                                                 Rack = nu.Rack == null ? string.Empty : nu.Rack
                    //                                             }).AsParallel().ToList();



                    //foreach (var item in ListadoAlmacenaje)
                    //{
                    //    int numeroDigitos = ctx.Sam3_ProyectoConfiguracion.Where(x => x.ProyectoID == ProyectoID)
                    //        .Select(x => x.DigitosNumeroUnico).AsParallel().SingleOrDefault();

                    //    string formato = "D" + numeroDigitos.ToString();

                    //    string[] elementos = item.NumeroUnico.Split('-').ToArray();

                    //    int temp = Convert.ToInt32(elementos[1]);

                    //    item.NumeroUnico = elementos[0] + "-" + temp.ToString(formato);
                    //}

                    //lstAlmacenaje.ListadoItemCode = ordenesAlmacenaje;
                    //lstAlmacenaje.ListadoAlmacenaje = ListadoAlmacenaje;

                    return OrdenarAlmacenaje;
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

        /// Obtiene los Item codes de una orden de almacenaje
        /// </summary>
        /// <param name="avisoLlegadaID"></param>
        /// <returns>Regresa un JSON object con las propiedades de los item codes</returns>
        //public object ObtenerItemCodesOrdenesAlmacenaje(int ProyectoID, string ordenAlmacenaje, Sam3_Usuario usuario)
        //{
        //    try
        //    {
        //        Almacenaje lstAlmacenaje = new Almacenaje();
        //        List<ListaCombos> ordenesAlmacenaje = new List<ListaCombos>();
        //        using (SamContext ctx = new SamContext())
        //        {
        //            int ordenAlmacenajeID = ordenAlmacenaje != "" ? Convert.ToInt32(ordenAlmacenaje) : 0;
                   

                   
        //            ////Patios y proyectos del usuario
        //            List<int> proyectos = ctx.Sam3_Rel_Usuario_Proyecto.Where(x => x.UsuarioID == usuario.UsuarioID).Select(x => x.ProyectoID).AsParallel().ToList();

        //            List<int> patios = (from r in ctx.Sam3_Proyecto
        //                                join p in ctx.Sam3_Patio on r.PatioID equals p.PatioID
        //                                where r.Activo && proyectos.Contains(r.ProyectoID)
        //                                select p.PatioID).AsParallel().GroupBy(x => x).Select(x => x.First()).ToList();


        //            List<Sam3_Rel_OrdenAlmacenaje_NumeroUnico> lstRelONU = (from fc in ctx.Sam3_FolioCuantificacion
        //                                                                    join fe in ctx.Sam3_FolioAvisoEntrada on fc.FolioAvisoEntradaID equals fe.FolioAvisoEntradaID
        //                                                                    join rfp in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on fe.FolioAvisoLlegadaID equals rfp.FolioAvisoLlegadaID
        //                                                                    join rfc in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on fc.FolioCuantificacionID equals rfc.FolioCuantificacionID
        //                                                                    join ic in ctx.Sam3_ItemCode on rfc.ItemCodeID equals ic.ItemCodeID
        //                                                                    join nu in ctx.Sam3_NumeroUnico on rfc.ItemCodeID equals nu.ItemCodeID
        //                                                                    join pr in ctx.Sam3_Proyecto on rfp.ProyectoID equals pr.ProyectoID
        //                                                                    join ora in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico on nu.NumeroUnicoID equals ora.NumeroUnicoID
        //                                                                    join oa in ctx.Sam3_OrdenAlmacenaje on ora.OrdenAlmacenajeID equals oa.OrdenAlmacenajeID
        //                                                                    where proyectos.Contains(fc.ProyectoID) && patios.Contains(pr.PatioID)
        //                                                                          && fc.Activo && fe.Activo && rfp.Activo
        //                                                                          && rfc.Activo && ic.Activo && nu.Activo
        //                                                                          && pr.Activo && ora.Activo && oa.Activo
        //                                                                          && oa.Folio == ordenAlmacenajeID
        //                                                                    select ora).AsParallel().ToList();

        //            //List<ListaCombos> lstItemCode = (from lstRel in lstRelONU
        //            //                                 join nu in ctx.Sam3_NumeroUnico on lstRel.NumeroUnicoID equals nu.NumeroUnicoID
        //            //                                 join ic in ctx.Sam3_ItemCode on nu.ItemCodeID equals ic.ItemCodeID
        //            //                                 select new ListaCombos
        //            //                                 {
        //            //                                     id = ic.ItemCodeID.ToString(),
        //            //                                     value = ic.Codigo
        //            //                                 }).AsParallel().ToList();

        //            //List<ListaCombos> agruparItemCodes = lstItemCode.GroupBy(x => x.id).Select(x => x.First()).OrderBy(x => x.id).AsParallel().ToList();


        //            List<Sam3_Rel_OrdenAlmacenaje_NumeroUnico> agruparOrdenesAlmacenaje = lstRelONU.GroupBy(x => x.OrdenAlmacenajeID).Select(x => x.First()).OrderBy(x => x.OrdenAlmacenajeID).AsParallel().ToList();

        //            ordenesAlmacenaje = (from roa in agruparOrdenesAlmacenaje
        //                                 join oa in ctx.Sam3_OrdenAlmacenaje on roa.OrdenAlmacenajeID equals oa.OrdenAlmacenajeID
        //                                 select new ListaCombos
        //                                 {
        //                                     id = oa.Folio.ToString(),
        //                                     value = oa.Folio.ToString()
        //                                 }
        //                                ).AsParallel().Distinct().ToList();

        //            List<ListaCombos> OrdenarAlmacenaje = ordenesAlmacenaje.GroupBy(x => x.id).Select(x => x.First()).OrderBy(x => x.id).AsParallel().ToList();
        //            List<ListadoAlmacenaje> ListadoAlmacenaje = (from roa in agruparOrdenesAlmacenaje
        //                                                         join nu in ctx.Sam3_NumeroUnico on roa.NumeroUnicoID equals nu.NumeroUnicoID
        //                                                         select new ListadoAlmacenaje
        //                                                         {
        //                                                             NumeroUnicoID = roa.NumeroUnicoID.ToString(),
        //                                                             NumeroUnico = nu.Prefijo + "-" + nu.Consecutivo,
        //                                                             Rack = nu.Rack == null ? string.Empty : nu.Rack
        //                                                         }).AsParallel().ToList();

        //            //AlmacenajeRack almacenaje = new AlmacenajeRack();
        //            //almacenaje.ItemCode = "1001";
        //            //almacenaje.NumeroUnicoID = "1";
        //            //almacenaje.NumeroUnico = "B-0001";
        //            //almacenaje.Rack = "REF-1";
        //            //almacenaje.TieneLocalizacion = "true";
        //            //Lstalmacenaje.Add(almacenaje);


        //            //foreach (var item in ListadoAlmacenaje)
        //            //{
        //            //    int numeroDigitos = ctx.Sam3_ProyectoConfiguracion.Where(x => x.ProyectoID == ProyectoID)
        //            //        .Select(x => x.DigitosNumeroUnico).AsParallel().SingleOrDefault();

        //            //    string formato = "D" + numeroDigitos.ToString();

        //            //    string[] elementos = item.NumeroUnico.Split('-').ToArray();

        //            //    int temp = Convert.ToInt32(elementos[1]);

        //            //    item.NumeroUnico = elementos[0] + "-" + temp.ToString(formato);
        //            //}

        //            //lstAlmacenaje.ListadoItemCode = agruparItemCodes;
        //            //lstAlmacenaje.ListadoAlmacenaje = ListadoAlmacenaje;

        //            return ListadoAlmacenaje;
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

        public object ObtenerItemCodesOrdenesAlmacenaje(string Proyecto, string ordenAlmacenaje, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Almacenaje lstAlmacenaje = new Almacenaje();
                    List<ListaCombos> ordenesAlmacenaje = new List<ListaCombos>();
                    int ProyectoID = Proyecto != "" ? Convert.ToInt32(Proyecto) : 0;
                    int ordenAlmacenajeID = ordenAlmacenaje != "" ? Convert.ToInt32(ordenAlmacenaje) : 0;
                    //Patios y proyectos del usuario
                    List<int> proyectos = ctx.Sam3_Rel_Usuario_Proyecto.Where(x => x.UsuarioID == usuario.UsuarioID).Select(x => x.ProyectoID).AsParallel().ToList();

                    List<int> patios = (from r in ctx.Sam3_Proyecto
                                        join p in ctx.Sam3_Patio on r.PatioID equals p.PatioID
                                        where r.Activo && proyectos.Contains(r.ProyectoID)
                                        select p.PatioID).AsParallel().GroupBy(x => x).Select(x => x.First()).ToList();


                    List<Sam3_Rel_OrdenAlmacenaje_NumeroUnico> lstRelONU = (from fc in ctx.Sam3_FolioCuantificacion
                                                                            join fe in ctx.Sam3_FolioAvisoEntrada on fc.FolioAvisoEntradaID equals fe.FolioAvisoEntradaID
                                                                            join rfp in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on fe.FolioAvisoLlegadaID equals rfp.FolioAvisoLlegadaID
                                                                            join rfc in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on fc.FolioCuantificacionID equals rfc.FolioCuantificacionID
                                                                            join ic in ctx.Sam3_ItemCode on rfc.ItemCodeID equals ic.ItemCodeID
                                                                            join nu in ctx.Sam3_NumeroUnico on rfc.ItemCodeID equals nu.ItemCodeID
                                                                            join pr in ctx.Sam3_Proyecto on rfp.ProyectoID equals pr.ProyectoID
                                                                            join ora in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico on nu.NumeroUnicoID equals ora.NumeroUnicoID
                                                                            join oa in ctx.Sam3_OrdenAlmacenaje on ora.OrdenAlmacenajeID equals oa.OrdenAlmacenajeID
                                                                            where proyectos.Contains(fc.ProyectoID) && patios.Contains(pr.PatioID)
                                                                                  && fc.Activo && fe.Activo && rfp.Activo
                                                                                  && rfc.Activo && ic.Activo && nu.Activo
                                                                                  && pr.Activo && ora.Activo && oa.Activo
                                                                                  && fc.ProyectoID == ProyectoID
                                                                                  && oa.Folio == ordenAlmacenajeID
                                                                            select ora).AsParallel().ToList();

                    List<Sam3_Rel_OrdenAlmacenaje_NumeroUnico> agruparNumerosUnicos = lstRelONU.GroupBy(x => x.NumeroUnicoID).Select(x => x.First()).OrderBy(x => x.NumeroUnicoID).AsParallel().ToList();

                    List<ListaCombos> lstItemCode = (from lstRel in lstRelONU
                                                     join nu in ctx.Sam3_NumeroUnico on lstRel.NumeroUnicoID equals nu.NumeroUnicoID
                                                     join ic in ctx.Sam3_ItemCode on nu.ItemCodeID equals ic.ItemCodeID
                                                     select new ListaCombos
                                                     {
                                                         id = ic.ItemCodeID.ToString(),
                                                         value = ic.Codigo
                                                     }).AsParallel().ToList();

                    List<ListaCombos> agruparItemCodes = lstItemCode.GroupBy(x => x.id).Select(x => x.First()).OrderBy(x => x.id).AsParallel().ToList();

                    List<ListadoAlmacenaje> ListadoAlmacenaje = (from roa in agruparNumerosUnicos
                                                                 join nu in ctx.Sam3_NumeroUnico on roa.NumeroUnicoID equals nu.NumeroUnicoID
                                                                 select new ListadoAlmacenaje
                                                                 {
                                                                     ItemCodeID=nu.ItemCodeID.ToString(),
                                                                     NumeroUnicoID = roa.NumeroUnicoID.ToString(),
                                                                     NumeroUnico = nu.Prefijo + "-" + nu.Consecutivo,
                                                                     Rack = nu.Rack == null ? string.Empty : nu.Rack
                                                                 }).AsParallel().ToList();



                    foreach (var item in ListadoAlmacenaje)
                    {
                        int numeroDigitos = ctx.Sam3_ProyectoConfiguracion.Where(x => x.ProyectoID == ProyectoID)
                            .Select(x => x.DigitosNumeroUnico).AsParallel().SingleOrDefault();

                        string formato = "D" + numeroDigitos.ToString();

                        string[] elementos = item.NumeroUnico.Split('-').ToArray();

                        int temp = Convert.ToInt32(elementos[1]);

                        item.NumeroUnico = elementos[0] + "-" + temp.ToString(formato);
                    }

                    lstAlmacenaje.ListadoItemCode = agruparItemCodes;
                    lstAlmacenaje.ListadoAlmacenaje = ListadoAlmacenaje;

                    return lstAlmacenaje;
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
        /// Obtiene los numeros unicos de un item code
        /// </summary>
        /// <param name="avisoLlegadaID"></param>
        /// <returns>Regresa un JSON object con las propiedades de los numeros unicos</returns>
        public object ObtenerNumerosUnicosOrdenesAlmacenaje(string itemCode, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    int itemCodeID = itemCode != "" ? Convert.ToInt32(itemCode) : 0;
                    List<NumerosUnicos> registros = new List<NumerosUnicos>();

                    registros = (from nu in ctx.Sam3_NumeroUnico
                                 where nu.Activo
                                       && nu.ItemCodeID == itemCodeID
                                 select new NumerosUnicos
                                 {
                                     NumeroUnicoID = nu.NumeroUnicoID.ToString(),
                                     NumeroUnico = nu.Prefijo + "-" + nu.Consecutivo
                                 }).AsParallel().ToList();

                    foreach (var nu in registros)
                    {
                        int numeroDigitos = (from it in ctx.Sam3_ItemCode
                                             join pc in ctx.Sam3_ProyectoConfiguracion on it.ProyectoID equals pc.ProyectoID
                                             where it.ItemCodeID == itemCodeID
                                             select pc.DigitosNumeroUnico).AsParallel().SingleOrDefault();

                        string formato = "D" + numeroDigitos.ToString();

                        string[] codigo = nu.NumeroUnico.Split('-').ToArray();
                        int consecutivo = Convert.ToInt32(codigo[1]);
                        nu.NumeroUnico = codigo[0] + "-" + consecutivo.ToString(formato);
                    }

                    return registros;
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
        public object ObtenerDiametrosItemCodeSteelgo(string itemCode, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    int itemCodeID = itemCode != "" ? Convert.ToInt32(itemCode) : 0;

                    ItemCodeSteelgoJson itemCodeSteelgo = (from ic in ctx.Sam3_ItemCode
                                                           join rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on ic.ItemCodeID equals rics.ItemCodeID
                                                           join ics in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                                           where rics.ItemCodeID == itemCodeID
                                                           select new ItemCodeSteelgoJson { 
                                                           //Diametro1= ics.Diametro1,
                                                           //Diametro2=ics.Diametro2
                                                           }).AsParallel().FirstOrDefault();

                    return itemCodeSteelgo;
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

        public object GenerarAlmacenaje(Items listados, Sam3_Usuario usuario)
        {
            try
            {
                List<ListaNumerosUnicos> ids = listados.NumerosUnicos.GroupBy(x => x.NumeroUnicoID).Select(x => x.First()).OrderBy(x => x.NumeroUnicoID).AsParallel().ToList();
                using (TransactionScope scope = new TransactionScope())
                {
                    using (SamContext ctx = new SamContext())
                    {
                        foreach (var row in ids)
                        {
                            int NumeroUnicoID = row.NumeroUnicoID != "" ? Convert.ToInt32(row.NumeroUnicoID) : 0;
                            Sam3_NumeroUnico numeroUnicoBd = ctx.Sam3_NumeroUnico.Where(x => x.NumeroUnicoID == NumeroUnicoID)
                                    .AsParallel().SingleOrDefault();

                            numeroUnicoBd.Rack = row.Rack;
                            numeroUnicoBd.UsuarioModificacion = usuario.UsuarioID;
                            numeroUnicoBd.FechaModificacion = DateTime.Now;

                            ctx.SaveChanges();
                        };

                        if (!(bool)EnviarAvisosBd.Instance.EnviarNotificación(1,
                                                        string.Format("Se guardaron los almacenajes del  orden de almacenaje Folio: {0}",
                                                        listados.OrdenAlmacenajeID), usuario))
                        {
                            //Agregar error a la bitacora  PENDIENTE
                        }
                    }
                    scope.Complete();

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


    }//Fin Clase
}