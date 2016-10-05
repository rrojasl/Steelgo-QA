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
                            Proceso = item.NombreProceso,
                            ProcesoPinturaID = item.ProcesoPinturaID,
                            listadoUnidadesMedida = listadoUnidadesMedida
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


    }
}