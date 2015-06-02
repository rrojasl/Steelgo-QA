using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models
{
    public class EdicionLlegadaMaterial
    {
        public int FolioLlegadaID { get; set; }
        public int FolioAvisoLlegadaID { get; set; }
        public Proyecto Proyecto { get; set; }
        public string Estatus { get; set; }
        public Patio Patio { get; set; }
        public List<Files> Archivos { get; set; }
    }
}