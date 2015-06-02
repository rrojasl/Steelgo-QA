using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web;
using System.Web.Http.Cors;
using BackEndSAM.Models;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Configuration;

namespace BackEndSAM.Controllers
{
    //[EnableCors(origins: "http://localhost:61102", headers: "*", methods: "*", SupportsCredentials = true)]
    [EnableCors(origins: "http://localhost:61102", headers: "*", methods: "*")]
    public class DummyFileManagerController : ApiController
    {

        // GET api/dummyfilemanager/
        public List<Files> Get(string username, string token)
        {
            var resultFiles = new List<Files>();
            Files files = new Files();
            files.id = 1;
            files.Archivo = "Prueba1";
            files.Extension = ".doc";
            files.Descripcion = "Prueba description 1";
            resultFiles.Add(files);

            Files files2= new Files();
            files2.id = 2;
            files2.Archivo = "Prueba2";
            files2.Extension = ".docx";
            files2.Descripcion = "Prueba description 2";
            resultFiles.Add(files2);
            return resultFiles;
        }

        // PUT api/dummyfilemanager/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/dummyfilemanager/5
        public void Delete(string archivoID, string username, string token)
        {
           
        }


        public Files Post(string username, string token)
        {
            // Check if the request contains multipart/form-data.
            if (Request.Content.IsMimeMultipartContent() == false)
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            Files files = new Files();
            files.id = 1;
            files.Archivo = "Prueba1";
            files.Extension = ".doc";
            files.status = "OK";
            return files;
        }
    }
}
