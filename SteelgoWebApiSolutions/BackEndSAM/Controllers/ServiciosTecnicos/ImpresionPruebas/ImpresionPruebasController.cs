using BackEndSAM.DataAcces.ServiciosTecnicos.ImpresionPruebasBD;
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

namespace BackEndSAM.Controllers.ServiciosTecnicos.ImpresionPruebas
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ImpresionPruebasController : ApiController
    {
        [HttpGet]
        public object GetImpresionPruebas(string token, string mostrar, int TipoPruebaID, int TipoPruebaProveedorID, int RequisicionID)
        {
            //Create a generic return object
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                int tipoVista = mostrar == "Todos" ? 1 : 2;

                return ImpresionPruebasBD.Instance.ObtenerImpresionPruebas(mostrar, TipoPruebaID, TipoPruebaProveedorID, RequisicionID);
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
