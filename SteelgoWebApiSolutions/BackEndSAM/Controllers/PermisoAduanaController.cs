using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BackEndSAM.DataAcces;
using System.Web.Http.Cors;

namespace BackEndSAM.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PermisoAduanaController : ApiController
    {
        PermisoAduana permiso = new PermisoAduana();

        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public List<BackEndSAM.Models.FormatoPermisoAduana> Get(int folio)
        {
            List<BackEndSAM.Models.FormatoPermisoAduana> listaDatosAduana = permiso.ObtenerDatosAvisoLlegada(folio);
            List<string> planas = permiso.ObtenerPlanas(folio);
            List<string> proyectos = permiso.ObtenerProyectos(folio);

            permiso.EnviarCorreo(listaDatosAduana, planas, proyectos);
          return listaDatosAduana;
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}