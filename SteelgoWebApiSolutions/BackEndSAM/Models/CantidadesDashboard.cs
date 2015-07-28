﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models
{
    public class CantidadesDashboard
    {
        public int Creados { get; set; }
        public int SinPermiso { get; set; }
        public int Completos { get; set; }
        public int SinAutorizacion { get; set; }
        public decimal PorcentajeCompletos { get; set; }
        public decimal PorcentajeSinPermiso { get; set; }
        public decimal ProcentajeSinAutorizacion { get; set; }
    }

    public class CantidadesDashboardAvisoEntrada
    {
        public int TotalCreados { get; set; }
        public int SinEstaus { get; set; }
        public int SinOrdenDescarga { get; set; }
        public int SinPaseSalida { get; set; }
        public decimal PorcentajeSinEstatus { get; set; }
        public decimal PorcentajeSinDescarga { get; set; }
        public decimal PorcentajeSinPaseSalida { get; set; }
    }
}