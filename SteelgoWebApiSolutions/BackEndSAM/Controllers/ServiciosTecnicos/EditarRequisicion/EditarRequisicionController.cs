using BackEndSAM.DataAcces.ServiciosTecnicos.EditarRequisicion;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;
using static BackEndSAM.Models.ServiciosTecnicos.EditarRequisicion.EditarRequisicion;

namespace BackEndSAM.Controllers.ServiciosTecnicos.EditarRequisicion
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class EditarRequisicionController : ApiController
    {
        public object Get(string token, string lenguaje, int RequisicionID)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                return EditarRequisicionBD.Instance.ObtieneElementosRequisicion(usuario.UsuarioID, RequisicionID, lenguaje);
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
        public object ObtieneElementosPorPrueba(string token, string lenguaje, int RequisicionID, int TipoPruebaID, int ProyectoID, string Muestra)
        {
            string payload = "";
            string newToken = "";
            int all = Muestra.ToLower() == "todos" ? 1 : 0;
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                return EditarRequisicionBD.Instance.ObtenerListadoElementos(lenguaje, RequisicionID, TipoPruebaID, ProyectoID, all);
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
        public object Post(Models.ServiciosTecnicos.EditarRequisicion.EditarRequisicion.Captura listaElementosPorReq, string token, string lenguaje)
        {
            string payload = "";
            string newToken = "";

            JavaScriptSerializer serializer = new JavaScriptSerializer();

            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {

                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                DataTable dtDetalleCaptura = new DataTable();
                if (listaElementosPorReq.listaDetalle != null)
                {
                    dtDetalleCaptura = Utilities.ConvertirDataTable.ToDataTable.Instance.toDataTable(listaElementosPorReq.listaDetalle);                        
                }

                return EditarRequisicionBD.Instance.InsertarNuevaRequisicion(
                    dtDetalleCaptura, listaElementosPorReq.RequisicionID, listaElementosPorReq.Requisicion,
                    listaElementosPorReq.ProyectoID, listaElementosPorReq.TipoPruebaID, listaElementosPorReq.FechaRequisicion,
                    listaElementosPorReq.CodigoAsme, listaElementosPorReq.Observacion, usuario, lenguaje);
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

        [HttpPut]
        public object EliminaRequisicion(Requisicion req, string token)
        {
            string payload = "";
            string newToken = "";

            JavaScriptSerializer serializer = new JavaScriptSerializer();

            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {

                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                return EditarRequisicionBD.Instance.EliminarRequisicion(req.RequisicionID, usuario.UsuarioID);
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