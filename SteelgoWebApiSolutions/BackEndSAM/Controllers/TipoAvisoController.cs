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
    public class TipoAvisoController : ApiController
    {
        // GET api/tipoaviso
        public IEnumerable<TipoAviso> Get(string token)
        {
            List<TipoAviso> lstTipoAviso = new List<TipoAviso>();
            TipoAviso tipoaviso = new TipoAviso();
            tipoaviso.TipoAvisoID = "1";
            tipoaviso.Nombre = "tipo aviso 1";
            lstTipoAviso.Add(tipoaviso);

            TipoAviso tipoaviso1 = new TipoAviso();
            tipoaviso1.TipoAvisoID = "2";
            tipoaviso1.Nombre = "tipo aviso 2";
            lstTipoAviso.Add(tipoaviso1);

            return lstTipoAviso.AsEnumerable();
        }

        // GET api/tipoaviso/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/tipoaviso
        public void Post([FromBody]string value)
        {
        }

        // PUT api/tipoaviso/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/tipoaviso/5
        public void Delete(int id)
        {
        }
    }
}
