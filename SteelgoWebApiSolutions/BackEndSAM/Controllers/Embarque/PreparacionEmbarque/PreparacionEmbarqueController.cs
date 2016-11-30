using BackEndSAM.DataAcces.Embarque.PreparacionEmbarque;
using BackEndSAM.Models.Embarque.PreparacionEmbarque;
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

namespace BackEndSAM.Controllers.Embarque
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PreparacionEmbarqueController : ApiController
    {
        [HttpGet]
        public object ObtenerDetalleAgregarPlana(string token, int CargaPlanaID)
        {
            string payload = "";
            string newToken = "";

            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                return PreparacionEmbarqueBD.Instance.ObtenerDetalleAgregarPlana(CargaPlanaID);
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
        public object ObtenerDetalleEmbarque(string token, int EmbarqueID)
        {
            string payload = "";
            string newToken = "";

            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                return PreparacionEmbarqueBD.Instance.ObtenerDetalleEmbarque(EmbarqueID);
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
        public object ObtenerListadoEmbarques(string token, int ProveedorID)
        {
            string payload = "";
            string newToken = "";

            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                return PreparacionEmbarqueBD.Instance.ObtenerListadoEmbarques(ProveedorID);
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

        [HttpPost]
        public object GuardarCaptura(Captura listaCaptura, string token, string lenguaje, int EmbarqueID, string NombreEmbarque, int TractoID, int ChoferID, string FechaCreacion)
        {
            string payload = "";
            string newToken = "";

            JavaScriptSerializer serializer = new JavaScriptSerializer();

            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                DataTable dtDetalle = Utilities.ConvertirDataTable.ToDataTable.Instance.toDataTable(listaCaptura.Detalles);
                return PreparacionEmbarqueBD.Instance.InsertarCaptura(dtDetalle, usuario, lenguaje, EmbarqueID,NombreEmbarque,TractoID,ChoferID,FechaCreacion);
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
