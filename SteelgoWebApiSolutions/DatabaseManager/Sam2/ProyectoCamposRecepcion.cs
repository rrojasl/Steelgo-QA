//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DatabaseManager.Sam2
{
    using System;
    using System.Collections.Generic;
    
    public partial class ProyectoCamposRecepcion
    {
        public int ProyectoID { get; set; }
        public int CantidadCamposRecepcion { get; set; }
        public string CampoRecepcion1 { get; set; }
        public string CampoRecepcion2 { get; set; }
        public string CampoRecepcion3 { get; set; }
        public string CampoRecepcion4 { get; set; }
        public string CampoRecepcion5 { get; set; }
        public int CantidadCamposNumeroUnico { get; set; }
        public string CampoNumeroUnico1 { get; set; }
        public string CampoNumeroUnico2 { get; set; }
        public string CampoNumeroUnico3 { get; set; }
        public string CampoNumeroUnico4 { get; set; }
        public string CampoNumeroUnico5 { get; set; }
        public Nullable<System.Guid> UsuarioModifica { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public byte[] VersionRegistro { get; set; }
    
        public virtual Proyecto Proyecto { get; set; }
        public virtual Usuario Usuario { get; set; }
    }
}
