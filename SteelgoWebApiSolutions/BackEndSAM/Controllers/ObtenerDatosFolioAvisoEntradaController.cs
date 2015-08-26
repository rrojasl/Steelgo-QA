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
    public class ObtenerDatosFolioAvisoEntradaController : ApiController
    {
        /// <summary>
        /// Obtener los datos de un folio aviso entrada/ folio cuantificacion
        /// </summary>
        /// <param name="token">token</param>
        /// <param name="avisoEntrada"> folio de aviso de entrada</param>
        /// <param name="folioCuantificacion">folio cuantificacion</param>
        /// <returns></returns>
        public object Get(string token, int avisoEntrada, int folioCuantificacion)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                return FoliosCuantificacionBd.Instance.getDataFolioCuantificacion(avisoEntrada, folioCuantificacion);
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