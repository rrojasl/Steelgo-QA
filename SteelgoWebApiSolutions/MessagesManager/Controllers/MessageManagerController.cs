using CommonTools.Libraries.Strings.Security;
using DatabaseManager.Sam3;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace MessagesManager.Controllers
{
    public class MessageManagerController : ApiController
    {
        Base64Security dataSecurity = new Base64Security();
        MessageLibrary messages = new MessageLibrary();
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

       /// <summary>
       /// Obtiene las notificaciones por ID de usuario
       /// </summary>
       /// <param name="id">ID de usuario</param>
       /// <returns>Notificaciones en formato JSON codificado</returns>
        public string Get(int id)
        {
            List<Notificacion> notifications = messages.GetNotificationsByUserID(id);
            string json = convertirObjToJson<List<Notificacion>>(notifications);
            string message = dataSecurity.Encode(json);
            return message;
        }

        /// <summary>
        /// Crea el mensaje en la cola de mensajes
        /// </summary>
        /// <param name="objectEncrypted">Mensaje encriptado</param>
        /// <param name="typeMessage">Tipo de Mensaje (1: Bitácora, 2: Notificación)</param>
        public void Post(string objectEncrypted, string typeMessage)
        {
            string message = dataSecurity.Decode(objectEncrypted);
            int typeMsg = Convert.ToInt32(typeMessage);

            messages.SendMessageToQueue(message, typeMsg);
        }

       /// <summary>
       /// Cambia Estatus Lectura de una Notificación a Leida
       /// </summary>
       /// <param name="id">ID de notificación</param>
        public void Put(int id)
        {
            messages.GetnotificationsByNotificationID(id);
        }
        
        public void Delete(int id)
        {
        }

        /// <summary>
        /// Método para convertir las Listas de Notificaciones a JSON
        /// </summary>
        /// <typeparam name="T">Objeto tipo Notificacion/typeparam>
        /// <param name="objeto">Lista tipo Notificación</param>
        /// <returns>Lista de notificaciones en formato JSON</returns>
        private string convertirObjToJson<T>(T objeto)
        {
            string json = string.Empty;
            try
            {
                json = JsonConvert.SerializeObject(objeto);
            }
            catch (JsonSerializationException jsE)
            {
                string error = jsE.Message;
            }

            return json;
        }
    }
}