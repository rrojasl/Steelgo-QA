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
        public Incidencia Get(int folioIncidenciaID)
        {
            Incidencia incidencia = new Incidencia();
            incidencia.Version = "11";
            incidencia.FolioIncidenciaID = 2;
            incidencia.ClasificacionID = 1;
            incidencia.TipoIncidenciaID = 1;
            incidencia.Version = "15";
            incidencia.Titulo = "Titulo Prueba";
            incidencia.Descripcion = "Descripcion 1";
            incidencia.Respuesta = "Respuesta 1";
            incidencia.MotivoCancelacion = "Motivo Cancelacion 1";
            incidencia.DetalleResolucion = "Detalle Resolucion 1";
            incidencia.RegistradoPor = "Registrado por 1";
            incidencia.FechaRegistro = "2015-09-25";
            incidencia.ResueltoPor = "Resuelto por 1";
            incidencia.FechaResolucion = "2015-09-26";
            incidencia.RespondidoPor = "Respondido por";
            incidencia.FechaRespuesta = "2015-09-27";

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

            incidencia.Archivos = lstListaDocumentos;
            return incidencia;
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
