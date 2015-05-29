using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FrontEndSAM.Controllers.LlegadaMaterial
{
    public class EntradaMaterialController : Controller
    {
        //
        // GET: /EntradaMaterial/
        public ActionResult EntradaMaterial()
        {
            return View();
        }

        //
        // GET: /EntradaMaterial/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        //
        // GET: /EntradaMaterial/Create
        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /EntradaMaterial/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /EntradaMaterial/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        //
        // POST: /EntradaMaterial/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /EntradaMaterial/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /EntradaMaterial/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
