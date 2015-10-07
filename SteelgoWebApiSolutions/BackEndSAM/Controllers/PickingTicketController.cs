using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;
using BackEndSAM.DataAcces;
using BackEndSAM.Models;
using CommonTools.Libraries.Strings.Security;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;


namespace BackEndSAM.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PickingTicketController : ApiController
    {
        // GET api/pickingticket
        public IEnumerable<ListaCombos> Get(string token)
        {
            List<ListaCombos> lstCombos = new List<ListaCombos>();
            ListaCombos combo1 = new ListaCombos();
            ListaCombos combo2 = new ListaCombos();
            ListaCombos combo3 = new ListaCombos();

            combo1.id = "1";
            combo1.value = "Picking ticket 1";
            lstCombos.Add(combo1);

            combo2.id = "2";
            combo2.value = "Picking ticket 2";
            lstCombos.Add(combo2);

            combo3.id = "3";
            combo3.value = "Picking ticket 3";
            lstCombos.Add(combo3);

            return lstCombos.AsEnumerable();
        }

        // GET api/pickingticket/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/pickingticket
        public void Post([FromBody]string value)
        {
        }

        // PUT api/pickingticket/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/pickingticket/5
        public void Delete(int id)
        {
        }
    }
}
