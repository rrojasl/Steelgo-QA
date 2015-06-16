using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models
{
    public class FiltrosJson
    {
        public int FolioLlegadaID { get; set; }
        public int FolioAvisoLlegadaID { get; set; }
        public List<Patio> Patio { get; set; }
        public List<ProyectosAV> Proyectos { get; set; }
        public List<Proveedor> Proveedor { get; set; }
        public DateTime FechaInicial { get; set; }
        public DateTime FechaFinal { get; set; }

        public FiltrosJson()
        {
            Patio = new List<Patio>();
            Proyectos = new List<ProyectosAV>();
            Proveedor = new List<Proveedor>();
        }
    }
}