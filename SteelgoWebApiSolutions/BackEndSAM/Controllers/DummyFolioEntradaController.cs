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
    public class DummyFolioEntradaController : ApiController
    {
        // GET api/dummyfolioentrada
        public IEnumerable<FolioEntrada> Get()
        {
            List<FolioEntrada> lstfolioentrada = new List<FolioEntrada>();
            FolioEntrada folioentrada = new FolioEntrada();
            FolioEntrada folioentrada1 = new FolioEntrada();
            folioentrada.FolioAvisoLlegadaID = 1;
            lstfolioentrada.Add(folioentrada);
            folioentrada1.FolioAvisoLlegadaID = 2;
            lstfolioentrada.Add(folioentrada1);
            return lstfolioentrada.AsEnumerable();
        }

        // GET api/dummyfolioentrada/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/dummyfolioentrada
        public void Post([FromBody]string value)
        {
        }

        // PUT api/dummyfolioentrada/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/dummyfolioentrada/5
        public void Delete(int id)
        {
        }
    }
}
