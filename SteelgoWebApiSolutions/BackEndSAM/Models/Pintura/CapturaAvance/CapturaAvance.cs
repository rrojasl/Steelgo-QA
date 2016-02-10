using System.Collections.Generic; 

namespace BackEndSAM.Models.Pintura.CapturaAvance
{
    public class CapturaAvance
    {
        public string SpoolJunta { get; set; }
        public int Accion { get; set; }
        public int PinturaSpoolIDShotblastero { get; set; }
        public int PinturaSpoolIDShotPrimario { get; set; }
        public string Spool { get; set; }
        public string SistemaPintura { get; set; }
        public decimal Metros2 { get; set; }
        public decimal Peso { get; set; }
        public string Color { get; set; }
        public int ColorPinturaID { get; set; }
        public int OrdenImportancia { get; set; }
        public int SpoolID { get; set; }
        public int SistemaPinturaID { get; set; }
        public string Cuadrante { get; set; }
        public int CuadranteID { get; set; }
        public int MedioTransporteID { get; set; }
        public int MedioTransporteCargaID { get; set; }
        public string plantillaShotblastero { get; set; }
        public string plantillaPintor { get; set; }
        public string FechaShotblast { get; set; }
        public string FechaPrimario { get; set; }
        public List<PintorSpool> ListaPintorGuargado { get; set; }
        public List<PintorSpool> ListaShotblasteroGuargado { get; set; }
        public List<PintorSpool> ListaPintorInicial { get; set; }
        public List<PintorSpool> ListaShotblasteroInicial { get; set; }
        public List<PintorSpool> ListaPintores { get; set; }
        public List<PintorSpool> ListaShotblasteros { get; set; }
        public List<Cuadrante.Cuadrante> ListaCuandrantes { get; set; }
    }

    public class CamposPredeterminados
    {
        public string FechaShotblast { get; set; }
        public string FechaPrimario { get; set; }
        public string Llenado { get; set; }
    }
    public class Pintor
    {
        public int ObreroID { get; set; }
        public string Codigo { get; set; }
        public string TipoObrero { get; set; }
    }

    public class ComponenteDetalle
    {
        public int PinturaComponenteComposicionID { get; set; }
        public string Nombre { get; set; }
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
        public int SpoolID { get; set; }
        public int PinturaSpoolID { get; set; }
        public int PasoID { get; set; }
        public int SistemaPinturaID { get; set; }
        public int ColorPinturaID { get; set; }
        public int LotePinturaID { get; set; }
        public int PinturaComponenteComposicionID { get; set; }
        public string Fecha { get; set; } 
        public List<ObrerosGuardar> ListaObreros  { get;set;}
    }

    public class CapturaNuevo
    {
        public List<PintorSpool> ListaPintorGuargado { get; set; }
        public List<PintorSpool> ListaShotblasteroGuargado { get; set; }
    }


    public class PintorSpool
    {
        public int Accion { get; set; }
        public int PinturaSpoolObreroID { get; set; }
        public int ObreroID { get; set; }
        public string Codigo { get; set; }
    }


    public class ObrerosGuardar
    {
        public int Accion { get; set; }
        public int SpoolID { get; set; }
        public int PasoID { get; set; }
        public int PinturaSpoolID { get; set; }
        public int PinturaSpoolObreroID { get; set; }
        public int ObreroID { get; set; }
    }
}