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
    public class ImpresionDocumentalController : ApiController
    {
        // GET api/impresiondocumental
        public IEnumerable<ComboNumeroControl> Get(string id, string texto, string token)
        {
            List<ComboNumeroControl> lstNumeroUnico = new List<ComboNumeroControl>();
            ComboNumeroControl numerounico1 = new ComboNumeroControl();
            ComboNumeroControl numerounico2 = new ComboNumeroControl();
            ComboNumeroControl numerounico3 = new ComboNumeroControl();

            numerounico1.NumeroControlID = "1";
            numerounico1.NumeroControl = "Numero Unico 1";
            lstNumeroUnico.Add(numerounico1);

            numerounico2.NumeroControlID = "2";
            numerounico2.NumeroControl = "Numero Unico 2";
            lstNumeroUnico.Add(numerounico2);

            numerounico3.NumeroControlID = "3";
            numerounico3.NumeroControl = "Numero Unico 3";
            lstNumeroUnico.Add(numerounico3);

            return lstNumeroUnico.AsEnumerable();
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
