using BackEndSAM.Models.Embarque.ListadoEmbarque;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.Embarque.ListadoEmbarque
{
    public class ListadoEmbarqueBD
    {
        private static readonly object _mutex = new object();
        private static ListadoEmbarqueBD _instance;

        public static ListadoEmbarqueBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new ListadoEmbarqueBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerDetalleListado(string lenguaje, int StatusEnvio, int UsuarioID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Embarque_Get_ListadoEmbarque_Result> result = ctx.Sam3_Embarque_Get_ListadoEmbarque(lenguaje , StatusEnvio, UsuarioID).ToList();
                    List<DetalleListadoEmbarque> listaDetalle = new List<DetalleListadoEmbarque>();

                    foreach (Sam3_Embarque_Get_ListadoEmbarque_Result item in result)
                    {
                        listaDetalle.Add(new DetalleListadoEmbarque
                        {
                            EmbarqueID = item.EmbarqueID,
                            NombreEmbarque = item.NombreEmbarque,
                            NombreProyecto = item.NombreProyecto,
                            NombrePlana = item.NombrePlana,
                            NombreDestino = item.NombreDestino,
                            SolicitudPermiso = item.SolicitudPermiso,
                            FechaPermiso = item.FechaPermiso.ToString(),
                            ApCliente = item.ApCliente.GetValueOrDefault(),
                            ApAduana = item.ApAduana.GetValueOrDefault(),
                            OkEmbarque = item.OkEmbarque.GetValueOrDefault(),
                            DestinoID = item.DestinoID.GetValueOrDefault()
                        });
                    }
                    return listaDetalle;
                }
            }
            catch (Exception ex)
            {
                SecurityManager.Api.Models.TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object ObtenerElementosPorStatus(string lenguaje, int UsuarioID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Embarque_Get_NumElementosListadoEmbarque_Result> result = ctx.Sam3_Embarque_Get_NumElementosListadoEmbarque(lenguaje, UsuarioID).ToList();
                    List<ElementosPorStatus> listaDetalle = new List<ElementosPorStatus>();

                    foreach (Sam3_Embarque_Get_NumElementosListadoEmbarque_Result item in result)
                    {
                        listaDetalle.Add(new ElementosPorStatus
                        {
                            EmbarquesEnviados = item.StatusEnviado.GetValueOrDefault(),
                            EmbarquesNoEnviados = item.StatusEnviado.GetValueOrDefault()
                        });
                    }
                    return listaDetalle;
                }
            }
            catch (Exception ex)
            {
                SecurityManager.Api.Models.TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }
    }
}