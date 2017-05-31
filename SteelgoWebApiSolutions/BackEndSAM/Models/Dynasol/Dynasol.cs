using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Dynasol
{
    public class Dynasol
    {
        public class OrdenCompraClass
        {
            public int OrdenCompraID { get; set; }
            public string Nombre { get; set; }

            public OrdenCompraClass()
            {
                OrdenCompraID = 0;
                Nombre = "";
            }
        }

        public class InspeccionClass
        {
            public int InspeccionID { get; set; }
            public string Nombre { get; set; }

            public InspeccionClass()
            {
                InspeccionID = 0;
                Nombre = "";
            }
        }

        public class RevisionClass
        {
            public int Accion { get; set; }
            public int RevisionID { get; set; }
            public int OrdenCompraID { get; set; }
            public string Rev { get; set; }
            public string Descripcion { get; set; }
            public string MaterialNorma { get; set; }
            public float Diametro1 { get; set; }
            public float Diametro2 { get; set; }
            public string Schedule { get; set; }
            public string Rating { get; set; }
            public string PreparacionExtremos { get; set; }
            public int Cant { get; set; }
            public decimal PrecioUnidad { get; set; }
            public decimal Total { get; set; }
            public string Partida { get; set; }
            public List<ColadaClass> ListaDetalleColadas { get; set; }
            public List<InspeccionClass> ListaInspeccion { get; set; }
            public bool RowOk { get; set; }
        }
        public class ColadaClass
        {
            public int Accion { get; set; }
            public int ColadaID { get; set; }
            public string Colada { get; set; }
            public int RevisionID { get; set; }
            public int DetalleInspeccionID { get; set; }
            public string InspeccionDetalle { get; set; }
            public string Comentario { get; set; }
            public int Cant { get; set; }
            public int CantG { get; set; }
            public string FechaRecibido { get; set; }
            public int Camion { get; set; }
            public string FacturaProveedor { get; set; }
            public string FechaFactura { get; set; }
            public string Acuerdo { get; set; }
            public string FechaEnvio { get; set; }
            public int Pedimento { get; set; }
            public string ShippingDate { get; set; }
            public int CantS { get; set; }
            public string FechaRecibidoSteelgo { get; set; }
            public int InspeccionSteelgo { get; set; }
            public List<DetalleInspeccionClass> ListaDetalleInspeccion { get; set; }
            
        }

        public class DetalleInspeccionClass
        {
            public int Accion { get; set; }
            public int DetalleInspeccionID { get; set; }
            public int InspeccionID { get; set; }
            public int ColadaID { get; set; }
            public string Inspeccion { get; set; }
            public string Comentario { get; set; }
        }

        public class Captura
        {
            public List<JsonCapturaRevision> Detalles { get; set; }
        }

        public class JsonCapturaRevision
        {
            public int Accion { get; set; }
            public int RevisionID { get; set; }
            public string Partida { get; set; }
            public List<ListaGuardarColadas> ListaColadas { get; set; }
            public List<ListaGuardarDetalleInspeccion> ListaDetalleInspeccion { get; set; }
        }

        public class ListaGuardarColadas
        {
            public int Accion { get; set; }
            public int RevisionID { get; set; }
            public int ColadaID { get; set; }
            public string Nombre { get; set; }
            public int CantidadC { get; set; }
            public int CantidadG { get; set; }
            public string FechaRecibido { get; set; }
            public int Camion { get; set; }
            public string FacturaProveedor { get; set; }
            public string FechaFactura { get; set; }
            public string Acuerdo { get; set; }
            public string FechaEnvio { get; set; }
            public int Pedimento { get; set; }
            public string ShippingDate { get; set; }
            public int CantidadS { get; set; }
            public string FechaRecibidoSteelgo { get; set; }
            public int InspeccionSteelgo { get; set; }
        }

        public class ListaGuardarDetalleInspeccion
        {
            public int Accion { get; set; }
            public int DetalleInspeccion { get; set; }
            public int RevisionID { get; set; }
            public string NombreColada { get; set; }
            public int InspeccionID { get; set; }
            public string Comentario { get; set; }
        }
    }
}