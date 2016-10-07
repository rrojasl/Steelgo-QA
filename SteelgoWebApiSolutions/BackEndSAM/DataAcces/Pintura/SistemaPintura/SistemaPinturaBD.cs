using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BackEndSAM.Models.Pintura.SistemaPintura;
using BackEndSAM.Models.Pintura.PinturaGeneral;
using BackEndSAM.Models;
using BackEndSAM.Models.Sam3General;

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


        public object ObtenerSistemaPinturaNuevo(string lenguaje, int sistemaPinturaID, int proyectoID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<SistemaPinturaNuevo> listaColor = new List<SistemaPinturaNuevo>();
                    List<Sam3_SP_Get_DetalleSistemaPintura_Result> result = ctx.Sam3_SP_Get_DetalleSistemaPintura(lenguaje, sistemaPinturaID, proyectoID).ToList();
                    List<UnidadMedida> listadoUnidadesMedida = (List<UnidadMedida>)ObtenerUnidadMedidaPruebasProceso(lenguaje);


                    foreach (Sam3_SP_Get_DetalleSistemaPintura_Result item in result)
                    {
                        listaColor.Add(new SistemaPinturaNuevo
                        {
                            Accion = item.SistemaPinturaID == 0 ?  1 : 2,
                            Agregar = item.SistemaPinturaProyectoProcesoID == 0 ? false : true,
                            Proceso = item.NombreProceso,
                            ProcesoPinturaID = item.ProcesoPinturaID,
                            MetrosLote = item.MetrosLote.GetValueOrDefault(),
                            NumeroPruebas = item.NumeroPruebas,
                            ProyectoID = item.ProyectoID,
                            SistemaPinturaID = item.SistemaPinturaID,
                            SistemaPinturaProyectoID = item.SistemaPinturaProyectoID,
                            SistemaPinturaProyectoProcesoID = item.SistemaPinturaProyectoProcesoID,
                            listadoUnidadesMedida = listadoUnidadesMedida,
                            listadoPruebasProceso = (List<PruebasProcesos>)ObtenerPruebasProceso(lenguaje, item.ProcesoPinturaID),
                            listadoPruebasDetalle =  item.SistemaPinturaProyectoProcesoID == 0 ? new List<DetallePruebas>() : (List<DetallePruebas>) ObtenerDetallePruebasProceso(lenguaje,item.SistemaPinturaProyectoProcesoID)
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
                    List<Sam3_Pintura_Get_PruebasProcesos_Result> result = ctx.Sam3_Pintura_Get_PruebasProcesos(lenguaje, ProcesoPinturaID).ToList();


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

        public object ObtenerDetallePruebasProceso(string lenguaje, int ProcesoPinturaID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<DetallePruebas> listaDetallePruebasProceso = new List<DetallePruebas>();
                    List<Sam3_SP_Get_DetallePruebasProceso_Result> result = ctx.Sam3_SP_Get_DetallePruebasProceso(lenguaje, ProcesoPinturaID).ToList();


                    foreach (Sam3_SP_Get_DetallePruebasProceso_Result item in result)
                    {
                        listaDetallePruebasProceso.Add(new DetallePruebas
                        {
                            Accion = 2,
                            ProyectoProcesoPruebaID = item.ProyectoProcesoPruebaID,
                            SistemaPinturaProyectoProcesoID = item.SistemaPinturaProyectoProcesoID,
                            UnidadMaxima = item.UnidadMaxima,
                            UnidadMedida = item.UnidadMedida,
                            UnidadMedidaID = item.UnidadMedidaID,
                            UnidadMinima = item.UnidadMinima,
                            ProyectoProcesoPrueba = item.ProyectoProcesoPrueba,
                            PruebaProcesoPinturaID = item.PruebaProcesoPinturaID
                        });
                    }

                    return listaDetallePruebasProceso;
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

        public object ObtenerSistemaPinturaEdicicion(string lenguaje, int sistemaPinturaID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<SistemaPinturaEdicion> DetalleSistemaPintura = new List<SistemaPinturaEdicion>();
                    List<Sam3_SP_GET_SistemaPintura_Result> result = ctx.Sam3_SP_GET_SistemaPintura(sistemaPinturaID).ToList();


                    foreach (Sam3_SP_GET_SistemaPintura_Result item in result)
                    {
                        DetalleSistemaPintura.Add(new SistemaPinturaEdicion
                        {
                            Nombre = item.Nombre,
                            SistemaPinturaID = item.SistemaPinturaID,
                            listadoColor = (List<Color>)ObtenerColoresSistemaPintura(lenguaje, sistemaPinturaID),
                            listadoProyectos = (List<Proyectos>)ObtenerProyectosSistemaPintura(sistemaPinturaID)

                        });
                    }

                    return DetalleSistemaPintura;
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


        public object ObtenerColoresSistemaPintura(string lenguaje, int sistemaPinturaID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Color> DetalleSistemaPintura = new List<Color>();
                    List<Sam3_SP_GET_ColorSistemaPintura_Result> result = ctx.Sam3_SP_GET_ColorSistemaPintura(sistemaPinturaID, lenguaje).ToList();


                    foreach (Sam3_SP_GET_ColorSistemaPintura_Result item in result)
                    {
                        DetalleSistemaPintura.Add(new Color
                        {
                            Nombre = item.Color,
                            ColorID = item.ColorID
                        });
                    }

                    return DetalleSistemaPintura;
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

        public object ObtenerProyectosSistemaPintura(int sistemaPinturaID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Proyectos> DetalleSistemaPintura = new List<Proyectos>();

                    List<Sam3_SP_GET_Proyectos_Result> result = ctx.Sam3_SP_GET_Proyectos(sistemaPinturaID).ToList();

                    DetalleSistemaPintura.Add(new Proyectos());
                    foreach (Sam3_SP_GET_Proyectos_Result item in result)
                    {
                        DetalleSistemaPintura.Add(new Proyectos
                        {
                            Nombre = item.Nombre,
                            ProyectoID = item.ProyectoID,
                        });
                    }

                    return DetalleSistemaPintura;
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