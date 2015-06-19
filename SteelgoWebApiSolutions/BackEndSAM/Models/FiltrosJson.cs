using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BackEndSAM.Models
{
    public class FiltrosJson
    {
        public string FolioLlegadaID { get; set; }
        public string FolioAvisoLlegadaID { get; set; }
        public List<PatioAV> Patio { get; set; }
        public List<ProyectosAV> Proyectos { get; set; }
        public List<ProveedorAV> Proveedor { get; set; }
        public string FechaInicial { get; set; }
        public string FechaFinal { get; set; }
        public string token { get; set; }

        public FiltrosJson()
        {
            Patio = new List<PatioAV>();
            Proyectos = new List<ProyectosAV>();
            Proveedor = new List<ProveedorAV>();
        }
    }
}