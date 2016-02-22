using BackEndSAM.DataAcces.HerramientasPruebasBD;
using BackEndSAM.Models.MedicionesClimatologicas;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace BackEndSAM.Controllers.MedicionesClimatologicas
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class MedicionesClimatologicasController : ApiController
    {
        
        public object IngresarCondicionesClimatologicas(string token, CondicionClimatologica condiciones)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);

            if (tokenValido)
            {
                return "";

            }
            else
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(" ");
                result.ReturnCode = 401;
                result.ReturnStatus = false;
                result.IsAuthenicated = false;
                return result;
            }




           
        }
    }
}
