using BackEndSAM.DataAcces;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;

namespace BackEndSAM.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ColadaController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        /// <summary>
        /// Obtiene listado de coladas por proyecto
        /// </summary>
        /// <param name="token"></param>
        /// <param name="id"></param>
        /// <param name="mostrarOpcion"></param>
        /// <param name="proyectoID"></param>
        /// <returns></returns>
        public object Get(int proyectoID, string token, int id = 0, int mostrarOpcion = 0)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return ColadaBd.Instance.ObtenerColadasPorProyecto(id, mostrarOpcion, proyectoID);
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

        /// <summary>
        /// Listado de coladas por itemcode
        /// </summary>
        /// <param name="token"></param>
        /// <param name="id"></param>
        /// <param name="mostrarOpcion"></param>
        /// <param name="itemcodeID"></param>
        /// <returns></returns>
        public object Get(string itemcode, string token, int id = 0, int mostrarOpcion = 0)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return ColadaBd.Instance.ObtenerColadasPorItemCode(id, mostrarOpcion, itemcode);
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

        /// <summary>
        /// Listado de coladas por Familia de acero
        /// </summary>
        /// <param name="token"></param>
        /// <param name="id"></param>
        /// <param name="mostrarOpcion"></param>
        /// <param name="itemcodeID"></param>
        /// <returns></returns>
        public object Get(string token, int familiaAcerolID, int id = 0, int mostrarOpcion = 0)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return ColadaBd.Instance.ObtenerColadasPorFamiliAcero(id, mostrarOpcion, familiaAcerolID);
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
        public object Post(string data, string token)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Colada DatosColada = serializer.Deserialize<Sam3_Colada>(data);
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return ColadaBd.Instance.GuardarColadaPopUp(DatosColada, usuario);
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