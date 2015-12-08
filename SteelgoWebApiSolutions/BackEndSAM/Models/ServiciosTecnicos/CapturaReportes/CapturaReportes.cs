using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BackEndSAM.Models.ServiciosTecnicos.CapturaReportes
{
    public class CapturaReportes
    {
        public string TipoPrueba { get; set; }
        public string Requisicion { get; set; }
        public string HerramientaPrueba { get; set; }
        public string TurnoLaboral { get; set; }


    }


    public class CapturaReporteDetalles
    {
        public string RequisicionPruebaElementoID { get; set; }
        public string SpoolJunta { get; set; }
        public string NumeroPlacas { get; set; }
        public string Tamano { get; set; }
        public string Densidad { get; set; }
        public List<DetallePruebas> DetallePruebas { get; set; }

    }

    public class DetallePruebas
    {
        public int PruebaElementoResultadoID { get; set; }
        public string Ubicacion { get; set; }
        public string Resultado { get; set; }
        public List<DetalleDefectos> DetalleDefectos { get; set; }

    }

    public class DetalleDefectos
    {
        public int idDetalleDefecto { get; set; }
        public string Defecto { get; set; }
        public string Inicio { get; set; }
        public string Fin { get; set; }
        public List<CatalogoDefectos> CatalogoDefectos { get; set; }
    }

    public class CatalogoDefectos
    {
        public int DefectoID { get; set; }
        public string Nombre { get; set; }

    }

}
