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
    
    public partial class Sam3_Consumible
    {
        public int ConsumibleID { get; set; }
        public int PatioID { get; set; }
        public string Codigo { get; set; }
        public Nullable<int> Kilogramos { get; set; }
        public Nullable<int> Activo { get; set; }
        public int UsuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
    
        public virtual Sam3_Patio Sam3_Patio { get; set; }
    }
}
