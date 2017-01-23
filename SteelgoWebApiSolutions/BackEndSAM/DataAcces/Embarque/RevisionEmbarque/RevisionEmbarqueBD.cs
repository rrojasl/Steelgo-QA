using BackEndSAM.Models.Embarque.RevisionEmbarque;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.Embarque.RevisionEmbarque
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

        public object ObtenerListadoEmbarques(int ProveedorID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Embarque_RE_Get_ListadoEmbarque_Result> result = ctx.Sam3_Embarque_RE_Get_ListadoEmbarque(ProveedorID).ToList();
                    List<EmbarqueEnviado> listaDetalle = new List<EmbarqueEnviado>();
                    listaDetalle.Add(new EmbarqueEnviado());

                    foreach (Sam3_Embarque_RE_Get_ListadoEmbarque_Result item in result)
                    {
                        listaDetalle.Add(new EmbarqueEnviado
                        {
                            EmbarqueID = item.EmbarqueID,
                            Nombre = item.Embarque,
                            Destino = item.Destino,
                            Estatus = item.Estatus,
                            ProyectoID = item.ProyectoID,
                            RevisionCerrada = item.RevisionCerrada.GetValueOrDefault()
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

        public object ObtenerDetalleSpoolAgregar(int TipoConsulta, int OrdenTrabajoSpoolID, string Codigo)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Embarque_RE_Get_DetalleSpool_Result> result = ctx.Sam3_Embarque_RE_Get_DetalleSpool(TipoConsulta,OrdenTrabajoSpoolID, Codigo).ToList();
                    List<DetalleSpoolAgregar> listaDetalle = new List<DetalleSpoolAgregar>();

                    foreach (Sam3_Embarque_RE_Get_DetalleSpool_Result item in result)
                    {
                        listaDetalle.Add(new DetalleSpoolAgregar
                        {
                            Accion = 1,
                            ProyectoID = item.ProyectoID,
                            SpoolID = item.SpoolID,
                            NumeroControl = item.NumeroControl,
                            EmpaquetadoID = item.EmpaquetadoID.GetValueOrDefault(),
                            DetalleCargaID = item.DetalleCargaID.GetValueOrDefault(),
                            EmbarqueID = item.EmbarqueID.GetValueOrDefault(),
                            Embarque = item.Embarque,
                            EmbarqueEstatusID = item.EmbarqueEstatusID.GetValueOrDefault(),
                            PaqueteID = item.PaqueteID.GetValueOrDefault(),
                            Paquete = item.Paquete,
                            DetalleRevisionID = item.DetalleRevisionID.GetValueOrDefault(),
                            Llego = item.Llego.GetValueOrDefault(),
                            NoLlego = item.NoLlego.GetValueOrDefault(),
                            LlegoComentario = item.LlegoComentario.GetValueOrDefault(),
                            Comentario = item.Comentario,
                            CapturaManual = true,
                            ModificadoPorUsuario = true
                        });
                    }

                    return listaDetalle;

                }
            }catch(Exception ex)
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object ObtenerDetallePaqueteAgregar(int PaquetID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Embarque_RE_Get_DetallePaquete_Result> result = ctx.Sam3_Embarque_RE_Get_DetallePaquete(PaquetID).ToList();
                    List<DetallePaqueteAgregar> listaDetalle = new List<DetallePaqueteAgregar>();

                    foreach (Sam3_Embarque_RE_Get_DetallePaquete_Result item in result)
                    {
                        listaDetalle.Add(new DetallePaqueteAgregar
                        {
                            Accion = 1,
                            ProyectoID = item.ProyectoID,
                            SpoolID = item.SpoolID,
                            NumeroControl = item.NumeroControl,
                            EmpaquetadoID = item.EmpaquetadoID,
                            CargaPlanaID = item.CargaPlanaID.GetValueOrDefault(),
                            Plana = item.Plana,
                            EmbarqueID = item.EmbarqueID.GetValueOrDefault(),
                            Embarque = item.Embarque,
                            EmbarqueEstatusID = item.EmbarqueEstatusID.GetValueOrDefault(),
                            PaqueteID = item.PaqueteID,
                            Paquete = item.Paquete,
                            DetalleRevisionID = item.DetalleRevisionID.GetValueOrDefault(),
                            Llego = item.Llego.GetValueOrDefault(),
                            NoLlego = item.NoLlego.GetValueOrDefault(),
                            LlegoComentario = item.LlegoComentario.GetValueOrDefault(),
                            Comentario = item.Comentario,
                            CapturaManual = true,
                            ModificadoPorUsuario = true
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

        public object ObtenerDetalleEmbarques(int EmbarqueID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Embarque_RE_Get_DetalleEmbarque_Result> result = ctx.Sam3_Embarque_RE_Get_DetalleEmbarque(EmbarqueID).ToList();
                    List<DetalleRevisionEmbarque> listaDetalle = new List<DetalleRevisionEmbarque>();

                    foreach (Sam3_Embarque_RE_Get_DetalleEmbarque_Result item in result)
                    {
                        listaDetalle.Add(new DetalleRevisionEmbarque
                        {
                            Accion = item.Accion,
                            SpoolID = item.SpoolID.GetValueOrDefault(),
                            NumeroControl = item.NumeroControl,
                            EmbarqueID = item.EmbarqueID.GetValueOrDefault(),
                            EmbarqueEstatusID = item.EmbarqueEstatusID.GetValueOrDefault(),
                            Paquete = item.Paquete,
                            DetalleRevisionID = item.DetalleRevisionID,
                            Llego = item.Llego.GetValueOrDefault(),
                            NoLlego = item.NoLlego.GetValueOrDefault(),
                            LlegoComentario = item.LlegoComentario.GetValueOrDefault(),
                            Comentario = item.Comentario,
                            CapturaManual = item.CapturaManual.GetValueOrDefault()
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

    }
}