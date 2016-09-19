using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.Sam3General.Dashboard
{
    public class DashboardBD
    {
        private static readonly object _mutex = new Object();
        private static DashboardBD _instance;

        public static DashboardBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new DashboardBD();
                    }
                }

                return _instance;
            }
        }

        public object ObtieneHeaderDashBoard(int modulo, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Get_EstatusPorModulo_Result> result = ctx.Sam3_Get_EstatusPorModulo(modulo, lenguaje).ToList();

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

        public object ObtenerInformacionGrid(int requisicionID, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    
                    return new object();
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