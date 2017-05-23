using BackEndSAM.DataAcces.FechaSpool;
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

namespace BackEndSAM.Controllers.FechasSpool
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class FechasSpoolController : ApiController
    {
        [HttpGet]
        public object ObtieneElementosPorBusqueda(string token)
        {
            string payload = "";
            string newToken = "";

            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);

            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                return FechasSpoolBD.Instance.ObtenerFechasSpool();

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
