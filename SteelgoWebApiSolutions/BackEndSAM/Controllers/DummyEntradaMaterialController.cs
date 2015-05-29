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
    public class DummyEntradaMaterialController : ApiController
    {
        // GET api/entradamaterial
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/entradamaterial/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/entradamaterial
        public void Post([FromBody]string value)
        {
        }

        // PUT api/entradamaterial/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/entradamaterial/5
        public void Delete(int id)
        {
        }
    }
}
