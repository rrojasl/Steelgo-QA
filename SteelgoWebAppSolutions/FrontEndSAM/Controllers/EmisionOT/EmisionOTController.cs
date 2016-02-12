using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FrontEndSAM.Controllers.Errors
{
    public class EmisionOTController : Controller
    {
        //
        // GET: /EmisionOT/
        public ActionResult EmisionOT()
        {
            return View();
        }

        public ActionResult OrdenesDeTrabajo()
        {
            return View();
        }
    }
}