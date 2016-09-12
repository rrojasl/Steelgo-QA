using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.ServiciosTecnicos.ReporteRT
{
    public class InformacionResultados
    {
        public int SpoolJunta { get; set; }
        public int Junta { get; set; }
        public int EtiquetaJunta { get; set; }
        public int NumeroControl { get; set; }
        public string Ubicacion { get; set; }
        public int Resultado { get; set; }
        public List<DetalleResultados> DetalleResultados { get; set; }
}
}