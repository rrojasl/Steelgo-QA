using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FrontEndSAM.Controllers.Errors
{
    public class ErrorsController : Controller
    {
        //
        // GET: /Errors/
        public ActionResult notfound()
        {
            return View();
        }
	}
}