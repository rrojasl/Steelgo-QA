using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FrontEndSAM.Controllers.ServiciosTecnicos
{
    public class ServiciosTecnicosController : Controller
    {
        public ActionResult ListadoRequisicion()
        {
            return View();
        }
        public ActionResult GenerarRequisicion(int id)
        {
            ViewBag.id = id;
            return View();
        }


        public ActionResult AsignarRequisicion()
        {
            return View();
        }
        public ActionResult RequisicionesAsignadas()
        {
            return View();
        }
        public ActionResult CapturaReportePruebas()
        {
            return View();
        }
        public ActionResult EntregaResultados()
        {
            return View();
        }
        public ActionResult ValidacionResultados()
        {
            return View();
        }
        public ActionResult ImpresionPruebas()
        {
            return View();
        }
    }
}