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
    
    public partial class Sam3_ObrerosUbicacion
    {
        public int ObreroUbicacionID { get; set; }
        public int ObreroID { get; set; }
        public int PatioID { get; set; }
        public System.DateTime FechaInicioLabor { get; set; }
        public Nullable<System.DateTime> FechaFinLabor { get; set; }
        public bool Activo { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
    }
}
