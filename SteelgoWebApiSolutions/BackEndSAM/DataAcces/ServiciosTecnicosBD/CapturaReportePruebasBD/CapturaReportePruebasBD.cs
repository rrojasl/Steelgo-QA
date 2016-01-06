using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.ServiciosTecnicosBD.CapturaReportePruebasBD
{
    public class CapturaReportePruebasBD
    {
        private static readonly object _mutex = new object();
        private static CapturaReportePruebasBD _instance;


        public static CapturaReportePruebasBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new CapturaReportePruebasBD();
                    }
                }
                return _instance;
            }
        }


        public object getRequisicion(string lenguaje, int requisicionID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ServiciosTecnicos_Get_Requisicion_Result> result = ctx.Sam3_ServiciosTecnicos_Get_Requisicion(lenguaje, requisicionID).ToList();
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

    }
}