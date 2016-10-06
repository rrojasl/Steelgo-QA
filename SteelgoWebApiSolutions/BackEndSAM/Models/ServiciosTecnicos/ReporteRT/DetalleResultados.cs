using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.ServiciosTecnicos.ReporteRT
{
    public class DetalleResultados
    {
        public int ResultadosDefectoID { get; set; }
        public int ReporteResultadosID { get; set; }
        public int OrdenTrabajoID { get; set; }
        public int SpoolID { get; set; }
        public int JuntaSpoolID { get; set; }

        public int DefectoID { get; set; }
        public int InicioMM { get; set; }
        public int FinMM { get; set; }
        public int Accion { get; set; }

    }

    public class DetalleResultadosDefectos
    {
        public int OrdenTrabajoID { get; set; }
        public int SpoolID { get; set; }
        public int JuntaSpoolID { get; set; }
        public int? DefectoID { get; set; }
        public string Defecto { get; set; }
        public decimal? InicioMM { get; set; }
        public decimal? FinMM { get; set; }
        public int Accion { get; set; }
        public int Posicion { get; set; }
        public string Ubicacion { get; set; }
    }

    public class Defectos
    {
        public int? DefectoID { get; set; }
        public string Defecto { get; set; }

        public Defectos()
        {
            DefectoID = 0;
            Defecto = "";
        }
    }
}