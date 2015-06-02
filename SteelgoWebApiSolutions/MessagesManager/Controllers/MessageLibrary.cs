using MessagesManager.Models;
using MessagesManager.Utils;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

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
                Bitacora bitacora = MappingLog(message);
                queueBitacora.Send(bitacora);

            }
            else if (typeMessage == 2) //Notificacion
            {
                string path = StringsConfiguration.QuequeNotifications;
                MessageQueue queueNotifications = new MessageQueue(path);
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

        public T convertirObjToObj<T>(object objecto)
        {
            T p = default(T);
            try
            {
                string json = JsonConvert.SerializeObject(objecto);
                bool nulls = json.Contains("null");

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

            using (IDbConnection connection = DataAccessFactory.CreateConnection("SamDB"))
            {
                connection.Open();

                IDbCommand cmd = connection.CreateCommand();
                cmd.CommandText = "select * from Notificacion where usuerID = @UserID and activo = 1 ";

                cmd.Parameters.Add(new SqlParameter("@UserId", userId));

                IDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    Notificacion n = new Notificacion()
                    {
                        notificacionID = reader.GetInt32(0),
                        usuarioIDReceptorId = reader.GetInt32(1),
                        usuarioIDEmisorId = reader.GetInt32(2),
                        tipoNotificacionId = reader.GetInt32(3),
                        mensaje = reader.GetString(4),
                        fechaEnvio = reader.GetDateTime(5),
                        fechaRecepcion = reader.GetDateTime(6),
                        estatusLectura = reader.GetBoolean(7),
                        entidadId = reader.GetInt32(8),
                        activo = reader.GetBoolean(9)
                    };
                    notifications.Add(n);
                }
                connection.Close();

                return notifications;
            }
        }

    }
}