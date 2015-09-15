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
using System.Transactions;
using System.Threading.Tasks;

namespace BackEndSAM.DataAcces
{
    public class OrdenRecepcionBd
    {
        private static readonly object _mutex = new object();
        private static OrdenRecepcionBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private OrdenRecepcionBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static OrdenRecepcionBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new OrdenRecepcionBd();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerListadoGenerarOrdenRecepcion(FiltrosJson filtros, Sam3_Usuario usuario, bool conteo = false)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    int proyectoID = filtros.ProyectoID != "" ? Convert.ToInt32(filtros.ProyectoID) : 0;
                    int folioAvisoLlegadaID = filtros.FolioAvisoEntradaID != "" ? Convert.ToInt32(filtros.FolioAvisoEntradaID) : 0;
                    int itemCodeID = filtros.ItemCodeID != "" ? Convert.ToInt32(filtros.ItemCodeID) : 0;

                    //Patios y proyectos del usuario
                    List<int> proyectos = ctx.Sam3_Rel_Usuario_Proyecto.Where(x => x.UsuarioID == usuario.UsuarioID).Select(x => x.ProyectoID).AsParallel().ToList();

                    List<int> patios = (from r in ctx.Sam3_Proyecto
                                        join p in ctx.Sam3_Patio on r.PatioID equals p.PatioID
                                        where r.Activo && proyectos.Contains(r.ProyectoID)
                                        select p.PatioID).AsParallel().GroupBy(x => x).Select(x => x.First()).ToList();

                    List<Sam3_FolioAvisoEntrada> registros;

                    if (proyectoID > 0)
                    {
                        registros = (from r in ctx.Sam3_FolioAvisoEntrada
                                     join fa in ctx.Sam3_FolioAvisoLlegada on r.FolioAvisoLlegadaID equals fa.FolioAvisoLlegadaID
                                     join p in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on fa.FolioAvisoLlegadaID equals p.FolioAvisoLlegadaID
                                     join pr in ctx.Sam3_Proyecto on p.ProyectoID equals pr.ProyectoID
                                     join f in ctx.Sam3_FolioCuantificacion on r.FolioAvisoEntradaID equals f.FolioAvisoEntradaID
                                     where r.Activo && fa.Activo && p.Activo && pr.Activo && f.Activo
                                     && proyectos.Contains(pr.ProyectoID)
                                     && patios.Contains(pr.PatioID)
                                     && p.ProyectoID == proyectoID
                                     select r).AsParallel().ToList();
                    }
                    else
                    {
                        registros = (from r in ctx.Sam3_FolioAvisoEntrada
                                     join fa in ctx.Sam3_FolioAvisoLlegada on r.FolioAvisoLlegadaID equals fa.FolioAvisoLlegadaID
                                     join p in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on fa.FolioAvisoLlegadaID equals p.FolioAvisoLlegadaID
                                     join pr in ctx.Sam3_Proyecto on p.ProyectoID equals pr.ProyectoID
                                     join f in ctx.Sam3_FolioCuantificacion on r.FolioAvisoEntradaID equals f.FolioAvisoEntradaID
                                     where r.Activo && fa.Activo && p.Activo && pr.Activo && f.Activo
                                     && proyectos.Contains(pr.ProyectoID)
                                     && patios.Contains(pr.PatioID)
                                     select r).AsParallel().ToList();
                    }

                    if (folioAvisoLlegadaID > 0)
                    {
                        registros = registros.Where(x => x.FolioAvisoLlegadaID == folioAvisoLlegadaID).AsParallel().ToList();
                    }

                    registros = registros.GroupBy(x => x.FolioAvisoEntradaID).Select(x => x.First()).ToList();

                    List<ListadoGenerarOrdenRecepcion> listado = new List<ListadoGenerarOrdenRecepcion>();

