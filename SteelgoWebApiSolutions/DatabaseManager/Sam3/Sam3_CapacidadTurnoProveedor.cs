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
    
    public partial class Sam3_CapacidadTurnoProveedor
    {
        public int CapacidadTurnoProveedorID { get; set; }
        public int TurnoLaboralID { get; set; }
        public int TipoPruebaProveedorID { get; set; }
        public int Capacidad { get; set; }
        public bool Activo { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public System.DateTime FechaModificacion { get; set; }
    }
}
