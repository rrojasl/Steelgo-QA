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
    
    public partial class Sam3_Despacho
    {
        public int DespachoID { get; set; }
        public int ProyectoID { get; set; }
        public int OrdenTrabajoSpoolID { get; set; }
        public int MaterialSpoolID { get; set; }
        public int NumeroUnicoID { get; set; }
        public int SalidaInventarioID { get; set; }
        public string Segmento { get; set; }
        public bool EsEquivalente { get; set; }
        public int Cantidad { get; set; }
        public bool Cancelado { get; set; }
        public System.DateTime FechaDespacho { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public bool Activo { get; set; }
        public Nullable<int> DespachadorID { get; set; }
    
        public virtual Sam3_NumeroUnico Sam3_NumeroUnico { get; set; }
        public virtual Sam3_Proyecto Sam3_Proyecto { get; set; }
        public virtual Sam3_NumeroUnicoMovimiento Sam3_NumeroUnicoMovimiento { get; set; }
    }
}
