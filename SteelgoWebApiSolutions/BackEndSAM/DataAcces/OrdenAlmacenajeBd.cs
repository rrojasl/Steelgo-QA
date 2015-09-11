using BackEndSAM.Models;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

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

        //obtener los folios de cuantificacion
        public object ObtenerFoliosCuantificacionOrdenAlmacenaje(int proyectoID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    //Si es Folio Cuantificacion
                    List<ListaCombos> lstFolios = (from fc in ctx.Sam3_FolioCuantificacion
                                                   where fc.ProyectoID == proyectoID
                                                   && fc.Activo
                                                   select new ListaCombos
                                                   {
                                                       id = fc.FolioCuantificacionID.ToString(),
                                                       value = fc.FolioCuantificacionID.ToString()
                                                   }).AsParallel().ToList();
                    return lstFolios;
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

        public object ObtenerItemCodesOrdenAlmacenaje(int folioCuantificacion, Sam3_Usuario usuario)
        {
            List<ListaCombos> ComboItemCode = new List<ListaCombos>();

            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ComboItemCode = (from ic in ctx.Sam3_ItemCode
                                     join rfc in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on ic.ItemCodeID equals rfc.ItemCodeID
                                     where ic.Activo && rfc.Activo
                                     && rfc.FolioCuantificacionID == folioCuantificacion
                                     && (from ror in ctx.Sam3_Rel_OrdenRecepcion_ItemCode
                                         where ror.Activo
                                         select ror.ItemCodeID).Contains(ic.ItemCodeID)
                                     select new ListaCombos
                                     {
                                         id = ic.ItemCodeID.ToString(),
                                         value = ic.Codigo
                                     }).AsParallel().ToList();
                }

                return ComboItemCode;
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

        public object ObtenerNumerosUnicosOrdenAlmacenaje(int itemCode, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<NumerosUnicos> listado = new List<NumerosUnicos>();
                    listado = (from nu in ctx.Sam3_NumeroUnico
                               where nu.Activo
                               && nu.ItemCodeID == itemCode
                               && !(from roa in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico
                                    where roa.Activo
                                    select roa.NumeroUnicoID).Contains(nu.NumeroUnicoID)
                               select new NumerosUnicos
              {
                  NumeroUnicoID = nu.NumeroUnicoID.ToString(),
                  NumeroUnico = nu.Prefijo + "-" + nu.Consecutivo
              }).AsParallel().ToList();

                    foreach (var nu in listado)
                    {
                        int numeroDigitos = (from it in ctx.Sam3_ItemCode
                                             join pc in ctx.Sam3_ProyectoConfiguracion on it.ProyectoID equals pc.ProyectoID
                                             where it.ItemCodeID == itemCode
                                             select pc.DigitosNumeroUnico).AsParallel().SingleOrDefault();

                        string formato = "D" + numeroDigitos.ToString();

                        string[] codigo = nu.NumeroUnico.Split('-').ToArray();
                        int consecutivo = Convert.ToInt32(codigo[1]);
                        nu.NumeroUnico = codigo[0] + "-" + consecutivo.ToString(formato);
                    }
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

        public object ObtenerListadoGenerarOrdenAlmacenaje(FiltrosOrdenAlmacenaje filtros, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    int proyectoID = filtros.ProyectoID != "" ? Convert.ToInt32(filtros.ProyectoID) : 0;
                    int folioCuantificacionID = filtros.FolioCuantificacionID != "" ? Convert.ToInt32(filtros.FolioCuantificacionID) : 0;
                    int itemCodeID = filtros.ItemCodeID != "" ? Convert.ToInt32(filtros.ItemCodeID) : 0;
                    int numeroUnicoID = filtros.NumeroUnicoID != "" ? Convert.ToInt32(filtros.NumeroUnicoID) : 0;

                    //Patios y proyectos del usuario
                    List<int> proyectos = ctx.Sam3_Rel_Usuario_Proyecto.Where(x => x.UsuarioID == usuario.UsuarioID).Select(x => x.ProyectoID).AsParallel().ToList();

                    List<int> patios = (from r in ctx.Sam3_Proyecto
                                        join p in ctx.Sam3_Patio on r.PatioID equals p.PatioID
                                        where r.Activo && proyectos.Contains(r.ProyectoID)
                                        select p.PatioID).AsParallel().GroupBy(x => x).Select(x => x.First()).ToList();
                    List<Sam3_FolioCuantificacion> registros;

                    //Obtengo los folios cuantificacion del usuario
                    if (proyectoID > 0)
                    {
                        registros = (from fc in ctx.Sam3_FolioCuantificacion
                                     join fe in ctx.Sam3_FolioAvisoEntrada on fc.FolioAvisoEntradaID equals fe.FolioAvisoEntradaID
                                     join rfp in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on fe.FolioAvisoLlegadaID equals rfp.FolioAvisoLlegadaID
                                     join p in ctx.Sam3_Proyecto on rfp.ProyectoID equals p.ProyectoID
                                     join pa in ctx.Sam3_Patio on p.PatioID equals pa.PatioID
                                     join rfc in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on fc.FolioCuantificacionID equals rfc.FolioCuantificacionID
                                     join ic in ctx.Sam3_ItemCode on rfc.ItemCodeID equals ic.ItemCodeID
                                     join nu in ctx.Sam3_NumeroUnico on rfc.ItemCodeID equals nu.ItemCodeID
                                     where fc.Activo && fe.Activo && rfp.Activo && p.Activo && pa.Activo && rfc.Activo && ic.Activo && nu.Activo
                                      && (from ror in ctx.Sam3_Rel_OrdenRecepcion_ItemCode
                                          where ror.Activo
                                          select ror.ItemCodeID).Contains(ic.ItemCodeID)
                                             && !(from roa in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico
                                                  where roa.Activo
                                                  select roa.NumeroUnicoID).Contains(nu.NumeroUnicoID)
                                     && proyectos.Contains(p.ProyectoID)
                                     && patios.Contains(pa.PatioID)
                                     && p.ProyectoID == proyectoID
                                     select fc).AsParallel().Distinct().ToList();

                    }
                    else
                    {
                        registros = (from fc in ctx.Sam3_FolioCuantificacion
                                     join fe in ctx.Sam3_FolioAvisoEntrada on fc.FolioAvisoEntradaID equals fe.FolioAvisoEntradaID
                                     join rfp in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on fe.FolioAvisoLlegadaID equals rfp.FolioAvisoLlegadaID
                                     join p in ctx.Sam3_Proyecto on rfp.ProyectoID equals p.ProyectoID
                                     join pa in ctx.Sam3_Patio on p.PatioID equals pa.PatioID
                                     join rfc in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on fc.FolioCuantificacionID equals rfc.FolioCuantificacionID
                                     join ic in ctx.Sam3_ItemCode on rfc.ItemCodeID equals ic.ItemCodeID
                                     join nu in ctx.Sam3_NumeroUnico on rfc.ItemCodeID equals nu.ItemCodeID

                                     where fc.Activo && fe.Activo && rfp.Activo && p.Activo && pa.Activo && rfc.Activo && ic.Activo && nu.Activo
                                      && (from ror in ctx.Sam3_Rel_OrdenRecepcion_ItemCode
                                          where ror.Activo
                                          select ror.ItemCodeID).Contains(ic.ItemCodeID)
                                             && !(from roa in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico
                                                  where roa.Activo
                                                  select roa.NumeroUnicoID).Contains(nu.NumeroUnicoID)
                                     && proyectos.Contains(p.ProyectoID)
                                     && patios.Contains(pa.PatioID)
                                     select fc).AsParallel().Distinct().ToList();
                    }

                    //Que sea igual al folio cuantificacion seleccionado 
                    if (folioCuantificacionID > 0)
                    {
                        registros = registros.Where(x => x.FolioCuantificacionID == folioCuantificacionID && x.Activo).AsParallel().ToList();

                    }

                    List<ListadoGenerarOrdenAlmacenaje> listado = new List<ListadoGenerarOrdenAlmacenaje>();


                    foreach (Sam3_FolioCuantificacion item in registros)
                    {
                        ListadoGenerarOrdenAlmacenaje orden = new ListadoGenerarOrdenAlmacenaje();
                        orden.FolioCuantificacion = item.FolioCuantificacionID.ToString();

                        orden.ItemCodes = (from rfc in ctx.Sam3_Rel_FolioCuantificacion_ItemCode
                                           join ic in ctx.Sam3_ItemCode on rfc.ItemCodeID equals ic.ItemCodeID
                                           join rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on rfc.ItemCodeID equals rics.ItemCodeID
                                           join ics in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                           join numu in ctx.Sam3_NumeroUnico on ic.ItemCodeID equals numu.ItemCodeID
                                           where rfc.Activo && ic.Activo && rics.Activo && ics.Activo
                                           && rfc.FolioCuantificacionID == item.FolioCuantificacionID
                                           && (from ror in ctx.Sam3_Rel_OrdenRecepcion_ItemCode
                                               where ror.Activo
                                               select ror.ItemCodeID).Contains(ic.ItemCodeID)
                                               && !(from roa in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico
                                                    where roa.Activo
                                                    select roa.NumeroUnicoID).Contains(numu.NumeroUnicoID)
                                           select new ElementoCuantificacionItemCode
                                           {
                                               ItemCodeID = ic.ItemCodeID.ToString(),
                                               Codigo = ic.Codigo,
                                               Descripcion = ics.DescripcionEspanol,
                                               Cantidad = (from nu in ctx.Sam3_NumeroUnico
                                                           where nu.ItemCodeID == ic.ItemCodeID
                                                           && !(from roa in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico
                                                                where roa.Activo
                                                                select roa.NumeroUnicoID).Contains(nu.NumeroUnicoID)
                                                           && nu.Activo
                                                           select nu.NumeroUnicoID).Count().ToString(),
                                               D1 = ics.Diametro1.ToString(),
                                               D2 = ics.Diametro2.ToString(),
                                               FolioCuantificacion = item.FolioCuantificacionID.ToString(),
                                               NumerosUnicos = (from nu in ctx.Sam3_NumeroUnico
                                                                where nu.ItemCodeID == ic.ItemCodeID
                                                                && !(from roa in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico
                                                                     where roa.Activo
                                                                     select roa.NumeroUnicoID).Contains(nu.NumeroUnicoID)
                                                                && nu.Activo
                                                                select new ElementoNumeroUnico
                                                                {
                                                                    FolioCuantificacion = item.FolioCuantificacionID.ToString(),
                                                                    ItemCodeID = ic.ItemCodeID.ToString(),
                                                                    NumeroUnicoID = nu.NumeroUnicoID.ToString(),
                                                                    NumeroUnico = nu.Prefijo + "-" + nu.Consecutivo
                                                                }).ToList()
                                           }).AsParallel().ToList();

                        foreach (var i in orden.ItemCodes)
                        {
                            foreach (var nu in i.NumerosUnicos)
                            {
                                int itemcodeID = Convert.ToInt32(i.ItemCodeID);
                                int numeroDigitos = (from it in ctx.Sam3_ItemCode
                                                     join pc in ctx.Sam3_ProyectoConfiguracion on it.ProyectoID equals pc.ProyectoID
                                                     where it.ItemCodeID == itemcodeID
                                                     select pc.DigitosNumeroUnico).AsParallel().SingleOrDefault();

                                string formato = "D" + numeroDigitos.ToString();

                                string[] codigo = nu.NumeroUnico.Split('-').ToArray();
                                int consecutivo = Convert.ToInt32(codigo[1]);
                                nu.NumeroUnico = codigo[0] + "-" + consecutivo.ToString(formato);
                            }

                            if (numeroUnicoID > 0)
                            {
                                i.NumerosUnicos = i.NumerosUnicos.Where(x => x.NumeroUnicoID == numeroUnicoID.ToString()).ToList();
                            }
                        }
                        if (itemCodeID > 0)
                        {
                            orden.ItemCodes = orden.ItemCodes.Where(x => x.ItemCodeID == itemCodeID.ToString()).ToList();
                        }

                        if (orden.ItemCodes.Count > 0)
                        {
                            listado.Add(orden);
                        }
                    }
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

        public List<int> ObtenerNumerosUnicosPorItemCode(List<int> itemcodes)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<int> numerosunicos = new List<int>();
                    foreach (var item in itemcodes)
                    {
                        numerosunicos.AddRange(from nu in ctx.Sam3_NumeroUnico
                                               where nu.Activo && nu.ItemCodeID == item
                                               select nu.NumeroUnicoID);
                    }
                    return numerosunicos;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<int> ObtenerItemCodesPorFolioCuantificacion(List<int> folioscuantificacion)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<int> itemcodes = new List<int>();

                    foreach (int i in folioscuantificacion)
                    {
                        itemcodes.AddRange(from rfc in ctx.Sam3_Rel_FolioCuantificacion_ItemCode
                                           where rfc.Activo && rfc.FolioCuantificacionID == i
                                           select rfc.ItemCodeID);
                    }

                    return itemcodes;
                }
            }
            catch (Exception ex)
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return null;
            }
        }

        public object GenerarOrdenAlmacenaje(ListadosFolios listaDatos, Sam3_Usuario usuario)
        {
            try
            {
                List<int> numerosunicos = new List<int>();

                if (listaDatos.listaNumerosUnicos.Count > 0)
                {
                    numerosunicos = listaDatos.listaNumerosUnicos.Select(x => x.ID).ToList();
                }

                if (listaDatos.listaItemCodes.Count > 0)
                {
                    //Obtengo los numero unicos
                    numerosunicos.AddRange(ObtenerNumerosUnicosPorItemCode(listaDatos.listaItemCodes.Select(x => x.ID).ToList()));
                }

                if (listaDatos.listaFoliosCuantificacion.Count > 0)
                {
                    //Se obtienen item codes Rel FC_IC
                    //se obtienen numeros unicos
                    List<int> ICporFolioCuantificacion = (ObtenerItemCodesPorFolioCuantificacion(listaDatos.listaFoliosCuantificacion.Select(x => x.ID).ToList()));

                    numerosunicos.AddRange(ObtenerNumerosUnicosPorItemCode(ICporFolioCuantificacion));
                }

                numerosunicos = numerosunicos.GroupBy(x => x).Select(x => x.First()).ToList();

                int consecutivo = 0;
                using (SamContext ctx = new SamContext())
                {
                    if (ctx.Sam3_OrdenAlmacenaje.Select(x => x.Folio).Any())
                    {
                        consecutivo = ctx.Sam3_OrdenAlmacenaje.Select(x => x.Folio).Max();
                        consecutivo = consecutivo > 0 ? consecutivo + 1 : 1;
                    }
                    else
                    {
                        consecutivo = 1;
                    }

                    //Insertamos en la tabla Orden Almacenaje
                    Sam3_OrdenAlmacenaje ordenAlmacenaje = new Sam3_OrdenAlmacenaje();
                    ordenAlmacenaje.Folio = consecutivo;
                    ordenAlmacenaje.FechaCreacion = DateTime.Now;
                    ordenAlmacenaje.Activo = true;
                    ordenAlmacenaje.FechaModificacion = DateTime.Now;
                    ordenAlmacenaje.UsuarioModificacion = usuario.UsuarioID;

                    ctx.Sam3_OrdenAlmacenaje.Add(ordenAlmacenaje);
                    ctx.SaveChanges();

                    //guardar relacion OA con cada numero unico
                    foreach (int item in numerosunicos)
                    {
                        Sam3_Rel_OrdenAlmacenaje_NumeroUnico relOrdenAlmacenaje = new Sam3_Rel_OrdenAlmacenaje_NumeroUnico();
                        relOrdenAlmacenaje.OrdenAlmacenajeID = ordenAlmacenaje.OrdenAlmacenajeID;
                        relOrdenAlmacenaje.NumeroUnicoID = item;
                        relOrdenAlmacenaje.FechaCreacion = DateTime.Now;
                        relOrdenAlmacenaje.Activo = true;
                        relOrdenAlmacenaje.FechaModificacion = DateTime.Now;
                        relOrdenAlmacenaje.UsuarioModificacion = usuario.UsuarioID;
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

        /// <summary>
        /// Genera un set de datos para el grid de listado de Ordenes de almacenaje
        /// </summary>
        /// <param name="filtros"></param>
        /// <param name="usuario"></param>
        /// <returns></returns>
        public object ListadoOrdeAlmacenaje(FiltrosJson filtros, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    DateTime fechaInicial = new DateTime();
                    DateTime fechaFinal = new DateTime();
                    DateTime.TryParse(filtros.FechaInicial, out fechaInicial);
                    DateTime.TryParse(filtros.FechaFinal, out fechaFinal);

                    if (fechaFinal.ToShortDateString() == "1/1/0001")
                    {
                        fechaFinal = DateTime.Now;
                    }

                    if (fechaInicial.ToShortDateString() == "1/1/0001")
                    {
                        int mes = DateTime.Now.Month != 1 ? DateTime.Now.Month - 1 : 12;
                        int year = DateTime.Now.Month == 1 ? DateTime.Now.Year - 1 : DateTime.Now.Year;
                        fechaInicial = new DateTime(year, mes, DateTime.Now.Day);
                    }

                    int proyectoID = filtros.ProyectoID != "" ? Convert.ToInt32(filtros.ProyectoID) : 0;
                    int clienteID = filtros.ClienteID != "" ? Convert.ToInt32(filtros.ClienteID) : 0;
                    int folioAvisoLlegadaID = filtros.FolioAvisoLlegadaID != null ? Convert.ToInt32(filtros.FolioAvisoLlegadaID) : 0;
                    int packingListID = filtros.PackingListID != "" ? Convert.ToInt32(filtros.PackingListID) : 0;

                    //Proyectos y patios del usuario
                    List<int> proyectos = ctx.Sam3_Rel_Usuario_Proyecto
                        .Where(x => x.UsuarioID == usuario.UsuarioID).Select(x => x.ProyectoID).AsParallel().ToList();

                    List<int> patios = (from r in ctx.Sam3_Proyecto
                                        join p in ctx.Sam3_Patio on r.PatioID equals p.PatioID
                                        where r.Activo && proyectos.Contains(r.ProyectoID)
                                        select p.PatioID).AsParallel().Distinct().ToList();

                    List<OrdenAlmacenajeJson> listado = new List<OrdenAlmacenajeJson>();

                    List<Sam3_OrdenAlmacenaje> ordenes = (from oa in ctx.Sam3_OrdenAlmacenaje
                                                          where oa.Activo 
                                                          && (oa.FechaCreacion >= fechaInicial && oa.FechaCreacion <= fechaFinal)
                                                          select oa).AsParallel().ToList();

                    ordenes = ordenes.GroupBy(x => x.OrdenAlmacenajeID).Select(x => x.First()).ToList();

                    foreach (Sam3_OrdenAlmacenaje orden in ordenes)
                    {
                        OrdenAlmacenajeJson elemento = new OrdenAlmacenajeJson();
                        elemento.FechaOrdenAlmacenaje = orden.FechaCreacion != null ? orden.FechaCreacion.ToString("dd/MM/yyyy") : "";
                        elemento.OrdenAlmacenaje = orden.OrdenAlmacenajeID.ToString();

                        if (packingListID > 0)
                        {
                            elemento.FolioCuantificacion = (from ronu in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico
                                                            join nu in ctx.Sam3_NumeroUnico on ronu.NumeroUnicoID equals nu.NumeroUnicoID
                                                            join rfci in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on nu.ItemCodeID equals rfci.ItemCodeID
                                                            join fc in ctx.Sam3_FolioCuantificacion on rfci.FolioCuantificacionID equals fc.FolioCuantificacionID
                                                            where ronu.OrdenAlmacenajeID == orden.OrdenAlmacenajeID
                                                            && fc.FolioCuantificacionID == packingListID
                                                            && ronu.Activo && nu.Activo && rfci.Activo && fc.Activo
                                                            select new PackingListCuantificacion
                                                            {
                                                                FolioCuantificacionID = fc.FolioCuantificacionID,
                                                                FolioCuantificacion = fc.PackingList,
                                                                OrdenAlmacenaje = orden.OrdenAlmacenajeID.ToString()
                                                            }).AsParallel().ToList();
                        }
                        else
                        {
                            elemento.FolioCuantificacion = (from ronu in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico
                                                            join nu in ctx.Sam3_NumeroUnico on ronu.NumeroUnicoID equals nu.NumeroUnicoID
                                                            join rfci in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on nu.ItemCodeID equals rfci.ItemCodeID
                                                            join fc in ctx.Sam3_FolioCuantificacion on rfci.FolioCuantificacionID equals fc.FolioCuantificacionID
                                                            where ronu.OrdenAlmacenajeID == orden.OrdenAlmacenajeID
                                                            && ronu.Activo && nu.Activo && rfci.Activo && fc.Activo
                                                            select new PackingListCuantificacion
                                                            {
                                                                FolioCuantificacionID = fc.FolioCuantificacionID,
                                                                FolioCuantificacion = fc.PackingList,
                                                                OrdenAlmacenaje = orden.OrdenAlmacenajeID.ToString()
                                                            }).AsParallel().ToList();
                        }

                        if (proyectoID > 0)
                        {
                            elemento.FolioCuantificacion = (from fc in elemento.FolioCuantificacion
                                                            join bfc in ctx.Sam3_FolioCuantificacion on fc.FolioCuantificacionID equals bfc.FolioCuantificacionID
                                                            where bfc.ProyectoID == proyectoID
                                                            && bfc.Activo
                                                            select fc).AsParallel().ToList();
                        }

                        if (clienteID > 0)
                        {
                            elemento.FolioCuantificacion = (from tfc in elemento.FolioCuantificacion
                                                            join fc in ctx.Sam3_FolioCuantificacion on tfc.FolioCuantificacionID equals fc.FolioCuantificacionID
                                                            join fe in ctx.Sam3_FolioAvisoEntrada on fc.FolioAvisoEntradaID equals fe.FolioAvisoEntradaID
                                                            where fc.Activo && fe.Activo
                                                            && fe.ClienteID == clienteID
                                                            select tfc).AsParallel().ToList();
                        }



                        elemento.FolioCuantificacion = elemento.FolioCuantificacion.GroupBy(x => x.FolioCuantificacionID).Select(x => x.First()).ToList();

                        foreach (PackingListCuantificacion folio in elemento.FolioCuantificacion)
                        {
                            folio.ItemCodes = (from rfci in ctx.Sam3_Rel_FolioCuantificacion_ItemCode
                                               join nu in ctx.Sam3_NumeroUnico on rfci.ItemCodeID equals nu.ItemCodeID
                                               join ronu in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico on nu.NumeroUnicoID equals ronu.NumeroUnicoID
                                               join it in ctx.Sam3_ItemCode on rfci.ItemCodeID equals it.ItemCodeID
                                               where rfci.FolioCuantificacionID == folio.FolioCuantificacionID
                                               && rfci.Activo && nu.Activo && ronu.Activo && it.Activo
                                               select new ElementoItemCodeGenerarOrdenAlmacenaje
                                               {
                                                   OrdenAlmacenaje = orden.OrdenAlmacenajeID.ToString(),
                                                   ItemCodeID = it.ItemCodeID.ToString(),
                                                   Codigo = it.Codigo,
                                                   NumeroUnico = nu.Prefijo + "-" + nu.Consecutivo,
                                                   NumeroUnicoID = ronu.NumeroUnicoID.ToString()
                                               }).AsParallel().ToList();

                            foreach (var i in folio.ItemCodes)
                            {
                                int itemcodeID = Convert.ToInt32(i.ItemCodeID);
                                int numeroDigitos = (from it in ctx.Sam3_ItemCode
                                                     join pc in ctx.Sam3_ProyectoConfiguracion on it.ProyectoID equals pc.ProyectoID
                                                     where it.ItemCodeID == itemcodeID
                                                     select pc.DigitosNumeroUnico).AsParallel().SingleOrDefault();

                                string formato = "D" + numeroDigitos.ToString();

                                string[] codigo = i.NumeroUnico.Split('-').ToArray();
                                int consecutivo = Convert.ToInt32(codigo[1]);
                                i.NumeroUnico = codigo[0] + "-" + consecutivo.ToString(formato);
                            }
                        }

                        listado.Add(elemento);
                    }


#if DEBUG
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    string json = serializer.Serialize(listado);
#endif
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

        /// <summary>
        /// Elimina un numero unico de la orden de almacenaje
        /// </summary>
        /// <param name="avisoLlegadaID"></param>
        /// <param name="usuario"></param>
        /// <returns>Aviso de exito o error</returns>
        public object EliminarNumeroUnicoOrdenAlmacenaje(string numerounico, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    int numerounicoid = Convert.ToInt32(numerounico);
                    Sam3_Rel_OrdenAlmacenaje_NumeroUnico almacenaje = ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico.Where(x => x.NumeroUnicoID == numerounicoid)
                        .AsParallel().SingleOrDefault();


                    almacenaje.Activo = false;
                    almacenaje.UsuarioModificacion = usuario.UsuarioID;
                    almacenaje.FechaModificacion = DateTime.Now;

                    ctx.SaveChanges();

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("Ok");
                    result.ReturnCode = 200;
                    result.ReturnStatus = false;
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

        public object EliminarOrdenAlmacenaje(int OrdenAlmacenajeID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_OrdenAlmacenaje orden = ctx.Sam3_OrdenAlmacenaje.Where(x => x.OrdenAlmacenajeID == OrdenAlmacenajeID).AsParallel().SingleOrDefault();
                    orden.Activo = false;
                    orden.FechaModificacion = DateTime.Now;
                    orden.UsuarioModificacion = usuario.UsuarioID;

                    List<Sam3_Rel_OrdenAlmacenaje_NumeroUnico> relacion = ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico.Where(x => x.OrdenAlmacenajeID == OrdenAlmacenajeID)
                        .AsParallel().ToList();

                    foreach (Sam3_Rel_OrdenAlmacenaje_NumeroUnico r in relacion)
                    {
                        r.Activo = false;
                        r.FechaModificacion = DateTime.Now;
                        r.UsuarioModificacion = usuario.UsuarioID;
                    }

                    ctx.SaveChanges();

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("Ok");
                    result.ReturnCode = 200;
                    result.ReturnStatus = false;
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

        public object ObtenerDetalleOrdenAlmacenaje(int ordenAlmacenajeID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<ListadoGenerarOrdenAlmacenaje> listado = new List<ListadoGenerarOrdenAlmacenaje>();
                   

                    //Obtengo los folios Cuantificacion que tienen orden de almacenaje
                    List<Sam3_FolioCuantificacion> folios = (from roa in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico
                                                             join nu in ctx.Sam3_NumeroUnico on roa.NumeroUnicoID equals nu.NumeroUnicoID
                                                             join ric in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on nu.ItemCodeID equals ric.ItemCodeID
                                                             join fc in ctx.Sam3_FolioCuantificacion on ric.FolioCuantificacionID equals fc.FolioCuantificacionID
                                                             where roa.Activo && nu.Activo && ric.Activo && fc.Activo
                                                             && roa.OrdenAlmacenajeID == ordenAlmacenajeID
                                                             select fc).AsParallel().ToList();


                    folios = folios.GroupBy(x => x.FolioCuantificacionID).Select(x => x.First()).ToList();

                    foreach (Sam3_FolioCuantificacion item in folios)
                    {
                        ListadoGenerarOrdenAlmacenaje listadoOrdenAlmacenaje = new ListadoGenerarOrdenAlmacenaje();

                        listadoOrdenAlmacenaje.FolioCuantificacion = item.FolioCuantificacionID.ToString();

                        listadoOrdenAlmacenaje.ItemCodes = (from roa in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico 
                                                            join num in ctx.Sam3_NumeroUnico on roa.NumeroUnicoID equals num.NumeroUnicoID
                                                            join ic in ctx.Sam3_ItemCode on num.ItemCodeID equals ic.ItemCodeID
                                                            join rfc in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on ic.ItemCodeID equals rfc.ItemCodeID
                                                            join ric in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on rfc.ItemCodeID equals ric.ItemCodeID
                                                            join ics in ctx.Sam3_ItemCodeSteelgo on ric.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                                            join p in ctx.Sam3_Proyecto on item.ProyectoID equals p.ProyectoID
                                                            where roa.Activo && num.Activo && ic.Activo && rfc.Activo && ric.Activo && ics.Activo && p.Activo
                                                            && roa.OrdenAlmacenajeID == ordenAlmacenajeID 
                                                            && rfc.FolioCuantificacionID == item.FolioCuantificacionID
                                                     select new ElementoCuantificacionItemCode
                                                     {
                                                         ItemCodeID = ic.ItemCodeID.ToString(),
                                                         Codigo = ic.Codigo,
                                                         Descripcion = ics.DescripcionEspanol,
                                                         Cantidad = ( from oar in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico
                                                                      join numuni in ctx.Sam3_NumeroUnico on oar.NumeroUnicoID equals numuni.NumeroUnicoID
                                                                      join itc in ctx.Sam3_ItemCode on numuni.ItemCodeID equals itc.ItemCodeID
                                                                      //join rfcic in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on itc.ItemCodeID equals rfcic.ItemCodeID
                                                                      where oar.Activo && numuni.Activo && itc.Activo //&& rfcic.Activo
                                                                      && oar.OrdenAlmacenajeID == ordenAlmacenajeID 
                                                                      //&& rfcic.FolioCuantificacionID == item.FolioCuantificacionID
                                                                      && itc.ItemCodeID == ic.ItemCodeID
                                                                      select oar.NumeroUnicoID).Count().ToString(),
                                                         D1 = ics.Diametro1.ToString(),
                                                         D2 = ics.Diametro2.ToString(),
                                                         FolioCuantificacion = item.FolioCuantificacionID.ToString(),
                                                         Proyecto = p.Nombre,
                                                         ProyectoID = item.ProyectoID.ToString(),
                                                         NumerosUnicos = (from oar in ctx.Sam3_Rel_OrdenAlmacenaje_NumeroUnico
                                                                          join numuni in ctx.Sam3_NumeroUnico on oar.NumeroUnicoID equals numuni.NumeroUnicoID
                                                                          join itc in ctx.Sam3_ItemCode on numuni.ItemCodeID equals itc.ItemCodeID
                                                                          where oar.Activo && numuni.Activo && itc.Activo //&& rfcic.Activo
                                                                          && oar.OrdenAlmacenajeID == ordenAlmacenajeID
                                                                          && numuni.ItemCodeID == ic.ItemCodeID
                                                                          select new ElementoNumeroUnico
                                                                          {
                                                                              FolioCuantificacion = item.FolioCuantificacionID.ToString(),
                                                                              ItemCodeID = ic.ItemCodeID.ToString(),
                                                                              NumeroUnicoID = oar.NumeroUnicoID.ToString(),
                                                                              NumeroUnico = numuni.Prefijo + "-" + numuni.Consecutivo
                                                                          }).ToList()
                                                     }).AsParallel().ToList();

                        listadoOrdenAlmacenaje.ItemCodes = listadoOrdenAlmacenaje.ItemCodes.GroupBy(x => x.ItemCodeID).Select(x => x.First()).ToList();

                        foreach (var i in listadoOrdenAlmacenaje.ItemCodes)
                        {
                            foreach (var nu in i.NumerosUnicos)
                            {
                                int itemcodeID = Convert.ToInt32(i.ItemCodeID);
                                int numeroDigitos = (from it in ctx.Sam3_ItemCode
                                                     join pc in ctx.Sam3_ProyectoConfiguracion on it.ProyectoID equals pc.ProyectoID
                                                     where it.ItemCodeID == itemcodeID
                                                     select pc.DigitosNumeroUnico).AsParallel().SingleOrDefault();
                                string formato = "D" + numeroDigitos.ToString();

                                string[] codigo = nu.NumeroUnico.Split('-').ToArray();
                                int consecutivo = Convert.ToInt32(codigo[1]);
                                nu.NumeroUnico = codigo[0] + "-" + consecutivo.ToString(formato);
                            }
                        }
                        listado.Add(listadoOrdenAlmacenaje);
                    }
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

    }
}