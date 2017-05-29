using BackEndSAM.DataAcces.Dynasol;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace BackEndSAM.Controllers.Dynasol
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DynasolController : ApiController
    {
        [HttpGet]
        public object ObtenerOrdenesCompra(string token)
        {
            string payLoad = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payLoad, out newToken);
            if (tokenValido)
            {
                return DynasolBD.Instance.ObtenerOrdenesCompra();
            }else
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(payLoad);
                result.ReturnCode = 401;
                result.ReturnStatus = false;
                result.IsAuthenicated = false;
                return result;
            }
        }
        [HttpGet]
        public object ObtenerListaInspeccion(string token, bool flag)
        {
            string payLoad = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payLoad, out newToken);
            if (tokenValido && flag)
            {                
                return DynasolBD.Instance.ObtenerListaInspeccion();                
            }else
            {                
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(payLoad);
                result.ReturnCode = 401;
                result.ReturnStatus = false;
                result.IsAuthenicated = false;
                return result;
            }
        }

        [HttpGet]
        public object ObtenerRevision(string token, int OrdenCompraID)
        {
            string payLoad = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payLoad, out newToken);
            if (tokenValido)
            {
                return DynasolBD.Instance.ObtenerRevision(OrdenCompraID);
            }else
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(payLoad);
                result.ReturnCode = 401;
                result.ReturnStatus = false;
                result.IsAuthenicated = false;
                return result;
            }
        }               

    }
}
