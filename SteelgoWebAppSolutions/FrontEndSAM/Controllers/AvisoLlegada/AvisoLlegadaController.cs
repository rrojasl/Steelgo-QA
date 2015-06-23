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

        public ActionResult AutorizarPermiso() 
        {
            return View();
        }

        [HttpPost]
        public JsonResult Post(IEnumerable<HttpPostedFileBase> attachments)
        {
            try
            {
                // The Name of the Upload component is "attachments" 
                string json = null;
                if (attachments.Any() && attachments.FirstOrDefault().ContentLength > 50000000)
                {
                    return this.Json(new { status = json }, "text/plain");
                }
                //json = AttachmentManager.Save(attachments, @"~/Attachment/FolderName", @"~/Attachment/FolderName/Thumb");
                return this.Json(new { status = "OK" }, "text/plain");
            }
            catch (Exception ex)
            {
                return this.Json(string.Empty);
            }
        }

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