//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DatabaseManager.Sam3
{
    using System;
    using System.Collections.Generic;
    
    public partial class Sam3_ST_Captura_Reporte
    {
        public int ReporteRTID { get; set; }
        public int RequisicionID { get; set; }
        public int OrdenTrabajoID { get; set; }
        public int SpoolID { get; set; }
        public Nullable<int> JuntaSpoolID { get; set; }
        public Nullable<decimal> Tamano { get; set; }
        public Nullable<int> Densidad { get; set; }
        public Nullable<bool> Activo { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public Nullable<int> Estatus { get; set; }
        public Nullable<int> ResultadoConciliacionID { get; set; }
        public Nullable<int> RazonNoConciliacionID { get; set; }
        public string ComentarioValidacion { get; set; }
        public Nullable<int> UsuarioIDConciliacion { get; set; }
        public Nullable<int> ProveedorIDConciliacion { get; set; }
    }
}
