using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models
{
    public class ElementoListadoFolioAvisoLlegada
    {
        public string FolioAvisoLlegadaID { get; set; }
        //public string Patio { get; set; }
        //public string NombreProyecto { get; set; }
        //public string Transportista { get; set; }
        public string FechaRecepcion { get; set; } // Fecha estimada
        //public string Estatus { get; set; }
        public string FechaGeneracion { get; set; } // Fecha Generacion
        //public string FechaAutorizacion { get; set; }
        //public bool TienePaseSalida { get; set; }
    }
}