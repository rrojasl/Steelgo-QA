using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FrontEndSAM.Controllers.ServiciosTecnicos
{
    public class ServiciosTecnicosController : Controller
    {
        // GET: ServiciosTecnicos
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult CapturaServiciosTecnicos()
        {
            return View();
        }
    }
}