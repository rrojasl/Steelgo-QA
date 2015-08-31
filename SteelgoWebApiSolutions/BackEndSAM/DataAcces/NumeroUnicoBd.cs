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
                                                                   NumeroUnico = r.Prefijo + "-" + r.Consecutivo.ToString(formato),
                                                                   Proyecto = p.Nombre
                                                               }).AsParallel().ToList();

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

        public object GenerarNumerosUnicosPorOrdenDeRecepcion(int ordenRecepcionID, Sam3_ProyectoConsecutivo consecutivo, Sam3_Usuario usuario, out string error)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope())
                {
                    using (SamContext ctx = new SamContext())
                    {
                        Sam3_ProyectoConfiguracion configuracion = ctx.Sam3_ProyectoConfiguracion.Where(
                            x => x.ProyectoID == consecutivo.ProyectoID).AsParallel().SingleOrDefault();

                        Sam3_FolioAvisoEntrada folioEntrada = (from r in ctx.Sam3_FolioAvisoEntrada
                                          join o in ctx.Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion on r.FolioAvisoEntradaID equals o.FolioAvisoEntradaID
                                          where r.Activo && o.Activo
                                          && o.OrdenRecepcionID == ordenRecepcionID
                                          select r).AsParallel().SingleOrDefault();

                        string prefijo = configuracion.PrefijoNumeroUnico;
                        int folio = consecutivo.ConsecutivoNumerounico;
                        string factura = folioEntrada.Factura;
                        string ordenCompra = folioEntrada.OrdenCompra;

                        //traemos los itemcodes de los que se van a generar numeros unicos
                        List<Sam3_ItemCode> itemCodes = (from r in ctx.Sam3_OrdenRecepcion
                                                         join rit in ctx.Sam3_Rel_OrdenRecepcion_ItemCode on r.OrdenRecepcionID equals rit.OrdenRecepcionID
                                                         join it in ctx.Sam3_ItemCode on rit.ItemCodeID equals it.ItemCodeID
                                                         where r.Activo && rit.Activo && it.Activo
                                                         && r.OrdenRecepcionID == ordenRecepcionID
                                                         select it).AsParallel().ToList();

                        //generar numeros unicos por cada itemcode
                        foreach (Sam3_ItemCode item in itemCodes)
                        {
                            
                            //tipo de material
                            if (item.TipoMaterialID == 1) // tubo
                            {
                                folio = folio + 1;
                                Sam3_NumeroUnico nuevoNU = new Sam3_NumeroUnico();
                                nuevoNU.Activo = true;
                                nuevoNU.ColadaID = item.ColadaID;
                                nuevoNU.Diametro1 = item.Diametro1.Value;
                                nuevoNU.Diametro2 = item.Diametro2.Value;
                                nuevoNU.Estatus = "D";
                                nuevoNU.EsVirtual = false;
                                nuevoNU.FechaModificacion = DateTime.Now;
                                nuevoNU.ItemCodeID = item.ItemCodeID;
                                nuevoNU.UsuarioModificacion = usuario.UsuarioID;
                                nuevoNU.Prefijo = prefijo;  
                                nuevoNU.Consecutivo = folio;
                                nuevoNU.FabricanteID = 1; //se establece como default pues este dato no se proporciona en cuantificacion
                                nuevoNU.Factura = factura;
                                nuevoNU.OrdenDeCompra = ordenCompra;
                                nuevoNU.ProveedorID = folioEntrada.ProveedorID;
                                nuevoNU.ProyectoID = configuracion.ProyectoID;
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

                                ctx.Sam3_NumeroUnicoMovimiento.Add(movimiento);

                            }
                            else //accesorio
                            {
                                for (int i = 0; i <= item.Cantidad; i++) // se genera un numero unico por cada pieza recibida de accesorios
                                {
                                    folio = folio + 1;
                                    Sam3_NumeroUnico nuevoNU = new Sam3_NumeroUnico();
                                    nuevoNU.Activo = true;
                                    nuevoNU.ColadaID = item.ColadaID;
                                    nuevoNU.Diametro1 = item.Diametro1.Value;
                                    nuevoNU.Diametro2 = item.Diametro2.Value;
                                    nuevoNU.Estatus = "D";
                                    nuevoNU.EsVirtual = false;
                                    nuevoNU.FechaModificacion = DateTime.Now;
                                    nuevoNU.ItemCodeID = item.ItemCodeID;
                                    nuevoNU.UsuarioModificacion = usuario.UsuarioID;
                                    nuevoNU.Prefijo = prefijo;
                                    nuevoNU.Consecutivo = folio;
                                    nuevoNU.FabricanteID = 1; //se establece como default pues este dato no se proporciona en cuantificacion
                                    nuevoNU.Factura = factura;
                                    nuevoNU.OrdenDeCompra = ordenCompra;
                                    nuevoNU.ProveedorID = folioEntrada.ProveedorID;
                                    nuevoNU.ProyectoID = configuracion.ProyectoID;
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
                                }
                            }
                        }
                        //actualizar el consecutivo
                        consecutivo.ConsecutivoNumerounico = folio;
                        ctx.SaveChanges(); // aplicamos todos los cambios
                    }
                    scope.Complete();
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
    }
}