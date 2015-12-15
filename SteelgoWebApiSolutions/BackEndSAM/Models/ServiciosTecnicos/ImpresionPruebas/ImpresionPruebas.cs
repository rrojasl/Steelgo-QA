using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.ServiciosTecnicos.ImpresionPruebas
{
    public class ImpresionPruebas
    {
        public int RequisicionPruebaElementoID { get; set; }
        public string SpoolJunta { get; set; }
        public int NumeroPruebas { get; set; }
        public string Clave { get; set; }
        public string Nombre { get; set; }
        public string ReporteID { get; set; }
        public bool Seleccionado { get; set; }
        public string Status { get; set; }
        public string ReportePath { get; set; }

    }

    public class Captura
    {
        public List<GenerarFolioImpresionPruebas> Detalles { get; set; }
    }

    public class GenerarFolioImpresionPruebas
    {
        public int RequisicionPruebaElementoID { get; set; }
        public string ReporteID { get; set; }
        
    }
}