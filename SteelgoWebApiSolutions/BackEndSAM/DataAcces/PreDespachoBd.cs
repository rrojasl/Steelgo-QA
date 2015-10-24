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
    public class PreDespachoBd
    {
        private static readonly object _mutex = new object();
        private static PreDespachoBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private PreDespachoBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static PreDespachoBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new PreDespachoBd();
                    }
                }
                return _instance;
            }
        }

        /// <summary>
        /// Funcion para obtener los datos del grid de pre despacho
        /// </summary>
        /// <param name="spoolID"></param>
        /// <param name="usuario"></param>
        /// <returns></returns>
        public object ObtenerGridPreDespacho(int spoolID, Sam3_Usuario usuario)
        {
            try
            {
                List<int> proyectos = new List<int>();
                List<int> patios = new List<int>();
                using (SamContext ctx = new SamContext())
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

                    using (Sam2Context ctx2 = new Sam2Context())
                    {
                        List<PreDespacho> listado = (from ot in ctx2.OrdenTrabajo
                                                     join ots in ctx2.OrdenTrabajoSpool on ot.OrdenTrabajoID equals ots.OrdenTrabajoID
                                                     join ms in ctx2.MaterialSpool on ots.SpoolID equals ms.SpoolID
                                                     join ic in ctx2.ItemCode on ms.ItemCodeID equals ic.ItemCodeID
                                                     join nu in ctx2.NumeroUnico on ic.ItemCodeID equals nu.ItemCodeID
                                                     where ots.OrdenTrabajoSpoolID == spoolID
                                                     && proyectos.Contains(ot.ProyectoID)
                                                     select new PreDespacho
                                                     {
                                                         ItemCodeID = ic.ItemCodeID,
                                                         ItemCode = ic.Codigo,
                                                         SpoolID = ots.OrdenTrabajoSpoolID,
                                                         Spool = ots.NumeroControl,
                                                         Descripcion = ic.DescripcionEspanol,
                                                         //NumeroUnico = nu.Codigo,
                                                         NumerosUnicos = (from numu in ctx2.NumeroUnico
                                                                          join nui in ctx2.NumeroUnicoInventario on numu.NumeroUnicoID equals nui.NumeroUnicoID
                                                                          where numu.ItemCodeID == ic.ItemCodeID
                                                                              //&& nu.Diametro1 == ic.Diametro1 
                                                                          && nui.InventarioDisponibleCruce > 0
                                                                          select new NumerosUnicos
                                                                          {
                                                                              NumeroUnicoID = numu.NumeroUnicoID.ToString(),
                                                                              NumeroUnico = numu.Codigo 
                                                                          }).ToList()
                                                     }).AsParallel().GroupBy(x => x.SpoolID).Select(x => x.First()).ToList();

                        //foreach (var nu in listado)
                        //{
                        //    int numeroDigitos = (from it in ctx.Sam3_ItemCode
                        //                         join pc in ctx.Sam3_ProyectoConfiguracion on it.ProyectoID equals pc.ProyectoID
                        //                         where it.ItemCodeID == nu.ItemCodeID
                        //                         select pc.DigitosNumeroUnico).AsParallel().SingleOrDefault();

                        //    string formato = "D" + numeroDigitos.ToString();

                        //    string[] codigo = nu.NumeroUnico.Split('-').ToArray();
                        //    int consecutivo = Convert.ToInt32(codigo[1]);
                        //    nu.NumeroUnico = codigo[0] + "-" + consecutivo.ToString(formato);
                        //}

                        foreach (var nu in listado)
                        {
                            foreach (var li in nu.NumerosUnicos)
                            {
                                int numeroDigitos = (from it in ctx.Sam3_ItemCode
                                                     join pc in ctx.Sam3_ProyectoConfiguracion on it.ProyectoID equals pc.ProyectoID
                                                     where it.ItemCodeID == nu.ItemCodeID
                                                     select pc.DigitosNumeroUnico).AsParallel().SingleOrDefault();

                                string formato = "D" + numeroDigitos.ToString();

                                string[] codigo = nu.NumeroUnico.Split('-').ToArray();
                                int consecutivo = Convert.ToInt32(codigo[1]);
                                li.NumeroUnico = codigo[0] + "-" + consecutivo.ToString(formato);

                            }
                        }

                        return listado.OrderBy(x => x.Spool).ToList();
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
        /// Funcion para el boton Predespachar 
        /// Pantalla pre despacho
        /// </summary>
        /// <param name="lista"></param>
        /// <param name="usuario"></param>
        /// <returns></returns>
        public object Predespachar(List<DatosPredespacho> lista, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    using (Sam2Context ctx2 = new Sam2Context())
                    {
                        Sam3_PreDespacho preDespacho = new Sam3_PreDespacho();

                        foreach (DatosPredespacho item in lista)
                        {
                           
                            preDespacho.Activo = true;
                            preDespacho.FechaModificacion = DateTime.Now;
                            preDespacho.FechaPreDespacho = DateTime.Now;
                            preDespacho.UsuarioModificacion = usuario.UsuarioID;
                            preDespacho.ProyectoID = Convert.ToInt32(item.ProyectoID);
                            preDespacho.OrdenTrabajoSpoolID = Convert.ToInt32(item.NumeroControl);
                            preDespacho.NumeroUnicoID = Convert.ToInt32(item.NumeroUnico);
                            preDespacho.MaterialSpoolID = (from ots in ctx2.OrdenTrabajoSpool
                                                           join ms in ctx2.MaterialSpool on ots.SpoolID equals ms.SpoolID
                                                           where ots.OrdenTrabajoSpoolID.ToString() == item.NumeroControl
                                                           select ms.MaterialSpoolID).AsParallel().SingleOrDefault();

                            ctx.Sam3_PreDespacho.Add(preDespacho);
                            ctx.SaveChanges();
                        }

                        TransactionalInformation result = new TransactionalInformation();
                        result.ReturnMessage.Add(preDespacho.PreDespachoID.ToString());
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

        public object ListadoNumeroUnicoComboGridDespacho(string numeroControl, string etiqueta, string itemcode, int proyectoID, Sam3_Usuario usuario)
        {
            try
            {
                List<ListaCombos> listado = new List<ListaCombos>();
                using (SamContext ctx = new SamContext())
                {
                    using (Sam2Context ctx2 = new Sam2Context())
                    {
                        List<int> sam2_NumerosUnicosIDs = (from odts in ctx2.OrdenTrabajoSpool
                                                           join odt in ctx2.OrdenTrabajo on odts.OrdenTrabajoID equals odt.OrdenTrabajoID
                                                           join ms in ctx2.MaterialSpool on odts.SpoolID equals ms.SpoolID
                                                           join it in ctx2.ItemCode on ms.ItemCodeID equals it.ItemCodeID
                                                           join nu in ctx2.NumeroUnico on it.ItemCodeID equals nu.ItemCodeID
                                                           join nui in ctx2.NumeroUnicoInventario on nu.NumeroUnicoID equals nui.NumeroUnicoID
                                                           where ms.Etiqueta == etiqueta
                                                           && odts.NumeroControl == numeroControl
                                                           && it.TipoMaterialID == 2
                                                           && it.Codigo == itemcode
                                                           && odt.ProyectoID == proyectoID
                                                           && ms.Diametro1 == nu.Diametro1
                                                           && ms.Diametro2 == nu.Diametro2
                                                           select nu.NumeroUnicoID).Distinct().AsParallel().ToList();

                        listado = (from nu in ctx.Sam3_NumeroUnico
                                   join nueq in ctx.Sam3_EquivalenciaNumeroUnico on nu.NumeroUnicoID equals nueq.Sam3_NumeroUnicoID
                                   where nu.Activo && nueq.Activo
                                   && sam2_NumerosUnicosIDs.Contains(nueq.Sam2_NumeroUnicoID)
                                   select new ListaCombos
                                   {
                                       id = nu.NumeroUnicoID.ToString(),
                                       value = nu.Prefijo + "-" + nu.Consecutivo
                                   }).Distinct().AsParallel().ToList();

                        foreach (ListaCombos lst in listado)
                        {
                            string[] elementos = lst.value.Split('-');

                            int temp = Convert.ToInt32(lst.id);

                            int digitos = (from nu in ctx.Sam3_NumeroUnico
                                           join p in ctx.Sam3_ProyectoConfiguracion on nu.ProyectoID equals p.ProyectoID
                                           where nu.Activo && p.Activo
                                           && nu.NumeroUnicoID == temp
                                           select p.DigitosNumeroUnico).AsParallel().SingleOrDefault();

                            string formato = "D" + digitos.ToString();
                            int consecutivo = Convert.ToInt32(elementos[1]);

                            lst.value = elementos[0] + "-" + consecutivo.ToString(formato);

                        }
                    }
                }
                return listado;
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