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
    
    public partial class Sam3_Transportista
    {
        public Sam3_Transportista()
        {
            this.Sam3_FolioAvisoLlegada = new HashSet<Sam3_FolioAvisoLlegada>();
            this.Sam3_Rel_Vehiculo_Transportista = new HashSet<Sam3_Rel_Vehiculo_Transportista>();
        }
    
        public int TransportistaID { get; set; }
        public int ContactoID { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Direccion { get; set; }
        public string Telefono { get; set; }
        public bool Activo { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
    
        public virtual Sam3_Contacto Sam3_Contacto { get; set; }
        public virtual ICollection<Sam3_FolioAvisoLlegada> Sam3_FolioAvisoLlegada { get; set; }
        public virtual ICollection<Sam3_Rel_Vehiculo_Transportista> Sam3_Rel_Vehiculo_Transportista { get; set; }
    }
}
