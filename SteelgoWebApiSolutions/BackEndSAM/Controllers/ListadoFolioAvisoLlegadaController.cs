using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;
using BackEndSAM.DataAcces;
using BackEndSAM.Models;
using CommonTools.Libraries.Strings.Security;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;

namespace BackEndSAM.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ListadoFolioAvisoLlegadaController : ApiController
    {
        public object Get(FiltrosJson filtros)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(filtros.token, out payload, out newToken);

            //FiltrosJson filtros = new FiltrosJson(); 
            //{
            //    FolioAvisoLlegadaID = FolioAvisoLlegadaID,
            //    FolioLlegadaID = FolioLlegadaID,
            //    Patio = Patio,
            //    FechaFinal = FechaFinal,
            //    FechaInicial = FechaInicial,
            //    token = token,
            //    Proveedor = Proveedor,
            //    Proyectos = Proyectos
            //};

            if (tokenValido)
            {
                return AvisoLlegadaBd.Instance.ObtenerListadoAvisoLlegada(filtros);
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