using BackEndSAM.DataAcces.Embarque.Encintado;
using BackEndSAM.Models.Embarque.Encintado;
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

namespace BackEndSAM.Controllers.Embarque.Encintado
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class EncintadoController : ApiController
    {
        [HttpGet]
        public object ObtieneDetalleEtiquetado(string token, int TipoConsulta, int Todos, int ZonaID, int CuadranteID, string SpoolContiene)
        {
            string payload = "";
            string newToken = "";

            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);

            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                if (TipoConsulta == 1)
                {
                    return EncintadoBD.Instance.ObtieneDetalleEncintadoPorZona(ZonaID, CuadranteID, Todos);
                }
                else
                {
                    return EncintadoBD.Instance.ObtieneDetalleEncintadoPorSpool(SpoolContiene, Todos);
                }

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
        public object ObtieneRutaSpool(string token, int SpoolID, int TipoReporte)
        {
            string payload = "";
            string newToken = "";

            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);

            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return EncintadoBD.Instance.ObtieneRutaSpool(SpoolID, TipoReporte);

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
        public object GuardaCapturaEtiquetado(CapturaEncintado captura, string token, string lenguaje)
        {
            string payload = "";
            string newToken = "";

            bool tokenValidado = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValidado)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                DataTable dtDetalle = Utilities.ConvertirDataTable.ToDataTable.Instance.toDataTable(captura.listaDetalle);
                return EncintadoBD.Instance.GuardaCapturaEncintado(dtDetalle, usuario.UsuarioID, lenguaje);
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
