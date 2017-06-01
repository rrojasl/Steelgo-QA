using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Pintura.PruebasPorLote
{
    
    public class ProcesosPintura
    {
        public int ProcesoID { get; set; }
        public string Nombre { get; set; }

        public ProcesosPintura()
        {
            this.ProcesoID = 0;
            this.Nombre = "";
        }
    }
    public class SistemaPinturaLotes
    {
        public int SistemaPinturaID { get; set; }
        public string Nombre { get; set; }

        public SistemaPinturaLotes()
        {
            this.SistemaPinturaID = 0;
            this.Nombre = "";
        }
    }
    public class Prueba
    {
        public int PruebaID { get; set; }
        public string Nombre { get; set; }

        public Prueba()
        {
            this.PruebaID = 0;
            this.Nombre = "";
        }
    }
}