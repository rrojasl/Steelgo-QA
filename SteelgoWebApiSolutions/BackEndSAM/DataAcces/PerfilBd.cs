using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DatabaseManager.Sam3;
using DatabaseManager.EntidadesPersonalizadas;
using BackEndSAM.Utilities;
using System.Web.Script.Serialization;

namespace BackEndSAM.DataAcces
{
    public class PerfilBd
    {
        private static readonly object _mutex = new object();
        private static PerfilBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private PerfilBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static PerfilBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new PerfilBd();
                    }
                }
                return _instance;
            }
        }


        public PerfilJson ObtenerPerfilJsonPorID(int perfilID, int paginaID)
        {
            PerfilJson perfil;
            using (SamContext ctx = new SamContext())
            {
                //Obtenermos el Id de la pagina
                //int paginaID = ctx.Sam3_Pagina.Where(x => x.Accion == pageName).Select(x => x.PaginaID).SingleOrDefault();

                //Obtenemos los datos de la relacion entidad perfil
                Sam3_Rel_Perfil_Entidad_Pagina perfil_entidad = ctx.Sam3_Rel_Perfil_Entidad_Pagina
                    .Where(x => x.PerfilID == perfilID 
                        && x.EntidadID == (int)Enums.Entidades.Layout 
                        && x.PaginaID == (int)Enums.Paginas.Layout)
                    .FirstOrDefault();


                //instanciamos el nuevo objeto de retorno de Json
                perfil = new PerfilJson();

                //asignaom valores a las propiedades de Layout
                perfil.layout.create = perfil_entidad.PermisoCreacion;
                perfil.layout.destroy = perfil_entidad.PermisoEliminacion;
                perfil.layout.detail = perfil_entidad.PermisoDetalle;
                perfil.layout.list = perfil_entidad.PermisoListado;

                //obtenemos la lista de propiedades por perfil y entidad
                List<Properties> lstProperties = (from p in ctx.Sam3_Rel_Perfil_Propiedad_Pagina
                                               join pr in ctx.Sam3_Propiedad on p.PropiedadID equals pr.PropiedadID
                                               where p.PerfilID == perfilID 
                                               && pr.EntidadID == perfil_entidad.EntidadID
                                               select new Properties{
                                                    propertyName = pr.Nombre,
                                                    visible = p.PermisoLectura,
                                                    editable = p.PermisoEdicion,
                                                    required = p.Requerido
                                               }).ToList();

                //agregamos la lista de propiedades del layout
                perfil.layout.properties.AddRange(lstProperties);

                //creamos un nuevo objeto de sideMenu
                sideMenu objsidemenu = new sideMenu();
                objsidemenu.editable = false;
                objsidemenu.visible = true;
                objsidemenu.type = "sidemenu";

                //traer la lista de elementos de sidemenu
                List<SideMenuElement> lstElements = (from rsm in ctx.Sam3_Rel_Perfil_MenuGeneral
                                                     join mg in ctx.Sam3_MenuGeneral on rsm.MenuGeneralID equals mg.MenuID
                                                     where rsm.PerfilID == perfilID
                                                     select new SideMenuElement
                                                     {
                                                         idPadre = mg.MenuID,
                                                         liga = mg.Liga,
                                                         texto = mg.Texto
                                                     }).ToList();

                objsidemenu.elements = lstElements;

                //crear objeto de menu contextual
                contextMenu ctxmenu = new contextMenu();
                ctxmenu.visible = true;
                ctxmenu.editable = false;
                ctxmenu.type = "contextmenu";

                //traer la lista de elementos del menu contextual
                List<ContextMenuElement> lstCtxMenuElements = (from r in ctx.Sam3_Rel_Perfil_MenuContextual
                                                               join mc in ctx.Sam3_MenuContextual on r.MenuContextualID equals mc.MenuID
                                                               where r.PerfilID == perfilID
                                                               select new ContextMenuElement
                                                               {
                                                                   liga = mc.Liga,
                                                                   texto = mc.Texto
                                                               }).ToList();
                //agregamos los elementos
                ctxmenu.elements = lstCtxMenuElements;

                //creamos el arreglo quickLinks
                quicklinks quickLinks = new quicklinks();
                quickLinks.editable = false;
                quickLinks.visible = true;
                quickLinks.type = "quicklinks";
                quickLinks.elements.Add(new QuickLinksElement{ liga = "Home/Index.cshtml", texto = "Link rapido 1"});
                quickLinks.elements.Add(new QuickLinksElement{ liga = "Home/Index.cshtml", texto = "Link rapido 2"});


                //agregamos los elementos de menu
                perfil.layout.navigation.Add(objsidemenu);
                perfil.layout.navigation.Add(ctxmenu);
                perfil.layout.navigation.Add(quickLinks);

                //obtnemos los datos para la entidad login
                List<Sam3_Rel_Perfil_Entidad_Pagina> lstperfilesEntides = ctx.Sam3_Rel_Perfil_Entidad_Pagina
                    .Where(x => x.PerfilID == perfilID && x.PaginaID == paginaID).ToList();

                //creamos la lista de entidades
                List<Entidad> lstEntidades = (from lst in lstperfilesEntides
                                              select new Entidad
                                              {
                                                  entityName = lst.Sam3_Entidad.Nombre,
                                                  create = lst.PermisoCreacion,
                                                  destroy = lst.PermisoEliminacion,
                                                  detail = lst.PermisoDetalle,
                                                  list = lst.PermisoListado
                                              }).ToList();

                //creamos la lista de propiedades por cada entidad
                foreach (Entidad e in lstEntidades)
                {
                    List<Properties> lstProperty = (from r in ctx.Sam3_Rel_Perfil_Propiedad_Pagina
                                                      join p in ctx.Sam3_Propiedad on r.PropiedadID equals p.PropiedadID
                                                      join en in ctx.Sam3_Entidad on p.EntidadID equals en.EntidadID
                                                      where en.Nombre == e.entityName
                                                      select new Properties
                                                      {
                                                          propertyName = p.Nombre,
                                                          editable = r.PermisoEdicion,
                                                          visible = r.PermisoLectura,
                                                          required = r.Requerido
                                                      }).ToList();
                    e.properties = lstProperty;
                }

                //agregar las entidades al perfil
                perfil.entidades = lstEntidades;

            }

            //JavaScriptSerializer serializer = new JavaScriptSerializer();
            //string json = serializer.Serialize(perfil);
            return perfil;
        }
    }
}