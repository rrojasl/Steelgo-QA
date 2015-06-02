using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using BackEndSAM.Models;

namespace BackEndSAM.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DummyEntradaMaterialController : ApiController
    {
        // GET api/entradamaterial
        public EdicionLlegadaMaterial Get(string folioAvisoLlegada,string folioLlegada, string username, string token)
        {
            List<EdicionLlegadaMaterial> lstedit = new List<EdicionLlegadaMaterial>();
            List<Files> lstfiles= new List<Files>();

            EdicionLlegadaMaterial edicion = new EdicionLlegadaMaterial();
            Patio patio= new Patio();
            patio.PatioID="1";
            patio.Nombre="Plaza Real";

            Proyecto proyecto= new Proyecto();
            proyecto.ProyectoID="1";
            proyecto.Nombre="value1";

            Files files = new Files();
            files.id = 1;
            files.Descripcion = "ARCHIVO 1";
            files.Archivo="documento";
            files.Extension = ".doc";
            lstfiles.Add(files);

            Files files1= new Files();
            files1.id = 1;
            files1.Descripcion = "ARCHIVO 2";
            files1.Archivo="documento2";
            files1.Extension = ".docx";
            lstfiles.Add(files1);
            
            edicion.FolioAvisoLlegadaID = 123;
            edicion.FolioLlegadaID = 152;
            edicion.Proyecto = proyecto;
            edicion.Patio = patio;
            edicion.Archivos = lstfiles;
            edicion.Estatus = "En Patio";
            return edicion;
        }

        // GET api/entradamaterial/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/entradamaterial
        public void Post([FromBody]string value)
        {
        }

        // PUT api/entradamaterial/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/entradamaterial/5
        public void Delete(int id)
        {
        }
    }
}
