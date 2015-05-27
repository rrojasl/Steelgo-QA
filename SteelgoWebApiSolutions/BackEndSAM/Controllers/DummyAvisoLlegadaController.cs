using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using BackEndSAM.Models;

namespace BackEndSAM.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DummyAvisoLlegadaController : ApiController
    {
        // GET api/avisollegada
        public IEnumerable<AvisoLlegada> Get(string folio, string username, string token)
        {
            List<AvisoLlegada> lstAviso = new List<AvisoLlegada>();
            List<Proyecto> lstProyecto= new List<Proyecto>();
            List<Files> listFiles = new List<Files>();

            AvisoLlegada aviso = new AvisoLlegada();
            Proyecto proyecto= new Proyecto();
            Files files = new Files();
            Files files2 = new Files();
            files.id = 1;
            files.Archivo = "Prueba1";
            files.Extension = ".doc";
            listFiles.Add(files);

            files2.id = 2;
            files2.Archivo = "Prueba2";
            files2.Extension = ".docx";
            listFiles.Add(files2);

            aviso.FolioAvisoLlegadaID = 10;

            proyecto.ProyectoID = 1;
            lstProyecto.Add(proyecto);
            aviso.Proyectos = lstProyecto;

            aviso.Factura = "RSE-Fact";
            aviso.TransportistaID = 2;
            aviso.FechaRecepcion = Convert.ToDateTime("2015/05/25");
            aviso.ProveedorID = 1;
            aviso.NumeroPlana = 2;
            aviso.OrdenCompra = "RSE-Fact2";
            aviso.PatioID = 2;
            aviso.ChoferID = 1;
            aviso.Archivos = new List<Files>();
            aviso.Archivos = listFiles;
            lstAviso.Add(aviso);
            return lstAviso.AsEnumerable();
        }

        // GET api/avisollegada/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/avisollegada
        public void Post(string avisollegada, string username, string token)
        {
        }

        // PUT api/avisollegada/5
        public void Put(string avisollegada, string username, string token)
        {
        }

        // DELETE api/avisollegada/5
        public void Delete(int id)
        {
        }
    }
}
