using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Dynasol
{
    public class Dynasol
    {
        public  class OrdenCompraClass
        {
            public int OrdenCompraID { get; set; }
            public string Nombre { get; set; }
        }

        public class InspeccionClass
        {
            public int InspeccionID { get; set; }
            public string Nombre { get; set; }
        }

        public class RevisionClass
        {
            public int RevisionID { get; set; }
            public int OrdenCompraID { get; set; }
            public string Revision { get; set; }
            public string Descripcion { get; set; }
            public string MaterialNorma { get; set; }
            public float Diametro1 { get; set; }
            public float Diametro2 { get; set; }
            public string Shedule { get; set; }
            public string Rating { get; set; }
            public string PrepExt { get; set; }
            public int Cantidad { get; set; }
            public decimal PrecioUnidad { get; set; }
            public decimal Total { get; set; }
            public string Partida { get; set; }                
        }

        public class ColadaClass
        {
            public int ColadaID { get; set; }
            public int RevisionID { get; set; }
            public int CantidadC { get; set; }
            public int CantidadG { get; set; }
            public DateTime FechaRecibido { get; set; }
            public int Camion { get; set; }
            public string FacturaProveedor { get; set; }
            public DateTime FechaFactura { get; set; }
            public string Acuerdo { get; set; }
            public DateTime FechaEnvio { get; set; }
            public int Pedimento { get; set; }
            public DateTime ShippingDate { get; set; }
            public int CantidadS { get; set; }
            public DateTime FechaRecibidoSteelgo { get; set; }
            public int InspeccionSteelgo { get; set; }
        }

        public class DetalleInspeccionClass
        {
            public int DetalleInspeccionID { get; set; }
            public int InspeccionID { get; set; }
            public int ColadaID { get; set; }
            public string Comentario { get; set; }
        }
    }
}