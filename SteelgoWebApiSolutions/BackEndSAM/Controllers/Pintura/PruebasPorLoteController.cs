using BackEndSAM.DataAcces.Pintura.AdminReductores;
using BackEndSAM.DataAcces.Pintura.PruebasPorLote;
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

namespace BackEndSAM.Controllers.Pintura
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PruebasPorLoteController : ApiController
    {

        //Obtener procesos
        [HttpGet]
        public object Get(string token, string lenguaje,int proyectoID)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return PruebasPorLoteBD.Instance.ObtenerProcesos(proyectoID);
               
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
       

        //obtener SP

        //obtener pruebas

        //obtener fechas

        //obtener lotes

    }
}
