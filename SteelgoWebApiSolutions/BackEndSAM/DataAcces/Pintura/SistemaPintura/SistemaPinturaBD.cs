using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BackEndSAM.Models.Pintura.SistemaPintura;

namespace BackEndSAM.DataAcces.Pintura.SistemaPintura
{
    public class SistemaPinturaBD
    {
        private static readonly object _mutex = new Object();
        private static SistemaPinturaBD _instance;

        public static SistemaPinturaBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new SistemaPinturaBD();
                    }
                }
                return _instance;
            }
        }


        public object ObtenerSistemaPinturaNuevo(string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<SistemaPinturaNuevo> listaColor = new List<SistemaPinturaNuevo>();
                    List<Sam3_Steelgo_Get_ProcesosPintura_Result> result = ctx.Sam3_Steelgo_Get_ProcesosPintura(lenguaje).ToList();
                    List<UnidadMedida> listadoUnidadesMedida = (List<UnidadMedida>)ObtenerUnidadMedidaPruebasProceso(lenguaje);


                    foreach (Sam3_Steelgo_Get_ProcesosPintura_Result item in result)
                    {
                        listaColor.Add(new SistemaPinturaNuevo
                        {
                            Accion = 1,
                            Agregar = false,
                            Proceso = item.NombreProceso,
                            ProcesoPinturaID = item.ProcesoPinturaID,
                            listadoUnidadesMedida = listadoUnidadesMedida,
                            listadoPruebasProceso = (List<PruebasProcesos>)ObtenerPruebasProceso(lenguaje,item.ProcesoPinturaID),
                            listadoPruebasDetalle = new List<DetallePruebas>()
                        });
                    }

                    return listaColor;
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

        public object ObtenerUnidadMedidaPruebasProceso(string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<UnidadMedida> listaunidadMedida = new List<UnidadMedida>();
                    List<Sam3_Steelgo_Get_UnidadProcesoPintura_Result> result = ctx.Sam3_Steelgo_Get_UnidadProcesoPintura(lenguaje).ToList();


                    foreach (Sam3_Steelgo_Get_UnidadProcesoPintura_Result item in result)
                    {
                        listaunidadMedida.Add(new UnidadMedida
                        {
                            Nombre = item.Nombre,
                            UnidadMedidaID = item.UnidadMedidaID
                        });
                    }

                    return listaunidadMedida;
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


        public object ObtenerPruebasProceso(string lenguaje, int ProcesoPinturaID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<PruebasProcesos> listaPruebasProceso = new List<PruebasProcesos>();
                    List<Sam3_Pintura_Get_PruebasProcesos_Result> result = ctx.Sam3_Pintura_Get_PruebasProcesos(lenguaje,ProcesoPinturaID).ToList();


                    foreach (Sam3_Pintura_Get_PruebasProcesos_Result item in result)
                    {
                        listaPruebasProceso.Add(new PruebasProcesos
                        {
                            Nombre = item.Nombre,
                            ProcesoPinturaID = item.ProcesoPinturaID,
                            PruebaProcesoPinturaID = item.PruebaProcesoPinturaID
                        });
                    }

                    return listaPruebasProceso;
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