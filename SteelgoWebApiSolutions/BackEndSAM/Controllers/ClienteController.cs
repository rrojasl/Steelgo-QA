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
    public class ClienteController : ApiController
    {
        // GET api/dummyobtenercliente
        public IEnumerable<Cliente> Get(string token)
        {
            List<Cliente> lstCliente = new List<Cliente>();
            Cliente cliente = new Cliente();
            cliente.ClienteID = "1";
            cliente.Nombre = "Cliente Prueba 1";
            lstCliente.Add(cliente);

            Cliente cliente1 = new Cliente();
            cliente1.ClienteID = "2";
            cliente1.Nombre = "Cliente Prueba 2";
            lstCliente.Add(cliente1);

            return lstCliente.AsEnumerable();
        }

        // GET api/dummyobtenercliente/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/dummyobtenercliente
        public void Post([FromBody]string value)
        {
        }

        // PUT api/dummyobtenercliente/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/dummyobtenercliente/5
        public void Delete(int id)
        {
        }
    }
}
