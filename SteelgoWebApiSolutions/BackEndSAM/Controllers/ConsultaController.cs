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
    public class ConsultaController : ApiController
    {
        [HttpGet]
        public object ObtieneDatosConsulta(string token, int AreaID, int CuadranteID)
        {
            //Create a generic return object


            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                List<Consulta> lista = new List<Consulta>();
                List<Sam3_Embarque_Get_Consulta_Result> result = (List<Sam3_Embarque_Get_Consulta_Result>) ConsultaBD.Instance.ObtenerDatosConsulta(AreaID, CuadranteID);

                foreach(Sam3_Embarque_Get_Consulta_Result item  in result)
                {
                    Consulta renglon = new Consulta
                    {
                        AreaID = int.Parse(item.AreaID.ToString()),
                        Cuadrante = item.Cuadrante,
                        CuadranteID = item.CuadranteID,
                        SpoolID = item.NumeroControl,
                        Paso = item.Paso
                    };
                    lista.Add(renglon);
                }
                return lista;
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
