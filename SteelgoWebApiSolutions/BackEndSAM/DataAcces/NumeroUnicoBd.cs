using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DatabaseManager.Sam3;
using DatabaseManager.Sam2;
using DatabaseManager.EntidadesPersonalizadas;
using BackEndSAM.Utilities;
using System.Web.Script.Serialization;
using BackEndSAM.Models;
using SecurityManager.Api.Models;
using System.Transactions;
using System.Globalization;

namespace BackEndSAM.DataAcces
{
    public class NumeroUnicoBd
    {
        private static readonly object _mutex = new object();
        private static NumeroUnicoBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private NumeroUnicoBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static NumeroUnicoBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new NumeroUnicoBd();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerInfoEtiquetas(int ordenRecepcionID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    int numeroDigitos = (from r in ctx.Sam3_OrdenRecepcion
                                         join rel in ctx.Sam3_Rel_OrdenRecepcion_ItemCode on r.OrdenRecepcionID equals rel.OrdenRecepcionID
                                         join i in ctx.Sam3_ItemCode on rel.ItemCodeID equals i.ItemCodeID
                                         join p in ctx.Sam3_ProyectoConfiguracion on i.ProyectoID equals p.ProyectoID
                                         where r.Activo && rel.Activo && i.Activo
                                         && r.OrdenRecepcionID == ordenRecepcionID
                                         select p.DigitosNumeroUnico).AsParallel().FirstOrDefault();

                    string formato = "D" + numeroDigitos.ToString();


                    List<InfoEtiquetaNumeroUnico> etiquetas = (from r in ctx.Sam3_NumeroUnico
                                                               join o in ctx.Sam3_Rel_OrdenRecepcion_ItemCode on r.ItemCodeID equals o.ItemCodeID
                                                               join it in ctx.Sam3_ItemCode on o.ItemCodeID equals it.ItemCodeID
                                                               join c in ctx.Sam3_Colada on r.ColadaID equals c.ColadaID
                                                               join p in ctx.Sam3_Proyecto on r.ProyectoID equals p.ProyectoID
                                                               where r.Activo && o.Activo
                                                               && o.OrdenRecepcionID == ordenRecepcionID
                                                               select new InfoEtiquetaNumeroUnico
                                                               {
                                                                   Cedula = r.Cedula,
                                                                   Certificado = c.NumeroCertificado,
                                                                   Colada = c.NumeroColada,
                                                                   Descripcion = it.DescripcionEspanol,
                                                                   Diametro1 = r.Diametro1.ToString(),
                                                                   Diametro2 = r.Diametro2.ToString(),
                                                                   ItemCode = it.Codigo,
                                                                   NumeroUnico = r.Prefijo + "-" + r.Consecutivo.ToString(),
                                                                   Proyecto = p.Nombre
                                                               }).AsParallel().ToList();

                    foreach (InfoEtiquetaNumeroUnico et in etiquetas)
                    {
                        List<string> elementos = et.NumeroUnico.Split('-').ToList();
                        int folio = Convert.ToInt32(elementos[1]);
                        et.NumeroUnico = elementos[0] + '-' + folio.ToString(formato);
                    }

#if DEBUG
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    string json = serializer.Serialize(etiquetas);
#endif

                    return etiquetas;
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

        public object GenerarNumerosUnicosPorOrdenDeRecepcion(int ordenRecepcionID, Sam3_Usuario usuario, out string error)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    //traemos los itemcodes de los que se van a generar numeros unicos
                    List<Sam3_ItemCode> itemCodes = (from r in ctx.Sam3_OrdenRecepcion
                                                     join rit in ctx.Sam3_Rel_OrdenRecepcion_ItemCode on r.OrdenRecepcionID equals rit.OrdenRecepcionID
                                                     join it in ctx.Sam3_ItemCode on rit.ItemCodeID equals it.ItemCodeID
                                                     where r.Activo && rit.Activo && it.Activo
                                                     && r.OrdenRecepcionID == ordenRecepcionID
                                                     select it).AsParallel().ToList();

                    Sam3_ProyectoConsecutivo consecutivos;
                    Sam3_ProyectoConfiguracion configuracion;
                    int folio = 0;
                    //generar numeros unicos por cada itemcode
                    foreach (Sam3_ItemCode item in itemCodes)
                    {
                        //traemos la confiduracion del proyecto registrado en el ItemCode
                        configuracion = ctx.Sam3_ProyectoConfiguracion.Where(x => x.ProyectoID == item.ProyectoID)
                           .AsParallel().FirstOrDefault();

                        consecutivos = ctx.Sam3_ProyectoConsecutivo.Where(x => x.ProyectoID == item.ProyectoID)
                           .AsParallel().FirstOrDefault();

                        folio = consecutivos.ConsecutivoNumerounico;

                        Sam3_FolioAvisoEntrada folioEntrada = (from i in ctx.Sam3_ItemCode
                                                               join rfi in ctx.Sam3_Rel_FolioCuantificacion_ItemCode on i.ItemCodeID equals rfi.ItemCodeID
                                                               join fc in ctx.Sam3_FolioCuantificacion on rfi.FolioCuantificacionID equals fc.FolioCuantificacionID
                                                               join fe in ctx.Sam3_FolioAvisoEntrada on fc.FolioAvisoEntradaID equals fe.FolioAvisoEntradaID
                                                               join fa in ctx.Sam3_FolioAvisoLlegada on fe.FolioAvisoLlegadaID equals fa.FolioAvisoLlegadaID
                                                               where i.ItemCodeID == item.ItemCodeID
                                                               select fe).AsParallel().FirstOrDefault();

                        if (folioEntrada == null)
                        {
                            folioEntrada = (from i in ctx.Sam3_ItemCode
                                            join rbi in ctx.Sam3_Rel_Bulto_ItemCode on i.ItemCodeID equals rbi.ItemCodeID
                                            join b in ctx.Sam3_Bulto on rbi.BultoID equals b.BultoID
                                            join fc in ctx.Sam3_FolioCuantificacion on b.FolioCuantificacionID equals fc.FolioCuantificacionID
                                            join fe in ctx.Sam3_FolioAvisoEntrada on fc.FolioAvisoEntradaID equals fe.FolioAvisoEntradaID
                                            join fa in ctx.Sam3_FolioAvisoLlegada on fe.FolioAvisoLlegadaID equals fa.FolioAvisoLlegadaID
                                            where i.ItemCodeID == item.ItemCodeID
                                            select fe).AsParallel().FirstOrDefault();
                        }

                        if (folioEntrada == null)
                        {
                            error = "Se produjo un error al generar Numeros Unicos";
                            return false;
                        }

                        //tipo de material
                        if (item.TipoMaterialID == 1) // tubo
                        {
                            folio = folio + 1;
                            Sam3_NumeroUnico nuevoNU = new Sam3_NumeroUnico();
                            nuevoNU.Activo = true;
                            nuevoNU.ColadaID = item.ColadaID > 0 ? item.ColadaID : 1;
                            nuevoNU.Diametro1 = item.Diametro1 != null ? item.Diametro1.Value : 0;
                            nuevoNU.Diametro2 = item.Diametro1 != null ? item.Diametro2.Value : 0;
                            nuevoNU.Estatus = "D"; //
                            nuevoNU.EsVirtual = false;
                            nuevoNU.FechaModificacion = DateTime.Now;
                            nuevoNU.ItemCodeID = item.ItemCodeID;
                            nuevoNU.UsuarioModificacion = usuario.UsuarioID;
                            nuevoNU.Prefijo = configuracion.PrefijoNumeroUnico;
                            nuevoNU.Consecutivo = folio;
                            nuevoNU.FabricanteID = 1; //se establece como default pues este dato no se proporciona en cuantificacion
                            nuevoNU.Factura = folioEntrada.Factura;
                            nuevoNU.OrdenDeCompra = folioEntrada.OrdenCompra;
                            nuevoNU.ProveedorID = folioEntrada.ProveedorID;
                            nuevoNU.ProyectoID = item.ProyectoID;
                            //----------------- por defaulto lo colocare en falso, ya en un ptoceso posterior podra modificarse
                            nuevoNU.TieneDano = false;
                            nuevoNU.MarcadoAsme = false;
                            nuevoNU.MarcadoGolpe = false;
                            nuevoNU.MarcadoPintura = false;
                            //--------------------------------------------------------------------------------------------------

                            ctx.Sam3_NumeroUnico.Add(nuevoNU);
                            ctx.SaveChanges(); // debemos guardar para obtener un nuevo id de numero unico

                            //Generamos el nuevo registro en inventario
                            Sam3_NumeroUnicoInventario inventario = new Sam3_NumeroUnicoInventario();
                            inventario.Activo = true;
                            inventario.CantidadDanada = 0; // en este punto no se conoce la cantidad dañada o si existe esta cantidad
                            inventario.CantidadRecibida = item.Cantidad.Value;
                            inventario.EsVirtual = false;
                            inventario.FechaModificacion = DateTime.Now;
                            inventario.InventarioFisico = inventario.CantidadRecibida;
                            inventario.InventarioBuenEstado = inventario.InventarioFisico - inventario.CantidadDanada;
                            inventario.InventarioCongelado = 0; // en este punto no existen los congelados;
                            inventario.InventarioDisponibleCruce = inventario.InventarioBuenEstado - inventario.InventarioCongelado;
                            inventario.InventarioTransferenciaCorte = 0; //en este punto no existe este dato
                            inventario.NumeroUnicoID = nuevoNU.NumeroUnicoID;
                            inventario.ProyectoID = nuevoNU.ProyectoID;
                            inventario.UsuarioModificacion = usuario.UsuarioID;

                            ctx.Sam3_NumeroUnicoInventario.Add(inventario);

                            //Generamos el registro en NumeroUnicoSegmento
                            Sam3_NumeroUnicoSegmento nuevoSegmento = new Sam3_NumeroUnicoSegmento();
                            nuevoSegmento.Activo = true;
                            nuevoSegmento.CantidadDanada = 0;
                            nuevoSegmento.FechaModificacion = DateTime.Now;
                            nuevoSegmento.InventarioFisico = item.Cantidad.Value;
                            nuevoSegmento.InventarioBuenEstado = nuevoSegmento.InventarioFisico - nuevoSegmento.CantidadDanada;
                            nuevoSegmento.InventarioCongelado = 0;
                            nuevoSegmento.InventarioDisponibleCruce = nuevoSegmento.InventarioBuenEstado - nuevoSegmento.InventarioCongelado;
                            nuevoSegmento.InventarioTransferenciaCorte = 0;
                            nuevoSegmento.NumeroUnicoID = nuevoNU.NumeroUnicoID;
                            nuevoSegmento.ProyectoID = nuevoNU.ProyectoID;
                            nuevoSegmento.Segmento = "A";
                            nuevoSegmento.UsuarioModificacion = usuario.UsuarioID;

                            ctx.Sam3_NumeroUnicoSegmento.Add(nuevoSegmento);

                            //Agregamos el registro de movimiento
                            Sam3_NumeroUnicoMovimiento movimiento = new Sam3_NumeroUnicoMovimiento();
                            movimiento.Activo = true;
                            movimiento.Cantidad = item.Cantidad.Value;
                            movimiento.Estatus = "A";
                            movimiento.FechaModificacion = DateTime.Now;
                            movimiento.FechaMovimiento = DateTime.Now;
                            movimiento.NumeroUnicoID = nuevoNU.NumeroUnicoID;
                            movimiento.ProyectoID = nuevoNU.ProyectoID;
                            movimiento.Referencia = "Recepcion";
                            movimiento.Segmento = "A";
                            movimiento.TipoMovimientoID = 1; //este debe ser recepcion
                            movimiento.UsuarioModificacion = usuario.UsuarioID;

                            consecutivos.ConsecutivoNumerounico = folio;
                            ctx.Sam3_NumeroUnicoMovimiento.Add(movimiento);
                            ctx.SaveChanges();

                            //Actualizar el ItemCode para indicar que ya tiene un numero unico
                            if (ctx.Sam3_Rel_FolioCuantificacion_ItemCode.Where(x => x.ItemCodeID == item.ItemCodeID).Any())
                            {
                                Sam3_Rel_FolioCuantificacion_ItemCode actualizarRelacion = ctx.Sam3_Rel_FolioCuantificacion_ItemCode
                                    .Where(x => x.ItemCodeID == item.ItemCodeID).AsParallel().SingleOrDefault();
                                actualizarRelacion.TieneNumerosUnicos = true;
                                actualizarRelacion.FechaModificacion = DateTime.Now;
                                actualizarRelacion.UsuarioModificacion = usuario.UsuarioID;
                                ctx.SaveChanges();
                            }

                            if (ctx.Sam3_Rel_Bulto_ItemCode.Where(x => x.ItemCodeID == item.ItemCodeID).Any())
                            {
                                Sam3_Rel_Bulto_ItemCode relacion = ctx.Sam3_Rel_Bulto_ItemCode.Where(x => x.ItemCodeID == item.ItemCodeID).AsParallel().SingleOrDefault();
                                relacion.TieneNumerosUnicos = true;
                                relacion.FechaModificacion = DateTime.Now;
                                relacion.UsuarioModificacion = usuario.UsuarioID;
                                ctx.SaveChanges();
                            }

                        }
                        else //accesorio
                        {
                            for (int i = 0; i <= item.Cantidad; i++) // se genera un numero unico por cada pieza recibida de accesorios
                            {
                                folio = folio + 1;
                                Sam3_NumeroUnico nuevoNU = new Sam3_NumeroUnico();
                                nuevoNU.Activo = true;
                                nuevoNU.ColadaID = item.ColadaID != null && item.ColadaID > 0 ? item.ColadaID : 1;
                                nuevoNU.Diametro1 = item.Diametro1 != null ? item.Diametro1.Value : 0;
                                nuevoNU.Diametro2 = item.Diametro2 != null ? item.Diametro2.Value : 0;
                                nuevoNU.Estatus = "D";
                                nuevoNU.EsVirtual = false;
                                nuevoNU.FechaModificacion = DateTime.Now;
                                nuevoNU.ItemCodeID = item.ItemCodeID;
                                nuevoNU.UsuarioModificacion = usuario.UsuarioID;
                                nuevoNU.Prefijo = configuracion.PrefijoNumeroUnico;
                                nuevoNU.Consecutivo = folio;
                                nuevoNU.FabricanteID = 1; //se establece como default pues este dato no se proporciona en cuantificacion
                                nuevoNU.Factura = folioEntrada.Factura;
                                nuevoNU.OrdenDeCompra = folioEntrada.OrdenCompra;
                                nuevoNU.ProveedorID = folioEntrada.ProveedorID;
                                nuevoNU.ProyectoID = item.ProyectoID;
                                //----------------- por defaulto lo colocare en falso, ya en un ptoceso posterior podra modificarse
                                nuevoNU.TieneDano = false;
                                nuevoNU.MarcadoAsme = false;
                                nuevoNU.MarcadoGolpe = false;
                                nuevoNU.MarcadoPintura = false;
                                //--------------------------------------------------------------------------------------------------

                                ctx.Sam3_NumeroUnico.Add(nuevoNU);
                                ctx.SaveChanges(); // debemos guardar para obtener un nuevo id de numero unico

                                //Generamos el nuevo registro en inventario
                                Sam3_NumeroUnicoInventario inventario = new Sam3_NumeroUnicoInventario();
                                inventario.Activo = true;
                                inventario.CantidadDanada = 0; // en este punto no se conoce la cantidad dañada o si existe esta cantidad
                                inventario.CantidadRecibida = 1;
                                inventario.EsVirtual = false;
                                inventario.FechaModificacion = DateTime.Now;
                                inventario.InventarioFisico = inventario.CantidadRecibida;
                                inventario.InventarioBuenEstado = inventario.InventarioFisico - inventario.CantidadDanada;
                                inventario.InventarioCongelado = 0; // en este punto no existen los congelados;
                                inventario.InventarioDisponibleCruce = inventario.InventarioBuenEstado - inventario.InventarioCongelado;
                                inventario.InventarioTransferenciaCorte = 0; //en este punto no existe este dato
                                inventario.NumeroUnicoID = nuevoNU.NumeroUnicoID;
                                inventario.ProyectoID = nuevoNU.ProyectoID;
                                inventario.UsuarioModificacion = usuario.UsuarioID;

                                ctx.Sam3_NumeroUnicoInventario.Add(inventario);

                                //Agregamos el registro de movimiento
                                Sam3_NumeroUnicoMovimiento movimiento = new Sam3_NumeroUnicoMovimiento();
                                movimiento.Activo = true;
                                movimiento.Cantidad = 1;
                                movimiento.Estatus = "A";
                                movimiento.FechaModificacion = DateTime.Now;
                                movimiento.FechaMovimiento = DateTime.Now;
                                movimiento.NumeroUnicoID = nuevoNU.NumeroUnicoID;
                                movimiento.ProyectoID = nuevoNU.ProyectoID;
                                movimiento.Referencia = "Recepcion";
                                movimiento.TipoMovimientoID = 1; //este debe ser recepcion
                                movimiento.UsuarioModificacion = usuario.UsuarioID;

                                ctx.Sam3_NumeroUnicoMovimiento.Add(movimiento);
                                ctx.SaveChanges();
                            }// fin for
                            consecutivos.ConsecutivoNumerounico = folio;
                            ctx.SaveChanges();

                            //Actualizar el ItemCode para indicar que ya tiene un numero unico
                            if (ctx.Sam3_Rel_FolioCuantificacion_ItemCode.Where(x => x.ItemCodeID == item.ItemCodeID).Any())
                            {
                                Sam3_Rel_FolioCuantificacion_ItemCode actualizarRelacion = ctx.Sam3_Rel_FolioCuantificacion_ItemCode
                                    .Where(x => x.ItemCodeID == item.ItemCodeID).AsParallel().SingleOrDefault();
                                actualizarRelacion.TieneNumerosUnicos = true;
                                actualizarRelacion.FechaModificacion = DateTime.Now;
                                actualizarRelacion.UsuarioModificacion = usuario.UsuarioID;
                                ctx.SaveChanges();
                            }

                            if (ctx.Sam3_Rel_Bulto_ItemCode.Where(x => x.ItemCodeID == item.ItemCodeID).Any())
                            {
                                Sam3_Rel_Bulto_ItemCode relacion = ctx.Sam3_Rel_Bulto_ItemCode.Where(x => x.ItemCodeID == item.ItemCodeID).AsParallel().SingleOrDefault();
                                relacion.TieneNumerosUnicos = true;
                                relacion.FechaModificacion = DateTime.Now;
                                relacion.UsuarioModificacion = usuario.UsuarioID;
                                ctx.SaveChanges();
                            }
                        }// else
                    }// foreach
                    error = "";
                    return true;
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
                return false;
            }
        }

