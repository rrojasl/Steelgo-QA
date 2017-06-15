using BackEndSAM.Models;
using BackEndSAM.Models.Pintura.PruebasPorLote;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.Pintura.PruebasPorLote
{
    public class PruebasPorLoteBD
    {
        private static readonly object _mutex = new object();

        private static PruebasPorLoteBD _instance;

        public static PruebasPorLoteBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new PruebasPorLoteBD();
                    }
                }
                return _instance;
            }
        }



        public object ObtenerProcesos(int proyectoID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Pintura_PruebasLote_Get_Procesos_Result> lista = ctx.Sam3_Pintura_PruebasLote_Get_Procesos(proyectoID).ToList();
                    List<ProcesosPintura> listaProceso = new List<ProcesosPintura>();
                    foreach (Sam3_Pintura_PruebasLote_Get_Procesos_Result item in lista)
                    {
                        ProcesosPintura objeto = new ProcesosPintura
                        {
                            ProcesoPinturaID = item.ProcesoPinturaID,
                            ProcesoPintura = item.ProcesoPintura
                        };
                        listaProceso.Add(objeto);
                    }


                    return listaProceso;

                }

                return null;
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object ObtenerSistemaPintura(int proyectoID,int procesoPinturaID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Pintura_PruebasLote_Get_SP_Result> lista = ctx.Sam3_Pintura_PruebasLote_Get_SP( procesoPinturaID, proyectoID).ToList();
                    List<SistemaPinturaLotes> listaSP = new List<SistemaPinturaLotes>();
                    foreach (Sam3_Pintura_PruebasLote_Get_SP_Result item in lista)
                    {
                        SistemaPinturaLotes objeto = new SistemaPinturaLotes
                        {
                            SistemaPinturaID = item.SistemaPinturaID,
                            SistemaPintura = item.SistemaPintura
                        };
                        listaSP.Add(objeto);
                    }


                    return lista;

                }

                return null;
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object ObtenerPrueba( int ProcesoPinturaID ,int SistemaPinturaProyectoID, string lenguaje )
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Pintura_PruebasLote_Get_Pruebas_Result> lista = ctx.Sam3_Pintura_PruebasLote_Get_Pruebas(ProcesoPinturaID, SistemaPinturaProyectoID, lenguaje).ToList();
                    List<Pruebas> listaPrueba = new List<Pruebas>();
                    foreach (Sam3_Pintura_PruebasLote_Get_Pruebas_Result item in lista)
                    {
                        Pruebas objeto = new Pruebas
                        {
                            ProcesoPinturaID = item.ProcesoPinturaID,
                            Prueba = item.Prueba
                        };
                        listaPrueba.Add(objeto);
                    }


                    return lista;

                }

                return null;
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object ObtenerLotes(int ProcesoPinturaID ,int SistemaPinturaProyectoID ,int PruebaProcesoID ,string FechaLote )
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Pintura_PruebasLote_Get_Lotes_Result> lista = ctx.Sam3_Pintura_PruebasLote_Get_Lotes(ProcesoPinturaID, SistemaPinturaProyectoID, PruebaProcesoID, FechaLote).ToList();
                    List<Lotes> listaPrueba = new List<Lotes>();
                    foreach (Sam3_Pintura_PruebasLote_Get_Lotes_Result item in lista)
                    {
                        Lotes objeto = new Lotes
                        {
                            LoteID = item.LoteID,
                            Nombre = item.Nombre
                        };
                        listaPrueba.Add(objeto);
                    }

                    return lista;

                }

                return null;
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
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