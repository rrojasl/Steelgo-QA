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
    
    public partial class Sam3_Cedula
    {
        public Sam3_Cedula()
        {
            this.Sam3_CatalogoCedulas = new HashSet<Sam3_CatalogoCedulas>();
            this.Sam3_CatalogoCedulas1 = new HashSet<Sam3_CatalogoCedulas>();
            this.Sam3_CatalogoCedulas2 = new HashSet<Sam3_CatalogoCedulas>();
        }
    
        public int CedulaID { get; set; }
        public string Codigo { get; set; }
        public Nullable<int> Orden { get; set; }
        public bool VerificadoPorCalidad { get; set; }
        public bool Activo { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
    
        public virtual ICollection<Sam3_CatalogoCedulas> Sam3_CatalogoCedulas { get; set; }
        public virtual ICollection<Sam3_CatalogoCedulas> Sam3_CatalogoCedulas1 { get; set; }
        public virtual ICollection<Sam3_CatalogoCedulas> Sam3_CatalogoCedulas2 { get; set; }
    }
}
