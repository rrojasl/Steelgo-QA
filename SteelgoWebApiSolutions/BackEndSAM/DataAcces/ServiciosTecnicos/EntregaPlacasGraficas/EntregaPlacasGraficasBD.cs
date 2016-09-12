using BackEndSAM.Models.ServiciosTecnicos.EntregaPlacasGraficas;
using DatabaseManager.Constantes;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Core.Objects;
using System.Linq;

namespace BackEndSAM.DataAcces.ServiciosTecnicos.EntregaPlacasGraficas
{
    public class EntregaPlacasGraficasBD
    {
        private static readonly object _mutex = new Object();
        private static EntregaPlacasGraficasBD _instance;

        //Constructor
        public static EntregaPlacasGraficasBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance==null)
                    {
                        _instance = new EntregaPlacasGraficasBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerListadoDocumentoRecibido(string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ST_EPG_ObtieneCatalogoRecibido_Result> result = ctx.Sam3_ST_EPG_ObtieneCatalogoRecibido(lenguaje).ToList();
                    List<DocumentoRecibido> lista = new List<DocumentoRecibido>();
                    DocumentoRecibido vacio = new DocumentoRecibido();
                    lista.Add(vacio);

                    foreach (Sam3_ST_EPG_ObtieneCatalogoRecibido_Result item in result)
                    {
                        lista.Add(new DocumentoRecibido
                        {
                            DocumentoRecibidoID = item.DocumentoRecibidoID,
                            DocumentoRecibidoNombre = item.DocumentoRecibidoNombre
                        });
                    }

                    return lista;
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

        public object ObtenerListadoDocumentoEstatus(string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ST_EPG_ObtieneEstatusDocumento_Result> result = ctx.Sam3_ST_EPG_ObtieneEstatusDocumento(lenguaje).ToList();
                    List<DocumentoEstatus> lista = new List<DocumentoEstatus>();
                    DocumentoEstatus vacio = new DocumentoEstatus();
                    lista.Add(vacio);

                    foreach (Sam3_ST_EPG_ObtieneEstatusDocumento_Result item in result)
                    {
                        lista.Add(new DocumentoEstatus
                        {
                            DocumentoEstatusID = item.DocumentoEstatusID,
                            DocumentoEstatusNombre = item.DocumentoEstatusNombre
                        });
                    }

                    return lista;
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

        public object ObtenerListadoDocumentoDefecto(string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ST_EPG_ObtieneDefectosDocumentos_Result> result = ctx.Sam3_ST_EPG_ObtieneDefectosDocumentos(lenguaje).ToList();
                    List<DocumentoDefecto> lista = new List<DocumentoDefecto>();
                    DocumentoDefecto vacio = new DocumentoDefecto();
                    lista.Add(vacio);

                    foreach (Sam3_ST_EPG_ObtieneDefectosDocumentos_Result item in result)
                    {
                        lista.Add(new DocumentoDefecto
                        {
                            DefectoDocumentoID = item.DefectoDocumentoID,
                            DefectoDocumentoNombre = item.DefectoDocumentoNombre
                        });
                    }

                    return lista;
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

        public object ObtenerListadoProveedor(Sam3_Usuario usuario, int proyectoID, int patioID, int tipoPruebaID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Proveedor> listaProveedores = new List<Proveedor>();
                    List<Sam3_ST_EPG_ObtieneProveedores_Result> result = ctx.Sam3_ST_EPG_ObtieneProveedores(proyectoID, patioID).ToList();

                    listaProveedores.Add(new Proveedor());
                    foreach (Sam3_ST_EPG_ObtieneProveedores_Result item in result)
                    {
                        listaProveedores.Add(new Proveedor {
                                ProveedorID = item.ProveedorID,
                                NombreProveedor = item.Nombre
                        });
                    }

                    return listaProveedores;
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

        public object ObtenerListadoRequisicionEntregada(Sam3_Usuario usuario, int proyectoID, int proveedorID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Requisicion> listaRequisiciones = new List<Requisicion>();
                    List<Sam3_ST_EPG_ObtieneListaRequisiciones_Result> result = ctx.Sam3_ST_EPG_ObtieneListaRequisiciones(proyectoID, proveedorID).ToList();
                    listaRequisiciones.Add(new Requisicion());

                    foreach (Sam3_ST_EPG_ObtieneListaRequisiciones_Result item in result)
                    {
                        listaRequisiciones.Add(new Requisicion
                        {
                            RequisicionID = item.RequisicionID,
                            NombreRequisicion = item.NombreRequisicion,
                            TipoPruebaID = item.TipoPruebaID,
                            ProveedorID = item.ProveedorID.GetValueOrDefault()

                        });
                    }                       

                    return listaRequisiciones;
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

        public object ObtenerDetalleRequisicion(int proyectoID, int proveedorID, int requisicionID, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    string estatusDefault = "";
                    if (lenguaje.Equals("es-MX"))
                    {
                        estatusDefault = "Aprobado";
                    }
                    else
                    {
                        estatusDefault = "Approved";
                    }

                    List<RequisicionDetalle> listaDetalle = new List<RequisicionDetalle>();
                    List<Sam3_ST_EPG_ObtieneRequisicionDetalle_Result> result = ctx.Sam3_ST_EPG_ObtieneRequisicionDetalle(proyectoID, proveedorID, 
                        requisicionID, lenguaje).ToList();
                    foreach (Sam3_ST_EPG_ObtieneRequisicionDetalle_Result item in result)
                    {
                        listaDetalle.Add(new RequisicionDetalle
                        {
                            Accion = item.Accion,
                            EntregaPlacasGraficasID = item.EntregaPlacasGraficasID,
                            RequisicionID = item.RequisicionID,
                            OrdenTrabajoID = item.OrdenTrabajoID,
                            SpoolID = item.SpoolID.GetValueOrDefault(),
                            JuntaSpoolID = item.JuntaSpoolID.GetValueOrDefault(),
                            NumeroControl = item.NumeroControl,
                            JuntaEtiqueta = item.JuntaEtiqueta,
                            ClasificacionPndID = item.ClasificacionPNDID.GetValueOrDefault(),
                            ClasificacionPnd = item.ClasificacionPnd,
                            TipoPruebaID = item.TipoPruebaID.GetValueOrDefault(),
                            TipoPrueba = item.TipoPrueba,
                            Observaciones = item.Observaciones,
                            CodigoAsmeID = 1,
                            CodigoAsme = item.CodigoAsme,
                            DocumentoRecibidoID = item.DocumentoRecibidoID,
                            DocumentoRecibido = item.DocumentoRecibido,
                            DocumentoEstatusID = item.Accion==1?1: item.DocumentoEstatusID,
                            DocumentoEstatus = item.Accion == 1 ? estatusDefault : item.DocumentoEstatus,
                            DefectoDocumentoID = item.DocumentoDefectoID,
                            DefectoDocumento = item.DocumentoDefecto,
                            EstatusCaptura = 0,
                            ListaRecibido = (List<DocumentoRecibido>)EntregaPlacasGraficasBD.Instance.ObtenerListadoDocumentoRecibido(lenguaje),
                            ListaEstatusDocumento = (List<DocumentoEstatus>)EntregaPlacasGraficasBD.Instance.ObtenerListadoDocumentoEstatus(lenguaje),
                            ListaDefectoDocumento = (List<DocumentoDefecto>)EntregaPlacasGraficasBD.Instance.ObtenerListadoDocumentoDefecto(lenguaje)
                        });
                    }
                    
                    return listaDetalle;
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

        public object ObtieneElementosRequisicion(int usuarioID, int requisicionID, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ElementoRequisicion elemento = null;
                    Sam3_ST_EPG_ObtieneRequisicionPorParametro_Result result = ctx.Sam3_ST_EPG_ObtieneRequisicionPorParametro(requisicionID, usuarioID).SingleOrDefault();

                    if (result != null && result.RequisicionID != 0)
                    {
                        elemento = new ElementoRequisicion();

                        List<Proyecto> listaProyecto = new List<Proyecto>();
                        listaProyecto.Add(new Proyecto());
                        listaProyecto.Add(new Proyecto
                        {
                            ProyectoID = result.ProyectoID,
                            Nombre = result.Proyecto,
                            PatioID = result.PatioID
                        });

                        List<Proveedor> listaProveedor = new List<Proveedor>();
                        listaProveedor.Add(new Proveedor());
                        listaProveedor.Add(new Proveedor {
                            ProveedorID = result.ProveedorID.GetValueOrDefault(),
                            NombreProveedor = result.NombreProveedor
                        });

                        List<Requisicion> listaRequisicion = new List<Requisicion>();
                        listaRequisicion.Add(new Requisicion());
                        listaRequisicion.Add(new Requisicion {
                            RequisicionID = result.RequisicionID,
                            ProyectoID = result.ProyectoID,
                            TipoPruebaID = result.TipoPruebaID.GetValueOrDefault(),
                            NombreRequisicion = result.NombreRequisicion,
                            ProveedorID = result.ProveedorID.GetValueOrDefault()
                        });


                        elemento.RequisicionID = result.RequisicionID;
                        elemento.ProyectoID = result.ProyectoID;
                        elemento.TipoPruebaID = result.TipoPruebaID.GetValueOrDefault();
                        elemento.PatioID = result.PatioID;
                        elemento.ProveedorID = result.ProveedorID.GetValueOrDefault();
                        elemento.listaProyecto = listaProyecto;
                        elemento.listaProveedor = listaProveedor;
                        elemento.listaRequisicion = listaRequisicion;
                    }


                    return elemento;
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

        public object InsertarCapturaEntregaPlacasGraficas(DataTable dtDetalleCaptura, int usuario, string lenguaje, int requisicionID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = { { "@Usuario", usuario.ToString() }, { "@Lenguaje", lenguaje }, { "@RequisicionID", requisicionID.ToString()} };

                    _SQL.Ejecuta(Stords.GUARDACAPTURAENTREGAPLACASGRAFICAS, dtDetalleCaptura, "@EntregaPlacasGraficas", parametro);


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
