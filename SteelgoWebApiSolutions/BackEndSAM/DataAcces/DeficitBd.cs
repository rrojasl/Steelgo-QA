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
                using (SamContext ctx = new SamContext())
                {
                    using (Sam2Context ctx2 = new Sam2Context())
                    {
                        List<int> itemCodes = (from ot in ctx2.OrdenTrabajo
                                               join ots in ctx2.OrdenTrabajoSpool on ot.OrdenTrabajoID equals ots.OrdenTrabajoID
                                               join otm in ctx2.OrdenTrabajoMaterial on ots.OrdenTrabajoSpoolID equals otm.OrdenTrabajoSpoolID
                                               join ms in ctx2.MaterialSpool on otm.MaterialSpoolID equals ms.MaterialSpoolID
                                               join ic in ctx2.ItemCode on ms.ItemCodeID equals ic.ItemCodeID
                                               where ot.OrdenTrabajoID.ToString() == ordenTrabajo
                                               select ms.ItemCodeID).AsParallel().ToList();


                        List<ListaCombos> itemCodesSam3 = (from eq in ctx.Sam3_EquivalenciaItemCode
                                                           join rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on eq.Sam3_ItemCodeID equals rics.ItemCodeID
                                                           join ics in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                                           join ic in ctx.Sam3_ItemCode on eq.Sam3_ItemCodeID equals ic.ItemCodeID
                                                           where itemCodes.Contains(eq.Sam2_ItemCodeID)
                                                           && eq.Activo && rics.Activo && ics.Activo && ic.Activo
                                                           select new ListaCombos
                                                           {
                                                               id = ic.ItemCodeID.ToString(),
                                                               value = ic.Codigo
                                                           }).AsParallel().ToList();

                        return itemCodesSam3;


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
                    List<DiametrosItemCode> diametro = (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                                        join ics in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                                        where rics.ItemCodeID == itemCode
                                                        && rics.Activo && ics.Activo
                                                        select new DiametrosItemCode
                                                        {
                                                            Diametro1 = ics.Diametro1.ToString(),
                                                            Diametro2 = ics.Diametro2.ToString()
                                                        }).AsParallel().ToList();

                    //List<DiametrosItemCode> diametro = (from eq in ctx.Sam3_EquivalenciaItemCode
                    //                                    join rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on eq.Sam3_ItemCodeID equals rics.ItemCodeID
                    //                                    join ics in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                    //                                    where eq.Sam2_ItemCodeID == itemCode
                    //                                    && eq.Activo && rics.Activo && ics.Activo
                    //                                    select new DiametrosItemCode
                    //                                    {
                    //                                        Diametro1 = ics.Diametro1.ToString(),
                    //                                        Diametro2 = ics.Diametro2.ToString()
                    //                                    }).AsParallel().ToList();
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
                        List<Deficit> lista = new List<Deficit>();
                        if (ctx.Sam3_DeficitMateriales.Where(x => x.Activo && x.ItemCodeID == itemCode).Any())
                        {
                            lista = (from ic in ctx.Sam3_ItemCode
                                     join rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on ic.ItemCodeID equals rics.ItemCodeID
                                     join ics in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                     where ic.ItemCodeID == itemCode
                                     && rics.Activo && ics.Activo && ic.Activo
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
                                                         && dm.ItemCodeID == ic.ItemCodeID
                                                         select dm.Deficit).FirstOrDefault().ToString()
                                     }).AsParallel().ToList();

                            //lista = (from eq in ctx.Sam3_EquivalenciaItemCode
                            //         join rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on eq.Sam3_ItemCodeID equals rics.ItemCodeID
                            //         join ics in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                            //         join ic in ctx.Sam3_ItemCode on eq.Sam3_ItemCodeID equals ic.ItemCodeID
                            //         where eq.Sam2_ItemCodeID == itemCode
                            //         && eq.Activo && rics.Activo && ics.Activo && ic.Activo
                            //         select new Deficit
                            //         {
                            //             ItemCodeID = ic.ItemCodeID.ToString(),
                            //             ItemCode = ic.Codigo,
                            //             Diametro1 = ics.Diametro1.ToString(),
                            //             Diametro2 = ics.Diametro2.ToString(),
                            //             Descripcion = ics.DescripcionEspanol,
                            //             DeficitTotal = (from dm in ctx.Sam3_DeficitMateriales
                            //                             where dm.Activo
                            //                             && dm.OrdenTrabajoID.ToString() == ordenTrabajo
                            //                             && dm.ItemCodeID == ic.ItemCodeID
                            //                             select dm.Deficit).FirstOrDefault().ToString()
                            //         }).AsParallel().ToList();
                        }
                        else
                        {
                            lista = (from ic in ctx.Sam3_ItemCode
                                     join rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on ic.ItemCodeID equals rics.ItemCodeID
                                     join ics in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                     where ic.ItemCodeID == itemCode
                                     && rics.Activo && ics.Activo && ic.Activo
                                     select new Deficit
                                     {
                                         ItemCodeID = ic.ItemCodeID.ToString(),
                                         ItemCode = ic.Codigo,
                                         Diametro1 = ics.Diametro1.ToString(),
                                         Diametro2 = ics.Diametro2.ToString(),
                                         Descripcion = ics.DescripcionEspanol,
                                         DeficitTotal = "0"
                                     }).AsParallel().ToList();
                        }

                        lista.ForEach(x =>
                        {
                            int icSam2 = (from eq in ctx.Sam3_EquivalenciaItemCode
                                          where eq.Sam3_ItemCodeID.ToString() == x.ItemCodeID && eq.Activo
                                          select eq.Sam2_ItemCodeID).AsParallel().SingleOrDefault();

                            x.Cantidad = (from ot in ctx2.OrdenTrabajo
                                          join ots in ctx2.OrdenTrabajoSpool on ot.OrdenTrabajoID equals ots.OrdenTrabajoID
                                          join otm in ctx2.OrdenTrabajoMaterial on ots.OrdenTrabajoSpoolID equals otm.OrdenTrabajoSpoolID
                                          join ms in ctx2.MaterialSpool on otm.MaterialSpoolID equals ms.MaterialSpoolID
                                          join itmc in ctx2.ItemCode on ms.ItemCodeID equals itmc.ItemCodeID
                                          where ot.OrdenTrabajoID.ToString() == ordenTrabajo && ms.ItemCodeID == icSam2
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
                        List<SpoolsDeficit> lista = new List<SpoolsDeficit>();
                        List<int?> spoolsGuardados = new List<int?>();

                        if (ctx.Sam3_DeficitMateriales.Where(x => x.Activo && x.ItemCodeID == itemCode).Any())
                        {
                            spoolsGuardados = (from dm in ctx.Sam3_DeficitMateriales
                                               where dm.Activo 
                                               && dm.OrdenTrabajoID == ordenTrabajo 
                                               && dm.ItemCodeID == itemCode
                                               select dm.SpoolID).AsParallel().ToList();                            
                        }

                        int icSam2 = (from eq in ctx.Sam3_EquivalenciaItemCode
                                      where eq.Sam3_ItemCodeID == itemCode && eq.Activo
                                      select eq.Sam2_ItemCodeID).AsParallel().SingleOrDefault();

                        lista = (from ots in ctx2.OrdenTrabajoSpool
                                 join otm in ctx2.OrdenTrabajoMaterial on ots.OrdenTrabajoSpoolID equals otm.OrdenTrabajoSpoolID
                                 join ms in ctx2.MaterialSpool on otm.MaterialSpoolID equals ms.MaterialSpoolID
                                 join s in ctx2.Spool on ms.SpoolID equals s.SpoolID
                                 where ots.OrdenTrabajoID == ordenTrabajo && ms.ItemCodeID == icSam2
                                 select new SpoolsDeficit
                                 {
                                     SpoolID = s.SpoolID.ToString(),
                                     Spool = s.Nombre,
                                     Prioridad = s.Prioridad.ToString(),
                                     Peqs = s.PeqGrupo,
                                     Peso = s.Peso.ToString(),
                                     ItemCodeID = ms.ItemCodeID.ToString(),
                                     Seleccionado = spoolsGuardados.Contains(s.SpoolID)
                                 }).AsParallel().GroupBy(x => x.SpoolID).Select(x => x.First()).ToList();


                        lista.ForEach(x =>
                        {
                            x.ItemCodes = (from ic in ctx.Sam3_ItemCode
                                           join rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on ic.ItemCodeID equals rics.ItemCodeID
                                           join ics in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                           where ic.ItemCodeID == itemCode
                                           && rics.Activo && ics.Activo && ic.Activo
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
                                              where ms.SpoolID.ToString() == x.SpoolID && ms.ItemCodeID == icSam2
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

                    if (ctx.Sam3_DeficitMateriales.Where(x => x.Activo && x.ItemCodeID == IDItemCode).Any())
                    {
                        if (spoolID.Count > 0)
                        {
                            foreach (string item in spoolID)
                            {
                                int IDspool = Int32.Parse(item);

                                List<Sam3_DeficitMateriales> nuevoDeficit = ctx.Sam3_DeficitMateriales.Where(x => x.Activo && x.ItemCodeID == IDItemCode).AsParallel().ToList();

                                foreach (Sam3_DeficitMateriales materiales in nuevoDeficit)
                                {
                                    //Sam3_DeficitMateriales actualizarDeficit = new Sam3_DeficitMateriales();
                                    materiales.OrdenTrabajoID = ordenTrabajoID;
                                    materiales.ItemCodeID = IDItemCode;
                                    materiales.SpoolID = IDspool;
                                    materiales.Deficit = cantidadDeficit;
                                    materiales.Activo = true;
                                    materiales.UsuarioModificacion = usuario.UsuarioID;
                                    materiales.FechaModificacion = DateTime.Now;

                                    //ctx.Sam3_DeficitMateriales.Add(nuevoDeficit);
                                    ctx.SaveChanges();
                                }
                            }
                        }
                        else
                        {
                            //elimino los que ya existian
                            List<Sam3_DeficitMateriales> nuevoDeficit = ctx.Sam3_DeficitMateriales.Where(x => x.Activo && x.ItemCodeID == IDItemCode).AsParallel().ToList();

                            foreach (Sam3_DeficitMateriales materiales in nuevoDeficit)
                            {
                                //Sam3_DeficitMateriales actualizarDeficit = new Sam3_DeficitMateriales();
                                //actualizarDeficit.OrdenTrabajoID = materiales.OrdenTrabajoID;
                                //actualizarDeficit.ItemCodeID = materiales.ItemCodeID;
                                //actualizarDeficit.SpoolID = IDspool;
                                //actualizarDeficit.Deficit = cantidadDeficit;
                                materiales.Activo = false;
                                materiales.UsuarioModificacion = usuario.UsuarioID;
                                materiales.FechaModificacion = DateTime.Now;

                                //ctx.Sam3_DeficitMateriales.Add(nuevoDeficit);
                                ctx.SaveChanges();
                            }

                            Sam3_DeficitMateriales nuevo = new Sam3_DeficitMateriales();
                            nuevo.OrdenTrabajoID = ordenTrabajoID;
                            nuevo.ItemCodeID = IDItemCode;
                            nuevo.SpoolID = null;
                            nuevo.Deficit = cantidadDeficit;
                            nuevo.Activo = true;
                            nuevo.UsuarioModificacion = usuario.UsuarioID;
                            nuevo.FechaModificacion = DateTime.Now;

                            ctx.Sam3_DeficitMateriales.Add(nuevo);
                            ctx.SaveChanges();
                        }

                        if (!(bool)EnviarAvisosBd.Instance.EnviarNotificación(10,
                               string.Format("Se ha actualizado la notificacion de deficit de la orden de trabajo {0} con fecha {1}",
                               ordenTrabajoID, DateTime.Now), usuario))
                        {
                            //Agregar error a la bitacora  PENDIENTE
                        }
                    }
                    else
                    {
                        if (spoolID.Count > 0)
                        {
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
                        }
                        else
                        {
                            Sam3_DeficitMateriales nuevoDeficit = new Sam3_DeficitMateriales();
                            nuevoDeficit.OrdenTrabajoID = ordenTrabajoID;
                            nuevoDeficit.ItemCodeID = IDItemCode;
                            nuevoDeficit.SpoolID = null;
                            nuevoDeficit.Deficit = cantidadDeficit;
                            nuevoDeficit.Activo = true;
                            nuevoDeficit.UsuarioModificacion = usuario.UsuarioID;
                            nuevoDeficit.FechaModificacion = DateTime.Now;

                            ctx.Sam3_DeficitMateriales.Add(nuevoDeficit);
                            ctx.SaveChanges();
                        }

                        if (!(bool)EnviarAvisosBd.Instance.EnviarNotificación(10,
                               string.Format("La orden de trabajo {0} tiene una nueva notificacion de deficit con fecha {1}",
                               ordenTrabajoID, DateTime.Now), usuario))
                        {
                            //Agregar error a la bitacora  PENDIENTE
                        }
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
                    using (Sam2Context ctx2 = new Sam2Context())
                    {
                        List<RevisionDeficitDatos> lista = (from dm in ctx.Sam3_DeficitMateriales
                                                            where dm.Activo && dm.OrdenTrabajoID == ordenTrabajoID
                                                            select new RevisionDeficitDatos
                                                            {
                                                                //SpoolID = dm.SpoolID.ToString(),
                                                                ItemCodeID = dm.ItemCodeID.ToString(),
                                                                ItemCode = (from ic in ctx.Sam3_ItemCode
                                                                            where ic.ItemCodeID == dm.ItemCodeID && ic.Activo
                                                                            select ic.Codigo).FirstOrDefault(),
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
                                                                Deficit = dm.Deficit.ToString(),
                                                                DeficitID = dm.DeficitID.ToString()
                                                            }).AsParallel().ToList();

                        lista.ForEach(x =>
                        {
                            int icSam2 = (from eq in ctx.Sam3_EquivalenciaItemCode
                                          where eq.Sam3_ItemCodeID.ToString() == x.ItemCodeID && eq.Activo
                                          select eq.Sam2_ItemCodeID).AsParallel().SingleOrDefault();

                            x.Cantidad = (from ot in ctx2.OrdenTrabajo
                                          join ots in ctx2.OrdenTrabajoSpool on ot.OrdenTrabajoID equals ots.OrdenTrabajoID
                                          join otm in ctx2.OrdenTrabajoMaterial on ots.OrdenTrabajoSpoolID equals otm.OrdenTrabajoSpoolID
                                          join ms in ctx2.MaterialSpool on otm.MaterialSpoolID equals ms.MaterialSpoolID
                                          join itmc in ctx2.ItemCode on ms.ItemCodeID equals itmc.ItemCodeID
                                          where ot.OrdenTrabajoID == ordenTrabajoID && ms.ItemCodeID == icSam2
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
        /// Funcion para obtener el grid de Spools
        /// Pantalla Revision de deficit
        /// </summary>
        /// <param name="ordenTrabajoID"></param>
        /// <returns></returns>
        public object obtenerSpoolsRevision(string ordenTrabajoID)
        {
            try
            {
                List<SpoolsDeficit> totalSpools = new List<SpoolsDeficit>();
                using (SamContext ctx = new SamContext())
                {
                    using (Sam2Context ctx2 = new Sam2Context())
                    {
                        List<int> listaItemCodesSam3 = (from dm in ctx.Sam3_DeficitMateriales
                                                        where dm.OrdenTrabajoID.ToString() == ordenTrabajoID && dm.Activo
                                                        select dm.ItemCodeID).AsParallel().ToList();

                        List<int> listaItemCodesSam2 = new List<int>();

                        List<int?> spoolsGuardados = new List<int?>();

                        if (ctx.Sam3_DeficitMateriales.Where(x => x.Activo && x.OrdenTrabajoID.ToString() == ordenTrabajoID).Any())
                        {
                            spoolsGuardados = (from dm in ctx.Sam3_DeficitMateriales
                                               where dm.Activo
                                               && dm.OrdenTrabajoID.ToString() == ordenTrabajoID
                                               select dm.SpoolID).AsParallel().ToList();
                        }

                        listaItemCodesSam3.ForEach(x =>
                        {
                            listaItemCodesSam2.Add((from eq in ctx.Sam3_EquivalenciaItemCode
                                                    where eq.Sam3_ItemCodeID == x && eq.Activo
                                                    select eq.Sam2_ItemCodeID).AsParallel().SingleOrDefault());
                        });

                        foreach (int item in listaItemCodesSam2)
                        {
                            List<SpoolsDeficit> lista = (from ots in ctx2.OrdenTrabajoSpool
                                                         join otm in ctx2.OrdenTrabajoMaterial on ots.OrdenTrabajoSpoolID equals otm.OrdenTrabajoSpoolID
                                                         join ms in ctx2.MaterialSpool on otm.MaterialSpoolID equals ms.MaterialSpoolID
                                                         join s in ctx2.Spool on ms.SpoolID equals s.SpoolID
                                                         where ots.OrdenTrabajoID.ToString() == ordenTrabajoID && ms.ItemCodeID == item
                                                         select new SpoolsDeficit
                                                         {
                                                             SpoolID = s.SpoolID.ToString(),
                                                             Spool = s.Nombre,
                                                             Prioridad = s.Prioridad.ToString(),
                                                             Peqs = s.PeqGrupo,
                                                             Peso = s.Peso.ToString(),
                                                             ItemCodeID = ms.ItemCodeID.ToString(),
                                                             Seleccionado = spoolsGuardados.Contains(s.SpoolID)
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
                                                  where ms.SpoolID.ToString() == x.SpoolID && ms.ItemCodeID == item
                                                  select ms.Cantidad).Sum().ToString();
                                });
                            });

                            totalSpools.AddRange(lista);
                        }

                        return totalSpools;
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
        /// Funcion para eliminar un deficit
        /// Pantalla revision de deficit
        /// </summary>
        /// <param name="deficitID"></param>
        /// <param name="usuario"></param>
        /// <returns></returns>
        public object EliminarDeficit(int deficitID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_DeficitMateriales deficit = ctx.Sam3_DeficitMateriales.Where(x => x.Activo && x.DeficitID == deficitID).AsParallel().SingleOrDefault();
                    deficit.Activo = false;
                    deficit.FechaModificacion = DateTime.Now;
                    deficit.UsuarioModificacion = usuario.UsuarioID;

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

        public object SolucionarDeficit(List<int> deficitID, SolucionarRevision datos, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    foreach (int item in deficitID)
                    {
                        foreach (int spool in datos.SpoolID)
                        {
                            Sam3_DeficitMateriales nuevoDeficit = ctx.Sam3_DeficitMateriales.Where(x => x.DeficitID == item).AsParallel().SingleOrDefault();
                            nuevoDeficit.OrdenTrabajoID = datos.OrdenTrabajoID;
                            nuevoDeficit.ItemCodeID = datos.ItemCodeID;
                            nuevoDeficit.SpoolID = spool;
                            nuevoDeficit.Deficit = datos.Deficit;
                            nuevoDeficit.Activo = true;
                            nuevoDeficit.FechaModificacion = DateTime.Now;
                            nuevoDeficit.UsuarioModificacion = usuario.UsuarioID;

                            ctx.SaveChanges();

                        }
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
    }
}