using BackEndSAM.DataAcces.EmbarqueBD;
using BackEndSAM.Models.Embarque;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;

namespace BackEndSAM.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ListadoEmbarqueController : ApiController
    {
        [HttpGet]
        public object ObtieneListadoEmbarque(string token, string todos, string lenguaje)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                List<Sam3_Embarque_Get_ListadoEmbarqueDetalle_Result> lista = (List<Sam3_Embarque_Get_ListadoEmbarqueDetalle_Result>)ListadoEmbarqueBD.Instance.getListadoEmbarqueDetalle(todos,lenguaje);
                List<ListadoEmbarque> result = new List<ListadoEmbarque>();
                foreach(Sam3_Embarque_Get_ListadoEmbarqueDetalle_Result item in lista)
                {
                    ListadoEmbarque elemento = new ListadoEmbarque
                    {
                        EmbarqueID = item.EmbarqueID,
                        EmbarquePlanaID = item.EmbarquePlanaID,
                        Estatus = item.Estatus,
                        FechaEnvio = "",
                        FolioAprobadoAduana = "",
                        FolioSolicitarPermisos = "",
                        Plana = item.Plana,
                        RequierePermisoAduana = item.RequierePermisoAduana == null ? false : bool.Parse(item.RequierePermisoAduana.ToString()),
                        NombreProyecto = item.Nombre == null ? "" : item.Nombre,
                        ProyectoID = item.ProyectoID == null ? 0 : int.Parse(item.ProyectoID.ToString())
                    };
                    result.Add(elemento);
                }
                return result;
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
