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
    public class TipoIncidenciaController : ApiController
    {
        // GET api/tipoincidencia
        public IEnumerable<TipoIncidencia> Get(string token)
        {
            List<TipoIncidencia> LstTipoIncidencia = new List<TipoIncidencia>();
            TipoIncidencia incidencia1 = new TipoIncidencia();
            incidencia1.TipoIncidenciaID = "2001";
            incidencia1.Nombre = "TipoIncidencia 1";
            LstTipoIncidencia.Add(incidencia1);

            TipoIncidencia incidencia2 = new TipoIncidencia();
            incidencia2.TipoIncidenciaID = "2002";
            incidencia2.Nombre = "TipoIncidencia 2";
            LstTipoIncidencia.Add(incidencia2);

            return LstTipoIncidencia.AsEnumerable();
        }

        // GET api/tipoincidencia/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/tipoincidencia
        public void Post([FromBody]string value)
        {
        }

        // PUT api/tipoincidencia/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/tipoincidencia/5
        public void Delete(int id)
        {
        }
    }
}
