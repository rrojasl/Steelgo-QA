using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Patios
{
    public class Patios
    {
        public int PatioID { get; set; }
        public string Nombre { get; set; }
        public string Propietario { get; set; }
        public string Descripcion { get; set; }
        public bool Activo { get; set; }
        public int? UsuarioModificacion { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public bool RequierePermisoAduana { get; set; }
    }
}