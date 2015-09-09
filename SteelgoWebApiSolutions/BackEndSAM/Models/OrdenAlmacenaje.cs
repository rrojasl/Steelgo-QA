using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models
{
    public class OrdenAlmacenaje
    {
      

            public string FolioCuantificacion { get; set; }
            public string ItemCodeID { get; set; }
            public string Codigo { get; set; }
            public string Descripcion { get; set; }
            public string D1 { get; set; }
            public string D2 { get; set; }
            public string Cantidad { get; set; }
            public List<int> NumerosUnicos { get; set; }
     

    }
}