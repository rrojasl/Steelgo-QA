using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.FechasSpool
{
    public class FechasSpool
    {
        public bool Modificado { get; set; }
        public bool RowOk { get; set; }
        public int Accion { get; set; }
        public int ProyectoID { get; set; }
        public string Proyecto { get; set; }
        public int SpoolID { get; set; }
        public string NumeroControl { get; set; }
        public string Cuadrante { get; set; }
        public int Prioridad { get; set; }
        public decimal Diametro { get; set; }
        public decimal Area { get; set; }
        public string Cedula { get; set; }
        public bool Fecha1 { get; set; }
        public bool Fecha2 { get; set; }
        public bool Fecha3 { get; set; }
        public bool Fecha4 { get; set; }
        public bool Fecha5 { get; set; }
        public bool Fecha6 { get; set; }
    }
}