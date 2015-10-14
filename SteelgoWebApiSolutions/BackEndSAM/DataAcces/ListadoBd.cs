using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DatabaseManager.Sam3;
using DatabaseManager.Sam2;
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
    public class ListadoBd
    {
        private static readonly object _mutex = new object();
        private static ListadoBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private ListadoBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static ListadoBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new ListadoBd();
                    }
                }
                return _instance;
            }
        }

        /// <summary>
        /// Devuelve los conteos para el dashboard de avisos de llegada
        /// </summary>
        /// <param name="filtros"></param>
        /// <param name="usuario"></param>
        /// <returns></returns>
        public object ObtenerCantidadesDashboard(FiltrosJson filtros, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    //traemos la informacion de los patios y proyectos del usuario

                    CantidadesDashboard result = new CantidadesDashboard();
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

                    int patioID = filtros.PatioID != "" ? Convert.ToInt32(filtros.PatioID) : 0;
                    int clienteID = filtros.ClienteID != "" ? Convert.ToInt32(filtros.ClienteID) : 0;
                    int folioLlegadaID = filtros.FolioAvisoEntradaID != null ? Convert.ToInt32(filtros.FolioAvisoEntradaID) : 0;
                    int folioAvisoLlegadaID = filtros.FolioAvisoLlegadaID != null ? Convert.ToInt32(filtros.FolioAvisoLlegadaID) : 0;

                    List<Sam3_Rel_Usuario_Proyecto> lst = ctx.Sam3_Rel_Usuario_Proyecto.AsParallel().ToList();


                    List<int> proyectos = lst.Where(x => x.UsuarioID == usuario.UsuarioID).Select(x => x.ProyectoID).AsParallel().ToList();

                    List<int> patios = (from r in ctx.Sam3_Proyecto
                                        join p in ctx.Sam3_Patio on r.PatioID equals p.PatioID
                                        where r.Activo && proyectos.Contains(r.ProyectoID)
                                        select p.PatioID).AsParallel().ToList();


                    List<Sam3_FolioAvisoLlegada> registrosBd = new List<Sam3_FolioAvisoLlegada>();

                    //----------------------------------------------------------------------------------------------------------------------
                    //Creados
                    // Filtrado por fechas, patios y proyectos del usuario
                    if (folioLlegadaID <= 0 && folioAvisoLlegadaID <= 0)
                    {
                        registrosBd = (from r in ctx.Sam3_FolioAvisoLlegada
                                       join p in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on r.FolioAvisoLlegadaID equals p.FolioAvisoLlegadaID
                                       where r.Activo == true && p.Activo
                                       && patios.Contains(r.PatioID)
                                       && proyectos.Contains(p.ProyectoID)
                                       && (r.FechaRecepcion >= fechaInicial && r.FechaRecepcion <= fechaFinal)
                                       select r).AsParallel().ToList();
                    }

                    if (folioLlegadaID > 0 && folioAvisoLlegadaID <= 0)
                    {
                        registrosBd = (from fe in ctx.Sam3_FolioAvisoEntrada
                                       join fa in ctx.Sam3_FolioAvisoLlegada on fe.FolioAvisoLlegadaID equals fa.FolioAvisoLlegadaID
                                       join p in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on fa.FolioAvisoLlegadaID equals p.FolioAvisoLlegadaID
                                       where fe.Activo && fa.Activo && p.Activo
                                       && fe.FolioAvisoEntradaID == folioLlegadaID
                                       && patios.Contains(fa.PatioID)
                                       && proyectos.Contains(p.ProyectoID)
                                       && (fa.FechaRecepcion >= fechaInicial && fa.FechaRecepcion <= fechaFinal)
                                       select fa).AsParallel().ToList();
                    }

                    if (folioAvisoLlegadaID > 0 && folioLlegadaID <= 0)
                    {
                        registrosBd = (from r in ctx.Sam3_FolioAvisoLlegada
                                       join p in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on r.FolioAvisoLlegadaID equals p.FolioAvisoLlegadaID
                                       where r.Activo == true && p.Activo
                                       && r.FolioAvisoLlegadaID == folioAvisoLlegadaID
                                       && patios.Contains(r.PatioID)
                                       && proyectos.Contains(p.ProyectoID)
                                       && (r.FechaRecepcion >= fechaInicial && r.FechaRecepcion <= fechaFinal)
                                       select r).AsParallel().ToList();
                    }

                    if (folioLlegadaID > 0 && folioAvisoLlegadaID > 0)
                    {
                        registrosBd = (from fe in ctx.Sam3_FolioAvisoEntrada
                                       join fa in ctx.Sam3_FolioAvisoLlegada on fe.FolioAvisoLlegadaID equals fa.FolioAvisoLlegadaID
                                       join p in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on fa.FolioAvisoLlegadaID equals p.FolioAvisoLlegadaID
                                       where fe.Activo && fa.Activo && p.Activo
                                       && fe.FolioAvisoEntradaID == folioLlegadaID
                                       && fa.FolioAvisoLlegadaID == folioAvisoLlegadaID
                                       && patios.Contains(fa.PatioID)
                                       && proyectos.Contains(p.ProyectoID)
                                       && (fa.FechaRecepcion >= fechaInicial && fa.FechaRecepcion <= fechaFinal)
                                       select fa).AsParallel().ToList();
                    }


                    if (patioID > 0)
                    {
                        registrosBd = registrosBd.Where(x => x.PatioID == patioID).ToList();
                    }

                    if (clienteID > 0)
                    {
                        registrosBd = registrosBd.Where(x => x.ClienteID == clienteID).ToList();
                    }

                    registrosBd = registrosBd.GroupBy(x => x.FolioAvisoLlegadaID).Select(x => x.First()).ToList();

                    //----------------------------------------------------------------------------------------------------------------------

                    result.Creados = registrosBd.Select(x => x.FolioAvisoLlegadaID).Count();

                    result.Completos = (from r in registrosBd
                                        join p in ctx.Sam3_PermisoAduana on r.FolioAvisoLlegadaID equals p.FolioAvisoLlegadaID
                                        where r.Activo && p.Activo
                                        && p.PermisoAutorizado == true
                                        select r.FolioAvisoLlegadaID).AsParallel().Count();

                    result.SinAutorizacion = (from r in registrosBd
                                              join p in ctx.Sam3_PermisoAduana on r.FolioAvisoLlegadaID equals p.FolioAvisoLlegadaID
                                              where r.Activo == true && p.Activo
                                              && p.PermisoAutorizado == false
                                              select r.FolioAvisoLlegadaID).AsParallel().Count();

                    List<Sam3_FolioAvisoLlegada> temp = (from r in registrosBd
                                                         where r.Activo == true
                                                         && !(from x in ctx.Sam3_PermisoAduana
                                                              where x.Activo
                                                              select x.FolioAvisoLlegadaID).Contains(r.FolioAvisoLlegadaID)
                                                         select r).AsParallel().ToList();

                    temp = temp.GroupBy(x => x.FolioAvisoLlegadaID).Select(x => x.First()).ToList();

                    result.SinPermiso = temp.Count();


                    result.PorcentajeSinPermiso = result.Creados > 0 ? (result.SinPermiso * 100) / result.Creados : 0;
                    result.ProcentajeSinAutorizacion = result.Creados > 0 ? (result.SinAutorizacion * 100) / result.Creados : 0;
                    result.PorcentajeCompletos = result.Creados > 0 ? (result.Completos * 100) / result.Creados : 0;

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
        /// Devuelve los conteos para el dashboard de avisos de entrada de material
        /// </summary>
        /// <param name="filtros"></param>
        /// <param name="usuario"></param>
        /// <returns></returns>
        public object ObtenerCantidadesDashboardAvisoEntrada(FiltrosJson filtros, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    //traemos la informacion de los patios y proyectos del usuario

                    CantidadesDashboardAvisoEntrada result = new CantidadesDashboardAvisoEntrada();
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

                    int patioID = filtros.PatioID != "" ? Convert.ToInt32(filtros.PatioID) : 0;
                    int clienteID = filtros.ClienteID != "" ? Convert.ToInt32(filtros.ClienteID) : 0;

                    //Para aviso de llegada no se usan estos parametros de filtrado, segun el spec.
                    //int folioLlegadaID = filtros.FolioLlegadaID != null ? Convert.ToInt32(filtros.FolioLlegadaID) : 0;
                    //int folioAvisoLlegadaID = filtros.FolioAvisoLlegadaID != null ? Convert.ToInt32(filtros.FolioAvisoLlegadaID) : 0;

                    List<Sam3_Rel_Usuario_Proyecto> lst = ctx.Sam3_Rel_Usuario_Proyecto.AsParallel().ToList();


                    List<int> proyectos = lst.Where(x => x.UsuarioID == usuario.UsuarioID).Select(x => x.ProyectoID).AsParallel().ToList();

                    List<int> patios = (from r in ctx.Sam3_Proyecto
                                        join p in ctx.Sam3_Patio on r.PatioID equals p.PatioID
                                        where r.Activo && proyectos.Contains(r.ProyectoID)
                                        select p.PatioID).AsParallel().ToList();


                    List<Sam3_FolioAvisoEntrada> registrosBd = new List<Sam3_FolioAvisoEntrada>();

                    //Traer todos de acuerdo a las fechas, proyectos y patios del usuario

                    registrosBd = (from r in ctx.Sam3_FolioAvisoEntrada
                                   join p in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on r.FolioAvisoLlegadaID equals p.FolioAvisoLlegadaID
                                   join pry in ctx.Sam3_Proyecto on p.ProyectoID equals pry.ProyectoID
                                   join pa in ctx.Sam3_Patio on pry.PatioID equals pa.PatioID
                                   where r.Activo && p.Activo && pry.Activo && pa.Activo
                                   && proyectos.Contains(pry.ProyectoID)
                                   && patios.Contains(pa.PatioID)
                                   && (r.FechaModificacion >= fechaInicial && r.FechaModificacion <= fechaFinal)
                                   select r).AsParallel().ToList();


                    //eliminar duplicados
                    registrosBd = registrosBd.GroupBy(x => x.FolioAvisoEntradaID).Select(x => x.First()).ToList();

                    if (patioID > 0 && registrosBd.Count > 0)
                    {
                        registrosBd = (from r in registrosBd
                                       where r.Activo
                                       && r.PatioID == patioID
                                       select r).AsParallel().ToList();
                    }

                    if (clienteID > 0 && registrosBd.Count > 0)
                    {
                        registrosBd = registrosBd.Where(x => x.ClienteID == clienteID).ToList();
                    }

                    result.TotalCreados = registrosBd.Count();

                    result.SinEstaus = (from fa in ctx.Sam3_FolioAvisoLlegada
                                        where fa.Activo
                                        && !(from fe in ctx.Sam3_FolioAvisoEntrada
                                             where fe.Activo
                                             select fe.FolioAvisoLlegadaID).Contains(fa.FolioAvisoLlegadaID)
                                        select fa).AsParallel().Distinct().Count();

                    result.SinOrdenDescarga = (from r in registrosBd
                                               where r.FolioDescarga <= 0
                                               select r).Count();

                    result.SinPaseSalida = (from r in registrosBd
                                            join f in ctx.Sam3_FolioAvisoLlegada on r.FolioAvisoLlegadaID equals f.FolioAvisoLlegadaID
                                            where r.Activo && f.Activo
                                            && f.PaseSalidaEnviado == false
                                            select r).AsParallel().Count();

                    result.PorcentajeSinDescarga = result.TotalCreados > 0 ? (result.SinOrdenDescarga * 100) / result.TotalCreados : 0;
                    result.PorcentajeSinEstatus = result.TotalCreados > 0 ? (result.SinEstaus * 100) / result.TotalCreados : 0;
                    result.PorcentajeSinPaseSalida = result.TotalCreados > 0 ? (result.SinPaseSalida * 100) / result.TotalCreados : 0;

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
        /// Devuelve los conteos para el dashboard de cuantificacion
        /// </summary>
        /// <param name="filtros"></param>
        /// <param name="usuario"></param>
        /// <returns></returns>
        public object ObtenerCantidadesDashboardCuantificacion(FiltrosJson filtros, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    CantidadesDashboardCuantificacion result = new CantidadesDashboardCuantificacion();
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
                    int tipoMaterialID = filtros.TipoMaterialID != "" ? Convert.ToInt32(filtros.TipoMaterialID) : 0;

                    List<int> proyectos = ctx.Sam3_Rel_Usuario_Proyecto.Where(x => x.UsuarioID == usuario.UsuarioID).Select(x => x.ProyectoID).AsParallel().ToList();

                    List<int> patios = (from r in ctx.Sam3_Proyecto
                                        join p in ctx.Sam3_Patio on r.PatioID equals p.PatioID
                                        where r.Activo && proyectos.Contains(r.ProyectoID)
                                        select p.PatioID).AsParallel().ToList();

                    ////Traemos todos los folios que esten dentro del periodo de fechas y que correspondan a los proyectos y patios de los usuarios.
                    List<Sam3_FolioAvisoEntrada> registros = (from fae in ctx.Sam3_FolioAvisoEntrada
                                                              join fal in ctx.Sam3_FolioAvisoLlegada on fae.FolioAvisoLlegadaID equals fal.FolioAvisoLlegadaID
                                                              join rfal in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on fal.FolioAvisoLlegadaID equals rfal.FolioAvisoLlegadaID
                                                              join p in ctx.Sam3_Proyecto on rfal.ProyectoID equals p.ProyectoID
                                                              join pa in ctx.Sam3_Patio on p.PatioID equals pa.PatioID
                                                              where fae.Activo && fal.Activo && rfal.Activo && p.Activo && pa.Activo
                                                              && proyectos.Contains(rfal.ProyectoID)
                                                              && patios.Contains(pa.PatioID)
                                                              && (fae.FechaCreacion >= fechaInicial && fae.FechaCreacion <= fechaFinal)
                                                              && fae.FolioDescarga > 0
                                                              select fae).AsParallel().ToList();

                    if (proyectoID > 0)
                    {
                        registros = (from r in registros
                                     join re in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on r.FolioAvisoLlegadaID equals re.FolioAvisoLlegadaID
                                     where re.ProyectoID == proyectoID
                                     select r).AsParallel().ToList();
                    }

                    if (clienteID > 0)
                    {
                        registros = registros.Where(x => x.ClienteID == clienteID).ToList();
                    }

                    if (folioAvisoLlegadaID > 0)
                    {
                        registros = registros.Where(x => x.FolioAvisoLlegadaID == folioAvisoLlegadaID).ToList();
                    }

                    if (packingListID > 0)
                    {
                        registros = (from r in registros
                                     join f in ctx.Sam3_FolioCuantificacion on r.FolioAvisoEntradaID equals f.FolioAvisoEntradaID
                                     where f.Activo && f.FolioCuantificacionID == packingListID
                                     select r).AsParallel().ToList();
                    }

                    registros = registros.GroupBy(x => x.FolioAvisoEntradaID).Select(x => x.First()).ToList();

                    //folios de aviso de entrada que aun no tienen relacion en algun foliocuantificacion
                    //result.EntradaPorCuantificar = (from r in registros
                    //                                where r.Activo
                    //                                && (r.FolioDescarga != null || r.FolioDescarga > 0)
                    //                                && !(from c in ctx.Sam3_FolioCuantificacion
                    //                                     select c.FolioAvisoEntradaID).Contains(r.FolioAvisoEntradaID)
                    //                                && r.ComboEstatus != "Cerrado"
                    //                                select r).Count();

                    result.EntradaPorCuantificar = (int)ListadoMaterialesSinCuantificar(filtros, usuario, true);

                    //traer los Packinglisto por cuantificar
                    //result.PLPorCuantificar = (from r in registros
                    //                           join c in ctx.Sam3_FolioCuantificacion on r.FolioAvisoEntradaID equals c.FolioAvisoEntradaID
                    //                           join i in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on c.FolioCuantificacionID equals i.FolioCuantificacionID
                    //                           join it in ctx.Sam3_ItemCode on i.ItemCodeID equals it.ItemCodeID
                    //                           where r.Activo && c.Activo && i.Activo && it.Activo
                    //                           && c.Estatus != "Cerrado"
                    //                           && it.TipoMaterialID == tipoMaterialID
                    //                           && r.FolioDescarga > 0
                    //                           select r).AsParallel().Distinct().Count();
                    result.PLPorCuantificar = (int)ListadoPacknglistPorCuantificar(filtros, usuario, true);

                    //Traer materiales que no tienen un itemCodeSteelgo
                    //result.MTLSinICS = (from r in registros
                    //                    join f in ctx.Sam3_FolioCuantificacion on r.FolioAvisoEntradaID equals f.FolioAvisoEntradaID
                    //                    join rit in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on f.FolioCuantificacionID equals rit.FolioCuantificacionID
                    //                    join i in ctx.Sam3_ItemCode on rit.ItemCodeID equals i.ItemCodeID
                    //                    where f.Activo && rit.Activo && i.Activo && i.TipoMaterialID == tipoMaterialID
                    //                    && !(from its in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                    //                         where its.Activo
                    //                         select its.ItemCodeID).Contains(i.ItemCodeID)
                    //                    && r.FolioDescarga > 0
                    //                    select i).AsParallel().Count();


                    //itemcodes sin orde de recepcion
                    int itemsSinBulto = (from r in registros
                                         join f in ctx.Sam3_FolioCuantificacion on r.FolioAvisoEntradaID equals f.FolioAvisoEntradaID
                                         join rit in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on f.FolioCuantificacionID equals rit.FolioCuantificacionID
                                         join i in ctx.Sam3_ItemCode on rit.ItemCodeID equals i.ItemCodeID
                                         where f.Activo && rit.Activo && i.TipoMaterialID == tipoMaterialID
                                         && !(from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                              where rics.Activo
                                              select rics.ItemCodeID).Contains(rit.ItemCodeID)
                                         && r.FolioDescarga > 0
                                         select i).AsParallel().Count();

                    int itemsConEnBulto = (from r in registros
                                           join f in ctx.Sam3_FolioCuantificacion on r.FolioAvisoEntradaID equals f.FolioAvisoEntradaID
                                           join b in ctx.Sam3_Bulto on f.FolioCuantificacionID equals b.FolioCuantificacionID
                                           join rbi in ctx.Sam3_Rel_Bulto_ItemCode on b.BultoID equals rbi.BultoID
                                           join i in ctx.Sam3_ItemCode on rbi.ItemCodeID equals i.ItemCodeID
                                           where f.Activo && rbi.Activo && i.TipoMaterialID == tipoMaterialID
                                           && !(from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                                where rics.Activo
                                                select rics.ItemCodeID).Contains(rbi.ItemCodeID)
                                           && r.FolioDescarga > 0
                                           select i).AsParallel().Count();

                    result.MTLSinICS = itemsConEnBulto + itemsSinBulto;

                    result.MTLSinOrdenRecepcion = (int)OrdenRecepcionBd.Instance.ObtenerListadoGenerarOrdenRecepcion(filtros, usuario, true);

                    //Numeros unicos sin complemento de recepcion
                    //result.NUPorRecepcionar = (from r in registros
                    //                           join or in ctx.Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion on r.FolioAvisoEntradaID equals or.FolioAvisoEntradaID
                    //                           join o in ctx.Sam3_OrdenRecepcion on or.OrdenRecepcionID equals o.OrdenRecepcionID
                    //                           join roi in ctx.Sam3_Rel_OrdenRecepcion_ItemCode on o.OrdenRecepcionID equals roi.OrdenRecepcionID
                    //                           join i in ctx.Sam3_ItemCode on roi.ItemCodeID equals i.ItemCodeID
                    //                           join nu in ctx.Sam3_NumeroUnico on roi.ItemCodeID equals nu.ItemCodeID
                    //                           where or.Activo && o.Activo && roi.Activo && nu.Activo && i.TipoMaterialID == tipoMaterialID
                    //                           && r.FolioDescarga > 0
                    //                           && !(from rep in ctx.Sam3_Recepcion
                    //                                where rep.Activo
                    //                                select rep.ItemCodeID).Contains(nu.ItemCodeID.Value)
                    //                           select nu).AsParallel().Count();
                    result.NUPorRecepcionar = (int)ListadoNUConRecepcionSinComplemento(filtros, usuario, true);

                    //numeros unicos sin orden de almacenaje, que ya cuentan con recepcion y complemento de recepcion
                    result.NUSinOrdenAlmacenaje = (from r in registros
                                                   join rfo in ctx.Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion on r.FolioAvisoEntradaID equals rfo.FolioAvisoEntradaID
                                                   join o in ctx.Sam3_Rel_OrdenRecepcion_ItemCode on rfo.OrdenRecepcionID equals o.OrdenRecepcionID
                                                   join nu in ctx.Sam3_NumeroUnico on o.ItemCodeID equals nu.ItemCodeID
                                                   join rp in ctx.Sam3_Recepcion on o.ItemCodeID equals rp.ItemCodeID
                                                   join i in ctx.Sam3_ItemCode on o.ItemCodeID equals i.ItemCodeID
                                                   where rfo.Activo && o.Activo && nu.Activo && rp.Activo && i.Activo && i.TipoMaterialID == tipoMaterialID
                                                   && r.FolioDescarga > 0
                                                   && !(from ord in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico
                                                        where ord.Activo
                                                        select ord.NumeroUnicoID).Contains(nu.NumeroUnicoID)
                                                   select nu).AsParallel().Count();

                    //Numeros unicos sin rack
                    //result.NUSinAlmacenar = (from r in registros
                    //                         join rel in ctx.Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion on r.FolioAvisoEntradaID equals rel.FolioAvisoEntradaID
                    //                         join roi in ctx.Sam3_Rel_OrdenRecepcion_ItemCode on rel.OrdenRecepcionID equals roi.OrdenRecepcionID
                    //                         join nu in ctx.Sam3_NumeroUnico on roi.ItemCodeID equals nu.ItemCodeID
                    //                         join it in ctx.Sam3_ItemCode on nu.ItemCodeID equals it.ItemCodeID
                    //                         where rel.Activo && roi.Activo && nu.Activo && it.Activo && it.TipoMaterialID == tipoMaterialID
                    //                         && r.FolioDescarga > 0
                    //                         && nu.Rack == ""
                    //                         select nu).AsParallel().Count();
                    result.NUSinAlmacenar = (int)ListadoNUSinAlmacenaje(filtros, usuario, true);


                    result.TipoMaterial = tipoMaterialID.ToString();

                    //result.IncidenciasAbiertas = (from r in registros
                    //                              join rel in ctx.Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion on r.FolioAvisoEntradaID equals rel.FolioAvisoEntradaID
                    //                              join roi in ctx.Sam3_Rel_OrdenRecepcion_ItemCode on rel.OrdenRecepcionID equals roi.OrdenRecepcionID
                    //                              join nu in ctx.Sam3_NumeroUnico on roi.ItemCodeID equals nu.ItemCodeID
                    //                              join rnu in ctx.Sam3_Rel_Incidencia_NumeroUnico on nu.NumeroUnicoID equals rnu.NumeroUnicoID
                    //                              join it in ctx.Sam3_ItemCode on nu.ItemCodeID equals it.ItemCodeID
                    //                              join i in ctx.Sam3_Incidencia on rnu.IncidenciaID equals i.IncidenciaID
                    //                              where nu.Activo && rnu.Activo && it.Activo && i.Activo && it.TipoMaterialID == tipoMaterialID
                    //                              && r.FolioDescarga > 0
                    //                              select i).AsParallel().Count();
                    result.IncidenciasAbiertas = (int)ListadoIncidenciasActivas(filtros, usuario, true);

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
        /// Genera el listado para el grid de Entradas por cuantificar
        /// </summary>
        /// <param name="filtros"></param>
        /// <param name="usuario"></param>
        /// <returns></returns>
        public object ListadoMaterialesSinCuantificar(FiltrosJson filtros, Sam3_Usuario usuario, bool conteo = false)
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
                    //int packingListID = filtros.PackingListID != "" ? Convert.ToInt32(filtros.PackingListID) : 0;
                    //int tipoMaterialID = filtros.TipoMaterialID != "" ? Convert.ToInt32(filtros.TipoMaterialID) : 0;

                    List<int> proyectos = ctx.Sam3_Rel_Usuario_Proyecto.Where(x => x.UsuarioID == usuario.UsuarioID).Select(x => x.ProyectoID).AsParallel().ToList();

                    List<int> patios = (from r in ctx.Sam3_Proyecto
                                        join p in ctx.Sam3_Patio on r.PatioID equals p.PatioID
                                        where r.Activo && proyectos.Contains(r.ProyectoID)
                                        select p.PatioID).AsParallel().ToList();

                    patios = patios.Distinct().ToList();

                    //Traemos los folios de entrada de material que no tienen cuantificacion, filtrados por proyectos y patio de usuario
                    List<Sam3_FolioAvisoEntrada> registros = (from fe in ctx.Sam3_FolioAvisoEntrada
                                                              join rfp in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on fe.FolioAvisoLlegadaID equals rfp.FolioAvisoLlegadaID
                                                              join p in ctx.Sam3_Proyecto on rfp.ProyectoID equals p.ProyectoID
                                                              where fe.Activo && rfp.Activo && fe.FolioDescarga > 0
                                                              && !(from fc in ctx.Sam3_FolioCuantificacion
                                                                   where fc.Activo
                                                                   select fc.FolioAvisoEntradaID).Contains(fe.FolioAvisoEntradaID)
                                                              && (fe.FechaCreacion >= fechaInicial && fe.FechaCreacion <= fechaFinal)
                                                              && proyectos.Contains(p.ProyectoID)
                                                              && patios.Contains(p.PatioID)
                                                              && fe.ComboEstatus != "Cerrado"
                                                              select fe).AsParallel().ToList();
                    if (proyectoID > 0)
                    {
                        registros = (from r in registros
                                     join rfp in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on r.FolioAvisoLlegadaID equals rfp.FolioAvisoLlegadaID
                                     where rfp.ProyectoID == proyectoID
                                     select r).AsParallel().ToList();
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

                    List<ListadoMaterialesSinCuantificar> listado = (from r in registros
                                                                     join c in ctx.Sam3_Cliente on r.ClienteID equals c.ClienteID
                                                                     where c.Activo
                                                                     select new ListadoMaterialesSinCuantificar
                                                                     {
                                                                         FolioAvisoEntrada = r.FolioAvisoLlegadaID.ToString(),
                                                                         FechaDescarga = r.FechaFolioDescarga != null ? r.FechaFolioDescarga.Value.ToString() : "",
                                                                         Cliente = c.Nombre
                                                                     }).AsParallel().ToList();
                    if (conteo)
                    {
                        return listado.Count();
                    }
                    else
                    {
                        return listado;
                    }
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
        /// Genera el set de datos para el grid de Packing list sin cuantificar del dahsboard de cuantificacion
        /// </summary>
        /// <param name="filtros"></param>
        /// <param name="usuario"></param>
        /// <returns></returns>
        public object ListadoPacknglistPorCuantificar(FiltrosJson filtros, Sam3_Usuario usuario, bool conteo = false)
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
                    int tipoMaterialID = filtros.TipoMaterialID != "" ? Convert.ToInt32(filtros.TipoMaterialID) : 0;

                    List<int> proyectos = ctx.Sam3_Rel_Usuario_Proyecto.Where(x => x.UsuarioID == usuario.UsuarioID).Select(x => x.ProyectoID).AsParallel().ToList();

                    List<int> patios = (from r in ctx.Sam3_Proyecto
                                        join p in ctx.Sam3_Patio on r.PatioID equals p.PatioID
                                        where r.Activo && proyectos.Contains(r.ProyectoID)
                                        select p.PatioID).AsParallel().Distinct().ToList();

                    List<Sam3_FolioAvisoEntrada> registros = (from fe in ctx.Sam3_FolioAvisoEntrada
                                                              join rfp in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on fe.FolioAvisoLlegadaID equals rfp.FolioAvisoLlegadaID
                                                              join p in ctx.Sam3_Proyecto on rfp.ProyectoID equals p.ProyectoID
                                                              join fc in ctx.Sam3_FolioCuantificacion on fe.FolioAvisoEntradaID equals fc.FolioAvisoEntradaID
                                                              join rfi in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on fc.FolioCuantificacionID equals rfi.FolioCuantificacionID
                                                              join i in ctx.Sam3_ItemCode on rfi.ItemCodeID equals i.ItemCodeID
                                                              where fe.Activo && rfp.Activo && p.Activo && fc.Activo && rfi.Activo && i.Activo && fe.FolioDescarga > 0
                                                              && i.TipoMaterialID == tipoMaterialID
                                                              && fc.Estatus != "Cerrado"
                                                              && proyectos.Contains(p.ProyectoID)
                                                              && patios.Contains(p.PatioID)
                                                              && (fe.FechaCreacion >= fechaInicial && fe.FechaCreacion <= fechaFinal)
                                                              select fe).AsParallel().ToList();

                    if (proyectoID > 0)
                    {
                        registros = (from r in registros
                                     join rfp in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on r.FolioAvisoLlegadaID equals rfp.FolioAvisoLlegadaID
                                     where rfp.ProyectoID == proyectoID
                                     select r).AsParallel().ToList();

                    }

                    if (clienteID > 0)
                    {
                        registros = registros.Where(x => x.ClienteID == clienteID).AsParallel().ToList();
                    }

                    if (folioAvisoLlegadaID > 0)
                    {
                        registros = registros.Where(x => x.FolioAvisoLlegadaID == folioAvisoLlegadaID).AsParallel().ToList();
                    }

                    if (packingListID > 0)
                    {
                        registros = (from r in registros
                                     join fc in ctx.Sam3_FolioCuantificacion on r.FolioAvisoEntradaID equals fc.FolioAvisoEntradaID
                                     where fc.FolioCuantificacionID == packingListID
                                     select r).AsParallel().ToList();
                    }

                    registros = registros.GroupBy(x => x.FolioAvisoEntradaID).Select(x => x.First()).ToList();

                    List<ListadoPLporCuantificar> listado = (from r in registros
                                                             join rfp in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on r.FolioAvisoLlegadaID equals rfp.FolioAvisoLlegadaID
                                                             join p in ctx.Sam3_Proyecto on rfp.ProyectoID equals p.ProyectoID
                                                             join fc in ctx.Sam3_FolioCuantificacion on r.FolioAvisoEntradaID equals fc.FolioAvisoEntradaID
                                                             select new ListadoPLporCuantificar
                                                             {
                                                                 Proyecto = p.Nombre,
                                                                 FolioAvisoEntrada = r.FolioAvisoLlegadaID.ToString(),
                                                                 FechaDescarga = r.FechaFolioDescarga != null ? r.FechaFolioDescarga.Value.ToString() : "",
                                                                 FechaCreacionPackingList = fc.FechaCreacion != null ? fc.FechaCreacion.Value.ToString() : "",
                                                                 PackingList = fc.PackingList
                                                             }).AsParallel().ToList();

                    if (conteo)
                    {
                        return listado.Count();
                    }
                    else
                    {
                        return listado;
                    }
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
        /// Genera el set de datos para el gri de Materiales sin ItemCodeSteelgo
        /// </summary>
        /// <param name="filtros"></param>
        /// <param name="usuario"></param>
        /// <returns></returns>
        public object ListadoMTLSinICS(FiltrosJson filtros, Sam3_Usuario usuario, bool conteo = false)
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
                    int tipoMaterialID = filtros.TipoMaterialID != "" ? Convert.ToInt32(filtros.TipoMaterialID) : 0;

                    List<int> proyectos = ctx.Sam3_Rel_Usuario_Proyecto.Where(x => x.UsuarioID == usuario.UsuarioID).Select(x => x.ProyectoID).AsParallel().ToList();

                    List<int> patios = (from r in ctx.Sam3_Proyecto
                                        join p in ctx.Sam3_Patio on r.PatioID equals p.PatioID
                                        where r.Activo && proyectos.Contains(r.ProyectoID)
                                        select p.PatioID).AsParallel().Distinct().ToList();

                    List<Sam3_FolioAvisoEntrada> registos;

                    if (proyectoID > 0)
                    {
                        registos = (from fe in ctx.Sam3_FolioAvisoEntrada
                                    join rfp in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on fe.FolioAvisoLlegadaID equals rfp.FolioAvisoLlegadaID
                                    join p in ctx.Sam3_Proyecto on rfp.ProyectoID equals p.ProyectoID
                                    join fc in ctx.Sam3_FolioCuantificacion on fe.FolioAvisoEntradaID equals fc.FolioAvisoEntradaID
                                    join rfi in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on fc.FolioCuantificacionID equals rfi.FolioCuantificacionID
                                    join i in ctx.Sam3_ItemCode on rfi.ItemCodeID equals i.ItemCodeID
                                    where fe.Activo && rfp.Activo && p.Activo && fc.Activo && rfi.Activo && i.Activo
                                    && !(from its in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                         where its.Activo
                                         select its.ItemCodeID).Contains(i.ItemCodeID)
                                    && proyectos.Contains(p.ProyectoID)
                                    && patios.Contains(p.PatioID)
                                    && (fe.FechaCreacion >= fechaInicial && fe.FechaCreacion <= fechaFinal)
                                    && p.ProyectoID == proyectoID
                                    select fe).AsParallel().ToList();
                    }
                    else
                    {
                        registos = (from fe in ctx.Sam3_FolioAvisoEntrada
                                    join rfp in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on fe.FolioAvisoLlegadaID equals rfp.FolioAvisoLlegadaID
                                    join p in ctx.Sam3_Proyecto on rfp.ProyectoID equals p.ProyectoID
                                    join fc in ctx.Sam3_FolioCuantificacion on fe.FolioAvisoEntradaID equals fc.FolioAvisoEntradaID
                                    join rfi in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on fc.FolioCuantificacionID equals rfi.FolioCuantificacionID
                                    join i in ctx.Sam3_ItemCode on rfi.ItemCodeID equals i.ItemCodeID
                                    where fe.Activo && rfp.Activo && p.Activo && fc.Activo && rfi.Activo && i.Activo
                                    && !(from its in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                         where its.Activo
                                         select its.ItemCodeID).Contains(i.ItemCodeID)
                                    && proyectos.Contains(p.ProyectoID)
                                    && patios.Contains(p.PatioID)
                                    && (fe.FechaCreacion >= fechaInicial && fe.FechaCreacion <= fechaFinal)
                                    select fe).AsParallel().ToList();
                    }

                    if (clienteID > 0)
                    {
                        registos = registos.Where(x => x.ClienteID == clienteID).ToList();
                    }

                    if (folioAvisoLlegadaID > 0)
                    {
                        registos = registos.Where(x => x.FolioAvisoLlegadaID == folioAvisoLlegadaID).ToList();
                    }

                    //Quitar duplicados
                    registos = registos.GroupBy(x => x.FolioAvisoLlegadaID).Select(x => x.First()).ToList();

                    List<ListadoMTLSinICS> listado = new List<ListadoMTLSinICS>();

                    foreach (Sam3_FolioAvisoEntrada fae in registos)
                    {
                        List<Sam3_FolioCuantificacion> foliosCuantificacion;
                        if (packingListID > 0)
                        {
                            foliosCuantificacion = (from fc in ctx.Sam3_FolioCuantificacion
                                                    join fe in ctx.Sam3_FolioAvisoEntrada on fc.FolioAvisoEntradaID equals fe.FolioAvisoEntradaID
                                                    where fe.FolioAvisoEntradaID == fae.FolioAvisoEntradaID
                                                    && fc.FolioCuantificacionID == packingListID
                                                    select fc).ToList();
                        }
                        else
                        {
                            foliosCuantificacion = (from fc in ctx.Sam3_FolioCuantificacion
                                                    join fe in ctx.Sam3_FolioAvisoEntrada on fc.FolioAvisoEntradaID equals fe.FolioAvisoEntradaID
                                                    where fe.FolioAvisoEntradaID == fae.FolioAvisoEntradaID
                                                    select fc).ToList();
                        }

                        foliosCuantificacion = foliosCuantificacion.GroupBy(x => x.FolioCuantificacionID).Select(x => x.First()).ToList();

                        foreach (Sam3_FolioCuantificacion fc in foliosCuantificacion)
                        {
                            ListadoMTLSinICS elemento = new ListadoMTLSinICS();
                            elemento.FechaCreacionPackingList = fc.FechaCreacion != null ? fc.FechaCreacion.Value.ToString("dd/MM/yyyy") : "";
                            elemento.PackingList = fc.PackingList;
                            elemento.Proyecto = ctx.Sam3_Proyecto.Where(x => x.ProyectoID == fc.ProyectoID).Select(x => x.Nombre).SingleOrDefault();

                            elemento.CantidadSinICS = (from f in ctx.Sam3_FolioCuantificacion
                                                       join rfi in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on f.FolioCuantificacionID equals rfi.FolioCuantificacionID
                                                       join it in ctx.Sam3_ItemCode on rfi.ItemCodeID equals it.ItemCodeID
                                                       where f.Activo && rfi.Activo && it.Activo
                                                       && it.TipoMaterialID == tipoMaterialID
                                                       && !(from its in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                                            where its.Activo
                                                            select its.ItemCodeID).Contains(it.ItemCodeID)
                                                       select it.ItemCodeID).AsParallel().Count().ToString();

                            elemento.CantidadTotalItems = (from f in ctx.Sam3_FolioCuantificacion
                                                           join rfi in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on f.FolioCuantificacionID equals rfi.FolioCuantificacionID
                                                           join it in ctx.Sam3_ItemCode on rfi.ItemCodeID equals it.ItemCodeID
                                                           where f.Activo && rfi.Activo && it.Activo
                                                           && it.TipoMaterialID == tipoMaterialID
                                                           select it.ItemCodeID).AsParallel().Count().ToString();

                            listado.Add(elemento);

                        }
                    }

                    if (conteo)
                    {
                        return listado.Count();
                    }
                    else
                    {
                        return listado;
                    }
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
        /// Numeros unicos con recepcion pero sin complemento de recepcion
        /// </summary>
        /// <param name="filtros"></param>
        /// <param name="usuario"></param>
        /// <returns></returns>
        public object ListadoNUConRecepcionSinComplemento(FiltrosJson filtros, Sam3_Usuario usuario, bool conteo = false)
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
                    int tipoMaterialID = filtros.TipoMaterialID != "" ? Convert.ToInt32(filtros.TipoMaterialID) : 0;

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
                                     where fe.Activo && rfp.Activo && p.Activo
                                     && (fe.FechaCreacion >= fechaInicial && fe.FechaCreacion <= fechaFinal)
                                     && proyectos.Contains(rfp.ProyectoID)
                                     && patios.Contains(p.PatioID)
                                     && rfp.ProyectoID == proyectoID
                                     select fe).AsParallel().ToList();
                    }
                    else
                    {
                        registros = (from fe in ctx.Sam3_FolioAvisoEntrada
                                     join rfp in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on fe.FolioAvisoLlegadaID equals rfp.FolioAvisoLlegadaID
                                     join p in ctx.Sam3_Proyecto on rfp.ProyectoID equals p.ProyectoID
                                     where fe.Activo && rfp.Activo && p.Activo
                                     && (fe.FechaCreacion >= fechaInicial && fe.FechaCreacion <= fechaFinal)
                                     && proyectos.Contains(rfp.ProyectoID)
                                     && patios.Contains(p.PatioID)
                                     select fe).AsParallel().ToList();
                    }

                    if (clienteID > 0)
                    {
                        registros = registros.Where(x => x.ClienteID == clienteID).ToList();
                    }

                    if (folioAvisoLlegadaID > 0)
                    {
                        registros = registros.Where(x => x.FolioAvisoLlegadaID == folioAvisoLlegadaID).ToList();
                    }

                    registros = registros.GroupBy(x => x.FolioAvisoLlegadaID).Select(x => x.First()).ToList();

                    List<ListadoNUPorRecepcionar> listado = new List<ListadoNUPorRecepcionar>();
                    List<Sam3_OrdenRecepcion> ordenes;
                    ListadoNUPorRecepcionar elemento;

                    foreach (Sam3_FolioAvisoEntrada f in registros)
                    {
                        if (packingListID > 0)
                        {
                            ordenes = (from fc in ctx.Sam3_FolioCuantificacion
                                       join rfci in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on fc.FolioCuantificacionID equals rfci.FolioCuantificacionID
                                       join roi in ctx.Sam3_Rel_OrdenRecepcion_ItemCode on rfci.ItemCodeID equals roi.ItemCodeID
                                       join o in ctx.Sam3_OrdenRecepcion on roi.OrdenRecepcionID equals o.OrdenRecepcionID
                                       where fc.Activo && rfci.Activo && roi.Activo
                                       && !(from cr in ctx.Sam3_Recepcion
                                            where cr.Activo
                                            select cr.FolioCuantificacionID).Contains(fc.FolioCuantificacionID)
                                       && fc.FolioAvisoEntradaID == f.FolioAvisoEntradaID
                                       select o).AsParallel().ToList();
                        }
                        else
                        {
                            ordenes = (from fc in ctx.Sam3_FolioCuantificacion
                                       join rfci in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on fc.FolioCuantificacionID equals rfci.FolioCuantificacionID
                                       join roi in ctx.Sam3_Rel_OrdenRecepcion_ItemCode on rfci.ItemCodeID equals roi.ItemCodeID
                                       join o in ctx.Sam3_OrdenRecepcion on roi.OrdenRecepcionID equals o.OrdenRecepcionID
                                       where fc.Activo && rfci.Activo && roi.Activo
                                       && !(from cr in ctx.Sam3_Recepcion
                                            where cr.Activo
                                            select cr.FolioCuantificacionID).Contains(fc.FolioCuantificacionID)
                                       && fc.FolioAvisoEntradaID == f.FolioAvisoEntradaID
                                       && fc.FolioCuantificacionID == packingListID
                                       select o).AsParallel().ToList();
                        }

                        ordenes = ordenes.GroupBy(x => x.OrdenRecepcionID).Select(x => x.First()).ToList();

                        foreach (Sam3_OrdenRecepcion orden in ordenes)
                        {
                            elemento = new ListadoNUPorRecepcionar();
                            elemento.FechaOrdenRecepcion = orden.FechaCreacion != null ? orden.FechaCreacion.ToString("dd/MM/yyyy") : "";
                            elemento.OrdenRecepcion = orden.OrdenRecepcionID.ToString();

                            elemento.CantidadNUEnOrdenRecepcion = (from roi in ctx.Sam3_Rel_OrdenRecepcion_ItemCode
                                                                   join nu in ctx.Sam3_NumeroUnico on roi.ItemCodeID equals nu.ItemCodeID
                                                                   join it in ctx.Sam3_ItemCode on nu.ItemCodeID equals it.ItemCodeID
                                                                   where roi.Activo && nu.Activo
                                                                   && roi.OrdenRecepcionID == orden.OrdenRecepcionID
                                                                   && it.TipoMaterialID == tipoMaterialID
                                                                   select nu.NumeroUnicoID).AsParallel().Count().ToString();

                            elemento.CantidadNUSinComplemento = (from roi in ctx.Sam3_Rel_OrdenRecepcion_ItemCode
                                                                 join nu in ctx.Sam3_NumeroUnico on roi.ItemCodeID equals nu.ItemCodeID
                                                                 join it in ctx.Sam3_ItemCode on nu.ItemCodeID equals it.ItemCodeID
                                                                 where roi.Activo && nu.Activo
                                                                 && roi.OrdenRecepcionID == orden.OrdenRecepcionID
                                                                 && it.TipoMaterialID == tipoMaterialID
                                                                 && !(from r in ctx.Sam3_Recepcion
                                                                      where r.Activo
                                                                      select r.ItemCodeID).Contains(nu.ItemCodeID.Value)
                                                                 select nu.NumeroUnicoID).AsParallel().Count().ToString();

                            listado.Add(elemento);
                        }

                    }

#if DEBUG
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    string json = serializer.Serialize(listado);
#endif

                    if (conteo)
                    {
                        return listado.Count();
                    }
                    else
                    {
                        return listado;
                    }
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
        /// Genera el set de datos para el gri de Números únicos sin almacenar 
        /// </summary>
        /// <param name="filtros"></param>
        /// <param name="usuario"></param>
        /// <returns></returns>
        public object ListadoNUSinAlmacenaje(FiltrosJson filtros, Sam3_Usuario usuario, bool conteo = false)
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
                    int tipoMaterialID = filtros.TipoMaterialID != "" ? Convert.ToInt32(filtros.TipoMaterialID) : 0;

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
                                     where fe.Activo && rfp.Activo && p.Activo
                                     && (fe.FechaCreacion >= fechaInicial && fe.FechaCreacion <= fechaFinal)
                                     && proyectos.Contains(rfp.ProyectoID)
                                     && patios.Contains(p.PatioID)
                                     && rfp.ProyectoID == proyectoID
                                     select fe).AsParallel().ToList();
                    }
                    else
                    {
                        registros = (from fe in ctx.Sam3_FolioAvisoEntrada
                                     join rfp in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on fe.FolioAvisoLlegadaID equals rfp.FolioAvisoLlegadaID
                                     join p in ctx.Sam3_Proyecto on rfp.ProyectoID equals p.ProyectoID
                                     where fe.Activo && rfp.Activo && p.Activo
                                     && (fe.FechaCreacion >= fechaInicial && fe.FechaCreacion <= fechaFinal)
                                     && proyectos.Contains(rfp.ProyectoID)
                                     && patios.Contains(p.PatioID)
                                     select fe).AsParallel().ToList();
                    }

                    if (clienteID > 0)
                    {
                        registros = registros.Where(x => x.ClienteID == clienteID).ToList();
                    }

                    if (folioAvisoLlegadaID > 0)
                    {
                        registros = registros.Where(x => x.FolioAvisoLlegadaID == folioAvisoLlegadaID).ToList();
                    }

                    registros = registros.GroupBy(x => x.FolioAvisoLlegadaID).Select(x => x.First()).ToList();

                    List<ListadoNUSinAlmacenar> listado = new List<ListadoNUSinAlmacenar>();
                    ListadoNUSinAlmacenar elemento;
                    List<Sam3_OrdenRecepcion> ordenes;

                    foreach (Sam3_FolioAvisoEntrada f in registros)
                    {
                        if (packingListID > 0)
                        {
                            ordenes = (from o in ctx.Sam3_OrdenRecepcion
                                       join roi in ctx.Sam3_Rel_OrdenRecepcion_ItemCode on o.OrdenRecepcionID equals roi.OrdenRecepcionID
                                       join rfci in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on roi.ItemCodeID equals rfci.ItemCodeID
                                       join fc in ctx.Sam3_FolioCuantificacion on rfci.FolioCuantificacionID equals fc.FolioCuantificacionID
                                       where o.Activo && roi.Activo && rfci.Activo && fc.Activo
                                       && fc.FolioAvisoEntradaID == f.FolioAvisoEntradaID
                                       && fc.FolioCuantificacionID == packingListID
                                       select o).AsParallel().ToList();
                        }
                        else
                        {
                            ordenes = (from o in ctx.Sam3_OrdenRecepcion
                                       join roi in ctx.Sam3_Rel_OrdenRecepcion_ItemCode on o.OrdenRecepcionID equals roi.OrdenRecepcionID
                                       join rfci in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on roi.ItemCodeID equals rfci.ItemCodeID
                                       join fc in ctx.Sam3_FolioCuantificacion on rfci.FolioCuantificacionID equals fc.FolioCuantificacionID
                                       where o.Activo && roi.Activo && rfci.Activo && fc.Activo
                                       && fc.FolioAvisoEntradaID == f.FolioAvisoEntradaID
                                       select o).AsParallel().ToList();
                        }

                        ordenes = ordenes.GroupBy(x => x.OrdenRecepcionID).Select(x => x.First()).ToList();

                        foreach (Sam3_OrdenRecepcion orden in ordenes)
                        {
                            elemento = new ListadoNUSinAlmacenar();
                            elemento.FechaOrdenRecepcion = orden.FechaCreacion != null ? orden.FechaCreacion.ToString("dd//MM/yyyy") : "";
                            elemento.OrdenRecepcion = orden.Folio.ToString();

                            elemento.CantidadNUEnOrdenRecepcion = (from roi in ctx.Sam3_Rel_OrdenRecepcion_ItemCode
                                                                   join nu in ctx.Sam3_NumeroUnico on roi.ItemCodeID equals nu.ItemCodeID
                                                                   join roan in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico on nu.NumeroUnicoID equals roan.NumeroUnicoID
                                                                   join it in ctx.Sam3_ItemCode on nu.ItemCodeID equals it.ItemCodeID
                                                                   where roi.OrdenRecepcionID == orden.OrdenRecepcionID
                                                                   && it.TipoMaterialID == tipoMaterialID
                                                                   select nu.NumeroUnicoID).AsParallel().Count().ToString();

                            elemento.CantidadNUporAlmacenar = (from roi in ctx.Sam3_Rel_OrdenRecepcion_ItemCode
                                                               join nu in ctx.Sam3_NumeroUnico on roi.ItemCodeID equals nu.ItemCodeID
                                                               join it in ctx.Sam3_ItemCode on nu.ItemCodeID equals it.ItemCodeID
                                                               where roi.OrdenRecepcionID == orden.OrdenRecepcionID
                                                               && nu.Rack == ""
                                                               && it.TipoMaterialID == tipoMaterialID
                                                               select nu.NumeroUnicoID).AsParallel().Count().ToString();

                            listado.Add(elemento);
                        }
                    }

