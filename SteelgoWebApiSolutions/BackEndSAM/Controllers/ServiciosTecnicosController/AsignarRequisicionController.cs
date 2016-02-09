using BackEndSAM.DataAcces.ServiciosTecnicosBD.AsignarRequisicionBD;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System.Data;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;
using BackEndSAM.Models.ServiciosTecnicos.AsignarRequisicion;

namespace BackEndSAM.Controllers.ServiciosTecnicosController
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AsignarRequisicionController : ApiController
    {
        public object Get(string lenguaje, string token, int idPrueba, int ConsultaDetalle)
        {
            //Create a generic return object
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return AsignarRequisicionBD.Instance.ObtenerListaProveedores(lenguaje, idPrueba, ConsultaDetalle);
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

        //Carga los datos del grid
        public object Get(string lenguaje, string token, string mostrar, int idPrueba, int idProveedor)
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
                return AsignarRequisicionBD.Instance.ObtenerRequisicionAsignacion(lenguaje, tipoVista, idPrueba, idProveedor);
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

        public object Post(Captura listaCaptura, string token, string lenguaje)
        {
            string payload = "";
            string newToken = "";

            JavaScriptSerializer serializer = new JavaScriptSerializer();


            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                DataTable dtDetalle = ArmadoController.ToDataTable(listaCaptura.Detalles);
                return AsignarRequisicionBD.Instance.InsertarCaptura(dtDetalle, usuario, lenguaje);
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
