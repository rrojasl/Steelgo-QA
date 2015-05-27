using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models
{
    public class AvisoLlegada
    {
        public int FolioAvisoLlegadaID { get; set; }
        public List<Proyecto> Proyectos { get; set; }
        public string Factura { get; set; }
        public int TransportistaID { get; set; }
        public DateTime FechaRecepcion { get; set; }
        public int ProveedorID { get; set; }
        public int NumeroPlana { get; set; }
        public string OrdenCompra { get; set; }
        public int PatioID { get; set; }
        public int ChoferID { get; set; }
        public List<Files> Archivos { get; set; }
    }
}