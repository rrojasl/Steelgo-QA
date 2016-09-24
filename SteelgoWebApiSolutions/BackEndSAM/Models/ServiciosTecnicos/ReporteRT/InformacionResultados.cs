using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.ServiciosTecnicos.ReporteRT
{
    public class DetallePorPlacas
    {
        public int ReporteRTResultadosID { get; set; }
        public int ReporteRTID { get; set; }
        public int OrdenTrabajoID { get; set; }
        public int SpoolID { get; set; }
        public int JuntaSpoolID { get; set; }
        public string Ubicacion { get; set; }
        public int? ResultadoID { get; set; }
        public string Resultado { get; set; }
        public int Accion { get; set; }

        public int SpoolJunta { get; set; }
        public int Junta { get; set; }
        public int EtiquetaJunta { get; set; }
        public int NumeroControl { get; set; }
        public List<DetalleResultadosDefectos> ListaDetalleDefectos { get; set; }
        public List<Resultados> ListaResultados { get; set; }

        public List<Defectos> ListaDefectos { get; set; }
    }


    public class Resultados
    {
        public int? ResultadosID { get; set; }
        public string Resultado { get; set; }

        public Resultados()
        {
            ResultadosID = null;
            Resultado = "";
        }
    }
}