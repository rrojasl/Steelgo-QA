using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.ServiciosTecnicos.EntregaPlacasGraficas
{
    public class EntregaPlacasGraficas
    {
        public int RequisicionID { get; set; }
        public int DocumentoRecibidoID { get; set; }
        public int DocumentoEstatusID { get; set; }
        public int DocumentoDefectoID { get; set; }
        public int UsuarioID { get; set; }
        public bool Activo { get; set; }
        public int Accion { get; set; }
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
        public int RequisicionID { get; set; }
        public string NumeroControl { get; set; }
        public int JuntaID { get; set; }
        public string Junta { get; set; }
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
        public List<DocumentoRecibido> ListaRecibido { get; set; }
        public List<DocumentoEstatus> ListaEstatusDocumento { get; set; }
        public List<DocumentoDefecto> ListaDefectoDocumento { get; set; }
        
    }

    public class CapturaPlacasGraficas
    {
        public List<EntregaPlacasGraficas> ListaDetalles { get; set; }
    }
    
    public class CamposPredeterminados
    {
        public string Muestra { get; set; }
        public string Llenado { get; set; }
    }
}