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
    
    public partial class Corte
    {
        public Corte()
        {
            this.CorteDetalle = new HashSet<CorteDetalle>();
        }
    
        public int CorteID { get; set; }
        public int ProyectoID { get; set; }
        public int NumeroUnicoCorteID { get; set; }
        public Nullable<int> Sobrante { get; set; }
        public Nullable<int> Merma { get; set; }
        public Nullable<int> MermaMovimientoID { get; set; }
        public Nullable<int> PreparacionCorteMovimientoID { get; set; }
        public bool Cancelado { get; set; }
        public int Rack { get; set; }
        public Nullable<System.Guid> UsuarioModifica { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public byte[] VersionRegistro { get; set; }
        public Nullable<int> CortadorID { get; set; }
    
        public virtual aspnet_Users aspnet_Users { get; set; }
        public virtual NumeroUnicoCorte NumeroUnicoCorte { get; set; }
        public virtual NumeroUnicoMovimiento NumeroUnicoMovimiento { get; set; }
        public virtual NumeroUnicoMovimiento NumeroUnicoMovimiento1 { get; set; }
        public virtual Proyecto Proyecto { get; set; }
        public virtual ICollection<CorteDetalle> CorteDetalle { get; set; }
    }
}
