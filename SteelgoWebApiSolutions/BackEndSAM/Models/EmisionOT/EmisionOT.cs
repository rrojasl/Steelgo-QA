using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.EmisionOT
{
    public class EmisionOT
    {
        public class DetalleProyecciones
        {
            public List<DetalleFamilia> DetalleFamilias { get; set; }
        }

        public class DetalleFamilia
        {
            public int FamiliaID { get; set; }
            public string NombreFamilia { get; set; }

        }
    }
}