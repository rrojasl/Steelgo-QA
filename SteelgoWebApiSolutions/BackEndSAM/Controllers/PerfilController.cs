using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;
using CommonTools.Libraries.Strings.Security;
using DatabaseManager.EntidadesPersonalizadas;
using SecurityManager.TokenHandler;
using SecurityManager.Api.Models;
using BackEndSAM.Models;

namespace BackEndSAM.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PerfilController : ApiController
    {
        Base64Security dataSecurity = new Base64Security();

        public object Get(string token, int paginaID)
        {
            PerfilJson perfil = new PerfilJson();
            string payload = "";
            string newToken = "";
            bool validToken = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            

            if (validToken)
            {
                dynamic obj = serializer.DeserializeObject(payload);
                int perfilId = Convert.ToInt32(obj["PerfilID"].ToString());
                perfil = PerfilBd.Instance.ObtenerPerfilJsonPorID(perfilId, paginaID);
                perfil.token = newToken;
                return perfil;
            }
            else
            {
                TransactionalInformation infoError = new TransactionalInformation();
                infoError.ReturnCode = 401;
                infoError.ReturnStatus = false;
                infoError.IsAuthenicated = false;
                infoError.ReturnMessage.Add(payload);
                return infoError;
            }
            
        }
    }
}