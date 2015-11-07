using System;
using System.Collections.Generic;
using System.Linq;
using DatabaseManager.Sam3;
using BackEndSAM.Models;
using SecurityManager.Api.Models;
using System.Transactions;
using System.Web.Script.Serialization;

namespace BackEndSAM.DataAcces
{
    public class ComplementoRecepcionBd
    {
        private static readonly object _mutex = new object();
        private static ComplementoRecepcionBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private ComplementoRecepcionBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static ComplementoRecepcionBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new ComplementoRecepcionBd();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerListado(int folioCuantificacionID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<ItemCodeComplemento> listado = new List<ItemCodeComplemento>();
                    //Agregamos items con relacion con Folio Cuantificacion
                    listado.AddRange((from fc in ctx.Sam3_FolioCuantificacion
                                      join rfi in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on fc.FolioCuantificacionID equals rfi.FolioCuantificacionID
                                      join rel in ctx.Sam3_Rel_NumeroUnico_RelFC_RelB on rfi.Rel_FolioCuantificacion_ItemCode_ID equals rel.Rel_FolioCuantificacion_ItemCode_ID
                                      join nu in ctx.Sam3_NumeroUnico on rel.NumeroUnicoID equals nu.NumeroUnicoID
                                      join it in ctx.Sam3_ItemCode on nu.ItemCodeID equals it.ItemCodeID
                                      join rid in ctx.Sam3_Rel_ItemCode_Diametro on rfi.Rel_ItemCode_Diametro_ID equals rid.Rel_ItemCode_Diametro_ID
                                      join d1 in ctx.Sam3_Diametro on rid.Diametro1ID equals d1.DiametroID
                                      join d2 in ctx.Sam3_Diametro on rid.Diametro2ID equals d2.DiametroID
                                      where fc.Activo && rfi.Activo && it.Activo && nu.Activo && rel.Activo && rid.Activo && d1.Activo && d2.Activo
                                      && fc.FolioCuantificacionID == folioCuantificacionID
                                      && !it.TieneComplementoRecepcion
                                      select new ItemCodeComplemento
                                      {
                                          NumeroUnicoID = nu.NumeroUnicoID.ToString(),
                                          NumeroUnico = nu.Prefijo + "-" + nu.Consecutivo,
                                          ItemCode = it.Codigo,
                                          NumeroUnicoCliente = nu.NumeroUnicoCliente,
                                          Descripcion = it.DescripcionEspanol,
                                          Cedula = nu.Cedula,
                                          TipoAcero = (from fa in ctx.Sam3_FamiliaAcero
                                                       where fa.Activo && fa.FamiliaAceroID == it.FamiliaAceroID
                                                       select fa.Nombre).FirstOrDefault(),
                                          D1 = d1.Valor.ToString(),
                                          D2 = d2.Valor.ToString(),
                                          ItemCodeID = it.ItemCodeID,
                                          ProyectoID = it.ProyectoID,
                                          Cantidad = (from nui in ctx.Sam3_NumeroUnicoInventario
                                                      where nui.NumeroUnicoID == nu.NumeroUnicoID
                                                      select nui.CantidadRecibida).FirstOrDefault(),
                                          MM = it.MM.ToString(),
                                          Colada = nu.Sam3_Colada.NumeroColada,
                                          EstatusDocumental = it.EstatusDocumental,
                                          EstatusFisico = it.EstatusFisico,
                                          TipoUso = it.Sam3_TipoUso.Nombre,
                                          RelFCID = rel.Rel_FolioCuantificacion_ItemCode_ID.ToString(),
                                          RelNUFCBID = rel.Rel_NumeroUnico_RelFC_RelB_ID.ToString()
                                      }).AsParallel().Distinct().ToList());

                    //agregar items en bulto
                    listado.AddRange((from fc in ctx.Sam3_FolioCuantificacion
                                      join b in ctx.Sam3_Bulto on fc.FolioCuantificacionID equals b.FolioCuantificacionID
                                      join rbi in ctx.Sam3_Rel_Bulto_ItemCode on b.BultoID equals rbi.BultoID
                                      join rel in ctx.Sam3_Rel_NumeroUnico_RelFC_RelB on rbi.Rel_Bulto_ItemCode_ID equals rel.Rel_Bulto_ItemCode_ID
                                      join nu in ctx.Sam3_NumeroUnico on rel.NumeroUnicoID equals nu.NumeroUnicoID
                                      join it in ctx.Sam3_ItemCode on nu.ItemCodeID equals it.ItemCodeID
                                      join rid in ctx.Sam3_Rel_ItemCode_Diametro on rbi.Rel_ItemCode_Diametro_ID equals rid.Rel_ItemCode_Diametro_ID
                                      join d1 in ctx.Sam3_Diametro on rid.Diametro1ID equals d1.DiametroID
                                      join d2 in ctx.Sam3_Diametro on rid.Diametro2ID equals d2.DiametroID
                                      where fc.Activo && b.Activo && rbi.Activo && it.Activo && nu.Activo && rel.Activo && rid.Activo && d1.Activo && d2.Activo 
                                      && fc.FolioCuantificacionID == folioCuantificacionID
                                      && !it.TieneComplementoRecepcion
                                      select new ItemCodeComplemento
                                      {
                                          NumeroUnicoID = nu.NumeroUnicoID.ToString(),
                                          NumeroUnico = nu.Prefijo + "-" + nu.Consecutivo,
                                          ItemCode = it.Codigo,
                                          NumeroUnicoCliente = nu.NumeroUnicoCliente,
                                          Descripcion = it.DescripcionEspanol,
                                          Cedula = nu.Cedula,
                                          TipoAcero = (from fa in ctx.Sam3_FamiliaAcero
                                                       where fa.Activo && fa.FamiliaAceroID == it.FamiliaAceroID
                                                       select fa.Nombre).FirstOrDefault(),
                                          D1 = d1.Valor.ToString(),
                                          D2 = d2.Valor.ToString(),
                                          ItemCodeID = it.ItemCodeID,
                                          ProyectoID = it.ProyectoID,
                                          Cantidad = (from nui in ctx.Sam3_NumeroUnicoInventario
                                                      where nui.NumeroUnicoID == nu.NumeroUnicoID
                                                      select nui.CantidadRecibida).FirstOrDefault(),
                                          MM = it.MM.ToString(),
                                          Colada = nu.Sam3_Colada.NumeroColada, 
                                          EstatusDocumental = it.EstatusDocumental, 
                                          EstatusFisico = it.EstatusFisico, 
                                          TipoUso = it.Sam3_TipoUso.Nombre,
                                          RelNUFCBID = rel.Rel_NumeroUnico_RelFC_RelB_ID.ToString(),
                                          RelBID = rel.Rel_Bulto_ItemCode_ID.ToString()
                                      }
                        ).AsParallel().Distinct().ToList());

                    foreach (ItemCodeComplemento item in listado)
                    {
                        int numeroDigitos = ctx.Sam3_ProyectoConfiguracion.Where(x => x.ProyectoID == item.ProyectoID)
                            .Select(x => x.DigitosNumeroUnico).AsParallel().SingleOrDefault();
                        
                        string formato = "D" + numeroDigitos.ToString();
                        
                        string[] elementos = item.NumeroUnico.Split('-').ToArray();
                        
                        int temp = Convert.ToInt32(elementos[1]);

                        item.NumeroUnico = elementos[0] + "-" + temp.ToString(formato);
                    }

                    listado = listado.OrderBy(x => x.NumeroUnico).ToList();

                    List<object> lstReturn = new List<object>();
                    string Estatus = ctx.Sam3_FolioCuantificacion.Where(x => x.FolioCuantificacionID == folioCuantificacionID)
                        .Select(x => x.Estatus).SingleOrDefault();

                    lstReturn.Add(Estatus);
                    lstReturn.Add(listado);

#if DEBUG
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    string json = serializer.Serialize(lstReturn);
#endif

                    return lstReturn;
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

        private ItemCodeComplemento ObtenerPropiedadesJson(int relFCID = 0,  int RelBID = 0, int RelNUFCBID = 0)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ItemCodeComplemento item = new ItemCodeComplemento();
                    //Agregamos items con relacion con Folio Cuantificacion
                    if (relFCID > 0)
                    {
                        item = (from rel in ctx.Sam3_Rel_NumeroUnico_RelFC_RelB
                                join nu in ctx.Sam3_NumeroUnico on rel.NumeroUnicoID equals nu.NumeroUnicoID
                                join rfi in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on rel.Rel_FolioCuantificacion_ItemCode_ID equals rfi.Rel_FolioCuantificacion_ItemCode_ID
                                join rid in ctx.Sam3_Rel_ItemCode_Diametro on rfi.Rel_ItemCode_Diametro_ID equals rid.Rel_ItemCode_Diametro_ID
                                join it in ctx.Sam3_ItemCode on rid.ItemCodeID equals it.ItemCodeID
                                join d1 in ctx.Sam3_Diametro on rid.Diametro1ID equals d1.DiametroID
                                join d2 in ctx.Sam3_Diametro on rid.Diametro2ID equals d2.DiametroID
                                where it.Activo && nu.Activo && rel.Activo && rfi.Activo && rid.Activo
                                && rel.Rel_NumeroUnico_RelFC_RelB_ID == RelNUFCBID
                                select new ItemCodeComplemento
                                {
                                    NumeroUnico = nu.Prefijo + "-" + nu.Consecutivo,
                                    ItemCode = it.Codigo,
                                    NumeroUnicoCliente = nu.NumeroUnicoCliente,
                                    Descripcion = it.DescripcionEspanol,
                                    Cedula = nu.Cedula,
                                    TipoAcero = (from fa in ctx.Sam3_FamiliaAcero
                                                 where fa.Activo && fa.FamiliaAceroID == it.FamiliaAceroID
                                                 select fa.Nombre).FirstOrDefault(),
                                    D1 = d1.Valor.ToString(),
                                    D2 = d2.Valor.ToString(),
                                    ItemCodeID = it.ItemCodeID,
                                    ProyectoID = it.ProyectoID,
                                    Cantidad = it.Cantidad,
                                    MM = it.MM.ToString(),
                                    Colada = (from c in ctx.Sam3_Colada
                                              where c.ColadaID == rfi.ColadaID
                                              select c.NumeroColada).FirstOrDefault(),
                                    EstatusDocumental = it.EstatusDocumental,
                                    EstatusFisico = it.EstatusFisico,
                                    TipoUso = it.Sam3_TipoUso.Nombre,
                                    ColadaID = rfi.ColadaID
                                }).AsParallel().SingleOrDefault();
                    }

                    if (RelBID > 0)
                    {
                        item = (from rel in ctx.Sam3_Rel_NumeroUnico_RelFC_RelB
                                join nu in ctx.Sam3_NumeroUnico on rel.NumeroUnicoID equals nu.NumeroUnicoID
                                join rbi in ctx.Sam3_Rel_Bulto_ItemCode on rel.Rel_Bulto_ItemCode_ID equals rbi.Rel_Bulto_ItemCode_ID
                                join rid in ctx.Sam3_Rel_ItemCode_Diametro on rbi.Rel_ItemCode_Diametro_ID equals rid.Rel_ItemCode_Diametro_ID
                                join it in ctx.Sam3_ItemCode on rid.ItemCodeID equals it.ItemCodeID
                                join d1 in ctx.Sam3_Diametro on rid.Diametro1ID equals d1.DiametroID
                                join d2 in ctx.Sam3_Diametro on rid.Diametro2ID equals d2.DiametroID
                                where it.Activo && nu.Activo && rel.Activo && rbi.Activo && rid.Activo
                                && rel.Rel_NumeroUnico_RelFC_RelB_ID == RelNUFCBID
                                select new ItemCodeComplemento
                                {
                                    NumeroUnico = nu.Prefijo + "-" + nu.Consecutivo,
                                    ItemCode = it.Codigo,
                                    NumeroUnicoCliente = nu.NumeroUnicoCliente,
                                    Descripcion = it.DescripcionEspanol,
                                    Cedula = nu.Cedula,
                                    TipoAcero = (from fa in ctx.Sam3_FamiliaAcero
                                                 where fa.Activo && fa.FamiliaAceroID == it.FamiliaAceroID
                                                 select fa.Nombre).FirstOrDefault(),
                                    D1 = d1.Valor.ToString(),
                                    D2 = d2.Valor.ToString(),
                                    ItemCodeID = it.ItemCodeID,
                                    ProyectoID = it.ProyectoID,
                                    Cantidad = it.Cantidad,
                                    MM = it.MM.ToString(),
                                    Colada = (from c in ctx.Sam3_Colada
                                              where c.ColadaID == rbi.ColadaID
                                              select c.NumeroColada).FirstOrDefault(),
                                    EstatusDocumental = it.EstatusDocumental,
                                    EstatusFisico = it.EstatusFisico,
                                    TipoUso = it.Sam3_TipoUso.Nombre,
                                    ColadaID = rbi.ColadaID
                                }).AsParallel().SingleOrDefault();
                    }

                    if (item == null)
                    {
                        throw new Exception("Error al obtener las propiedades del Número único");
                    }


                    int numeroDigitos = ctx.Sam3_ProyectoConfiguracion.Where(x => x.ProyectoID == item.ProyectoID)
                        .Select(x => x.DigitosNumeroUnico).AsParallel().SingleOrDefault();

                    string formato = "D" + numeroDigitos.ToString();

                    string[] elementos = item.NumeroUnico.Split('-').ToArray();

                    int temp = Convert.ToInt32(elementos[1]);

                    item.NumeroUnico = elementos[0] + "-" + temp.ToString(formato);

#if DEBUG
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    string json = serializer.Serialize(item);
#endif

                    return item;
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                return null;
            }
        }

