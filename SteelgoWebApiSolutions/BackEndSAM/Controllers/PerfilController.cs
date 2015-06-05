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
using BackEndSAM.Models;

namespace BackEndSAM.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PerfilController : ApiController
    {
        Base64Security dataSecurity = new Base64Security();

        public PerfilJson Get(string username, int paginaID, List<int> entidades, string token)
        {
            PerfilJson perfil = new PerfilJson();
            string user = dataSecurity.Decode(username);

            string payload = ManageTokens.Instance.ValidateToken(token);
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            dynamic obj = serializer.DeserializeObject(payload);

            if (obj.ContainsKey("ProfileID"))
            {
                int perfilId = Convert.ToInt32(obj["ProfileID"].ToString());
                perfil = PerfilBd.Instance.ObtenerPerfilJsonPorID(perfilId, paginaID, entidades);
            }
            return perfil;
        }
    }
}