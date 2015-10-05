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
                        nuevaIncidencia.FechaCreacion = DateTime.Now;
                        nuevaIncidencia.FechaModificacion = DateTime.Now;
                        nuevaIncidencia.MotivoCancelacion = datos.MotivoCancelacion;
                        nuevaIncidencia.NoRFI = null;
                        nuevaIncidencia.Respuesta = datos.Respuesta;
                        nuevaIncidencia.TipoIncidenciaID = datos.TipoIncidenciaID;
                        nuevaIncidencia.Titulo = datos.Titulo;
                        nuevaIncidencia.UsuarioID = usuario.UsuarioID;
                        nuevaIncidencia.Version = 1;
                        nuevaIncidencia.UsuarioModificacion = usuario.UsuarioID;
                        nuevaIncidencia.FechaRespuesta = Convert.ToDateTime(datos.FechaRespuesta);
                        nuevaIncidencia.FechaSolucion = Convert.ToDateTime(datos.FechaResolucion);
                        nuevaIncidencia.UsuarioIDRespuesta = datos.RespondidoPor != "" ? Convert.ToInt32(datos.RespondidoPor) : 1;
                        nuevaIncidencia.UsuarioResuelveID = datos.ResueltoPor != "" ? Convert.ToInt32(datos.ResueltoPor) : 1;
                        nuevaIncidencia.Estatus = datos.Estatus == "" ? "Abierta" : datos.Estatus;
                        

                        ctx.Sam3_Incidencia.Add(nuevaIncidencia);

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

                        ctx_tran.Commit();
                        return null;
                    }
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