#if DEBUG
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    string json = serializer.Serialize(listado);
#endif
                    if (conteo)
                    {
                        return listado.Count();
                    }
                    else
                    {
                        return listado;
                    }
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
        /// Genera el set de datos para el gri de incidencias activas por número único
        /// </summary>
        /// <param name="filtros"></param>
        /// <param name="usuario"></param>
        /// <returns></returns>
        public object ListadoIncidenciasActivas(FiltrosJson filtros, Sam3_Usuario usuario, bool conteo = false)
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
                    int tipoMaterialID = filtros.TipoMaterialID != "" ? Convert.ToInt32(filtros.TipoMaterialID) : 0;

                    List<int> proyectos = ctx.Sam3_Rel_Usuario_Proyecto.Where(x => x.UsuarioID == usuario.UsuarioID).Select(x => x.ProyectoID).AsParallel().ToList();

                    List<int> patios = (from r in ctx.Sam3_Proyecto
                                        join p in ctx.Sam3_Patio on r.PatioID equals p.PatioID
                                        where r.Activo && proyectos.Contains(r.ProyectoID)
                                        select p.PatioID).AsParallel().Distinct().ToList();

                    List<Sam3_Incidencia> registros;
                    if (proyectoID > 0)
                    {
                        registros = (from i in ctx.Sam3_Incidencia
                                     join rin in ctx.Sam3_Rel_Incidencia_NumeroUnico on i.IncidenciaID equals rin.IncidenciaID
                                     join nu in ctx.Sam3_NumeroUnico on rin.NumeroUnicoID equals nu.NumeroUnicoID
                                     join p in ctx.Sam3_Proyecto on nu.ProyectoID equals p.ProyectoID
                                     where i.Activo && rin.Activo && nu.Activo && p.Activo
                                     && (i.FechaCreacion >= fechaInicial && i.FechaCreacion <= fechaFinal)
                                     && proyectos.Contains(nu.ProyectoID)
                                     && patios.Contains(p.PatioID)
                                     && nu.ProyectoID == proyectoID
                                     select i).AsParallel().ToList();
                    }
                    else
                    {
                        registros = (from i in ctx.Sam3_Incidencia
                                     join rin in ctx.Sam3_Rel_Incidencia_NumeroUnico on i.IncidenciaID equals rin.IncidenciaID
                                     join nu in ctx.Sam3_NumeroUnico on rin.NumeroUnicoID equals nu.NumeroUnicoID
                                     join p in ctx.Sam3_Proyecto on nu.ProyectoID equals p.ProyectoID
                                     where i.Activo && rin.Activo && nu.Activo && p.Activo
                                     && (i.FechaCreacion >= fechaInicial && i.FechaCreacion <= fechaFinal)
                                     && proyectos.Contains(nu.ProyectoID)
                                     && patios.Contains(p.PatioID)
                                     select i).AsParallel().ToList();
                    }

                    //if (clienteID > 0)
                    //{
                    //    registros = registros.Where(x => x.ClienteID == clienteID).ToList();
                    //}

                    //if (folioAvisoLlegadaID > 0)
                    //{
                    //    registros = registros.Where(x => x.FolioAvisoLlegadaID == folioAvisoLlegadaID).ToList();
                    //}

                    registros = registros.GroupBy(x => x.IncidenciaID).Select(x => x.First()).ToList();

                    List<ListadoIncidenciasAbiertas> listado = new List<ListadoIncidenciasAbiertas>();
                    ListadoIncidenciasAbiertas elemento;
                    List<Sam3_NumeroUnico> numerosUnicos;

                    foreach (Sam3_Incidencia f in registros)
                    {
                        if (packingListID > 0)
                        {
                            numerosUnicos = (from nu in ctx.Sam3_NumeroUnico
                                             join rin in ctx.Sam3_Rel_Incidencia_NumeroUnico on nu.NumeroUnicoID equals rin.NumeroUnicoID
                                             join it in ctx.Sam3_ItemCode on nu.ItemCodeID equals it.ItemCodeID
                                             join rfi in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on it.ItemCodeID equals rfi.ItemCodeID
                                             where nu.Activo && rin.Activo && it.Activo && rfi.Activo
                                             && rfi.FolioCuantificacionID == packingListID
                                             select nu).AsParallel().ToList();

                            numerosUnicos.AddRange((from nu in ctx.Sam3_NumeroUnico
                                                    join rin in ctx.Sam3_Rel_Incidencia_NumeroUnico on nu.NumeroUnicoID equals rin.NumeroUnicoID
                                                    join it in ctx.Sam3_ItemCode on nu.ItemCodeID equals it.ItemCodeID
                                                    join rbi in ctx.Sam3_Rel_Bulto_ItemCode on it.ItemCodeID equals rbi.ItemCodeID
                                                    join b in ctx.Sam3_Bulto on rbi.BultoID equals b.BultoID
                                                    where nu.Activo && rin.Activo && it.Activo && rbi.Activo
                                                    && b.FolioCuantificacionID == packingListID
                                                    select nu).AsParallel().ToList());
                        }
                        else
                        {
                            numerosUnicos = (from nu in ctx.Sam3_NumeroUnico
                                             join rin in ctx.Sam3_Rel_Incidencia_NumeroUnico on nu.NumeroUnicoID equals rin.NumeroUnicoID
                                             join it in ctx.Sam3_ItemCode on nu.ItemCodeID equals it.ItemCodeID
                                             join rfi in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on it.ItemCodeID equals rfi.ItemCodeID
                                             where nu.Activo && rin.Activo && it.Activo && rfi.Activo
                                             select nu).AsParallel().ToList();

                            numerosUnicos.AddRange((from nu in ctx.Sam3_NumeroUnico
                                                    join rin in ctx.Sam3_Rel_Incidencia_NumeroUnico on nu.NumeroUnicoID equals rin.NumeroUnicoID
                                                    join it in ctx.Sam3_ItemCode on nu.ItemCodeID equals it.ItemCodeID
                                                    join rbi in ctx.Sam3_Rel_Bulto_ItemCode on it.ItemCodeID equals rbi.ItemCodeID
                                                    join b in ctx.Sam3_Bulto on rbi.BultoID equals b.BultoID
                                                    where nu.Activo && rin.Activo && it.Activo && rbi.Activo
                                                    select nu).AsParallel().ToList());
                        }

                        numerosUnicos = numerosUnicos.GroupBy(x => x.NumeroUnicoID).Select(x => x.First()).ToList();

                        foreach (Sam3_NumeroUnico numUnico in numerosUnicos)
                        {
                            Sam3_ProyectoConfiguracion config = ctx.Sam3_ProyectoConfiguracion.Where(x => x.ProyectoID == numUnico.ProyectoID)
                                .AsParallel().SingleOrDefault();

                            string formato = "D" + config.DigitosNumeroUnico;

                            elemento = new ListadoIncidenciasAbiertas();
                            elemento.NumeroUnico = numUnico.Prefijo + "-" + numUnico.Consecutivo.ToString(formato);

                            elemento.CantidadIncidencias = (from rinu in ctx.Sam3_Rel_Incidencia_NumeroUnico
                                                            join inc in ctx.Sam3_Incidencia on rinu.IncidenciaID equals inc.IncidenciaID
                                                            join nu in ctx.Sam3_NumeroUnico on rinu.NumeroUnicoID equals nu.NumeroUnicoID
                                                            join it in ctx.Sam3_ItemCode on nu.ItemCodeID equals it.ItemCodeID
                                                            where rinu.Activo
                                                            && rinu.NumeroUnicoID == numUnico.NumeroUnicoID
                                                            && inc.Activo
                                                            && it.TipoMaterialID == tipoMaterialID
                                                            select rinu.IncidenciaID).AsParallel().Count().ToString();


                            listado.Add(elemento);
                        }
                    }

