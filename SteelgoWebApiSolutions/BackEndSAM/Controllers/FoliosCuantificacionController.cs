using BackEndSAM.DataAcces;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BackEndSAM.Controllers
{
    public class FoliosCuantificacionController : ApiController
    {
        /// <summary>
        /// Obtener Folio de Llegada (Combo Folio Aviso Entrada)
        /// </summary>
        /// <param name="token"></param>
        /// <returns>lista de folios de aviso de entrada</returns>
        public object Get(string token)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                return FoliosCuantificacionBd.Instance.obtenerFolioLlegada();
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