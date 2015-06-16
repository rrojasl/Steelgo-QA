using BackEndSAM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace BackEndSAM.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ProyectoController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<Proyecto> Get()
        {
            List<Proyecto> lstProyecto = new List<Proyecto>();
            Proyecto proyecto = new Proyecto();
            Proyecto proyecto1 = new Proyecto();
            Proyecto proyecto2 = new Proyecto();
            Proyecto proyecto3 = new Proyecto();

            proyecto.ProyectoID = "1";
            proyecto.Nombre = "Proyecto 1";
            lstProyecto.Add(proyecto);

            proyecto1.ProyectoID = "2";
            proyecto1.Nombre = "Proyecto 2";
            lstProyecto.Add(proyecto1);

            proyecto2.ProyectoID = "155";
            proyecto2.Nombre = "Proyecto 3";
            lstProyecto.Add(proyecto2);

            proyecto3.ProyectoID = "156";
            proyecto3.Nombre = "Proyecto 4";
            lstProyecto.Add(proyecto3);


            return lstProyecto;
        }

        // POST api/<controller>
        public void Post([FromUri] int[] proys, [FromUri] string username)
        {
            var content = Request.Content;
        }
    }
}