using DatabaseManager.Sam3;
using DatabaseManager.SamLogging;
using System;
using System.IO;
using System.Messaging;
using System.Text;

namespace LoggerDaemon
{
    public class LoggerDaemonLibrary
    {
        public static void ReadMessagesNotificaciones()
        {
            try
            {
                string path = StringsConfiguration.QuequeNotifications;
                MessageQueue mq = new MessageQueue(path);

                foreach (System.Messaging.Message message in mq.GetAllMessages())
                {
                    message.Formatter = new XmlMessageFormatter(new Type[] { typeof(Notificacion) });
                    Notificacion p = (Notificacion)message.Body;
                    LoggerDaemonLibrary.insertNotification(p);
                }

                mq.Purge();
            }
            catch (Exception ex)
            {
                var texto = new UTF8Encoding(true).GetBytes("ex: " + ex.Message);
            }
        }

        public static void ReadMessagesBitacora()
        {
            try
            {
                string path = StringsConfiguration.QuequeBitacora;
                MessageQueue mq = new MessageQueue(path);

                foreach (System.Messaging.Message message in mq.GetAllMessages())
                {
                    message.Formatter = new XmlMessageFormatter(new Type[] { typeof(Bitacora) });
                    Bitacora p = (Bitacora)message.Body;
                    LoggerDaemonLibrary.insertBitacora(p);
                }

                mq.Purge();

            }
            catch (Exception ex)
            {
                var texto = new UTF8Encoding(true).GetBytes("ex: " + ex.Message);
            }
        }

        public static void insertNotification(Notificacion notification)
        {
            using (SamContext ctx = new SamContext())
            {
                Sam3_Notificacion noti = new Sam3_Notificacion();
                noti.NotificacionID = notification.NotificacionID;
                noti.UsuarioIDReceptor = notification.UsuarioIDReceptor;
                noti.UsuarioIDEmisor = notification.UsuarioIDEmisor;
                noti.TipoNotificacionID = notification.TipoNotificacionID;
                noti.Mensaje = notification.Mensaje;
                noti.FechaEnvio = notification.FechaEnvio;
                noti.FechaRecepcion = notification.FechaRecepcion;
                noti.EstatusLectura = notification.EstatusLectura;
                noti.Activo = notification.Activo;
                noti.UsuarioModificacion = notification.UsuarioModificacion;
                noti.FechaModificacion = notification.FechaModificacion;

                ctx.Sam3_Notificacion.Add(noti);
                ctx.SaveChanges();
            }
        }

        public static void insertBitacora(Bitacora log)
        {
            using (SamLogging ctx = new SamLogging())
            {
                DatabaseManager.SamLogging.Bitacora bitacora = new DatabaseManager.SamLogging.Bitacora();
                bitacora.BitacoraId = log.BitacoraId;
                bitacora.UsuarioId = log.UsuarioId;
                bitacora.TipoActividadID = log.TipoActividadID;
                bitacora.Mensaje = log.Mensaje;
                bitacora.Fecha = log.Fecha;
                bitacora.EntidadId = log.EntidadId;

                ctx.Bitacora.Add(bitacora);
                ctx.SaveChanges();
            }
        }
    }
}
