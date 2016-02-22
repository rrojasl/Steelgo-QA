using BackEndSAM.DataAcces.PinturaBD.MedioTransporteBD;
using BackEndSAM.Models.Pintura.MedioTransporte;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler; 
using System.Data; 
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;

namespace BackEndSAM.Controllers.MedioTransporteController
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class MedioTransporteController : ApiController
    {
        //Obtener campos predeterminados
        [HttpGet]
        public object ObtieneCamposPredeterminados(string predeterminado, string token, string lenguaje)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                string vista = (string)MedioTransporteBD.Instance.ObtenerCampoPredeterminado(usuario, lenguaje, 46);
                string opcion = (string)MedioTransporteBD.Instance.ObtenerCampoPredeterminado(usuario, lenguaje, 34);

                CamposPredeterminados medioTransporteCamposPredeterminados = new CamposPredeterminados();

                medioTransporteCamposPredeterminados = new CamposPredeterminados
                {
                    Vista = vista,
                    Opcion = opcion
                };

                return medioTransporteCamposPredeterminados;
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

        public object Get(string token, string lenguaje)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return MedioTransporteBD.Instance.ObtenerMedioTransporte(lenguaje);
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

        //obtiene el detalle
        public object Get(string token, int TipoConsulta, int OrdenTrabajoSpoolID, string Codigo, string lenguaje, int medioTransporteID)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return MedioTransporteBD.Instance.ObtieneDetalle(medioTransporteID, TipoConsulta, OrdenTrabajoSpoolID, Codigo, lenguaje);
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

        //Guarda la carga
        public object Post(Captura listaCaptura, string token, string lenguaje, int medioTransporteID, int cerrar)
        { 
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                DataTable dtDetalleCaptura = ArmadoController.ToDataTable(listaCaptura.Detalles);
                return MedioTransporteBD.Instance.GuardarMedioTransporte(dtDetalleCaptura, usuario, lenguaje, medioTransporteID, listaCaptura.Detalles[0].MedioTransporteCargaID,cerrar);
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

        public object Get(int idMedioTransporteCarga, string token, string lenguaje, int statusCarga)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                //if (idMedioTransporteCarga == 0)
                //    return MedioTransporteBD.Instance.ObtenerMedioTransporteCargado(lenguaje);
                //else
                return MedioTransporteBD.Instance.ObtenerMedioTransporteDetalleCargado(lenguaje, idMedioTransporteCarga, statusCarga);
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

        //Guarda la descarga
        public object Post(CapturaDescarga listaCaptura, int medioTransporteCargaID, string token, string lenguaje)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                DataTable dtDetalleCaptura = ArmadoController.ToDataTable(listaCaptura.Detalles);
                return MedioTransporteBD.Instance.GuardarDescarga(dtDetalleCaptura, usuario.UsuarioID, medioTransporteCargaID,lenguaje);
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

        //obtiene los catalogos de clasificacion y persistencia
        public object Get(string token, int idCatalogo)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                if (idCatalogo == 0)
                    return MedioTransporteBD.Instance.ObteneCatalogoClasificacion();
                else
                    return MedioTransporteBD.Instance.ObtenerCatalogoPersistencia();
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

        public object Post(CapturaNuevoMedioTransporte listaCaptura, string token)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                DataTable dtNuevoMedioTransporte = ArmadoController.ToDataTable(listaCaptura.Detalles);
                return MedioTransporteBD.Instance.GuardarNuevoMedioTransporte(dtNuevoMedioTransporte, usuario.UsuarioID);
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

        //[HttpPost]
        //public object CerrarCarro(CapturaDescarga listaCaptura, string token, int medioTransporteID)
        //{
        //    string payload = "";
        //    string newToken = "";

        //    JavaScriptSerializer serializer = new JavaScriptSerializer();
        //    bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
        //    if (tokenValido)
        //    {
        //        Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

        //        return MedioTransporteBD.Instance.CierraCarro(usuario, medioTransporteID, 0);
        //    }
        //    else
        //    {
        //        TransactionalInformation result = new TransactionalInformation();
        //        result.ReturnMessage.Add(payload);
        //        result.ReturnCode = 401;
        //        result.ReturnStatus = false;
        //        result.IsAuthenicated = false;
        //        return result;
        //    }
        //}

        [HttpPut]
        public object CerrarCarro(CerrarMedioTransporte medioTransporte, string token)
        {
            string payload = "";
            string newToken = "";

            JavaScriptSerializer serializer = new JavaScriptSerializer();
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                return MedioTransporteBD.Instance.CierraCarro(usuario, medioTransporte.MedioTransporteID, 0, medioTransporte.CerrarCarro);
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