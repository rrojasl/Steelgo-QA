using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FrontEndSAM.Controllers.AvisoLlegada
{
    public class AvisoLlegadaController : Controller
    {
        //
        // GET: /AvisoLlegada/
        public ActionResult ListadoAvisoLlegada()
        {
            return View();
        }

        //
        // GET: /AvisoLlegada/
        public ActionResult DetalleAvisoLlegada()
        {
            return View();
        }

        //[HttpPost]
        //public ActionResult FileUploadFile() 
        //{
        //    // When returning JSON the mime-type must be set to text/plain
        //    //return Json(new { status = "OK" }, "text/plain");
        //    return Content("success");
            
        //}


        public ActionResult FileUploadFile(IEnumerable<HttpPostedFileBase> fileUploader)//fileUploader name must be the name of uploader Control.
        {
            // The Name of the Upload component is "fileUploader"
            foreach (var file in fileUploader)
            {
                // Some browsers send file names with full path. We only care about the file name.
                //var fileName = Path.GetFileName(file.FileName);
                //var destinationPath = Path.Combine(Server.MapPath("~/download/"), fileName);


                //file.SaveAs(destinationPath);
            }


            // Return an empty string to signify success
            return Content("");



        }
      

	}
}