using BackEndSAM.Models;
using DatabaseManager.Sam2;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces
{
    public class DeficitBd
    {
        private static readonly object _mutex = new object();
        private static DeficitBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private DeficitBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static DeficitBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new DeficitBd();
                    }
                }
                return _instance;
            }
        }


        /// <summary>
        /// Funcion para obtener las ordenes de trabajo para la pantalla
        /// NotificacionDeficit - combo orden de trabajo
        /// </summary>
        /// <param name="usuario"></param>
        /// <returns></returns>
        public object ObtenerOrdenesDeTrabajo(Sam3_Usuario usuario)
        {
            try
            {
                List<int> proyectos = new List<int>();
                List<int> patios = new List<int>();
                List<ListaCombos> ordenes = new List<ListaCombos>();

                using (SamContext ctx = new SamContext())
                {
                    using (Sam2Context ctx2 = new Sam2Context())
                    {
                        proyectos = (from p in ctx.Sam3_Rel_Usuario_Proyecto
                                     join eqp in ctx.Sam3_EquivalenciaProyecto on p.ProyectoID equals eqp.Sam3_ProyectoID
                                     where p.Activo && eqp.Activo
                                     && p.UsuarioID == usuario.UsuarioID
                                     select eqp.Sam2_ProyectoID).Distinct().AsParallel().ToList();

                        proyectos = proyectos.Where(x => x > 0).ToList();

                        patios = (from p in ctx.Sam3_Proyecto
                                  join pa in ctx.Sam3_Patio on p.PatioID equals pa.PatioID
                                  join eq in ctx.Sam3_EquivalenciaPatio on pa.PatioID equals eq.Sam2_PatioID
                                  where p.Activo && pa.Activo && eq.Activo
                                  && proyectos.Contains(p.ProyectoID)
                                  select eq.Sam2_PatioID).Distinct().AsParallel().ToList();

                        patios = patios.Where(x => x > 0).ToList();

                        ordenes = (from ot in ctx2.OrdenTrabajo
                                   where ot.EstatusOrdenID == 1 &&
                                   proyectos.Contains(ot.ProyectoID)
                                   select new ListaCombos
                                   {
                                       id = ot.OrdenTrabajoID.ToString(),
                                       value = ot.NumeroOrden
                                   }).AsParallel().ToList();
                    }
                    return ordenes;
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
        /// Funcion para obtener los item codes que pertenecen a una orden de trabajo
        /// </summary>
        /// <param name="ordenTrabajo"></param>
        /// <returns></returns>
        public object ObtenerItemCodesOT(string ordenTrabajo)
        {
            try
            {
                using (Sam2Context ctx2 = new Sam2Context())
                {
                    List<ListaCombos> itemCodes = (from ot in ctx2.OrdenTrabajo
                                                   join ots in ctx2.OrdenTrabajoSpool on ot.OrdenTrabajoID equals ots.OrdenTrabajoID
                                                   join otm in ctx2.OrdenTrabajoMaterial on ots.OrdenTrabajoSpoolID equals otm.OrdenTrabajoSpoolID
                                                   join ms in ctx2.MaterialSpool on otm.MaterialSpoolID equals ms.MaterialSpoolID
                                                   join ic in ctx2.ItemCode on ms.ItemCodeID equals ic.ItemCodeID
                                                   where ot.OrdenTrabajoID.ToString() == ordenTrabajo
                                                   select new ListaCombos
                                                   {
                                                       id = ms.ItemCodeID.ToString(),
                                                       value = ic.Codigo
                                                   }).AsParallel().ToList();
                    return itemCodes;
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
        /// Funcion para obtener los diametros de un item code
        /// </summary>
        /// <param name="itemCode"></param>
        /// <returns></returns>
        public object ObtenerDiametros(int itemCode)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<DiametrosItemCode> diametro = (from eq in ctx.Sam3_EquivalenciaItemCode
                                                        join rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on eq.Sam3_ItemCodeID equals rics.ItemCodeID
                                                        join ics in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                                        where eq.Sam2_ItemCodeID == itemCode
                                                        && eq.Activo && rics.Activo && ics.Activo
                                                        select new DiametrosItemCode
                                                        {
                                                            Diametro1 = ics.Diametro1.ToString(),
                                                            Diametro2 = ics.Diametro2.ToString()
                                                        }).AsParallel().ToList();
                    return diametro;
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
        /// Obtener la informacion del grid en Notificacion de Deficit
        /// </summary>
        /// <param name="ordenTrabajo"></param>
        /// <param name="itemCode"></param>
        /// <returns></returns>
        public object ObtenerInformacionItemCode(string ordenTrabajo, int itemCode)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    using (Sam2Context ctx2 = new Sam2Context())
                    {
                        List<Deficit> lista = (from eq in ctx.Sam3_EquivalenciaItemCode
                                               join rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on eq.Sam3_ItemCodeID equals rics.ItemCodeID
                                               join ics in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                               join ic in ctx.Sam3_ItemCode on eq.Sam3_ItemCodeID equals ic.ItemCodeID
                                               where eq.Sam2_ItemCodeID == itemCode
                                               && eq.Activo && rics.Activo && ics.Activo && ic.Activo
                                               select new Deficit
                                               {
                                                   ItemCodeID = ic.ItemCodeID.ToString(),
                                                   ItemCode = ic.Codigo,
                                                   Diametro1 = ics.Diametro1.ToString(),
                                                   Diametro2 = ics.Diametro2.ToString(),
                                                   Descripcion = ics.DescripcionEspanol,
                                                   DeficitTotal = (from dm in ctx.Sam3_DeficitMateriales
                                                                   where dm.Activo
                                                                   && dm.OrdenTrabajoID.ToString() == ordenTrabajo
                                                                   && dm.ItemCodeID == itemCode
                                                                   select dm.DeficitID).FirstOrDefault().ToString()
                                               }).AsParallel().ToList();

                        lista.ForEach(x =>
                        {
                            x.Cantidad = (from ot in ctx2.OrdenTrabajo
                                          join ots in ctx2.OrdenTrabajoSpool on ot.OrdenTrabajoID equals ots.OrdenTrabajoID
                                          join otm in ctx2.OrdenTrabajoMaterial on ots.OrdenTrabajoSpoolID equals otm.OrdenTrabajoSpoolID
                                          join ms in ctx2.MaterialSpool on otm.MaterialSpoolID equals ms.MaterialSpoolID
                                          join itmc in ctx2.ItemCode on ms.ItemCodeID equals itmc.ItemCodeID
                                          where ot.OrdenTrabajoID.ToString() == ordenTrabajo && ms.ItemCodeID == itemCode
                                          select ms.Cantidad).Sum().ToString();
                        });

                        return lista;
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
        /// Funcion para obtener la informacion del grid de spools
        /// Notificacion de deficit
        /// </summary>
        /// <param name="ordenTrabajo"></param>
        /// <param name="itemCode"></param>
        /// <returns></returns>
        public object ObtenerInformacionSpools(int ordenTrabajo, int itemCode)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    using (Sam2Context ctx2 = new Sam2Context())
                    {
                        List<SpoolsDeficit> lista = (from ots in ctx2.OrdenTrabajoSpool
                                                     join otm in ctx2.OrdenTrabajoMaterial on ots.OrdenTrabajoSpoolID equals otm.OrdenTrabajoSpoolID
                                                     join ms in ctx2.MaterialSpool on otm.MaterialSpoolID equals ms.MaterialSpoolID
                                                     join s in ctx2.Spool on ms.SpoolID equals s.SpoolID
                                                     where ots.OrdenTrabajoID == ordenTrabajo && ms.ItemCodeID == itemCode
                                                     select new SpoolsDeficit
                                                     {
                                                         SpoolID = s.SpoolID.ToString(),
                                                         Spool = s.Nombre,
                                                         Prioridad = s.Prioridad.ToString(),
                                                         Peqs = s.PeqGrupo,
                                                         Peso = s.Peso.ToString(),
                                                         ItemCodeID = ms.ItemCodeID.ToString(),
                                                     }).AsParallel().GroupBy(x => x.SpoolID).Select(x => x.First()).ToList();

                        lista.ForEach(x =>
                        {
                            x.ItemCodes = (from eq in ctx.Sam3_EquivalenciaItemCode
                                           join rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on eq.Sam3_ItemCodeID equals rics.ItemCodeID
                                           join ics in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                           join ic in ctx.Sam3_ItemCode on eq.Sam3_ItemCodeID equals ic.ItemCodeID
                                           where eq.Sam2_ItemCodeID.ToString() == x.ItemCodeID
                                           && eq.Activo && rics.Activo && ics.Activo && ic.Activo
                                           select new Deficit
                                           {
                                               ItemCode = ic.Codigo,
                                               ItemCodeID = ic.ItemCodeID.ToString(),
                                               Diametro1 = ics.Diametro1.ToString(),
                                               Diametro2 = ics.Diametro2.ToString(),
                                               Descripcion = ics.DescripcionEspanol
                                           }).AsParallel().ToList();
                        });

                        lista.ForEach(x =>
                        {
                            x.ItemCodes.ForEach(y =>
                            {
                                y.Cantidad = (from ms in ctx2.MaterialSpool
                                              where ms.SpoolID.ToString() == x.SpoolID && ms.ItemCodeID == itemCode
                                              select ms.Cantidad).Sum().ToString();
                            });
                        });

                        return lista;
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

        public object GuardarDeficit(int ordenTrabajoID, List<string> spoolID, List<DatosDeficitItemCodes> deficit, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    int cantidadDeficit = deficit[0].DeficitTotal;
                    int IDItemCode = deficit[0].ItemCodeID;

                    //int itemCodeSam3 = (from eq in ctx.Sam3_EquivalenciaItemCode
                    //                    where eq.Activo && eq.Sam2_ItemCodeID == IDItemCode
                    //                    select eq.Sam3_ItemCodeID).AsParallel().SingleOrDefault();

                    foreach (string item in spoolID)
                    {
                        int IDspool = Int32.Parse(item);

                        Sam3_DeficitMateriales nuevoDeficit = new Sam3_DeficitMateriales();
                        nuevoDeficit.OrdenTrabajoID = ordenTrabajoID;
                        nuevoDeficit.ItemCodeID = IDItemCode;
                        nuevoDeficit.SpoolID = IDspool;
                        nuevoDeficit.Deficit = cantidadDeficit;
                        nuevoDeficit.Activo = true;
                        nuevoDeficit.UsuarioModificacion = usuario.UsuarioID;
                        nuevoDeficit.FechaModificacion = DateTime.Now;

                        ctx.Sam3_DeficitMateriales.Add(nuevoDeficit);
                        ctx.SaveChanges();
                    }

                    if (!(bool)EnviarAvisosBd.Instance.EnviarNotificación(10,
                           string.Format("La orden de trabajo {0} tiene una nueva notificación de déficit con fecha {1}",
                           ordenTrabajoID, DateTime.Now), usuario))
                    {
                        //Agregar error a la bitacora  PENDIENTE
                    }

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

        ////////////////////////////////////////////////////////////////////////////////////////////////

        /// <summary>
        /// Funcion para obtener los detalles de un deficit
        /// pantalla revision de deficit
        /// </summary>
        /// <param name="ordenTrabajoID"></param>
        /// <returns></returns>
        public object ObtenerGridDeficit(int ordenTrabajoID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    using(Sam2Context ctx2 = new Sam2Context())
                    {
                    List<RevisionDeficitDatos> lista = (from dm in ctx.Sam3_DeficitMateriales
                                                        where dm.Activo && dm.OrdenTrabajoID == ordenTrabajoID
                                                        select new RevisionDeficitDatos
                                                        {
                                                            SpoolID = dm.SpoolID.ToString(),
                                                            ItemCodeID = dm.ItemCodeID.ToString(),
                                                            Diametro1 = (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                                                         join ics in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                                                         where rics.Activo && ics.Activo && rics.ItemCodeID == dm.ItemCodeID
                                                                         select ics.Diametro1).FirstOrDefault().ToString(),
                                                            Diametro2 = (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                                                         join ics in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                                                         where rics.Activo && ics.Activo && rics.ItemCodeID == dm.ItemCodeID
                                                                         select ics.Diametro2).FirstOrDefault().ToString(),
                                                            Descripcion = (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                                                           join ics in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                                                           where rics.Activo && ics.Activo && rics.ItemCodeID == dm.ItemCodeID
                                                                           select ics.DescripcionEspanol).FirstOrDefault().ToString(),
                                                            Deficit = dm.Deficit.ToString()
                                                        }).AsParallel().ToList();

                    lista.ForEach(x =>
                    {
                        x.ItemCode = (from ic in ctx2.ItemCode
                                      where ic.ItemCodeID.ToString() == x.ItemCodeID
                                      select ic.Codigo).AsParallel().SingleOrDefault();

                        x.Cantidad = (from ms in ctx2.MaterialSpool
                                      where ms.SpoolID.ToString() == x.SpoolID && ms.ItemCodeID.ToString() == x.ItemCodeID
                                      select ms.Cantidad).Sum().ToString();
                    });

                    return lista;
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