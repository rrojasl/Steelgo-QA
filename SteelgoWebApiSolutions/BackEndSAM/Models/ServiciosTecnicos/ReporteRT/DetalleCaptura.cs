using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.ServiciosTecnicos.ReporteRT
{
    public class DetalleCaptura
    {
        public int ReporteRTID { get; set; }
        public int RequisicionID { get; set; }
        public int OrdenTrabajoID { get; set; }
        public int SpoolID { get; set; }
        public int JuntaSpoolID { get; set; }
        public decimal? Tamano { get; set; }
        public decimal? Densidad { get; set; }
        public int ResultadoConciliacionID { get; set; }
        public int RazonNoConciliacionID { get; set; }
        public int Accion { get; set; }
        public int Estatus { get; set; }

        public int SpoolJunta { get; set; }
        public int Junta { get; set; }
        public string EtiquetaJunta { get; set; }
        public string ClasificacionPND { get; set; }
        public string TipoPrueba { get; set; }
        public string Observaciones { get; set; }
        public string CodigoAsme { get; set; }
        public int? NumeroPlacas { get; set; }
        public List<InformacionResultados> InformacionResultados { get; set; }

        public string NumeroControl { get; set; }

        public string ResultadoConciliacion { get; set; }

        public string RazonNoConciliacion { get; set; }

        public string Origen { get; set; }

    }

}