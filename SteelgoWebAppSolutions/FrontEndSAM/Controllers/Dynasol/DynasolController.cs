﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FrontEndSAM.Controllers.Dynasol
{
    public class DynasolController : Controller
    {
        // GET: Dynasol
        public ActionResult Dynasol()
        {
            return View();
        }
        public ActionResult PackingList()
        {
            return View();
        }
        public ActionResult Camion()
        {
            return View();
        }

    }
}