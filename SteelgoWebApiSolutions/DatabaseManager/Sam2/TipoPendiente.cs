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
    
    public partial class TipoPendiente
    {
        public TipoPendiente()
        {
            this.Pendiente = new HashSet<Pendiente>();
            this.ProyectoPendiente = new HashSet<ProyectoPendiente>();
        }
    
        public int TipoPendienteID { get; set; }
        public Nullable<bool> EsAutomatico { get; set; }
        public string Nombre { get; set; }
        public string NombreIngles { get; set; }
        public Nullable<System.Guid> UsuarioModifica { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public byte[] VersionRegistro { get; set; }
    
        public virtual aspnet_Users aspnet_Users { get; set; }
        public virtual ICollection<Pendiente> Pendiente { get; set; }
        public virtual ICollection<ProyectoPendiente> ProyectoPendiente { get; set; }
    }
}
