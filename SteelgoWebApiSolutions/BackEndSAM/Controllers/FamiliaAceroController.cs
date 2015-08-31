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
    public class FamiliaAceroController : ApiController
    {
        // GET api/familiaacero
        public IEnumerable<FamiliaAcero> Get(string token)
        {
            List<FamiliaAcero> lstFamiliaAcero = new List<FamiliaAcero>();
            FamiliaAcero fam1 = new FamiliaAcero();
            FamiliaAcero fam2 = new FamiliaAcero();
            FamiliaAcero fam3 = new FamiliaAcero();

            fam1.FamiliaAceroID = 1;
            fam1.Nombre = "Familia 1";
            lstFamiliaAcero.Add(fam1);

            fam2.FamiliaAceroID = 2;
            fam2.Nombre = "Familia 2";
            lstFamiliaAcero.Add(fam2);

            fam3.FamiliaAceroID = 3;
            fam3.Nombre = "Familia 3";
            lstFamiliaAcero.Add(fam3);

            return lstFamiliaAcero.AsEnumerable();
        }

        // GET api/familiaacero/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/familiaacero
        public void Post([FromBody]string value)
        {
        }

        // PUT api/familiaacero/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/familiaacero/5
        public void Delete(int id)
        {
        }
    }
}
