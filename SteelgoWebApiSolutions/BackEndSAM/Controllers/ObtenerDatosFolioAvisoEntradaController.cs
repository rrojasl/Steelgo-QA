using BackEndSAM.DataAcces;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System.Web.Http;
using System.Web.Http.Cors;

namespace BackEndSAM.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ObtenerDatosFolioAvisoEntradaController : ApiController
    {
        /// <summary>
        /// Obtener los datos de un folio Aviso de Entrada
        /// </summary>
        /// <param name="FolioAvisoEntradaID"></param>
        /// <param name="token"></param>
        /// <returns></returns>
        public object Get(int folioAvisoLlegadaID, string token)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                return FoliosCuantificacionBd.Instance.obtenerDatosFolioEntrada(folioAvisoLlegadaID);
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