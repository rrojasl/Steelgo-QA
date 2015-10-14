using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FrontEndSAM.Controllers.popups
{
    public class AgregarTrabajoAdicionalController : Controller
    {
        // GET: AgregarTrabajoAdicional
        public ActionResult creaTrabajoAdicional()
        {
            return PartialView();
        }
    }
}