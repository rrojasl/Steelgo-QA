using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.Dynasol
{
    public class DynasolBD
    {
        private static readonly object _mutex = new object();
        private static DynasolBD _instance;

        public static DynasolBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new DynasolBD();
                    }
                }
                return _instance;
            }
        }
    }
}
