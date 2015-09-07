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
    public class ListadoCuantificacionController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public object Put(bool cerrar, bool incompletos, int FolioAvisollegadaId, int FolioCuantificacionID, string cuantificacion, string token, int idGuardado)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                List<CuantificacionListado> datosItemCode = serializer.Deserialize<List<CuantificacionListado>>(cuantificacion);

                switch (idGuardado)
                {
                    case 1: //Terminar y Nuevo 
                        return GuardarItemCodesBd.Instance.TerminarYNuevo(cerrar, incompletos, FolioAvisollegadaId, FolioCuantificacionID, datosItemCode, usuario);
                    case 2: //Guardar Parcial y Nuevo
                        return GuardarItemCodesBd.Instance.GuardarParcial(cerrar, incompletos, FolioAvisollegadaId, FolioCuantificacionID, datosItemCode, usuario);
                    case 3: //Guardar y Cerrar
                        return GuardarItemCodesBd.Instance.SaveAndClose(cerrar, incompletos, FolioAvisollegadaId, FolioCuantificacionID, datosItemCode, usuario);
                    case 4: //Guardar yTerminar (Bulto)
                        return GuardarItemCodesBd.Instance.GuardaryTerminar(cerrar, incompletos, FolioAvisollegadaId, FolioCuantificacionID, datosItemCode, usuario);
                    case 5: //Guardar Parcial (Bulto)
                        return GuardarItemCodesBd.Instance.GuardarParcialBulto(cerrar, incompletos, FolioAvisollegadaId, FolioCuantificacionID, datosItemCode, usuario);
                    default:
                        TransactionalInformation result = new TransactionalInformation();
                        result.ReturnMessage.Add("Listado no encontrado");
                        result.ReturnCode = 500;
                        result.ReturnStatus = false;
                        result.IsAuthenicated = false;
                        return result;
                }
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

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}