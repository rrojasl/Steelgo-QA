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
    
    public partial class tempNumeroUnicoInventarioRespaldo
    {
        public int NumeroUnicoID { get; set; }
        public int ProyectoID { get; set; }
        public int CantidadRecibida { get; set; }
        public int CantidadDanada { get; set; }
        public int InventarioFisico { get; set; }
        public int InventarioBuenEstado { get; set; }
        public int InventarioCongelado { get; set; }
        public int InventarioTransferenciaCorte { get; set; }
        public int InventarioDisponibleCruce { get; set; }
        public Nullable<System.Guid> UsuarioModifica { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public byte[] VersionRegistro { get; set; }
    }
}
