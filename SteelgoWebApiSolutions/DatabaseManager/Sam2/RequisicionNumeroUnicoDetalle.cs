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
    
    public partial class RequisicionNumeroUnicoDetalle
    {
        public RequisicionNumeroUnicoDetalle()
        {
            this.PinturaNumeroUnico = new HashSet<PinturaNumeroUnico>();
        }
    
        public int RequisicionNumeroUnicoDetalleID { get; set; }
        public int RequisicionNumeroUnicoID { get; set; }
        public int NumeroUnicoID { get; set; }
        public Nullable<System.Guid> UsuarioModifica { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public byte[] VersionRegistro { get; set; }
    
        public virtual aspnet_Users aspnet_Users { get; set; }
        public virtual NumeroUnico NumeroUnico { get; set; }
        public virtual ICollection<PinturaNumeroUnico> PinturaNumeroUnico { get; set; }
        public virtual RequisicionNumeroUnico RequisicionNumeroUnico { get; set; }
    }
}
