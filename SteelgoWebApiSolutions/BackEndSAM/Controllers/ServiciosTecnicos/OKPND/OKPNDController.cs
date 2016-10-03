using BackEndSAM.DataAcces.ServiciosTecnicos.OKPND;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace BackEndSAM.Controllers.ServiciosTecnicos.OKPND
{
    public class OKPNDController : ApiController
    {
        [HttpGet]
        public object ObtieneElementos(string token, string lenguaje, int ProyectoID, string Muestra)
        {
            string payload = "";
            string newToken = "";
            int all = Muestra.ToLower() == "todos" ? 1 : 0;
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                return OKPNDBD.Instance.ObtenerListadoElementos(lenguaje, ProyectoID, all); ;
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
    }
}
