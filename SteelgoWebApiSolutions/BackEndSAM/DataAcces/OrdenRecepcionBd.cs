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
                                        select p.PatioID).AsParallel().ToList();

                    List<Sam3_FolioAvisoEntrada> registros = (from r in ctx.Sam3_FolioAvisoEntrada
                                                              join fa in ctx.Sam3_FolioAvisoLlegada on r.FolioAvisoLlegadaID equals fa.FolioAvisoLlegadaID
                                                              join p in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on fa.FolioAvisoLlegadaID equals p.FolioAvisoLlegadaID
                                                              join pr in ctx.Sam3_Proyecto on p.ProyectoID equals pr.ProyectoID
                                                              join f in ctx.Sam3_FolioCuantificacion on r.FolioAvisoEntradaID equals f.FolioAvisoEntradaID
                                                              where r.Activo && fa.Activo && p.Activo && pr.Activo && f.Activo
                                                              && proyectos.Contains(pr.ProyectoID)
                                                              && patios.Contains(pr.PatioID)
                                                              select r).AsParallel().ToList();

                    if (proyectoID > 0)
                    {
                        registros = (from r in registros
                                     join f in ctx.Sam3_FolioAvisoLlegada on r.FolioAvisoLlegadaID equals f.FolioAvisoLlegadaID
                                     join re in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on f.FolioAvisoLlegadaID equals re.FolioAvisoLlegadaID
                                     where re.ProyectoID == proyectoID
                                     select r).AsParallel().ToList();
                    }

                    if (folioAvisoLlegadaID > 0)
                    {
                        registros = registros.Where(x => x.FolioAvisoLlegadaID == folioAvisoLlegadaID).AsParallel().ToList();
                    }

                    if (itemCodeID > 0)
                    {
                        registros = (from r in ctx.Sam3_FolioAvisoEntrada
                                     join f in ctx.Sam3_FolioCuantificacion on r.FolioAvisoEntradaID equals f.FolioAvisoEntradaID
                                     join rfi in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on f.FolioCuantificacionID equals rfi.FolioCuantificacionID
                                     where rfi.ItemCodeID == itemCodeID
                                     select r).AsParallel().ToList();
                    }

                    List<ListadoGenerarOrdenRecepcion> listado = new List<ListadoGenerarOrdenRecepcion>();

                    foreach (Sam3_FolioAvisoEntrada f in registros)
                    {
                        ListadoGenerarOrdenRecepcion elemento = new ListadoGenerarOrdenRecepcion();
                        elemento.AvisoEntradaID = f.FolioAvisoLlegadaID.ToString();
                        elemento.Tubos = (from r in ctx.Sam3_FolioAvisoEntrada
                                          join c in ctx.Sam3_FolioCuantificacion on r.FolioAvisoEntradaID equals c.FolioAvisoEntradaID
                                          join rfi in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on c.FolioCuantificacionID equals rfi.FolioCuantificacionID
                                          join i in ctx.Sam3_ItemCode on rfi.ItemCodeID equals i.ItemCodeID
                                          join t in ctx.Sam3_TipoMaterial on i.TipoMaterialID equals t.TipoMaterialID
                                          where i.TipoMaterialID == 1 && r.FolioAvisoLlegadaID == f.FolioAvisoLlegadaID
                                          select new ElementoItemCodeGenerarOrden
                                          {
                                              ItemCodeID = i.ItemCodeID.ToString(),
                                              Cantidad = i.Cantidad.ToString(),
                                              Codigo = i.Codigo,
                                              D1 = i.Diametro1.ToString(),
                                              D2 = i.Diametro2.ToString(),
                                              Descripción = i.DescripcionEspanol,
                                              TipoMaterial = t.Nombre
                                          }).AsParallel().ToList();

                        elemento.Accesorios = (from r in ctx.Sam3_FolioAvisoEntrada
                                               join c in ctx.Sam3_FolioCuantificacion on r.FolioAvisoEntradaID equals c.FolioAvisoEntradaID
                                               join rfi in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on c.FolioCuantificacionID equals rfi.FolioCuantificacionID
                                               join i in ctx.Sam3_ItemCode on rfi.ItemCodeID equals i.ItemCodeID
                                               join t in ctx.Sam3_TipoMaterial on i.TipoMaterialID equals t.TipoMaterialID
                                               where i.TipoMaterialID == 2 && r.FolioAvisoLlegadaID == f.FolioAvisoLlegadaID
                                               select new ElementoItemCodeGenerarOrden
                                               {
                                                   ItemCodeID = i.ItemCodeID.ToString(),
                                                   Cantidad = i.Cantidad.ToString(),
                                                   Codigo = i.Codigo,
                                                   D1 = i.Diametro1.ToString(),
                                                   D2 = i.Diametro2.ToString(),
                                                   Descripción = i.DescripcionEspanol,
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

                    List<ListadoOrdeRecepcion> listado = new List<ListadoOrdeRecepcion>();
                    foreach (Sam3_FolioAvisoEntrada f in folios)
                    {
                        ListadoOrdeRecepcion elemento = new ListadoOrdeRecepcion();
                        List<Sam3_OrdenRecepcion> ordenes = (from r in f.Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion
                                                             join o in ctx.Sam3_OrdenRecepcion on r.OrdenRecepcionID equals o.OrdenRecepcionID
                                                             select o).AsParallel().ToList();

                        foreach (Sam3_OrdenRecepcion o in ordenes)
                        {
                            elemento.FechaOrdenRecepcion = o.FechaCreacion.ToString("dd/MM/yyyy");
                            elemento.OrdenRecepcion = o.Folio.ToString();

                            List<ElementoItemCode> items = (from or in ctx.Sam3_Rel_OrdenRecepcion_ItemCode
                                                            join i in ctx.Sam3_ItemCode on or.ItemCodeID equals i.ItemCodeID
                                                            where or.OrdenRecepcionID == o.OrdenRecepcionID
                                                            select new ElementoItemCode
                                                            {
                                                                Cantidad = i.Cantidad.Value,
                                                                Itemcode = i.Codigo
                                                            }).AsParallel().ToList();

                            elemento.Detalle.Add(new DetalleOrdenRecepcion { AvisoEntrada = f.FolioAvisoLlegadaID.ToString(), ItemCodes = items });

                            listado.Add(elemento);
                        }
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
                                          join fc in ctx.Sam3_FolioCuantificacion on rfo.FolioAvisoEntradaID equals fc.FolioAvisoEntradaID
                                          join rfi in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on fc.FolioCuantificacionID equals rfi.FolioCuantificacionID
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
                                               join fc in ctx.Sam3_FolioCuantificacion on rfo.FolioAvisoEntradaID equals fc.FolioAvisoEntradaID
                                               join rfi in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on fc.FolioCuantificacionID equals rfi.FolioCuantificacionID
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

                        listado.Add(elemento);
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

        public object GenerarOrdeRecepcion(List<int> itemCodes, List<int> foliosEntrada, Sam3_Usuario usuario)
        {
            try
            {
                Sam3_OrdenRecepcion nuevaOrden = new Sam3_OrdenRecepcion();
                Sam3_ProyectoConsecutivo consecutivo;

                using (TransactionScope scope = new TransactionScope())
                {
                    using (SamContext ctx = new SamContext())
                    {
                        if (foliosEntrada == null)
                        {
                            foliosEntrada = (from i in ctx.Sam3_ItemCode
                                             join fci in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on i.ItemCodeID equals fci.ItemCodeID
                                             join fc in ctx.Sam3_FolioCuantificacion on fci.FolioCuantificacionID equals fc.FolioCuantificacionID
                                             join fe in ctx.Sam3_FolioAvisoEntrada on fc.FolioAvisoEntradaID equals fe.FolioAvisoEntradaID
                                             select fe.FolioAvisoEntradaID).AsParallel().ToList();
                        }

                        consecutivo = (from r in ctx.Sam3_FolioCuantificacion
                                       join f in ctx.Sam3_FolioAvisoEntrada on r.FolioAvisoEntradaID equals f.FolioAvisoEntradaID
                                       join pc in ctx.Sam3_ProyectoConsecutivo on r.ProyectoID equals pc.ProyectoID
                                       where r.Activo && f.Activo && pc.Activo
                                       && foliosEntrada.Contains(f.FolioAvisoLlegadaID.Value)
                                       select pc).AsParallel().SingleOrDefault();


                        int folio = consecutivo.ConsecutivoOrdeRecepcion + 1;
                        //Generamos un nuevo registro en orden de recepcion
                        nuevaOrden.Activo = true;
                        nuevaOrden.FechaCreacion = DateTime.Now;
                        nuevaOrden.FechaModificacion = DateTime.Now;
                        nuevaOrden.Folio = folio;
                        nuevaOrden.UsuarioModificacion = usuario.UsuarioID;

                        ctx.Sam3_OrdenRecepcion.Add(nuevaOrden);
                        ctx.SaveChanges();

                        //Actualizamos el consecutivo de las ordenes de recepcion
                        consecutivo.ConsecutivoOrdeRecepcion = consecutivo.ConsecutivoOrdeRecepcion + 1;

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
                bool NumerosGenerados = (bool)NumeroUnicoBd.Instance.GenerarNumerosUnicosPorOrdenDeRecepcion(nuevaOrden.OrdenRecepcionID,
                    consecutivo, usuario, out error);
                if (NumerosGenerados)
                {
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

        public object GenerarOrdeRecepcion(List<int> foliosEntrada, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<int> itemCodes = new List<int>();

                    foreach (int i in foliosEntrada)
                    {
                        itemCodes.AddRange(from r in ctx.Sam3_FolioAvisoEntrada
                                           join c in ctx.Sam3_FolioCuantificacion on r.FolioAvisoEntradaID equals c.FolioAvisoEntradaID
                                           join rit in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on c.FolioCuantificacionID equals rit.FolioCuantificacionID
                                           where r.Activo && c.Activo && rit.Activo
                                           && r.FolioAvisoLlegadaID == i
                                           select rit.ItemCodeID);
                    }

                    return GenerarOrdeRecepcion(itemCodes, foliosEntrada, usuario);
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

        public object GenerarOrdeRecepcion(List<int> foliosEntrada, int tipoMaterialID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<int> itemCodes = new List<int>();

                    foreach (int i in foliosEntrada)
                    {
                        itemCodes.AddRange(from r in ctx.Sam3_FolioAvisoEntrada
                                           join c in ctx.Sam3_FolioCuantificacion on r.FolioAvisoEntradaID equals c.FolioAvisoEntradaID
                                           join rit in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on c.FolioCuantificacionID equals rit.FolioCuantificacionID
                                           join it in ctx.Sam3_ItemCode on rit.ItemCodeID equals it.ItemCodeID
                                           where r.Activo && c.Activo && rit.Activo
                                           && r.FolioAvisoLlegadaID == i
                                           && it.TipoMaterialID == tipoMaterialID
                                           select rit.ItemCodeID);
                    }

                    return GenerarOrdeRecepcion(itemCodes, foliosEntrada, usuario);
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