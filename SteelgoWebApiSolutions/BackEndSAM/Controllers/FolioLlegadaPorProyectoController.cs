using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BackEndSAM.Models;
using System.Web.Http.Cors;

namespace BackEndSAM.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class FolioLlegadaPorProyectoController : ApiController
    {
        // GET api/foliollegadaporproyecto
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/foliollegadaporproyecto/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/foliollegadaporproyecto
        public void Post([FromBody]string value)
        {
        }

        // PUT api/foliollegadaporproyecto/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/foliollegadaporproyecto/5
        public void Delete(int id)
        {
        }
    }
}
