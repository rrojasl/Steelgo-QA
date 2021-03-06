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
    
    public partial class JuntaReportePnd
    {
        public JuntaReportePnd()
        {
            this.JuntaReportePndCuadrante = new HashSet<JuntaReportePndCuadrante>();
            this.JuntaReportePndSector = new HashSet<JuntaReportePndSector>();
        }
    
        public int JuntaReportePndID { get; set; }
        public int ReportePndID { get; set; }
        public int JuntaWorkstatusID { get; set; }
        public int JuntaRequisicionID { get; set; }
        public Nullable<int> TipoRechazoID { get; set; }
        public System.DateTime FechaPrueba { get; set; }
        public Nullable<int> Hoja { get; set; }
        public bool Aprobado { get; set; }
        public string Observaciones { get; set; }
        public Nullable<System.Guid> UsuarioModifica { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public byte[] VersionRegistro { get; set; }
        public Nullable<int> JuntaSeguimientoID1 { get; set; }
        public Nullable<int> JuntaSeguimientoID2 { get; set; }
    
        public virtual aspnet_Users aspnet_Users { get; set; }
        public virtual JuntaRequisicion JuntaRequisicion { get; set; }
        public virtual JuntaWorkstatus JuntaWorkstatus { get; set; }
        public virtual ReportePnd ReportePnd { get; set; }
        public virtual TipoRechazo TipoRechazo { get; set; }
        public virtual ICollection<JuntaReportePndCuadrante> JuntaReportePndCuadrante { get; set; }
        public virtual ICollection<JuntaReportePndSector> JuntaReportePndSector { get; set; }
    }
}
