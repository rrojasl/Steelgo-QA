using BackEndSAM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace BackEndSAM.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DummyListadoAvisoLlegadaController : ApiController
    {
        // GET api/dummylistadoavisollegada
        public List<ListadoFolioAvisoLlegada> Get()
        {
            List<ListadoFolioAvisoLlegada> lstfolioAvisoLlegada = new List<ListadoFolioAvisoLlegada>();
            ListadoFolioAvisoLlegada folioAvisoLlegada = new ListadoFolioAvisoLlegada();

            folioAvisoLlegada.FolioAvisoLlegadaID = 1;
            folioAvisoLlegada.NombreProyecto = "Prueba 1";
            folioAvisoLlegada.FechaRecepcion = DateTime.Today;
            lstfolioAvisoLlegada.Add(folioAvisoLlegada);

            ListadoFolioAvisoLlegada folioAvisoLlegada1 = new ListadoFolioAvisoLlegada();
            folioAvisoLlegada1.FolioAvisoLlegadaID = 2;
            folioAvisoLlegada1.NombreProyecto = "Prueba 2";
            folioAvisoLlegada1.FechaRecepcion = DateTime.Today;
            lstfolioAvisoLlegada.Add(folioAvisoLlegada1);

            return lstfolioAvisoLlegada;
        }

        // POST api/dummylistadoavisollegada
        public void Post([FromBody]string value)
        {
        }

        // PUT api/dummylistadoavisollegada/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/dummylistadoavisollegada/5
        public string Delete(string folio, string username, string token)
        {
            return "--->" + folio + "<---";
        }
    }
}
