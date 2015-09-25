using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models
{
    public class LstDespacho
    {
        public string NumeroControl { get; set; }
        public string NumeroEtiqueta { get; set; }
        public string ItemCode { get; set; }
        public int Cantidad { get; set; }
        public string Descripcion { get; set; }
        public string NumeroUnico { get; set; }
        public string FechaDespacho { get; set; }
    }

    public class LstGenerarDespacho
    {
        public string NumeroControl { get; set; }
        public string ItemCode { get; set; }
        public string Descripcion { get; set; }
        public string NumeroUnico { get; set; }
        public string Etiqueta { get; set; }
        public string Baston { get; set; }
        public string ProyectoID { get; set; }
    }

}