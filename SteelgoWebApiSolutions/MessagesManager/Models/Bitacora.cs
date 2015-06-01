using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MessagesManager.Models
{
    /// <summary>
    ///Cambie el nombre de la clase para que no exista ambiguedad entre el nombre de esta y el de la entidad de Database Manager
    /// </summary>
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
