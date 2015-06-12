
using MessagesManager.Utils;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using DatabaseManager.Sam3;
using System.Messaging;

namespace MessagesManager.Controllers
{
    public class MessageLibrary
    {
        /// <summary>
        /// Método que envía el mensaje a la cola de mensajes dependiendo de su tipo
        /// 1 es tipo Bitácora
        /// 2 es tipo Notificación
        /// </summary>
        /// <param name="message">Texto del mensaje (json)</param>
        /// <param name="typeMessage">Tipo de Mensaje</param>
        public void SendMessageToQueue(string message, int typeMessage)
        {
            if (typeMessage == 1)//Bitacora
            {
                //Dirección del servidor para la cola de tipo Bitácora
                string path = StringsConfiguration.QuequeBitacora; 
                MessageQueue queueBitacora = new MessageQueue(path);
                queueBitacora.Formatter = new XmlMessageFormatter(new Type[] { typeof(Bitacora) });
                Bitacora bitacora = MappingLog(message);
                //Enviar mensaje a la cola de mensajes
                queueBitacora.Send(bitacora);
            }
            else if (typeMessage == 2) //Notificacion
            {
                //Dirección del servidor para la cola de tipo Notificación
                string path = StringsConfiguration.QuequeNotifications; 
                MessageQueue queueNotifications = new MessageQueue(path);
                queueNotifications.Formatter = new XmlMessageFormatter(new Type[] { typeof(Notificacion) });
                Notificacion notification = MappingNotification(message);
                //Enviar mensaje a la cola de mensajes
                queueNotifications.Send(notification);
            }
        }

        /// <summary>
        /// Método para mapear el mensaje de Bitácora
        /// El mensaje es recibido en JSON y se convierte a Objeto de tipo Bitácora
        /// </summary>
        /// <param name="message">Texto del mensaje (json)</param>
        /// <returns>Objeto tipo Bitácora</returns>
        public Bitacora MappingLog(string message)
        {
            Bitacora log = convertirObjToObj<Bitacora>(message);
            return log;
        }

        /// <summary>
        /// Método para mapear el mensaje de Notificación
        /// El mensaje es recibido en JSON y se convierte a Objeto de tipo Notificación
        /// </summary>
        /// <param name="message">Texto del mensaje (json)</param>
        /// <returns>Objeto de tipo Notificación</returns>
        public Notificacion MappingNotification(string message)
        {
            Notificacion notification = convertirObjToObj<Notificacion>(message);
            return notification;
        }

        /// <summary>
        /// Método que convierte JSON a Objeto tipo T
        /// </summary>
        /// <typeparam name="T">Objeto tipo T (Bitácora/Notificación)</typeparam>
        /// <param name="json">Texto del mensaje </param>
        /// <returns>Objeto tipo T (Bitácora/Notificación)</returns>
        public T convertirObjToObj<T>(string json)
        {
            T p = default(T);
            try
            {
                 p = JsonConvert.DeserializeObject<T>(json);
            }
            catch (JsonSerializationException jsE)
            {
                string error = jsE.Message;
            }

            return p;
        }

        /// <summary>
        /// Método que obtiene las notificaciones de un usuario
        /// Notificaciones Activas y que no hayan sido leidas
        /// </summary>
        /// <param name="userId">ID del usuario</param>
        /// <returns>Lista de Notificaciones</returns>
        public List<Notificacion> GetNotificationsByUserID(int userId)
        {
            List<Notificacion> notifications = new List<Notificacion>();

            using (SamContext ctx = new SamContext())
            {
                notifications = ctx.Sam3_Notificacion
                    .Join(ctx.Sam3_Usuario, n => n.UsuarioIDEmisor, u => u.UsuarioID,
                          (n, u) => new
                          {
                              n.NotificacionID,
                              n.UsuarioIDReceptor,
                              n.UsuarioIDEmisor,
                              n.TipoNotificacionID,
                              n.Mensaje,
                              n.FechaEnvio,
                              n.FechaRecepcion,
                              n.EstatusLectura,
                              n.Activo,
                              n.UsuarioModificacion,
                              n.FechaModificacion,
                              u.NombreUsuario
                          }).ToList()
                    .Where(x => x.UsuarioIDReceptor == userId && x.Activo == true && x.EstatusLectura == false).ToList()
                    .Select(x => new Notificacion
                    {
                        NotificacionID = x.NotificacionID,
                        UsuarioIDReceptor = x.UsuarioIDReceptor,
                        UsuarioIDEmisor = x.UsuarioIDEmisor,
                        TipoNotificacionID = x.TipoNotificacionID,
                        Mensaje = x.Mensaje,
                        FechaEnvio = x.FechaEnvio,
                        FechaRecepcion = x.FechaRecepcion,
                        EstatusLectura = x.EstatusLectura,
                        Activo = x.Activo,
                        UsuarioModificacion = x.UsuarioModificacion,
                        FechaModificacion = x.FechaModificacion,
                        NombreUsuarioEmisor = x.NombreUsuario
                    }).ToList();
                return notifications;
            }
        }

        /// <summary>
        /// Método para marcar una notificación como Leida
        /// </summary>
        /// <param name="notificationID">ID de la notificación</param>
        public void GetnotificationsByNotificationID(int notificationID)
        {
            using (SamContext ctx = new SamContext())
            {
                Sam3_Notificacion notificacion = new Sam3_Notificacion();
                notificacion = ctx.Sam3_Notificacion.Where(x => x.NotificacionID == notificationID).First();
                notificacion.EstatusLectura = true;
                ctx.SaveChanges();
            }
        }
    }
}