using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models
{
    public class ListadoCamposPredeterminados
    {
        public string id_CampoPredeterminado { get; set; }
        public string NombreDelCampo { get; set; }
        public string pagina { get; set; }
        public string TipoDelCampo { get; set; }
        public string ValorPorDefecto { get; set; }
    }
}