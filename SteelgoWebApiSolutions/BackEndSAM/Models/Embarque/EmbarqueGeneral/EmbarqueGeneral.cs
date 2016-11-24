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
            CargaPlanaID = 0;
            StatusCarga = false;
            ProyectoID = 0;
        }
        public int PlanaID { get; set; }
        public string Nombre { get; set; }
        public int CargaPlanaID { get; set; }
        public bool StatusCarga { get; set; }
        public int ProyectoID { get; set; }
    }
}