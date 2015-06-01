using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MessagesManager.Models
{
    [Serializable()]
    public class BitacoraLocal
    {
        public int BitacoraID {get; set;}
        public int UsuarioID {get; set;}
        public int TipoActividadID {get; set;}
        public string Mensaje {get; set;}
        public DateTime Fecha {get; set;}
        public int EntidadID { get; set; }
    }
}
