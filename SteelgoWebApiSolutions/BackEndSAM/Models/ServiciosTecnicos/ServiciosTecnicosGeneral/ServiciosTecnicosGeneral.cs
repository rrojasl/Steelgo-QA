using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.ServiciosTecnicos.ServiciosTecnicosGeneral
{
    public class TiposDePrueba {
        public TiposDePrueba() {
            TipoPruebaID = 0;
            Nombre = "";
            Categoria = "";
            TipoPruebaPorSpool = 0;
        }

        public int TipoPruebaID { get; set; }
        public string Nombre { get; set; }
        public string Categoria { get; set; }
        public int TipoPruebaPorSpool { get; set; }
    }
}