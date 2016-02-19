using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FrontEndSAM.Controllers.MedicionesClimatologicas
{
    public class MedicionesClimatologicasController : Controller
    {
        // GET: MedicionesClimatologicas
        public ActionResult CondicionesClimatologicas()
        {
            return View();
        }
    }
}