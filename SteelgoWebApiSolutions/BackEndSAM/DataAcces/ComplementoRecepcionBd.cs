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
                                     join it in ctx.Sam3_ItemCode on rfi.ItemCodeID equals it.ItemCodeID
                                     join nu in ctx.Sam3_NumeroUnico on it.ItemCodeID equals nu.ItemCodeID
                                     where fc.Activo && rfi.Activo && it.Activo && nu.Activo
                                     && fc.FolioCuantificacionID == folioCuantificacionID
                                     && !it.TieneComplementoRecepcion
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
                                         D1 = it.Diametro1.ToString(),
                                         D2 = it.Diametro2.ToString(),
                                         ItemCodeID = it.ItemCodeID,
                                         ProyectoID = it.ProyectoID,
                                         Cantidad = it.Cantidad.ToString(),
                                         MM = it.MM.ToString(),
                                         Colada = nu.Sam3_Colada.NumeroColada,
                                         EstatusDocumental = it.EstatusDocumental,
                                         EstatusFisico = it.EstatusFisico,
                                         TipoUso = it.Sam3_TipoUso.Nombre
                                     }).AsParallel().Distinct().ToList());

                    //agregar items en bulto
                    listado.AddRange((from fc in ctx.Sam3_FolioCuantificacion
                                      join b in ctx.Sam3_Bulto on fc.FolioCuantificacionID equals b.FolioCuantificacionID
                                      join rbi in ctx.Sam3_Rel_Bulto_ItemCode on b.BultoID equals rbi.BultoID
                                      join it in ctx.Sam3_ItemCode on rbi.ItemCodeID equals it.ItemCodeID
                                      join nu in ctx.Sam3_NumeroUnico on it.ItemCodeID equals nu.ItemCodeID
                                      where fc.Activo && b.Activo && rbi.Activo && it.Activo && nu.Activo
                                      && fc.FolioCuantificacionID == folioCuantificacionID
                                      && !it.TieneComplementoRecepcion
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
                                          D1 = it.Diametro1.ToString(),
                                          D2 = it.Diametro2.ToString(),
                                          ItemCodeID = it.ItemCodeID,
                                          ProyectoID = it.ProyectoID,
                                          Cantidad = it.Cantidad.ToString(),
                                          MM = it.MM.ToString(),
                                          Colada = nu.Sam3_Colada.NumeroColada, 
                                          EstatusDocumental = it.EstatusDocumental, 
                                          EstatusFisico = it.EstatusFisico, 
                                          TipoUso = it.Sam3_TipoUso.Nombre
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
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        private ItemCodeComplemento ObtenerPropiedadesJson(int itemCodeID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ItemCodeComplemento item = new ItemCodeComplemento();
                    //Agregamos items con relacion con Folio Cuantificacion
                    item = (from it in ctx.Sam3_ItemCode
                                      join nu in ctx.Sam3_NumeroUnico on it.ItemCodeID equals nu.ItemCodeID
                                      where it.Activo && nu.Activo
                                      && it.ItemCodeID == itemCodeID
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
                                          D1 = it.Diametro1.ToString(),
                                          D2 = it.Diametro2.ToString(),
                                          ItemCodeID = it.ItemCodeID,
                                          ProyectoID = it.ProyectoID
                                      }).AsParallel().SingleOrDefault();


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
                return null;
            }
        }

        public object GuardarComplemento(int tipoGuardadoID, ItemCodeComplemento itemCodeJson, Sam3_Usuario usuario)
        {
            try
            {
                TransactionalInformation result = new TransactionalInformation();
                using (TransactionScope scope = new TransactionScope())
                {
                    using (SamContext ctx = new SamContext())
                    {
                        Sam3_ItemCode actualizaItem = ctx.Sam3_ItemCode
                                    .Where(x => x.Codigo == itemCodeJson.ItemCode).SingleOrDefault();

                        string[] elementos = itemCodeJson.NumeroUnico.Split('-').ToArray();
                        int temp = Convert.ToInt32(elementos[1]);

                        Sam3_NumeroUnico actualizaNU = ctx.Sam3_NumeroUnico
                            .Where(x => x.ItemCodeID == actualizaItem.ItemCodeID
                                && x.Prefijo == elementos[0] && x.Consecutivo == temp).SingleOrDefault();

                        switch (tipoGuardadoID)
                        {
                            case 1: // Guardado Parcial

                                //Actualizo el numero Unico
                                if (actualizaNU != null)
                                {
                                    actualizaNU.NumeroUnicoCliente = itemCodeJson.NumeroUnicoCliente;
                                    actualizaNU.FechaModificacion = DateTime.Now;
                                    actualizaNU.UsuarioModificacion = usuario.UsuarioID;
                                }
                                else
                                {
                                    throw new Exception(string.Format("Error al actualizar el número único {}", itemCodeJson.NumeroUnico));
                                }

                                if (actualizaItem != null)
                                {
                                    actualizaItem.MM = itemCodeJson.MM != "" ? Convert.ToInt32(itemCodeJson.MM) : 0;
                                    actualizaItem.ColadaID = itemCodeJson.Colada != "" ?
                                        (from co in ctx.Sam3_Colada
                                         where co.Activo && co.NumeroColada == itemCodeJson.Colada
                                         select co.ColadaID
                                        ).SingleOrDefault()
                                        : 1;
                                    actualizaItem.EstatusFisico = itemCodeJson.EstatusFisico;
                                    actualizaItem.EstatusDocumental = itemCodeJson.EstatusDocumental;
                                    actualizaItem.TipoUsoID = itemCodeJson.TipoUso != "" ?
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

                                itemCodeJson = ObtenerPropiedadesJson(itemCodeJson.ItemCodeID);
                                itemCodeJson.TieneError = false;

                                break;
                            case 2: // Guardar y terminar

                                //Actualizo el numero Unico
                                if (actualizaNU != null)
                                {
                                    actualizaNU.NumeroUnicoCliente = itemCodeJson.NumeroUnicoCliente;
                                    actualizaNU.FechaModificacion = DateTime.Now;
                                    actualizaNU.UsuarioModificacion = usuario.UsuarioID;
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
                                    actualizaItem.ColadaID = itemCodeJson.Colada != "" ?
                                        (from co in ctx.Sam3_Colada
                                         where co.Activo && co.NumeroColada == itemCodeJson.Colada
                                         select co.ColadaID
                                        ).SingleOrDefault()
                                        : 1;
                                    actualizaItem.EstatusFisico = itemCodeJson.EstatusFisico;
                                    actualizaItem.EstatusDocumental = itemCodeJson.EstatusDocumental;
                                    actualizaItem.TipoUsoID = itemCodeJson.TipoUso != "" ?
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

                                itemCodeJson = ObtenerPropiedadesJson(itemCodeJson.ItemCodeID);
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
                itemCodeJson.TieneError = true;
                return itemCodeJson;
            }
        }

    }
}