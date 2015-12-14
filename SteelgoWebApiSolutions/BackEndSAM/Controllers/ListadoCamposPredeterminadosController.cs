using BackEndSAM.DataAcces;
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
    public class ListadoCamposPredeterminadosController : ApiController
    {
        //Obtiene el DataSource para CamposPredeterminados.
        public object Get(int TipoDato, string token)
        {
            try
            {

                string payload = "";
                string newToken = "";
                bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
                if (totokenValido)
                {
                    return ListadoCamposPredeterminadosBd.Instance.ObtenerListadoCamposPredeterminados(TipoDato);
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

        //Actualiza el valor por defecto
        public object Get(int TIPO, string ValorPorDefecto, int ID, string token)
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
                    return ListadoCamposPredeterminadosBd.Instance.ActualizaCamposPredeterminados(TIPO, ValorPorDefecto, IdUsuario, ID);
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

        /// <summary>
        /// Retorna el valor del campo predeterminado tomando en consideración el identificador del mismo y el lenguaje
        /// </summary>
        /// <param name="token">token</param>
        /// <param name="lenguaje">lenguaje</param>
        /// <param name="id">identificador del campo predeterminado</param>
        /// <returns></returns>
        public object Get(string token, string lenguaje, int id)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                return ListadoCamposPredeterminadosBd.Instance.ObtenerValorCampoPredeterminado(lenguaje, id);

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
