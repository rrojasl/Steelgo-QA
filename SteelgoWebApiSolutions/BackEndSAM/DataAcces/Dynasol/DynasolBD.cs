using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static BackEndSAM.Models.Dynasol.Dynasol;

namespace BackEndSAM.DataAcces.Dynasol
{
    public class DynasolBD
    {
        private static readonly object _mutex = new object();
        private static DynasolBD _instance;

        public static DynasolBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new DynasolBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerOrdenesCompra()
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Dynasol_GET_OrdenesCompras_Result> result = ctx.Sam3_Dynasol_GET_OrdenesCompras().ToList();
                    List<OrdenCompraClass> ListaOrdenes = new List<OrdenCompraClass>();
                    ListaOrdenes.Add(new OrdenCompraClass());
                    foreach (Sam3_Dynasol_GET_OrdenesCompras_Result item in result)
                    {
                        ListaOrdenes.Add(new OrdenCompraClass
                        {
                            OrdenCompraID = item.OrdenCompraID,
                            Nombre = item.Nombre
                        });
                    }
                    return ListaOrdenes;
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

        public object ObtenerListaInspeccion()
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Dynasol_GET_ListaInspeccion_Result> result = ctx.Sam3_Dynasol_GET_ListaInspeccion().ToList();
                    List<InspeccionClass> listaInspeccion = new List<InspeccionClass>();
                    listaInspeccion.Add(new InspeccionClass());
                    foreach (Sam3_Dynasol_GET_ListaInspeccion_Result item in result)
                    {
                        listaInspeccion.Add(new InspeccionClass
                        {
                            InspeccionID = item.InspeccionID,
                            Nombre = item.Nombre
                        });
                    }
                    return listaInspeccion;
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

        public object ObtenerRevision(int OrdenCompra)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Dynasol_GET_Revision_Result> result = ctx.Sam3_Dynasol_GET_Revision(OrdenCompra).ToList();
                    List<InspeccionClass> listaInspeccion = (List<InspeccionClass>)ObtenerListaInspeccion();
                    List<RevisionClass> listaRevision = new List<RevisionClass>();
                    foreach (Sam3_Dynasol_GET_Revision_Result item in result)
                    {
                        listaRevision.Add(new RevisionClass
                        {
                            RevisionID = item.RevisionID,
                            OrdenCompraID = item.OrdenCompraID.GetValueOrDefault(),
                            Rev = item.Revision,
                            Descripcion = item.Descripcion,
                            MaterialNorma = item.MaterialNorma,
                            Diametro1 = (float)item.Diametro1.GetValueOrDefault(),
                            Diametro2 = (float)item.Diametro2.GetValueOrDefault(),
                            Schedule = item.Shedule,
                            Rating = item.Rating,
                            PreparacionExtremos = item.PrepExt,
                            Cant = item.Cantidad.GetValueOrDefault(),
                            PrecioUnidad = item.PrecioUnidad.GetValueOrDefault(),
                            Total = item.Total.GetValueOrDefault(),
                            Partida = item.Partida,
                            ListaDetalleColadas = ObtenerColadas(item.RevisionID),
                            ListaInspeccion = listaInspeccion
                        });
                    }
                    return listaRevision;
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

        public List<ColadaClass> ObtenerColadas(int RevisionID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<ColadaClass> ListaColadas = new List<ColadaClass>();
                    
                    List<Sam3_Dynasol_GET_Coladas_Result> result = ctx.Sam3_Dynasol_GET_Coladas(RevisionID).ToList();
                    foreach (Sam3_Dynasol_GET_Coladas_Result item in result)
                    {
                        ListaColadas.Add(new ColadaClass
                        {
                            ColadaID = item.ColadaID,
                            Colada = item.Nombre,
                            RevisionID = item.RevisionID.GetValueOrDefault(),
                            DetalleInspeccionID = item.DetalleInspeccionID.GetValueOrDefault(),
                            InspeccionDetalle = item.NombreInspeccion,
                            Comentario = item.Comentario,
                            Cant = item.CantidadC.GetValueOrDefault(),
                            CantG = item.CantidadG.GetValueOrDefault(),
                            FechaRecibido = item.FechaRecibido.GetValueOrDefault(),
                            Camion = item.Camion.GetValueOrDefault(),
                            FacturaProveedor = item.FacturaProveedor,
                            FechaFactura = item.FechaFactura.GetValueOrDefault(),
                            Acuerdo = item.Acuerdo,
                            FechaEnvio = item.FechaEnvio.GetValueOrDefault(),
                            Pedimento = item.Pedimento.GetValueOrDefault(),
                            ShippingDate = item.ShippingDate.GetValueOrDefault(),
                            CantS = item.CantidadS.GetValueOrDefault(),
                            FechaRecibidoSteelgo = item.FechaRecibidoSteelgo.GetValueOrDefault(),
                            InspeccionSteelgo = item.InspeccionSteelgo.GetValueOrDefault(),
                            ListaDetalleInspeccion = ObtenerDetalleInspeccion(item.ColadaID),
                            

                        });
                    }
                    return ListaColadas;
                }
            }
            catch (Exception ex)
            {
                List<ColadaClass> result = null;
                return result;
            }
        }

        public List<DetalleInspeccionClass> ObtenerDetalleInspeccion(int ColadaID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<DetalleInspeccionClass> ListaDetalles = new List<DetalleInspeccionClass>();
                    
                    List<Sam3_Dynasol_GET_DetalleInspecccion_Result> result = ctx.Sam3_Dynasol_GET_DetalleInspecccion(ColadaID).ToList();

                    foreach (Sam3_Dynasol_GET_DetalleInspecccion_Result item in result)
                    {
                        ListaDetalles.Add(new DetalleInspeccionClass
                        {
                            DetalleInspeccionID = item.DetalleInspeccionID,
                            ColadaID = item.ColadaID,
                            Inspeccion = item.Nombre,
                            InspeccionID = item.InspeccionID,
                            Comentario = item.Comentario,
                            
                        });
                    }
                    return ListaDetalles;
                }
            }
            catch (Exception)
            {
                List<DetalleInspeccionClass> result = null;
                return result;
            }
        }
    }
}
