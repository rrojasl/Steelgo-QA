using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DatabaseManager.Sam3;
using BackEndSAM.Models;
using SecurityManager.Api.Models;

namespace BackEndSAM.DataAcces
{
    public class IncidenciaBd
    {
         private static readonly object _mutex = new object();
        private static IncidenciaBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private IncidenciaBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static IncidenciaBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new IncidenciaBd();
                    }
                }
                return _instance;
            }
        }

        
    }
}