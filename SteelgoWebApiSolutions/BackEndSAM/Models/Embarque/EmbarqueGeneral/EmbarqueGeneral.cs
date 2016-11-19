using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Embarque.EmbarqueGeneral
{
    public class EmbarqueGeneral
    {
    }

    public class DetallePlana
    {
        public DetallePlana()
        {
            PlanaID = 0;
            Nombre = "";
        }
        public int PlanaID { get; set; }
        public string Nombre { get; set; }
    }

    public class CapturaPlana
    {
        public string Plana { get; set; }
        public int ProveedorID { get; set; }
    }
}