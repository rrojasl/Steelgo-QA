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
    
    public partial class Sam3_PinturaSpool_Obrero
    {
        public int PinturaSpoolObreroId { get; set; }
        public Nullable<int> PinturaSpoolID { get; set; }
        public Nullable<int> ObreroID { get; set; }
        public Nullable<int> PasoID { get; set; }
        public bool Activo { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
    
        public virtual Sam3_Obrero Sam3_Obrero { get; set; }
        public virtual Sam3_PinturaSpool Sam3_PinturaSpool { get; set; }
    }
}