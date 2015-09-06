using BackEndSAM.Models;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces
{
    public class GuardarFolioLlegadaCuantificacionBd
    {
         private static readonly object _mutex = new object();
         private static GuardarFolioLlegadaCuantificacionBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
         private GuardarFolioLlegadaCuantificacionBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
         public static GuardarFolioLlegadaCuantificacionBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new GuardarFolioLlegadaCuantificacionBd();
                    }
                }
                return _instance;
            }
        }

        /// <summary>
        /// Actualizar un folio cuantificacion existente
        /// </summary>
        /// <param name="datosCuantificacion">informacion del folio cuantificacion</param>
        /// <param name="usuario">usuario actual</param>
        /// <returns>folio de cuantificacion creado, proyectos</returns>
         public object UpdateGuardarFolio(DatosFolioLlegadaCuantificacion datosCuantificacion, Sam3_Usuario usuario)
         {
             try
             {
                 using (SamContext ctx = new SamContext())
                 {
                     Sam3_FolioCuantificacion folioCuantificacion = ctx.Sam3_FolioCuantificacion.Where(x => x.FolioCuantificacionID == datosCuantificacion.FolioCuantificacionID).AsParallel().SingleOrDefault();
                     folioCuantificacion.FolioAvisoEntradaID = datosCuantificacion.FolioAvisollegadaId;
                     folioCuantificacion.ProyectoID = datosCuantificacion.ProyectoID == null ? 1 : datosCuantificacion.ProyectoID;
                     folioCuantificacion.PackingList = datosCuantificacion.PackingList;
                     folioCuantificacion.TipoUsoID = datosCuantificacion.TipoUso;
                     folioCuantificacion.Estatus = "Entrada por cuantificar";
                     folioCuantificacion.FechaModificacion = DateTime.Now;
                     folioCuantificacion.UsuarioModificacion = usuario.UsuarioID;
                     folioCuantificacion.Activo = true;

                     ctx.SaveChanges();

                     if (datosCuantificacion.BultoID != null)
                     {
                         Sam3_Bulto bulto = ctx.Sam3_Bulto.Where(x => x.BultoID == datosCuantificacion.BultoID).AsParallel().SingleOrDefault();
                         bulto.FolioCuantificacionID = datosCuantificacion.FolioCuantificacionID;
                         bulto.Estatus = "";
                         bulto.FechaModificacion = DateTime.Now;
                         bulto.UsuarioModificacion = usuario.UsuarioID;
                         bulto.Activo = true;

                         ctx.SaveChanges();
                     }

                     string nombre = (from p in ctx.Sam3_Proyecto
                                      where p.ProyectoID == folioCuantificacion.ProyectoID
                                      select p.Nombre).AsParallel().SingleOrDefault();

                     return new FolioLlegadaCuantificacion { FolioCuantificacionID = folioCuantificacion.FolioCuantificacionID, ProyectoID = folioCuantificacion.ProyectoID, Nombre = nombre };
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

        /// <summary>
        /// Guardar un folio Cuantificacion Nuevo
        /// </summary>
        /// <param name="datosCuantificacion">informacion del folio cuantificacion</param>
        /// <param name="usuario">usuario actual</param>
        /// <returns>Folio de cuantificacion creados, proyectos</returns>
         public object CreateGuardarFolio(DatosFolioLlegadaCuantificacion datosCuantificacion, Sam3_Usuario usuario)
         {
             try
             {
                 using (SamContext ctx = new SamContext())
                 {
                     Sam3_FolioCuantificacion folioCuantificacion = new Sam3_FolioCuantificacion();

                     folioCuantificacion.FolioAvisoEntradaID = datosCuantificacion.FolioAvisollegadaId;
                     folioCuantificacion.ProyectoID = datosCuantificacion.ProyectoID;
                     folioCuantificacion.PackingList = datosCuantificacion.PackingList;
                     folioCuantificacion.TipoUsoID = datosCuantificacion.TipoUso;
                     folioCuantificacion.FechaCreacion = DateTime.Now;
                     folioCuantificacion.Estatus = "Entrada por cuantificar";
                     folioCuantificacion.FechaModificacion = DateTime.Now;
                     folioCuantificacion.UsuarioModificacion = usuario.UsuarioID;
                     folioCuantificacion.Activo = true;

                     ctx.Sam3_FolioCuantificacion.Add(folioCuantificacion);
                     ctx.SaveChanges();

                     if (datosCuantificacion.BultoID != null)
                     {
                         Sam3_Bulto bulto = ctx.Sam3_Bulto.Where(x => x.BultoID == datosCuantificacion.BultoID).AsParallel().SingleOrDefault();
                         bulto.FolioCuantificacionID = datosCuantificacion.FolioCuantificacionID;
                         bulto.Estatus = "";
                         bulto.FechaModificacion = DateTime.Now;
                         bulto.UsuarioModificacion = usuario.UsuarioID;
                         bulto.Activo = true;

                         ctx.Sam3_Bulto.Add(bulto);
                         ctx.SaveChanges();
                     }

                     string nombre = (from p in ctx.Sam3_Proyecto
                                      where p.ProyectoID == folioCuantificacion.ProyectoID
                                      select p.Nombre).AsParallel().SingleOrDefault();

                     return new FolioLlegadaCuantificacion { FolioCuantificacionID = folioCuantificacion.FolioCuantificacionID, ProyectoID = folioCuantificacion.ProyectoID, Nombre = nombre };
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