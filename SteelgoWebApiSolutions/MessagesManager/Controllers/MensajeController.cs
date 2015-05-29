using MessagesManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;

namespace MessagesManager.Controllers
{
    public class MensajeController : ApiController
    {
        // GET api/mensaje
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/mensaje/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/mensaje
        public void Post([FromBody]string value)
        {
        }

        // PUT api/mensaje/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/mensaje/5
        public void Delete(int id)
        {
        }

        private void EnviarMensaje(string mensaje, int tipo)
        {
            if (tipo == 1)//Bitacora
            {
            }
            else if ( tipo== 2) //Notificacion
            {

            }

        }

       private Notificacion mapearMensajeNotificacion(string mensaje)
       {
           return null;
       }

       private Bitacora mapearMensajeBitacora(string mensaje)
       {
           Bitacora b = mensaje
           return null;
       }


       public T convertirObjToObj<T>(object objeto)
       {
           T p = default(T);
           try
           {
               string json = JsonConvert.SerializeObject(objeto);
               bool nulls = json.Contains("null");

               p = JsonConvert.DeserializeObject<T>(json);
           }
           catch (JsonSerializationException jsE)
           {
               string error = jsE.Message;
           }

           return p;
       }

    }
}
