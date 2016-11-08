//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DatabaseManager.Sam3
{
    using System;
    using System.Collections.Generic;
    
    public partial class Sam3_PermisoAduana
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Sam3_PermisoAduana()
        {
            this.Sam3_Rel_PermisoAduana_Documento = new HashSet<Sam3_Rel_PermisoAduana_Documento>();
        }
    
        public int PermisoAduanaID { get; set; }
        public int FolioAvisoLlegadaID { get; set; }
        public string Estatus { get; set; }
        public bool Activo { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public bool PermisoAutorizado { get; set; }
        public bool PermisoTramite { get; set; }
        public string NumeroPermiso { get; set; }
        public Nullable<System.DateTime> FechaGeneracion { get; set; }
        public Nullable<System.DateTime> FechaAutorización { get; set; }
    
        public virtual Sam3_FolioAvisoLlegada Sam3_FolioAvisoLlegada { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_Rel_PermisoAduana_Documento> Sam3_Rel_PermisoAduana_Documento { get; set; }
    }
}
