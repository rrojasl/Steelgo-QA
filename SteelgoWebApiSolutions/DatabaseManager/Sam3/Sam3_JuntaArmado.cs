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
    
    public partial class Sam3_JuntaArmado
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Sam3_JuntaArmado()
        {
            this.Sam3_JuntaArmadoTrabajoAdicional = new HashSet<Sam3_JuntaArmadoTrabajoAdicional>();
        }
    
        public int JuntaArmadoID { get; set; }
        public int JuntaTrabajoID { get; set; }
        public int NumeroUnico1ID { get; set; }
        public int NumeroUnico2ID { get; set; }
        public int TallerID { get; set; }
        public int ObreroID { get; set; }
        public System.DateTime FechaArmado { get; set; }
        public System.DateTime FechaReporte { get; set; }
        public int Activo { get; set; }
        public int UsuarioModificacion { get; set; }
        public System.DateTime FechaModificacion { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_JuntaArmadoTrabajoAdicional> Sam3_JuntaArmadoTrabajoAdicional { get; set; }
    }
}