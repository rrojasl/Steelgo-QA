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

        public ActionResult FileUploadFile() 
        {
            var s = new { status = "OK", id = "12", archivo = "successfully uploaded" };
            return Json(s, JsonRequestBehavior.AllowGet);
        }
	}
}