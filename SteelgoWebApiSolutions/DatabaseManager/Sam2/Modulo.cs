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
    
    public partial class Modulo
    {
        public Modulo()
        {
            this.Permiso = new HashSet<Permiso>();
        }
    
        public int ModuloID { get; set; }
        public string Nombre { get; set; }
        public string NombreIngles { get; set; }
        public string Descripcion { get; set; }
        public Nullable<System.Guid> UsuarioModifica { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public byte[] VersionRegistro { get; set; }
    
        public virtual ICollection<Permiso> Permiso { get; set; }
    }
}
