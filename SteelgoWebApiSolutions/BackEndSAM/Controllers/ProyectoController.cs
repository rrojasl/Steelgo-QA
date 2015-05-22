using BackEndSAM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BackEndSAM.Controllers
{
    [EnableCors(origins: "http://localhost:8080", headers: "*", methods: "*")]
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
    }
}