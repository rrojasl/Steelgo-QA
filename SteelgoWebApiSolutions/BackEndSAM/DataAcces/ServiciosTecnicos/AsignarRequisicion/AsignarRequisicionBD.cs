using BackEndSAM.Models.ServiciosTecnicos.AsignarRequisicion;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.ServiciosTecnicos
{
    public class AsignarRequisicionBD
    {
        private static readonly object _mutex = new object();
        private static AsignarRequisicionBD _instance;

        public static AsignarRequisicionBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new AsignarRequisicionBD();
                    }
                }
                return _instance;
            }
        }

      
    }
}   