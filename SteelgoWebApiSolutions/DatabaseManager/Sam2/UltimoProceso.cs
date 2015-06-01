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
    
    public partial class UltimoProceso
    {
        public UltimoProceso()
        {
            this.JuntaCampo = new HashSet<JuntaCampo>();
            this.JuntaWorkstatus = new HashSet<JuntaWorkstatus>();
            this.WorkstatusSpool = new HashSet<WorkstatusSpool>();
        }
    
        public int UltimoProcesoID { get; set; }
        public string Nombre { get; set; }
        public string NombreIngles { get; set; }
        public Nullable<System.Guid> UsuarioModifica { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public byte[] VersionRegistro { get; set; }
    
        public virtual ICollection<JuntaCampo> JuntaCampo { get; set; }
        public virtual ICollection<JuntaWorkstatus> JuntaWorkstatus { get; set; }
        public virtual ICollection<WorkstatusSpool> WorkstatusSpool { get; set; }
    }
}
