using CommonTools.Libraries.Strings.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
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
            return "value";
        }

        // POST api/<controller>
        public void Post(string objectEncrypted, int typeMessage)
        {
            string message = dataSecurity.Decode(objectEncrypted);
            //password = dataSecurity.Decode(password);

            if (typeMessage == 1)
            {
                messages.MappingLog(message);
            }
            else if (typeMessage == 2)
            {
                messages.MappingNotification(message);
            }

            messages.SendMessageToQueue(message, typeMessage);
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}