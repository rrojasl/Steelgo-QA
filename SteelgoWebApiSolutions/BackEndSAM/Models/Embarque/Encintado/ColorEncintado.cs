using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Embarque.Encintado
{
    public class ColorEncintado
    {
        public ColorEncintado()
        {
            ColorID = 0;
            Nombre = "";
        }
        public int ColorID { get; set; }
        public string Nombre { get; set; }
        
    }
}