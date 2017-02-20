using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.Sam3General.Secuencias
{
    public class SecuenciasBD
    {
        private static readonly object _mutex = new object();
        private static SecuenciasBD _instance;

        public static SecuenciasBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new SecuenciasBD();
                    }
                }
                return _instance;
            }
        }
    }
}