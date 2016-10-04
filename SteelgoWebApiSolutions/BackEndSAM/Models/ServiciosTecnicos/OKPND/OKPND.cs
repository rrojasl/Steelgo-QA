using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.ServiciosTecnicos.OKPND
{
    public class Elementos
    {
        public Elementos()
        {
            NumeroControl = "";
            Cuadrante = "";
            Prioridad = 0;
            Estatus = "";
            ProyectoID = 0;
            SpoolID = 0;
            OrdenTrabajoSpoolID = 0;
            OkPND = 0;
        }

        public string NumeroControl { get; set; }
        public string Cuadrante { get; set; }
        public int Prioridad { get; set; }
        public string Estatus { get; set; }

        
        public int SpoolID { get; set; }
        public int ProyectoID { get; set; }
        public int OrdenTrabajoSpoolID { get; set; }
        public int OkPND { get; set; }
    }
}