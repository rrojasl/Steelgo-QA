
using MessagesManager.Utils;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
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

                queueBitacora.Formatter = new XmlMessageFormatter(new Type[] { typeof(Bitacora) });
                Bitacora bitacora = MappingLog(message);
                queueBitacora.Send(bitacora);

            }
            else if (typeMessage == 2) //Notificacion
            {
                string path = StringsConfiguration.QuequeNotifications;
                MessageQueue queueNotifications = new MessageQueue(path);
                queueNotifications.Formatter = new XmlMessageFormatter(new Type[] { typeof(Notificacion) });
                Notificacion notification = MappingNotification(message);
                queueNotifications.Send(notification);
                insertNotification(notification);
            }
        }

        public void insertNotification(Notificacion notification)
        {
            using (SamContext ctx = new SamContext())
            {
                Notificacion noti = new Notificacion();
                noti.NotificacionID = notification.NotificacionID;
                noti.UsuarioIDReceptor = notification.UsuarioIDReceptor;
                noti.UsuarioIDEmisor = notification.UsuarioIDEmisor;
                noti.TipoNotificacionID = notification.TipoNotificacionID;
                noti.Mensaje = notification.Mensaje;
                noti.FechaEnvio = notification.FechaEnvio;
                noti.FechaRecepcion = notification.FechaRecepcion;
                noti.EstatusLectura = notification.EstatusLectura;
                noti.EntidadID = notification.EntidadID;
                noti.Activo = notification.Activo;
                //noti.Entidad = notification.Entidad;
                //noti.TipoNotificacion = notification.TipoNotificacion;

                ctx.Notificacion.Add(noti);
                ctx.SaveChanges();
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

        public List<Notificacion> GetNotificationsByUserID(int userId)
        {
            List<Notificacion> notifications = new List<Notificacion>();

            using (SamContext ctx = new SamContext())
            {
                notifications = ctx.Notificacion
                    .Where(x => x.UsuarioIDReceptor == userId && x.Activo == true).ToList()
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
                        EntidadID = x.EntidadID,
                        Activo = x.Activo
                    }).ToList();

                return notifications;
            }
        }

    }
}