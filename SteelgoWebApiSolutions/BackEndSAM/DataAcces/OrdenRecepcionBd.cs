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
                using( SamContext ctx = new SamContext())
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

                        foreach ( Sam3_OrdenRecepcion o in ordenes)
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

        public object GenerarOrdeRecepcion(List<int> itemCodes, int folioEntradaID, Sam3_Usuario usuario)
        {
            try
            {
                Sam3_OrdenRecepcion nuevaOrden = new Sam3_OrdenRecepcion();
                Sam3_ProyectoConsecutivo consecutivo;

                using (TransactionScope scope = new TransactionScope())
                {
                    using (SamContext ctx = new SamContext())
                    {
                        consecutivo = (from r in ctx.Sam3_FolioCuantificacion
                                       join f in ctx.Sam3_FolioAvisoEntrada on r.FolioAvisoEntradaID equals f.FolioAvisoEntradaID
                                       join pc in ctx.Sam3_ProyectoConsecutivo on r.ProyectoID equals pc.ProyectoID
                                       where r.Activo && f.Activo && pc.Activo
                                       && r.FolioAvisoEntradaID == folioEntradaID
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
                        Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion nuevaRelacion = new Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion();
                        nuevaRelacion.Activo = true;
                        nuevaRelacion.FechaModificacion = DateTime.Now;
                        nuevaRelacion.FolioAvisoEntradaID = folioEntradaID;
                        nuevaRelacion.OrdenRecepcionID = nuevaOrden.OrdenRecepcionID;
                        nuevaRelacion.UsuarioModificacion = usuario.UsuarioID;

                        ctx.Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion.Add(nuevaRelacion);

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

        public object GenerarOrdeRecepcion(int folioEntradaID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<int> itemCodes = (from r in ctx.Sam3_FolioAvisoEntrada
                                           join c in ctx.Sam3_FolioCuantificacion on r.FolioAvisoEntradaID equals c.FolioAvisoEntradaID
                                           join rit in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on c.FolioCuantificacionID equals rit.FolioCuantificacionID
                                           where r.Activo && c.Activo && rit.Activo
                                           && r.FolioAvisoEntradaID == folioEntradaID
                                           select rit.ItemCodeID).AsParallel().ToList();

                    return GenerarOrdeRecepcion(itemCodes, folioEntradaID, usuario);
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