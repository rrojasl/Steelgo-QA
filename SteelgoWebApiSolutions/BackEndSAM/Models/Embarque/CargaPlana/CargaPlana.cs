using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Embarque.CargaPlana
{
    public class DetalleCargaPlana
    {
        public int SpoolID { get; set; }
        public string Spool { get; set; }
        public string Paquete { get; set; }
        public bool ModificadoPorUsuario { get; set; }
    }
}