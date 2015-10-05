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
    public class ImpresionDocumentalController : ApiController
    {
        // GET api/impresiondocumental
        public IEnumerable<ComboNumeroControl> Get(string id, string texto, string token)
        {
            List<ComboNumeroControl> lstNumeroUnico = new List<ComboNumeroControl>();
            ComboNumeroControl numerounico1 = new ComboNumeroControl();
            ComboNumeroControl numerounico2 = new ComboNumeroControl();
            ComboNumeroControl numerounico3 = new ComboNumeroControl();

            numerounico1.NumeroControlID = "1";
            numerounico1.NumeroControl = "Numero Unico 1";
            lstNumeroUnico.Add(numerounico1);

            numerounico2.NumeroControlID = "2";
            numerounico2.NumeroControl = "Numero Unico 2";
            lstNumeroUnico.Add(numerounico2);

            numerounico3.NumeroControlID = "3";
            numerounico3.NumeroControl = "Numero Unico 3";
            lstNumeroUnico.Add(numerounico3);

            return lstNumeroUnico.AsEnumerable();
        }

        // GET api/impresiondocumental/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/impresiondocumental
        public void Post([FromBody]string value)
        {
        }

        // PUT api/impresiondocumental/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/impresiondocumental/5
        public void Delete(int id)
        {
        }
    }
}
