using BackEndSAM.DataAcces;
using BackEndSAM.Models.WPS;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;


namespace BackEndSAM.Controllers
{

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class WPSController : ApiController
    {

        //Obtiene JSON Para cargar el Grid 
        public object Get(int TipoDato, string token)
        {
            try
            {
                string payload = "";
                string newToken = "";
                bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
                if (totokenValido)
                {
                    return WPSBd.Instance.ObtenerWPS(TipoDato);
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
            catch (Exception ex)
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;
                return result;

            }
        }

        //Elimina un registro (solo cambia su estatus a inactivo)
        public object Put(int TipoDeDato, int WPSIdentificador, string token)
        {
            try
            {
                string payload = "";
                string newToken = "";
                bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
                if (totokenValido)
                {
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    Sam3_Usuario Usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                    int IdUsuario = Usuario.UsuarioID;
                    return WPSBd.Instance.EliminaWPS(TipoDeDato, WPSIdentificador, IdUsuario);

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
            catch (Exception ex)
            {

                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;
                return result;
            }
        }


        //Agrega wps
        public object Post(WPS AddWPS, string token)
        {
            try
            {
                string payload = "";
                string newToken = "";
                bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
                if (totokenValido)
                {
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    Sam3_Usuario Usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                    return WPSBd.Instance.AgregarWPS(AddWPS, Usuario);
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
            catch (Exception ex)
            {

                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;
                return result;
            }

        }


        //Actualiza WPS
        public object Put(WPS WPS, string token, string Lenguaje)
        {
            try
            {
                string payload = "";
                string newToken = "";
                bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
                if (totokenValido)
                {
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    Sam3_Usuario Usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                    return WPSBd.Instance.EditaWPS(WPS, Lenguaje, Usuario);

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
            catch (Exception ex)
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;
                return result;
            }




        }


        //VALIDA QUE EL WPS NO EXISTA
        public object Get(string NombreWPSValida, string token, int WPSIDValida, int Accion)
        {
            try
            {
                string payload = "";
                string newToken = "";
                bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
                if (totokenValido)
                {
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                    return WPSBd.Instance.ValidarExisteWPS(WPSIDValida, NombreWPSValida);
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
            catch (Exception ex)
            {


                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;
                return result;
            }


        }

    }
}
