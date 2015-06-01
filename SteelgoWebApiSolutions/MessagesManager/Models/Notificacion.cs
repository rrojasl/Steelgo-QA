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
    public class NotificacionLocal
    {
        public int notificacionID { get; set; }
        public int usuarioIDReceptorId { get; set; }
        public int usuarioIDEmisorId { get; set; }
        public int tipoNotificacionId { get; set; }
        public String mensaje { get; set; }
        public DateTime fechaEnvio { get; set; }
        public DateTime fechaRecepcion { get; set; }
        public bool estatusLectura { get; set; }
        public int entidadId { get; set; }
        public bool activo { get; set; }
    }
}
