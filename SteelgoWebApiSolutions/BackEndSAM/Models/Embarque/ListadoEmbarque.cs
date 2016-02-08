using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Embarque
{
    public class ListadoEmbarque
    {
        public string Folio { get; set; }
        public int EmbarqueID { get; set; }
        public string Plana { get; set; }
        public string Estatus { get; set; }
        public int EmbarquePlanaID { get; set; }
        public bool RequierePermisoAduana { get; set; }
        public string FolioSolicitarPermisos { get; set; }
        public string FolioAprobadoAduana { get; set; }
        public string FolioAprobadoCliente { get; set; }
        public string FechaEnvio { get; set; }
        public string NombreProyecto { get; set; }
        public int ProyectoID { get; set; }
    }

    public class CapturaListadoEmbarque
    {
        public List<EmbarqueEnviar> Lista{ get; set; }
    }
    public class EmbarqueEnviar
    {
        public int EmbarquePlanaID { get; set; }
        public string FolioSolicitarPermisos { get; set; }
        public string FolioAprobadoAduana { get; set; }
        public string FolioAprobadoCliente { get; set; }
        public string FechaEnvio { get; set; }
    }
    public class Path
    {
        public int ProveedorID { get; set; }
        public string ReportePath { get; set; }
        public int TipoReporteID { get; set; }
        public string TipoReporte { get; set; }
    }
}