#if DEBUG
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    string json = serializer.Serialize(listado);
#endif
                    if (conteo)
                    {
                        return listado.Count();
                    }
                    else
                    {
                        return listado;
                    }
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
        /// Genera un listado para combo de los folios de entrada que aun no cuantan con cuantificación
        /// </summary>
        /// <param name="proyectoID"></param>
        /// <param name="usuario"></param>
        /// <returns></returns>
        public object ObtenerFoliosEntradaPorProyecto(int proyectoID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<ListaCombos> folios = (from fe in ctx.Sam3_FolioAvisoEntrada
                                                join rfp in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on fe.FolioAvisoLlegadaID equals rfp.FolioAvisoLlegadaID
                                                join fc in ctx.Sam3_FolioCuantificacion on fe.FolioAvisoEntradaID equals fc.FolioAvisoEntradaID
                                                where fe.Activo && rfp.Activo && fc.Activo
                                                && rfp.ProyectoID == proyectoID
                                                select new ListaCombos
                                                {
                                                    id = fe.FolioAvisoLlegadaID.ToString(),
                                                    value = fe.FolioAvisoLlegadaID.ToString()
                                                }).AsParallel().ToList();

                    folios = folios.GroupBy(x => x.id).Select(x => x.First()).ToList();

                    return folios;

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
        /// Genera un listado para combo con los ItemCodes de un Aviso de entrada
        /// </summary>
        /// <param name="folioAvisoLlegada"></param>
        /// <param name="usuario"></param>
        /// <returns></returns>
        public object ObtenerItemCodesPorFolioLlegada(int folioAvisoLlegada, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<ListaCombos> listado = (from fe in ctx.Sam3_FolioAvisoEntrada
                                                 join fc in ctx.Sam3_FolioCuantificacion on fe.FolioAvisoEntradaID equals fc.FolioAvisoEntradaID
                                                 join rfi in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on fc.FolioCuantificacionID equals rfi.FolioCuantificacionID
                                                 join it in ctx.Sam3_ItemCode on rfi.ItemCodeID equals it.ItemCodeID
                                                 where fe.Activo && fc.Activo && rfi.Activo && it.Activo
                                                 && fe.FolioAvisoLlegadaID == folioAvisoLlegada
                                                 && !(from nu in ctx.Sam3_NumeroUnico
                                                      where nu.Activo
                                                      select nu.ItemCodeID).Contains(it.ItemCodeID)
                                                 select new ListaCombos
                                                 {
                                                     id = it.ItemCodeID.ToString(),
                                                     value = it.Codigo
                                                 }).AsParallel().ToList();

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

        /// <summary>
        /// Genera el set de datos para el grid de listado de Packing List
        /// </summary>
        /// <param name="filtros"></param>
        /// <param name="usuario"></param>
        /// <returns></returns>
        public object ListadoPackingList(FiltrosJson filtros, Sam3_Usuario usuario, bool conteo = false)
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
                    int tipoMaterialID = filtros.TipoMaterialID != "" ? Convert.ToInt32(filtros.TipoMaterialID) : 0;

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
                                     where fe.Activo && rfp.Activo && p.Activo
                                     && (fe.FechaCreacion >= fechaInicial && fe.FechaCreacion <= fechaFinal)
                                     && proyectos.Contains(rfp.ProyectoID)
                                     && patios.Contains(p.PatioID)
                                     && fe.FolioDescarga > 0
                                     && rfp.ProyectoID == proyectoID
                                     select fe).AsParallel().ToList();
                    }
                    else
                    {
                        registros = (from fe in ctx.Sam3_FolioAvisoEntrada
                                     join rfp in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on fe.FolioAvisoLlegadaID equals rfp.FolioAvisoLlegadaID
                                     join p in ctx.Sam3_Proyecto on rfp.ProyectoID equals p.ProyectoID
                                     where fe.Activo && rfp.Activo && p.Activo
                                     && (fe.FechaCreacion >= fechaInicial && fe.FechaCreacion <= fechaFinal)
                                     && proyectos.Contains(rfp.ProyectoID)
                                     && patios.Contains(p.PatioID)
                                     && fe.FolioDescarga > 0
                                     select fe).AsParallel().ToList();
                    }

                    if (clienteID > 0)
                    {
                        registros = registros.Where(x => x.ClienteID == clienteID).ToList();
                    }

                    if (folioAvisoLlegadaID > 0)
                    {
                        registros = registros.Where(x => x.FolioAvisoLlegadaID == folioAvisoLlegadaID).ToList();
                    }

                    registros = registros.GroupBy(x => x.FolioAvisoLlegadaID).Select(x => x.First()).ToList();

                    List<ListadoPkList> listado = new List<ListadoPkList>();
                    ListadoPkList elemento;
                    List<Sam3_FolioCuantificacion> folioc = new List<Sam3_FolioCuantificacion>();

                    foreach (Sam3_FolioAvisoEntrada r in registros)
                    {
                        folioc = (from fc in ctx.Sam3_FolioCuantificacion
                                  join fe in ctx.Sam3_FolioAvisoEntrada on fc.FolioAvisoEntradaID equals fe.FolioAvisoEntradaID
                                  where fc.Activo
                                  && fc.FolioAvisoEntradaID == fc.FolioAvisoEntradaID
                                  && fe.FolioDescarga > 0
                                  select fc).AsParallel().ToList();

                        folioc = folioc.GroupBy(x => x.FolioCuantificacionID).Select(x => x.First()).ToList();

                        foreach (Sam3_FolioCuantificacion fc in folioc)
                        {
                            elemento = new ListadoPkList();
                            elemento.FechaFolioAvisoEntrada = r.FechaCreacion != null ? r.FechaCreacion.Value.ToString("dd/MM/yyyy") : "";
                            elemento.FolioCuantificacion = fc.FolioCuantificacionID.ToString();
                            elemento.FolioEntrada = r.FolioAvisoLlegadaID.ToString();
                            elemento.PackingList = fc.PackingList;
                            elemento.Estatus = r.Estatus;

                            elemento.TipoPackingList = (from rfi in ctx.Sam3_Rel_FolioCuantificacion_ItemCode
                                                        join it in ctx.Sam3_ItemCode on rfi.ItemCodeID equals it.ItemCodeID
                                                        join tpm in ctx.Sam3_TipoMaterial on it.TipoMaterialID equals tpm.TipoMaterialID
                                                        where rfi.Activo && it.Activo && tpm.Activo
                                                        && rfi.FolioCuantificacionID == fc.FolioCuantificacionID
                                                        select tpm.Nombre).AsParallel().FirstOrDefault();

                            elemento.TipoUso = ctx.Sam3_TipoUso.Where(x => x.TipoUsoID == fc.TipoUsoID).Select(x => x.Nombre).AsParallel().SingleOrDefault();

                            listado.Add(elemento);
                        }
                    }

