using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;
using BackEndSAM.DataAcces;
using BackEndSAM.Models;
using CommonTools.Libraries.Strings.Security;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;

namespace BackEndSAM.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class OrdenRecepcionController : ApiController
    {
        public object Get(string data)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            FiltrosJson filtros = serializer.Deserialize<FiltrosJson>(data);
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(filtros.token, out payload, out newToken);

            if (tokenValido)
            {
                JavaScriptSerializer ser = new JavaScriptSerializer();
                Sam3_Usuario usuario = ser.Deserialize<Sam3_Usuario>(payload);
                return OrdenRecepcionBd.Instance.ObtenerListadoOrdenRecepcion(filtros, usuario);
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

        public object Post(List<int> itemCodes, int folioAvisoEntradaID, string token)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);

            if (tokenValido)
            {
                JavaScriptSerializer ser = new JavaScriptSerializer();
                Sam3_Usuario usuario = ser.Deserialize<Sam3_Usuario>(payload);
                return OrdenRecepcionBd.Instance.GenerarOrdeRecepcion(itemCodes, folioAvisoEntradaID, usuario);
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

        public object Post(int folioEntradaID, string token)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);

            if (tokenValido)
            {
                JavaScriptSerializer ser = new JavaScriptSerializer();
                Sam3_Usuario usuario = ser.Deserialize<Sam3_Usuario>(payload);
                return OrdenRecepcionBd.Instance.GenerarOrdeRecepcion(folioEntradaID, usuario);
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