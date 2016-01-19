using DatabaseManager.Sam2;
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

    public class MedioTransporteCarga
    {
        public int MedioTransporteCargaID { get; set; }
        public string NombreMedioTransporte { get; set; }
    }

    public class DetalleSpool
    {
        public int Accion { get; set; }
        public string SpoolJunta { get; set; }
        public int OrdenImportancia { get; set; }
        public decimal Peso { get; set; }
        public decimal Area { get; set; }
        public string SistemaPintura { get; set; }
        public int SpoolID { get; set; }
        public int SistemaPinturaID { get; set; }
    }

    public class Captura
    {
        public List<GuardarCarga> Detalles { get; set; }
    }

    public class GuardarCarga
    {
        public int Accion { get; set; }
        public int SpoolID { get; set; }

    }

    public class DetalleMedioTransporteCarga
    {
        public int Accion { get; set; }
        public string SpoolJunta { get; set; }
        public int OrdenImportancia { get; set; }
        public decimal Peso { get; set; }
        public decimal Area { get; set; }
        public string SistemaPintura { get; set; }
        public string ColorPintura { get; set; }
        public int SpoolID { get; set; }
        public int SistemaPinturaID { get; set; }
        public int MedioTransporteID { get; set; }
        public int MedioTransporteCargaID { get; set; }
        public int CuadranteID { get; set; }
        public string Cuadrante { get; set; }
        public List<Cuadrante.Cuadrante> ListaCuandrantes { get; set; }
    }

    public class CapturaDescarga
    {
        public List<GuardarDescarga> Detalles { get; set; }
    }

    public class GuardarDescarga
    {
        public int Accion { get; set; }
        public int SpoolID { get; set; }
        public int MedioTransporteID { get; set; }
        public int CuadranteID { get; set; }
    }
}