#if DEBUG
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    string json = serializer.Serialize(listado);
#endif
                    if (conteo)
                    {
                        return listado.Count();
                    }
                    else
                    {
                        return listado;
                    }
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
        /// Lista para combo de packing List en filtros de cuantificacion
        /// </summary>
        /// <param name="usuario"></param>
        /// <returns></returns>
        public object PackingListsParaComboFiltros(Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<int> proyectos = ctx.Sam3_Rel_Usuario_Proyecto.Where(x => x.UsuarioID == usuario.UsuarioID).Select(x => x.ProyectoID).AsParallel().ToList();

                    List<int> patios = (from r in ctx.Sam3_Proyecto
                                        join p in ctx.Sam3_Patio on r.PatioID equals p.PatioID
                                        where r.Activo && proyectos.Contains(r.ProyectoID)
                                        select p.PatioID).AsParallel().Distinct().ToList();

                    List<ListaCombos> registros = (from fc in ctx.Sam3_FolioCuantificacion
                                                   join p in ctx.Sam3_Proyecto on fc.ProyectoID equals p.ProyectoID
                                                   join pa in ctx.Sam3_Patio on p.PatioID equals pa.PatioID
                                                   where fc.Activo
                                                   && fc.Estatus != "Cerrado"
                                                   && proyectos.Contains(fc.ProyectoID)
                                                   && patios.Contains(pa.PatioID)
                                                   select new ListaCombos
                                                   {
                                                       id = fc.FolioCuantificacionID.ToString(),
                                                       value = fc.FolioCuantificacionID.ToString()
                                                   }).AsParallel().ToList();

                    registros = registros.GroupBy(x => x.id).Select(x => x.First()).ToList();

#if DEBUG
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    string json = serializer.Serialize(registros);
#endif

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

        public object ConteoDashBoardDespachos(FiltrosJson filtro, Sam3_Usuario usuario)
        {
            try
            {
                DashBoardDespacho conteos = new DashBoardDespacho();
                conteos.PreDespacho = "0";
                int conteoODT = (int)ListadoOrdenesDeTrabajo(filtro, usuario, true);
                conteos.CantidadODT = conteoODT.ToString();
                conteos.CantidadODTActiva = conteoODT.ToString();
                conteos.PorEntregar = "0";
                conteos.TrevelerPendiente = "0";
                int porDespachar = (int)ListadoDespachos(filtro, usuario);
                conteos.PorDespachar = porDespachar.ToString();

                return conteos;
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

        public object ListadoOrdenesDeTrabajo(FiltrosJson filtros, Sam3_Usuario usuario, bool conteo = false)
        {
            try
            {
                List<ListadoODTDespacho> listado = new List<ListadoODTDespacho>();
                using (SamContext ctx = new SamContext())
                {
                    using (Sam2Context ctx2 = new Sam2Context())
                    {
                        #region Filtros
                        //traemos la informacion de los proyectos y patios del usuario
                        List<int> proyectos = ctx.Sam3_Rel_Usuario_Proyecto.Where(x => x.UsuarioID == usuario.UsuarioID && x.Activo)
                            .Select(x => x.ProyectoID).Distinct().AsParallel().ToList();

                        List<int> Patios = (from p in ctx.Sam3_Proyecto
                                            join pa in ctx.Sam3_Patio on p.PatioID equals pa.PatioID
                                            where p.Activo && pa.Activo
                                            && proyectos.Contains(p.ProyectoID)
                                            select pa.PatioID).Distinct().AsParallel().ToList();

                        int folioAvisoLlegadaID = filtros.FolioAvisoLlegadaID != "" ? Convert.ToInt32(filtros.FolioAvisoLlegadaID) : 0;
                        int clienteID = filtros.ClienteID != "" ? Convert.ToInt32(filtros.ClienteID) : 0;
                        int proyectoID = filtros.ProyectoID != "" ? Convert.ToInt32(filtros.ProyectoID) : 0;
                        int folioCuantificacionID = filtros.PackingListID != "" ? Convert.ToInt32(filtros.PackingListID) : 0;
                        int tipoMaterialID = filtros.TipoMaterialID != "" ? Convert.ToInt32(filtros.TipoMaterialID) : 0;


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
                        #endregion

                        //Traemos todos los folios de entrada del periodo de tiempo
                        List<Sam3_FolioAvisoEntrada> registros;

                        if (proyectoID > 0)
                        {
                            registros = (from fe in ctx.Sam3_FolioAvisoEntrada
                                         join rfp in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on fe.FolioAvisoLlegadaID equals rfp.FolioAvisoLlegadaID
                                         where fe.Activo && rfp.Activo
                                         && proyectos.Contains(rfp.ProyectoID)
                                         && rfp.ProyectoID == proyectoID
                                         && (fe.FechaCreacion >= fechaInicial && fe.FechaCreacion <= fechaFinal)
                                         select fe).Distinct().AsParallel().ToList();
                        }
                        else
                        {
                            registros = (from fe in ctx.Sam3_FolioAvisoEntrada
                                         join rfp in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on fe.FolioAvisoLlegadaID equals rfp.FolioAvisoLlegadaID
                                         where fe.Activo && rfp.Activo
                                         && proyectos.Contains(rfp.ProyectoID)
                                         && (fe.FechaCreacion >= fechaInicial && fe.FechaCreacion <= fechaFinal)
                                         select fe).Distinct().AsParallel().ToList();
                        }

                        if (clienteID > 0)
                        {
                            registros = registros.Where(x => x.ClienteID == clienteID).ToList();
                        }

                        if (folioAvisoLlegadaID > 0)
                        {
                            registros = registros.Where(x => x.FolioAvisoLlegadaID == folioAvisoLlegadaID).ToList();
                        }

                        List<int> NumerosUnicosIDs = new List<int>();
                        List<int> itemCodeIDs = new List<int>();

                        if (folioCuantificacionID > 0)
                        {
                            itemCodeIDs.AddRange((
                                from fe in registros
                                join fc in ctx.Sam3_FolioCuantificacion on fe.FolioAvisoEntradaID equals fc.FolioAvisoEntradaID
                                join rfi in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on fc.FolioCuantificacionID equals rfi.FolioCuantificacionID
                                join it in ctx.Sam3_ItemCode on rfi.ItemCodeID equals it.ItemCodeID
                                where fc.Activo && rfi.Activo && it.Activo
                                && fc.FolioCuantificacionID == folioCuantificacionID
                                && it.TipoMaterialID == tipoMaterialID
                                select it.ItemCodeID).Distinct().AsParallel().ToList()
                                );

                            itemCodeIDs.AddRange((
                                    from fe in registros
                                    join fc in ctx.Sam3_FolioCuantificacion on fe.FolioAvisoEntradaID equals fc.FolioAvisoEntradaID
                                    join b in ctx.Sam3_Bulto on fc.FolioCuantificacionID equals b.FolioCuantificacionID
                                    join rbi in ctx.Sam3_Rel_Bulto_ItemCode on b.BultoID equals rbi.BultoID
                                    join it in ctx.Sam3_ItemCode on rbi.ItemCodeID equals it.ItemCodeID
                                    where fc.Activo && b.Activo && rbi.Activo && it.Activo
                                    && fc.FolioCuantificacionID == folioCuantificacionID
                                    && it.TipoMaterialID == tipoMaterialID
                                    select it.ItemCodeID).Distinct().AsParallel().ToList()
                                );

                        }
                        else
                        {
                            itemCodeIDs.AddRange((
                                from fe in registros
                                join fc in ctx.Sam3_FolioCuantificacion on fe.FolioAvisoEntradaID equals fc.FolioAvisoEntradaID
                                join rfi in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on fc.FolioCuantificacionID equals rfi.FolioCuantificacionID
                                join it in ctx.Sam3_ItemCode on rfi.ItemCodeID equals it.ItemCodeID
                                where fc.Activo && rfi.Activo && it.Activo
                                && it.TipoMaterialID == tipoMaterialID
                                select it.ItemCodeID).Distinct().AsParallel().ToList()
                                );

                            itemCodeIDs.AddRange((
                                    from fe in registros
                                    join fc in ctx.Sam3_FolioCuantificacion on fe.FolioAvisoEntradaID equals fc.FolioAvisoEntradaID
                                    join b in ctx.Sam3_Bulto on fc.FolioCuantificacionID equals b.FolioCuantificacionID
                                    join rbi in ctx.Sam3_Rel_Bulto_ItemCode on b.BultoID equals rbi.BultoID
                                    join it in ctx.Sam3_ItemCode on rbi.ItemCodeID equals it.ItemCodeID
                                    where fc.Activo && b.Activo && rbi.Activo && it.Activo
                                    && it.TipoMaterialID == tipoMaterialID
                                    select it.ItemCodeID).Distinct().AsParallel().ToList()
                                );
                        }

                        NumerosUnicosIDs = (from nu in ctx.Sam3_NumeroUnico
                                            where nu.Activo
                                            && itemCodeIDs.Contains(nu.ItemCodeID.Value)
                                            select nu.NumeroUnicoID).Distinct().AsParallel().ToList();

                        List<int> sam2_NumerosUnicosIDs = (from nueq in ctx.Sam3_EquivalenciaNumeroUnico
                                                           where nueq.Activo
                                                           && NumerosUnicosIDs.Contains(nueq.Sam3_NumeroUnicoID)
                                                           select nueq.Sam2_NumeroUnicoID).Distinct().AsParallel().ToList();

                        listado = (from odts in ctx2.OrdenTrabajoSpool
                                   join odtm in ctx2.OrdenTrabajoMaterial on odts.OrdenTrabajoSpoolID equals odtm.OrdenTrabajoSpoolID
                                   join sp in ctx2.Spool on odts.SpoolID equals sp.SpoolID
                                   where sam2_NumerosUnicosIDs.Contains(odtm.NumeroUnicoCongeladoID.Value)
                                   || sam2_NumerosUnicosIDs.Contains(odtm.NumeroUnicoDespachadoID.Value)
                                   select new ListadoODTDespacho
                                   {
                                       Spool = sp.Nombre,
                                       SpoolID = odts.NumeroControl
                                   }).Distinct().AsParallel().ToList();



                    }
                }

                if (conteo)
                {
                    return listado.Count();
                }
                else
                {
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

        public object ListadoDespachos(FiltrosJson filtros, Sam3_Usuario usuario, bool conteo = false)
        {
            try
            {
                List<int> listado = new List<int>();
                using (SamContext ctx = new SamContext())
                {
                    using (Sam2Context ctx2 = new Sam2Context())
                    {
                        #region Filtros
                        //traemos la informacion de los proyectos y patios del usuario
                        List<int> proyectos = ctx.Sam3_Rel_Usuario_Proyecto.Where(x => x.UsuarioID == usuario.UsuarioID && x.Activo)
                            .Select(x => x.ProyectoID).Distinct().AsParallel().ToList();

                        List<int> Patios = (from p in ctx.Sam3_Proyecto
                                            join pa in ctx.Sam3_Patio on p.PatioID equals pa.PatioID
                                            where p.Activo && pa.Activo
                                            select pa.PatioID).Distinct().AsParallel().ToList();

                        int folioAvisoLlegadaID = filtros.FolioAvisoLlegadaID != "" ? Convert.ToInt32(filtros.FolioAvisoLlegadaID) : 0;
                        int clienteID = filtros.ClienteID != "" ? Convert.ToInt32(filtros.ClienteID) : 0;
                        int proyectoID = filtros.ProyectoID != "" ? Convert.ToInt32(filtros.ProyectoID) : 0;
                        int folioCuantificacionID = filtros.PackingListID != "" ? Convert.ToInt32(filtros.PackingListID) : 0;
                        int tipoMaterialID = filtros.TipoMaterialID != "" ? Convert.ToInt32(filtros.TipoMaterialID) : 0;

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
                        #endregion

                        //Traemos todos los folios de entrada del periodo de tiempo
                        List<Sam3_FolioAvisoEntrada> registros;

                        if (proyectoID > 0)
                        {
                            registros = (from fe in ctx.Sam3_FolioAvisoEntrada
                                         join rfp in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on fe.FolioAvisoLlegadaID equals rfp.FolioAvisoLlegadaID
                                         where fe.Activo && rfp.Activo
                                         && proyectos.Contains(rfp.ProyectoID)
                                         && rfp.ProyectoID == proyectoID
                                         && (fe.FechaCreacion >= fechaInicial && fe.FechaCreacion <= fechaFinal)
                                         select fe).Distinct().AsParallel().ToList();
                        }
                        else
                        {
                            registros = (from fe in ctx.Sam3_FolioAvisoEntrada
                                         join rfp in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on fe.FolioAvisoLlegadaID equals rfp.FolioAvisoLlegadaID
                                         where fe.Activo && rfp.Activo
                                         && proyectos.Contains(rfp.ProyectoID)
                                         && (fe.FechaCreacion >= fechaInicial && fe.FechaCreacion <= fechaFinal)
                                         select fe).Distinct().AsParallel().ToList();
                        }

                        if (clienteID > 0)
                        {
                            registros = registros.Where(x => x.ClienteID == clienteID).ToList();
                        }

                        if (folioAvisoLlegadaID > 0)
                        {
                            registros = registros.Where(x => x.FolioAvisoLlegadaID == folioAvisoLlegadaID).ToList();
                        }

                        List<int> NumerosUnicosIDs = new List<int>();
                        List<int> itemCodeIDs = new List<int>();

                        if (folioCuantificacionID > 0)
                        {
                            itemCodeIDs.AddRange((
                                from fe in registros
                                join fc in ctx.Sam3_FolioCuantificacion on fe.FolioAvisoEntradaID equals fc.FolioAvisoEntradaID
                                join rfi in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on fc.FolioCuantificacionID equals rfi.FolioCuantificacionID
                                join it in ctx.Sam3_ItemCode on rfi.ItemCodeID equals it.ItemCodeID
                                where fc.Activo && rfi.Activo && it.Activo
                                && fc.FolioCuantificacionID == folioCuantificacionID
                                && it.TipoMaterialID == tipoMaterialID
                                select it.ItemCodeID).Distinct().AsParallel().ToList()
                                );

                            itemCodeIDs.AddRange((
                                    from fe in registros
                                    join fc in ctx.Sam3_FolioCuantificacion on fe.FolioAvisoEntradaID equals fc.FolioAvisoEntradaID
                                    join b in ctx.Sam3_Bulto on fc.FolioCuantificacionID equals b.FolioCuantificacionID
                                    join rbi in ctx.Sam3_Rel_Bulto_ItemCode on b.BultoID equals rbi.BultoID
                                    join it in ctx.Sam3_ItemCode on rbi.ItemCodeID equals it.ItemCodeID
                                    where fc.Activo && b.Activo && rbi.Activo && it.Activo
                                    && fc.FolioCuantificacionID == folioCuantificacionID
                                    && it.TipoMaterialID == tipoMaterialID
                                    select it.ItemCodeID).Distinct().AsParallel().ToList()
                                );

                        }
                        else
                        {
                            itemCodeIDs.AddRange((
                                from fe in registros
                                join fc in ctx.Sam3_FolioCuantificacion on fe.FolioAvisoEntradaID equals fc.FolioAvisoEntradaID
                                join rfi in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on fc.FolioCuantificacionID equals rfi.FolioCuantificacionID
                                join it in ctx.Sam3_ItemCode on rfi.ItemCodeID equals it.ItemCodeID
                                where fc.Activo && rfi.Activo && it.Activo
                                && it.TipoMaterialID == tipoMaterialID
                                select it.ItemCodeID).Distinct().AsParallel().ToList()
                                );

                            itemCodeIDs.AddRange((
                                    from fe in registros
                                    join fc in ctx.Sam3_FolioCuantificacion on fe.FolioAvisoEntradaID equals fc.FolioAvisoEntradaID
                                    join b in ctx.Sam3_Bulto on fc.FolioCuantificacionID equals b.FolioCuantificacionID
                                    join rbi in ctx.Sam3_Rel_Bulto_ItemCode on b.BultoID equals rbi.BultoID
                                    join it in ctx.Sam3_ItemCode on rbi.ItemCodeID equals it.ItemCodeID
                                    where fc.Activo && b.Activo && rbi.Activo && it.Activo
                                    && it.TipoMaterialID == tipoMaterialID
                                    select it.ItemCodeID).Distinct().AsParallel().ToList()
                                );
                        }

                        NumerosUnicosIDs = (from nu in ctx.Sam3_NumeroUnico
                                            where nu.Activo
                                            && itemCodeIDs.Contains(nu.ItemCodeID.Value)
                                            select nu.NumeroUnicoID).Distinct().AsParallel().ToList();

                        List<int> sam2_NumerosUnicosIDs = (from nueq in ctx.Sam3_EquivalenciaNumeroUnico
                                                           where nueq.Activo
                                                           && NumerosUnicosIDs.Contains(nueq.Sam3_NumeroUnicoID)
                                                           select nueq.Sam2_NumeroUnicoID).Distinct().AsParallel().ToList();

                        listado = (from odts in ctx2.OrdenTrabajoSpool
                                   join odtm in ctx2.OrdenTrabajoMaterial on odts.OrdenTrabajoSpoolID equals odtm.OrdenTrabajoSpoolID
                                   join sp in ctx2.Spool on odts.SpoolID equals sp.SpoolID
                                   where (sam2_NumerosUnicosIDs.Contains(odtm.NumeroUnicoCongeladoID.Value)
                                   || sam2_NumerosUnicosIDs.Contains(odtm.NumeroUnicoDespachadoID.Value))
                                   && odtm.DespachoID == null && odtm.NumeroUnicoDespachadoID == null && odtm.TieneDespacho == false
                                   select odtm.OrdenTrabajoMaterialID).Distinct().AsParallel().ToList();



                    }
                }


                return listado.Count();
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

        public object ListadoIncidencias(FiltrosJson filtros, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    #region Filtros
                    //traemos la informacion de los proyectos y patios del usuario
                    List<int> proyectos = ctx.Sam3_Rel_Usuario_Proyecto.Where(x => x.UsuarioID == usuario.UsuarioID && x.Activo)
                        .Select(x => x.ProyectoID).Distinct().AsParallel().ToList();

                    List<int> patios = (from p in ctx.Sam3_Proyecto
                                        join pa in ctx.Sam3_Patio on p.PatioID equals pa.PatioID
                                        where p.Activo && pa.Activo
                                        select pa.PatioID).Distinct().AsParallel().ToList();

                    int clienteID = filtros.ClienteID != "" ? Convert.ToInt32(filtros.ClienteID) : 0;
                    int proyectoID = filtros.ProyectoID != "" ? Convert.ToInt32(filtros.ProyectoID) : 0;

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
                    #endregion

                    //Primero obtengo todas las incidencias activas dentro del rango de tiempo
                    List<Sam3_Incidencia> registrosIncidencias = (from incidencia in ctx.Sam3_Incidencia
                                                                  where incidencia.Activo
                                                                  && (incidencia.FechaCreacion >= fechaInicial && incidencia.FechaCreacion <= fechaFinal)
                                                                  select incidencia).Distinct().AsParallel().ToList();

                    List<int> incidenciasIDs = registrosIncidencias.Select(x => x.IncidenciaID).Distinct().ToList();

                    List<ListadoIncidencias> listado = new List<ListadoIncidencias>();
                    List<ListadoIncidencias> listaTemporal = new List<Models.ListadoIncidencias>();
                    List<int> temp = new List<int>();

                    //folios aviso de llegada -- OK
                    temp = (from r in ctx.Sam3_Rel_Incidencia_FolioAvisoLlegada
                            where r.Activo && incidenciasIDs.Contains(r.IncidenciaID)
                            select r.FolioAvisoLlegadaID).AsParallel().Distinct().ToList();

                    listaTemporal = AvisoLlegadaBd.Instance.ListadoInciendias(clienteID, proyectoID, proyectos, patios,
                        temp, fechaInicial, fechaFinal);

                    if (listaTemporal.Count > 0) { listado.AddRange(listaTemporal); }

                    //Entrada de material
                    temp.Clear();
                    listaTemporal.Clear();
                    temp = (from r in ctx.Sam3_Rel_Incidencia_FolioAvisoEntrada
                            where r.Activo && incidenciasIDs.Contains(r.IncidenciaID)
                            select r.FolioAvisoEntradaID).AsParallel().ToList();

                    listaTemporal = FolioAvisoEntradaBd.Instance.ListadoIncidencias(clienteID, proyectoID, proyectos, patios, temp,
                        fechaInicial, fechaFinal);

                    if (listaTemporal.Count > 0) { listado.AddRange(listaTemporal); }

                    //Pase salida, no se si existe la incidencia a nivel pase de salida o es de tipo aviso de entrada
                    //listado.AddRange(PaseSalidaBd.Instance.ListadoIncidencias(clienteID, proyectoID, proyectos, patios, incidenciasIDs, fechaInicial, fechaFinal));

                    //Packing list (Folio Cuantificacion)
                    temp.Clear();
                    listaTemporal.Clear();
                    temp = (from r in ctx.Sam3_Rel_Incidencia_FolioCuantificacion
                            where r.Activo && incidenciasIDs.Contains(r.IncidenciaID)
                            select r.FolioCuantificacionID).AsParallel().ToList();

                    listaTemporal = FoliosCuantificacionBd.Instance.ListadoIncidencias(clienteID, proyectoID, proyectos, patios, temp,
                        fechaInicial, fechaFinal);

                    if (listaTemporal.Count > 0) { listado.AddRange(listaTemporal); }

                    //Orden recepcion
                    temp.Clear();
                    listaTemporal.Clear();

                    temp = (from r in ctx.Sam3_Rel_Incidencia_OrdenRecepcion
                            where r.Activo && incidenciasIDs.Contains(r.IncidenciaID)
                            select r.OrdenRecepcionID).AsParallel().ToList();

                    listaTemporal = OrdenRecepcionBd.Instance.ListadoIncidencias(clienteID, proyectoID, proyectos, patios, temp);

                    if (listaTemporal.Count > 0) { listado.AddRange(listaTemporal); }

                    //Complemento recepcion
                    // N/A

                    //ItemCode
                    temp.Clear();
                    listaTemporal.Clear();

                    temp = (from r in ctx.Sam3_Rel_Incidencia_ItemCode
                            where r.Activo && incidenciasIDs.Contains(r.IncidenciaID)
                            select r.ItemCodeID).AsParallel().ToList();

                    listaTemporal = ItemCodeBd.Instance.ListadoIncidencias(clienteID, proyectoID, proyectos, patios, temp);

                    if (listaTemporal.Count > 0) { listado.AddRange(listaTemporal); }

                    //Orden Almacenaje
                    temp.Clear();
                    listaTemporal.Clear();

                    temp = (from r in ctx.Sam3_Rel_Incidencia_OrdenAlmacenaje
                            where r.Activo && incidenciasIDs.Contains(r.IncidenciaID)
                            select r.OrdenalmacenajeID).AsParallel().ToList();

                    listaTemporal = OrdenAlmacenajeBd.Instance.ListadoIncidencias(clienteID, proyectoID, proyectos, patios, temp);

                    if (listaTemporal.Count > 0) { listado.AddRange(listaTemporal); }

                    //Numero Unico
                    temp.Clear();
                    listaTemporal.Clear();

                    temp = (from r in ctx.Sam3_Rel_Incidencia_NumeroUnico
                            where r.Activo && incidenciasIDs.Contains(r.IncidenciaID)
                            select r.NumeroUnicoID).AsParallel().ToList();

                    listaTemporal = NumeroUnicoBd.Instance.ListadoIncidencias(clienteID, proyectoID, proyectos, patios, temp);

                    if (listaTemporal.Count > 0) { listado.AddRange(listaTemporal); }

                    //Despacho
                    temp.Clear();
                    listaTemporal.Clear();

                    temp = (from r in ctx.Sam3_Rel_Incidencia_Despacho
                            where r.Activo && incidenciasIDs.Contains(r.IncidenciaID)
                            select r.DespachoID).AsParallel().ToList();

                    listaTemporal = DespachoBd.Instance.ListadoIncidencias(clienteID, proyectoID, proyectos, patios, temp);

                    if (listaTemporal.Count > 0) { listado.AddRange(listaTemporal); }

                    //Corte
                    temp.Clear();
                    listaTemporal.Clear();

                    temp = (from r in ctx.Sam3_Rel_Incidencia_Corte
                            where r.Activo && incidenciasIDs.Contains(r.IncidenciaID)
                            select r.CorteID).AsParallel().ToList();

                    listaTemporal = CorteBd.Instance.ListadoIncidencias(clienteID, proyectoID, proyectos, patios, temp);

                    if (listaTemporal.Count > 0) { listado.AddRange(listaTemporal); }

                    foreach(ListadoIncidencias l in listado)
                    {
                        DateTime fechaCreacion = new DateTime();
                        DateTime.TryParse(l.FechaRegistro, out fechaCreacion);

                        l.FechaRegistro = fechaCreacion.ToString("yyyy-MM-dd");
                    }

#if DEBUG
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    string json = serializer.Serialize(listado);
#endif

                    return listado.OrderBy(x => x.FolioIncidenciaID).ToList();
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

        public object ObtenerEntidadComboIncidencia(int tipoIncidenciaID, string busqueda)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<ListaCombos> listado = new List<ListaCombos>();
                    List<string> elementos = new List<string>();
                    elementos.Add(busqueda);
                    

                    switch (tipoIncidenciaID)
                    {
                        case 1: //Folio Aviso Entrada
                            listado = (from fe in ctx.Sam3_FolioAvisoLlegada
                                       where fe.Activo
                                       && elementos.Any(x => fe.FolioAvisoLlegadaID.ToString().Contains(x))
                                       select new ListaCombos
                                       {
                                           id = fe.FolioAvisoLlegadaID.ToString(),
                                           value = fe.FolioAvisoLlegadaID.ToString()
                                       }).AsParallel().Distinct().ToList();
                            break;
                        case 2: // Entrada de Material
                            listado = (from fem in ctx.Sam3_FolioAvisoEntrada
                                       where fem.Activo
                                       && elementos.Any(x => fem.FolioAvisoEntradaID.ToString().Contains(x))
                                       select new ListaCombos
                                       {
                                           id = fem.FolioAvisoEntradaID.ToString(),
                                           value = fem.FolioAvisoEntradaID.ToString()
                                       }).AsParallel().Distinct().ToList();
                            break;
                        case 3: // Pase Salida. Por el momento sin implementacion
                            break;
                        case 4: // Packing List
                            listado = (from fc in ctx.Sam3_FolioCuantificacion
                                       where fc.Activo
                                       && elementos.Any(x => fc.FolioCuantificacionID.ToString().Contains(x))
                                       select new ListaCombos
                                       {
                                           id = fc.FolioCuantificacionID.ToString(),
                                           value = fc.FolioCuantificacionID.ToString()
                                       }).AsParallel().Distinct().ToList();
                            break;
                        case 5: // Orden de recepcion
                            listado = (from ordr in ctx.Sam3_OrdenRecepcion
                                       where ordr.Activo
                                       && elementos.Any(x => ordr.Folio.ToString().Contains(x))
                                       select new ListaCombos
                                       {
                                           id = ordr.OrdenRecepcionID.ToString(),
                                           value = ordr.OrdenRecepcionID.ToString()
                                       }).AsParallel().Distinct().ToList();
                            break;
                        case 6: // Complemento de recepcion. Por el momento sin implementacion
                            break;
                        case 7: // ItemCode
                            listado = (from it in ctx.Sam3_ItemCode
                                       where it.Activo
                                       && elementos.Any(x => it.Codigo.Contains(x))
                                       select new ListaCombos
                                       {
                                           id = it.ItemCodeID.ToString(),
                                           value = it.Codigo
                                       }).AsParallel().Distinct().ToList();
                            break;
                        case 8: // Orden de almacenaje
                            listado = (from oa in ctx.Sam3_OrdenAlmacenaje
                                       where oa.Activo
                                       && elementos.Any(x => oa.Folio.ToString().Contains(x))
                                       select new ListaCombos
                                       {
                                           id = oa.OrdenAlmacenajeID.ToString(),
                                           value = oa.Folio.ToString()
                                       }).AsParallel().Distinct().ToList();
                            break;
                        case 9: // Numero unico
                            listado = (from nu in ctx.Sam3_NumeroUnico
                                       where nu.Activo
                                       && elementos.Any(x => nu.NumeroUnicoID.ToString().Contains(x))
                                       select new ListaCombos
                                       {
                                           id = nu.NumeroUnicoID.ToString(),
                                           value = nu.Prefijo + "-" + nu.Consecutivo
                                       }).AsParallel().Distinct().ToList();

                            foreach (ListaCombos i in listado)
                            {
                                int temp = Convert.ToInt32(i.id);
                                int digitos = (from nu in ctx.Sam3_NumeroUnico
                                               join p in ctx.Sam3_ProyectoConfiguracion on nu.ProyectoID equals p.ProyectoID
                                               where nu.NumeroUnicoID == temp
                                               select p.DigitosNumeroUnico).AsParallel().SingleOrDefault();

                                string formato = "D" + digitos.ToString();
                                string[] partes = i.value.Split('-').ToArray();
                                int consecutivo = Convert.ToInt32(partes[1]);

                                i.value = partes[0] + "-" + consecutivo.ToString(formato);

                            }

                            break;
                        case 10: // Despacho
                            listado = (from d in ctx.Sam3_Despacho
                                       where d.Activo
                                       && elementos.Any(x => d.DespachoID.ToString().Contains(x))
                                       select new ListaCombos
                                       {
                                           id = d.DespachoID.ToString(),
                                           value = d.DespachoID.ToString()
                                       }).AsParallel().Distinct().ToList();
                            break;
                        case 11: // Corte
                            listado = (from c in ctx.Sam3_Corte
                                       where c.Activo
                                       && elementos.Any(x => c.CortadorID.ToString().Contains(x))
                                       select new ListaCombos
                                       {
                                           id = c.CorteID.ToString(),
                                           value = c.CorteID.ToString()
                                       }).AsParallel().Distinct().ToList();
                            break;
                        default:
                            throw new Exception("No se encontro el tipo de incidencia");
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

        public object ListaComboIncidencia(int tipoIncidenciaID, string busqueda)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<ListaCombos> listado = new List<ListaCombos>();

                    char[] lstElementoNumeroControl = busqueda.ToCharArray();
                    List<string> elementos = new List<string>();
                    foreach (char i in lstElementoNumeroControl)
                    {
                        elementos.Add(i.ToString());
                    }

                    switch (tipoIncidenciaID)
                    {
                        case 1: //Folio Aviso Entrada
                            listado = (from fe in ctx.Sam3_FolioAvisoLlegada
                                       where fe.Activo
                                       && elementos.Any(x => fe.FolioAvisoLlegadaID.ToString().Contains(x))
                                       select new ListaCombos
                                       {
                                           id = fe.FolioAvisoLlegadaID.ToString(),
                                           value = fe.FolioAvisoLlegadaID.ToString()
                                       }).AsParallel().Distinct().ToList();
                            break;
                        case 2: // Entrada de Material
                            listado = (from fem in ctx.Sam3_FolioAvisoEntrada
                                       where fem.Activo
                                       && elementos.Any(x => fem.FolioAvisoEntradaID.ToString().Contains(x))
                                       select new ListaCombos
                                       {
                                           id = fem.FolioAvisoEntradaID.ToString(),
                                           value = fem.FolioAvisoEntradaID.ToString()
                                       }).AsParallel().Distinct().ToList();
                            break;
                        case 3: // Pase Salida. Por el momento sin implementacion
                            break;
                        case 4: // Packing List
                            listado = (from fc in ctx.Sam3_FolioCuantificacion
                                       where fc.Activo
                                       && elementos.Any(x => fc.FolioCuantificacionID.ToString().Contains(x))
                                       select new ListaCombos
                                       {
                                           id = fc.FolioCuantificacionID.ToString(),
                                           value = fc.FolioCuantificacionID.ToString()
                                       }).AsParallel().Distinct().ToList();
                            break;
                        case 5: // Orden de recepcion
                            listado = (from ordr in ctx.Sam3_OrdenRecepcion
                                       where ordr.Activo
                                       && elementos.Any(x => ordr.Folio.ToString().Contains(x))
                                       select new ListaCombos
                                       {
                                           id = ordr.OrdenRecepcionID.ToString(),
                                           value = ordr.OrdenRecepcionID.ToString()
                                       }).AsParallel().Distinct().ToList();
                            break;
                        case 6: // Complemento de recepcion. Por el momento sin implementacion
                            break;
                        case 7: // ItemCode
                            listado = (from it in ctx.Sam3_ItemCode
                                       where it.Activo
                                       && elementos.Any(x => it.Codigo.Contains(x))
                                       select new ListaCombos
                                       {
                                           id = it.ItemCodeID.ToString(),
                                           value = it.Codigo
                                       }).AsParallel().Distinct().ToList();
                            break;
                        case 8: // Orden de almacenaje
                            listado = (from oa in ctx.Sam3_OrdenAlmacenaje
                                       where oa.Activo
                                       && elementos.Any(x => oa.Folio.ToString().Contains(x))
                                       select new ListaCombos
                                       {
                                           id = oa.OrdenAlmacenajeID.ToString(),
                                           value = oa.Folio.ToString()
                                       }).AsParallel().Distinct().ToList();
                            break;
                        case 9: // Numero unico
                            listado = (from nu in ctx.Sam3_NumeroUnico
                                       where nu.Activo
                                       && elementos.Any(x => (nu.Prefijo + nu.Consecutivo).Contains(x))
                                       select new ListaCombos
                                       {
                                           id = nu.NumeroUnicoID.ToString(),
                                           value = nu.Prefijo + "-" + nu.Consecutivo
                                       }).AsParallel().Distinct().ToList();

                            foreach (ListaCombos i in listado)
                            {
                                int temp = Convert.ToInt32(i.id);
                                int digitos = (from nu in ctx.Sam3_NumeroUnico
                                               join p in ctx.Sam3_ProyectoConfiguracion on nu.ProyectoID equals p.ProyectoID
                                               where nu.NumeroUnicoID == temp
                                               select p.DigitosNumeroUnico).AsParallel().SingleOrDefault();

                                string formato = "D" + digitos.ToString();
                                string[] partes = i.value.Split('-').ToArray();
                                int consecutivo = Convert.ToInt32(partes[1]);

                                i.value = partes[0] + "-" + consecutivo.ToString(formato);
                                
                            }

                            break;
                        case 10: // Despacho
                            listado = (from d in ctx.Sam3_Despacho
                                       where d.Activo
                                       && elementos.Any(x => d.DespachoID.ToString().Contains(x))
                                       select new ListaCombos
                                       {
                                           id = d.DespachoID.ToString(),
                                           value = d.DespachoID.ToString()
                                       }).AsParallel().Distinct().ToList();
                            break;
                        case 11: // Corte
                            listado = (from c in ctx.Sam3_Corte
                                       where c.Activo
                                       && elementos.Any(x => c.CortadorID.ToString().Contains(x))
                                       select new ListaCombos
                                       {
                                           id = c.CorteID.ToString(),
                                           value = c.CorteID.ToString()
                                       }).AsParallel().Distinct().ToList();
                            break;
                        default:
                            throw new Exception("No se encontro el tipo de incidencia");
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
    }
}