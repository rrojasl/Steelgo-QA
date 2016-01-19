using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Pintura.LotesCapturaReporte
{
    public class LotesCapturaReporte
    {
    }

    public class SistemaPintura
    {
        public int SistemaPinturaID { get; set; }
        public string NombreSistemaPintura { get; set; }
    }


    public class LotePintura
    {
        public int LotePinturaID { get; set; }
        public string NumeroLote { get; set; }
    }

    public class StatusSpool
    {
        public int SpoolID { get; set; }
        public string NombreSpool { get; set; }
        public int SistemaPinturaID { get; set; }
        public string SistemaPintura { get; set; }
        public int ColorPinturaID { get; set; }
        public string Color { get; set; }
        public int LotePinturaID { get; set; }
        public string NumeroLote { get; set; }
        public int PinturaComponenteComposicionID { get; set; }
        public string Nombre { get; set; }
        public decimal Area { get; set; }
        public int CuadranteID { get; set; }
        public string NombreCuadrante { get; set; }
        public bool CapturaPrueba { get; set; }
    }

    public class GuardarStatus
    {
        public int PruebasSpoolID { get; set; }
        public int SpoolID { get; set; }
        public bool CapturaPrueba { get; set; }
    }


    //public class  
}