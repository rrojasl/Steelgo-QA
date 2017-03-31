using BackEndSAM.DataAcces.Pintura;
using BackEndSAM.DataAcces.PinturaBD.CapturaAvanceBD;
using BackEndSAM.Models.Pintura.CapturaAvance;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;

namespace BackEndSAM.Controllers.PinturaControllers.CapturaAvance
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CapturaAvanceController : ApiController
    {
        [HttpGet]
        public object ObtieneCamposPredeterminados(string token, string lenguaje)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                string fechaShot = (string)CapturaAvanceBD.Instance.ObtenerCamposPredeterminados(usuario, lenguaje, 35);
                string fechaprim = (string)CapturaAvanceBD.Instance.ObtenerCamposPredeterminados(usuario, lenguaje, 36);
                string llenado = (string)CapturaAvanceBD.Instance.ObtenerCamposPredeterminados(usuario, lenguaje, 43);

                CamposPredeterminados CapturaAvanceCamposPredeterminados = new CamposPredeterminados();

                CapturaAvanceCamposPredeterminados = new CamposPredeterminados
                {
                    FechaShotblast = fechaShot,
                    FechaPrimario = fechaprim,
                    Llenado = llenado
                };

                return CapturaAvanceCamposPredeterminados;
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
        public object ObtenerCarrosCargados(string token, string lenguaje,int procesoID)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return CapturaAvanceBD.Instance.ObtenerCarrosCerradosPorProceso(lenguaje, procesoID);
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
        public object ObtenerDetalleCarrosCargados(string token, int medioTransporteCargaID, string lenguaje,int sistemaPinturaProyectoID,int procesopinturaID)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return CapturaAvanceBD.Instance.ObtenerListaMedioTransporteCargado(medioTransporteCargaID, lenguaje, sistemaPinturaProyectoID, procesopinturaID);
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
        public object getObreros(string token, string lenguaje, int tipo, string tipoObrero)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return CapturaAvanceBD.Instance.ObtenerObreros(lenguaje, tipo, tipoObrero);
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
        public object ObtenerLayoutPorProceso(string token, int sistemaPinturaProyectoId, int procesoID,string lenguaje)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return CapturaAvanceBD.Instance.ObtenerLayoutProcesoPintura(sistemaPinturaProyectoId, procesoID, lenguaje);
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
        public object ObtenerDetalleSpoolAgregar(string token, int OrdenTrabajoSpoolID, string lenguaje)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return CapturaAvanceBD.Instance.ObtenerSpoolNuevo(OrdenTrabajoSpoolID, lenguaje);
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
        public object ObtenerLotes(string token,string componente, string lenguaje,int tipoConsulta)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                if(tipoConsulta==0)
                return CapturaAvanceBD.Instance.ObtenerLotesComponentes(componente, lenguaje);
                else
                    return CapturaAvanceBD.Instance.ObtenerLotesReductor(componente, lenguaje);
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

        public object Post(Captura listaCapturasRequisicion, string token, string lenguaje, int medioTransporteCargaID)
        {
            string payload = "";
            string newToken = "";

            JavaScriptSerializer serializer = new JavaScriptSerializer();
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {

                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                DataTable dtDetalleSpool = new DataTable();
                DataTable dtDetalleObreros = null;


                foreach (DetalleSpool item in listaCapturasRequisicion.listaDetalleSpool)
                {
                    if (dtDetalleObreros == null)
                        dtDetalleObreros = BackEndSAM.Utilities.ConvertirDataTable.ToDataTable.Instance.toDataTable(item.ListaObreros);
                    else
                        dtDetalleObreros.Merge(BackEndSAM.Utilities.ConvertirDataTable.ToDataTable.Instance.toDataTable(item.ListaObreros));
                }

                if (listaCapturasRequisicion.listaDetalleSpool != null)
                {
                    dtDetalleSpool = BackEndSAM.Utilities.ConvertirDataTable.ToDataTable.Instance.toDataTable(listaCapturasRequisicion.listaDetalleSpool);
                }

                dtDetalleSpool.Columns.Remove("ListaObreros");

                return CapturaAvanceBD.Instance.InsertarCargaSpool(dtDetalleSpool, dtDetalleObreros, usuario, lenguaje, medioTransporteCargaID);
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
