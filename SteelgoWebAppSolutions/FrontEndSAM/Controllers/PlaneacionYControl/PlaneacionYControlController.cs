using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FrontEndSAM.Controllers.Errors
{
    public class PlaneacionYControlController : Controller
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

        public ActionResult Ciclos()
        {
            return View();
        }

        public ActionResult Peticion()
        {
            return View();
        }
        public ActionResult PeticionMontaje()
        {
            return View();
        }
        public ActionResult AutorizacionPeticion()
        {
            return View();
        }
    }
}