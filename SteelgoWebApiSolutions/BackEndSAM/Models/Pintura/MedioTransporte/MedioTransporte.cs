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
        public int MedioTransporteCargaID { get; set; }
        public string NombreMedioTransporte { get; set; }
        public decimal PesoMaximoPermitido { get; set; }
        public decimal PesoMaximoOcupado { get; set; }
        public int AreaPermitidoMedioTransporte { get; set; }
        public decimal AreaMaximoOcupado { get; set; }
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
        public int MedioTransporteCargaID { get; set; }
    }

    public class Captura
    {
        public List<GuardarCarga> Detalles { get; set; }
    }

    public class GuardarCarga
    {
        public int Accion { get; set; }
        public int SpoolID { get; set; }
        public int MedioTransporteCargaID { get; set; }
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

    public class CerrarMedioTransporte
    {
        public int CerrarCarro { get; set; }
        public int MedioTransporteID { get; set; }
    }

    public class CapturaDescarga
    {
        public List<GuardarDescarga> Detalles { get; set; }
    }
    public class CapturaNuevoMedioTransporte
    {
        public List<NuevoMedioTransporte> Detalles { get; set; }
    }


    public class GuardarDescarga
    {
        public int Accion { get; set; }
        public int SpoolID { get; set; }
        public int MedioTransporteID { get; set; } 
        public int CuadranteID { get; set; }
    }

    public class NuevoMedioTransporte
    {
        public string Nombre { get; set; }
        public int ClasificacionMedioTransporteID { get; set; }
        public int ClasificacionID { get; set; }
        public int PersistenciaID { get; set; }
        public int NumeroVecesUsoMaximo { get; set; }
        public double PesoMaximo { get; set; }
        public double Area { get; set; }

    }

    public class TipoPersistencia
    {
        public int TipoPersistenciaID { get; set; }
        public string Tipo { get; set; }
    }

    public class Clasificacion
    {
        public int ClasificacionPersistenciaID { get; set; }
        public string NombreClasificacion { get; set; }
    }

    public class CamposPredeterminados
    {
        public string Vista { get; set; }
        public string Opcion { get; set; }
    }
}