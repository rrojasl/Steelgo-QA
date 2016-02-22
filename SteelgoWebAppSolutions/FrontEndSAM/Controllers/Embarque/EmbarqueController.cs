using System.Web.Mvc;

namespace FrontEndSAM.Controllers.Embarque
{
    public class EmbarqueController : Controller
    {
        public ActionResult Consulta()
        {
            return View();
        }
        public ActionResult Marcado()
        {
            return View();
        }

        public ActionResult Encintado()
        {
            return View();
        }

        public ActionResult Etiquetado()
        {
            return View();
        }


        public ActionResult Cargas(int embarquePlanaID = 0)
        {
            ViewBag.EmbarquePlanaID = embarquePlanaID;
            return View();
        }
      
        public ActionResult Embarque(int embarqueID = 0)
        {
            ViewBag.embarqueID = embarqueID;
            return View();
        }
        public ActionResult ListadoEmbarque()
        {
            return View();
        }
        public ActionResult RevisionEmbarque(int embarquePlanaID = 0)
        {
            ViewBag.EmbarquePlanaID = embarquePlanaID;
            return View();
        }

        public ActionResult Empaquetado(int embarquePlanaID = 0)
        {
            ViewBag.EmbarquePlanaID = embarquePlanaID;
            return View();
        }
    }
}
