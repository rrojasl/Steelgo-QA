using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Cors;

namespace BackEndSAM.DataAcces
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ListadoMaterialesPorItemCodeBd
    {
        private static readonly object _mutex = new object();
        private static ListadoMaterialesPorItemCodeBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private ListadoMaterialesPorItemCodeBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static ListadoMaterialesPorItemCodeBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new ListadoMaterialesPorItemCodeBd();
                    }
                }
                return _instance;
            }
        }

        //public object obtenerListadoPorItemCode()
        //{
        //    try
        //    {
        //        using (SamContext ctx = new SamContext())
        //        {
                    
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        TransactionalInformation result = new TransactionalInformation();
        //        result.ReturnMessage.Add(ex.Message);
        //        result.ReturnCode = 500;
        //        result.ReturnStatus = false;
        //        result.IsAuthenicated = true;

        //        return result;
        //    }
        //}
    }
}