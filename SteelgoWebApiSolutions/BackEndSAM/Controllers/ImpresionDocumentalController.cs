﻿using System;
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
    public class ImpresionDocumentalController : ApiController
    {
        // GET api/impresiondocumental
        public object Get(string id, string texto, string token)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return OrdenTrabajoSpoolBd.Instance.ListadoNumerosDeControl(texto, Convert.ToInt32(id), usuario);
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

        // GET api/impresiondocumental/5
        public IEnumerable<ListadoImpresionDocumental> Get(string NumeroControl, string token)
        {
            List<ListadoImpresionDocumental> lstImpresionDoc = new List<ListadoImpresionDocumental>();
            ListadoImpresionDocumental ImpresionDoc1 = new ListadoImpresionDocumental();
            ListadoImpresionDocumental ImpresionDoc2 = new ListadoImpresionDocumental();
            ListadoImpresionDocumental ImpresionDoc3 = new ListadoImpresionDocumental();

            ImpresionDoc1.TipoMaterial = "Tubo";
            ImpresionDoc1.ItemCodeSteelgo = "A123T01";
            ImpresionDoc1.Cantidad = "400";
            lstImpresionDoc.Add(ImpresionDoc1);

            ImpresionDoc2.TipoMaterial = "Accesorio";
            ImpresionDoc2.ItemCodeSteelgo = "A123A01";
            ImpresionDoc2.Cantidad = "1";
            lstImpresionDoc.Add(ImpresionDoc2);

            return lstImpresionDoc.AsEnumerable();
        }

        // POST api/impresiondocumental
        public void Post(ImpresionDocumental Listado, string token)
        {
            
        }

        // PUT api/impresiondocumental/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/impresiondocumental/5
        public void Delete(int id)
        {
        }
    }
}