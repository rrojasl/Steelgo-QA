using BackEndSAM.DataAcces.ServiciosTecnicosBD.RequisicionesAsignadasBD;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;


namespace BackEndSAM.Controllers.ServiciosTecnicosController
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class RequisicionesAsignadasController : ApiController
    {
        public object Get(string lenguaje, string token)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                return RequisicionesAsignadasBD.Instance.ObtenerListaStatusRequisiciones(lenguaje, usuario.ProveedorID.GetValueOrDefault());
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

        public object Get(string lenguaje, string token, int idStatus)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                return RequisicionesAsignadasBD.Instance.ObtenerInformacionRequisicionXStatus(lenguaje, usuario.ProveedorID.GetValueOrDefault(), idStatus);
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
