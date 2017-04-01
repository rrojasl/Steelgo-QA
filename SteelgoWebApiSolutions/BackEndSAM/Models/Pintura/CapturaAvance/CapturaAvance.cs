using BackEndSAM.Models.Pintura.PinturaGeneral;
using BackEndSAM.Models.Sam3General.Cuadrante;
using System.Collections.Generic;

namespace BackEndSAM.Models.Pintura.CapturaAvance
{
    public class DetalleCapturaAvanceCarro
    {
        public int Accion { get; set; }
        public int? CarroID { get; set; }
        public int? CargaCarroID { get; set; }
        public int SpoolID { get; set; }
        public string Spool { get; set; }
        public int? SistemaPinturaID { get; set; }
        public int SistemaPinturaProyectoID { get; set; }
        public string SistemaPintura { get; set; }
        public int? ColorPinturaID { get; set; }
        public string Color { get; set; }
        public decimal Area { get; set; }
        public string Lote { get; set; }
        public string FechaShotblast { get; set; }
        public string plantillaShotblastero { get; set; }
        public List<PintorSpool> ListaShotblasteroGuargado { get; set; }
        public List<PintorSpool> ListaShotblasteroInicial { get; set; }
        public List<PintorSpool> ListaShotblasteros { get; set; }

        public int PatioID { get; set; }
        public int? CuadranteAnteriorID { get; set; }
        public int? ZonaAnteriorID { get; set; }
        public int? CuadranteID { get; set; }
        public string Cuadrante { get; set; }
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

    public class Componente {
        public string NombreComponente { get; set; }

        public Componente()
        {
            this.NombreComponente = "";
        }
    }

    public class Reductor
    {
        public string NombreReductor { get; set; }

        public Reductor()
        {
            this.NombreReductor = "";
        }
    }

    public class RetornaDetalles
    {
        public List<DetalleCapturaAvanceCarro> listaCapturaAvance { get; set; }
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
        public List<ObrerosGuardar> ListaObreros { get; set; }
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
    public class CarroCerrado
    {
        public int MedioTransporteID { get; set; }
        public int MedioTransporteCargaID { get; set; }
        public string Nombre { get; set; }
        public int SistemaPinturaProyectoID { get; set; }

        public CarroCerrado()
        {
            MedioTransporteID = 0;
            MedioTransporteCargaID = 0;
            Nombre = "";
            SistemaPinturaProyectoID = 0;
        }
    }

    public class Lote
    {
        public string NombreLote { get; set; }
        public int? Cantidad { get; set; }
        public Lote()
        {
            NombreLote = "";
            Cantidad = 0;
        }
    }
}