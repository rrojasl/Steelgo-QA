﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Embarque.PreparacionEmbarque
{
    public class PreparacionEmbarque
    {
    }
        
    public class DetalleAgregarPlana
    {
        public int Accion { get; set; }
        public int EmbarqueID { get; set; }
        public int EmbarqueDetalleID { get; set; }
        public int PlanaID { get; set; }
        public string Nombre { get; set; }
        public int CargaPlanaID { get; set; }
        public bool StatusCarga { get; set; }
        public int CantidadElementos { get; set; }
        public decimal M2 { get; set; }
        public decimal Peso { get; set; }
    }

}
