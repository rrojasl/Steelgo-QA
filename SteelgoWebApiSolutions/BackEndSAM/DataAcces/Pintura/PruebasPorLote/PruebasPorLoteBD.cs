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
                //using (SamContext ctx = new SamContext())
                //{
                //    List<Sam3_Pintura_PruebasLotes_Get_Procesos_Result> lista = ctx.Sam3_Pintura_PruebasLotes_Get_Procesos(proyectoID).ToList();
                //    List<ProcesosPintura> lista = new List<ProcesosPintura>();
                //    foreach (Sam3_Pintura_PruebasLotes_Get_Procesos_Result item in lista)
                //    {
                //        ProcesosPintura objeto = new ProcesosPintura
                //        {
                //           ProcesoID=item.ProcesoID,
                //           Nombre=item.Nombre
                //        };
                //        lista.Add(objeto);
                //    }


                //    return lista;

                //}

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
                //using (SamContext ctx = new SamContext())
                //{
                //    List<Sam3_Pintura_PruebasLotes_Get_SP_Result> lista = ctx.Sam3_Pintura_PruebasLotes_Get_SP(proyectoID, procesoPinturaID).ToList();
                //    List<SistemaPinturaLotes> lista = new List<SistemaPinturaLotes>();
                //    foreach (Sam3_Pintura_PruebasLotes_Get_SP_Result item in lista)
                //    {
                //        SistemaPinturaLotes objeto = new SistemaPinturaLotes
                //        {
                //            SistemaPinturaID = item.SistemaPinturaID,
                //            Nombre = item.Nombre
                //        };
                //        lista.Add(objeto);
                //    }


                //    return lista;

                //}

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

        public object ObtenerPrueba(int sistemaProyectoID,int ProcesoPinturaID )
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    //List<Sam3_Pintura_PruebasLotes_Get_Pruebas_Result> lista = ctx.Sam3_Pintura_PruebasLotes_Get_Pruebas(sistemaProyectoID, ProcesoPinturaID).ToList();
                    //List<Prueba> lista = new List<Prueba>();
                    //foreach (Sam3_Pintura_PruebasLotes_Get_Pruebas_Result item in lista)
                    //{
                    //    Prueba objeto = new Prueba
                    //    {
                    //        PruebaID = item.SistemaPinturaID,
                    //        Nombre = item.Nombre
                    //    };
                    //    lista.Add(objeto);
                    //}


                    //return lista;
                    return null;
                }
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

        public object ObtenerLotes(string fechaPrueba, int sistemaProyectoID, int pruebaID, int procesoPinturaID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    //List<Sam3_Pintura_PruebasLotes_Get_Pruebas_Result> lista = ctx.Sam3_Pintura_PruebasLotes_Get_Pruebas(fechaPrueba, sistemaProyectoID, pruebaID, procesoPinturaID).ToList();
                    //List<Prueba> lista = new List<Prueba>();
                    //foreach (Sam3_Pintura_PruebasLotes_Get_Pruebas_Result item in lista)
                    //{
                    //    Prueba objeto = new Prueba
                    //    {
                    //        PruebaID = item.SistemaPinturaID,
                    //        Nombre = item.Nombre
                    //    };
                    //    lista.Add(objeto);
                    //}


                    //return lista;
                    return null;
                }
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