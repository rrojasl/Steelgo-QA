using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace BackEndSAM.Controllers
{
     [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DummyPatioController : ApiController
    {
        // GET api/patio
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/patio/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/patio
        public void Post(string patio, string username, string token)
        {
        }

        // PUT api/patio/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/patio/5
        public void Delete(int id)
        {
        }
    }
}
