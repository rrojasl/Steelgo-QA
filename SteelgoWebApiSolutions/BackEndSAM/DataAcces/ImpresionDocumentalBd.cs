using System;
using System.Collections.Generic;
using System.Linq;
using DatabaseManager.Sam2;
using DatabaseManager.Sam3;
using BackEndSAM.Models;
using SecurityManager.Api.Models;
using System.Web;
using System.IO;
using System.Net.Http;
using System.Net;
using System.Net.Http.Headers;

namespace BackEndSAM.DataAcces
{
    public class ImpresionDocumentalBd
    {
        private static readonly object _mutex = new object();
        private static ImpresionDocumentalBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private ImpresionDocumentalBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static ImpresionDocumentalBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new ImpresionDocumentalBd();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerFormatos(int odtsID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    using (Sam2Context ctx2 = new Sam2Context())
                    {
                        

                        string ruta = "";
                        int longitud = 0;
                        long datosALeer = 0;
                        string nombreArchivo = "";

                        Stream iStream = new FileStream(ruta, FileMode.Open, FileAccess.Read, FileShare.Read);


                        HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
                        response.Content = new StreamContent(iStream);
                        response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");

                        return response;
                    }
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }
    }
}