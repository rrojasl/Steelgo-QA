using BackEndSAM.DataAcces;
using BackEndSAM.Models;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace BackEndSAM.Controllers
{
    public class GenerarOrdenAlmacenajeController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public object Get(int ProyectoID, int folioCuantificacion, int ItemCode, int NumeroUnico, string token)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
          
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);

            if (tokenValido)
            {
                JavaScriptSerializer ser = new JavaScriptSerializer();
                Sam3_Usuario usuario = ser.Deserialize<Sam3_Usuario>(payload);

                return OrdenAlmacenajeBd.Instance.ObtenerListadoGeneracionOrdenAlacenaje(ProyectoID, folioCuantificacion, ItemCode, NumeroUnico);

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

        // POST api/<controller>
        public object Post(List<int> listaNU, string token)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);

            if (tokenValido)
            {
                JavaScriptSerializer ser = new JavaScriptSerializer();
                Sam3_Usuario usuario = ser.Deserialize<Sam3_Usuario>(payload);

                return OrdenAlmacenajeBd.Instance.GenerarOrdenAlmacenaje(listaNU, usuario);

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

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}