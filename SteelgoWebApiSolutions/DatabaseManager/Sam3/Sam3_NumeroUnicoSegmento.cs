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
    
    public partial class Sam3_NumeroUnicoSegmento
    {
        public int NumeroUnicoSegmentoID { get; set; }
        public int NumeroUnicoID { get; set; }
        public int ProyectoID { get; set; }
        public string Segmento { get; set; }
        public int CantidadDanada { get; set; }
        public int InventarioFisico { get; set; }
        public int InventarioBuenEstado { get; set; }
        public int InventarioCongelado { get; set; }
        public int InventarioTransferenciaCorte { get; set; }
        public int InventarioDisponibleCruce { get; set; }
        public string Rack { get; set; }
        public bool Activo { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
    
        public virtual Sam3_NumeroUnico Sam3_NumeroUnico { get; set; }
        public virtual Sam3_Proyecto Sam3_Proyecto { get; set; }
    }
}