        public object GuardarComplemento(int tipoGuardadoID, ItemCodeComplemento itemCodeJson, Sam3_Usuario usuario)
        {
            try
            {
                int relFcId = itemCodeJson.RelFCID != null && itemCodeJson.RelFCID != "" ? Convert.ToInt32(itemCodeJson.RelFCID) : 0;
                int relBId = itemCodeJson.RelBID != null && itemCodeJson.RelBID != "" ? Convert.ToInt32(itemCodeJson.RelBID) : 0;
                int relNuId = itemCodeJson.RelNUFCBID != null && itemCodeJson.RelNUFCBID != "" ? Convert.ToInt32(itemCodeJson.RelNUFCBID) : 0;

                TransactionalInformation result = new TransactionalInformation();
                using (TransactionScope scope = new TransactionScope())
                {
                    using (SamContext ctx = new SamContext())
                    {
                        Sam3_ItemCode actualizaItem = ctx.Sam3_ItemCode
                                    .Where(x => x.ItemCodeID.ToString() == itemCodeJson.ItemCode && x.Activo).SingleOrDefault();

                        string[] elementos = itemCodeJson.NumeroUnico.Split('-').ToArray();
                        int temp = Convert.ToInt32(elementos[1]);
                        string prefijo = elementos[0];

                        Sam3_NumeroUnico actualizaNU = ctx.Sam3_NumeroUnico
                            .Where(x => x.NumeroUnicoID.ToString() == itemCodeJson.NumeroUnicoID).SingleOrDefault();

                        if (itemCodeJson.Titulo != "" && itemCodeJson.Titulo != null)
                        {
                            Sam3_Incidencia incidencia = new Sam3_Incidencia();
                            incidencia.Activo = true;
                            incidencia.ClasificacionID = (from c in ctx.Sam3_ClasificacionIncidencia
                                                          where c.Activo && c.Nombre == "Materiales"
                                                          select c.ClasificacionIncidenciaID).AsParallel().SingleOrDefault();
                            incidencia.Descripcion = itemCodeJson.DescripcionIncidencia;
                            incidencia.Estatus = "Abierta";
                            incidencia.FechaCreacion = DateTime.Now;
                            incidencia.FechaModificacion = DateTime.Now;
                            incidencia.TipoIncidenciaID = (from tp in ctx.Sam3_TipoIncidencia
                                                           where tp.Activo && tp.Nombre == "Número único"
                                                           select tp.TipoIncidenciaID).AsParallel().SingleOrDefault();
                            incidencia.Titulo = itemCodeJson.Titulo;
                            incidencia.UsuarioID = usuario.UsuarioID;
                            incidencia.Version = 1;

                            ctx.Sam3_Incidencia.Add(incidencia);
                            ctx.SaveChanges();

                            int nu = Convert.ToInt32(itemCodeJson.NumeroUnicoID);

                            Sam3_Rel_Incidencia_NumeroUnico nuevaRelIncidencia = new Sam3_Rel_Incidencia_NumeroUnico();
                            nuevaRelIncidencia.Activo = true;
                            nuevaRelIncidencia.FechaModificacion = DateTime.Now;
                            nuevaRelIncidencia.IncidenciaID = incidencia.IncidenciaID;
                            nuevaRelIncidencia.NumeroUnicoID = nu;
                            nuevaRelIncidencia.UsuarioModificacion = usuario.UsuarioID;

                            ctx.Sam3_Rel_Incidencia_NumeroUnico.Add(nuevaRelIncidencia);
                            ctx.SaveChanges();
                        }

                        switch (tipoGuardadoID)
                        {
                            case 1: // Guardado Parcial

                                //Actualizo el numero Unico
                                if (actualizaNU != null)
                                {
                                    actualizaNU.NumeroUnicoCliente = itemCodeJson.NumeroUnicoCliente;
                                    actualizaNU.FechaModificacion = DateTime.Now;
                                    actualizaNU.UsuarioModificacion = usuario.UsuarioID;
                                    actualizaNU.ColadaID = (from c in ctx.Sam3_Colada
                                                            where c.NumeroColada == itemCodeJson.Colada
                                                            && c.ProyectoID == itemCodeJson.ProyectoID
                                                            select c.ColadaID).AsParallel().SingleOrDefault();
                                }
                                else
                                {
                                    throw new Exception(string.Format("Error al actualizar el número único {}", itemCodeJson.NumeroUnico));
                                }

                                if (actualizaItem != null)
                                {
                                    actualizaItem.MM = itemCodeJson.MM != "" ? Convert.ToInt32(itemCodeJson.MM) : 0;
                                    actualizaItem.EstatusFisico = itemCodeJson.EstatusFisico;
                                    actualizaItem.EstatusDocumental = itemCodeJson.EstatusDocumental;
                                    actualizaItem.TipoUsoID = itemCodeJson.TipoUso != "" && itemCodeJson.TipoUso != null ?
                                        (from tp in ctx.Sam3_TipoUso
                                         where tp.Activo && tp.Nombre == itemCodeJson.TipoUso
                                         select tp.TipoUsoID).SingleOrDefault() : 1;
                                    actualizaItem.TieneComplementoRecepcion = false;
                                    actualizaItem.FechaModificacion = DateTime.Now;
                                    actualizaItem.UsuarioModificacion = usuario.UsuarioID;
                                }
                                else
                                {
                                    throw new Exception(string.Format("Error al actualizar La informacion del ItemCode {}", itemCodeJson.ItemCode));
                                }

                                ctx.SaveChanges();

                                itemCodeJson = ObtenerPropiedadesJson(relFcId, relBId, relNuId);
                                itemCodeJson.TieneError = false;

                                break;
                            case 2: // Guardar y terminar

                                //Actualizo el numero Unico
                                if (actualizaNU != null)
                                {
                                    actualizaNU.NumeroUnicoCliente = itemCodeJson.NumeroUnicoCliente;
                                    actualizaNU.FechaModificacion = DateTime.Now;
                                    actualizaNU.UsuarioModificacion = usuario.UsuarioID;
                                    actualizaNU.ColadaID = (from c in ctx.Sam3_Colada
                                                            where c.NumeroColada == itemCodeJson.Colada
                                                            && c.ProyectoID == itemCodeJson.ProyectoID
                                                            select c.ColadaID).AsParallel().SingleOrDefault();
                                }
                                else
                                {
                                    throw new Exception(string.Format("Error al actualizar el número único {}", itemCodeJson.NumeroUnico));
                                }

                                if (actualizaItem != null)
                                {
                                    if (itemCodeJson.MM == "" || itemCodeJson.Colada == "" || itemCodeJson.EstatusFisico == ""
                                        || itemCodeJson.EstatusDocumental == "" || itemCodeJson.TipoUso == "")
                                    {
                                        throw new Exception(string.Format("Datos Incompletos"));
                                    }

                                    actualizaItem.MM = itemCodeJson.MM != "" ? Convert.ToInt32(itemCodeJson.MM) : 0;
                                    actualizaItem.EstatusFisico = itemCodeJson.EstatusFisico;
                                    actualizaItem.EstatusDocumental = itemCodeJson.EstatusDocumental;
                                    actualizaItem.TipoUsoID = itemCodeJson.TipoUso != "" && itemCodeJson.TipoUso != null ?
                                        (from tp in ctx.Sam3_TipoUso
                                         where tp.Activo && tp.Nombre == itemCodeJson.TipoUso
                                         select tp.TipoUsoID).SingleOrDefault() : 1;
                                    actualizaItem.TieneComplementoRecepcion = true;
                                    actualizaItem.FechaModificacion = DateTime.Now;
                                    actualizaItem.UsuarioModificacion = usuario.UsuarioID;
                                }
                                else
                                {
                                    throw new Exception(string.Format("Error al actualizar La informacion del ItemCode {}", itemCodeJson.ItemCode));
                                }

                                ctx.SaveChanges();

                                itemCodeJson = ObtenerPropiedadesJson(relFcId, relBId, relNuId);
                                itemCodeJson.TieneError = false;

                                break;
                            default:

                                result.ReturnMessage.Add("No se encontro el tipo de guardado");
                                result.ReturnCode = 500;
                                result.ReturnStatus = false;
                                result.IsAuthenicated = true;

                                return result;
                        } // Fin switch
                    }// fin using SAM
                    scope.Complete();

                    return itemCodeJson;
                    
                }// Fin Scope
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                itemCodeJson.TieneError = true;
                return itemCodeJson;
            }
        }

    }
}