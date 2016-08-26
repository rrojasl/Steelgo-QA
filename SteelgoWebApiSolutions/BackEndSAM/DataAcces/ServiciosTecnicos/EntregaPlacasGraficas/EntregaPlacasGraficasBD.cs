using BackEndSAM.Models.ServiciosTecnicos.EntregaPlacasGraficas;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data;
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

        public object ObtenerListadoDocumentoRecibido()
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ST_EPG_ObtieneCatalogoRecibido_Result> result = ctx.Sam3_ST_EPG_ObtieneCatalogoRecibido().ToList();
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

        public object ObtenerListadoDocumentoEstatus()
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ST_EPG_ObtieneEstatusDocumento_Result> result = ctx.Sam3_ST_EPG_ObtieneEstatusDocumento().ToList();
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

        public object ObtenerListadoDocumentoDefecto()
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ST_EPG_ObtieneDefectosDocumentos_Result> result = ctx.Sam3_ST_EPG_ObtieneDefectosDocumentos().ToList();
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

        public object ObtenerDetalleRequisicion(int proyectoID, int proveedorID, int requisicionID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    

                    List<RequisicionDetalle> listaDetalle = new List<RequisicionDetalle>();

                    listaDetalle.Add(new RequisicionDetalle
                    {
                        RequisicionID = 1,
                        NumeroControl = "X002-001",
                        JuntaID = 1,
                        Junta = "1",
                        ClasificacionPndID = 1,
                        ClasificacionPnd = "RT-M",
                        TipoPruebaID = 1,
                        TipoPrueba = "RT",
                        Observaciones = "Ninguna Observación",
                        CodigoAsmeID = 1,
                        CodigoAsme = "VFCXD0918-123",
                        Accion = 1,
                        DocumentoRecibidoID = 0,
                        DocumentoRecibido = "",
                        DocumentoEstatusID = 0,
                        DocumentoEstatus = "",
                        DefectoDocumentoID = 0,
                        DefectoDocumento = "",
                        ListaRecibido = (List<DocumentoRecibido>)EntregaPlacasGraficasBD.Instance.ObtenerListadoDocumentoRecibido(),
                        ListaEstatusDocumento = (List<DocumentoEstatus>)EntregaPlacasGraficasBD.Instance.ObtenerListadoDocumentoEstatus(),
                        ListaDefectoDocumento = (List<DocumentoDefecto>)EntregaPlacasGraficasBD.Instance.ObtenerListadoDocumentoDefecto()
                    });
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

        public object InsertarCapturaEntregaPlacasGraficas(DataTable dtDetalleCaptura)
        {
            return null;
        }
    }
}