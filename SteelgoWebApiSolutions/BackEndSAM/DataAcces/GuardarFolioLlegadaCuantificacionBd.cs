using BackEndSAM.Models;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;

namespace BackEndSAM.DataAcces
{
    public class GuardarFolioLlegadaCuantificacionBd
    {
        private static readonly object _mutex = new object();
        private static GuardarFolioLlegadaCuantificacionBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private GuardarFolioLlegadaCuantificacionBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static GuardarFolioLlegadaCuantificacionBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new GuardarFolioLlegadaCuantificacionBd();
                    }
                }
                return _instance;
            }
        }

        /// <summary>
        /// Actualizar un folio cuantificacion existente
        /// </summary>
        /// <param name="datosCuantificacion">informacion del folio cuantificacion</param>
        /// <param name="usuario">usuario actual</param>
        /// <returns>folio de cuantificacion creado, proyectos</returns>
        public object UpdateGuardarFolio(DatosFolioLlegadaCuantificacion datosCuantificacion, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    using (var ctx_tran = ctx.Database.BeginTransaction())
                    {
                        int avisoEntradaID = ctx.Sam3_FolioAvisoEntrada.Where(x => x.FolioAvisoLlegadaID == datosCuantificacion.FolioAvisollegadaId && x.Activo).Select(x => x.FolioAvisoEntradaID).AsParallel().First();

                        Sam3_FolioCuantificacion folioCuantificacion = ctx.Sam3_FolioCuantificacion
                            .Where(x => x.FolioCuantificacionID == datosCuantificacion.FolioCuantificacionID && x.Activo).AsParallel().SingleOrDefault();

                        if (folioCuantificacion.Estatus != "Terminado" && folioCuantificacion.Estatus != "Cerrado")
                        {
                            folioCuantificacion.Estatus = "En Proceso de Recepción";
                        }

                        folioCuantificacion.FolioAvisoEntradaID = avisoEntradaID;
                        folioCuantificacion.ProyectoID = datosCuantificacion.ProyectoID;
                        folioCuantificacion.PackingList = datosCuantificacion.PackingList;
                        folioCuantificacion.TipoUsoID = datosCuantificacion.TipoUso;
                        folioCuantificacion.FechaModificacion = DateTime.Now;
                        folioCuantificacion.UsuarioModificacion = usuario.UsuarioID;
                        folioCuantificacion.Activo = true;
                        if (datosCuantificacion.TipoPackingList != null)
                        {
                            folioCuantificacion.TipoMaterialID = datosCuantificacion.TipoPackingList;
                        }
                        ctx.SaveChanges();

                        #region Proyectos

                        int cuentaProyectos = (from rel in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto
                                               join fe in ctx.Sam3_FolioAvisoEntrada on rel.FolioAvisoLlegadaID equals fe.FolioAvisoLlegadaID
                                               join fc in ctx.Sam3_FolioCuantificacion on fe.FolioAvisoEntradaID equals fc.FolioAvisoEntradaID
                                               join p in ctx.Sam3_Proyecto on rel.ProyectoID equals p.ProyectoID
                                               where fc.FolioCuantificacionID == folioCuantificacion.FolioCuantificacionID
                                               select rel.ProyectoID).Count();

                        int folioAvisoLlegada = (from rel in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto
                                                 join fe in ctx.Sam3_FolioAvisoEntrada on rel.FolioAvisoLlegadaID equals fe.FolioAvisoLlegadaID
                                                 join fc in ctx.Sam3_FolioCuantificacion on fe.FolioAvisoEntradaID equals fc.FolioAvisoEntradaID
                                                 join p in ctx.Sam3_Proyecto on rel.ProyectoID equals p.ProyectoID
                                                 where fc.FolioCuantificacionID == folioCuantificacion.FolioCuantificacionID
                                                 select fe.FolioAvisoLlegadaID.Value).AsParallel().Distinct().SingleOrDefault();

                        if (cuentaProyectos == 1)
                        {
                            bool esDefault = (from rel in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto
                                              join fe in ctx.Sam3_FolioAvisoEntrada on rel.FolioAvisoLlegadaID equals fe.FolioAvisoLlegadaID
                                              join fc in ctx.Sam3_FolioCuantificacion on fe.FolioAvisoEntradaID equals fc.FolioAvisoEntradaID
                                              join p in ctx.Sam3_Proyecto on rel.ProyectoID equals p.ProyectoID
                                              where fc.FolioCuantificacionID == folioCuantificacion.FolioCuantificacionID
                                              && (p.Nombre == "Proyecto Default" || p.Nombre == "")
                                              select rel).Count() == 1 ? true : false;


                            if (esDefault)
                            {
                                Sam3_Rel_FolioAvisoLlegada_Proyecto nuevaRel = new Sam3_Rel_FolioAvisoLlegada_Proyecto();
                                nuevaRel.Activo = true;
                                nuevaRel.FechaModificacion = DateTime.Now;
                                nuevaRel.FolioAvisoLlegadaID = folioAvisoLlegada;
                                nuevaRel.ProyectoID = folioCuantificacion.ProyectoID;
                                nuevaRel.UsuarioModificacion = usuario.UsuarioID;

                                ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto.Add(nuevaRel);
                                ctx.SaveChanges();
                            }
                            else
                            {
                                if (!ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto.Where(x => x.FolioAvisoLlegadaID == folioAvisoLlegada
                                    && x.ProyectoID == folioCuantificacion.ProyectoID).Any())
                                {
                                    Sam3_Rel_FolioAvisoLlegada_Proyecto nuevaRel = new Sam3_Rel_FolioAvisoLlegada_Proyecto();
                                    nuevaRel.Activo = true;
                                    nuevaRel.FechaModificacion = DateTime.Now;
                                    nuevaRel.FolioAvisoLlegadaID = folioAvisoLlegada;
                                    nuevaRel.ProyectoID = folioCuantificacion.ProyectoID;
                                    nuevaRel.UsuarioModificacion = usuario.UsuarioID;

                                    ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto.Add(nuevaRel);
                                    ctx.SaveChanges();
                                }
                            }

                        }
                        else
                        {

                            if (!ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto.Where(x => x.FolioAvisoLlegadaID == folioAvisoLlegada
                                    && x.ProyectoID == folioCuantificacion.ProyectoID).Any())
                            {
                                Sam3_Rel_FolioAvisoLlegada_Proyecto nuevaRel = new Sam3_Rel_FolioAvisoLlegada_Proyecto();
                                nuevaRel.Activo = true;
                                nuevaRel.FechaModificacion = DateTime.Now;
                                nuevaRel.FolioAvisoLlegadaID = folioAvisoLlegada;
                                nuevaRel.ProyectoID = folioCuantificacion.ProyectoID;
                                nuevaRel.UsuarioModificacion = usuario.UsuarioID;

                                ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto.Add(nuevaRel);
                                ctx.SaveChanges();
                            }
                        }

                        #endregion

                        if (datosCuantificacion.BultoID > 0)
                        {
                            Sam3_Bulto bulto = ctx.Sam3_Bulto.Where(x => x.BultoID == datosCuantificacion.BultoID && x.Activo).AsParallel().SingleOrDefault();
                            if (folioCuantificacion.Estatus != "Terminado" && folioCuantificacion.Estatus != "Cerrado")
                            {
                                bulto.Estatus = "En Proceso de Recepción";
                            }

                            bulto.FolioCuantificacionID = datosCuantificacion.FolioCuantificacionID;
                            bulto.FechaModificacion = DateTime.Now;
                            bulto.UsuarioModificacion = usuario.UsuarioID;
                            bulto.Activo = true;

                            ctx.SaveChanges();
                        }

                        string nombre = (from p in ctx.Sam3_Proyecto
                                         where p.ProyectoID == folioCuantificacion.ProyectoID && p.Activo
                                         select p.Nombre).AsParallel().SingleOrDefault();

                        ctx_tran.Commit();

                        return new FolioLlegadaCuantificacion
                        {
                            FolioCuantificacionID = folioCuantificacion.FolioCuantificacionID,
                            ProyectoID = folioCuantificacion.ProyectoID,
                            Nombre = nombre
                        };
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

        /// <summary>
        /// Guardar un folio Cuantificacion Nuevo
        /// </summary>
        /// <param name="datosCuantificacion">informacion del folio cuantificacion</param>
        /// <param name="usuario">usuario actual</param>
        /// <returns>Folio de cuantificacion creados, proyectos</returns>
        public object CreateGuardarFolio(DatosFolioLlegadaCuantificacion datosCuantificacion, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    using (var ctx_tran = ctx.Database.BeginTransaction())
                    {
                        Boolean activarFolioConfiguracion = !string.IsNullOrEmpty(ConfigurationManager.AppSettings["ActivarFolioConfiguracionCuantificacion"]) ? (ConfigurationManager.AppSettings["ActivarFolioConfiguracionCuantificacion"].Equals("1") ? true : false) : false;
                        int avisoEntradaID = ctx.Sam3_FolioAvisoEntrada
                            .Where(x => x.FolioAvisoLlegadaID == datosCuantificacion.FolioAvisollegadaId && x.Activo).Select(x => x.FolioAvisoEntradaID).AsParallel().First();

                        int? consecutivofc = (from fc in ctx.Sam3_FolioCuantificacion
                                            where fc.Activo
                                            && fc.FolioAvisoEntradaID == avisoEntradaID
                                            select fc.Consecutivo).Max();

                        if (consecutivofc == null)
                        {
                            consecutivofc = 1;
                        }
                        else
                        {
                            consecutivofc += 1;
                        }

                        Sam3_FolioCuantificacion folioCuantificacion = new Sam3_FolioCuantificacion();

                        folioCuantificacion.FolioAvisoEntradaID = avisoEntradaID;
                        folioCuantificacion.ProyectoID = datosCuantificacion.ProyectoID;
                        folioCuantificacion.PackingList = datosCuantificacion.PackingList;
                        folioCuantificacion.TipoUsoID = datosCuantificacion.TipoUso;
                        folioCuantificacion.FechaCreacion = DateTime.Now;
                        folioCuantificacion.Estatus = "En Proceso de Recepción";
                        folioCuantificacion.FechaModificacion = DateTime.Now;
                        folioCuantificacion.UsuarioModificacion = usuario.UsuarioID;
                        folioCuantificacion.Activo = true;
                        if (datosCuantificacion.TipoPackingList != null)
                        {
                            folioCuantificacion.TipoMaterialID = datosCuantificacion.TipoPackingList;
                        }
                        folioCuantificacion.Consecutivo = consecutivofc;

                        ctx.Sam3_FolioCuantificacion.Add(folioCuantificacion);
                        ctx.SaveChanges();

                        #region Proyectos

                        int cuentaProyectos = (from rel in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto
                                               join fe in ctx.Sam3_FolioAvisoEntrada on rel.FolioAvisoLlegadaID equals fe.FolioAvisoLlegadaID
                                               join fc in ctx.Sam3_FolioCuantificacion on fe.FolioAvisoEntradaID equals fc.FolioAvisoEntradaID
                                               join p in ctx.Sam3_Proyecto on rel.ProyectoID equals p.ProyectoID
                                               where fc.FolioCuantificacionID == folioCuantificacion.FolioCuantificacionID
                                               select rel.ProyectoID).Count();

                        int folioAvisoLlegada = (from rel in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto
                                                     join fe in ctx.Sam3_FolioAvisoEntrada on rel.FolioAvisoLlegadaID equals fe.FolioAvisoLlegadaID
                                                     join fc in ctx.Sam3_FolioCuantificacion on fe.FolioAvisoEntradaID equals fc.FolioAvisoEntradaID
                                                     join p in ctx.Sam3_Proyecto on rel.ProyectoID equals p.ProyectoID
                                                     where fc.FolioCuantificacionID == folioCuantificacion.FolioCuantificacionID
                                                     select fe.FolioAvisoLlegadaID.Value).AsParallel().Distinct().SingleOrDefault();

                        if (cuentaProyectos == 1)
                        {
                            bool esDefault = (from rel in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto
                                              join fe in ctx.Sam3_FolioAvisoEntrada on rel.FolioAvisoLlegadaID equals fe.FolioAvisoLlegadaID
                                              join fc in ctx.Sam3_FolioCuantificacion on fe.FolioAvisoEntradaID equals fc.FolioAvisoEntradaID
                                              join p in ctx.Sam3_Proyecto on rel.ProyectoID equals p.ProyectoID
                                              where fc.FolioCuantificacionID == folioCuantificacion.FolioCuantificacionID
                                              && (p.Nombre == "Proyecto Default" || p.Nombre == "")
                                              select rel).Count() == 1 ? true : false;


                            if (esDefault)
                            {
                                Sam3_Rel_FolioAvisoLlegada_Proyecto nuevaRel = new Sam3_Rel_FolioAvisoLlegada_Proyecto();
                                nuevaRel.Activo = true;
                                nuevaRel.FechaModificacion = DateTime.Now;
                                nuevaRel.FolioAvisoLlegadaID = folioAvisoLlegada;
                                nuevaRel.ProyectoID = folioCuantificacion.ProyectoID;
                                nuevaRel.UsuarioModificacion = usuario.UsuarioID;

                                ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto.Add(nuevaRel);
                                ctx.SaveChanges();
                            }
                            else
                            {
                                if (!ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto.Where(x => x.FolioAvisoLlegadaID == folioAvisoLlegada
                                    && x.ProyectoID == folioCuantificacion.ProyectoID).Any())
                                {
                                    Sam3_Rel_FolioAvisoLlegada_Proyecto nuevaRel = new Sam3_Rel_FolioAvisoLlegada_Proyecto();
                                    nuevaRel.Activo = true;
                                    nuevaRel.FechaModificacion = DateTime.Now;
                                    nuevaRel.FolioAvisoLlegadaID = folioAvisoLlegada;
                                    nuevaRel.ProyectoID = folioCuantificacion.ProyectoID;
                                    nuevaRel.UsuarioModificacion = usuario.UsuarioID;

                                    ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto.Add(nuevaRel);
                                    ctx.SaveChanges();
                                }
                            }

                        }
                        else
                        {

                            if (!ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto.Where(x => x.FolioAvisoLlegadaID == folioAvisoLlegada
                                    && x.ProyectoID == folioCuantificacion.ProyectoID).Any())
                            {
                                Sam3_Rel_FolioAvisoLlegada_Proyecto nuevaRel = new Sam3_Rel_FolioAvisoLlegada_Proyecto();
                                nuevaRel.Activo = true;
                                nuevaRel.FechaModificacion = DateTime.Now;
                                nuevaRel.FolioAvisoLlegadaID = folioAvisoLlegada;
                                nuevaRel.ProyectoID = folioCuantificacion.ProyectoID;
                                nuevaRel.UsuarioModificacion = usuario.UsuarioID;

                                ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto.Add(nuevaRel);
                                ctx.SaveChanges();
                            }
                        }

                        #endregion

                        if (datosCuantificacion.BultoID != null && datosCuantificacion.BultoID != 0 && datosCuantificacion.BultoID != -1)
                        {
                            Sam3_Bulto bulto = ctx.Sam3_Bulto.Where(x => x.BultoID == datosCuantificacion.BultoID && x.Activo).AsParallel().SingleOrDefault();
                            bulto.FolioCuantificacionID = datosCuantificacion.FolioCuantificacionID;
                            bulto.Estatus = "En Proceso de Recepción";
                            bulto.FechaModificacion = DateTime.Now;
                            bulto.UsuarioModificacion = usuario.UsuarioID;
                            bulto.Activo = true;

                            ctx.Sam3_Bulto.Add(bulto);
                            ctx.SaveChanges();
                        }

                        string nombre = (from p in ctx.Sam3_Proyecto
                                         where p.ProyectoID == folioCuantificacion.ProyectoID && p.Activo
                                         select p.Nombre).AsParallel().SingleOrDefault();


                        FolioLlegadaCuantificacion folioLlegadaCuantificacion = new FolioLlegadaCuantificacion();
                        folioLlegadaCuantificacion.FolioCuantificacionID = folioCuantificacion.FolioCuantificacionID;
                        folioLlegadaCuantificacion.ProyectoID = folioCuantificacion.ProyectoID;
                        folioLlegadaCuantificacion.Nombre = nombre;

                        folioLlegadaCuantificacion.FolioConfiguracionCuantificacionID = folioCuantificacion.FolioCuantificacionID.ToString();

                        Sam3_Rel_Proyecto_Entidad_Configuracion rel_proyecto_entidad_configuracion = ctx.Sam3_Rel_Proyecto_Entidad_Configuracion.Where(x => x.Activo == 1 && x.Proyecto == folioCuantificacion.ProyectoID).FirstOrDefault();
                        if (activarFolioConfiguracion)
                        {
                            folioLlegadaCuantificacion.FolioConfiguracionCuantificacionID = (rel_proyecto_entidad_configuracion.PreFijoFolioPackingList + ","
                                                                                                                            + rel_proyecto_entidad_configuracion.CantidadCerosFolioPackingList.ToString() + ","
                                                                                                                            + rel_proyecto_entidad_configuracion.ConsecutivoFolioPackingList.ToString() + ","
                                                                                                                            + rel_proyecto_entidad_configuracion.PostFijoFolioPackingList);

                            string[] elemntos = folioLlegadaCuantificacion.FolioConfiguracionCuantificacionID.Split(',').ToArray();
                            int digitos = Convert.ToInt32(elemntos[1]);
                            int consecutivo = Convert.ToInt32(elemntos[2]);
                            string formato = "D" + digitos.ToString();

                            folioLlegadaCuantificacion.FolioConfiguracionCuantificacionID = elemntos[0].Trim() + consecutivo.ToString(formato).Trim() + elemntos[3].Trim();
                        }

                        int consecutivofoliopl = rel_proyecto_entidad_configuracion.ConsecutivoFolioPackingList;
                        Sam3_FolioCuantificacion folioCuantificacionConsecutivo = ctx.Sam3_FolioCuantificacion.Where(x => x.FolioCuantificacionID == folioCuantificacion.FolioCuantificacionID).FirstOrDefault();
                        folioCuantificacionConsecutivo.Consecutivo = consecutivofoliopl;
                        folioCuantificacionConsecutivo.Rel_Proyecto_Entidad_Configuracion_ID = rel_proyecto_entidad_configuracion.Rel_Proyecto_Entidad_Configuracion_ID;
                        ctx.SaveChanges();


                        rel_proyecto_entidad_configuracion.ConsecutivoFolioPackingList = consecutivofoliopl + 1;
                        ctx.SaveChanges();

                        ctx_tran.Commit();
                       
                        return folioLlegadaCuantificacion;
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