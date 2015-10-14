using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FrontEndSAM.Controllers.Catalogos
{
    public class ObreroController : Controller
    {
        // GET: Obrero
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ListadoObrero()
        {
            return View();
        }

        public ActionResult creaObrero()
        {
            return PartialView();
        }
    }
}