                    foreach (Sam3_FolioAvisoEntrada f in registros)
                    {
                        ListadoGenerarOrdenRecepcion elemento = new ListadoGenerarOrdenRecepcion();
                        elemento.AvisoEntradaID = f.FolioAvisoLlegadaID.ToString();

                        elemento.Tubos = (from r in ctx.Sam3_FolioAvisoEntrada
                                          join c in ctx.Sam3_FolioCuantificacion on r.FolioAvisoEntradaID equals c.FolioAvisoEntradaID
                                          join rfp in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on r.FolioAvisoLlegadaID equals rfp.FolioAvisoLlegadaID
                                          join rfi in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on c.FolioCuantificacionID equals rfi.FolioCuantificacionID
                                          join i in ctx.Sam3_ItemCode on rfi.ItemCodeID equals i.ItemCodeID
                                          join t in ctx.Sam3_TipoMaterial on i.TipoMaterialID equals t.TipoMaterialID
                                          where r.Activo && c.Activo && rfp.Activo && rfi.Activo && i.Activo && t.Activo
                                          && i.TipoMaterialID == 1 && r.FolioAvisoLlegadaID == f.FolioAvisoLlegadaID
                                          && !(from nu in ctx.Sam3_NumeroUnico
                                               where nu.Activo
                                               select nu.ItemCodeID).Contains(i.ItemCodeID)
                                          && !(from roi in ctx.Sam3_Rel_OrdenRecepcion_ItemCode
                                               where roi.Activo
                                               select roi.ItemCodeID).Contains(i.ItemCodeID)
                                          select new ElementoItemCodeGenerarOrden
                                          {
                                              ItemCodeID = i.ItemCodeID.ToString(),
                                              Cantidad = i.Cantidad.ToString(),
                                              Codigo = i.Codigo,
                                              D1 = i.Diametro1.ToString(),
                                              D2 = i.Diametro2.ToString(),
                                              Descripcion = i.DescripcionEspanol,
                                              TipoMaterial = t.Nombre,
                                              FolioAvisoLlegadaId = r.FolioAvisoLlegadaID.ToString()
                                          }).AsParallel().ToList();

                        elemento.Tubos.AddRange((from r in ctx.Sam3_FolioAvisoEntrada
                                                 join c in ctx.Sam3_FolioCuantificacion on r.FolioAvisoEntradaID equals c.FolioAvisoEntradaID
                                                 join b in ctx.Sam3_Bulto on c.FolioCuantificacionID equals b.FolioCuantificacionID
                                                 join rbi in ctx.Sam3_Rel_Bulto_ItemCode on b.BultoID equals rbi.BultoID
                                                 join i in ctx.Sam3_ItemCode on rbi.ItemCodeID equals i.ItemCodeID
                                                 join t in ctx.Sam3_TipoMaterial on i.TipoMaterialID equals t.TipoMaterialID
                                                 where r.Activo && c.Activo && b.Activo && rbi.Activo && i.Activo && t.Activo
                                                 && i.TipoMaterialID == 1 && r.FolioAvisoLlegadaID == f.FolioAvisoLlegadaID
                                                 && !(from nu in ctx.Sam3_NumeroUnico
                                                      where nu.Activo
                                                      select nu.ItemCodeID).Contains(i.ItemCodeID)
                                                 && !(from roi in ctx.Sam3_Rel_OrdenRecepcion_ItemCode
                                                      where roi.Activo
                                                      select roi.ItemCodeID).Contains(i.ItemCodeID)
                                                 select new ElementoItemCodeGenerarOrden
                                                 {
                                                     ItemCodeID = i.ItemCodeID.ToString(),
                                                     Cantidad = i.Cantidad.ToString(),
                                                     Codigo = i.Codigo,
                                                     D1 = i.Diametro1.ToString(),
                                                     D2 = i.Diametro2.ToString(),
                                                     Descripcion = i.DescripcionEspanol,
                                                     TipoMaterial = t.Nombre,
                                                     FolioAvisoLlegadaId = r.FolioAvisoLlegadaID.ToString()
                                                 }).AsParallel().ToList());

                        elemento.Accesorios = (from r in ctx.Sam3_FolioAvisoEntrada
                                               join c in ctx.Sam3_FolioCuantificacion on r.FolioAvisoEntradaID equals c.FolioAvisoEntradaID
                                               join rfp in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on r.FolioAvisoLlegadaID equals rfp.FolioAvisoLlegadaID
                                               join rfi in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on c.FolioCuantificacionID equals rfi.FolioCuantificacionID
                                               join i in ctx.Sam3_ItemCode on rfi.ItemCodeID equals i.ItemCodeID
                                               join t in ctx.Sam3_TipoMaterial on i.TipoMaterialID equals t.TipoMaterialID
                                               where r.Activo && c.Activo && rfp.Activo && rfi.Activo && i.Activo && t.Activo
                                               && i.TipoMaterialID == 2 && r.FolioAvisoLlegadaID == f.FolioAvisoLlegadaID
                                               && !(from nu in ctx.Sam3_NumeroUnico
                                                    where nu.Activo
                                                    select nu.ItemCodeID).Contains(i.ItemCodeID)
                                               && !(from roi in ctx.Sam3_Rel_OrdenRecepcion_ItemCode
                                                    where roi.Activo
                                                    select roi.ItemCodeID).Contains(i.ItemCodeID)
                                               select new ElementoItemCodeGenerarOrden
                                               {
                                                   ItemCodeID = i.ItemCodeID.ToString(),
                                                   Cantidad = i.Cantidad.ToString(),
                                                   Codigo = i.Codigo,
                                                   D1 = i.Diametro1.ToString(),
                                                   D2 = i.Diametro2.ToString(),
                                                   Descripcion = i.DescripcionEspanol,
                                                   TipoMaterial = t.Nombre,
                                                   FolioAvisoLlegadaId = r.FolioAvisoLlegadaID.ToString()
                                               }).AsParallel().ToList();

                        elemento.Accesorios.AddRange((from r in ctx.Sam3_FolioAvisoEntrada
                                                      join c in ctx.Sam3_FolioCuantificacion on r.FolioAvisoEntradaID equals c.FolioAvisoEntradaID
                                                      join b in ctx.Sam3_Bulto on c.FolioCuantificacionID equals b.FolioCuantificacionID
                                                      join rbi in ctx.Sam3_Rel_Bulto_ItemCode on b.BultoID equals rbi.BultoID
                                                      join i in ctx.Sam3_ItemCode on rbi.ItemCodeID equals i.ItemCodeID
                                                      join t in ctx.Sam3_TipoMaterial on i.TipoMaterialID equals t.TipoMaterialID
                                                      where r.Activo && c.Activo && b.Activo && rbi.Activo && i.Activo && t.Activo
                                                      && i.TipoMaterialID == 2 && r.FolioAvisoLlegadaID == f.FolioAvisoLlegadaID
                                                      && !(from nu in ctx.Sam3_NumeroUnico
                                                           where nu.Activo
                                                           select nu.ItemCodeID).Contains(i.ItemCodeID)
                                                      && !(from roi in ctx.Sam3_Rel_OrdenRecepcion_ItemCode
                                                           where roi.Activo
                                                           select roi.ItemCodeID).Contains(i.ItemCodeID)
                                                      select new ElementoItemCodeGenerarOrden
                                                      {
                                                          ItemCodeID = i.ItemCodeID.ToString(),
                                                          Cantidad = i.Cantidad.ToString(),
                                                          Codigo = i.Codigo,
                                                          D1 = i.Diametro1.ToString(),
                                                          D2 = i.Diametro2.ToString(),
                                                          Descripcion = i.DescripcionEspanol,
                                                          TipoMaterial = t.Nombre,
                                                          FolioAvisoLlegadaId = r.FolioAvisoLlegadaID.ToString()
                                                      }).AsParallel().ToList());

                        elemento.Tubos = elemento.Tubos.GroupBy(x => x.ItemCodeID).Select(x => x.First()).AsParallel().ToList();
                        elemento.Accesorios = elemento.Accesorios.GroupBy(x => x.ItemCodeID).Select(x => x.First()).AsParallel().ToList();

                        if (itemCodeID > 0)
                        {
                            elemento.Tubos = elemento.Tubos.Where(x => x.ItemCodeID == itemCodeID.ToString()).GroupBy(x => x.ItemCodeID).Select(x => x.First()).AsParallel().ToList();
                            elemento.Accesorios = elemento.Accesorios.Where(x => x.ItemCodeID == itemCodeID.ToString()).GroupBy(x => x.ItemCodeID).Select(x => x.First()).AsParallel().ToList();
                        }

                        if (elemento.Tubos.Count > 0 || elemento.Accesorios.Count > 0)
                        {
                            listado.Add(elemento);
                        }

                    }

#if DEBUG
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    string json = serializer.Serialize(listado);
#endif
                    if (conteo)
                    {
                        return listado.Count;
                    }
                    else
                    {
                        return listado.OrderBy(x => x.AvisoEntradaID).ToList();
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

        public object ObtenerListadoOrdenRecepcion(FiltrosJson filtros, Sam3_Usuario usuario, bool conteo = false)
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

                    int clienteID = filtros.ClienteID != "" ? Convert.ToInt32(filtros.ClienteID) : 0;
                    int folioAvisollegadaID = filtros.FolioAvisoLlegadaID != "" ? Convert.ToInt32(filtros.FolioAvisoLlegadaID) : 0;
                    int proyectoID = filtros.ProyectoID != "" ? Convert.ToInt32(filtros.ProyectoID) : 0;

                    //Patios y proyectos del usuario
                    List<int> proyectos = ctx.Sam3_Rel_Usuario_Proyecto.Where(x => x.UsuarioID == usuario.UsuarioID).Select(x => x.ProyectoID).AsParallel().ToList();

                    List<int> patios = (from r in ctx.Sam3_Proyecto
                                        join p in ctx.Sam3_Patio on r.PatioID equals p.PatioID
                                        where r.Activo && proyectos.Contains(r.ProyectoID)
                                        select p.PatioID).AsParallel().ToList();
                    //-----------------------------------------------------------------------------------
                    List<Sam3_OrdenRecepcion> ordenes = new List<Sam3_OrdenRecepcion>();

                    if (proyectoID > 0)
                    {
                        ordenes = (from o in ctx.Sam3_OrdenRecepcion
                                   join rfo in ctx.Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion on o.OrdenRecepcionID equals rfo.OrdenRecepcionID
                                   join fe in ctx.Sam3_FolioAvisoEntrada on rfo.FolioAvisoEntradaID equals fe.FolioAvisoEntradaID
                                   join rfp in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on fe.FolioAvisoLlegadaID equals rfp.FolioAvisoLlegadaID
                                   join p in ctx.Sam3_Proyecto on rfp.ProyectoID equals p.ProyectoID
                                   join pa in ctx.Sam3_Patio on p.PatioID equals pa.PatioID
                                   where o.Activo && rfo.Activo && fe.Activo && rfp.Activo && p.Activo && pa.Activo
                                   && (o.FechaCreacion >= fechaInicial && o.FechaCreacion <= fechaFinal)
                                   && proyectos.Contains(p.ProyectoID)
                                   && p.ProyectoID == proyectoID
                                   select o).ToList();
                    }
                    else
                    {
                        ordenes = (from o in ctx.Sam3_OrdenRecepcion
                                   join rfo in ctx.Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion on o.OrdenRecepcionID equals rfo.OrdenRecepcionID
                                   join fe in ctx.Sam3_FolioAvisoEntrada on rfo.FolioAvisoEntradaID equals fe.FolioAvisoEntradaID
                                   join rfp in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on fe.FolioAvisoLlegadaID equals rfp.FolioAvisoLlegadaID
                                   join p in ctx.Sam3_Proyecto on rfp.ProyectoID equals p.ProyectoID
                                   join pa in ctx.Sam3_Patio on p.PatioID equals pa.PatioID
                                   where o.Activo && rfo.Activo && fe.Activo && rfp.Activo && p.Activo && pa.Activo
                                   && (o.FechaCreacion >= fechaInicial && o.FechaCreacion <= fechaFinal)
                                   && proyectos.Contains(p.ProyectoID)
                                   select o).ToList();
                    }

                    if (clienteID > 0)
                    {
                        ordenes = (from o in ctx.Sam3_OrdenRecepcion
                                   join rfo in ctx.Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion on o.OrdenRecepcionID equals rfo.OrdenRecepcionID
                                   join fe in ctx.Sam3_FolioAvisoEntrada on rfo.FolioAvisoEntradaID equals fe.FolioAvisoEntradaID
                                   where o.Activo && rfo.Activo && fe.Activo
                                   && fe.ClienteID == clienteID
                                   select o).ToList();
                    }

                    if (folioAvisollegadaID > 0)
                    {
                        ordenes = (from o in ctx.Sam3_OrdenRecepcion
                                   join rfo in ctx.Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion on o.OrdenRecepcionID equals rfo.OrdenRecepcionID
                                   join fe in ctx.Sam3_FolioAvisoEntrada on rfo.FolioAvisoEntradaID equals fe.FolioAvisoEntradaID
                                   where o.Activo && rfo.Activo && fe.Activo
                                   && fe.FolioAvisoLlegadaID == folioAvisollegadaID
                                   select o).ToList();
                    }

                    ordenes = ordenes.GroupBy(x => x.OrdenRecepcionID).Select(x => x.First()).ToList();

                    List<ListadoOrdeRecepcion> listado = new List<ListadoOrdeRecepcion>();

                    foreach (Sam3_OrdenRecepcion o in ordenes)
                    {
                        ListadoOrdeRecepcion elemento = new ListadoOrdeRecepcion();
                        elemento.FechaOrdenRecepcion = o.FechaCreacion.ToString("dd/MM/yyyy");
                        elemento.OrdenRecepcion = o.Folio.ToString();

                        List<ElementoItemCode> items = (from roi in ctx.Sam3_Rel_OrdenRecepcion_ItemCode
                                                        join i in ctx.Sam3_ItemCode on roi.ItemCodeID equals i.ItemCodeID
                                                        join rfo in ctx.Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion on roi.OrdenRecepcionID equals rfo.OrdenRecepcionID
                                                        join fe in ctx.Sam3_FolioAvisoEntrada on rfo.FolioAvisoEntradaID equals fe.FolioAvisoEntradaID
                                                        where roi.OrdenRecepcionID == o.OrdenRecepcionID
                                                        select new ElementoItemCode
                                                        {
                                                            Cantidad = i.Cantidad != null ? i.Cantidad.Value : 0,
                                                            Itemcode = i.Codigo,
                                                            AvisoEntrada = fe.FolioAvisoLlegadaID.ToString()
                                                        }).AsParallel().ToList();

                        elemento.Detalle = items.OrderBy(x => x.AvisoEntrada).ToList();

                        if (elemento.Detalle.Count > 0)
                        {
                            listado.Add(elemento);
                        }
                    }


#if DEBUG
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    string json = serializer.Serialize(listado);
#endif
                    if (conteo)
                    {
                        return listado.Count;
                    }
                    {
                        return listado.OrderBy(x => x.OrdenRecepcion).ToList();
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

        public object ObtenerDetalleOrdeRecepcion(int folio, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<ListadoGenerarOrdenRecepcion> listado = new List<ListadoGenerarOrdenRecepcion>();

                    Sam3_OrdenRecepcion orden = ctx.Sam3_OrdenRecepcion.Where(x => x.Folio == folio).AsParallel().SingleOrDefault();

                    List<Sam3_FolioAvisoEntrada> registros = (from fe in ctx.Sam3_FolioAvisoEntrada
                                                              join rfo in ctx.Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion on fe.FolioAvisoEntradaID equals rfo.FolioAvisoEntradaID
                                                              join o in ctx.Sam3_OrdenRecepcion on rfo.OrdenRecepcionID equals o.OrdenRecepcionID
                                                              where fe.Activo && rfo.Activo && o.Activo
                                                              && o.OrdenRecepcionID == orden.OrdenRecepcionID
                                                              select fe).AsParallel().ToList();

                    foreach (Sam3_FolioAvisoEntrada r in registros)
                    {
                        ListadoGenerarOrdenRecepcion elemento = new ListadoGenerarOrdenRecepcion();
                        int folioAvisoEntradaID = r.FolioAvisoLlegadaID.Value;
                        elemento.AvisoEntradaID = r.FolioAvisoLlegadaID.ToString(); ;

                        elemento.Tubos = (from o in ctx.Sam3_OrdenRecepcion
                                          join rfo in ctx.Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion on o.OrdenRecepcionID equals rfo.OrdenRecepcionID
                                          join fe in ctx.Sam3_FolioAvisoEntrada on rfo.FolioAvisoEntradaID equals fe.FolioAvisoEntradaID
                                          join rfi in ctx.Sam3_Rel_OrdenRecepcion_ItemCode on rfo.OrdenRecepcionID equals rfi.OrdenRecepcionID
                                          join it in ctx.Sam3_ItemCode on rfi.ItemCodeID equals it.ItemCodeID
                                          join t in ctx.Sam3_TipoMaterial on it.TipoMaterialID equals t.TipoMaterialID
                                          where o.Activo && rfo.Activo && rfi.Activo && it.Activo && t.Activo && fe.Activo
                                          && o.OrdenRecepcionID == orden.OrdenRecepcionID
                                          && it.TipoMaterialID == 1
                                          && fe.FolioAvisoLlegadaID == folioAvisoEntradaID
                                          select new ElementoItemCodeGenerarOrden
                                          {
                                              ItemCodeID = it.ItemCodeID.ToString(),
                                              Cantidad = it.Cantidad != null && it.Cantidad.Value > 0 ? it.Cantidad.Value.ToString() : "",
                                              Codigo = it.Codigo,
                                              D1 = it.Diametro1 != null || it.Diametro1 > 0 ? it.Diametro1.ToString()
                                                : (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                                   join its in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals its.ItemCodeSteelgoID
                                                   where rics.Activo && its.Activo
                                                   && rics.ItemCodeID == it.ItemCodeID
                                                   select its.Diametro1).FirstOrDefault().ToString(),

                                              D2 = it.Diametro2 != null || it.Diametro2 > 0 ? it.Diametro2.ToString()
                                                : (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                                   join its in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals its.ItemCodeSteelgoID
                                                   where rics.Activo && its.Activo
                                                   && rics.ItemCodeID == it.ItemCodeID
                                                   select its.Diametro2).FirstOrDefault().ToString(),

                                              Descripcion = it.DescripcionEspanol,
                                              TipoMaterial = t.Nombre
                                          }).AsParallel().ToList();

                        elemento.Accesorios = (from o in ctx.Sam3_OrdenRecepcion
                                               join rfo in ctx.Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion on o.OrdenRecepcionID equals rfo.OrdenRecepcionID
                                               join fe in ctx.Sam3_FolioAvisoEntrada on rfo.FolioAvisoEntradaID equals fe.FolioAvisoEntradaID
                                               join rfi in ctx.Sam3_Rel_OrdenRecepcion_ItemCode on rfo.OrdenRecepcionID equals rfi.OrdenRecepcionID
                                               join it in ctx.Sam3_ItemCode on rfi.ItemCodeID equals it.ItemCodeID
                                               join t in ctx.Sam3_TipoMaterial on it.TipoMaterialID equals t.TipoMaterialID
                                               where o.Activo && rfo.Activo && rfi.Activo && it.Activo && t.Activo && fe.Activo
                                               && o.OrdenRecepcionID == orden.OrdenRecepcionID
                                               && it.TipoMaterialID == 2
                                               && fe.FolioAvisoLlegadaID == folioAvisoEntradaID
                                               select new ElementoItemCodeGenerarOrden
                                               {
                                                   ItemCodeID = it.ItemCodeID.ToString(),
                                                   Cantidad = it.Cantidad != null && it.Cantidad.Value > 0 ? it.Cantidad.Value.ToString() : "",
                                                   Codigo = it.Codigo,
                                                   D1 = it.Diametro1 != null || it.Diametro1 > 0 ? it.Diametro1.ToString()
                                                    : (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                                       join its in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals its.ItemCodeSteelgoID
                                                       where rics.Activo && its.Activo
                                                       && rics.ItemCodeID == it.ItemCodeID
                                                       select its.Diametro1).FirstOrDefault().ToString(),

                                                   D2 = it.Diametro2 != null || it.Diametro2 > 0 ? it.Diametro2.ToString()
                                                     : (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                                        join its in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals its.ItemCodeSteelgoID
                                                        where rics.Activo && its.Activo
                                                        && rics.ItemCodeID == it.ItemCodeID
                                                        select its.Diametro2).FirstOrDefault().ToString(),

                                                   Descripcion = it.DescripcionEspanol,
                                                   TipoMaterial = t.Nombre
                                               }).AsParallel().ToList();

                        listado.Add(elemento);
                    }

#if DEBUG
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    string json = serializer.Serialize(listado);
#endif

                    return listado.OrderBy(x => x.AvisoEntradaID).ToList();
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

        public object ObtenerInfo(int ordenRecepcion, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {


                    return null;
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

        public object GenerarOrdeRecepcion(List<int> itemCodes, Sam3_Usuario usuario)
        {
            try
            {
                Sam3_OrdenRecepcion nuevaOrden = new Sam3_OrdenRecepcion();
                int consecutivo = 0;
                List<int> foliosEntrada = new List<int>();

                using (TransactionScope scope = new TransactionScope())
                {
                    using (SamContext ctx = new SamContext())
                    {
                        foliosEntrada = (from i in ctx.Sam3_ItemCode
                                         join fci in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on i.ItemCodeID equals fci.ItemCodeID
                                         join fc in ctx.Sam3_FolioCuantificacion on fci.FolioCuantificacionID equals fc.FolioCuantificacionID
                                         join fe in ctx.Sam3_FolioAvisoEntrada on fc.FolioAvisoEntradaID equals fe.FolioAvisoEntradaID
                                         where i.Activo && fci.Activo && fc.Activo && fe.Activo 
                                         && itemCodes.Contains(i.ItemCodeID)
                                         select fe.FolioAvisoEntradaID).AsParallel().Distinct().ToList();

                        foliosEntrada.AddRange((from i in ctx.Sam3_ItemCode
                                                join rbi in ctx.Sam3_Rel_Bulto_ItemCode on i.ItemCodeID equals rbi.ItemCodeID
                                                join b in ctx.Sam3_Bulto on rbi.BultoID equals b.BultoID
                                                join fc in ctx.Sam3_FolioCuantificacion on b.FolioCuantificacionID equals fc.FolioCuantificacionID
                                                join fe in ctx.Sam3_FolioAvisoEntrada on fc.FolioAvisoEntradaID equals fe.FolioAvisoEntradaID
                                                where i.Activo && rbi.Activo && b.Activo && fc.Activo && fe.Activo
                                                && itemCodes.Contains(i.ItemCodeID)
                                                select fe.FolioAvisoEntradaID).AsParallel().Distinct().ToList());

                        //retiramos los duplicados
                        foliosEntrada = foliosEntrada.GroupBy(x => x).Select(x => x.First()).ToList();

                        if (ctx.Sam3_OrdenRecepcion.Select(x => x.Folio).Any())
                        {
                            consecutivo = ctx.Sam3_OrdenRecepcion.Select(x => x.Folio).Max();
                            consecutivo = consecutivo > 0 ? consecutivo + 1 : 1;
                        }
                        else
                        {
                            consecutivo = 1;
                        }

                        //Generamos un nuevo registro en orden de recepcion
                        nuevaOrden.Activo = true;
                        nuevaOrden.FechaCreacion = DateTime.Now;
                        nuevaOrden.FechaModificacion = DateTime.Now;
                        nuevaOrden.Folio = consecutivo;
                        nuevaOrden.UsuarioModificacion = usuario.UsuarioID;

                        ctx.Sam3_OrdenRecepcion.Add(nuevaOrden);
                        ctx.SaveChanges();

                        //generamos la relacion con el folio aviso de entrada
                        foreach (int i in foliosEntrada)
                        {
                            Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion nuevaRelacion = new Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion();
                            nuevaRelacion.Activo = true;
                            nuevaRelacion.FechaModificacion = DateTime.Now;
                            nuevaRelacion.FolioAvisoEntradaID = i;
                            nuevaRelacion.OrdenRecepcionID = nuevaOrden.OrdenRecepcionID;
                            nuevaRelacion.UsuarioModificacion = usuario.UsuarioID;

                            ctx.Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion.Add(nuevaRelacion);
                        }

                        //generamos las relaciones para cada uno de los itemcodes
                        foreach (int i in itemCodes)
                        {
                            Sam3_Rel_OrdenRecepcion_ItemCode nuevoOrdenItem = new Sam3_Rel_OrdenRecepcion_ItemCode();
                            nuevoOrdenItem.Activo = true;
                            nuevoOrdenItem.FechaModificacion = DateTime.Now;
                            nuevoOrdenItem.ItemCodeID = i;
                            nuevoOrdenItem.OrdenRecepcionID = nuevaOrden.OrdenRecepcionID;
                            nuevoOrdenItem.UsuarioModificacion = usuario.UsuarioID;
                            ctx.Sam3_Rel_OrdenRecepcion_ItemCode.Add(nuevoOrdenItem);
                        }

                        ctx.SaveChanges();

                        //si no hay errores al generar la orden de recepcion, procedemos a crear los numeros unicos
                        //string error = "";
                        //bool NumerosGenerados = (bool)NumeroUnicoBd.Instance.GenerarNumerosUnicosPorOrdenDeRecepcion(nuevaOrden.OrdenRecepcionID, usuario, out error);

                        #region Generar Numeros Unicos
                        Sam3_ProyectoConsecutivo consecutivos;
                        Sam3_ProyectoConfiguracion configuracion;
                        int folio = 0;
                        //generar numeros unicos por cada itemcode
                        List<Sam3_ItemCode> lstItems = (from it in ctx.Sam3_ItemCode
                                                        where it.Activo
                                                        && itemCodes.Contains(it.ItemCodeID)
                                                        select it).AsParallel().Distinct().ToList();

                        foreach (Sam3_ItemCode item in lstItems)
                        {
                            //traemos la confiduracion del proyecto registrado en el ItemCode
                            configuracion = ctx.Sam3_ProyectoConfiguracion.Where(x => x.ProyectoID == item.ProyectoID)
                               .AsParallel().FirstOrDefault();

                            consecutivos = ctx.Sam3_ProyectoConsecutivo.Where(x => x.ProyectoID == item.ProyectoID)
                               .AsParallel().FirstOrDefault();

                            folio = consecutivos.ConsecutivoNumerounico;

                            Sam3_FolioAvisoEntrada folioEntrada = (from i in ctx.Sam3_ItemCode
                                                                   join rfi in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on i.ItemCodeID equals rfi.ItemCodeID
                                                                   join fc in ctx.Sam3_FolioCuantificacion on rfi.FolioCuantificacionID equals fc.FolioCuantificacionID
                                                                   join fe in ctx.Sam3_FolioAvisoEntrada on fc.FolioAvisoEntradaID equals fe.FolioAvisoEntradaID
                                                                   join fa in ctx.Sam3_FolioAvisoLlegada on fe.FolioAvisoLlegadaID equals fa.FolioAvisoLlegadaID
                                                                   where i.ItemCodeID == item.ItemCodeID
                                                                   select fe).AsParallel().FirstOrDefault();

                            if (folioEntrada == null)
                            {
                                folioEntrada = (from i in ctx.Sam3_ItemCode
                                                join rbi in ctx.Sam3_Rel_Bulto_ItemCode on i.ItemCodeID equals rbi.ItemCodeID
                                                join b in ctx.Sam3_Bulto on rbi.BultoID equals b.BultoID
                                                join fc in ctx.Sam3_FolioCuantificacion on b.FolioCuantificacionID equals fc.FolioCuantificacionID
                                                join fe in ctx.Sam3_FolioAvisoEntrada on fc.FolioAvisoEntradaID equals fe.FolioAvisoEntradaID
                                                join fa in ctx.Sam3_FolioAvisoLlegada on fe.FolioAvisoLlegadaID equals fa.FolioAvisoLlegadaID
                                                where i.ItemCodeID == item.ItemCodeID
                                                select fe).AsParallel().FirstOrDefault();
                            }

                            //tipo de material
                            if (item.TipoMaterialID == 1) // tubo
                            {
                                folio = folio + 1;
                                Sam3_NumeroUnico nuevoNU = new Sam3_NumeroUnico();
                                nuevoNU.Activo = true;
                                nuevoNU.ColadaID = item.ColadaID > 0 ? item.ColadaID : 1;
                                nuevoNU.Diametro1 = item.Diametro1 != null ? item.Diametro1.Value : 0;
                                nuevoNU.Diametro2 = item.Diametro1 != null ? item.Diametro2.Value : 0;
                                nuevoNU.Estatus = "D"; //
                                nuevoNU.EsVirtual = false;
                                nuevoNU.FechaModificacion = DateTime.Now;
                                nuevoNU.ItemCodeID = item.ItemCodeID;
                                nuevoNU.UsuarioModificacion = usuario.UsuarioID;
                                nuevoNU.Prefijo = configuracion.PrefijoNumeroUnico;
                                nuevoNU.Consecutivo = folio;
                                nuevoNU.FabricanteID = 1; //se establece como default pues este dato no se proporciona en cuantificacion
                                nuevoNU.Factura = folioEntrada.Factura;
                                nuevoNU.OrdenDeCompra = folioEntrada.OrdenCompra;
                                nuevoNU.ProveedorID = folioEntrada.ProveedorID;
                                nuevoNU.ProyectoID = item.ProyectoID;
                                //----------------- por defaulto lo colocare en falso, ya en un ptoceso posterior podra modificarse
                                nuevoNU.TieneDano = false;
                                nuevoNU.MarcadoAsme = false;
                                nuevoNU.MarcadoGolpe = false;
                                nuevoNU.MarcadoPintura = false;
                                //--------------------------------------------------------------------------------------------------

                                ctx.Sam3_NumeroUnico.Add(nuevoNU);
                                ctx.SaveChanges(); // debemos guardar para obtener un nuevo id de numero unico

                                //Generamos el nuevo registro en inventario
                                Sam3_NumeroUnicoInventario inventario = new Sam3_NumeroUnicoInventario();
                                inventario.Activo = true;
                                inventario.CantidadDanada = 0; // en este punto no se conoce la cantidad dañada o si existe esta cantidad
                                inventario.CantidadRecibida = item.Cantidad.Value;
                                inventario.EsVirtual = false;
                                inventario.FechaModificacion = DateTime.Now;
                                inventario.InventarioFisico = item.Cantidad.Value;
                                inventario.InventarioBuenEstado = item.Cantidad.Value;
                                inventario.InventarioCongelado = 0; // en este punto no existen los congelados;
                                inventario.InventarioDisponibleCruce = item.Cantidad.Value;
                                inventario.InventarioTransferenciaCorte = 0; //en este punto no existe este dato
                                inventario.NumeroUnicoID = nuevoNU.NumeroUnicoID;
                                inventario.ProyectoID = nuevoNU.ProyectoID;
                                inventario.UsuarioModificacion = usuario.UsuarioID;

                                ctx.Sam3_NumeroUnicoInventario.Add(inventario);

                                //Generamos el registro en NumeroUnicoSegmento
                                Sam3_NumeroUnicoSegmento nuevoSegmento = new Sam3_NumeroUnicoSegmento();
                                nuevoSegmento.Activo = true;
                                nuevoSegmento.CantidadDanada = 0;
                                nuevoSegmento.FechaModificacion = DateTime.Now;
                                nuevoSegmento.InventarioFisico = item.Cantidad.Value;
                                nuevoSegmento.InventarioBuenEstado = item.Cantidad.Value;
                                nuevoSegmento.InventarioCongelado = 0;
                                nuevoSegmento.InventarioDisponibleCruce = item.Cantidad.Value;
                                nuevoSegmento.InventarioTransferenciaCorte = 0;
                                nuevoSegmento.NumeroUnicoID = nuevoNU.NumeroUnicoID;
                                nuevoSegmento.ProyectoID = nuevoNU.ProyectoID;
                                nuevoSegmento.Segmento = "A";
                                nuevoSegmento.UsuarioModificacion = usuario.UsuarioID;

                                ctx.Sam3_NumeroUnicoSegmento.Add(nuevoSegmento);

                                //Agregamos el registro de movimiento
                                Sam3_NumeroUnicoMovimiento movimiento = new Sam3_NumeroUnicoMovimiento();
                                movimiento.Activo = true;
                                movimiento.Cantidad = item.Cantidad.Value;
                                movimiento.Estatus = "A";
                                movimiento.FechaModificacion = DateTime.Now;
                                movimiento.FechaMovimiento = DateTime.Now;
                                movimiento.NumeroUnicoID = nuevoNU.NumeroUnicoID;
                                movimiento.ProyectoID = nuevoNU.ProyectoID;
                                movimiento.Referencia = "Recepcion";
                                movimiento.Segmento = "A";
                                movimiento.TipoMovimientoID = 1; //este debe ser recepcion
                                movimiento.UsuarioModificacion = usuario.UsuarioID;

                                consecutivos.ConsecutivoNumerounico = folio;
                                ctx.Sam3_NumeroUnicoMovimiento.Add(movimiento);

                                //Actualizar el ItemCode para indicar que ya tiene un numero unico
                                if (ctx.Sam3_Rel_FolioCuantificacion_ItemCode.Where(x => x.ItemCodeID == item.ItemCodeID).Any())
                                {
                                    List<Sam3_Rel_FolioCuantificacion_ItemCode> actualizarRelacion = ctx.Sam3_Rel_FolioCuantificacion_ItemCode
                                        .Where(x => x.ItemCodeID == item.ItemCodeID).AsParallel().Distinct().ToList();
                                    actualizarRelacion.ForEach(x => x.TieneNumerosUnicos = true);
                                    actualizarRelacion.ForEach(x => x.FechaModificacion = DateTime.Now);
                                    actualizarRelacion.ForEach(x => x.UsuarioModificacion = usuario.UsuarioID);
                                }

                                if (ctx.Sam3_Rel_Bulto_ItemCode.Where(x => x.ItemCodeID == item.ItemCodeID).Any())
                                {
                                    List<Sam3_Rel_Bulto_ItemCode> relacion = ctx.Sam3_Rel_Bulto_ItemCode
                                        .Where(x => x.ItemCodeID == item.ItemCodeID).AsParallel().Distinct().ToList();
                                    relacion.ForEach(x => x.TieneNumerosUnicos = true);
                                    relacion.ForEach(x => x.FechaModificacion = DateTime.Now);
                                    relacion.ForEach(x => x.UsuarioModificacion = usuario.UsuarioID);

                                }
                                ctx.SaveChanges();

                            }
                            else //accesorio
                            {
                                for (int i = 0; i < item.Cantidad; i++) // se genera un numero unico por cada pieza recibida de accesorios
                                {
                                    folio = folio + 1;
                                    Sam3_NumeroUnico nuevoNU = new Sam3_NumeroUnico();
                                    nuevoNU.Activo = true;
                                    nuevoNU.ColadaID = item.ColadaID != null && item.ColadaID > 0 ? item.ColadaID : 1;
                                    nuevoNU.Diametro1 = item.Diametro1 != null ? item.Diametro1.Value : 0;
                                    nuevoNU.Diametro2 = item.Diametro2 != null ? item.Diametro2.Value : 0;
                                    nuevoNU.Estatus = "D";
                                    nuevoNU.EsVirtual = false;
                                    nuevoNU.FechaModificacion = DateTime.Now;
                                    nuevoNU.ItemCodeID = item.ItemCodeID;
                                    nuevoNU.UsuarioModificacion = usuario.UsuarioID;
                                    nuevoNU.Prefijo = configuracion.PrefijoNumeroUnico;
                                    nuevoNU.Consecutivo = folio;
                                    nuevoNU.FabricanteID = 1; //se establece como default pues este dato no se proporciona en cuantificacion
                                    nuevoNU.Factura = folioEntrada.Factura;
                                    nuevoNU.OrdenDeCompra = folioEntrada.OrdenCompra;
                                    nuevoNU.ProveedorID = folioEntrada.ProveedorID;
                                    nuevoNU.ProyectoID = item.ProyectoID;
                                    //----------------- por defaulto lo colocare en falso, ya en un ptoceso posterior podra modificarse
                                    nuevoNU.TieneDano = false;
                                    nuevoNU.MarcadoAsme = false;
                                    nuevoNU.MarcadoGolpe = false;
                                    nuevoNU.MarcadoPintura = false;
                                    //--------------------------------------------------------------------------------------------------

                                    ctx.Sam3_NumeroUnico.Add(nuevoNU);
                                    ctx.SaveChanges(); // debemos guardar para obtener un nuevo id de numero unico

                                    //Generamos el nuevo registro en inventario
                                    Sam3_NumeroUnicoInventario inventario = new Sam3_NumeroUnicoInventario();
                                    inventario.Activo = true;
                                    inventario.CantidadDanada = 0; // en este punto no se conoce la cantidad dañada o si existe esta cantidad
                                    inventario.CantidadRecibida = 1;
                                    inventario.EsVirtual = false;
                                    inventario.FechaModificacion = DateTime.Now;
                                    inventario.InventarioFisico = item.Cantidad.Value;
                                    inventario.InventarioBuenEstado = item.Cantidad.Value;
                                    inventario.InventarioCongelado = 0; // en este punto no existen los congelados;
                                    inventario.InventarioDisponibleCruce = item.Cantidad.Value;
                                    inventario.InventarioTransferenciaCorte = 0; //en este punto no existe este dato
                                    inventario.NumeroUnicoID = nuevoNU.NumeroUnicoID;
                                    inventario.ProyectoID = nuevoNU.ProyectoID;
                                    inventario.UsuarioModificacion = usuario.UsuarioID;

                                    ctx.Sam3_NumeroUnicoInventario.Add(inventario);

                                    //Agregamos el registro de movimiento
                                    Sam3_NumeroUnicoMovimiento movimiento = new Sam3_NumeroUnicoMovimiento();
                                    movimiento.Activo = true;
                                    movimiento.Cantidad = 1;
                                    movimiento.Estatus = "A";
                                    movimiento.FechaModificacion = DateTime.Now;
                                    movimiento.FechaMovimiento = DateTime.Now;
                                    movimiento.NumeroUnicoID = nuevoNU.NumeroUnicoID;
                                    movimiento.ProyectoID = nuevoNU.ProyectoID;
                                    movimiento.Referencia = "Recepcion";
                                    movimiento.TipoMovimientoID = 1; //este debe ser recepcion
                                    movimiento.UsuarioModificacion = usuario.UsuarioID;

                                    ctx.Sam3_NumeroUnicoMovimiento.Add(movimiento);
                                    ctx.SaveChanges();
                                }// fin for
                                consecutivos.ConsecutivoNumerounico = folio;

                                //Actualizar el ItemCode para indicar que ya tiene un numero unico
                                if (ctx.Sam3_Rel_FolioCuantificacion_ItemCode.Where(x => x.ItemCodeID == item.ItemCodeID).Any())
                                {
                                    List<Sam3_Rel_FolioCuantificacion_ItemCode> actualizarRelacion = ctx.Sam3_Rel_FolioCuantificacion_ItemCode
                                        .Where(x => x.ItemCodeID == item.ItemCodeID).AsParallel().Distinct().ToList();
                                    actualizarRelacion.ForEach(x => x.TieneNumerosUnicos = true);
                                    actualizarRelacion.ForEach(x => x.FechaModificacion = DateTime.Now);
                                    actualizarRelacion.ForEach(x => x.UsuarioModificacion = usuario.UsuarioID);
                                }

                                if (ctx.Sam3_Rel_Bulto_ItemCode.Where(x => x.ItemCodeID == item.ItemCodeID).Any())
                                {
                                    List<Sam3_Rel_Bulto_ItemCode> relacion = ctx.Sam3_Rel_Bulto_ItemCode
                                        .Where(x => x.ItemCodeID == item.ItemCodeID).AsParallel().Distinct().ToList();
                                    relacion.ForEach(x => x.TieneNumerosUnicos = true);
                                    relacion.ForEach(x => x.FechaModificacion = DateTime.Now);
                                    relacion.ForEach(x => x.UsuarioModificacion = usuario.UsuarioID);
                                   
                                }
                                ctx.SaveChanges();
                            }// else
                        }// foreach
                        #endregion
                        if (!(bool)EnviarAvisosBd.Instance.EnviarNotificación(1,
                            string.Format("Se generó una nueva orden de recepcion con folio: {0}",
                            nuevaOrden.OrdenRecepcionID), usuario))
                        {
                            //Agregar error a la bitacora  PENDIENTE
                        }
                    }
                    scope.Complete();
                }

                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add("Ok");
                result.ReturnMessage.Add(nuevaOrden.Folio.ToString());
                result.ReturnCode = 200;
                result.ReturnStatus = true;
                result.IsAuthenicated = true;

                return result;
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

        public List<int> ObtenerItemCodesPorFolioEntrada(List<int> folios)
        {
            try
            {
                List<int> items = new List<int>();
                using (SamContext ctx = new SamContext())
                {
                    foreach (int i in folios)
                    {
                        items.AddRange(from r in ctx.Sam3_FolioAvisoEntrada
                                       join c in ctx.Sam3_FolioCuantificacion on r.FolioAvisoEntradaID equals c.FolioAvisoEntradaID
                                       join rit in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on c.FolioCuantificacionID equals rit.FolioCuantificacionID
                                       where r.Activo && c.Activo && rit.Activo
                                       && r.FolioAvisoLlegadaID == i
                                       select rit.ItemCodeID);

                        items.AddRange(from r in ctx.Sam3_FolioAvisoEntrada
                                       join c in ctx.Sam3_FolioCuantificacion on r.FolioAvisoEntradaID equals c.FolioAvisoEntradaID
                                       join b in ctx.Sam3_Bulto on c.FolioCuantificacionID equals b.FolioCuantificacionID
                                       join rbi in ctx.Sam3_Rel_Bulto_ItemCode on b.BultoID equals rbi.BultoID
                                       where r.Activo && c.Activo && rbi.Activo
                                       && r.FolioAvisoLlegadaID == i
                                       select rbi.ItemCodeID);
                    }
                }

                return items;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public object GenerarOrdeRecepcion(FoliosItems listados, Sam3_Usuario usuario)
        {
            try
            {
                List<int> ids = listados.Items.Select(x => x.ID).ToList();
                if (listados.Folios.Count > 0)
                {
                    ids.AddRange(ObtenerItemCodesPorFolioEntrada(listados.Folios.Select(x => x.ID).ToList()));
                }

                //retiremos los ids repetidos en caso de existan
                ids = ids.GroupBy(x => x).Select(x => x.First()).ToList();

                return GenerarOrdeRecepcion(ids, usuario);
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


        public object EliminarOrdenRecepcion(int OrdenRecepcionID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_OrdenRecepcion orden = ctx.Sam3_OrdenRecepcion.Where(x => x.OrdenRecepcionID == OrdenRecepcionID).AsParallel().SingleOrDefault();
                    orden.Activo = false;
                    orden.FechaModificacion = DateTime.Now;
                    orden.UsuarioModificacion = usuario.UsuarioID;

                    List<Sam3_Rel_OrdenRecepcion_ItemCode> relacion = ctx.Sam3_Rel_OrdenRecepcion_ItemCode.Where(x => x.OrdenRecepcionID == OrdenRecepcionID)
                        .AsParallel().ToList();

                    foreach (Sam3_Rel_OrdenRecepcion_ItemCode r in relacion)
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



        public object EliminarItemCodeOrdenRecepcion(string itemcode, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    int itemcodeid = Convert.ToInt32(itemcode);

                    Sam3_Rel_OrdenRecepcion_ItemCode RelOrdenRecepcion = ctx.Sam3_Rel_OrdenRecepcion_ItemCode.Where(x => x.ItemCodeID == itemcodeid)
                        .AsParallel().SingleOrDefault();


                    RelOrdenRecepcion.Activo = false;
                    RelOrdenRecepcion.UsuarioModificacion = usuario.UsuarioID;
                    RelOrdenRecepcion.FechaModificacion = DateTime.Now;

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