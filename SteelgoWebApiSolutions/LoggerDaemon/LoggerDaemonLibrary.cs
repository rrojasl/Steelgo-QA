using DatabaseManager.Sam3;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Messaging;
using System.Text;
using System.Threading.Tasks;

namespace LoggerDaemon
{
    public class LoggerDaemonLibrary
    {
        public static void ReadMessagesNotificaciones()
        {
            try
            {
                MessageQueue mq = new MessageQueue(".\\Private$\\Notificaciones");

                bool x = mq.CanRead;

                foreach (System.Messaging.Message message in mq.GetAllMessages())
                {

                    message.Formatter = new XmlMessageFormatter(new Type[] { typeof(Notificacion) });
                    Notificacion p = (Notificacion)message.Body;
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
                MessageQueue mq = new MessageQueue(".\\Private$\\Bitacora");

                bool x = mq.CanRead;

                foreach (System.Messaging.Message message in mq.GetAllMessages())
                {
                    message.Formatter = new XmlMessageFormatter(new Type[] { typeof(Bitacora) });
                    Bitacora p = (Bitacora)message.Body;
                }

                mq.Purge();
            }
            catch (Exception ex)
            {
                var texto = new UTF8Encoding(true).GetBytes("ex: " + ex.Message);
            }
        }

        public static void ReadPruebas()
        {
            string mensaje = string.Empty;
            // eliminar el fichero si ya existe
            // var archivo = @"C:\Users\luis.manriquez\Mensajes.txt";//C:\Users\genoveva.torres\Mensajes.txt";
            var archivo = @"C:\Users\genoveva.torres\Mensajes.txt";

            if (!File.Exists(archivo))
            {
                // crear el fichero
                using (FileStream fileStream = File.OpenWrite(archivo))
                {
                    try
                    {
                        MessageQueue mq = new MessageQueue(".\\Private$\\prueba");

                        var texto = new UTF8Encoding(true).GetBytes("Aqui va el texto que desean volvar al fichero");
                        fileStream.Write(texto, 0, texto.Length);

                        bool x = mq.CanRead;
                        texto = new UTF8Encoding(true).GetBytes("111: " + x);
                        fileStream.Write(texto, 0, texto.Length); ;

                        foreach (System.Messaging.Message message in mq.GetAllMessages())
                        {
                            //para prueba de lectura de mensajes comentar al liberar a prod
                            var texto1 = new UTF8Encoding(true).GetBytes(message.Id + "\t\n");
                            fileStream.Write(texto1, 0, texto1.Length);

                            message.Formatter = new XmlMessageFormatter(new Type[] { typeof(Notificacion) });
                            Notificacion p = (Notificacion)message.Body;
                            LoggerDaemonLibrary.insertNotification(p);
                            //para prueba de lectura de mensajes comentar al liberar a prod
                            var mensaje1 = new UTF8Encoding(true).GetBytes(p.Activo + " " + p.TipoNotificacionID + " " + p.UsuarioIDEmisor);
                            fileStream.Write(mensaje1, 0, mensaje1.Length);

                        }

                        mq.Purge();
                        //para prueba de lectura de mensajes comentar al liberar a prod
                        fileStream.Flush();

                    }
                    catch (Exception ex)
                    {
                        var texto = new UTF8Encoding(true).GetBytes("ex: " + ex.Message);
                        fileStream.Write(texto, 0, texto.Length);
                        fileStream.Flush();

                        mensaje = "No Message";
                    }
                }
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
                //noti.UsuarioModificacionID = notification.UsuarioModificacionID;
                //noti.FechaModificacion = notification.FechaModificacion;

                ctx.Sam3_Notificacion.Add( noti);
                ctx.SaveChanges();               
            }
        }
    }
}
