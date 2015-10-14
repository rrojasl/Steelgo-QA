using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DatabaseManager.Sam3;
using BackEndSAM.Models;
using SecurityManager.Api.Models;

namespace BackEndSAM.DataAcces
{
    public class IncidenciaBd
    {
         private static readonly object _mutex = new object();
        private static IncidenciaBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private IncidenciaBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static IncidenciaBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new IncidenciaBd();
                    }
                }
                return _instance;
            }
        }

        public object GenerarIncidencia(Incidencia datos, Sam3_Usuario usuario)
        {
            try
            {
                Sam3_Incidencia nuevaIncidencia = new Sam3_Incidencia();
                using (SamContext ctx = new SamContext())
                {
                    using (var ctx_tan = ctx.Database.BeginTransaction())
                    {
                        nuevaIncidencia.Activo = true;
                        nuevaIncidencia.ClasificacionID = datos.ClasificacionID;
                        nuevaIncidencia.Descripcion = datos.Descripcion;
                        nuevaIncidencia.DetalleResolucion = datos.DetalleResolucion;
                        if (datos.FechaRegistro != null)
                        { nuevaIncidencia.FechaCreacion = Convert.ToDateTime(datos.FechaRegistro); }
                        else { nuevaIncidencia.FechaCreacion = DateTime.Now; }

                        nuevaIncidencia.FechaModificacion = DateTime.Now;
                        nuevaIncidencia.MotivoCancelacion = datos.MotivoCancelacion;
                        nuevaIncidencia.NoRFI = null;
                        nuevaIncidencia.Respuesta = datos.Respuesta;
                        nuevaIncidencia.TipoIncidenciaID = datos.TipoIncidenciaID;
                        nuevaIncidencia.Titulo = datos.Titulo;
                        nuevaIncidencia.UsuarioID = datos.RegistradoPor != null && datos.RegistradoPor != "" ? Convert.ToInt32(datos.RegistradoPor) : 1;
                        nuevaIncidencia.Version = 1;
                        nuevaIncidencia.UsuarioModificacion = usuario.UsuarioID;
                        if (datos.FechaRespuesta != null) { nuevaIncidencia.FechaRespuesta = Convert.ToDateTime(datos.FechaRespuesta); }
                        if (datos.FechaResolucion != null) { nuevaIncidencia.FechaSolucion = Convert.ToDateTime(datos.FechaResolucion); }
                        nuevaIncidencia.UsuarioIDRespuesta = datos.RespondidoPor != null && datos.RespondidoPor != "" ? Convert.ToInt32(datos.RespondidoPor) : 1;
                        nuevaIncidencia.UsuarioResuelveID = datos.ResueltoPor != null && datos.ResueltoPor != "" ? Convert.ToInt32(datos.ResueltoPor) : 1;
                        nuevaIncidencia.Estatus = datos.Estatus == null || datos.Estatus == "" ? "Abierta" : datos.Estatus;
                        //nuevaIncidencia.RespondidoPor = datos.RespondidoPor;
                        //nuevaIncidencia.ResueltoPor = datos.ResueltoPor;
                        //nuevaIncidencia.RegistradoPor = datos.RegistradoPor;
                        

                        ctx.Sam3_Incidencia.Add(nuevaIncidencia);

                        ctx.SaveChanges();

                        if (datos.TipoIncidenciaID > 0)
                        {
                            switch (datos.TipoIncidenciaID)
                            {
                                case 1: //Folio Aviso Entrada
                                    Sam3_Rel_Incidencia_FolioAvisoLlegada nuevoRegistro = new Sam3_Rel_Incidencia_FolioAvisoLlegada();
                                    nuevoRegistro.Activo = true;
                                    nuevoRegistro.FechaModificacion = DateTime.Now;
                                    nuevoRegistro.FolioAvisoLlegadaID = datos.ReferenciaID;
                                    nuevoRegistro.IncidenciaID = nuevaIncidencia.IncidenciaID;
                                    nuevoRegistro.UsuarioModificacion = usuario.UsuarioID;

                                    ctx.Sam3_Rel_Incidencia_FolioAvisoLlegada.Add(nuevoRegistro);
                                    ctx.SaveChanges();
                                    break;
                                case 2: // Entrada de Material
                                    Sam3_Rel_Incidencia_FolioAvisoEntrada nuevaRelEntradaMaterial = new Sam3_Rel_Incidencia_FolioAvisoEntrada();
                                    nuevaRelEntradaMaterial.Activo = true;
                                    nuevaRelEntradaMaterial.FechaModificacion = DateTime.Now;
                                    nuevaRelEntradaMaterial.FolioAvisoEntradaID = datos.ReferenciaID;
                                    nuevaRelEntradaMaterial.IncidenciaID = nuevaIncidencia.IncidenciaID;
                                    nuevaRelEntradaMaterial.UsuarioModificacion = usuario.UsuarioID;

                                    ctx.Sam3_Rel_Incidencia_FolioAvisoEntrada.Add(nuevaRelEntradaMaterial);
                                    ctx.SaveChanges();
                                    break;
                                case 3: // Pase Salida. Por el momento sin implementacion
                                    break;
                                case 4: // Packing List
                                    Sam3_Rel_Incidencia_FolioCuantificacion nuevaRelFolioC = new Sam3_Rel_Incidencia_FolioCuantificacion();
                                    nuevaRelFolioC.Activo = true;
                                    nuevaRelFolioC.FechaModificacion = DateTime.Now;
                                    nuevaRelFolioC.FolioCuantificacionID = datos.ReferenciaID;
                                    nuevaRelFolioC.IncidenciaID = nuevaIncidencia.IncidenciaID;
                                    nuevaRelFolioC.UsuarioModificacion = usuario.UsuarioID;

                                    ctx.Sam3_Rel_Incidencia_FolioCuantificacion.Add(nuevaRelFolioC);
                                    ctx.SaveChanges();
                                    break;
                                case 5: // Orden de recepcion
                                    Sam3_Rel_Incidencia_OrdenRecepcion nuevaRelOrdenR = new Sam3_Rel_Incidencia_OrdenRecepcion();
                                    nuevaRelOrdenR.Activo = true;
                                    nuevaRelOrdenR.FechaModificacion = DateTime.Now;
                                    nuevaRelOrdenR.IncidenciaID = nuevaIncidencia.IncidenciaID;
                                    nuevaRelOrdenR.OrdenRecepcionID = datos.ReferenciaID;
                                    nuevaRelOrdenR.UsuarioModificacion = usuario.UsuarioID;

                                    ctx.Sam3_Rel_Incidencia_OrdenRecepcion.Add(nuevaRelOrdenR);
                                    ctx.SaveChanges();
                                    break;
                                case 6: // Complemento de recepcion. Por el momento sin implementacion
                                    break;
                                case 7: // ItemCode
                                    Sam3_Rel_Incidencia_ItemCode nuevaRelItemCode = new Sam3_Rel_Incidencia_ItemCode();
                                    nuevaRelItemCode.Activo = true;
                                    nuevaRelItemCode.FechaModificacion = DateTime.Now;
                                    nuevaRelItemCode.IncidenciaID = nuevaIncidencia.IncidenciaID;
                                    nuevaRelItemCode.ItemCodeID = datos.ReferenciaID;
                                    nuevaRelItemCode.UsuarioModificacion = usuario.UsuarioID;

                                    ctx.Sam3_Rel_Incidencia_ItemCode.Add(nuevaRelItemCode);
                                    ctx.SaveChanges();
                                    break;
                                case 8: // Orden de almacenaje
                                    Sam3_Rel_Incidencia_OrdenAlmacenaje nuevaRelOrdenAlmacenaje = new Sam3_Rel_Incidencia_OrdenAlmacenaje();
                                    nuevaRelOrdenAlmacenaje.Activo = true;
                                    nuevaRelOrdenAlmacenaje.FechaModificacion = DateTime.Now;
                                    nuevaRelOrdenAlmacenaje.IncidenciaID = nuevaIncidencia.IncidenciaID;
                                    nuevaRelOrdenAlmacenaje.OrdenalmacenajeID = datos.ReferenciaID;
                                    nuevaRelOrdenAlmacenaje.UsuarioModificacion = usuario.UsuarioID;

                                    ctx.Sam3_Rel_Incidencia_OrdenAlmacenaje.Add(nuevaRelOrdenAlmacenaje);
                                    ctx.SaveChanges();
                                    break;
                                case 9: // Numero unico
                                    Sam3_Rel_Incidencia_NumeroUnico nuevaRelNumeroUnico = new Sam3_Rel_Incidencia_NumeroUnico();
                                    nuevaRelNumeroUnico.Activo = true;
                                    nuevaRelNumeroUnico.FechaModificacion = DateTime.Now;
                                    nuevaRelNumeroUnico.IncidenciaID = nuevaIncidencia.IncidenciaID;
                                    nuevaRelNumeroUnico.NumeroUnicoID = datos.ReferenciaID;
                                    nuevaRelNumeroUnico.UsuarioModificacion = usuario.UsuarioID;

                                    ctx.Sam3_Rel_Incidencia_NumeroUnico.Add(nuevaRelNumeroUnico);
                                    ctx.SaveChanges();
                                    break;
                                case 10: // Despacho
                                    Sam3_Rel_Incidencia_Despacho nuevaRelDespacho = new Sam3_Rel_Incidencia_Despacho();
                                    nuevaRelDespacho.Activo = true;
                                    nuevaRelDespacho.DespachoID = datos.ReferenciaID;
                                    nuevaRelDespacho.FechaModificacion = DateTime.Now;
                                    nuevaRelDespacho.IncidenciaID = nuevaIncidencia.IncidenciaID;
                                    nuevaRelDespacho.UsuarioModificacion = usuario.UsuarioID;

                                    ctx.Sam3_Rel_Incidencia_Despacho.Add(nuevaRelDespacho);
                                    ctx.SaveChanges();
                                    break;
                                case 11: // Corte
                                    Sam3_Rel_Incidencia_Corte nuevaRelCorte = new Sam3_Rel_Incidencia_Corte();
                                    nuevaRelCorte.Activo = true;
                                    nuevaRelCorte.CorteID = datos.ReferenciaID;
                                    nuevaRelCorte.FechaModificacion = DateTime.Now;
                                    nuevaRelCorte.IncidenciaID = nuevaIncidencia.IncidenciaID;
                                    nuevaRelCorte.UsuarioModificacion = usuario.UsuarioID;

                                    ctx.Sam3_Rel_Incidencia_Corte.Add(nuevaRelCorte);
                                    ctx.SaveChanges();
                                    break;
                                default:
                                    throw new Exception("No se encontro el tipo de incidencia");
                            }
                        }
                        else
                        {
                            throw new Exception("El tipo de incidencia es requerido");
                        }
                        ctx_tan.Commit();
                    }
                }

                datos.Version = nuevaIncidencia.Version.ToString();
                datos.FolioIncidenciaID = nuevaIncidencia.IncidenciaID;

                return datos;
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

        public object ActualizarIncidencia(Incidencia datos, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    using (var ctx_tran = ctx.Database.BeginTransaction())
                    {
                        DateTime fechaRespuesta = new DateTime();
                        DateTime fechaSolucion = new DateTime();
                        DateTime fechaRegistro = new DateTime();

                        if (datos.FechaRespuesta != null) { DateTime.TryParse(datos.FechaRespuesta, out fechaRespuesta); }
                        if (datos.FechaResolucion != null) { DateTime.TryParse(datos.FechaResolucion, out fechaSolucion); }
                        if (datos.FechaRegistro != null) { DateTime.TryParse(datos.FechaRegistro, out fechaRegistro); }

                        Sam3_Incidencia nuevoRegistro = new Sam3_Incidencia();
                        Sam3_Incidencia registro = ctx.Sam3_Incidencia.Where(x => x.IncidenciaID == datos.FolioIncidenciaID).AsParallel().SingleOrDefault();

                        if (datos.Estatus == "Cancelado" || datos.Estatus == "Resuelto")
                        {
                            registro.Activo = true;
                            registro.ClasificacionID = datos.ClasificacionID;
                            registro.Descripcion = datos.Descripcion;
                            registro.DetalleResolucion = datos.DetalleResolucion;
                            registro.Estatus = datos.Estatus;
                            if (fechaRegistro.ToShortTimeString() != "1/1/0001") 
                            { registro.FechaCreacion = fechaRegistro; } else { registro.FechaCreacion = DateTime.Now; }

                            registro.FechaModificacion = DateTime.Now;
                            if (fechaRespuesta.ToShortDateString() != "1/1/0001") { registro.FechaRespuesta = fechaRespuesta; }
                            if (fechaSolucion.ToShortDateString() != "1/1/0001") { registro.FechaSolucion = fechaSolucion; }
                            registro.IncidenciaOriginalID = registro.IncidenciaID;
                            registro.MotivoCancelacion = datos.MotivoCancelacion;
                            registro.NoRFI = null;
                            registro.Respuesta = datos.Respuesta;
                            registro.TipoIncidenciaID = datos.TipoIncidenciaID;
                            registro.Titulo = datos.Titulo;
                            registro.UsuarioID = datos.RegistradoPor != "" ? Convert.ToInt32(datos.RegistradoPor) : 1;
                            registro.UsuarioIDRespuesta = datos.RespondidoPor != "" ? Convert.ToInt32(datos.RespondidoPor) : 1;
                            registro.UsuarioModificacion = usuario.UsuarioID;
                            registro.UsuarioResuelveID = datos.ResueltoPor != "" ? Convert.ToInt32(datos.ResueltoPor) : 1;

                            ctx.SaveChanges();

                        }
                        else
                        {
                            registro.Activo = false;
                            registro.FechaModificacion = DateTime.Now;
                            registro.UsuarioModificacion = usuario.UsuarioID;
                            

                            nuevoRegistro.Activo = true;
                            nuevoRegistro.ClasificacionID = datos.ClasificacionID;
                            nuevoRegistro.Descripcion = datos.Descripcion;
                            nuevoRegistro.DetalleResolucion = datos.DetalleResolucion;
                            nuevoRegistro.Estatus = datos.Estatus;
                            nuevoRegistro.FechaCreacion = fechaRegistro;
                            nuevoRegistro.FechaModificacion = DateTime.Now;
                            nuevoRegistro.FechaRespuesta = fechaRespuesta;
                            nuevoRegistro.FechaSolucion = fechaSolucion;
                            nuevoRegistro.IncidenciaOriginalID = registro.IncidenciaID;
                            nuevoRegistro.MotivoCancelacion = datos.MotivoCancelacion;
                            nuevoRegistro.NoRFI = null;
                            nuevoRegistro.Respuesta = datos.Respuesta;
                            nuevoRegistro.TipoIncidenciaID = datos.TipoIncidenciaID;
                            nuevoRegistro.Titulo = datos.Titulo;
                            nuevoRegistro.UsuarioID = datos.RegistradoPor != "" ? Convert.ToInt32(datos.RegistradoPor) : 1;
                            nuevoRegistro.UsuarioIDRespuesta = datos.RespondidoPor != "" ? Convert.ToInt32(datos.RespondidoPor) : 1;
                            nuevoRegistro.UsuarioModificacion = usuario.UsuarioID;
                            nuevoRegistro.UsuarioResuelveID = datos.ResueltoPor != "" ? Convert.ToInt32(datos.ResueltoPor) : 1;
                            nuevoRegistro.Version = registro.Version + 1;

                            ctx.Sam3_Incidencia.Add(nuevoRegistro);
                            ctx.SaveChanges();

                            switch (datos.TipoIncidenciaID)
                            {
                                case 1: //Folio Aviso Entrada

                                    Sam3_Rel_Incidencia_FolioAvisoLlegada relFolioLlegqada = ctx.Sam3_Rel_Incidencia_FolioAvisoLlegada
                                        .Where(x => x.Activo && x.IncidenciaID == registro.IncidenciaID).AsParallel().SingleOrDefault();
                                    relFolioLlegqada.Activo = false;
                                    relFolioLlegqada.FechaModificacion = DateTime.Now;
                                    relFolioLlegqada.UsuarioModificacion = usuario.UsuarioID;

                                    Sam3_Rel_Incidencia_FolioAvisoLlegada nuevaRelFolio = new Sam3_Rel_Incidencia_FolioAvisoLlegada();
                                    nuevaRelFolio.Activo = true;
                                    nuevaRelFolio.FechaModificacion = DateTime.Now;
                                    nuevaRelFolio.FolioAvisoLlegadaID = datos.ReferenciaID;
                                    nuevaRelFolio.IncidenciaID = nuevoRegistro.IncidenciaID;
                                    nuevaRelFolio.UsuarioModificacion = usuario.UsuarioID;

                                    ctx.Sam3_Rel_Incidencia_FolioAvisoLlegada.Add(nuevaRelFolio);
                                    ctx.SaveChanges();

                                    EnviarAvisosBd.Instance.EnviarNotificación(1,
                                        string.Format("Se generó una incidencia para el Folio de Llegada : {0}", datos.ReferenciaID),
                                        usuario);

                                    break;
                                case 2: // Entrada de Material
                                    Sam3_Rel_Incidencia_FolioAvisoEntrada relFolioEntrada = ctx.Sam3_Rel_Incidencia_FolioAvisoEntrada
                                        .Where(x => x.Activo && x.IncidenciaID == registro.IncidenciaID).AsParallel().SingleOrDefault();
                                    relFolioEntrada.Activo = false;
                                    relFolioEntrada.FechaModificacion = DateTime.Now;
                                    relFolioEntrada.UsuarioModificacion = usuario.UsuarioID;

                                    Sam3_Rel_Incidencia_FolioAvisoEntrada nuevaRelFolioEntrada = new Sam3_Rel_Incidencia_FolioAvisoEntrada();
                                    nuevaRelFolioEntrada.Activo = true;
                                    nuevaRelFolioEntrada.FechaModificacion = DateTime.Now;
                                    nuevaRelFolioEntrada.FolioAvisoEntradaID = datos.ReferenciaID;
                                    nuevaRelFolioEntrada.IncidenciaID = nuevoRegistro.IncidenciaID;
                                    nuevaRelFolioEntrada.UsuarioModificacion = usuario.UsuarioID;

                                    ctx.Sam3_Rel_Incidencia_FolioAvisoEntrada.Add(nuevaRelFolioEntrada);

                                    ctx.SaveChanges();

                                    EnviarAvisosBd.Instance.EnviarNotificación(1,
                                        string.Format("Se generó una incidencia para el Folio de Entrada de Material : {0}", datos.ReferenciaID),
                                        usuario);

                                    break;
                                case 3: // Pase Salida. Por el momento sin implementacion
                                    break;
                                case 4: // Packing List
                                    Sam3_Rel_Incidencia_FolioCuantificacion RelFolioC = ctx.Sam3_Rel_Incidencia_FolioCuantificacion
                                        .Where(x => x.Activo && x.IncidenciaID == registro.IncidenciaID).AsParallel().SingleOrDefault();
                                    RelFolioC.Activo = false;
                                    RelFolioC.FechaModificacion = DateTime.Now;
                                    RelFolioC.UsuarioModificacion = usuario.UsuarioID;

                                    Sam3_Rel_Incidencia_FolioCuantificacion nuevaRelFolioC = new Sam3_Rel_Incidencia_FolioCuantificacion();
                                    nuevaRelFolioC.Activo = true;
                                    nuevaRelFolioC.FechaModificacion = DateTime.Now;
                                    nuevaRelFolioC.FolioCuantificacionID = datos.ReferenciaID;
                                    nuevaRelFolioC.IncidenciaID = nuevoRegistro.IncidenciaID;
                                    nuevaRelFolioC.UsuarioModificacion = usuario.UsuarioID;

                                    ctx.Sam3_Rel_Incidencia_FolioCuantificacion.Add(nuevaRelFolioC);

                                    ctx.SaveChanges();

                                    EnviarAvisosBd.Instance.EnviarNotificación(1,
                                        string.Format("Se generó una incidencia para el Packing List: {0}", datos.ReferenciaID),
                                        usuario);
                                    
                                    break;
                                case 5: // Orden de recepcion
                                    Sam3_Rel_Incidencia_OrdenRecepcion relOrdenR = ctx.Sam3_Rel_Incidencia_OrdenRecepcion
                                        .Where(x => x.Activo && x.IncidenciaID == registro.IncidenciaID).AsParallel().SingleOrDefault();
                                    relOrdenR.Activo = false;
                                    relOrdenR.FechaModificacion = DateTime.Now;
                                    relOrdenR.UsuarioModificacion = usuario.UsuarioID;

                                    Sam3_Rel_Incidencia_OrdenRecepcion nuevaRelOrdenR = new Sam3_Rel_Incidencia_OrdenRecepcion();
                                    nuevaRelOrdenR.Activo = true;
                                    nuevaRelOrdenR.FechaModificacion = DateTime.Now;
                                    nuevaRelOrdenR.IncidenciaID = nuevoRegistro.IncidenciaID;
                                    nuevaRelOrdenR.OrdenRecepcionID = datos.ReferenciaID;
                                    nuevaRelOrdenR.UsuarioModificacion = usuario.UsuarioID;

                                    ctx.Sam3_Rel_Incidencia_OrdenRecepcion.Add(nuevaRelOrdenR);

                                    ctx.SaveChanges();

                                    EnviarAvisosBd.Instance.EnviarNotificación(1,
                                        string.Format("Se generó una incidencia para la Orden de Recepción: {0}", datos.ReferenciaID),
                                        usuario);
                                    
                                    break;
                                case 6: // Complemento de recepcion. Por el momento sin implementacion
                                    break;
                                case 7: // ItemCode
                                    Sam3_Rel_Incidencia_ItemCode relItemCode = ctx.Sam3_Rel_Incidencia_ItemCode
                                        .Where(x => x.Activo && x.IncidenciaID == registro.IncidenciaID).AsParallel().AsParallel().SingleOrDefault();
                                    relItemCode.Activo = false;
                                    relItemCode.FechaModificacion = DateTime.Now;
                                    relItemCode.UsuarioModificacion = usuario.UsuarioID;

                                    Sam3_Rel_Incidencia_ItemCode nuevaRelItemCode = new Sam3_Rel_Incidencia_ItemCode();
                                    nuevaRelItemCode.Activo = true;
                                    nuevaRelItemCode.FechaModificacion = DateTime.Now;
                                    nuevaRelItemCode.IncidenciaID = nuevoRegistro.IncidenciaID;
                                    nuevaRelItemCode.ItemCodeID = datos.ReferenciaID;
                                    nuevaRelItemCode.UsuarioModificacion = usuario.UsuarioID;

                                    ctx.Sam3_Rel_Incidencia_ItemCode.Add(nuevaRelItemCode);

                                    ctx.SaveChanges();

                                    EnviarAvisosBd.Instance.EnviarNotificación(1,
                                        string.Format("Se generó una incidencia para el ItemCode: {0}", datos.ReferenciaID),
                                        usuario);
                                    
                                    break;
                                case 8: // Orden de almacenaje
                                    Sam3_Rel_Incidencia_OrdenAlmacenaje relOrdenAlmacenaje = ctx.Sam3_Rel_Incidencia_OrdenAlmacenaje
                                        .Where(x => x.Activo && x.IncidenciaID == registro.IncidenciaID).AsParallel().SingleOrDefault();
                                    relOrdenAlmacenaje.Activo = false;
                                    relOrdenAlmacenaje.FechaModificacion = DateTime.Now;
                                    relOrdenAlmacenaje.UsuarioModificacion = usuario.UsuarioID;

                                    Sam3_Rel_Incidencia_OrdenAlmacenaje nuevaRelOrdenAlmacenaje = new Sam3_Rel_Incidencia_OrdenAlmacenaje();
                                    nuevaRelOrdenAlmacenaje.Activo = true;
                                    nuevaRelOrdenAlmacenaje.FechaModificacion = DateTime.Now;
                                    nuevaRelOrdenAlmacenaje.IncidenciaID = nuevoRegistro.IncidenciaID;
                                    nuevaRelOrdenAlmacenaje.OrdenalmacenajeID = datos.ReferenciaID;
                                    nuevaRelOrdenAlmacenaje.UsuarioModificacion = usuario.UsuarioID;

                                    ctx.Sam3_Rel_Incidencia_OrdenAlmacenaje.Add(nuevaRelOrdenAlmacenaje);

                                    ctx.SaveChanges();

                                    EnviarAvisosBd.Instance.EnviarNotificación(1,
                                        string.Format("Se generó una incidencia para la Orden de Almacenaje: {0}", datos.ReferenciaID),
                                        usuario);
                                    
                                    break;
                                case 9: // Numero unico
                                    Sam3_Rel_Incidencia_NumeroUnico relNumeroUnico = ctx.Sam3_Rel_Incidencia_NumeroUnico
                                        .Where(x => x.Activo && x.IncidenciaID == registro.IncidenciaID).AsParallel().SingleOrDefault();
                                    relNumeroUnico.Activo = false;
                                    relNumeroUnico.FechaModificacion = DateTime.Now;
                                    relNumeroUnico.UsuarioModificacion = usuario.UsuarioID;

                                    Sam3_Rel_Incidencia_NumeroUnico nuevaRelNumeroUnico = new Sam3_Rel_Incidencia_NumeroUnico();
                                    nuevaRelNumeroUnico.Activo = true;
                                    nuevaRelNumeroUnico.FechaModificacion = DateTime.Now;
                                    nuevaRelNumeroUnico.IncidenciaID = nuevoRegistro.IncidenciaID;
                                    nuevaRelNumeroUnico.NumeroUnicoID = datos.ReferenciaID;
                                    nuevaRelNumeroUnico.UsuarioModificacion = usuario.UsuarioID;

                                    ctx.Sam3_Rel_Incidencia_NumeroUnico.Add(nuevaRelNumeroUnico);

                                    ctx.SaveChanges();

                                    EnviarAvisosBd.Instance.EnviarNotificación(1,
                                        string.Format("Se generó una incidencia para el Número Único: {0}", datos.ReferenciaID),
                                        usuario);

                                    break;
                                case 10: // Despacho
                                    Sam3_Rel_Incidencia_Despacho relDespacho = ctx.Sam3_Rel_Incidencia_Despacho
                                        .Where(x => x.Activo && x.IncidenciaID == registro.IncidenciaID).AsParallel().SingleOrDefault();
                                    relDespacho.Activo = false;
                                    relDespacho.FechaModificacion = DateTime.Now;
                                    relDespacho.UsuarioModificacion = usuario.UsuarioID;

                                    Sam3_Rel_Incidencia_Despacho nuevaRelDespacho = new Sam3_Rel_Incidencia_Despacho();
                                    nuevaRelDespacho.Activo = true;
                                    nuevaRelDespacho.DespachoID = datos.ReferenciaID;
                                    nuevaRelDespacho.FechaModificacion = DateTime.Now;
                                    nuevaRelDespacho.IncidenciaID = nuevoRegistro.IncidenciaID;
                                    nuevaRelDespacho.UsuarioModificacion = usuario.UsuarioID;

                                    ctx.Sam3_Rel_Incidencia_Despacho.Add(nuevaRelDespacho);

                                    ctx.SaveChanges();

                                    EnviarAvisosBd.Instance.EnviarNotificación(1,
                                        string.Format("Se generó una incidencia para el Despacho: {0}", datos.ReferenciaID),
                                        usuario);
                                    
                                    break;
                                case 11: // Corte
                                    Sam3_Rel_Incidencia_Corte relCorte = ctx.Sam3_Rel_Incidencia_Corte
                                        .Where(x => x.Activo && x.IncidenciaID == registro.IncidenciaID).AsParallel().SingleOrDefault();
                                    relCorte.Activo = false;
                                    relCorte.FechaModificacion = DateTime.Now;
                                    relCorte.UsuarioModificacion = usuario.UsuarioID;

                                    Sam3_Rel_Incidencia_Corte nuevaRelCorte = new Sam3_Rel_Incidencia_Corte();
                                    nuevaRelCorte.Activo = true;
                                    nuevaRelCorte.CorteID = datos.ReferenciaID;
                                    nuevaRelCorte.FechaModificacion = DateTime.Now;
                                    nuevaRelCorte.IncidenciaID = nuevoRegistro.IncidenciaID;
                                    nuevaRelCorte.UsuarioModificacion = usuario.UsuarioID;

                                    ctx.Sam3_Rel_Incidencia_Corte.Add(nuevaRelCorte);

                                    ctx.SaveChanges();

                                    EnviarAvisosBd.Instance.EnviarNotificación(1,
                                        string.Format("Se generó una incidencia para el Corte: {0}", datos.ReferenciaID),
                                        usuario);
                                    
                                    break;
                                default:
                                    throw new Exception("No se encontro el tipo de incidencia");
                            }
                        }

                        foreach (Sam3_Rel_Incidencia_Documento doc in registro.Sam3_Rel_Incidencia_Documento)
                        {
                            if(doc.Activo)
                            {
                                Sam3_Rel_Incidencia_Documento nuevaRelDocumento = new Sam3_Rel_Incidencia_Documento();
                                nuevaRelDocumento.Activo = true;
                                nuevaRelDocumento.ContentType = doc.ContentType;
                                nuevaRelDocumento.Descripcion = doc.Descripcion;
                                nuevaRelDocumento.DocGuid = doc.DocGuid;
                                nuevaRelDocumento.DocumentoID = doc.DocumentoID;
                                nuevaRelDocumento.Extencion = doc.Extencion;
                                nuevaRelDocumento.FechaModificacion = DateTime.Now;
                                nuevaRelDocumento.IncidenciaID = nuevoRegistro.IncidenciaID;
                                nuevaRelDocumento.Nombre = doc.Nombre;
                                nuevaRelDocumento.TipoArchivoID = 0;
                                nuevaRelDocumento.Url = doc.Url;
                                nuevaRelDocumento.UsuarioModificacion = usuario.UsuarioID;

                                ctx.Sam3_Rel_Incidencia_Documento.Add(nuevaRelDocumento);
                            }
                        }

                        ctx.SaveChanges();


                        ctx_tran.Commit();

                        TransactionalInformation result = new TransactionalInformation();
                        result.ReturnMessage.Add(nuevoRegistro.IncidenciaID.ToString());
                        result.ReturnCode = 200;
                        result.ReturnStatus = true;
                        result.IsAuthenicated = true;

                        return result;
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

        public object EliminarIncidencia(int incidenciaID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    using (var ctx_tran = ctx.Database.BeginTransaction())
                    {
                        Sam3_Incidencia incidencia = ctx.Sam3_Incidencia.Where(x => x.IncidenciaID == incidenciaID).AsParallel().SingleOrDefault();
                        incidencia.Activo = false;
                        incidencia.FechaModificacion = DateTime.Now;
                        incidencia.UsuarioModificacion = usuario.UsuarioID;


                        switch (incidencia.TipoIncidenciaID)
                        {
                            case 1: //Folio Aviso Entrada
                                List<Sam3_Rel_Incidencia_FolioAvisoLlegada> incidenciasFolioLlegada =
                                    (from rif in ctx.Sam3_Rel_Incidencia_FolioAvisoLlegada
                                     where rif.Activo && rif.IncidenciaID == incidencia.IncidenciaID
                                     select rif).Distinct().AsParallel().ToList();

                                foreach (Sam3_Rel_Incidencia_FolioAvisoLlegada inc in incidenciasFolioLlegada)
                                {
                                    inc.Activo = false;
                                    inc.FechaModificacion = DateTime.Now;
                                    inc.UsuarioModificacion = usuario.UsuarioID;
                                }

                                break;
                            case 2: // Entrada de Material
                                List<Sam3_Rel_Incidencia_FolioAvisoEntrada> incidenciasEntradaMaterial =
                                    (from rie in ctx.Sam3_Rel_Incidencia_FolioAvisoEntrada
                                     where rie.Activo && rie.IncidenciaID == incidencia.IncidenciaID
                                     select rie).Distinct().AsParallel().ToList();

                                foreach (Sam3_Rel_Incidencia_FolioAvisoEntrada inc in incidenciasEntradaMaterial)
                                {
                                    inc.Activo = false;
                                    inc.FechaModificacion = DateTime.Now;
                                    inc.UsuarioModificacion = usuario.UsuarioID;
                                }

                                break;
                            case 3: // Pase Salida. Por el momento sin implementacion
                                break;
                            case 4: // Packing List
                                List<Sam3_Rel_Incidencia_FolioCuantificacion> incidenciasRelFolioC =
                                    (from rifc in ctx.Sam3_Rel_Incidencia_FolioCuantificacion
                                     where rifc.Activo && rifc.IncidenciaID == incidencia.IncidenciaID
                                     select rifc).Distinct().AsParallel().ToList();

                                foreach (Sam3_Rel_Incidencia_FolioCuantificacion inc in incidenciasRelFolioC)
                                {
                                    inc.Activo = false;
                                    inc.FechaModificacion = DateTime.Now;
                                    inc.UsuarioModificacion = usuario.UsuarioID;
                                }

                                break;
                            case 5: // Orden de recepcion
                                List<Sam3_Rel_Incidencia_OrdenRecepcion> incidenciasOrdenR =
                                    (from rior in ctx.Sam3_Rel_Incidencia_OrdenRecepcion
                                     where rior.Activo && rior.IncidenciaID == incidencia.IncidenciaID
                                     select rior).Distinct().AsParallel().ToList();

                                foreach(Sam3_Rel_Incidencia_OrdenRecepcion inc in incidenciasOrdenR)
                                {
                                    inc.Activo = false;
                                    inc.FechaModificacion = DateTime.Now;
                                    inc.UsuarioModificacion = usuario.UsuarioID;
                                }

                                break;
                            case 6: // Complemento de recepcion. Por el momento sin implementacion
                                break;
                            case 7: // ItemCode
                                List<Sam3_Rel_Incidencia_ItemCode> incidenciasItemCode =
                                    (from riit in ctx.Sam3_Rel_Incidencia_ItemCode
                                     where riit.Activo && riit.IncidenciaID == incidencia.IncidenciaID
                                     select riit).Distinct().AsParallel().ToList();

                                foreach (Sam3_Rel_Incidencia_ItemCode inc in incidenciasItemCode)
                                {
                                    inc.Activo = false;
                                    inc.FechaModificacion = DateTime.Now;
                                    inc.UsuarioModificacion = usuario.UsuarioID;
                                }

                                break;
                            case 8: // Orden de almacenaje
                                List<Sam3_Rel_Incidencia_OrdenAlmacenaje> incidenciasOrdenAlmacenaje =
                                    (from rioa in ctx.Sam3_Rel_Incidencia_OrdenAlmacenaje
                                     where rioa.Activo && rioa.IncidenciaID == incidencia.IncidenciaID
                                     select rioa).Distinct().AsParallel().ToList();

                                foreach (Sam3_Rel_Incidencia_OrdenAlmacenaje inc in incidenciasOrdenAlmacenaje)
                                {
                                    inc.Activo = false;
                                    inc.FechaModificacion = DateTime.Now;
                                    inc.UsuarioModificacion = usuario.UsuarioID;
                                }

                                break;
                            case 9: // Numero unico
                                List<Sam3_Rel_Incidencia_NumeroUnico> incidenciasNumeroUnico =
                                    (from rin in ctx.Sam3_Rel_Incidencia_NumeroUnico
                                     where rin.Activo && rin.IncidenciaID == incidencia.IncidenciaID
                                     select rin).Distinct().AsParallel().ToList();

                                foreach (Sam3_Rel_Incidencia_NumeroUnico inc in incidenciasNumeroUnico)
                                {
                                    inc.Activo = false;
                                    inc.FechaModificacion = DateTime.Now;
                                    inc.UsuarioModificacion = usuario.UsuarioID;
                                }

                                break;
                            case 10: // Despacho
                                List<Sam3_Rel_Incidencia_Despacho> incidenciasDespacho =
                                    (from rid in ctx.Sam3_Rel_Incidencia_Despacho
                                     where rid.Activo && rid.IncidenciaID == incidencia.IncidenciaID
                                     select rid).Distinct().AsParallel().ToList();

                                foreach (Sam3_Rel_Incidencia_Despacho inc in incidenciasDespacho)
                                {
                                    inc.Activo = false;
                                    inc.FechaModificacion = DateTime.Now;
                                    inc.UsuarioModificacion = usuario.UsuarioID;
                                }

                                break;
                            case 11: // Corte
                                List<Sam3_Rel_Incidencia_Corte> incidenciasCorte =
                                    (from ric in ctx.Sam3_Rel_Incidencia_Corte
                                     where ric.Activo && ric.IncidenciaID == incidencia.IncidenciaID
                                     select ric).Distinct().AsParallel().ToList();

                                foreach (Sam3_Rel_Incidencia_Corte inc in incidenciasCorte)
                                {
                                    inc.Activo = false;
                                    inc.FechaModificacion = DateTime.Now;
                                    inc.UsuarioModificacion = usuario.UsuarioID;
                                }
                                break;
                            default:
                                throw new Exception("No se encontro el tipo de incidencia");
                        }

                        ctx.SaveChanges();
                        ctx_tran.Commit();

                        TransactionalInformation result = new TransactionalInformation();
                        result.ReturnMessage.Add("Ok");
                        result.ReturnCode = 200;
                        result.ReturnStatus = true;
                        result.IsAuthenicated = true;

                        return result;
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

        public object DetalleIncidencia(int incidenciaID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Incidencia detalle = (from inc in ctx.Sam3_Incidencia
                                          where inc.Activo && inc.IncidenciaID == incidenciaID
                                          select new Incidencia
                                          {
                                              Archivos = (from rid in ctx.Sam3_Rel_Incidencia_Documento
                                                          where rid.Activo && rid.IncidenciaID == inc.IncidenciaID
                                                          select new ListaDocumentos
                                                          {
                                                              Descripcion = rid.Descripcion,
                                                              DocumentoID = rid.DocGuid.ToString(),
                                                              Extencion = rid.Extencion,
                                                              Nombre = rid.Nombre,
                                                              TipoArchivo = rid.TipoArchivoID.ToString(),
                                                              Url = rid.Url
                                                          }).ToList(),
                                              ClasificacionID = inc.ClasificacionID,
                                              Descripcion = inc.Descripcion,
                                              DetalleResolucion = inc.DetalleResolucion,
                                              Estatus = inc.Estatus,
                                              FechaRegistro = inc.FechaCreacion.ToString(),
                                              FechaResolucion = inc.FechaSolucion.ToString(),
                                              FechaRespuesta = inc.FechaRespuesta.ToString(),
                                              FolioIncidenciaID = inc.IncidenciaID,
                                              MotivoCancelacion = inc.MotivoCancelacion,
                                              RegistradoPor = inc.UsuarioID.ToString(),
                                              RespondidoPor = inc.UsuarioIDRespuesta.ToString(),
                                              Respuesta = inc.Respuesta,
                                              ResueltoPor = inc.UsuarioIDRespuesta.ToString(),
                                              TipoIncidenciaID = inc.TipoIncidenciaID,
                                              Titulo = inc.Titulo,
                                              Version = inc.Version.ToString()
                                          }).AsParallel().SingleOrDefault();

                    switch (detalle.TipoIncidenciaID)
                    {
                        case 1: //Folio Aviso Entrada
                            detalle.ReferenciaID = (from r in ctx.Sam3_Rel_Incidencia_FolioAvisoLlegada
                                                    where r.Activo && r.IncidenciaID == detalle.FolioIncidenciaID
                                                    select r.FolioAvisoLlegadaID).AsParallel().SingleOrDefault();
                            break;
                        case 2: // Entrada de Material
                            detalle.ReferenciaID = (from r in ctx.Sam3_Rel_Incidencia_FolioAvisoEntrada
                                                    where r.Activo && r.IncidenciaID == detalle.FolioIncidenciaID
                                                    select r.FolioAvisoEntradaID).AsParallel().SingleOrDefault();
                            break;
                        case 3: // Pase Salida. Por el momento sin implementacion
                            break;
                        case 4: // Packing List
                            detalle.ReferenciaID = (from r in ctx.Sam3_Rel_Incidencia_FolioCuantificacion
                                                    where r.Activo && r.IncidenciaID == detalle.FolioIncidenciaID
                                                    select r.FolioCuantificacionID).AsParallel().SingleOrDefault();
                            break;
                        case 5: // Orden de recepcion
                            detalle.ReferenciaID = (from r in ctx.Sam3_Rel_Incidencia_OrdenRecepcion
                                                    where r.Activo && r.IncidenciaID == detalle.FolioIncidenciaID
                                                    select r.OrdenRecepcionID).AsParallel().SingleOrDefault();
                            break;
                        case 6: // Complemento de recepcion. Por el momento sin implementacion
                            break;
                        case 7: // ItemCode
                            detalle.ReferenciaID = (from r in ctx.Sam3_Rel_Incidencia_ItemCode
                                                    where r.Activo && r.IncidenciaID == detalle.FolioIncidenciaID
                                                    select r.ItemCodeID).AsParallel().SingleOrDefault();
                            break;
                        case 8: // Orden de almacenaje
                            detalle.ReferenciaID = (from r in ctx.Sam3_Rel_Incidencia_OrdenAlmacenaje
                                                    where r.Activo && r.IncidenciaID == detalle.FolioIncidenciaID
                                                    select r.OrdenalmacenajeID).AsParallel().SingleOrDefault();
                            break;
                        case 9: // Numero unico
                            detalle.ReferenciaID = (from r in ctx.Sam3_Rel_Incidencia_NumeroUnico
                                                    where r.Activo && r.IncidenciaID == detalle.FolioIncidenciaID
                                                    select r.NumeroUnicoID).AsParallel().SingleOrDefault();
                            break;
                        case 10: // Despacho
                            detalle.ReferenciaID = (from r in ctx.Sam3_Rel_Incidencia_Despacho
                                                    where r.Activo && r.IncidenciaID == detalle.FolioIncidenciaID
                                                    select r.DespachoID).AsParallel().SingleOrDefault();
                            break;
                        case 11: // Corte
                            detalle.ReferenciaID = (from r in ctx.Sam3_Rel_Incidencia_Corte
                                                    where r.Activo && r.IncidenciaID == detalle.FolioIncidenciaID
                                                    select r.CorteID).AsParallel().SingleOrDefault();
                            break;
                        default:
                            throw new Exception("No se encontro el tipo de incidencia");
                    }

                    DateTime fechaRegistro = new DateTime();
                    DateTime fechaResuelto = new DateTime();
                    DateTime fechaRespuesta = new DateTime();

                    DateTime.TryParse(detalle.FechaRegistro, out fechaRegistro);
                    detalle.FechaRegistro = fechaRegistro.ToString("yyyy-MM-dd");

                    if (detalle.FechaResolucion != "") 
                    { 
                        DateTime.TryParse(detalle.FechaResolucion, out fechaResuelto);
                        detalle.FechaResolucion = fechaResuelto.ToString("yyyy-MM-dd");
                    }
                    if (detalle.FechaRespuesta != "") 
                    { 
                        DateTime.TryParse(detalle.FechaRespuesta, out fechaRespuesta);
                        detalle.FechaRespuesta = fechaRespuesta.ToString("yyyy-MM-dd");
                    }

                    return detalle;
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

        public object BuscarIncidencia(int tipoIncidenciaID, int referenciaID, Sam3_Usuario usuario)
        {
            try
            {
                Incidencia detalle = new Incidencia();
                int incidenciaID = 0;

                using (SamContext ctx = new SamContext())
                {
                    switch (tipoIncidenciaID)
                    {
                        case 1: //Folio Aviso Entrada
                            incidenciaID = (from rif in ctx.Sam3_Rel_Incidencia_FolioAvisoLlegada
                                            where rif.Activo
                                            && rif.FolioAvisoLlegadaID == referenciaID
                                            select rif.IncidenciaID).AsParallel().SingleOrDefault();

                            detalle = (Incidencia)DetalleIncidencia(incidenciaID, usuario);
                            break;
                        case 2: // Entrada de Material
                            incidenciaID = (from rif in ctx.Sam3_Rel_Incidencia_FolioAvisoEntrada
                                            where rif.Activo
                                            && rif.FolioAvisoEntradaID == referenciaID
                                            select rif.IncidenciaID).AsParallel().SingleOrDefault();

                            detalle = (Incidencia)DetalleIncidencia(incidenciaID, usuario);
                            break;
                        case 3: // Pase Salida. Por el momento sin implementacion
                            break;
                        case 4: // Packing List
                            incidenciaID = (from rif in ctx.Sam3_Rel_Incidencia_FolioCuantificacion
                                            where rif.Activo
                                            && rif.FolioCuantificacionID == referenciaID
                                            select rif.IncidenciaID).AsParallel().SingleOrDefault();

                            detalle = (Incidencia)DetalleIncidencia(incidenciaID, usuario); 
                            break;
                        case 5: // Orden de recepcion
                            incidenciaID = (from rio in ctx.Sam3_Rel_Incidencia_OrdenRecepcion
                                            where rio.Activo
                                            && rio.OrdenRecepcionID == referenciaID
                                            select rio.IncidenciaID).AsParallel().SingleOrDefault();

                            detalle = (Incidencia)DetalleIncidencia(incidenciaID, usuario);
                            break;
                        case 6: // Complemento de recepcion. Por el momento sin implementacion
                            break;
                        case 7: // ItemCode
                            incidenciaID = (from riit in ctx.Sam3_Rel_Incidencia_ItemCode
                                            where riit.Activo
                                            && riit.ItemCodeID == referenciaID
                                            select riit.IncidenciaID).AsParallel().SingleOrDefault();

                            detalle = (Incidencia)DetalleIncidencia(incidenciaID, usuario);
                            break;
                        case 8: // Orden de almacenaje
                            incidenciaID = (from ria in ctx.Sam3_Rel_Incidencia_OrdenAlmacenaje
                                            where ria.Activo
                                            && ria.OrdenalmacenajeID == referenciaID
                                            select ria.IncidenciaID).AsParallel().SingleOrDefault();

                            detalle = (Incidencia)DetalleIncidencia(incidenciaID, usuario);
                            break;
                        case 9: // Numero unico
                            incidenciaID = (from rin in ctx.Sam3_Rel_Incidencia_NumeroUnico
                                            where rin.Activo
                                            && rin.NumeroUnicoID == referenciaID
                                            select rin.IncidenciaID).AsParallel().SingleOrDefault();

                            detalle = (Incidencia)DetalleIncidencia(incidenciaID, usuario);
                            break;
                        case 10: // Despacho
                            incidenciaID = (from rid in ctx.Sam3_Rel_Incidencia_Despacho
                                            where rid.Activo
                                            && rid.DespachoID == referenciaID
                                            select rid.IncidenciaID).AsParallel().SingleOrDefault();

                            detalle = (Incidencia)DetalleIncidencia(incidenciaID, usuario);
                            break;
                        case 11: // Corte
                            incidenciaID = (from ric in ctx.Sam3_Corte
                                            where ric.Activo
                                            && ric.CorteID == referenciaID
                                            select ric.CorteID).AsParallel().SingleOrDefault();

                            detalle = (Incidencia)DetalleIncidencia(incidenciaID, usuario);
                            break;
                        default:
                            throw new Exception("No se encontro el tipo de incidencia");
                    }

                    return detalle;
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

        public object TiposIncidencias(Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<TipoIncidencia> listado = (from tpi in ctx.Sam3_TipoIncidencia
                                                    where tpi.Activo
                                                    select new TipoIncidencia
                                                    {
                                                        Nombre = tpi.Nombre,
                                                        TipoIncidenciaID = tpi.TipoIncidenciaID.ToString()
                                                    }).AsParallel().Distinct().ToList();

                    return listado.OrderBy(x => x.Nombre).ToList();
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

        public object Clasificaciones(Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Clasificacion> listado = (from c in ctx.Sam3_ClasificacionIncidencia
                                                   where c.Activo
                                                   select new Clasificacion
                                                   {
                                                       ClasificacionID = c.ClasificacionIncidenciaID.ToString(),
                                                       Nombre = c.Nombre
                                                   }).AsParallel().ToList();

                    return listado;
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