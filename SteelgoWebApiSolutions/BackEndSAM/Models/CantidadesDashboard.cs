using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models
{
    public class CantidadesDashboard
    {
        public int Creados { get; set; }
        public int SinPermiso { get; set; }
        public int Completos { get; set; }
        public int SinAutorizacion { get; set; }
    }
}