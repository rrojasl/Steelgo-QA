using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;
using BackEndSAM.DataAcces.EmbarqueBD.RevisionEmbarqueBD;
using BackEndSAM.Models.Embarque.RevisionEmbarque;
using System.Data;

namespace BackEndSAM.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class RevisionEmbarqueController : ApiController
    {
        public object Get(string token, int embarquePlanaID,string lenguaje)
        {

            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return RevisionEmbarqueBD.Instance.ObtenerDetalleEmbarque(embarquePlanaID, lenguaje);
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
        public object ObtenerEmbarquesEnviados(string token, string lenguaje)
        {

            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return RevisionEmbarqueBD.Instance.ObtieneEmbarquesEnviados(lenguaje);
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

        //obtiene el detalle por algun filtro
        public object Get(string token, int TipoConsulta, int OrdenTrabajoSpoolID, int Paquete, string Codigo, string lenguaje, int embarquePlanaID)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return RevisionEmbarqueBD.Instance.ObtieneDetalle(TipoConsulta, OrdenTrabajoSpoolID, Paquete, Codigo, lenguaje, embarquePlanaID,true);
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

        public object Put(Captura Detalle, string token)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                DataTable dtDetalle = ArmadoController.ToDataTable(Detalle.Detalles);
                return RevisionEmbarqueBD.Instance.ActualizarDetalle(dtDetalle,usuario.UsuarioID);
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
