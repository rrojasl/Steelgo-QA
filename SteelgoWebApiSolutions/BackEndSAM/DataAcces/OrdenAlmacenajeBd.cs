using BackEndSAM.Models;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces
{
    public class OrdenAlmacenajeBd
    {
        private static readonly object _mutex = new object();
        private static OrdenAlmacenajeBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private OrdenAlmacenajeBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static OrdenAlmacenajeBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new OrdenAlmacenajeBd();
                    }
                }
                return _instance;
            }
        }

        //obtener proyectos del usuario
        public object ObtenerProyectosOrdenAlmacenaje(/*Sam3_Usuario usuario*/)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<int> proyectos = ctx.Sam3_Rel_Usuario_Proyecto.Where(x => x.UsuarioID == 1/*usuario.UsuarioID*/).Select(x => x.ProyectoID).AsParallel().ToList();

                    List<Proyecto> listProy = new List<Proyecto>();
                    Proyecto proy = new Proyecto();
                    proyectos.ForEach(x =>
                    {
                        proy = ctx.Sam3_Proyecto.Where(p => p.ProyectoID == x)
                            .Select(o => new Proyecto
                            {
                                Nombre = o.Nombre,
                                ProyectoID = o.ProyectoID.ToString()
                            }).AsParallel().SingleOrDefault();
                        listProy.Add(proy);
                    });

                    return listProy;
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

        //obtener los folios de llegada 
        public object ObtenerFoliosLlegadaOrdenAlmacenaje(Proyecto proyecto)
        {
            List<FolioEntradaYLlegada> listFolios = new List<FolioEntradaYLlegada>();
            //List<int> listFolioCuantificacion = new List<int>();
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    //Si es Folio Cuantificacion
                    //listFolioCuantificacion = (from fc in ctx.Sam3_FolioCuantificacion
                    //                           where fc.ProyectoID.ToString() == proyecto.ProyectoID
                    //                           select fc.FolioCuantificacionID).AsParallel().ToList();


                    listFolios = (from rfp in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto
                                  join ae in ctx.Sam3_FolioAvisoEntrada on rfp.FolioAvisoLlegadaID equals ae.FolioAvisoLlegadaID
                                  where rfp.ProyectoID.ToString() == proyecto.ProyectoID
                                  select new FolioEntradaYLlegada
                                  {
                                      FolioAvisoEntradaID = ae.FolioAvisoEntradaID,
                                      FolioAvisoLlegadaID = rfp.FolioAvisoLlegadaID
                                  }
                          ).AsParallel().ToList();

                }
                return listFolios;
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

        public object ObtenerItemCodesOrdenAlmacenaje(int folioAvisoEntrada)
        {
            FolioCuantificacion folioCuantificacion = new FolioCuantificacion();
            List<int> listItemCode = new List<int>();
            List<ItemCode> ComboItemCode = new List<ItemCode>();
            ItemCode itemCode = new ItemCode();

            try
            {
                using (SamContext ctx = new SamContext())
                {
                    folioCuantificacion.FolioCuantificacionID = (from fc in ctx.Sam3_FolioCuantificacion
                                                                 where fc.FolioAvisoEntradaID == folioAvisoEntrada
                                                                 select fc.FolioCuantificacionID).AsParallel().First();

                    listItemCode = (from ric in ctx.Sam3_Rel_FolioCuantificacion_ItemCode
                                    where ric.FolioCuantificacionID == folioCuantificacion.FolioCuantificacionID
                                    select ric.ItemCodeID).AsParallel().ToList();

                    foreach (var item in listItemCode)
                    {
                        itemCode = (from ic in ctx.Sam3_ItemCode
                                    where ic.ItemCodeID == item
                                    select new ItemCode
                                    {
                                        ItemCodeID = ic.ItemCodeID.ToString(),
                                        Codigo = ic.Codigo
                                    }).AsParallel().First();

                        ComboItemCode.Add(itemCode);

                    }

                    return ComboItemCode;
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

        public object ObtenerNumerosUnicosOrdenAlmacenaje(int itemCode)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<int> numerosUnicos = new List<int>();
                    List<int> numerosConOR = (from or in ctx.Sam3_Rel_OrdenRecepcion_ItemCode
                                              where or.Activo
                                              select or.ItemCodeID).AsParallel().ToList();


                    numerosUnicos = (from nu in ctx.Sam3_NumeroUnico
                                     where nu.ItemCodeID == itemCode && numerosConOR.Contains(itemCode)
                                     select nu.NumeroUnicoID).AsParallel().ToList();

                    return numerosUnicos;
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

        public object ObtenerListadoGeneracionOrdenAlacenaje(int proyectoID, int folioCuantificacion, int itemCodeID, int numeroUnicoID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<GridGeneracionOrdenAlmacenaje> listado = new List<GridGeneracionOrdenAlmacenaje>();

                    listado = (from ic in ctx.Sam3_ItemCode
                               join ric in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on ic.ItemCodeID equals ric.ItemCodeID
                               join nu in ctx.Sam3_NumeroUnico on ic.ItemCodeID equals nu.ItemCodeID
                               join fc in ctx.Sam3_FolioCuantificacion on ric.FolioCuantificacionID equals fc.FolioCuantificacionID
                               where ic.ProyectoID == proyectoID && ric.FolioCuantificacionID == folioCuantificacion && nu.NumeroUnicoID == numeroUnicoID && ic.ItemCodeID == itemCodeID
                               select new GridGeneracionOrdenAlmacenaje
                               {
                                   ItemCode = ic.ItemCodeID,
                                   Descripcion = ic.DescripcionEspanol,
                                   D1 = ic.Diametro1,
                                   D2 = ic.Diametro2,
                                   Cantidad = ic.Cantidad,
                                   PackingList = fc.PackingList,
                                   NumeroUnico = (from numerounico in ctx.Sam3_NumeroUnico
                                                  where numerounico.NumeroUnicoID == numeroUnicoID
                                                  select numerounico.NumeroUnicoID).AsParallel().ToList()
                               }).AsParallel().ToList();
                    return listado;
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

        public object GenerarOrdenAlmacenaje(List<int> listaNU, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
 
                    Sam3_OrdenAlmacenaje ordenAlmacenaje = new Sam3_OrdenAlmacenaje();

                    //Guardar en Orden de Almacenaje
                    ordenAlmacenaje.Folio = 1; //consecutivo
                    ordenAlmacenaje.FechaCreacion = DateTime.Now;
                    ordenAlmacenaje.Activo = true;
                    ordenAlmacenaje.FechaModificacion = DateTime.Now;
                    ordenAlmacenaje.UsuarioModificacion = 1; //usuario.UsuarioID;

                    ctx.Sam3_OrdenAlmacenaje.Add(ordenAlmacenaje);
                    ctx.SaveChanges();

                    //guardar relacion OA con NU
                    foreach(var item in listaNU)
                    {
                        Sam3_Rel_OrdenAlmacenaje_NumeroUnico relOrdenAlmacenaje = new Sam3_Rel_OrdenAlmacenaje_NumeroUnico();
                        relOrdenAlmacenaje.OrdenAlmacenajeID = ordenAlmacenaje.OrdenAlmacenajeID;
                        relOrdenAlmacenaje.NumeroUnicoID = item;
                        relOrdenAlmacenaje.FechaCreacion = DateTime.Now;
                        relOrdenAlmacenaje.Activo = true;
                        relOrdenAlmacenaje.FechaModificacion = DateTime.Now;
                        relOrdenAlmacenaje.UsuarioModificacion = 1; //usuario.UsuarioID;
                        ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico.Add(relOrdenAlmacenaje);
                    }

                    ctx.SaveChanges();


                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("Ok");
                    result.ReturnMessage.Add(ordenAlmacenaje.OrdenAlmacenajeID.ToString());
                    result.ReturnCode = 200;
                    result.ReturnStatus = true;
                    result.IsAuthenicated = true;

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