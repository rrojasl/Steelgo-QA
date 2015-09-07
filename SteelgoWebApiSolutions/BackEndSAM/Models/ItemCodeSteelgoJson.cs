using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models
{
    public class ItemCodeSteelgoJson
    {
        public int ItemCodeSteelgoID { get; set; }
        public string DescripcionEspanol { get; set; }
        public string DescripcionIngles { get; set; }
        public decimal Peso { get; set; }
        public decimal Diametro1 { get; set; }
        public decimal Diametro2 { get; set; }
        public int FamiliaAceroID { get; set; }
        public int Area { get; set; }
        public string Cedula { get; set; }
        public string Codigo { get; set; }
        public string TipoAcero { get; set; }
    }
}