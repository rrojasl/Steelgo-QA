using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.ServiciosTecnicos.EntregaPlacasGraficas
{
    public class DetalleGuardarJson
    {
        public int Accion { get; set; }
        public int EntregaPlacasGraficasID { get; set; }
        public int RequisicionID { get; set; }
        public int OrdenTrabajoID { get; set; }
        public int SpoolID { get; set; }
        public int JuntaID { get; set; }
        public int DocumentoRecibidoID { get; set; }
        public int DocumentoEstatusID { get; set; }
        public int DocumentoDefectoID { get; set; }
        public int Estatus { get; set; }
    }

    public class DocumentoRecibido
    {
        public int DocumentoRecibidoID { get; set; }
        public string DocumentoRecibidoNombre { get; set; }

        public DocumentoRecibido()
        {
            DocumentoRecibidoID = 0;
            DocumentoRecibidoNombre = "";
        }
    }

    public class DocumentoEstatus
    {
        public int DocumentoEstatusID { get; set; }
        public string DocumentoEstatusNombre { get; set; }

        public DocumentoEstatus()
        {
            DocumentoEstatusID = 0;
            DocumentoEstatusNombre = "";
        }
    }

    public class DocumentoDefecto {
        public int DefectoDocumentoID { get; set; }
        public string DefectoDocumentoNombre { get; set; }

        public DocumentoDefecto()
        {
            DefectoDocumentoID = 0;
            DefectoDocumentoNombre = "";
        }
    }
        
    public class RequisicionDetalle
    {
        public int EntregaPlacasGraficasID { get; set; }
        public int RequisicionID { get; set; }
        public int OrdenTrabajoID { get; set; }
        public int SpoolID { get; set; }
        public int JuntaSpoolID { get; set; }
        public string NumeroControl { get; set; }
        public string JuntaEtiqueta { get; set; }
        public int ClasificacionPndID { get; set; }
        public string ClasificacionPnd { get; set; }
        public int TipoPruebaID { get; set; }
        public string TipoPrueba { get; set; }
        public string Observaciones { get; set; }
        public int CodigoAsmeID { get; set; }
        public string CodigoAsme { get; set; }
        public int Accion { get; set; }
        public int DocumentoRecibidoID { get; set; }
        public string DocumentoRecibido { get; set; }
        public int DocumentoEstatusID { get; set; }
        public string DocumentoEstatus { get; set; }
        public int DefectoDocumentoID { get; set; }
        public string DefectoDocumento { get; set; }
        public int EstatusCaptura { get; set; }
        public List<DocumentoRecibido> ListaRecibido { get; set; }
        public List<DocumentoEstatus> ListaEstatusDocumento { get; set; }
        public List<DocumentoDefecto> ListaDefectoDocumento { get; set; }
        
    }

    public class CapturaPlacasGraficas
    {
        public List<DetalleGuardarJson> Detalles { get; set; }
    }

    public class Requisicion
    {
        public Requisicion()
        {
            RequisicionID = 0;
            ProyectoID = 0;
            TipoPruebaID = 0;
            NombreRequisicion = "";
            ProveedorID = 0;
        }

        public int RequisicionID { get; set; }
        public int ProyectoID { get; set; }
        public int TipoPruebaID { get; set; }
        public string NombreRequisicion { get; set; }
        public int ProveedorID { get; set; }
    }

    public class Proveedor
    {
        public Proveedor()
        {
            ProveedorID = 0;
            NombreProveedor = "";
        }

        public int ProveedorID { get; set; }
        public string NombreProveedor { get; set; }
    }
}