        public object ListadoNumerosUnicosCorte(int proyectoID, string busqueda, Sam3_Usuario usuario)
        {
            try
            {
                List<ListaComboNumeroUnicoCOrte> listado = new List<ListaComboNumeroUnicoCOrte>();
                using (SamContext ctx = new SamContext())
                {
                    using (Sam2Context ctx2 = new Sam2Context())
                    {

                        char[] elementosBusqueda = busqueda.ToCharArray();
                        List<string> buscar = new List<string>();
                        string temp = "%";
                        foreach (char i in elementosBusqueda)
                        {
                            buscar.Add(i.ToString());
                            temp += i + "%";
                        }

                        int sam2_proyectoID = ctx.Sam3_EquivalenciaProyecto.Where(x => x.Sam3_ProyectoID == proyectoID)
                            .Select(x => x.Sam2_ProyectoID).AsParallel().SingleOrDefault();

                        //Busco los numeros unicos con despachos pendientes en sam 2
                        List<int> sam2_NumerosUnicos = (from nu in ctx2.NumeroUnico
                                                        join odtm in ctx2.OrdenTrabajoMaterial on nu.NumeroUnicoID equals odtm.NumeroUnicoCongeladoID
                                                        join odts in ctx2.OrdenTrabajoSpool on odtm.OrdenTrabajoSpoolID equals odts.OrdenTrabajoSpoolID
                                                        join it in ctx2.ItemCode on nu.ItemCodeID equals it.ItemCodeID
                                                        where nu.ProyectoID == sam2_proyectoID
                                                        && odtm.CorteDetalleID == null && odtm.DespachoID == null
                                                        && !(from sh in ctx2.SpoolHold
                                                             where sh.SpoolID == odts.SpoolID
                                                             && (sh.Confinado || sh.TieneHoldCalidad || sh.TieneHoldIngenieria)
                                                             select sh).Any()
                                                        && it.TipoMaterialID == 1
                                                        && buscar.Any(x => nu.Codigo.Contains(x))
                                                        select nu.NumeroUnicoID).Distinct().AsParallel().ToList();

                        //ahora buscamos las equivalencias de esos numeros unicos en sam 3

                        List<int> sam3_NumerosUnicos = (from nueq in ctx.Sam3_EquivalenciaNumeroUnico
                                                        where nueq.Activo
                                                        && sam2_NumerosUnicos.Contains(nueq.Sam2_NumeroUnicoID)
                                                        select nueq.Sam3_NumeroUnicoID).Distinct().AsParallel().ToList();

                        listado = (from nu in ctx.Sam3_NumeroUnico
                                   join nus in ctx.Sam3_NumeroUnicoSegmento on nu.NumeroUnicoID equals nus.NumeroUnicoID
                                   where nu.Activo && nus.Activo
                                   && sam3_NumerosUnicos.Contains(nu.NumeroUnicoID)
                                   select new ListaComboNumeroUnicoCOrte
                                   {
                                       NumeroControlID = nu.NumeroUnicoID.ToString(),
                                       NumeroControl = nu.Prefijo + "-" + nu.Consecutivo + "-" + nus.Segmento
                                   }).Distinct().AsParallel().ToList();

                        Sam3_ProyectoConfiguracion configuracion = ctx.Sam3_ProyectoConfiguracion.Where(x => x.ProyectoID == proyectoID).AsParallel().SingleOrDefault();

                        foreach (ListaComboNumeroUnicoCOrte lst in listado)
                        {
                            string formato = "D" + configuracion.DigitosNumeroUnico.ToString();
                            string[] elementos = lst.NumeroControl.Split('-').ToArray();
                            int consecutivo = Convert.ToInt32(elementos[1]);
                            string codigo = elementos[0] + "-" + consecutivo.ToString(formato) + "-" + elementos[2];
                            lst.NumeroControl = codigo;
                        }
                    }
                }
                return listado;
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

        public object DetalleNumeroUnicoCorte(int numeroUnicoID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    return (from nu in ctx.Sam3_NumeroUnico
                            join nui in ctx.Sam3_NumeroUnicoInventario on nu.NumeroUnicoID equals nui.NumeroUnicoID
                            join it in ctx.Sam3_ItemCode on nu.ItemCodeID equals it.ItemCodeID
                            join pc in ctx.Sam3_ProyectoConfiguracion on nu.ProyectoID equals pc.ProyectoID
                            where nu.Activo && nui.Activo && it.Activo && pc.Activo
                            && nu.NumeroUnicoID == numeroUnicoID
                            select new DetalleNumeroUnicoCorte
                            {
                                Cantidad = nui.InventarioFisico.ToString(),
                                D1 = nu.Diametro1.ToString(),
                                ItemCode = it.Codigo,
                                Tolerancia = pc.ToleranciaCortes.Value.ToString()
                            }).Distinct().AsParallel().SingleOrDefault();
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