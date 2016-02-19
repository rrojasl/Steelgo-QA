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
        public object GetProveedores(string token, int embarquePlanaID)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
               
                    
                return EmbarqueBD.Instance.ObtenerProveedores(embarquePlanaID);
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
        public object GetDestinos(string token, int ProyectoID)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);


                return EmbarqueBD.Instance.obtenerListadoDestinos(ProyectoID);
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
        public object GetPlanasGuardadasXEmbarque(string token, int EmbarqueID, string lenguaje)
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
                        Accion = 0,
                        Chofer = item.Chofer,
                        ChoferID =  int.Parse(item.ChoferID.ToString()),
                        EmbarqueID = item.EmbarqueID,
                        PlanaID = item.EmbarquePlanaID,
                        Estatus = item.Estatus,
                        Plana = item.Plana,
                        Tracto = item.Tracto,
                        TractoID =int.Parse( item.TractoID.ToString()),
                        TransportistaID = item.TransportistaID
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
        public object GetPlanasGuardadasXChofer(string token, int vehiculoID, int choferID, string lenguaje)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                List<Sam3_Embarque_Get_EmbarqueDetalleChofer_Result> lista = (List<Sam3_Embarque_Get_EmbarqueDetalleChofer_Result>)EmbarqueBD.Instance.ObtenerPlanasGuardadasChofer(vehiculoID,choferID, lenguaje);

                List<Embarque> result = new List<Embarque>();
                foreach (Sam3_Embarque_Get_EmbarqueDetalleChofer_Result item in lista)
                {
                    Embarque elemento = new Embarque
                    {
                        Accion = 0,
                        Chofer = item.Chofer,
                        ChoferID = int.Parse(item.ChoferID.ToString()),
                        EmbarqueID = item.EmbarqueID,
                        PlanaID = item.EmbarquePlanaID,
                        Estatus = item.Estatus,
                        Plana = item.Plana,
                        Tracto = item.Tracto,
                        TractoID = int.Parse(item.TractoID.ToString()),
                        TransportistaID = item.TransportistaID,
                        ProyectoID = item.ProyectoID.GetValueOrDefault(),
                        DestinoID = item.DestinoID
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
        public object GetPlacasTracto(string token, int TransportistaID, string Tracto)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return EmbarqueBD.Instance.ObtenerTracto(TransportistaID);
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
        public object GetPlacasPlana(string token, int TransportistaID)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return EmbarqueBD.Instance.ObtenerPlana(TransportistaID);
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

        
        public object Post(CapturaEmbarque captura, string token)
        {
            string payload = "";
            string newToken = "";

            JavaScriptSerializer serializer = new JavaScriptSerializer();
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                TransactionalInformation result = new TransactionalInformation();
                try {
                    Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                    using (SamContext ctx = new SamContext())
                    {
                        ctx.Sam3_Embarque_Set_Embarque(captura.Lista[0].embarqueID,
                            captura.Lista[0].tractoID,
                            captura.Lista[0].choferID,
                            captura.Lista[0].destinoID,
                            usuario.UsuarioID,
                            captura.Lista[0].accionPlanaID1,
                            captura.Lista[0].accionPlanaID2,
                            captura.Lista[0].planaID1,
                            captura.Lista[0].planaID2,
                            captura.Lista[0].planaID3,
                            captura.Lista[0].planaID4);
                    }
                }catch(Exception e)
                {
                    
                    result.ReturnMessage.Add(e.Message);
                    result.ReturnCode = 401;
                    result.ReturnStatus = false;
                    result.IsAuthenicated = false;
                    return result;
                }
                
                result.ReturnMessage.Add("Ok");
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
