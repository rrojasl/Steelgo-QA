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
                                                         NumeroUnico = nu.Codigo, //Aplicar formato
                                                         NumerosUnicos = (from numu in ctx2.NumeroUnico
                                                                          join nui in ctx2.NumeroUnicoInventario on numu.NumeroUnicoID equals nui.NumeroUnicoID
                                                                          where numu.ItemCodeID == ic.ItemCodeID
                                                                          //&& nu.Diametro1 == ic.Diametro1 
                                                                          && nui.InventarioDisponibleCruce > 0
                                                                          select new NumerosUnicos 
                                                                          {
                                                                              NumeroUnicoID = numu.NumeroUnicoID.ToString(),
                                                                              NumeroUnico = numu.Codigo //Aplicar Formato
                                                                          }).ToList()
                                                     }).AsParallel().GroupBy(x=> x.SpoolID).Select(x=> x.First()).ToList();


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

    }
}