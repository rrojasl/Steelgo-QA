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
    
    public partial class CostoProcesoRaiz
    {
        public int CostoProcesoRaizID { get; set; }
        public int ProyectoID { get; set; }
        public int FamiliaAceroID { get; set; }
        public int TipoJuntaID { get; set; }
        public int ProcesoRaizID { get; set; }
        public int DiametroID { get; set; }
        public int CedulaID { get; set; }
        public decimal Costo { get; set; }
        public Nullable<System.Guid> UsuarioModifica { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public byte[] VersionRegistro { get; set; }
    
        public virtual aspnet_Users aspnet_Users { get; set; }
        public virtual Cedula Cedula { get; set; }
        public virtual Diametro Diametro { get; set; }
        public virtual FamiliaAcero FamiliaAcero { get; set; }
        public virtual ProcesoRaiz ProcesoRaiz { get; set; }
        public virtual Proyecto Proyecto { get; set; }
        public virtual TipoJunta TipoJunta { get; set; }
    }
}
