using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models
{
    public class ListadoFolioAvisoLlegada
    {
        public int FolioAvisoLlegadaID { get; set; }
        public string NombreProyecto { get; set; }
        public DateTime FechaRecepcion { get; set; }
    }
}