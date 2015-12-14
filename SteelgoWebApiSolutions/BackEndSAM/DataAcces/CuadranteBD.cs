using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces
{
    public class CuadranteBD
    {

        private static readonly object _mutex = new object();
        private static CuadranteBD _instance;

        public static CuadranteBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new CuadranteBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerCuadrante(int areaID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Steelgo_Get_Cuadrante_Result> result = ctx.Sam3_Steelgo_Get_Cuadrante(areaID).ToList();
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