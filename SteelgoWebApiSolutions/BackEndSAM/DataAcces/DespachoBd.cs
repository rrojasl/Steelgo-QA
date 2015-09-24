using System;
using System.Collections.Generic;
using System.Linq;
using DatabaseManager.Sam2;
using DatabaseManager.Sam3;
using BackEndSAM.Models;
using SecurityManager.Api.Models;
using System.Web.Script.Serialization;

namespace BackEndSAM.DataAcces
{
    public class DespachoBd
    {
        private static readonly object _mutex = new object();
        private static DespachoBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private DespachoBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static DespachoBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new DespachoBd();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerListadoDespachos(FiltrosJson filtros, Sam3_Usuario usuario)
        {
            try
            {
                using (Sam2Context ctx2 = new Sam2Context())
                {
                    return null;
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

        public object ListadoGenerarDespacho(int ordenTrabajoSpoolID, Sam3_Usuario usuario)
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
                }
                using (Sam2Context ctx2 = new Sam2Context())
                {

                    List<LstGenerarDespacho> listado = (from odts in ctx2.OrdenTrabajoSpool
                                                        join odtm in ctx2.OrdenTrabajoMaterial on odts.OrdenTrabajoSpoolID equals odtm.OrdenTrabajoSpoolID
                                                        join ms in ctx2.MaterialSpool on odtm.MaterialSpoolID equals ms.MaterialSpoolID
                                                        join nu in ctx2.NumeroUnico on odtm.NumeroUnicoCongeladoID equals nu.NumeroUnicoID
                                                        join it in ctx2.ItemCode on nu.ItemCodeID equals it.ItemCodeID
                                                        join odt in ctx2.OrdenTrabajo on odts.OrdenTrabajoID equals odt.OrdenTrabajoID
                                                        where odts.OrdenTrabajoSpoolID == ordenTrabajoSpoolID
                                                        && !(from d in ctx2.Despacho
                                                             where d.Cancelado == false
                                                             select d.OrdenTrabajoSpoolID).Contains(odts.OrdenTrabajoSpoolID)
                                                        && proyectos.Contains(odt.ProyectoID)
                                                        select new LstGenerarDespacho
                                                        {
                                                            Descripcion = it.DescripcionEspanol,
                                                            ItemCode = it.Codigo,
                                                            NumeroControl = odts.NumeroControl,
                                                            NumeroUnico = nu.Codigo,
                                                            Etiqueta = ms.Etiqueta
                                                        }).Distinct().AsParallel().ToList();

#if DEBUG
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    string json = serializer.Serialize(listado);
#endif

                    return listado.OrderBy(x => x.Etiqueta).ToList();
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