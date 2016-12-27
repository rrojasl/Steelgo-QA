﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Pintura.AdminComponentes
{
    public class DetalleGrid
    {
        public int ComponenteID { get; set; }
        public string Componente { get; set; }
        public string Lote { get; set; }
        public int Cantidad { get; set; }
        public string Unidad { get; set; }
        public bool RowOk { get; set; }
        public int Accion { get; set; }
    }

    public class GuardarGrid
    {
        public int ComponenteID { get; set; }
        public string Lote { get; set; }
        public int Cantidad { get; set; }
        public int Accion { get; set; }
    }
}