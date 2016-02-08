using BackEndSAM.Models.Embarque.RevisionEmbarque;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.EmbarqueBD.RevisionEmbarqueBD
{
    public class RevisionEmbarqueBD
    {
        private static readonly object _mutex = new object();
        private static RevisionEmbarqueBD _instance;

        public static RevisionEmbarqueBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new RevisionEmbarqueBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerDetalleEmbarque(int EmbarquePlanaID, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ObjetosSQL _SQL = new ObjetosSQL();


                    List<Sam3_Embarque_Get_DetalleEmbarqueID_Result> result = ctx.Sam3_Embarque_Get_DetalleEmbarqueID(EmbarquePlanaID, lenguaje).ToList();

                    List<DetalleRevisionEmbarque> ListadoDetalleCargaCaptura = new List<DetalleRevisionEmbarque>();

                    foreach (Sam3_Embarque_Get_DetalleEmbarqueID_Result item in result)
                    {
                        DetalleRevisionEmbarque detalleRevisionEmbarque = new DetalleRevisionEmbarque
                        {
                            Comentario = item.Comentario,
                            Llego = (item.Llego == true && (item.Comentario == null || item.Comentario.Trim() == "")) ? true : false,
                            LlegoMas = false,
                            NumeroControl = item.NumeroControl,
                            Paquete = item.Paquete,
                            NoLlego = item.Llego != null && item.Llego == false ? true : false,
                            LlegoComentarios = (item.Llego == true && (item.Comentario != null && item.Comentario.Trim() != "")) ? true : false,
                            EmbarquePlanaID = item.EmbarquePlanaID,
                            EmbarquePaqueteID = item.EmbarquePaqueteID,
                            SpoolID = item.SpoolID

                        };
                        ListadoDetalleCargaCaptura.Add(detalleRevisionEmbarque);
                    }

                    return ListadoDetalleCargaCaptura;
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

        public object ObtieneDetalle(int TipoConsulta, int OrdenTrabajoSpoolID, int Paquete, string Codigo, string lenguaje, int embarquePlanaID, bool opcionAgregar)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Embarque_Get_RevisionSpool_Result> result = ctx.Sam3_Embarque_Get_RevisionSpool(TipoConsulta, OrdenTrabajoSpoolID, Paquete, Codigo, lenguaje).ToList();

                    List<DetalleRevisionEmbarque> ListadoDetalleCargaCaptura = new List<DetalleRevisionEmbarque>();

                    foreach (Sam3_Embarque_Get_RevisionSpool_Result item in result)
                    {
                        DetalleRevisionEmbarque detalleRevisionEmbarque = new DetalleRevisionEmbarque
                        {
                            Comentario = item.Comentario,
                            Llego = (item.Llego == true && (item.Comentario == null || item.Comentario.Trim() == "")) ? true : false,
                            LlegoMas = opcionAgregar,
                            NumeroControl = item.NumeroControl,
                            Paquete = item.Paquete,
                            NoLlego = item.Llego != null && item.Llego == false ? true : false,
                            LlegoComentarios = (item.Llego == true && (item.Comentario != null && item.Comentario.Trim() != "")) ? true : false,
                            EmbarquePlanaID = embarquePlanaID,
                            EmbarquePaqueteID = item.EmbarquePaqueteID,
                            SpoolID = item.SpoolID
                        };
                        ListadoDetalleCargaCaptura.Add(detalleRevisionEmbarque);
                    }

                    return ListadoDetalleCargaCaptura;
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

        public object ObtieneEmbarquesEnviados(string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Embarque_Get_EmbarqueEnviado_Result> result = ctx.Sam3_Embarque_Get_EmbarqueEnviado(lenguaje).ToList();

                    List<EmbarqueEnviado> ListadoEmbarqueEnviado = new List<EmbarqueEnviado>();

                    foreach (Sam3_Embarque_Get_EmbarqueEnviado_Result item in result)
                    {
                        EmbarqueEnviado detalleRevisionEmbarque = new EmbarqueEnviado
                        {
                            EmbarquePlanaID = item.EmbarquePlanaID,
                            Folio = item.Folio
                        };
                        ListadoEmbarqueEnviado.Add(detalleRevisionEmbarque);
                    }

                    return ListadoEmbarqueEnviado;
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


        public object ActualizarDetalle(DataTable dtDetalle, int usuarioID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ObjetosSQL _SQL = new ObjetosSQL();
                    TransactionalInformation result = new TransactionalInformation();
                    string[,] parametro = { { "@Usuario", usuarioID.ToString() } };

                    if (_SQL.Ejecuta(Stords.ACTUALIZARREVISIONEMBARQUESPOOL, dtDetalle, "@Tabla", parametro))
                    {
                        result.ReturnMessage.Add("Ok");
                        result.ReturnCode = 200;
                        result.ReturnStatus = true;
                        result.IsAuthenicated = true;
                    }
                    else
                    {
                        result.ReturnMessage.Add("Error");
                        result.ReturnCode = 400;
                        result.ReturnStatus = false;
                        result.IsAuthenicated = false;
                    }
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