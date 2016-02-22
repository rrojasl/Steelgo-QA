using BackEndSAM.DataAcces;
using BackEndSAM.DataAcces.HerramientasPruebasBD;
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

namespace BackEndSAM.Controllers.HerramientasPruebas
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class HerramientasPruebasController : ApiController
    {
        [HttpGet]
        public object HerramientasPrueba(string token, int HerramientaID, string lenguaje)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);

            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return HerramientasPruebasBD.Instance.GetHerramientasPrueba(HerramientaID, lenguaje);
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
