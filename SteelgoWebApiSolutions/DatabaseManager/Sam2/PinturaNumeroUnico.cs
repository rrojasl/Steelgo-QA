//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DatabaseManager.Sam2
{
    using System;
    using System.Collections.Generic;
    
    public partial class PinturaNumeroUnico
    {
        public int PinturaNumeroUnicoID { get; set; }
        public int ProyectoID { get; set; }
        public int NumeroUnicoID { get; set; }
        public int RequisicionNumeroUnicoDetalleID { get; set; }
        public Nullable<System.DateTime> FechaPrimarios { get; set; }
        public string ReportePrimarios { get; set; }
        public Nullable<System.DateTime> FechaIntermedio { get; set; }
        public string ReporteIntermedio { get; set; }
        public bool Liberado { get; set; }
        public Nullable<System.Guid> UsuarioModifica { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public byte[] VersionRegistro { get; set; }
    
        public virtual NumeroUnico NumeroUnico { get; set; }
        public virtual Proyecto Proyecto { get; set; }
        public virtual RequisicionNumeroUnicoDetalle RequisicionNumeroUnicoDetalle { get; set; }
    }
}
