using BackEndSAM.DataAcces.Embarque.ListadoEmbarque;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;

namespace BackEndSAM.Controllers.Embarque.ListadoEmbarque
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ListadoEmpaqueController : ApiController
    {
        [HttpGet]
        public object ObtenerDetalleListadoEmbarque(string token, string lenguaje, int StatusEnvio)
        {
            string payload = "";
            string newToken = "";

            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                return ListadoEmbarqueBD.Instance.ObtenerDetalleListado(lenguaje, StatusEnvio, usuario.UsuarioID);
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
