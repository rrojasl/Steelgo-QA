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
    
    public partial class Sam3_WPS
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Sam3_WPS()
        {
            this.Sam3_SoldadorCertificacion = new HashSet<Sam3_SoldadorCertificacion>();
        }
    
        public int WPSId { get; set; }
        public string WPSNombre { get; set; }
        public Nullable<int> PQRRaizId { get; set; }
        public Nullable<int> PQRRellenoId { get; set; }
        public Nullable<bool> PWHTId { get; set; }
        public string EspesorMaximoRelleno { get; set; }
        public string EspesorMinimoRelleno { get; set; }
        public string EspesorMaximoRaiz { get; set; }
        public string EspesorMinimoRaiz { get; set; }
        public Nullable<bool> Activo { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public string FechaModificacion { get; set; }
        public Nullable<bool> PREHEAT { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_SoldadorCertificacion> Sam3_SoldadorCertificacion { get; set; }
    }
}
