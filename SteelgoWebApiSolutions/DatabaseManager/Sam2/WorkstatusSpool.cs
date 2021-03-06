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
    
    public partial class WorkstatusSpool
    {
        public WorkstatusSpool()
        {
            this.EmbarqueSpool = new HashSet<EmbarqueSpool>();
            this.EstimacionSpool = new HashSet<EstimacionSpool>();
            this.InspeccionDimensionalPatio = new HashSet<InspeccionDimensionalPatio>();
            this.PinturaAvance = new HashSet<PinturaAvance>();
            this.PinturaSpool = new HashSet<PinturaSpool>();
            this.ProcesoPinturaDetalle = new HashSet<ProcesoPinturaDetalle>();
            this.ReporteDimensionalDetalle = new HashSet<ReporteDimensionalDetalle>();
            this.RequisicionPinturaDetalle = new HashSet<RequisicionPinturaDetalle>();
            this.SpoolReportePnd = new HashSet<SpoolReportePnd>();
            this.SpoolRequisicion = new HashSet<SpoolRequisicion>();
        }
    
        public int WorkstatusSpoolID { get; set; }
        public int OrdenTrabajoSpoolID { get; set; }
        public Nullable<int> UltimoProcesoID { get; set; }
        public bool TieneLiberacionDimensional { get; set; }
        public bool TieneRequisicionPintura { get; set; }
        public bool TienePintura { get; set; }
        public bool LiberadoPintura { get; set; }
        public bool Preparado { get; set; }
        public bool Embarcado { get; set; }
        public bool Certificado { get; set; }
        public string NumeroEtiqueta { get; set; }
        public Nullable<System.DateTime> FechaEtiqueta { get; set; }
        public Nullable<System.DateTime> FechaPreparacion { get; set; }
        public Nullable<System.DateTime> FechaCertificacion { get; set; }
        public Nullable<System.Guid> UsuarioModifica { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public byte[] VersionRegistro { get; set; }
        public Nullable<System.DateTime> FechaLiberacionCalidad { get; set; }
        public Nullable<System.Guid> UsuarioLiberacionCalidad { get; set; }
        public Nullable<System.DateTime> FechaLiberacionMateriales { get; set; }
        public Nullable<System.Guid> UsuarioLiberacionMateriales { get; set; }
        public Nullable<System.DateTime> FechaOkPnd { get; set; }
        public Nullable<System.Guid> UsuarioOkPnd { get; set; }
        public Nullable<int> FolioPreparacion { get; set; }
    
        public virtual ICollection<EmbarqueSpool> EmbarqueSpool { get; set; }
        public virtual ICollection<EstimacionSpool> EstimacionSpool { get; set; }
        public virtual ICollection<InspeccionDimensionalPatio> InspeccionDimensionalPatio { get; set; }
        public virtual OrdenTrabajoSpool OrdenTrabajoSpool { get; set; }
        public virtual ICollection<PinturaAvance> PinturaAvance { get; set; }
        public virtual ICollection<PinturaSpool> PinturaSpool { get; set; }
        public virtual ICollection<ProcesoPinturaDetalle> ProcesoPinturaDetalle { get; set; }
        public virtual ICollection<ReporteDimensionalDetalle> ReporteDimensionalDetalle { get; set; }
        public virtual ICollection<RequisicionPinturaDetalle> RequisicionPinturaDetalle { get; set; }
        public virtual ICollection<SpoolReportePnd> SpoolReportePnd { get; set; }
        public virtual ICollection<SpoolRequisicion> SpoolRequisicion { get; set; }
        public virtual UltimoProceso UltimoProceso { get; set; }
    }
}
