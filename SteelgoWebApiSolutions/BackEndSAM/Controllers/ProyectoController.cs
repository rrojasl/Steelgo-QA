using BackEndSAM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace BackEndSAM.Controllers
{
    [EnableCors(origins: "http://localhost:61102", headers: "*", methods: "*")]
    public class ProyectoController : ApiController
    {
        // GET api/<controller>
        public ListObject[] Get()
        {
            ListObject[] returnObject = new ListObject[2];
            returnObject[0] = new ListObject("id1", "value1");
            returnObject[1] = new ListObject("id2", "value2");
            return returnObject;
        }

        // POST api/<controller>
        public void Post([FromUri] int[] proys, [FromUri] string username)
        {
            var content = Request.Content;
        }
    }
}