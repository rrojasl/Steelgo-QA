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
    
    public partial class Sam3_Plana
    {
        public Sam3_Plana()
        {
            this.Sam3_Rel_AvisoLlegada_Plana = new HashSet<Sam3_Rel_AvisoLlegada_Plana>();
        }
    
        public int PlanaID { get; set; }
        public int CamionID { get; set; }
        public string Placas { get; set; }
        public bool Activo { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public string Unidad { get; set; }
        public string Modelo { get; set; }
    
        public virtual Sam3_Camion Sam3_Camion { get; set; }
        public virtual ICollection<Sam3_Rel_AvisoLlegada_Plana> Sam3_Rel_AvisoLlegada_Plana { get; set; }
    }
}
