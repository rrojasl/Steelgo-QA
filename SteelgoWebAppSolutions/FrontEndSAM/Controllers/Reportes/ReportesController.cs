using System.Web.Mvc;
using System.Net;
using System;
using Microsoft.Reporting.WebForms;
using System.Configuration;

namespace FrontEndSAM.Controllers.Reportes
{
    public class ReportesController : Controller
    {
        // GET: Report
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ObtenerReportes(string path,string token)
        {
            try
            {
                if (path != null)
                {
                    token = token.Replace("?leng=es-MX", "");

                    string seguridad = System.Text.Encoding.UTF8.GetString(System.Convert.FromBase64String(token));

                    string usr = seguridad.Split('~')[0].ToString();
                    string pws = seguridad.Split('~')[1].ToString();

                    ReportViewer reportViewer = new ReportViewer();
                    reportViewer.SizeToReportContent = true;
                   
                    reportViewer.BackColor = System.Drawing.ColorTranslator.FromHtml("#305E8E");
                    reportViewer.ForeColor = System.Drawing.Color.White;
                    reportViewer.ID = "reportViewerReportes";

                    reportViewer.ProcessingMode = ProcessingMode.Remote;

                    IReportServerCredentials irsc = new CustomReportCredentials(usr, pws, ConfigurationManager.AppSettings["Dominio"]);
                    reportViewer.ServerReport.ReportServerCredentials = irsc;
                    reportViewer.ServerReport.ReportServerUrl = new Uri(ConfigurationManager.AppSettings["URLReportingServices"]);
                    reportViewer.ServerReport.ReportPath = path.Replace("?leng=es-MX","");
                    reportViewer.ServerReport.Refresh();
                    ViewBag.ReportViewer = reportViewer;
                }
            }
            catch (System.Exception ex)
            {

                throw;
            }
            return View();
        }

    }

    public class CustomReportCredentials : IReportServerCredentials
    {
        private string _UserName;
        private string _PassWord;
        private string _DomainName;

        public CustomReportCredentials(string UserName, string PassWord, string DomainName)
        {
            _UserName = UserName;
            _PassWord = PassWord;
            _DomainName = DomainName;
        }

        public System.Security.Principal.WindowsIdentity ImpersonationUser
        {
            get { return null; }
        }

        public ICredentials NetworkCredentials
        {
            get { return new NetworkCredential(_UserName, _PassWord, _DomainName); }
        }

        public bool GetFormsCredentials(out Cookie authCookie, out string user,
         out string password, out string authority)
        {
            authCookie = null;
            user = password = authority = null;
            return false;
        }
    }
}