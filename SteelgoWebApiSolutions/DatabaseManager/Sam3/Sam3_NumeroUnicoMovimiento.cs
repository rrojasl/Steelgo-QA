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
    
    public partial class Sam3_NumeroUnicoMovimiento
    {
        public Sam3_NumeroUnicoMovimiento()
        {
            this.Sam3_Corte = new HashSet<Sam3_Corte>();
            this.Sam3_Corte1 = new HashSet<Sam3_Corte>();
            this.Sam3_CorteDetalle = new HashSet<Sam3_CorteDetalle>();
            this.Sam3_NumeroUnicoCorte = new HashSet<Sam3_NumeroUnicoCorte>();
            this.Sam3_Despacho = new HashSet<Sam3_Despacho>();
        }
    
        public int NumeroUnicoMovimientoID { get; set; }
        public int NumeroUnicoID { get; set; }
        public int ProyectoID { get; set; }
        public int TipoMovimientoID { get; set; }
        public int Cantidad { get; set; }
        public string Segmento { get; set; }
        public System.DateTime FechaMovimiento { get; set; }
        public string Referencia { get; set; }
        public string Estatus { get; set; }
        public bool Activo { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
    
        public virtual ICollection<Sam3_Corte> Sam3_Corte { get; set; }
        public virtual ICollection<Sam3_Corte> Sam3_Corte1 { get; set; }
        public virtual ICollection<Sam3_CorteDetalle> Sam3_CorteDetalle { get; set; }
        public virtual Sam3_NumeroUnico Sam3_NumeroUnico { get; set; }
        public virtual ICollection<Sam3_NumeroUnicoCorte> Sam3_NumeroUnicoCorte { get; set; }
        public virtual Sam3_Proyecto Sam3_Proyecto { get; set; }
        public virtual Sam3_TipoMovimiento Sam3_TipoMovimiento { get; set; }
        public virtual ICollection<Sam3_Despacho> Sam3_Despacho { get; set; }
    }
}
