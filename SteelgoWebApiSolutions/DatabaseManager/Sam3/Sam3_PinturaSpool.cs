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
    
    public partial class Sam3_PinturaSpool
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Sam3_PinturaSpool()
        {
            this.Sam3_PinturaSpool_Obrero = new HashSet<Sam3_PinturaSpool_Obrero>();
        }
    
        public int PinturaSpoolID { get; set; }
        public int SpoolID { get; set; }
        public int ProcesoPinturaID { get; set; }
        public int SistemaPinturaID { get; set; }
        public Nullable<int> LotePinturaID { get; set; }
        public Nullable<System.DateTime> Fecha { get; set; }
        public bool Activo { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_PinturaSpool_Obrero> Sam3_PinturaSpool_Obrero { get; set; }
    }
}
