using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Pintura.CapturaAvance
{
    public class CapturaAvance
    {
        public int Accion { get; set; }
        public int MedioTransporteSpoolID { get; set; }
        public string Spool { get; set; }
        public string SistemaPintura { get; set; }
        public decimal Metros2 { get; set; }
        public decimal Peso { get; set; }
        public string Color { get; set; }
        public int pintorID { get; set; }
        public int ShotblasteroID { get; set; }
        public string pintor { get; set; }
        public string Shotblastero { get; set; }
        public int OrdenImportancia { get; set; }
        public int SpoolID { get; set; }
        public int SistemaPinturaID { get; set; }
        public int MedioTransporteID { get; set; }
        public int MedioTransporteCargaID { get; set; }
        public List<Pintor> ListaPintores { get; set; }
        public List<Pintor> ListaShotblasteros { get; set; }

    }

    public class CamposPredeterminados
    {
        public string FechaShotblast { get; set; }
        public string FechaPrimario { get; set; }
    }
    public class Pintor
    {
        public int ObreroID { get; set; }
        public string Codigo { get; set; }
        public string TipoObrero { get; set; }
    }

    public class ComponenteDetalle
    {
        public int ComponenteID { get; set; }
        public string Componente { get; set; }
    }

    public class RetornaDetalles
    {
        public List<CapturaAvance> listaCapturaAvance { get; set; }
        public List<ComponenteDetalle> listaComponenteDetalle { get; set; }
    }

    public class Captura
    {
        public List<DetalleSpool> listaDetalleSpool { get; set; }
    }

    public class DetalleSpool
    {
        public int Accion { get; set; }
        public int MedioTransporteSpoolID { get; set; }
        public int MedioTransporteCargaID { get; set; }
        public int SpoolID { get; set; }
        public int ShotBlastero { get; set; }
        public int Pintor { get; set; }
    }
}