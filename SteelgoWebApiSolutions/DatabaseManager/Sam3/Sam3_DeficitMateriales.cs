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
    
    public partial class Sam3_DeficitMateriales
    {
        public int DeficitID { get; set; }
        public int OrdenTrabajoID { get; set; }
        public int ItemCodeID { get; set; }
        public Nullable<int> SpoolID { get; set; }
        public int Deficit { get; set; }
        public bool Activo { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public bool Solucionado { get; set; }
    }
}
