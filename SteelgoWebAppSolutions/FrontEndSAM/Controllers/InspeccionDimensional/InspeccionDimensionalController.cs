using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FrontEndSAM.Controllers.InspeccionDimensional
{
    public class InspeccionDimensionalController : Controller
    {
        // GET: InspeccionDimensional
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult CapturaInpeccionDimensional()
        {
            return View();
        }
    }
}