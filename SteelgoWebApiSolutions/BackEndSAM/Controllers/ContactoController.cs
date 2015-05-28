using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using BackEndSAM.Models;

namespace BackEndSAM.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ContactoController : ApiController
    {
        // GET api/contacto
        public IEnumerable<Contacto> Get()
        {
            List<Contacto> lstcontacto = new List<Contacto>();
            Contacto contacto = new Contacto();
            contacto.ContactoID = 12;
            contacto.Nombre = "Pako M.";
            lstcontacto.Add(contacto);

            Contacto contacto1 = new Contacto();
            contacto1.ContactoID = 13;
            contacto1.Nombre = "Fernanda M.";
            lstcontacto.Add(contacto1);

            return lstcontacto.AsEnumerable();
        }

        // GET api/contacto/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/contacto
        public void Post([FromBody]string value)
        {
        }

        // PUT api/contacto/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/contacto/5
        public void Delete(int id)
        {
        }
    }
}
