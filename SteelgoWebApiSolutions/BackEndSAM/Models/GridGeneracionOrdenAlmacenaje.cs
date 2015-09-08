using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models
{
    public class GridGeneracionOrdenAlmacenaje
    {
        public int ItemCode { get; set; }
        public string Descripcion { get; set; }
        public decimal? D1 { get; set; }
        public decimal? D2 { get; set; }
        public List<int> NumeroUnico { get; set; }
        public int? Cantidad { get; set; }
        public string PackingList { get; set; }
    }

    public class ListadoOrdenAlmacenajeJson
    {
        public string FechaOrdenAlmacenaje { get; set; }
        public string OrdenAlmacenaje { get; set; }
        public List<ItemCodeListadoAlmacenaje> ItemCodes { get; set; }

        public ListadoOrdenAlmacenajeJson()
        {
            ItemCodes = new List<ItemCodeListadoAlmacenaje>();
        }
    }

    public class ItemCodeListadoAlmacenaje
    {
        public string ItemCode { get; set; }
        public List<string> NumeroUnico { get; set; }

        public ItemCodeListadoAlmacenaje()
        {
            NumeroUnico = new List<string>();
        }
    }
}