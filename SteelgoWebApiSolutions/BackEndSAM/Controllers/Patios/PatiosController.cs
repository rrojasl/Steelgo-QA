using SecurityManager.TokenHandler;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace BackEndSAM.Controllers.Patios
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PatiosController : ApiController
    {
        [HttpGet]
        public object Patios(string token, int tipo, int proyectoID)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {


            }
            else
            {

            }

            return "";
        }
    }
}
