using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BackEndSAM.DataAcces;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;
using DatabaseManager.Sam3;
using SecurityManager.TokenHandler;
using SecurityManager.Api.Models;

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
        public object Get(int folio, string token)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                List<BackEndSAM.Models.FormatoPermisoAduana> listaDatosAduana = permiso.ObtenerDatosAvisoLlegada(folio);
                List<string> planas = permiso.ObtenerPlanas(folio);
                List<string> proyectos = permiso.ObtenerProyectos(folio);

                permiso.EnviarCorreo(listaDatosAduana, planas, proyectos);
               return permiso.InsertarPermisoADuana(folio, usuario);
                //return listaDatosAduana;
            }
            else
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(payload);
                result.ReturnCode = 401;
                result.ReturnStatus = false;
                result.IsAuthenicated = false;
                return result;
            }
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