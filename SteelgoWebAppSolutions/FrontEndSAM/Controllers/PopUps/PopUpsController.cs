using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FrontEndSAM.Controllers
{
    public class PopUpsController : Controller
    {
        //
        // GET: /PopUps/
        public ActionResult Transportista()
        {
            return View();
        }

        public ActionResult Patio()
        {
            return View();
        }

        public ActionResult Chofer()
        {
            return View();
        }
    }
}
