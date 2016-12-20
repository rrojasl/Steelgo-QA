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
                            Nombre = item.Nombre,
                            Destino = item.Destino,
                            Estatus = item.EmbarqueEstatusID,
                            ProyectoID = item.ProyectoID
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
                            RevisionEmbarqueID = item.RevisionEmbarqueID,
                            EmbarqueID = item.EmbarqueID,
                            NumeroControl = item.NumeroControl,
                            Embarque =item.Embarque,
                            Llego = item.Llego.GetValueOrDefault(),
                            NoLlego = item.NoLlego.GetValueOrDefault(),
                            LlegoComentario = item.LlegoComentario.GetValueOrDefault(),
                            Comentario = item.Comentario,
                            Destino = item.Destino,
                            Estatus = item.EmbarqueEstatusID,
                            ProyectoID = item.ProyectoID
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