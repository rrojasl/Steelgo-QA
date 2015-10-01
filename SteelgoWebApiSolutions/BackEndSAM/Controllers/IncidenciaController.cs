using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;
using BackEndSAM.DataAcces;
using BackEndSAM.Models;
using CommonTools.Libraries.Strings.Security;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;


namespace BackEndSAM.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class IncidenciaController : ApiController
    {
        // GET api/incidencias
        //public IEnumerable<Clasificacion> Get()
        //{
        //    //List<Clasificacion> LstClasificacion = new List<Clasificacion>();
        //    //Clasificacion clasificacion1 = new Clasificacion();
        //    //clasificacion1.ClasificacionID = "1001";
        //    //clasificacion1.Nombre = "Clasificacion 1";
        //    //LstClasificacion.Add(clasificacion1);

        //    //Clasificacion clasificacion2 = new Clasificacion();
        //    //clasificacion2.ClasificacionID = "1002";
        //    //clasificacion2.Nombre = "Clasificacion 2";
        //    //LstClasificacion.Add(clasificacion2);

        //    //return LstClasificacion.AsEnumerable();
        //}

        // GET api/incidencias/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/incidencias
        public Incidencia Post(Incidencia incidencia)
        {
            incidencia.Version = "11";
            incidencia.FolioIncidenciaID = 2;
            return incidencia;
        }

        // PUT api/incidencias/5
        public Incidencia Put(Incidencia incidencia)
        {
            incidencia.Version = "12";
            incidencia.FolioIncidenciaID = 2;
            return incidencia;
        }

        // DELETE api/incidencias/5
        public void Delete(int id)
        {
        }
    }
}
