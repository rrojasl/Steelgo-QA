using BackEndSAM.Models.Embarque;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.EmbarqueBD
{
    public class EmbarqueBD
    {
        private static readonly object _mutex = new object();
        private static EmbarqueBD _instance;

        public static EmbarqueBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new EmbarqueBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerProveedores(int embarquePlanaID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    if (embarquePlanaID != 0)
                    {
                        List<Sam3_Steelgo_Get_TransportistasXEmbarquePlanaID_Result> result = ctx.Sam3_Steelgo_Get_TransportistasXEmbarquePlanaID(embarquePlanaID).ToList();
                        
                        return result;
                    }
                    else
                    {
                        List<Sam3_Steelgo_Get_Transportistas_Result> result = ctx.Sam3_Steelgo_Get_Transportistas().ToList();
                        return result;
                    }
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

        public object ObtenerPlanasGuardadas(int embarqueID, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Embarque_Get_EmbarqueDetalle_Result > result = ctx.Sam3_Embarque_Get_EmbarqueDetalle(embarqueID, lenguaje).ToList();
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

        public object ObtenerPlanasGuardadasChofer(int vehiculoID,int choferID, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Embarque_Get_EmbarqueDetalleChofer_Result> result = ctx.Sam3_Embarque_Get_EmbarqueDetalleChofer(vehiculoID,choferID, lenguaje).ToList();
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

        public object ObtenerPlana(int transportistaID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Embarque_Get_PlanaEmbarque_Result> result = ctx.Sam3_Embarque_Get_PlanaEmbarque(transportistaID).ToList();
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

        public object ObtenerTracto(int transportistaID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Steelgo_Get_Tracto_Result> result = ctx.Sam3_Steelgo_Get_Tracto(transportistaID).ToList();
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


        public object ObtenerChoferes(int vehiculoID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Steelgo_Get_ChoferPorVehiculo_Result> result = ctx.Sam3_Steelgo_Get_ChoferPorVehiculo(vehiculoID).ToList();
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

        
        public object ObtenerPlacasPlana(int transportistaID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Steelgo_Get_Plana_Result> result = ctx.Sam3_Steelgo_Get_Plana(transportistaID).ToList();
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

        public object obtenerListadoDestinos(int proyectoID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Steelgo_Get_Destino_Result> result = ctx.Sam3_Steelgo_Get_Destino(proyectoID).ToList();
                    List<Destinos> detalle = new List<Destinos>();
                    foreach (var item in result)
                    {
                        detalle.Add(new Destinos
                        {
                            DestinoID = item.DestinoID,
                            Nombre = item.Nombre
                        });
                    }
                    return detalle;
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