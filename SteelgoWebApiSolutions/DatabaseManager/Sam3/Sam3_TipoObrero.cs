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
    
    public partial class Sam3_TipoObrero
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Sam3_TipoObrero()
        {
            this.Sam3_Obrero = new HashSet<Sam3_Obrero>();
        }
    
        public int TipoObreroID { get; set; }
        public string TipoObrero { get; set; }
        public Nullable<int> TipoObreroJefe { get; set; }
        public Nullable<bool> Activo { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_Obrero> Sam3_Obrero { get; set; }
    }
}
