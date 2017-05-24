using BackEndSAM.Models.FechasSpool;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.FechaSpool
{
    public class FechasSpoolBD
    {
        private static readonly object _mutex = new object();
        private static FechasSpoolBD _instance;

        public static FechasSpoolBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new FechasSpoolBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerFechasSpool()
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_FechasSPool_get_Spools_Result> resultFechasSpool = ctx.Sam3_FechasSPool_get_Spools().ToList();
                    List<FechasSpool> listaFechasSpool = new List<FechasSpool>();
                    listaFechasSpool.Add(new FechasSpool());
                    foreach (Sam3_FechasSPool_get_Spools_Result item in resultFechasSpool)
                    {
                        listaFechasSpool.Add(new FechasSpool
                        {
                             Accion = 1,
                             SpoolID = item.SpoolID,
                             NumeroControl = item.NumeroControl,
                             Proyecto = item.Proyecto,
                             ProyectoID = item.ProyectoID,
                             Area = item.Area.GetValueOrDefault(),
                             Cedula = item.Cedula,
                             Cuadrante = item.Cuadrante,
                             Diametro = item.Diametro.GetValueOrDefault(),
                             Fecha1 = item.Fecha1,
                             Fecha2 = item.Fecha2,
                             Fecha3 = item.Fecha3,
                             Fecha4 = item.Fecha4,
                             Fecha5 = item.Fecha5,
                             Fecha6 = item.Fecha6,
                             Prioridad = item.Prioridad.GetValueOrDefault(),
                             Modificado = false,
                             RowOk = true
                        });
                    }
                    return listaFechasSpool;
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