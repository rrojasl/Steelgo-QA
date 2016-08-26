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
                    lista.Add(new DocumentoRecibido
                    {
                        DocumentoRecibidoID = 0,
                        DocumentoRecibidoNombre = ""
                    });
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
                    lista.Add(new DocumentoEstatus
                    {
                        DocumentoEstatusID = 0,
                        DocumentoEstatusNombre = ""
                    });
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

                    lista.Add(new DocumentoDefecto
                    {
                        DefectoDocumentoID = 0,
                        DefectoDocumentoNombre = ""
                    });

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
            return null;
        }

        public object InsertarCapturaEntregaPlacasGraficas(DataTable dtDetalleCaptura)
        {
            return null;
        }
    }
}