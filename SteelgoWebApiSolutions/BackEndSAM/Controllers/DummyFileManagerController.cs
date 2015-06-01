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
            resultFiles.Add(files);

            Files files2= new Files();
            files2.id = 2;
            files2.Archivo = "Prueba2";
            files2.Extension = ".docx";
            resultFiles.Add(files2);

            return resultFiles;
        }

        // POST api/dummyfilemanager
        //[HttpPost]
        //public object Post()
        //{
        //    var request = HttpContext.Current.Request;
        //    HttpResponseMessage result = null;

        //    //if (request.Files.Count == 0)
        //    //{
        //    //    result = Request.CreateResponse(HttpStatusCode.BadRequest);
        //    //}
        //    //var resultFiles = new List<Files>();
        //    //Files files = new Files();
        //    //files.id = 1;
        //    //files.Archivo = "Prueba1";
        //    //files.status = "OK";
        //    //resultFiles.Add(files);

        //    //result = Request.CreateResponse(HttpStatusCode.Created, resultFiles);

        //    //var s = new string[] { status="OK", id="12", archivo = "successfully uploaded" };
        //    //Json(s, JsonRequestBehavior.AllowGet);

        //    Files[] returnObject = new Files[2];
        //    returnObject[0] = new Files(1, "value1", "OK");
        //    returnObject[1] = new Files(2, "value2", "OK");
        //    return Json(new { status = "OK" }, "text/plain");
        //}

        // PUT api/dummyfilemanager/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/dummyfilemanager/5
        public void Delete(string archivoID, string username, string token)
        {
           
        }


        public Task<HttpResponseMessage> Post()
        {
            // Check if the request contains multipart/form-data.
            if (Request.Content.IsMimeMultipartContent() == false)
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            string root = HttpContext.Current.Server.MapPath("~/App_Data");
            var provider = new MultipartFormDataStreamProvider(root);

            var task = Request.Content.ReadAsMultipartAsync(provider).
                ContinueWith<HttpResponseMessage>(t =>
                {
                    if (t.IsFaulted || t.IsCanceled)
                    {
                        Request.CreateErrorResponse(HttpStatusCode.InternalServerError, t.Exception);
                    }

                    foreach (MultipartFileData file in provider.FileData)
                    {
                        //string directory = Path.GetDirectoryName(file.LocalFileName);
                       
                    }
                    return Request.CreateResponse(HttpStatusCode.OK);
                });

            return task;
        }
    }
}
