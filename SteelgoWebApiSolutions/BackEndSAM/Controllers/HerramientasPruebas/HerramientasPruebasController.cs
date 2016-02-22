using SecurityManager.TokenHandler;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace BackEndSAM.Controllers.HerramientasPruebas
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class HerramientasPruebasController : ApiController
    {
        [HttpGet]
        public object HerramientasPrueba(string token, int HerramientaID)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);

            if (tokenValido)
            {

               
            }
            else
            { }

            return "";

        }
    }
}
