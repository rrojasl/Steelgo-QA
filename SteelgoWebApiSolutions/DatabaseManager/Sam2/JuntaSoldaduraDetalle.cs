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
    
    public partial class JuntaSoldaduraDetalle
    {
        public int JuntaSoldaduraDetalleID { get; set; }
        public int JuntaSoldaduraID { get; set; }
        public int SoldadorID { get; set; }
        public Nullable<int> ConsumibleID { get; set; }
        public int TecnicaSoldadorID { get; set; }
        public Nullable<System.Guid> UsuarioModifica { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public byte[] VersionRegistro { get; set; }
    
        public virtual Consumible Consumible { get; set; }
        public virtual JuntaSoldadura JuntaSoldadura { get; set; }
        public virtual Soldador Soldador { get; set; }
        public virtual TecnicaSoldador TecnicaSoldador { get; set; }
    }
}
