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
    
    public partial class Sam3_ProcesoSoldadura
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Sam3_ProcesoSoldadura()
        {
            this.Sam3_JuntaSoldadura = new HashSet<Sam3_JuntaSoldadura>();
            this.Sam3_JuntaSoldadura1 = new HashSet<Sam3_JuntaSoldadura>();
            this.Sam3_PQR = new HashSet<Sam3_PQR>();
        }
    
        public int ProcesoSoldaduraID { get; set; }
        public string Codigo { get; set; }
        public string NombreIngles { get; set; }
        public string NombreEspañol { get; set; }
        public bool Activo { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_JuntaSoldadura> Sam3_JuntaSoldadura { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_JuntaSoldadura> Sam3_JuntaSoldadura1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_PQR> Sam3_PQR { get; set; }
    }
}
