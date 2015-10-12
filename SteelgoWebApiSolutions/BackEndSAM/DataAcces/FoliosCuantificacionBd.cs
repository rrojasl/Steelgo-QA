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

        public object ObtenerProyectoFolioCuantificacion(int folioCuantificacionID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_FolioCuantificacion folio = ctx.Sam3_FolioCuantificacion.Where(x => x.FolioCuantificacionID == folioCuantificacionID)
                        .AsParallel().SingleOrDefault();

                    return folio.ProyectoID;
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
        public object CambiarEstatus(int folioCuantificacionID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_FolioCuantificacion folio = ctx.Sam3_FolioCuantificacion.Where(x => x.FolioCuantificacionID == folioCuantificacionID)
                        .AsParallel().SingleOrDefault();

                    folio.Estatus = "En Proceso de Recepción";
                    folio.FechaModificacion = DateTime.Now;
                    folio.UsuarioModificacion = usuario.UsuarioID;

                    ctx.SaveChanges();

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnCode = 200;
                    result.ReturnStatus = true;
                    result.IsAuthenicated = true;

                    return result;

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
        /// Obtener Folio AViso Llegada (Combo Folio Aviso Entrada)
        /// </summary>
        /// <returns>Lista de Folios de Aviso de llegada</returns>
        public object obtenerFolioLlegada()
        {
            List<ListaCombos> listFE = new List<ListaCombos>();
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    listFE = (from t in ctx.Sam3_FolioAvisoEntrada
                              where t.FolioDescarga > 0 && t.Activo
                              select new ListaCombos
                                {
                                    id = t.FolioAvisoLlegadaID.ToString(),
                                    value = t.FolioAvisoLlegadaID.ToString()
                                }).AsParallel().ToList();
                }
                return listFE;

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
        ///Obtiene la informacion de un aviso de entrada en cuantificacion
        /// </summary>
        /// <param name="folioAvisoLlegadaID">folio aviso de llegada seleccionado</param>
        /// <returns>objeto con la informacion</returns>
        public object obtenerDatosFolioEntrada(int folioAvisoLlegadaID)
        {
            List<Proyecto> proyectos = new List<Proyecto>();
            List<FolioLlegada1> cuantificacion = new List<FolioLlegada1>();

            try
            {
                using (SamContext ctx = new SamContext())
                {
                    proyectos = (from t in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto
                                 join p in ctx.Sam3_Proyecto on t.ProyectoID equals p.ProyectoID
                                 join e in ctx.Sam3_FolioAvisoEntrada on t.FolioAvisoLlegadaID equals e.FolioAvisoLlegadaID
                                 where t.FolioAvisoLlegadaID == folioAvisoLlegadaID && t.Activo && p.Activo && e.Activo
                                 select new Proyecto
                                 {
                                     ProyectoID = p.ProyectoID.ToString(),
                                     Nombre = p.Nombre
                                 }).AsParallel().ToList();

                    cuantificacion = (from t in ctx.Sam3_FolioCuantificacion
                                      join avll in ctx.Sam3_FolioAvisoEntrada on t.FolioAvisoEntradaID equals avll.FolioAvisoEntradaID
                                      where t.Activo && avll.FolioAvisoLlegadaID == folioAvisoLlegadaID && avll.Activo
                                      select new FolioLlegada1
                                           {
                                               FolioCuantificacionID = t.FolioCuantificacionID,
                                               FolioAvisoEntradaID = t.FolioCuantificacionID
                                           }).AsParallel().ToList();



                    InfoFolioAvisoEntrada info = new InfoFolioAvisoEntrada();
                    info.Proyecto = proyectos;
                    info.FolioLlegada = cuantificacion;

                    return info;
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
        /// Actualizar proyecto cuando el folio de av llegada no tiene proyecto seleccionado
        /// </summary>
        /// <param name="avisoLlegada">folio de aviso de llegada</param>
        /// <param name="proyectoID">id del proyecto seleccionado</param>
        /// <param name="usuarioID">usuario </param>
        /// <returns></returns>
        public object actualizarProyectos(int avisoLlegada, int proyectoID, int usuarioID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    // ¿Comó sabes que el proyecto no existe?

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
        /// Obtener datos de un folio de aviso de entrada / folio cuantificacion
        /// </summary>
        /// <param name="folioAvisoLlegadaID">Folio aviso de llegada seleccionado</param>
        /// <param name="folioCuantificacion"></param>
        /// <returns></returns>
        public object obtenerDatosFolioCuantificacion(int folioAvisoLlegadaID, int folioCuantificacion, string detalleBulto)
        {
            try
            {
                InfoFolioCuantificacion info = new InfoFolioCuantificacion();

                using (SamContext ctx = new SamContext())
                {
                    info = (from t in ctx.Sam3_FolioCuantificacion
                            join avll in ctx.Sam3_FolioAvisoEntrada on t.FolioAvisoEntradaID equals avll.FolioAvisoEntradaID
                            join tu in ctx.Sam3_TipoUso on t.TipoUsoID equals tu.TipoUsoID
                            join Bul in ctx.Sam3_Bulto on t.FolioCuantificacionID equals Bul.FolioCuantificacionID into b1
                            from subBul in b1.DefaultIfEmpty()
                            where t.FolioCuantificacionID == folioCuantificacion
                            && avll.FolioAvisoLlegadaID == folioAvisoLlegadaID
                            && t.Activo && avll.Activo && tu.Activo
                            select new InfoFolioCuantificacion
                            {
                                ProyectoID = t.ProyectoID,
                                PackingList = t.PackingList,

                                TipoUso = new TipoUso()
                                {
                                    id = t.TipoUsoID.ToString(),
                                    Nombre = tu.Nombre
                                },

                                TipoPackingList = new TipoPackingList()
                                {
                                    id = t.TipoMaterialID.ToString()
                                },

                                Estatus = detalleBulto == "-1" ? t.Estatus : subBul.Estatus,

                                FolioLlegadaHijo = 0

                            }).AsParallel().FirstOrDefault();
                }

                return info;
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

        public object EliminarFolioCuantificacion(string folioCuantificacion, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    int folioCuant = Convert.ToInt32(folioCuantificacion);

                    //Obtengo los IDS que tengan el folio Cuantificacion a eliminar
                    List<int> idBulto = ctx.Sam3_Bulto
                        .Where(x => x.FolioCuantificacionID == folioCuant && x.Activo)
                        .Select(b => b.BultoID).AsParallel().ToList();

                    List<int> idItemCodeBulto = null;

                    //Obtengo los item codes que tienen los bultos
                    foreach (int bulto in idBulto)
                    {
                        idItemCodeBulto.AddRange(ctx.Sam3_Rel_Bulto_ItemCode
                        .Where(x => x.BultoID == bulto && x.Activo)
                        .Select(b => b.ItemCodeID).AsParallel().ToList());
                    }

                    List<int> idItemCode = ctx.Sam3_Rel_FolioCuantificacion_ItemCode
                        .Where(x => x.FolioCuantificacionID == folioCuant)
                        .Select(i => i.ItemCodeID).AsParallel().ToList();

                    List<bool> tieneNU = null;

                    //Verifico si tiene numeros unicos
                    foreach (int bu in idBulto)
                    {
                        tieneNU.AddRange(from bulto in ctx.Sam3_Rel_Bulto_ItemCode
                                         where bulto.BultoID == bu && bulto.Activo
                                         select bulto.TieneNumerosUnicos);
                    }

                    foreach (int ic in idItemCode)
                    {
                        tieneNU.AddRange(from rfc in ctx.Sam3_Rel_FolioCuantificacion_ItemCode
                                         where rfc.Activo && rfc.FolioCuantificacionID == folioCuant
                                         select rfc.TieneNumerosUnicos);
                    }

                    //Si no tiene numeros unicos se elimina
                    if (!tieneNU.Contains(true))
                    {
                        foreach (int id in idBulto)
                        {
                            Sam3_Bulto bulto = ctx.Sam3_Bulto
                                .Where(x => x.BultoID == id && x.Activo).AsParallel().SingleOrDefault();
                            bulto.Activo = false;
                            bulto.UsuarioModificacion = usuario.UsuarioID;
                            bulto.FechaModificacion = DateTime.Now;
                            ctx.SaveChanges();

                            foreach (int icid in idItemCodeBulto)
                            {
                                Sam3_Rel_Bulto_ItemCode relBulto = ctx.Sam3_Rel_Bulto_ItemCode
                               .Where(x => x.BultoID == id && x.ItemCodeID == icid && x.Activo).AsParallel().SingleOrDefault();
                                relBulto.Activo = false;
                                relBulto.UsuarioModificacion = usuario.UsuarioID;
                                relBulto.FechaModificacion = DateTime.Now;
                            }
                            ctx.SaveChanges();
                        }

                        foreach (int id in idItemCode)
                        {
                            //
                            Sam3_Rel_FolioCuantificacion_ItemCode folio = ctx.Sam3_Rel_FolioCuantificacion_ItemCode
                                .Where(x => x.ItemCodeID == id && x.FolioCuantificacionID == folioCuant && x.Activo).AsParallel().SingleOrDefault();
                            folio.Activo = false;
                            folio.UsuarioModificacion = usuario.UsuarioID;
                            folio.FechaModificacion = DateTime.Now;

                            Sam3_Rel_ItemCode_ItemCodeSteelgo rics = ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                               .Where(x => x.ItemCodeID == id).AsParallel().SingleOrDefault();

                            rics.Activo = false;
                            rics.UsuarioModificacion = usuario.UsuarioID;
                            rics.FechaModificacion = DateTime.Now;

                            ctx.SaveChanges();
                        }

                        foreach (int item in idItemCodeBulto)
                        {
                            Sam3_Rel_ItemCode_ItemCodeSteelgo rics = ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                .Where(x => x.ItemCodeID == item).AsParallel().SingleOrDefault();

                            rics.Activo = false;
                            rics.UsuarioModificacion = usuario.UsuarioID;
                            rics.FechaModificacion = DateTime.Now;
                        }

                        Sam3_FolioCuantificacion folioEliminar = ctx.Sam3_FolioCuantificacion
                            .Where(x => x.FolioCuantificacionID == folioCuant && x.Activo).AsParallel().SingleOrDefault();
                        folioEliminar.Activo = false;
                        folioEliminar.UsuarioModificacion = usuario.UsuarioID;
                        folioEliminar.FechaModificacion = DateTime.Now;
                        ctx.SaveChanges();
                    }


                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("OK");
                    result.ReturnCode = 200;
                    result.ReturnStatus = true;
                    result.IsAuthenicated = true;

                    return result;
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

        public object ListadoFoliosCuantificacionProProyecto(int proyectoID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<ListaCombos> listado = ctx.Sam3_FolioCuantificacion.Where(x => x.ProyectoID == proyectoID)
                        .Select(x => new ListaCombos
                                        {
                                            id = x.FolioCuantificacionID.ToString(),
                                            value = x.FolioCuantificacionID.ToString()
                                        })
                        .AsParallel().Distinct().ToList();

                    return listado.OrderBy(x => x.value).ToList();
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

        public object CambiarEstatus(int folio, string estatus, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_FolioCuantificacion folioCuantificacion = ctx.Sam3_FolioCuantificacion.Where(x => x.FolioCuantificacionID == folio).SingleOrDefault();
                    folioCuantificacion.Estatus = estatus;
                    folioCuantificacion.FechaModificacion = DateTime.Now;
                    folioCuantificacion.UsuarioModificacion = usuario.UsuarioID;

                    ctx.SaveChanges();

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("OK");
                    result.ReturnCode = 200;
                    result.ReturnStatus = true;
                    result.IsAuthenicated = true;

                    return result;
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

        public List<ListadoIncidencias> ListadoIncidencias(int clienteID, int proyectoID, List<int> proyectos, List<int> patios,
            List<int> foliosCuantificacionIDs, DateTime fechaInicial, DateTime fechaFinal)
        {
            try
            {
                List<ListadoIncidencias> listado;
                using (SamContext ctx = new SamContext())
                {

                }
                return null;
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                return null;
            }
        }

    }
}