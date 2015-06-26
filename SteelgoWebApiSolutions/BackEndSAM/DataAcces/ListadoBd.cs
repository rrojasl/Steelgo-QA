using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DatabaseManager.Sam3;
using DatabaseManager.EntidadesPersonalizadas;
using BackEndSAM.Utilities;
using System.Web.Script.Serialization;
using BackEndSAM.Models;
using SecurityManager.Api.Models;
using BackEndSAM.Utilities;
using System.Web.Mvc;
using System.Net.Http;
using System.Net;
using System.IO;
using System.Net.Http.Headers;

namespace BackEndSAM.DataAcces
{
    public class ListadoBd
    {
        private static readonly object _mutex = new object();
        private static ListadoBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private ListadoBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static ListadoBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new ListadoBd();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerCantidadesDashboard(Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    //traemos la informacion de los patios y proyectos del usuario

                    CantidadesDashboard result = new CantidadesDashboard();

                    List<Sam3_Rel_Usuario_Proyecto> lst = ctx.Sam3_Rel_Usuario_Proyecto.AsParallel().ToList();

                    List<int> proyectos = lst.Where(x => x.UsuarioID == usuario.UsuarioID).Select(x => x.ProyectoID).AsParallel().ToList();

                    List<int> patios = (from r in ctx.Sam3_Proyecto
                                        join p in ctx.Sam3_Patio on r.PatioID equals p.PatioID
                                        where r.Activo && proyectos.Contains(r.ProyectoID)
                                        select p.PatioID).AsParallel().ToList();

                    result.Creados = (from r in ctx.Sam3_FolioAvisoLlegada
                                   join p in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on r.FolioAvisoLlegadaID equals p.FolioAvisoLlegadaID
                                   where r.Activo.Value == true
                                   && patios.Contains(r.PatioID)
                                   && proyectos.Contains(p.ProyectoID)
                                   select r.FolioAvisoLlegadaID).AsParallel().Count();

                    result.Completos = (from r in ctx.Sam3_FolioAvisoLlegada
                                        join py in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on r.FolioAvisoLlegadaID equals py.FolioAvisoLlegadaID
                                        join p in ctx.Sam3_PermisoAduana on r.FolioAvisoLlegadaID equals p.FolioAvisoLlegadaID
                                        where r.Activo.Value == true
                                        && patios.Contains(r.PatioID)
                                        && proyectos.Contains(py.ProyectoID)
                                        && p.PermisoAutorizado.Value == true
                                        select r.FolioAvisoLlegadaID).AsParallel().Count();

                    result.SinAutorizacion = (from r in ctx.Sam3_FolioAvisoLlegada
                                              join py in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on r.FolioAvisoLlegadaID equals py.FolioAvisoLlegadaID
                                              join p in ctx.Sam3_PermisoAduana on r.FolioAvisoLlegadaID equals p.FolioAvisoLlegadaID
                                              where r.Activo.Value == true
                                              && patios.Contains(r.PatioID)
                                              && proyectos.Contains(py.ProyectoID)
                                              && p.PermisoAutorizado.Value == false
                                              select r.FolioAvisoLlegadaID).AsParallel().Count();

                    result.SinPermiso = (from r in ctx.Sam3_FolioAvisoLlegada
                                         join py in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on r.FolioAvisoLlegadaID equals py.FolioAvisoLlegadaID
                                         where r.Activo.Value == true
                                         && patios.Contains(r.PatioID)
                                         && proyectos.Contains(py.ProyectoID)
                                         && !(from x in ctx.Sam3_PermisoAduana
                                              select x.FolioAvisoLlegadaID).Contains(r.FolioAvisoLlegadaID)
                                         select r.FolioAvisoLlegadaID).AsParallel().Count();

                                        

                    return result;
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