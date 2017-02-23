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
        public bool CarroCerrado { get; set; }
        public int  ProyectoID { get; set; }

        public MedioTransporte()
        {
            MedioTransporteID = 0;
            MedioTransporteCargaID = 0;
            Nombre = "";
            CarroCerrado = false;
            ProyectoID = 0;
        }
    }

    public class CapturaMedioTransporte
    {
        public string Nombre { get; set; }
        public int UsuarioID { get; set; }
        public int PatioID { get; set; }
    }

    public class Color
    {
        public Color()
        {
            ColorID = 0;
            Nombre = "";
            CodigoHexadecimal = "";
    }

        public int ColorID { get; set; }
        public string Nombre { get; set; }
        public string CodigoHexadecimal { get; set; }
    }

    public class Captura
    {
        public List<ImgSerializadas> Detalles { get; set; }
    }

    public class ImgSerializadas
    {
        public string imgSerializada { get; set; }
    }
}