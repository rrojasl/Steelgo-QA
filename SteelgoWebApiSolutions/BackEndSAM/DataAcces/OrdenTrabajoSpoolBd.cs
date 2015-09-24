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
    public class OrdenTrabajoSpoolBd
    {
        private static readonly object _mutex = new object();
        private static OrdenTrabajoSpoolBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private OrdenTrabajoSpoolBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static OrdenTrabajoSpoolBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new OrdenTrabajoSpoolBd();
                    }
                }
                return _instance;
            }
        }

        public object ListadoNumerosDeControl(Sam3_Usuario usuario)
        {
            try
            {
                using (Sam2Context ctx2 = new Sam2Context())
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

                    List<ListaCombos> listado = (from odts in ctx2.OrdenTrabajoSpool
                                                 join odt in ctx2.OrdenTrabajo on odts.OrdenTrabajoID equals odt.OrdenTrabajoID
                                                 where !(from d in ctx2.Despacho
                                                      where d.Cancelado == false
                                                      select d.OrdenTrabajoSpoolID).Contains(odts.OrdenTrabajoSpoolID)
                                                 && proyectos.Contains(odt.ProyectoID)
                                                 select new ListaCombos
                                                 {
                                                     id = odts.OrdenTrabajoSpoolID.ToString(),
                                                     value = odts.NumeroControl
                                                 }).Distinct().AsParallel().ToList();

#if DEBUG
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    string json = serializer.Serialize(listado);
#endif

                    return listado.OrderBy(x => x.value).ToList();

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