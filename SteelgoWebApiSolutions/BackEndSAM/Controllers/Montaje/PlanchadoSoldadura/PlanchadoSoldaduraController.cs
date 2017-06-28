using BackEndSAM.DataAcces.Montaje.PlanchadoSoldadura;
using BackEndSAM.Models.Montaje.PlanchadoSoldadura;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;

namespace BackEndSAM.Controllers.Montaje.PlanchadoSoldadura
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PlanchadoSoldaduraController : ApiController
    {
        [HttpPost]
        public object Post(CapturaMasiva datos, string lenguaje, string token)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                List<ElementosMasivo> elementos = serializer.Deserialize<List<ElementosMasivo>>(datos.Detalle);

                DataTable dtDetalleCaptura = new DataTable();
                if (elementos != null)
                {
                    dtDetalleCaptura = Utilities.ConvertirDataTable.ToDataTable.Instance.toDataTable(elementos);
                }

                return PlanchadoSoldaduraBD.Instance.actualizarPlanchadoSoldadura(dtDetalleCaptura, lenguaje, usuario);
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
