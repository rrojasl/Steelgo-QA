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

        public object ObtenerListadoGenerarOrdenRecepcion(FiltrosJson filtros, Sam3_Usuario usuario)
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
                                          where i.TipoMaterialID == 1 && r.FolioAvisoLlegadaID == f.FolioAvisoLlegadaID
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
                                              Descripción = i.DescripcionEspanol,
                                              TipoMaterial = t.Nombre,
                                              FolioAvisoLlegadaId = r.FolioAvisoLlegadaID.ToString()
                                          }).AsParallel().ToList();

                        elemento.Accesorios = (from r in ctx.Sam3_FolioAvisoEntrada
                                               join c in ctx.Sam3_FolioCuantificacion on r.FolioAvisoEntradaID equals c.FolioAvisoEntradaID
                                               join rfp in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on r.FolioAvisoLlegadaID equals rfp.FolioAvisoLlegadaID
                                               join rfi in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on c.FolioCuantificacionID equals rfi.FolioCuantificacionID
                                               join i in ctx.Sam3_ItemCode on rfi.ItemCodeID equals i.ItemCodeID
                                               join t in ctx.Sam3_TipoMaterial on i.TipoMaterialID equals t.TipoMaterialID
                                               where i.TipoMaterialID == 2 && r.FolioAvisoLlegadaID == f.FolioAvisoLlegadaID
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
                                                   Descripción = i.DescripcionEspanol,
                                                   TipoMaterial = t.Nombre,
                                                   FolioAvisoLlegadaId = r.FolioAvisoLlegadaID.ToString()
                                               }).AsParallel().ToList();

                        if (itemCodeID > 0)
                        {
                            elemento.Tubos = elemento.Tubos.Where(x => x.ItemCodeID == itemCodeID.ToString()).ToList();
                            elemento.Accesorios = elemento.Accesorios.Where(x => x.ItemCodeID == itemCodeID.ToString()).ToList();
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

        public object ObtenerListadoOrdenRecepcion(FiltrosJson filtros, Sam3_Usuario usuario)
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
                    int folioAvisoEntradaID = filtros.FolioAvisoEntradaID != "" ? Convert.ToInt32(filtros.FolioAvisoEntradaID) : 0;
                    int proyectoID = filtros.ProyectoID != "" ? Convert.ToInt32(filtros.ProyectoID) : 0;

                    //Patios y proyectos del usuario
                    List<int> proyectos = ctx.Sam3_Rel_Usuario_Proyecto.Where(x => x.UsuarioID == usuario.UsuarioID).Select(x => x.ProyectoID).AsParallel().ToList();

                    List<int> patios = (from r in ctx.Sam3_Proyecto
                                        join p in ctx.Sam3_Patio on r.PatioID equals p.PatioID
                                        where r.Activo && proyectos.Contains(r.ProyectoID)
                                        select p.PatioID).AsParallel().ToList();
                    //-----------------------------------------------------------------------------------

                    List<Sam3_FolioAvisoEntrada> folios = (from r in ctx.Sam3_FolioAvisoEntrada
                                                           join rel in ctx.Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion on r.FolioAvisoEntradaID equals rel.FolioAvisoEntradaID
                                                           join o in ctx.Sam3_OrdenRecepcion on rel.OrdenRecepcionID equals o.OrdenRecepcionID
                                                           where r.Activo && rel.Activo
                                                           && (o.FechaCreacion >= fechaInicial && o.FechaCreacion <= fechaFinal)
                                                           select r).AsParallel().ToList();
                    if (proyectoID > 0)
                    {
                        folios = (from r in folios
                                  join rel in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on r.FolioAvisoLlegadaID equals rel.FolioAvisoLlegadaID
                                  where rel.ProyectoID == proyectoID
                                  select r).AsParallel().ToList();
                    }

                    if (clienteID > 0)
                    {
                        folios = folios.Where(x => x.ClienteID == clienteID).ToList();
                    }

                    if (folioAvisoEntradaID > 0)
                    {
                        folios = folios.Where(x => x.FolioAvisoEntradaID == folioAvisoEntradaID).ToList();
                    }

                    folios = folios.GroupBy(x => x.FolioAvisoLlegadaID).Select(x => x.First()).ToList();

                    List<ListadoOrdeRecepcion> listado = new List<ListadoOrdeRecepcion>();
                    foreach (Sam3_FolioAvisoEntrada f in folios)
                    {
                        ListadoOrdeRecepcion elemento;
                        List<Sam3_OrdenRecepcion> ordenes = (from r in f.Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion
                                                             join o in ctx.Sam3_OrdenRecepcion on r.OrdenRecepcionID equals o.OrdenRecepcionID
                                                             select o).AsParallel().ToList();

                        ordenes = ordenes.GroupBy(x => x.OrdenRecepcionID).Select(x => x.First()).ToList();

                        foreach (Sam3_OrdenRecepcion o in ordenes)
                        {
                            elemento = new ListadoOrdeRecepcion();
                            elemento.FechaOrdenRecepcion = o.FechaCreacion.ToString("dd/MM/yyyy");
                            elemento.OrdenRecepcion = o.Folio.ToString();

                            List<ElementoItemCode> items = (from or in ctx.Sam3_Rel_OrdenRecepcion_ItemCode
                                                            join i in ctx.Sam3_ItemCode on or.ItemCodeID equals i.ItemCodeID
                                                            where or.OrdenRecepcionID == o.OrdenRecepcionID
                                                            select new ElementoItemCode
                                                            {
                                                                Cantidad = i.Cantidad.Value,
                                                                Itemcode = i.Codigo,
                                                                AvisoEntrada = f.FolioAvisoLlegadaID.ToString()
                                                            }).AsParallel().ToList();

                            elemento.Detalle = items;

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

        public object ObtenerDetalleOrdeRecepcion(int ordenRecepcionID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<ListadoGenerarOrdenRecepcion> listado = new List<ListadoGenerarOrdenRecepcion>();

                    List<Sam3_FolioAvisoEntrada> registros = (from o in ctx.Sam3_OrdenRecepcion
                                                              join rfo in ctx.Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion on o.OrdenRecepcionID equals rfo.OrdenRecepcionID
                                                              join fe in ctx.Sam3_FolioAvisoEntrada on rfo.FolioAvisoEntradaID equals fe.FolioAvisoEntradaID
                                                              where o.OrdenRecepcionID == ordenRecepcionID
                                                              select fe).AsParallel().ToList();

                    foreach (Sam3_FolioAvisoEntrada folio in registros)
                    {
                        ListadoGenerarOrdenRecepcion elemento = new ListadoGenerarOrdenRecepcion();
                        elemento.AvisoEntradaID = folio.FolioAvisoLlegadaID.ToString();

                        elemento.Tubos = (from o in ctx.Sam3_OrdenRecepcion
                                          join rfo in ctx.Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion on o.OrdenRecepcionID equals rfo.OrdenRecepcionID
                                          join rfi in ctx.Sam3_Rel_OrdenRecepcion_ItemCode on rfo.OrdenRecepcionID equals rfi.OrdenRecepcionID
                                          join it in ctx.Sam3_ItemCode on rfi.ItemCodeID equals it.ItemCodeID
                                          join t in ctx.Sam3_TipoMaterial on it.TipoMaterialID equals t.TipoMaterialID
                                          where o.OrdenRecepcionID == ordenRecepcionID
                                          && it.TipoMaterialID == 1
                                          && rfo.FolioAvisoEntradaID == folio.FolioAvisoEntradaID
                                          select new ElementoItemCodeGenerarOrden
                                          {
                                              ItemCodeID = it.ItemCodeID.ToString(),
                                              Cantidad = it.Cantidad.ToString(),
                                              Codigo = it.Codigo,
                                              D1 = it.Diametro1.ToString(),
                                              D2 = it.Diametro2.ToString(),
                                              Descripción = it.DescripcionEspanol,
                                              TipoMaterial = t.Nombre
                                          }).AsParallel().ToList();

                        elemento.Accesorios = (from o in ctx.Sam3_OrdenRecepcion
                                               join rfo in ctx.Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion on o.OrdenRecepcionID equals rfo.OrdenRecepcionID
                                               join rfi in ctx.Sam3_Rel_OrdenRecepcion_ItemCode on rfo.OrdenRecepcionID equals rfi.OrdenRecepcionID
                                               join it in ctx.Sam3_ItemCode on rfi.ItemCodeID equals it.ItemCodeID
                                               join t in ctx.Sam3_TipoMaterial on it.TipoMaterialID equals t.TipoMaterialID
                                               where o.OrdenRecepcionID == ordenRecepcionID
                                               && it.TipoMaterialID == 2
                                               && rfo.FolioAvisoEntradaID == folio.FolioAvisoEntradaID
                                               select new ElementoItemCodeGenerarOrden
                                               {
                                                   ItemCodeID = it.ItemCodeID.ToString(),
                                                   Cantidad = it.Cantidad.ToString(),
                                                   Codigo = it.Codigo,
                                                   D1 = it.Diametro1.ToString(),
                                                   D2 = it.Diametro2.ToString(),
                                                   Descripción = it.DescripcionEspanol,
                                                   TipoMaterial = t.Nombre
                                               }).AsParallel().ToList();

                        listado.Add(elemento);
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
                                         where itemCodes.Contains(i.ItemCodeID)
                                         select fe.FolioAvisoEntradaID).AsParallel().ToList();

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
                    }
                    scope.Complete();
                }

                TransactionalInformation result = new TransactionalInformation();
                //si no hay errores al generar la orden de recepcion, procedemos a crear los numeros unicos
                string error = "";
                bool NumerosGenerados = (bool)NumeroUnicoBd.Instance.GenerarNumerosUnicosPorOrdenDeRecepcion(nuevaOrden.OrdenRecepcionID, usuario, out error);
                if (NumerosGenerados)
                {
                    if (!(bool)EnviarAvisosBd.Instance.EnviarNotificación(1,
                        string.Format("Se generó una nueva orden de recepcion con folio: {0}",
                        nuevaOrden.OrdenRecepcionID), usuario))
                    {
                        //Agregar error a la bitacora  PENDIENTE
                    }

                    result.ReturnMessage.Add("Ok");
                    result.ReturnMessage.Add(nuevaOrden.OrdenRecepcionID.ToString());
                    result.ReturnCode = 200;
                    result.ReturnStatus = true;
                    result.IsAuthenicated = true;

                    return result;
                }
                else
                {
                    result.ReturnMessage.Add(error);
                    result.ReturnCode = 500;
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

        //public object GenerarOrdeRecepcion(List<int> foliosEntrada, Sam3_Usuario usuario)
        //{
        //    try
        //    {
        //        using (SamContext ctx = new SamContext())
        //        {
        //            List<int> itemCodes = new List<int>();

        //            foreach (int i in foliosEntrada)
        //            {
        //                itemCodes.AddRange(from r in ctx.Sam3_FolioAvisoEntrada
        //                                   join c in ctx.Sam3_FolioCuantificacion on r.FolioAvisoEntradaID equals c.FolioAvisoEntradaID
        //                                   join rit in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on c.FolioCuantificacionID equals rit.FolioCuantificacionID
        //                                   where r.Activo && c.Activo && rit.Activo
        //                                   && r.FolioAvisoLlegadaID == i
        //                                   select rit.ItemCodeID);
        //            }

        //            return GenerarOrdeRecepcion(itemCodes, usuario);
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
    }
}