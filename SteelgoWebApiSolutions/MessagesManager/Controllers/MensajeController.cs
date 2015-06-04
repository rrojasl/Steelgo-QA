using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using Newtonsoft.Json;
using CommonTools.Libraries.Strings.Security;
using System.Messaging;
using System.Text;
using System.Threading.Tasks;
using MessagesManager.Utils;
using System.Web.Http;
using System.Data;
using System.Data.SqlClient;
using DatabaseManager.Sam3;

namespace MessagesManager.Controllers
{
    public class MensajeController : ApiController
    {
        Base64Security dataSecurity = new Base64Security();

        private void SendMessageToQueue(string message, int typeMessage)
        {
            if (typeMessage == 1)//Bitacora
            {
                //string path = StringsConfiguration.QuequeBitacora;
                //MessageQueue queueBitacora = new MessageQueue(path);
                //Bitacora bitacora = MappingLog(message);
                //queueBitacora.Send(bitacora);

            }
            else if (typeMessage == 2) //Notificacion
            {
                string path = StringsConfiguration.QuequeNotifications;
                MessageQueue queueNotifications = new MessageQueue("FormatName:Direct=OS:DF-APP-SQL-03\\Private$\\Notifications");
                Sam3_Notificacion notification = MappingNotification(message);
                queueNotifications.Send(notification);
            }
        }

        private void CreateMessage(string objectEncrypted, int typeMessage)
        {
            string message = dataSecurity.Decode(objectEncrypted);
            //password = dataSecurity.Decode(password);

            if (typeMessage == 1)
            {
                //MappingLog(message);
            }
            else if (typeMessage == 2)
            {
                MappingNotification(message);
            }

            SendMessageToQueue(message, typeMessage);
        }

        private Sam3_Notificacion MappingNotification(string message)
        {
            Sam3_Notificacion notification = convertirObjToObj<Sam3_Notificacion>(message);
            return notification;
        }

        //private Bitacora MappingLog(string message)
        //{
        //    Bitacora log = convertirObjToObj<Bitacora>(message);
        //    return log;
        //}

        private T convertirObjToObj<T>(object objecto)
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

        //public List<Notificacion> GetNotificationsByUserID(int userId)
        //{
        //    List<Notificacion> notifications = new List<Notificacion>();

        //    using (IDbConnection connection = DataAccessFactory.CreateConnection("SamDB"))
        //    {
        //        connection.Open();

        //        IDbCommand cmd = connection.CreateCommand();
        //        cmd.CommandText = "select * from Notificacion where usuerID = @UserID and activo = 1 ";

        //        cmd.Parameters.Add(new SqlParameter("@UserId", userId));

        //        IDataReader reader = cmd.ExecuteReader();
        //        while (reader.Read())
        //        {
        //            Notificacion n = new Notificacion()
        //            {
        //                notificacionID = reader.GetInt32(0),
        //                usuarioIDReceptorId = reader.GetInt32(1),
        //                usuarioIDEmisorId = reader.GetInt32(2),
        //                tipoNotificacionId = reader.GetInt32(3),
        //                mensaje = reader.GetString(4),
        //                fechaEnvio = reader.GetDateTime(5),
        //                fechaRecepcion = reader.GetDateTime(6),
        //                estatusLectura = reader.GetBoolean(7),
        //                entidadId = reader.GetInt32(8),
        //                activo = reader.GetBoolean(9)
        //            };
        //            notifications.Add(n);
        //        }
        //        connection.Close();

        //        return notifications;
        //    }
        //}


        public List<Sam3_Notificacion> GetNotificationsByUserID(int userId)
        {
            List<Sam3_Notificacion> notifications = new List<Sam3_Notificacion>();

            using (SamContext ctx = new SamContext())
            {
                ///Genoveva, en la tabla de notificacion no hay un usuerID, como en tu query del metodo de arriba es por eso que hago
                /// la consulta hacia el ID del receptor, no se si deba hacer asi, por favor corrigelo como sea necesario
                notifications = ctx.Sam3_Notificacion.Where(x => x.UsuarioIDReceptor == userId).ToList();
                return notifications;
            }
        }

        /// <summary>
        /// EJEMPLO
        /// El manejo de la base de datos es similar a sam 3, con el entity framework 6 ya no se utilizan los metodos
        /// como acceptChanges o applyChanges, pues el contexto se encarga de seguir los cambios
        /// </summary>
        public void UsoDataBaseManager()
        {
            using (SamContext ctx = new SamContext())
            {
                Sam3_Acero acero = ctx.Sam3_Acero.FirstOrDefault();
                acero.FamiliaAceroID = 10;
                ctx.SaveChanges();
            }
        }
    }
}
