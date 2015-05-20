using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SecurityManager.Controllers
{
    public class PreferenceController : ApiController
    {
        // GET securitymanager/preference/api/
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET securitymanager/preference/api/5
        public string Get(int id)
        {
            return "value";
        }

        // POST securitymanager/preference/api/
        public void Post([FromBody]string value)
        {
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