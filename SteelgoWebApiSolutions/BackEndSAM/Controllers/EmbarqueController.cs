using BackEndSAM.DataAcces.EmbarqueBD;
using BackEndSAM.Models.Embarque;
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

namespace BackEndSAM.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class EmbarqueController : ApiController
    {
        [HttpGet]
        public object GetProveedores(string token)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return EmbarqueBD.Instance.ObtenerProveedores();
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
        public object GetPlanasGuardadas(string token, int EmbarqueID, string lenguaje)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                List< Sam3_Embarque_Get_EmbarqueDetalle_Result > lista = (List<Sam3_Embarque_Get_EmbarqueDetalle_Result>)EmbarqueBD.Instance.ObtenerPlanasGuardadas(EmbarqueID, lenguaje);

                List<Embarque> result = new List<Embarque>();
                foreach(Sam3_Embarque_Get_EmbarqueDetalle_Result item in lista)
                {
                    Embarque elemento = new Embarque
                    {
                        Accion = 2,
                        Chofer = item.Chofer,
                        ChoferID =  int.Parse(item.ChoferID.ToString()),
                        EmbarqueID = item.EmbarqueID,
                        EmbarquePlanaID = item.EmbarquePlanaID,
                        Estatus = item.Estatus,
                        Plana = item.Plana,
                        Tracto = item.Tracto,
                        TractoID =int.Parse( item.TractoID.ToString())
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
        public object GetTracto(string token, int TransportistaID, string Tracto)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return EmbarqueBD.Instance.ObtenerPlacas(TransportistaID, Tracto);
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
        public object GetPlana(string token, int TransportistaID, string Plana)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return EmbarqueBD.Instance.ObtenerPlacas(TransportistaID, Plana);
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
        public object GetChofer(string token, int VehiculoID)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return EmbarqueBD.Instance.ObtenerChoferes(VehiculoID);
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
        public object post(int EmbarqueID, int TractoID, int ChoferID, int AccionPlanaID1, int AccionPlanaID2, int PlanaID1, int PlanaID2, int PlanaID3,int PlanaID4, string token)
        {
            string payload = "";
            string newToken = "";

            JavaScriptSerializer serializer = new JavaScriptSerializer();
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {

                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                using (SamContext ctx = new SamContext())
                {
                    ctx.Sam3_Embarque_Set_Embarque(EmbarqueID,TractoID,ChoferID,usuario.UsuarioID,AccionPlanaID1,AccionPlanaID2,PlanaID1, PlanaID2,PlanaID3,PlanaID4);
                }
                TransactionalInformation result = new TransactionalInformation();
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
