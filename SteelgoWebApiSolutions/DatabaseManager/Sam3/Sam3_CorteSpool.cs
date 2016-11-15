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
    
    public partial class Sam3_CorteSpool
    {
        public int CorteSpoolID { get; set; }
        public int SpoolID { get; set; }
        public int ItemCodeID { get; set; }
        public int TipoCorte1ID { get; set; }
        public int TipoCorte2ID { get; set; }
        public string EtiquetaMaterial { get; set; }
        public string EtiquetaSeccion { get; set; }
        public decimal Diametro { get; set; }
        public string InicioFin { get; set; }
        public Nullable<int> Cantidad { get; set; }
        public string Observaciones { get; set; }
        public bool Activo { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
    
        public virtual Sam3_ItemCode Sam3_ItemCode { get; set; }
        public virtual Sam3_Spool Sam3_Spool { get; set; }
        public virtual Sam3_TipoCorte Sam3_TipoCorte { get; set; }
        public virtual Sam3_TipoCorte Sam3_TipoCorte1 { get; set; }
    }
}
