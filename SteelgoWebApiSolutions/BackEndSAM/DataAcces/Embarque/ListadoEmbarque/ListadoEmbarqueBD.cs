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

        public object ObtenerDetalleListado(string Lenguaje, int EstatusEmbarque, int UsuarioID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Embarque_LE_Get_ListadoEmbarque_Result> result = ctx.Sam3_Embarque_LE_Get_ListadoEmbarque(Lenguaje , EstatusEmbarque, UsuarioID).ToList();
                    List<DetalleListadoEmbarque> listaDetalle = new List<DetalleListadoEmbarque>();

                    foreach (Sam3_Embarque_LE_Get_ListadoEmbarque_Result item in result)
                    {
                        listaDetalle.Add(new DetalleListadoEmbarque
                        {
                            EmbarqueID = item.EmbarqueID,
                            Embarque = item.Embarque,
                            Proyecto = item.Proyecto,
                            Planas = item.Planas,
                            DestinoID = item.DestinoID,
                            Destino = item.Destino,
                            SolicitudPermiso = item.SolicitudPermiso,
                            FechaPermiso = item.FechaPermiso.ToString(),
                            ApCliente = false,
                            ApAduana = false,
                            OkEmbarque = item.OkEmbarque == 1?true:false,
                            RequierePapCliente = item.RequierePapCliente.GetValueOrDefault(),
                            RequiereAduana = item.RequiereAduana.GetValueOrDefault(),
                            RequiereRevisionCliente = item.RequiereRevisionCliente.GetValueOrDefault()
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

        public object ObtenerElementosPorEstatus(string lenguaje, int UsuarioID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Embarque_LE_Get_ElementosPorEstatus_Result> result = ctx.Sam3_Embarque_LE_Get_ElementosPorEstatus(lenguaje, UsuarioID).ToList();
                    List<ElementosPorStatus> listaDetalle = new List<ElementosPorStatus>();

                    foreach (Sam3_Embarque_LE_Get_ElementosPorEstatus_Result item in result)
                    {
                        listaDetalle.Add(new ElementosPorStatus
                        {
                            Pendientes = item.Pendientes.GetValueOrDefault(),
                            Transito = item.Transito.GetValueOrDefault()
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