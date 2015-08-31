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
    
    public partial class Sam3_Incidencia
    {
        public Sam3_Incidencia()
        {
            this.Sam3_Incidencia1 = new HashSet<Sam3_Incidencia>();
            this.Sam3_Rel_Incidencia_NumeroUnico = new HashSet<Sam3_Rel_Incidencia_NumeroUnico>();
        }
    
        public int IncidenciaID { get; set; }
        public Nullable<int> IncidenciaOriginalID { get; set; }
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public Nullable<int> NoRFI { get; set; }
        public System.DateTime FechaCreacion { get; set; }
        public int UsuarioID { get; set; }
        public string Respuesta { get; set; }
        public Nullable<System.DateTime> FechaRespuesta { get; set; }
        public Nullable<int> UsuarioIDRespuesta { get; set; }
        public int Version { get; set; }
        public string Estatus { get; set; }
        public bool Activo { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
    
        public virtual ICollection<Sam3_Incidencia> Sam3_Incidencia1 { get; set; }
        public virtual Sam3_Incidencia Sam3_Incidencia2 { get; set; }
        public virtual Sam3_Usuario Sam3_Usuario { get; set; }
        public virtual Sam3_Usuario Sam3_Usuario1 { get; set; }
        public virtual Sam3_Rel_Incidencia_Entidad Sam3_Rel_Incidencia_Entidad { get; set; }
        public virtual ICollection<Sam3_Rel_Incidencia_NumeroUnico> Sam3_Rel_Incidencia_NumeroUnico { get; set; }
    }
}
