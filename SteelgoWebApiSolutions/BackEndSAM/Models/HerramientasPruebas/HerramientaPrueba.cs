using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.HerramientasPruebas
{
    public class HerramientaPrueba
    {
        public int HerramientaDePruebaID { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Modelo { get; set; }
    }
}