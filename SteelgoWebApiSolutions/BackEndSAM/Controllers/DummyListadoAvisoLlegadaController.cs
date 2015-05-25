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
    [EnableCors(origins: "http://localhost:61102", headers: "*", methods: "*")]
    public class DummyListadoAvisoLlegadaController : ApiController
    {
        // GET api/dummylistadoavisollegada
        public ListadoFolioAvisoLlegada Get()
        {
       
            ListadoFolioAvisoLlegada lst = new ListadoFolioAvisoLlegada();
            lst.creacion = 0;
            lst.detalle = 1;
            lst.eliminacion = 1;
            lst.listado = 1;
            List<propiedades> lstprop= new List<propiedades>();
            propiedades prop = new propiedades();
            FolioAvisoLlegadaID fl = new FolioAvisoLlegadaID();
            fl.editable = 1;
            fl.requerido = 1;
            fl.visible = 0;
            prop.FolioAvisoLlegadaID = fl;
           
            lstprop.Add(prop);
            lst.propiedades = lstprop.AsEnumerable();
            return lst;
        
        }

        // GET api/dummylistadoavisollegada/5
        public string Get(int id)
        {
            return "value";
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
        public void Delete(int id)
        {
        }
    }
}
