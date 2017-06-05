using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Dynasol
{
    public class PackingList
    {
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
            public int CantC { get; set; }
            public int CantG { get; set; }
            public int CantS { get; set; }
            public int ColadaID { get; set; }
            public string Colada { get; set; } 
            public int CantPL { get; set; }   
            public bool Agregar { get; set; }
            public bool RowOk { get; set; }
        }
        public class CapturaDetallePL
        {
            public List<CapturaPL> Detalles { get; set; }
        }
        public class CapturaPL
        {
            public int Accion { get; set; }
            public int DetallePackingList { get; set; }
            public int OrdenCompraID { get; set; }
            public int PackingListID { get; set; }
            public int ColadaID { get; set; }
            public float Cant { get; set; }
            public bool RowOk { get; set; }
            public CapturaPL()
            {
                Accion = 0;
                DetallePackingList = 0;
                OrdenCompraID = 0;
                PackingListID = 0;
                ColadaID = 0;
                Cant = 0;
                RowOk = true;
            }
        }
    }
}