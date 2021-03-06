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
    
    public partial class OrdenTrabajoMaterial
    {
        public int OrdenTrabajoMaterialID { get; set; }
        public int OrdenTrabajoSpoolID { get; set; }
        public int MaterialSpoolID { get; set; }
        public Nullable<int> DespachoID { get; set; }
        public Nullable<int> CorteDetalleID { get; set; }
        public bool TieneInventarioCongelado { get; set; }
        public Nullable<int> NumeroUnicoCongeladoID { get; set; }
        public string SegmentoCongelado { get; set; }
        public Nullable<int> CantidadCongelada { get; set; }
        public bool CongeladoEsEquivalente { get; set; }
        public Nullable<int> NumeroUnicoSugeridoID { get; set; }
        public string SegmentoSugerido { get; set; }
        public bool SugeridoEsEquivalente { get; set; }
        public Nullable<bool> TieneCorte { get; set; }
        public bool TieneDespacho { get; set; }
        public bool DespachoEsEquivalente { get; set; }
        public Nullable<int> NumeroUnicoDespachadoID { get; set; }
        public string SegmentoDespachado { get; set; }
        public Nullable<int> CantidadDespachada { get; set; }
        public bool FueReingenieria { get; set; }
        public Nullable<System.Guid> UsuarioModifica { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public byte[] VersionRegistro { get; set; }
        public bool EsAsignado { get; set; }
        public Nullable<int> NumeroUnicoAsignadoID { get; set; }
        public string SegmentoAsignado { get; set; }
    
        public virtual aspnet_Users aspnet_Users { get; set; }
        public virtual CorteDetalle CorteDetalle { get; set; }
        public virtual Despacho Despacho { get; set; }
        public virtual MaterialSpool MaterialSpool { get; set; }
        public virtual NumeroUnico NumeroUnico { get; set; }
        public virtual NumeroUnico NumeroUnico1 { get; set; }
        public virtual NumeroUnico NumeroUnico2 { get; set; }
        public virtual NumeroUnico NumeroUnico3 { get; set; }
        public virtual OrdenTrabajoSpool OrdenTrabajoSpool { get; set; }
    }
}
