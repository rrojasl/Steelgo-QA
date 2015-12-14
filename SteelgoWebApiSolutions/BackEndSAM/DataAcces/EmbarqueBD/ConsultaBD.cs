using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.EmbarqueBD
{
    public class ConsultaBD
    {
        private static readonly object _mutex = new object();
        private static ConsultaBD _instance;

        public static ConsultaBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new ConsultaBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerDatosConsulta(int areaID, int cuadranteID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Embarque_Get_Consulta_Result> result = ctx.Sam3_Embarque_Get_Consulta(areaID, cuadranteID).ToList();
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