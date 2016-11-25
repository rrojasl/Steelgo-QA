using BackEndSAM.DataAcces.Embarque.Empaquetado;
using BackEndSAM.Models.Embarque.Empaquetado;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System.Data;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;

namespace BackEndSAM.Controllers.Embarque.Empaquetado
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class EmpaquetadoController : ApiController
    {
        [HttpGet]
        public object ObtenerPaquetes(string token, int ProyectoID)
        {
            string payload = "";
            string newToken = "";

            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                return EmpaquetadoBD.Instance.ObtenerPaquetes(ProyectoID);
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
        public object ObtenerDetallePaquete(string token, int PaqueteID, int Todos)
        {
            string payload = "";
            string newToken = "";

            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                return EmpaquetadoBD.Instance.ObtenerDetalleCargaPaquete(PaqueteID, Todos);
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

        //[HttpGet]
        //public object ObtieneDetalleSpoolAgregar(string token, int EmpaquetadoID, int TipoConsulta, int OrdenTrabajoSpoolID)
        //{
        //    string payload = "";
        //    string newToken = "";

        //    bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
        //    if (tokenValido)
        //    {
        //        JavaScriptSerializer serializer = new JavaScriptSerializer();
        //        Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

        //        return EmpaquetadoBD.Instance.ObtieneDetalleSpoolAgregar(EmpaquetadoID, TipoConsulta, OrdenTrabajoSpoolID);
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

        //[HttpPost]
        //public object GuardaCapturaCargaPlana(Captura captura, string token, int CargaPlanaID, int PlanaID, int CerrarPlana, int CuadrantePlanaSam2, int CuadrantePlanaSam3)
        //{
        //    string payload = "";
        //    string newToken = "";

        //    bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
        //    if (tokenValido)
        //    {
        //        JavaScriptSerializer serializer = new JavaScriptSerializer();
        //        Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
        //        DataTable dtDetalle = Utilities.ConvertirDataTable.ToDataTable.Instance.toDataTable(captura.listaDetalle);

        //        return EmpaquetadoBD.Instance.GuardaCapturaCargaPlana(dtDetalle, usuario.UsuarioID, CargaPlanaID, PlanaID, CerrarPlana, CuadrantePlanaSam2, CuadrantePlanaSam3);
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

        //[HttpGet]
        //public object DescargaSpoolPaquete(string token, int EmpaquetadoID, int SpoolID, int CuadranteID, int CuadranteAnterior)
        //{
        //    string payload = "";
        //    string newToken = "";

        //    bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
        //    if (tokenValido)
        //    {
        //        JavaScriptSerializer serializer = new JavaScriptSerializer();
        //        Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

        //        return EmpaquetadoBD.Instance.DescargaSpoolPaquete(EmpaquetadoID, SpoolID, CuadranteID, CuadranteAnterior, usuario.UsuarioID);
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

        [HttpPost]
        public object GuardarNuevoPaquete(string token, string lenguaje, int PaqueteID, string NombrePaquete, int CuadranteID, int Cerrado, string FechaPaquete, int CuadrantePaqueteSam2ID, int CuadrantePaqueteSam3ID, Captura captura)
        {
            string payload = "";
            string newToken = "";

            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);

            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                DataTable dtDetalle = Utilities.ConvertirDataTable.ToDataTable.Instance.toDataTable(captura.listaDetalle);

                return EmpaquetadoBD.Instance.GuardaNuevoPaquete(usuario.UsuarioID, lenguaje, PaqueteID, NombrePaquete, CuadranteID, Cerrado, FechaPaquete, CuadrantePaqueteSam2ID, CuadrantePaqueteSam3ID, dtDetalle);
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
