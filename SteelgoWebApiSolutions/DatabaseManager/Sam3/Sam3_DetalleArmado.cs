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
    
    public partial class Sam3_DetalleArmado
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Sam3_DetalleArmado()
        {
            this.Sam3_JuntaSoldadura = new HashSet<Sam3_JuntaSoldadura>();
        }
    
        public int DetalleArmadoID { get; set; }
        public int OrdenTrabajoSpoolID { get; set; }
        public int JuntaTrabajoAnteriorID { get; set; }
        public int TipoJuntaID { get; set; }
        public string EtiquetaJunta { get; set; }
        public int EtiquetaMaterial1 { get; set; }
        public Nullable<int> NumeroUnico1ID { get; set; }
        public int EtiquetaMaterial2 { get; set; }
        public Nullable<int> NumeroUnico2ID { get; set; }
        public bool Activo { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public System.DateTime FechaModificacion { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_JuntaSoldadura> Sam3_JuntaSoldadura { get; set; }
    }
}
