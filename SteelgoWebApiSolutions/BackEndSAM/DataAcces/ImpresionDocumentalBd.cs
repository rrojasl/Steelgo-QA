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
using System.Configuration;

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

        public object ObtenerFormatos(int odtsID, int proyectoID, Sam3_Usuario usuario)
        {
            try
            {
                
                using (SamContext ctx = new SamContext())
                {
                    using (Sam2Context ctx2 = new Sam2Context())
                    {
                        OrdenTrabajoSpool OrdenTSpool = ctx2.OrdenTrabajoSpool.Where(x => x.OrdenTrabajoSpoolID == odtsID).AsParallel().SingleOrDefault();
                        //int faltantesDespacho = (from 

                        string nombreProyecto = ctx.Sam3_Proyecto.Where(x => x.ProyectoID == proyectoID).Select(x => x.Nombre).AsParallel().SingleOrDefault();
                        string numeroControl = ctx2.OrdenTrabajoSpool.Where(x => x.OrdenTrabajoSpoolID == odtsID).Select(x => x.NumeroControl).SingleOrDefault();

                        List<MaterialSpool> listaMateriales = (from ms in ctx2.MaterialSpool
                                                               join odtm in ctx2.OrdenTrabajoMaterial on ms.MaterialSpoolID equals odtm.MaterialSpoolID
                                                               join odts in ctx2.OrdenTrabajoSpool on odtm.OrdenTrabajoSpoolID equals odts.OrdenTrabajoSpoolID
                                                               where odts.OrdenTrabajoSpoolID == OrdenTSpool.OrdenTrabajoSpoolID
                                                               && odtm.TieneDespacho == false
                                                               select ms).AsParallel().Distinct().ToList();

                        

                        if (listaMateriales != null && listaMateriales.Count > 0)
                        {
                            List<ListadoImpresionDocumental> listaFaltantes = (from r in listaMateriales
                                                                               join it in ctx2.ItemCode on r.ItemCodeID equals it.ItemCodeID
                                                                               join tp in ctx.Sam3_TipoMaterial on it.TipoMaterialID equals tp.TipoMaterialID
                                                                               select new ListadoImpresionDocumental
                                                                               {
                                                                                   Cantidad = r.Cantidad.ToString(),
                                                                                   ItemCodeSteelgo = it.Codigo,
                                                                                   TipoMaterial = tp.Nombre
                                                                               }).AsParallel().Distinct().ToList();

                            foreach (ListadoImpresionDocumental l in listaFaltantes)
                            {
                                string temp = (from it in ctx.Sam3_ItemCode
                                               join rits in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on it.ItemCodeID equals rits.ItemCodeID
                                               join its in ctx.Sam3_ItemCodeSteelgo on rits.ItemCodeSteelgoID equals its.ItemCodeSteelgoID
                                               where it.Codigo == l.ItemCodeSteelgo
                                               select its.Codigo).AsParallel().SingleOrDefault();

                                l.ItemCodeSteelgo = temp;
                            }

                            return listaFaltantes;
                        }
                        else
                        {
                            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
                            string rutaBase = ConfigurationManager.AppSettings["SamFiles"];
                            string ruta = rutaBase + nombreProyecto + "\\Traveler\\" + numeroControl + ".pdf";
                            string fileName = numeroControl + ".pdf";

                            FileStream iStream = new FileStream(ruta, FileMode.Open); //, FileAccess.Read, FileShare.Read);

                            response.Content = new StreamContent(iStream);
                            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
                            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
                            response.Content.Headers.ContentDisposition.FileName = fileName;

                            return response;
                        }  

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