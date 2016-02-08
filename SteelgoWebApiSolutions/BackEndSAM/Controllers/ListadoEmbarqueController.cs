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
                        Folio = item.Folio,
                        EmbarqueID = item.EmbarqueID,
                        EmbarquePlanaID = item.EmbarquePlanaID,
                        Estatus = item.Estatus,
                        FechaEnvio = item.FechaEnvio,
                        FolioAprobadoAduana = item.AprobadoAduana,
                        FolioAprobadoCliente = item.AprobadoCliente,
                        FolioSolicitarPermisos = item.SolicitarPermisos,
                        Plana = item.Plana,
                        RequierePermisoAduana = item.RequierePermisoAduana,
                        NombreProyecto = item.Nombre ,
                        ProyectoID = item.ProyectoID 
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

        [HttpGet]
        public object ObtienePathReporte(string token)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                List<Sam3_Embarque_ListadoEmbarque_PathReporte_Result> lista = (List<Sam3_Embarque_ListadoEmbarque_PathReporte_Result>)ListadoEmbarqueBD.Instance.getListadoEmbarquePathReporte(usuario.UsuarioID);
                List<Path> result = new List<Path>();
                foreach (Sam3_Embarque_ListadoEmbarque_PathReporte_Result item in lista)
                {
                    Path elemento = new Path
                    {
                        ProveedorID = int.Parse(item.ProveedorID.ToString()),
                        ReportePath = item.ReportePath,
                        TipoReporte = item.TipoReporte,
                        TipoReporteID = int.Parse(item.TipoReporteID.ToString())
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

        [HttpPost]
        public object GuardaListadoEmbarque(CapturaListadoEmbarque captura, string token, string lenguaje)
        {
            string payload = "";
            string newToken = "";

            captura.Lista[0].FolioAprobadoAduana = captura.Lista[0].FolioAprobadoAduana == null ? "" : captura.Lista[0].FolioAprobadoAduana;
            captura.Lista[0].FolioSolicitarPermisos = captura.Lista[0].FolioSolicitarPermisos == null ? "" : captura.Lista[0].FolioSolicitarPermisos;
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                TransactionalInformation result = new TransactionalInformation();
                    Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                    using (SamContext ctx = new SamContext())
                    {

                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = { { "@EmbarquePlanaID", captura.Lista[0].EmbarquePlanaID.ToString() },{ "@SolicitarPermisos", captura.Lista[0].FolioSolicitarPermisos },{ "@AprobadoCliente",captura.Lista[0].FolioAprobadoCliente },{ "@AprobadoAduana", captura.Lista[0].FolioAprobadoAduana }, { "@FechaEnvio", captura.Lista[0].FechaEnvio.Trim()},{ "@Usuario", usuario.UsuarioID.ToString() },{ "@Lenguaje", lenguaje } };
                    _SQL.Ejecuta(Stords.GUARDARLISTADOEMBARQUE, parametro);
                    }
                
                
                result.ReturnMessage.Add("OK");
                result.ReturnCode = 200;
                result.ReturnStatus = false;
                result.IsAuthenicated = false;
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
