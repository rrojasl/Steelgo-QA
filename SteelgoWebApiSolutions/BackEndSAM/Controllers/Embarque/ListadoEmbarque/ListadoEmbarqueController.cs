﻿using BackEndSAM.DataAcces.Embarque.ListadoEmbarque;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;

namespace BackEndSAM.Controllers.Embarque.ListadoEmbarque
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ListadoEmbarqueController : ApiController
    {
        [HttpGet]
        public object ObtenerDetalleListadoEmbarque(string token, string Lenguaje, int EstatusEmbarque)
        {
            string payload = "";
            string newToken = "";

            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                return ListadoEmbarqueBD.Instance.ObtenerDetalleListado(Lenguaje, EstatusEmbarque, usuario.UsuarioID);
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

        [HttpGet]
        public object ObtenerElementosPorEstatus(string token, string lenguaje)
        {
            string payload = "";
            string newToken = "";

            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                return ListadoEmbarqueBD.Instance.ObtenerElementosPorEstatus(lenguaje, usuario.UsuarioID);
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
