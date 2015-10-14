using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FrontEndSAM.Controllers.popups
{
    public class AgregarTipoTrabajoAdicionalController : Controller
    {
        // GET: AgregarTipoTrabajoAdicional
        public ActionResult creaTipoTrabajoAdicional()
        {
            return PartialView();
        }
    }
}