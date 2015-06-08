
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
        public void SendMessageToQueue(string message, int typeMessage)
        {
            if (typeMessage == 1)//Bitacora
            {
                string path = StringsConfiguration.QuequeBitacora;
                MessageQueue queueBitacora = new MessageQueue(path);
                //MessageQueue queueBitacora = new MessageQueue(".\\Private$\\Bitacora");
                queueBitacora.Formatter = new XmlMessageFormatter(new Type[] { typeof(Bitacora) });
                Bitacora bitacora = MappingLog(message);

                queueBitacora.Send(bitacora);
            }
            else if (typeMessage == 2) //Notificacion
            {
                string path = StringsConfiguration.QuequeNotifications;
                MessageQueue queueNotifications = new MessageQueue(path);
                //MessageQueue queueNotifications = new MessageQueue(".\\Private$\\Notificacion");
                queueNotifications.Formatter = new XmlMessageFormatter(new Type[] { typeof(Notificacion) });
                Notificacion notification = MappingNotification(message);
                queueNotifications.Send(notification);
            }
        }
        public Notificacion MappingNotification(string message)
        {
            Notificacion notification = convertirObjToObj<Notificacion>(message);
            return notification;
        }

        public Bitacora MappingLog(string message)
        {
            Bitacora log = convertirObjToObj<Bitacora>(message);
            return log;
        }

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

        public List<Sam3_Notificacion> GetNotificationsByUserID(int userId)
        {
            List<Sam3_Notificacion> notifications = new List<Sam3_Notificacion>();

            using (SamContext ctx = new SamContext())
            {
                notifications = ctx.Sam3_Notificacion
                    .Where(x => x.UsuarioIDReceptor == userId && x.Activo == true).ToList()
                    .Select(x => new Sam3_Notificacion
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
                        FechaModificacion = x.FechaModificacion
                    }).ToList();

                return notifications;
            }
        }

    }
}