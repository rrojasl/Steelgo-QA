﻿using BackEndSAM.DataAcces.Embarque.PreparacionEmbarque;
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

namespace BackEndSAM.Controllers.Embarque
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PreparacionEmbarqueController : ApiController
    {
        [HttpGet]
        public object ObtenerPlanasCerradas(string token, int CargaPlanaID)
        {
            string payload = "";
            string newToken = "";

            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                return PreparacionEmbarqueBD.Instance.ObtenerDetalleAgregarPlana(CargaPlanaID);
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
