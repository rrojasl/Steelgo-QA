using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using DatabaseManager.EntidadesPersonalizadas;
using CommonTools.Libraries.Strings.Security;
using SecurityManager.TokenHandler;
using System.Web.Script.Serialization;

namespace BackEndSAM.Controllers
{
    [EnableCors(origins: "http://localhost:61102", headers: "*", methods: "*")]
    public class PerfilController : ApiController
    {
        Base64Security dataSecurity = new Base64Security();

        public PerfilJson Get(string userName, string token)
        {
            userName = dataSecurity.Decode(userName);
            token = dataSecurity.Decode(token);

            string payload = ManageTokens.Instance.ValidateToken(token);
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            dynamic obj = serializer.DeserializeObject(payload);

            if (obj.ContainsKey("Profile"))
            {
                
            }

            return null;
        }
    }
}