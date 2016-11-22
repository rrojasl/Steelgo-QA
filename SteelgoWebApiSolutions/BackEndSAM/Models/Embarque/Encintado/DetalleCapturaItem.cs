using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Embarque.Encintado
{
    public class DetalleCapturaItem
    {
        
            public int Accion { get; set; }
            public int EncintadoID { get; set; }
            public int SpoolID { get; set; }
            public bool Encintado { get; set; }
            public int ColorID { get; set; }
            
    }
}