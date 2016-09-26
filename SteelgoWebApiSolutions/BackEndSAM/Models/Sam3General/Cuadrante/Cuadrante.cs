using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Sam3General.Cuadrante
{
    public class Cuadrante
    {
        public int CuadranteID { get; set; }
        public string Nombre { get; set; }
        public Nullable<int> AreaID { get; set; }
        public Nullable<int> PatioID { get; set; }
    }
}