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
        public string PatioID { get; set; }
        public string ClienteID { get; set; }
        public string FechaInicial { get; set; }
        public string FechaFinal { get; set; }
        public string token { get; set; }
        public bool Creados { get; set; }
        public bool SinPermiso { get; set; }
        public bool SinAutorizacion { get; set; }
        public bool Completos { get; set; }
        public string TipoListado { get; set; }
        public string ParametroBusqueda { get; set; } 
    }
}