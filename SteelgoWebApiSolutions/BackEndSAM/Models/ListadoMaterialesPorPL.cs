using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models
{
    public class ListadoMaterialesPorPL
    {
        public string NumeroUnico { get; set; }
        public string ItemCode { get; set; }
        public string ItemCodeSteelgo { get; set; }
        public string Descripcion { get; set; }
        public string Cedula { get; set; }
        public string TipoAcero { get; set; }
        public string D1 { get; set; }
        public string D2 { get; set; }
        public string RangoInferior { get; set; }
        public string RangoSuperior { get; set; }
        public string Cantidad { get; set; }
        public string Colada { get; set; }
        public string EstatusFisico { get; set; }
        public string EstatusDocumental { get; set; }
        public string AlmacenVirtual { get; set; }
    }
}