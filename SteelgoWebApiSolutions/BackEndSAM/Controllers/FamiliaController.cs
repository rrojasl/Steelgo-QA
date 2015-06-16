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
    public class FamiliaController : ApiController
    {
        // GET api/familia
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/familia/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/familia
        public void Post([FromBody]string value)
        {
        }

        // PUT api/familia/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/familia/5
        public void Delete(int id)
        {
        }
    }
}
