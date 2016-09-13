using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.ServiciosTecnicos.ReporteRT
{
    public class DetalleReporteRTGuardarJson
    {
        public int Accion { get; set; }
        public int SpoolJunta { get; set; }
        public int Junta { get; set; }
        public int EtiquetaJunta { get; set; }
        public int ClasificacionPND { get; set; }
        public int TipoPrueba { get; set; }
        public string Observaciones { get; set; }
        public string CodigoAsme { get; set; }
        public int NumeroPlacas { get; set; }
        public int Densidad { get; set; }
        public int Tamano { get; set; }
        public string ResultadoConciliacion { get; set; }
        public string RazonNoConciliacion { get; set; }
        public List<InformacionResultados> MiInformacionResultados { get; set; }

    }
}