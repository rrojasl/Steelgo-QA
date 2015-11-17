using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FrontEndSAM.Controllers.Catalogos
{
    public class SoldadorCertificacionController : Controller
    {
        // GET: SoldadorCertificacion
        public ActionResult SoldadorCertificacion()
        {
            return View();
        }
        public ActionResult ListadSoldadorCertificacion()
        {
            return View();
        }
        public ActionResult SoldadorCertificacionPopUP()
        {
            return View();
        }

        public ActionResult _PasosSoldaduraPopUp()
        {
            return View();

        }
    }
}