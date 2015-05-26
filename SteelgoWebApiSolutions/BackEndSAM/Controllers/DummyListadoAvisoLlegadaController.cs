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
            lstfolioAvisoLlegada.Add(folioAvisoLlegada);

            ListadoFolioAvisoLlegada folioAvisoLlegada1 = new ListadoFolioAvisoLlegada();
            folioAvisoLlegada1.FolioAvisoLlegadaID = 2;
            lstfolioAvisoLlegada.Add(folioAvisoLlegada1);

            //ListadoFolioAvisoLlegada lst = new ListadoFolioAvisoLlegada();
            //lst.creacion = 0;
            //lst.detalle = 1;
            //lst.eliminacion = 1;
            //lst.listado = 1;
            //List<propiedades> lstprop= new List<propiedades>();
            //propiedades prop = new propiedades();
            //FolioAvisoLlegadaID fl = new FolioAvisoLlegadaID();
            //fl.editable = 1;
            //fl.requerido = 1;
            //fl.visible = 0;
            //prop.FolioAvisoLlegadaID = fl;
           
            //lstprop.Add(prop);
            //lst.propiedades = lstprop.AsEnumerable();
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
