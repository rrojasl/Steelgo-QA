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
    
    public partial class Sam3_ItemCodeSteelgo
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Sam3_ItemCodeSteelgo()
        {
            this.Sam3_Rel_ItemCodeSteelgo_Diametro = new HashSet<Sam3_Rel_ItemCodeSteelgo_Diametro>();
        }
    
        public int ItemCodeSteelgoID { get; set; }
        public string DescripcionEspanol { get; set; }
        public string DescripcionIngles { get; set; }
        public decimal Peso { get; set; }
        public int FamiliaAceroID { get; set; }
        public bool Activo { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public decimal Area { get; set; }
        public Nullable<int> CedulaID { get; set; }
        public string Codigo { get; set; }
        public Nullable<int> GrupoID { get; set; }
        public string DescripcionLargaEspanol { get; set; }
        public string DescripcionLargaIngles { get; set; }
    
        public virtual Sam3_CatalogoCedulas Sam3_CatalogoCedulas { get; set; }
        public virtual Sam3_Grupo Sam3_Grupo { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_Rel_ItemCodeSteelgo_Diametro> Sam3_Rel_ItemCodeSteelgo_Diametro { get; set; }
    }
}
