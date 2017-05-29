using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.Dynasol
{
    public class PackingListBD
    {
        private static readonly object _mutex = new object();
        private static PackingListBD _instance;

        public static PackingListBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new PackingListBD();
                    }
                }
                return _instance;
            }
        }
    }
}