using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
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
        public ActionResult GenerarRequisicion(int id = 0)
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
        public ActionResult CapturaReportePruebas(int id=0)
        {
            ViewBag.RequisicionID = id;
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

        public ActionResult Impresion(string url)
        {
            WebClient client = new WebClient();
            client.Credentials = new NetworkCredential("maftec", "M@ftecDB");
            client.DownloadString("http://lapmaftec04:9076/ReportServer/Pages/ReportViewer.aspx?%2fSteelGo%2fReportes%2fReporteDemo&rs:Command=Render&Lenguaje=es-MX&idReportes=88&rc:Toolbar=false&rs:Format=PDF");

            //Response.Redirect("http://lapmaftec04:9076/ReportServer/Pages/ReportViewer.aspx?%2fSteelGo%2fReportes%2fReporteDemo&rs:Command=Render&Lenguaje=es-MX&idReportes=88&rc:Toolbar=false&rs:Format=PDF");
            return View();
        }
    }
}