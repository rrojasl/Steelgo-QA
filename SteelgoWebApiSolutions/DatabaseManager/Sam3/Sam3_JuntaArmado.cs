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
    
    public partial class Sam3_JuntaArmado
    {
        public int JuntaArmadoID { get; set; }
        public int DetalleArmadoID { get; set; }
        public int TallerID { get; set; }
        public Nullable<int> ObreroID { get; set; }
        public Nullable<System.DateTime> FechaArmado { get; set; }
        public System.DateTime FechaReporte { get; set; }
        public int Activo { get; set; }
        public int UsuarioModificacion { get; set; }
        public System.DateTime FechaModificacion { get; set; }
    }
}
