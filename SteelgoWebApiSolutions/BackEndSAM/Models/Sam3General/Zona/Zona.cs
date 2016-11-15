using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Sam3General.Zona
{
    public class ZonaObject
    {
        public ZonaObject(){
            ZonaID = 0;
            Nombre = "";
        }
        public int ZonaID { get; set; }
        public string Nombre { get; set; }
    }
}