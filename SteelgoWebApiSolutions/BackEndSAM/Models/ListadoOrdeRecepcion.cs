using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models
{
    public class ListadoOrdeRecepcion
    {
        public string FechaOrdenRecepcion { get; set; }
        public string OrdenRecepcion { get; set; }
        public List<DetalleOrdenRecepcion> Detalle { get; set; }

        public ListadoOrdeRecepcion()
        {
            Detalle = new List<DetalleOrdenRecepcion>();
        }
    }

    public class DetalleOrdenRecepcion
    {
        
        public List<ElementoItemCode> ItemCodes { get; set; }

        public DetalleOrdenRecepcion()
        {
            ItemCodes = new List<ElementoItemCode>();
        }
    }

    public class ElementoItemCode 
    {
        public string AvisoEntrada { get; set; }
        public string Itemcode { get; set; }
        public int Cantidad { get; set; }
    }
}