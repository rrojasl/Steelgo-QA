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
    
    public partial class JuntaCampoInspeccionVisualDefecto
    {
        public int JuntaCampoInspeccionVisualDefectoID { get; set; }
        public int JuntaCampoInspeccionVisualID { get; set; }
        public int DefectoID { get; set; }
        public Nullable<System.Guid> UsuarioModifica { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public byte[] VersionRegistro { get; set; }
    
        public virtual Defecto Defecto { get; set; }
        public virtual JuntaCampoInspeccionVisual JuntaCampoInspeccionVisual { get; set; }
    }
}
