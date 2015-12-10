using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Web.Services.Protocols;
using SecurityManager.Api.Models;
using DatabaseManager.Sam3;
using System.Net;
using System.Configuration;
using System.Security.Principal;
using BackEndSAM.Sam3Reportes;
using Microsoft.SqlServer.Server;
using Microsoft.ReportingServices;
using System.Net.Http;
using System.Net.Http.Headers;


namespace BackEndSAM.DataAcces
{
    public class ReportesBd
    {
        private static readonly object _mutex = new object();
        private static ReportesBd _instance;
        private string usuarioReportes
        {
            get 
            {
                return ConfigurationManager.AppSettings["usuarioReportes"];
            }
        }
        private string passReportes
        {
            get
            {
                return ConfigurationManager.AppSettings["passReportes"];
            }
        }
        private string dominioReportes 
        {
            get
            {
                return ConfigurationManager.AppSettings["dominioReportes"];
            }
        }


        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private ReportesBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static ReportesBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new ReportesBd();
                    }
                }
                return _instance;
            }
        }

        public object ReporteFormatoEtiquetasOrdenRecepcion(int ordenRecepcionID, Sam3_Usuario usuario)
        {
            try
            {
                #region parametros
                byte[] reporte;
                string historyID = null;
                string deviceInfo = null;
                string extension;
                string encoding;
                string mimeType;
                Warning[] warnings;
                string[] streamIDs = null;
                string format = "PDF";
                string rutaReporte = "/Reportes/Formato de Etiquetas";
                NetworkCredential credenciales = new NetworkCredential(usuarioReportes, passReportes);
                #endregion

                ReportExecutionServiceSoapClient cliente = new ReportExecutionServiceSoapClient();
                cliente.ClientCredentials.Windows.ClientCredential = credenciales;
                cliente.ClientCredentials.Windows.AllowedImpersonationLevel = TokenImpersonationLevel.Impersonation;
                cliente.ClientCredentials.UserName.UserName = usuarioReportes;
                cliente.ClientCredentials.UserName.Password = passReportes;

                ParameterValue[] parametros = new ParameterValue[1];
                parametros[0] = new ParameterValue();
                parametros[0].Name = "OrdenRecepcionID";
                parametros[0].Value = ordenRecepcionID.ToString();

                ExecutionInfo infoEjecucion = new ExecutionInfo();
                TrustedUserHeader encabezadoSeguro = null;
                ExecutionHeader encabezadoDeEjecucion = new ExecutionHeader();
                ServerInfoHeader encavezadoDeServidor = new ServerInfoHeader();

                encabezadoDeEjecucion = cliente.LoadReport(encabezadoSeguro, rutaReporte, historyID, out encavezadoDeServidor, out infoEjecucion);
                cliente.SetExecutionParameters(encabezadoDeEjecucion, encabezadoSeguro, parametros, "en-US", out infoEjecucion);

                cliente.Render(encabezadoDeEjecucion, encabezadoSeguro, format, deviceInfo, out reporte, out extension, out mimeType, out encoding, out warnings, out streamIDs);

                HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);

                Stream iStream = new MemoryStream(reporte);

                response.Content = new StreamContent(iStream);
                response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
                response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
                response.Content.Headers.ContentDisposition.FileName = "Formato_Etiquetas_OrdenRecepcion_"  + ordenRecepcionID.ToString() + ".pdf";

                return response;
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------

                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add("Error al cargar el reporte");
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object ReporteFormatoIncidencias(int FolioAvisoLlegadaID, string cadena, Sam3_Usuario usuario)
        {
            try
            {
                #region parametros
                byte[] reporte;
                string historyID = null;
                string deviceInfo = null;
                string extension;
                string encoding;
                string mimeType;
                Warning[] warnings;
                string[] streamIDs = null;
                string format = "PDF";
                string rutaReporte = "/Reportes/Formato de Incidencias";
                NetworkCredential credenciales = new NetworkCredential(usuarioReportes, passReportes);
                #endregion

                ReportExecutionServiceSoapClient cliente = new ReportExecutionServiceSoapClient();
                cliente.ClientCredentials.Windows.ClientCredential = credenciales;
                cliente.ClientCredentials.Windows.AllowedImpersonationLevel = TokenImpersonationLevel.Impersonation;
                cliente.ClientCredentials.UserName.UserName = usuarioReportes;
                cliente.ClientCredentials.UserName.Password = passReportes;

                ParameterValue[] parametros = new ParameterValue[2];
                parametros[0] = new ParameterValue();
                parametros[0].Name = "FolioAvisoLlegadaID";
                parametros[0].Value = FolioAvisoLlegadaID.ToString();

                parametros[1] = new ParameterValue();
                parametros[1].Name = "cadena";
                parametros[1].Value = cadena;

                ExecutionInfo infoEjecucion = new ExecutionInfo();
                TrustedUserHeader encabezadoSeguro = null;
                ExecutionHeader encabezadoDeEjecucion = new ExecutionHeader();
                ServerInfoHeader encavezadoDeServidor = new ServerInfoHeader();

                encabezadoDeEjecucion = cliente.LoadReport(encabezadoSeguro, rutaReporte, historyID, out encavezadoDeServidor, out infoEjecucion);
                cliente.SetExecutionParameters(encabezadoDeEjecucion, encabezadoSeguro, parametros, "en-US", out infoEjecucion);

                cliente.Render(encabezadoDeEjecucion, encabezadoSeguro, format, deviceInfo, out reporte, out extension, out mimeType, out encoding, out warnings, out streamIDs);

                HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);

                Stream iStream = new MemoryStream(reporte);

                response.Content = new StreamContent(iStream);
                response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
                response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
                response.Content.Headers.ContentDisposition.FileName = "Formato_Incidencias_FolioAvisoLlegada" + FolioAvisoLlegadaID.ToString() +".pdf";

                return response;
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------

                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add("Error al cargar el reporte");
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object ReportePaseSalidaTransportista(int FolioAvisoLlegadaID, Sam3_Usuario usuario)
        {
            try
            {
                #region parametros
                byte[] reporte;
                string historyID = null;
                string deviceInfo = null;
                string extension;
                string encoding;
                string mimeType;
                Warning[] warnings;
                string[] streamIDs = null;
                string format = "PDF";
                string rutaReporte = "/Reportes/Pase de Salida de Transportista";
                NetworkCredential credenciales = new NetworkCredential(usuarioReportes, passReportes);
                #endregion

                ReportExecutionServiceSoapClient cliente = new ReportExecutionServiceSoapClient();
                cliente.ClientCredentials.Windows.ClientCredential = credenciales;
                cliente.ClientCredentials.Windows.AllowedImpersonationLevel = TokenImpersonationLevel.Impersonation;
                cliente.ClientCredentials.UserName.UserName = usuarioReportes;
                cliente.ClientCredentials.UserName.Password = passReportes;

                ParameterValue[] parametros = new ParameterValue[1];
                parametros[0] = new ParameterValue();
                parametros[0].Name = "FolioAvisoLlegadaID";
                parametros[0].Value = FolioAvisoLlegadaID.ToString();

                ExecutionInfo infoEjecucion = new ExecutionInfo();
                TrustedUserHeader encabezadoSeguro = null;
                ExecutionHeader encabezadoDeEjecucion = new ExecutionHeader();
                ServerInfoHeader encavezadoDeServidor = new ServerInfoHeader();

                encabezadoDeEjecucion = cliente.LoadReport(encabezadoSeguro, rutaReporte, historyID, out encavezadoDeServidor, out infoEjecucion);
                cliente.SetExecutionParameters(encabezadoDeEjecucion, encabezadoSeguro, parametros, "en-US", out infoEjecucion);

                cliente.Render(encabezadoDeEjecucion, encabezadoSeguro, format, deviceInfo, out reporte, out extension, out mimeType, out encoding, out warnings, out streamIDs);

                HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);

                Stream iStream = new MemoryStream(reporte);

                response.Content = new StreamContent(iStream);
                response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
                response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
                response.Content.Headers.ContentDisposition.FileName = "PaseSalidaTransportista_FolioAvisoLlegada" + FolioAvisoLlegadaID.ToString() +".pdf";

                return response;
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------

                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add("Error al cargar el reporte");
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }
    }
}