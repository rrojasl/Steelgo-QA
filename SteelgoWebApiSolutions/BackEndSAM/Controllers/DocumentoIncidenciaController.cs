using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using CommonTools.Libraries.Strings.Security;
using DatabaseManager.EntidadesPersonalizadas;
using DatabaseManager.Sam3;
using SecurityManager.TokenHandler;
using SecurityManager.Api.Models;
using BackEndSAM.DataAcces;
using BackEndSAM.Models;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Configuration;


namespace BackEndSAM.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DocumentoIncidenciaController : ApiController
    {
        // GET api/documentoincidencia
        public IEnumerable<ListaDocumentos> Get(string folio, string token)
        {
            List<ListaDocumentos> lstListaDocumentos = new List<ListaDocumentos>();
            ListaDocumentos documento1 = new ListaDocumentos();
            documento1.DocumentoID = "1";
            documento1.Extencion = ".doc";
            documento1.Nombre = "Archivo 1";
            documento1.TipoArchivo = "Incidencia";
            documento1.Url = "www.google.com";
            documento1.Descripcion = "Prueba 1";
            lstListaDocumentos.Add(documento1);

            ListaDocumentos documento2 = new ListaDocumentos();
            documento2.DocumentoID = "2";
            documento2.Extencion = ".docx";
            documento2.Nombre = "Archivo 2";
            documento2.TipoArchivo = "Incidencia 2";
            documento2.Url = "www.com";
            documento2.Descripcion = "Prueba 2";
            lstListaDocumentos.Add(documento2);

            return lstListaDocumentos.AsEnumerable();
        }


        // POST api/documentoincidencia
        public void Post(int folioIncidenciaID, int tipoArchivoID, string descripcion, string token)
        {

        }

        // PUT api/documentoincidencia/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/documentoincidencia/5
        public void Delete(string documentoID, string token)
        {
        }
    }
}
