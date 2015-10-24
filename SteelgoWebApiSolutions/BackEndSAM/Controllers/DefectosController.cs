using BackEndSAM.DataAcces;
using BackEndSAM.DataAcces.ArmadoBD;
using BackEndSAM.Models.Armado;
using DatabaseManager.Sam3;
using Newtonsoft.Json;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;


namespace BackEndSAM.Controllers
{
    public class DefectosController : ApiController
    {
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public object Get(string token, string lenguaje, string TipoPrueba)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return DefectosBd.Instance.listadoDefectos(lenguaje,TipoPrueba);
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
