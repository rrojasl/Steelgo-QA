using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models
{
    public class Deficit
    {
        public string ItemCodeID { get; set; }
        public string ItemCode { get; set; }
        public string Diametro1 { get; set; }
        public string Diametro2 { get; set; }
        public string Cantidad { get; set; }
    }

    public class DiametrosItemCode
    {
        public string Diametro1 { get; set; }
        public string Diametro2 { get; set; }
    }
}