using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Embarque
{
    public class Consulta
    {
        public string SpoolID { get; set; }
        public string Cuadrante { get; set; }
        public string Paso { get; set; }
        public int AreaID { get; set; }
        public int CuadranteID { get; set; }
    }
}