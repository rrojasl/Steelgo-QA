using System;
using System.Collections.Generic;

namespace BackEndSAM.Models.Pintura.CapturaAvanceIntAcabado
{
    public class CapturaAvanceIntAcabado
    {

    }

    public class IdOrdenTrabajo
    {
        public string OrdenTrabajo { get; set; }
        public List<IDS> idStatus { get; set; }
    }

    public class IDS
    {
        public string Status { get; set; }

        public string IDValido { get; set; }

        public int Valor { get; set; }

        public string Proyecto { get; set; }

        public int ProyectoID { get; set; }
    }

    public class Lote
    {
        public int LotePinturaID { get; set; }
        public string NumeroLote { get; set; }
    }

    public class SistemaPintura
    {
        public int SistemaPinturaID { get; set; }
        public string Nombre { get; set; }
    }

    public class Cuadrante
    {
        public int CuadranteID { get; set; }
        public string Nombre { get; set; }
    }

    public class Color
    {
        public string Nombre { get; set; }
        public int ColorID { get; set; }
    }

    public class PinturaComponenteComposicion
    {
        public string Componente { get; set; }
        public int ComponenteID { get; set; }
        public int SistemaPinturaID { get; set; }
    }

    public class ObreroPintor
    {
        public int Accion { get; set; }
        public int PinturaSpoolObreroID { get; set; }
        public int ObreroID { get; set; }
        public string Pintor { get; set; }
    }
     
    public class Captura
    {
        public List<DetalleGuardarJson> Detalles { get; set; }
    }

    public class DetalleGuardarJson
    {
        public int Accion { get; set; }
        public int SpoolID { get; set; }
        public int PinturaSpoolID { get; set; } 
        public int PasoID { get; set; }
        public int SistemaPinturaID { get; set; }
        public int ColorPinturaID { get; set; }
        public int LotePinturaID { get; set; }
        public int PinturaComponenteComposicionID { get; set; }
        public string FechaPintura { get; set; } 
        public List<DetalleGuardarPintores> ListaPintores { get; set; } 
    }

    public class CapturaNuevo
    {
        public int Accion { get; set; }
        public decimal MetrosCuadrados { get; set; } 
        public int ColorID { get; set; }
        public int LoteID { get; set; }
        public int SistemaPintura { get; set; }
        public int PinturaComponenteComposicionID { get; set; }
        public int SpoolID { get; set; }
        public string FechaPintura { get; set; } 
        public List<ObreroPintor> ListaPintor { get; set; }
    }

    public class DetalleGuardarPintores
    {
        public int Accion { get; set; }
        public int SpoolID { get; set; }
        public int PasoID { get; set; }
        public int PinturaSpoolID { get; set; }
        public int PinturaSpoolObreroID { get; set; }
        public int ObreroID { get; set; }
    }
     
    public class DetalleCuadrante
    {
        public string TemplatePintoresPorSpool { get; set; }
        public int PinturaSpoolID { get; set; }
        public int SpoolID { get; set; }
        public string Spool { get; set; }
        public int SistemaPinturaID { get; set; }
        public string SistemaPintura { get; set; }
        public List<SistemaPintura> listaSistemaPintura { get; set; }
        public List<Color> listaColores { get; set; }
        public int ColorID { get; set; }
        public string Color { get; set; } 
        public int PinturaComponenteComposicionID { get; set; }
        public string MetrosCuadrados { get; set; }
        public List<Lote> listaLotes { get; set; }
        public int LoteID { get; set; }
        public string Lote { get; set; } 
        public string FechaPintura { get; set; }
        public List<ObreroPintor> ListaPintores { get; set; }
        public List<ObreroPintor> ListaDetallePintoresPorSpool { get; set; }
        public List<ObreroPintor> ListaDetallePintoresPorSpoolInicial { get; set; }
        public int[] ListaPintoresSeleccionadosPorSpool { get; set; }
        public int PasoId { get; set; }
        public int Accion { get; set; }
        public List<PinturaComponenteComposicion> ListaPinturaComponenteCompGeneral { get; set; }
        public string Componente { get; set; }
        public int ComponenteID { get; set; }
        public List<PinturaComponenteComposicion> ListaPinturaComponenteCompEspecifica { get; set; }

    }

    public class CamposPredeterminados
    { 
        public string Paso { get; set; }
        public string Llenado { get; set; }
        public string FechaPintura { get; set; }    
        public string FormatoFecha { get; set; } 
    }
}