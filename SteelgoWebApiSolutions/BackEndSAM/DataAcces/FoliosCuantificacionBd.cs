using BackEndSAM.Models;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces
{
    public class FoliosCuantificacionBd
    {
        private static readonly object _mutex = new object();
        private static FoliosCuantificacionBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private FoliosCuantificacionBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static FoliosCuantificacionBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new FoliosCuantificacionBd();
                    }
                }
                return _instance;
            }
        }

        /// <summary>
        /// Obtener Folio AViso Llegada (Combo Folio Aviso Entrada)
        /// </summary>
        /// <returns>Lista de Folios de Aviso de llegada</returns>
        public object getFolioLlegada()
        {
            List<FolioEntradaYLlegada> listFE = new List<FolioEntradaYLlegada>();
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    listFE = (from t in ctx.Sam3_FolioAvisoEntrada
                              where t.FolioDescarga != 0 && t.Activo == true
                              select new FolioEntradaYLlegada
                                                 {
                                                     FolioAvisoEntradaID = t.FolioAvisoEntradaID,
                                                     FolioAvisoLlegadaID = t.FolioAvisoLlegadaID
                                                 }).AsParallel().ToList();
                }
                return listFE;

            }
            catch (Exception ex)
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        /// <summary>
        /// Obtener Folios Cuantificacion
        /// </summary>
        /// <param name="avisoEntrada">id del aviso de entrada</param>
        /// <returns>lista de Folios Cuantificacion</returns>
        public object getFolioCuantificacion(int avisoEntrada)
        {
            FolioCuantificacion folioCuantificacion = new FolioCuantificacion();
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    folioCuantificacion = (from t in ctx.Sam3_FolioCuantificacion
                                           where t.Activo == true && t.FolioAvisoEntradaID == avisoEntrada
                                           select new FolioCuantificacion
                                           {
                                               FolioCuantificacionID = t.FolioCuantificacionID,
                                               FolioAvisoEntradaID = t.FolioAvisoEntradaID
                                           }).AsParallel().FirstOrDefault();

                    folioCuantificacion.FolioLlegadaHijo = (from t in ctx.Sam3_Bulto
                                                            where t.FolioCuantificacionID == folioCuantificacion.FolioCuantificacionID
                                                            select t.BultoID).AsParallel().FirstOrDefault();
                }
                return folioCuantificacion;


            }
            catch (Exception ex)
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object getProjects(int avisoLlegada)
        {
            List<AvisoLlegada_Proyecto> proyects = new List<AvisoLlegada_Proyecto>();

            try
            {
                using (SamContext ctx = new SamContext())
                {
                    proyects = (from t in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto
                                where t.FolioAvisoLlegadaID == avisoLlegada
                                join p in ctx.Sam3_Proyecto on t.ProyectoID equals p.ProyectoID
                                select new AvisoLlegada_Proyecto
                                {
                                    ProyectoID = p.ProyectoID.ToString(),
                                    Nombre = p.Nombre
                                }).AsParallel().ToList();

                    foreach (var item in proyects)
                    {
                        if (String.IsNullOrEmpty(item.ProyectoID) || item.ProyectoID == "1")
                        {
                            proyects = (from t in ctx.Sam3_Proyecto
                                        where t.Activo == true
                                        select new AvisoLlegada_Proyecto
                                        {
                                            ProyectoID = t.ProyectoID.ToString(),
                                            Nombre = t.Nombre
                                        }).AsParallel().ToList();
                        }
                    }
                }
                return proyects;
            }
            catch (Exception ex)
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        /// <summary>
        /// Actualizar proyecto cuando el folio de av llegada no tiene proyecto seleccionado
        /// </summary>
        /// <param name="avisoLlegada">folio de aviso de llegada</param>
        /// <param name="proyectoID">id del proyecto seleccionado</param>
        /// <param name="usuarioID">usuario </param>
        /// <returns></returns>
        public object updateProjects(int avisoLlegada, int proyectoID, int usuarioID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_Rel_FolioAvisoLlegada_Proyecto avPR = new Sam3_Rel_FolioAvisoLlegada_Proyecto();
                    avPR.FolioAvisoLlegadaID = avisoLlegada;
                    avPR.ProyectoID = proyectoID;
                    avPR.Activo = true;
                    avPR.UsuarioModificacion = usuarioID;
                    avPR.FechaModificacion = DateTime.Now;

                    ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto.Add(avPR);
                    ctx.SaveChanges();

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("Ok");
                    result.ReturnMessage.Add(avPR.Rel_FolioAviso_ProyectoID.ToString());
                    result.ReturnCode = 200;
                    result.ReturnStatus = true;
                    result.IsAuthenicated = true;

                    return result;
                }
            }
            catch (Exception ex)
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }


        /// <summary>
        /// Obtener datos de un folio de aviso de entrada / folio cuantificacion
        /// </summary>
        /// <param name="avisoLlegada"></param>
        /// <param name="folioCuantificacion"></param>
        /// <returns></returns>
        public object getDataFolioCuantificacion(int avisoLlegada, int folioCuantificacion)
        {
            try
            {

            }
            catch (Exception ex)
            {
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