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
    
    public partial class Sam3_Cuadrante
    {
        public int CuadranteID { get; set; }
        public int PatioID { get; set; }
        public Nullable<int> ZonaID { get; set; }
        public string Nombre { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public Nullable<bool> Activo { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
    
        public virtual Sam3_Patio Sam3_Patio { get; set; }
    }
}
