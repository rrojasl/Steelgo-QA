using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Pintura.PinturaGeneral
{
    public class MedioTransporte
    {
        public int MedioTransporteID { get; set; }
        public int MedioTransporteCargaID { get; set; }
        public string Nombre { get; set; }
        public int  ProyectoID { get; set; }

        public MedioTransporte()
        {
            MedioTransporteID = 0;
            MedioTransporteCargaID = 0;
            Nombre = "";
            ProyectoID = 0;
        }
    }

    public class CapturaMedioTransporte
    {
        public string MedioTransporteNombre { get; set; }
        public int UsuarioID { get; set; }
    }
}