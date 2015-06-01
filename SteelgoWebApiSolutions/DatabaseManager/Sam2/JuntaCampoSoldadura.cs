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
    
    public partial class JuntaCampoSoldadura
    {
        public JuntaCampoSoldadura()
        {
            this.JuntaCampo = new HashSet<JuntaCampo>();
            this.JuntaCampoSoldaduraDetalle = new HashSet<JuntaCampoSoldaduraDetalle>();
        }
    
        public int JuntaCampoSoldaduraID { get; set; }
        public int JuntaCampoID { get; set; }
        public System.DateTime FechaSoldadura { get; set; }
        public System.DateTime FechaReporte { get; set; }
        public Nullable<int> ProcesoRellenoID { get; set; }
        public Nullable<int> ProcesoRaizID { get; set; }
        public Nullable<int> WpsRaizID { get; set; }
        public Nullable<int> WpsRellenoID { get; set; }
        public string Observaciones { get; set; }
        public Nullable<System.Guid> UsuarioModifica { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public byte[] VersionRegistro { get; set; }
    
        public virtual ICollection<JuntaCampo> JuntaCampo { get; set; }
        public virtual JuntaCampo JuntaCampo1 { get; set; }
        public virtual ProcesoRaiz ProcesoRaiz { get; set; }
        public virtual ProcesoRelleno ProcesoRelleno { get; set; }
        public virtual Wps Wps { get; set; }
        public virtual Wps Wps1 { get; set; }
        public virtual ICollection<JuntaCampoSoldaduraDetalle> JuntaCampoSoldaduraDetalle { get; set; }
    }
}
