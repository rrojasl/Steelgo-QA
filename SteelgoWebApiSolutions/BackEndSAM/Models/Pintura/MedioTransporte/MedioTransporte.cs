using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Pintura.MedioTransporte
{
    public class MedioTransporte
    {
        public int MedioTransporteID { get; set; }
        public string NombreMedioTransporte { get; set; }
        public decimal PesoMaximoPermitido { get; set; }
        public decimal PesoMaximoOcupado { get; set; }
        public int AreaPermitidoMedioTransporte { get; set; }
        public int NumeroUsosPermitidos { get; set; }
        public int NumeroUsosOcupados { get; set; }
        
    }

    public class DetalleSpool
    {

    }
}