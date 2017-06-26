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
        public string NumeroControl { get; set; }
        public string OKPND { get; set; }
    }

    public class ElementosMasivoResult
    {
        public string NumeroControl { get; set; }
        public string OKPND { get; set; }
        public string Actualizado { get; set; }
    }
}