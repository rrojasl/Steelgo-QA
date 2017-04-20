using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Pintura.DescargaCarro
{
    public class DescargaCarro
    {
    }

    public class DetalleCarro
    {
        public int Accion { get; set; }
        public string NombreSpool { get; set; }
        public string SistemaPintura { get; set; }
        public string Color { get; set; }
        public string M2 { get; set; }
        public int CuadranteID { get; set; }
        public string NombreCuadrante { get; set; }
    }
}