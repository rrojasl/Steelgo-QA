using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MessagesManager
{
    public class Notificacion
    {
        public int NotificacionID { get; set; }
        public int UsuarioIDReceptor { get; set; }
        public int UsuarioIDEmisor { get; set; }
        public int TipoNotificacionID { get; set; }
        public string Mensaje { get; set; }
        public string FechaEnvio { get; set; }
        public string FechaRecepcion { get; set; }
        public bool EstatusLectura { get; set; }
        public bool Activo { get; set; }
        //public DateTime FechaModificacion{ get; set; }
        //public int UsuarioModificacionID { get; set; }
    }
}