﻿using BackEndSAM.Models.ServiciosTecnicos.EntregaPlacasGraficas;
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
                            DocumentoDefectoID = item.DocumentoDefectoID,
                            DocumentoDefectoNombre = item.DocumentoDefectoNombre
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

        public object ObtenerListadoProyecto(int usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Proyecto> listaProyectos = new List<Proyecto>();
                    List<Sam3_ST_EPG_ObtieneProyectos_Result> result = ctx.Sam3_ST_EPG_ObtieneProyectos(usuario).ToList();


                    listaProyectos.Add(new Proyecto());
                    foreach (Sam3_ST_EPG_ObtieneProyectos_Result item in result)
                    {
                        listaProyectos.Add(new Proyecto
                        {
                            ProyectoID = item.ProyectoID,
                            Nombre = item.NombreProyecto
                        });
                    }

                    return listaProyectos;
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

        public object ObtenerListadoTipoPrueba(int proyectoID, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<TipoPrueba> listaTipoPrueba = new List<TipoPrueba>();
                    List<Sam3_ST_EPG_ObtieneTipoPrueba_Result> result = ctx.Sam3_ST_EPG_ObtieneTipoPrueba(proyectoID, lenguaje).ToList();


                    listaTipoPrueba.Add(new TipoPrueba());
                    foreach (Sam3_ST_EPG_ObtieneTipoPrueba_Result item in result)
                    {
                        listaTipoPrueba.Add(new TipoPrueba
                        {
                            TipoPruebaID = item.TipoPruebaID,
                            Nombre = item.Nombre
                        });
                    }

                    return listaTipoPrueba;
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

        public object ObtenerListadoProveedor(Sam3_Usuario usuario, int proyectoID, int tipoPruebaID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Proveedor> listaProveedores = new List<Proveedor>();
                    List<Sam3_ST_EPG_ObtieneProveedores_Result> result = ctx.Sam3_ST_EPG_ObtieneProveedores(proyectoID, tipoPruebaID).ToList();

                    listaProveedores.Add(new Proveedor());
                    foreach (Sam3_ST_EPG_ObtieneProveedores_Result item in result)
                    {
                        listaProveedores.Add(new Proveedor
                        {
                            ProveedorID = item.ProveedorID,
                            NombreProveedor = item.NombreProveedor
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

        public object ObtenerListadoRequisicion(Sam3_Usuario usuario, int proyectoID, int proveedorID, int tipoPruebaID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Requisicion> listaRequisiciones = new List<Requisicion>();
                    List<Sam3_ST_EPG_ObtieneListaRequisiciones_Result> result = ctx.Sam3_ST_EPG_ObtieneListaRequisiciones(proyectoID, tipoPruebaID, proveedorID).ToList();
                    listaRequisiciones.Add(new Requisicion());

                    foreach (Sam3_ST_EPG_ObtieneListaRequisiciones_Result item in result)
                    {
                        listaRequisiciones.Add(new Requisicion
                        {
                            RequisicionID = item.RequisicionID,
                            ProyectoID = item.ProveedorID,
                            NombreRequisicion = item.NumeroRequisicion,
                            ProveedorID = item.ProveedorID

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

        public object ObtenerDetalleRequisicion(int proyectoID, int proveedorID, int requisicionID, string lenguaje, int tipoPruebaID)
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
                    List<Sam3_ST_EPG_ObtieneRequisicionDetalle_Result> result = ctx.Sam3_ST_EPG_ObtieneRequisicionDetalle(proyectoID, tipoPruebaID, proveedorID, requisicionID, lenguaje).ToList();
                    foreach (Sam3_ST_EPG_ObtieneRequisicionDetalle_Result item in result)
                    {
                        listaDetalle.Add(new RequisicionDetalle
                        {
                            Accion = item.EntregaPlacasGraficasID==0?1:2,
                            EntregaPlacasGraficasID = item.EntregaPlacasGraficasID,
                            RequisicionID = item.RequisicionID,
                            OrdenTrabajoID = item.OrdenTrabajoID,
                            SpoolID = item.SpoolID,
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
                            DocumentoEstatusID = item.EntregaPlacasGraficasID == 0 ? 1 : item.DocumentoEstatusID,                                                 
                            DocumentoEstatus = item.EntregaPlacasGraficasID == 0 ? estatusDefault : item.DocumentoEstatus,
                            DocumentoDefectoID = item.DocumentoDefectoID.GetValueOrDefault(),
                            DocumentoDefecto = item.DefectoDocumento,
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
                    Sam3_ST_EPG_ObtieneRequisicionPorParametro_Result result = ctx.Sam3_ST_EPG_ObtieneRequisicionPorParametro(requisicionID, usuarioID, lenguaje).SingleOrDefault();

                    if (result != null && result.RequisicionID != 0)
                    {
                        elemento = new ElementoRequisicion();

                        List<Proyecto> listaProyecto = new List<Proyecto>();
                        listaProyecto.Add(new Proyecto());
                        listaProyecto.Add(new Proyecto
                        {
                            ProyectoID = result.ProyectoID,
                            Nombre = result.Proyecto
                        });

                        List<TipoPrueba> listaTipoPrueba = new List<TipoPrueba>();
                        listaTipoPrueba.Add(new TipoPrueba());
                        listaTipoPrueba.Add(new TipoPrueba {
                            TipoPruebaID = result.TipoPruebaID.GetValueOrDefault(),
                            Nombre = result.TipoPrueba
                        });

                        List<Proveedor> listaProveedor = new List<Proveedor>();
                        listaProveedor.Add(new Proveedor());
                        listaProveedor.Add(new Proveedor
                        {
                            ProveedorID = result.ProveedorID,
                            NombreProveedor = result.Proveedor
                        });

                        List<Requisicion> listaRequisicion = new List<Requisicion>();
                        listaRequisicion.Add(new Requisicion());
                        listaRequisicion.Add(new Requisicion
                        {
                            RequisicionID = result.RequisicionID,
                            ProyectoID = result.ProyectoID,
                            NombreRequisicion = result.NumeroRequisicion,
                            ProveedorID = result.ProveedorID
                        });


                        elemento.RequisicionID = result.RequisicionID;
                        elemento.ProyectoID = result.ProyectoID;
                        elemento.TipoPruebaID = result.TipoPruebaID.GetValueOrDefault();
                        elemento.ProveedorID = result.ProveedorID;
                        elemento.listaProyecto = listaProyecto;
                        elemento.listaTipoPrueba = listaTipoPrueba;
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

        public object EliminaRequisicion(int requisicionID, int usuarioID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    int rowsAfected = ctx.Sam3_ERPND_EliminaRequisicion(requisicionID, usuarioID);

                    return rowsAfected;
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
