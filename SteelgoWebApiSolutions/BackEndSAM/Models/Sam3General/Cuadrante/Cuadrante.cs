using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Sam3General.Cuadrante
{
    public class CuadranteObject
    {
        public CuadranteObject()
        {
            CuadranteID = 0;
            Nombre = "";
            ZonaID = 0; 
        }
        public int CuadranteID { get; set; }
        public string Nombre { get; set; }
        public int ZonaID { get; set; }
        
    }
}