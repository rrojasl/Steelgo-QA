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
    
    public partial class Sam3_FolioAvisoEntrada
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Sam3_FolioAvisoEntrada()
        {
            this.Sam3_FolioCuantificacion = new HashSet<Sam3_FolioCuantificacion>();
            this.Sam3_Rel_FolioAvisoEntrada_Documento = new HashSet<Sam3_Rel_FolioAvisoEntrada_Documento>();
            this.Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion = new HashSet<Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion>();
            this.Sam3_Rel_Incidencia_ComplementoRecepcion = new HashSet<Sam3_Rel_Incidencia_ComplementoRecepcion>();
            this.Sam3_Rel_Incidencia_FolioAvisoEntrada = new HashSet<Sam3_Rel_Incidencia_FolioAvisoEntrada>();
        }
    
        public int FolioAvisoEntradaID { get; set; }
        public Nullable<int> Consecutivo { get; set; }
        public Nullable<int> FolioAvisoLlegadaID { get; set; }
        public string Estatus { get; set; }
        public bool Activo { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public string Factura { get; set; }
        public string OrdenCompra { get; set; }
        public Nullable<int> ProveedorID { get; set; }
        public int ClienteID { get; set; }
        public int PatioID { get; set; }
        public int FolioDescarga { get; set; }
        public Nullable<System.DateTime> FechaFolioDescarga { get; set; }
        public Nullable<System.DateTime> FechaFinDescarga { get; set; }
        public Nullable<System.DateTime> FechainicioDescarga { get; set; }
        public Nullable<System.DateTime> FechaCreacion { get; set; }
        public string ComboEstatus { get; set; }
        public string IdentificadorCliente { get; set; }
    
        public virtual Sam3_Cliente Sam3_Cliente { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_FolioCuantificacion> Sam3_FolioCuantificacion { get; set; }
        public virtual Sam3_Patio Sam3_Patio { get; set; }
        public virtual Sam3_Proveedor Sam3_Proveedor { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_Rel_FolioAvisoEntrada_Documento> Sam3_Rel_FolioAvisoEntrada_Documento { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion> Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_Rel_Incidencia_ComplementoRecepcion> Sam3_Rel_Incidencia_ComplementoRecepcion { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_Rel_Incidencia_FolioAvisoEntrada> Sam3_Rel_Incidencia_FolioAvisoEntrada { get; set; }
        public virtual Sam3_FolioAvisoLlegada Sam3_FolioAvisoLlegada { get; set; }
    }
}
