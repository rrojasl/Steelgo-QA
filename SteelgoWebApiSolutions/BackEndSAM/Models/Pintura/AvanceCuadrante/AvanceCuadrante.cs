using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Pintura.AvanceCuadrante
{
    public class AvanceCuadrante
    {
    }

    public class PintorSpool
    {
        public int Accion { get; set; }
        public int AvanceCuadranteObreroId { get; set; }
        public int ObreroID { get; set; }
        public string Codigo { get; set; }
    }
}