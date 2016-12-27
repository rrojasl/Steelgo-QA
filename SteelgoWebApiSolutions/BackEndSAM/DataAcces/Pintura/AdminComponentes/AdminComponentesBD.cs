using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.Pintura.AdminComponentes
{
    public class AdminComponentesBD
    {

        private static readonly object _mutex = new object();

        private static AdminComponentesBD _instance;

        public static AdminComponentesBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new AdminComponentesBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerDetalleGrid( string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Pintura_AdminComponentes_Get_Detalle_Result> lista = ctx.Sam3_Pintura_AdminComponentes_Get_Detalle(lenguaje).ToList();
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