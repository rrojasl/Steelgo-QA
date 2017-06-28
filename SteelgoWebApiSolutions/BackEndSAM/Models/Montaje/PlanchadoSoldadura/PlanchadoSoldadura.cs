using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Montaje.PlanchadoSoldadura
{
    public class CapturaMasiva
    {
        public string Detalle { get; set; }
    }
    public class ListaElementosMasivo
    {
        public List<ElementosMasivo> Elementos;
    }

    public class ElementosMasivo
    {
        public int JuntaSpoolid { get; set; }
        public string FechaEntregaReporteArmado { get; set; }
        public string FechadeArmado { get; set; }
        public string ClaveTubero { get; set; }
        public string FechaEntregaReporteSoldadura { get; set; }
        public string FechaSoldadura { get; set; }
        public string ClaveSoldador1 { get; set; }
        public string ClaveSoldador2 { get; set; }
        public string Wps { get; set; }
        public string Proceso { get; set; }
        public string Material1 { get; set; }
        public string Material2 { get; set; }
        public string LiberacionArmado { get; set; }
        public string FechaLiberacionArmado { get; set; }
        public string LiberacionDimensional { get; set; }
        public string FechaLiberacionDimensional { get; set; }
        public string LiberacionVisual { get; set; }
        public string FechaLiberacionVisual { get; set; }
        public string Repetido { get; set; }
    }

    public class ElementosMasivoResult
    {
        public int JuntaSpoolid { get; set; }
        public string FechaEntregaReporteArmado { get; set; }
        public string FechadeArmado { get; set; }
        public string ClaveTubero { get; set; }
        public string FechaEntregaReporteSoldadura { get; set; }
        public string FechaSoldadura { get; set; }
        public string ClaveSoldador1 { get; set; }
        public string ClaveSoldador2 { get; set; }
        public string Wps { get; set; }
        public string Proceso { get; set; }
        public string Material1 { get; set; }
        public string Material2 { get; set; }
        public string LiberacionArmado { get; set; }
        public string FechaLiberacionArmado { get; set; }
        public string LiberacionDimensional { get; set; }
        public string FechaLiberacionDimensional { get; set; }
        public string LiberacionVisual { get; set; }
        public string FechaLiberacionVisual { get; set; }
        public string Repetido { get; set; }
    }
}