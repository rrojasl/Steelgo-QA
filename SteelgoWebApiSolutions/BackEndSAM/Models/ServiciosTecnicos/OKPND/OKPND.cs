﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.ServiciosTecnicos.OKPND
{
    public class Elementos
    {
        public Elementos()
        {
            OKPNDID = 0;
            NumeroControl = "";
            Cuadrante = "";
            Prioridad = 0;
            ProyectoID = 0;
            SpoolID = 0;
            OrdenTrabajoSpoolID = 0;
            OkPND = false;
        }

        public int OKPNDID { get; set; }
        public string NumeroControl { get; set; }
        public string Cuadrante { get; set; }
        public int Prioridad { get; set; }

        public int SpoolID { get; set; }
        public int ProyectoID { get; set; }
        public int OrdenTrabajoSpoolID { get; set; }
        public bool OkPND { get; set; }
        public string Detalle { get; set; }
    }

    public class Captura{
        public List<ListaElementos> listaDetalle { get; set; }
    }

    public class ListaElementos {
        public int OKPNDID { get; set; }
        public int SpoolID { get; set; }
        public int OrdenTrabajoSpoolID { get; set; }
        public bool OkPND { get; set; }
    }
}