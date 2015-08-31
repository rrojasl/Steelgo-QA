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
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

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

                    result.SinEstaus = (from r in registrosBd
                                                   where r.Estatus != "En Patio"
                                                   select r).Count();

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
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

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

                    //Traemos todos los folios que esten dentro del periodo de fechas y que correspondan a los proyectos y patios de los usuarios.
                    List<Sam3_FolioAvisoEntrada> registros = (from fae in ctx.Sam3_FolioAvisoEntrada
                                                              join fal in ctx.Sam3_FolioAvisoLlegada on fae.FolioAvisoLlegadaID equals fal.FolioAvisoLlegadaID
                                                              join rfal in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on fal.FolioAvisoLlegadaID equals rfal.FolioAvisoLlegadaID
                                                              join p in ctx.Sam3_Proyecto on rfal.ProyectoID equals p.ProyectoID
                                                              join pa in ctx.Sam3_Patio on p.PatioID equals pa.PatioID
                                                              where fae.Activo && fal.Activo && rfal.Activo && p.Activo && pa.Activo
                                                              && proyectos.Contains(rfal.ProyectoID)
                                                              && patios.Contains(pa.PatioID)
                                                              && (fae.FechaCreacion >= fechaInicial && fae.FechaCreacion <= fechaFinal)
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

                    //folios de aviso de entrada que aun no tienen relacion en algun foliocuantificacion
                    result.EntradaPorCuantificar = (from r in registros
                                                    where r.Activo
                                                    && !(from c in ctx.Sam3_FolioCuantificacion
                                                         select c.FolioAvisoEntradaID).Contains(r.FolioAvisoEntradaID)
                                                    select r).Count();

                    //traer los Packinglisto por cuantificar
                    result.PLPorCuantificar = (from r in registros
                                               join c in ctx.Sam3_FolioCuantificacion on r.FolioAvisoEntradaID equals c.FolioAvisoEntradaID
                                               join i in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on c.FolioCuantificacionID equals i.FolioCuantificacionID
                                               join it in ctx.Sam3_ItemCode on i.ItemCodeID equals it.ItemCodeID
                                               where r.Activo && c.Activo && i.Activo && it.Activo
                                               && c.Estatus == "Entrada por cuantificar"
                                               && it.TipoMaterialID == tipoMaterialID
                                               select r).AsParallel().Count();

                    //Traer materiales que no tienen un itemCodeSteelgo
                    result.MTLSinICS = (from r in registros
                                        join f in ctx.Sam3_FolioCuantificacion on r.FolioAvisoEntradaID equals f.FolioAvisoEntradaID
                                        join rit in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on f.FolioCuantificacionID equals rit.FolioCuantificacionID
                                        join i in ctx.Sam3_ItemCode on rit.ItemCodeID equals i.ItemCodeID
                                        where f.Activo && rit.Activo && i.Activo && i.TipoMaterialID == tipoMaterialID
                                        && !(from its in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                             where its.Activo
                                             select its.ItemCodeID).Contains(i.ItemCodeID)
                                        select i).AsParallel().Count();

                    //itemcodes sin orde de recepcion
                    result.MTLSinOrdenRecepcion = (from r in registros
                                                   join f in ctx.Sam3_FolioCuantificacion on r.FolioAvisoEntradaID equals f.FolioAvisoEntradaID
                                                   join rit in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on f.FolioCuantificacionID equals rit.FolioCuantificacionID
                                                   join i in ctx.Sam3_ItemCode on rit.ItemCodeID equals i.ItemCodeID
                                                   where f.Activo && rit.Activo && i.TipoMaterialID == tipoMaterialID
                                                   && !(from roi in ctx.Sam3_Rel_OrdenRecepcion_ItemCode
                                                        where roi.Activo
                                                        select roi.ItemCodeID).Contains(rit.ItemCodeID)
                                                   select rit).AsParallel().Count();

                    //Numeros unicos sin complemento de recepcion
                    result.NUPorRecepcionar = (from r in registros
                                               join or in ctx.Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion on r.FolioAvisoEntradaID equals or.FolioAvisoEntradaID
                                               join o in ctx.Sam3_OrdenRecepcion on or.OrdenRecepcionID equals o.OrdenRecepcionID
                                               join roi in ctx.Sam3_Rel_OrdenRecepcion_ItemCode on o.OrdenRecepcionID equals roi.OrdenRecepcionID
                                               join i in ctx.Sam3_ItemCode on roi.ItemCodeID equals i.ItemCodeID
                                               join nu in ctx.Sam3_NumeroUnico on roi.ItemCodeID equals nu.ItemCodeID
                                               where or.Activo && o.Activo && roi.Activo && nu.Activo && i.TipoMaterialID == tipoMaterialID
                                               && !(from rep in ctx.Sam3_Recepcion
                                                    where rep.Activo
                                                    select rep.ItemCodeID).Contains(nu.ItemCodeID.Value)
                                               select nu).AsParallel().Count();

                    //numeros unicos sin orden de almacenaje, que ya cuentan con recepcion y complemento de recepcion
                    result.NUSinOrdenAlmacenaje = (from r in registros
                                                   join rfo in ctx.Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion on r.FolioAvisoEntradaID equals rfo.FolioAvisoEntradaID
                                                   join o in ctx.Sam3_Rel_OrdenRecepcion_ItemCode on rfo.OrdenRecepcionID equals o.OrdenRecepcionID
                                                   join nu in ctx.Sam3_NumeroUnico on o.ItemCodeID equals nu.ItemCodeID
                                                   join rp in ctx.Sam3_Recepcion on o.ItemCodeID equals rp.ItemCodeID
                                                   join i in ctx.Sam3_ItemCode on o.ItemCodeID equals i.ItemCodeID
                                                   where rfo.Activo && o.Activo && nu.Activo && rp.Activo && i.Activo && i.TipoMaterialID == tipoMaterialID
                                                   && !(from ord in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico
                                                        where ord.Activo
                                                        select ord.NumeroUnicoID).Contains(nu.NumeroUnicoID)
                                                   select nu).AsParallel().Count();

                    //Numeros unicos sin rack
                    result.NUSinAlmacenar = (from r in registros
                                             join rel in ctx.Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion on r.FolioAvisoEntradaID equals rel.FolioAvisoEntradaID
                                             join roi in ctx.Sam3_Rel_OrdenRecepcion_ItemCode on rel.OrdenRecepcionID equals roi.OrdenRecepcionID
                                             join nu in ctx.Sam3_NumeroUnico on roi.ItemCodeID equals nu.ItemCodeID
                                             join it in ctx.Sam3_ItemCode on nu.ItemCodeID equals it.ItemCodeID
                                             where rel.Activo && roi.Activo && nu.Activo && it.Activo && it.TipoMaterialID == tipoMaterialID
                                             && nu.Rack == ""
                                             select nu).AsParallel().Count();


                    result.TipoMaterial = tipoMaterialID.ToString();

                    result.IncidenciasAbiertas = (from r in registros
                                                  join rel in ctx.Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion on r.FolioAvisoEntradaID equals rel.FolioAvisoEntradaID
                                                  join roi in ctx.Sam3_Rel_OrdenRecepcion_ItemCode on rel.OrdenRecepcionID equals roi.OrdenRecepcionID
                                                  join nu in ctx.Sam3_NumeroUnico on roi.ItemCodeID equals nu.ItemCodeID
                                                  join rnu in ctx.Sam3_Rel_Incidencia_NumeroUnico on nu.NumeroUnicoID equals rnu.NumeroUnicoID
                                                  join it in ctx.Sam3_ItemCode on nu.ItemCodeID equals it.ItemCodeID
                                                  join i in ctx.Sam3_Incidencia on rnu.IncidenciaID equals i.IncidenciaID
                                                  where nu.Activo && rnu.Activo && it.Activo && i.Activo && it.TipoMaterialID == tipoMaterialID
                                                  select i).AsParallel().Count();

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