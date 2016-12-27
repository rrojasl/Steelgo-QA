using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.Pintura.AdminReductores
{
    public class AdminReductoresBD
    {
        private static readonly object _mutex = new object();

        private static AdminReductoresBD _instance;

        public static AdminReductoresBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new AdminReductoresBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerIDOrdenTrabajo(Sam3_Usuario usuario, string ordentrabajo, int tipo, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Steelgo_Get_SpoolID_Result> lista = ctx.Sam3_Steelgo_Get_SpoolID(tipo, ordentrabajo, lenguaje).ToList();
                    return lista;

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