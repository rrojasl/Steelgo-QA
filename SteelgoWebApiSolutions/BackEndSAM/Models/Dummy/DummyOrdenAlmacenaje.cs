using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models
{
    public class DummyOrdenAlmacenaje
    {
        public string FechaOrdenAlmacenaje { get; set; }
        public string OrdenAlmacenaje { get; set; }
        public List<PackingListCuantificacion> FolioCuantificacion { get; set; }
    }

    public class PackingListCuantificacion
    {
        public string OrdenAlmacenaje { get; set; }
        public string FolioCuantificacion { get; set; }
        public List<ElementoItemCodeGenerarOrdenAlmacenaje> ItemCodes { get; set; }
       
    }
    public class ElementoItemCodeGenerarOrdenAlmacenaje
    {
        public string FolioCuantificacion { get; set; }
        public string OrdenAlmacenaje { get; set; }
        public string ItemCodeID { get; set; }
        public string Codigo { get; set; }
        public string NumeroUnico { get; set; }
    }

    
    
    public class DummyFolioCuantificacion 
    {
        public string FolioCuantificacion { get; set; }
        public List<ElementoCuantificacionItemCode> ItemCodes { get; set; }
    }

    public class ElementoCuantificacionItemCode
    {
        public string FolioCuantificacion { get; set; }
        public string ItemCodeID { get; set; }
        public string Codigo { get; set; }
        public string Descripcion { get; set; }
        public string D1 { get; set; }
        public string D2 { get; set; }
        public string Cantidad { get; set; }
        public List<ElementoNumeroUnico> NumerosUnicos { get; set; }
    }

    public class ElementoNumeroUnico
    {
        public string FolioCuantificacion { get; set; }
        public string ItemCodeID { get; set; }
        public string NumeroUnicoID { get; set; }
        public string NumeroUnico { get; set; }
    }
}