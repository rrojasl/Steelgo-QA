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

        // GET api/<controller>/5
        public string Get(int id)
        {
            List<Notificacion> notifications = messages.GetNotificationsByUserID(id);

            string json = convertirObjToJson<List<Notificacion>>(notifications);
            string message = dataSecurity.Encode(json);
            return message;


        }

        // POST api/<controller>
        public void Post(string objectEncrypted, string typeMessage)
        {
            string message = dataSecurity.Decode(objectEncrypted);
            int typeMsg = Convert.ToInt32(typeMessage);

            messages.SendMessageToQueue(message, typeMsg);
        }

        // PUT api/<controller>/5
        public void Put(int id)
        {
            messages.GetnotificationsByNotificationID(id);
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }

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