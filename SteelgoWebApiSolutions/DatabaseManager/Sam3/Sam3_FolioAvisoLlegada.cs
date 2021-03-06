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
    
    public partial class Sam3_FolioAvisoLlegada
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Sam3_FolioAvisoLlegada()
        {
            this.Sam3_FolioAvisoEntrada = new HashSet<Sam3_FolioAvisoEntrada>();
            this.Sam3_Rel_FolioAvisoLlegada_Documento = new HashSet<Sam3_Rel_FolioAvisoLlegada_Documento>();
            this.Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo = new HashSet<Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo>();
            this.Sam3_Rel_FolioAvisoLlegada_Proyecto = new HashSet<Sam3_Rel_FolioAvisoLlegada_Proyecto>();
            this.Sam3_Rel_FolioAvisoLlegada_Vehiculo = new HashSet<Sam3_Rel_FolioAvisoLlegada_Vehiculo>();
            this.Sam3_Rel_Incidencia_FolioAvisoLlegada = new HashSet<Sam3_Rel_Incidencia_FolioAvisoLlegada>();
            this.Sam3_Rel_Incidencia_PaseSalida = new HashSet<Sam3_Rel_Incidencia_PaseSalida>();
            this.Sam3_PermisoAduana = new HashSet<Sam3_PermisoAduana>();
        }
    
        public int FolioAvisoLlegadaID { get; set; }
        public Nullable<int> Consecutivo { get; set; }
        public Nullable<bool> EsVirtual { get; set; }
        public string Estatus { get; set; }
        public bool Activo { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public int TransportistaID { get; set; }
        public int PatioID { get; set; }
        public int ChoferID { get; set; }
        public Nullable<bool> PaseSalidaEnviado { get; set; }
        public Nullable<System.DateTime> FechaRecepcion { get; set; }
        public int VehiculoID { get; set; }
        public Nullable<int> ClienteID { get; set; }
        public Nullable<int> TipoAvisoID { get; set; }
        public int Entidad { get; set; }
        public int ProyectoNombrado { get; set; }
        public string CuadrillaDescarga { get; set; }
    
        public virtual Sam3_Chofer Sam3_Chofer { get; set; }
        public virtual Sam3_Entidad Sam3_Entidad { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_FolioAvisoEntrada> Sam3_FolioAvisoEntrada { get; set; }
        public virtual Sam3_Patio Sam3_Patio { get; set; }
        public virtual Sam3_TipoAviso Sam3_TipoAviso { get; set; }
        public virtual Sam3_Transportista Sam3_Transportista { get; set; }
        public virtual Sam3_Vehiculo Sam3_Vehiculo { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_Rel_FolioAvisoLlegada_Documento> Sam3_Rel_FolioAvisoLlegada_Documento { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo> Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_Rel_FolioAvisoLlegada_Proyecto> Sam3_Rel_FolioAvisoLlegada_Proyecto { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_Rel_FolioAvisoLlegada_Vehiculo> Sam3_Rel_FolioAvisoLlegada_Vehiculo { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_Rel_Incidencia_FolioAvisoLlegada> Sam3_Rel_Incidencia_FolioAvisoLlegada { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_Rel_Incidencia_PaseSalida> Sam3_Rel_Incidencia_PaseSalida { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_PermisoAduana> Sam3_PermisoAduana { get; set; }
        public virtual Sam3_Proyecto Sam3_Proyecto { get; set; }
    }
}
