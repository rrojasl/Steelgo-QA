using System;
using System.Collections.Generic;
using System.Linq;
using DatabaseManager.Sam2;
using DatabaseManager.Sam3;
using BackEndSAM.Models;
using SecurityManager.Api.Models;
using System.Web.Script.Serialization;
using System.Transactions;


namespace BackEndSAM.DataAcces
{
    public class CorteBd 
    {
        private static readonly object _mutex = new object();
        private static CorteBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private CorteBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static CorteBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new CorteBd();
                    }
                }
                return _instance;
            }
        }

        public object ListadoGenerarCorte(ParametrosBusquedaODT filtros, Sam3_Usuario usuario)
        {
            try 
            {
                List<int> proyectos = new List<int>();
                List<int> patios = new List<int>();
                DatosBusquedaODT listado = new DatosBusquedaODT();
                using (SamContext ctx = new SamContext())
                {
                    using (Sam2Context ctx2 = new Sam2Context())
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

                        //buscamos el numero unico
                        int sam3_numeroUnicoID = Convert.ToInt32(filtros.DatosODT.NumerUnicoID);

                        Sam3_NumeroUnico numeroUnicoCorte = ctx.Sam3_NumeroUnico.Where(x => x.NumeroUnicoID == sam3_numeroUnicoID)
                            .AsParallel().SingleOrDefault();

                        //buscamos su equivalente en SAM 2
                        int sam2_numeroUnicoID = (from nueq in ctx.Sam3_EquivalenciaNumeroUnico
                                                  where nueq.Activo && nueq.Sam3_NumeroUnicoID == sam3_numeroUnicoID
                                                  select nueq.Sam2_NumeroUnicoID).AsParallel().SingleOrDefault();

                        //armamos el numero de control.
                        Sam3_ProyectoConfiguracion configuracion = ctx.Sam3_ProyectoConfiguracion.Where(x => x.ProyectoID == numeroUnicoCorte.ProyectoID)
                            .AsParallel().SingleOrDefault();

                        char[] lstElementoNumeroControl = filtros.DatosODT.OrdenTrabajo.ToCharArray();
                        List<string> elementos = new List<string>();
                        foreach(char i in lstElementoNumeroControl)
                        {
                            elementos.Add(i.ToString());
                        }

                        elementos.Add(filtros.DatosODT.Consecutivo);

                        listado = (from odtm in ctx2.OrdenTrabajoMaterial
                                                    join odts in ctx2.OrdenTrabajoSpool on odtm.OrdenTrabajoSpoolID equals odts.OrdenTrabajoSpoolID
                                                    join ms in ctx2.MaterialSpool on odtm.MaterialSpoolID equals ms.MaterialSpoolID
                                                    join nu in ctx2.NumeroUnico on odtm.NumeroUnicoCongeladoID equals nu.NumeroUnicoID
                                                    join it in ctx2.ItemCode on nu.ItemCodeID equals it.ItemCodeID
                                                    where elementos.Any(x => odts.NumeroControl.Contains(x))
                                                    && ms.Etiqueta.Contains(filtros.DatosODT.Etiqueta)
                                                    && odtm.NumeroUnicoCongeladoID == sam2_numeroUnicoID
                                                    && it.TipoMaterialID == 1
                                                    select new DatosBusquedaODT
                                                    {
                                                        Cantidad = odtm.CantidadCongelada.Value,
                                                        CantidadIngenieria = odtm.CantidadCongelada.Value,
                                                        SpoolID = odts.NumeroControl,
                                                        Etiqueta = ms.Etiqueta
                                                    }).Distinct().AsParallel().SingleOrDefault();

 
                    }// fin sam2
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

        public object GenerarCorte(GuardarCorte corte, Sam3_Usuario usuario)
        {
            try
            {
                Sam3_Corte nuevoCorte = new Sam3_Corte();
                List<Sam3_CorteDetalle> detalleCorte = new List<Sam3_CorteDetalle>();
                using (TransactionScope scope = new TransactionScope())
                {
                    using (SamContext ctx = new SamContext())
                    {
                        using (Sam2Context ctx2 = new Sam2Context())
                        {
                            int numeroUnicoID = Convert.ToInt32(corte.NumeroUnico);
                            

                            //recuperamos los numeros unicos con inventarios
                            //sam3
                            Sam3_NumeroUnico numeroUnicoCorte = ctx.Sam3_NumeroUnico
                                .Include("Sam3_NumeroUnicoInventario")
                                .Include("Sam3_NumeroUnicoSegmente")
                                .Include("Sam3_NumeroUnicoMovimiento")
                                .Where(x => x.NumeroUnicoID == numeroUnicoID).AsParallel().SingleOrDefault();



                            //sam2
                            int sam2_numeroUnicoID = (from eq in ctx.Sam3_EquivalenciaNumeroUnico
                                                      where eq.Activo && eq.Sam3_NumeroUnicoID == numeroUnicoID
                                                      select eq.Sam2_NumeroUnicoID).AsParallel().SingleOrDefault();
                            
                            NumeroUnico sam2_numeroUnicoCorte = ctx2.NumeroUnico
                                .Include("NumeroUnicoInventario")
                                .Include("NumeroUnicoSegmento")
                                .Include("NumeroUnicoMovimiento")
                                .Where(x => x.NumeroUnicoID == sam2_numeroUnicoID).AsParallel().SingleOrDefault();

                            


                            //Generar movimientos de inventario
                            //Movimeinto de Preparacion a corte
                            Sam3_NumeroUnicoMovimiento movimientoPreparacionCorte = new Sam3_NumeroUnicoMovimiento();
                            movimientoPreparacionCorte.Activo = true;
                            movimientoPreparacionCorte.Cantidad = numeroUnicoCorte.Sam3_NumeroUnicoInventario.InventarioFisico;
                            movimientoPreparacionCorte.Estatus = "A";
                            movimientoPreparacionCorte.FechaModificacion = DateTime.Now;
                            movimientoPreparacionCorte.FechaMovimiento = DateTime.Now;
                            movimientoPreparacionCorte.NumeroUnicoID = numeroUnicoCorte.NumeroUnicoID;
                            movimientoPreparacionCorte.ProyectoID = numeroUnicoCorte.ProyectoID;
                            movimientoPreparacionCorte.Segmento = corte.Segmento;
                            movimientoPreparacionCorte.TipoMovimientoID = (from tpm in ctx.Sam3_TipoMovimiento
                                                                           where tpm.Activo && tpm.Nombre == "Preparación para Corte"
                                                                           select tpm.TipoMovimientoID).AsParallel().SingleOrDefault();
                            movimientoPreparacionCorte.UsuarioModificacion = usuario.UsuarioID;

                            ctx.Sam3_NumeroUnicoMovimiento.Add(movimientoPreparacionCorte);
                            ctx.SaveChanges();

                            int Sam3_MovimientoPreparacionID = movimientoPreparacionCorte.NumeroUnicoMovimientoID;

                            Sam3_NumeroUnicoMovimiento movimientoMerma = new Sam3_NumeroUnicoMovimiento();
                            movimientoMerma.Activo = true;
                            movimientoMerma.Cantidad = Convert.ToInt32(corte.Merma);
                            movimientoMerma.Estatus = "A";
                            movimientoMerma.FechaModificacion = DateTime.Now;
                            movimientoMerma.FechaMovimiento = DateTime.Now;
                            movimientoMerma.NumeroUnicoID = numeroUnicoCorte.NumeroUnicoID;
                            movimientoMerma.ProyectoID = numeroUnicoCorte.ProyectoID;
                            movimientoMerma.Segmento = corte.Segmento;
                            movimientoMerma.TipoMovimientoID = (from tpm in ctx.Sam3_TipoMovimiento
                                                                where tpm.Activo && tpm.Nombre == "Merma"
                                                                select tpm.TipoMovimientoID).AsParallel().SingleOrDefault();
                            movimientoMerma.UsuarioModificacion = usuario.UsuarioID;

                            ctx.Sam3_NumeroUnicoMovimiento.Add(movimientoMerma);
                            ctx.SaveChanges();

                            int Sam3_MovimientoMermaID = movimientoMerma.NumeroUnicoMovimientoID;

                           

                            string rack = (from nu in ctx.Sam3_NumeroUnico
                                           where nu.Activo && 
                                           nu.NumeroUnicoID == numeroUnicoID
                                           select nu.Rack).AsParallel().SingleOrDefault();

                            //generamos el nuevo corte
                            nuevoCorte.Activo = true;
                            nuevoCorte.Cancelado = false;
                            nuevoCorte.FechaModificacion = DateTime.Now;
                            nuevoCorte.Merma = Convert.ToInt32(corte.Merma);
                            nuevoCorte.MermaMovimientoID = Sam3_MovimientoMermaID;
                            nuevoCorte.NumeroUnicoCorteID = Convert.ToInt32(corte.NumeroUnico);
                            nuevoCorte.PreparacionCorteMovimientoID = Sam3_MovimientoPreparacionID;
                            nuevoCorte.ProyectoID = Convert.ToInt32(corte.ProyectoID);
                            nuevoCorte.Rack = rack;
                            nuevoCorte.Sobrante = Convert.ToInt32(corte.Sobrante);
                            nuevoCorte.UsuarioModificacion = usuario.UsuarioID;
                            

                            ctx.Sam3_Corte.Add(nuevoCorte);
                            ctx.SaveChanges();

                            foreach(DetalleCortes detalle in corte.Detalle)
                            {
                                
                                //buscamos las ordenes de trabajo material
                                OrdenTrabajoMaterial odtsMaterial = (from odts in ctx2.OrdenTrabajoSpool
                                                                     join odtm in ctx2.OrdenTrabajoMaterial on odts.OrdenTrabajoSpoolID equals odtm.OrdenTrabajoSpoolID
                                                                     join ms in ctx2.MaterialSpool on odtm.MaterialSpoolID equals ms.MaterialSpoolID
                                                                     where odts.NumeroControl == detalle.SpoolID
                                                                     && ms.Etiqueta == detalle.Etiqueta
                                                                     select odtm).Distinct().AsParallel().SingleOrDefault();

                                //verificamos si el numero unico que se esta despachando es el mismo que estaba congelado para orden
                                if (odtsMaterial.NumeroUnicoCongeladoID == numeroUnicoID) // es el mismo
                                {
                                    //generamos un nuevo movimiento de corte
                                    Sam3_NumeroUnicoMovimiento nuevoMovimiento = new Sam3_NumeroUnicoMovimiento();
                                    nuevoMovimiento.Activo = true;
                                    nuevoMovimiento.Cantidad = Convert.ToInt32(detalle.Cantidad);
                                    nuevoMovimiento.Estatus = "A";
                                    nuevoMovimiento.FechaModificacion = DateTime.Now;
                                    nuevoMovimiento.FechaMovimiento = DateTime.Now;
                                    nuevoMovimiento.NumeroUnicoID = numeroUnicoCorte.NumeroUnicoID;
                                    nuevoMovimiento.ProyectoID = numeroUnicoCorte.ProyectoID;
                                    nuevoMovimiento.Referencia = (from odts in ctx2.OrdenTrabajoSpool
                                                                  where odts.OrdenTrabajoSpoolID == odtsMaterial.OrdenTrabajoSpoolID
                                                                  select odts.NumeroControl).AsParallel().SingleOrDefault();
                                    nuevoMovimiento.Segmento = corte.Segmento;
                                    nuevoMovimiento.TipoMovimientoID = (from tpm in ctx.Sam3_TipoMovimiento
                                                                        where tpm.Activo && tpm.Nombre == "Corte"
                                                                        select tpm.TipoMovimientoID).AsParallel().SingleOrDefault();

                                    nuevoMovimiento.UsuarioModificacion = usuario.UsuarioID;

                                    ctx.Sam3_NumeroUnicoMovimiento.Add(nuevoMovimiento);
                                    ctx.SaveChanges();

                                    //generamos un nuevo detalle de corte
                                    Sam3_CorteDetalle nuevoDetalle = new Sam3_CorteDetalle();
                                    nuevoDetalle.Activo = true;
                                    nuevoDetalle.Cancelado = false;
                                    nuevoDetalle.Cantidad = Convert.ToInt32(detalle.Cantidad);
                                    nuevoDetalle.CorteID = nuevoCorte.CorteID;
                                    nuevoDetalle.EsAjuste = false;
                                    nuevoDetalle.FechaCorte = DateTime.Now;
                                    nuevoDetalle.FechaModificacion = DateTime.Now;
                                    nuevoDetalle.MaquinaID = Convert.ToInt32(corte.Maquina);
                                    nuevoDetalle.MaterialSpoolID = odtsMaterial.MaterialSpoolID;
                                    nuevoDetalle.OrdenTrabajoSpoolID = odtsMaterial.OrdenTrabajoSpoolID;
                                    nuevoDetalle.SalidaInventarioID = nuevoMovimiento.NumeroUnicoMovimientoID;
                                    nuevoDetalle.UsuarioModificacion = usuario.UsuarioID;
                                    

                                    ctx.Sam3_CorteDetalle.Add(nuevoDetalle);

                                    //generamos el despacho
                                    Sam3_Despacho nuevoDespacho = new Sam3_Despacho();
                                    nuevoDespacho.Activo = true;
                                    nuevoDespacho.Cancelado = false;
                                    nuevoDespacho.Cantidad = Convert.ToInt32(detalle.Cantidad);
                                    nuevoDespacho.EsEquivalente = false;
                                    nuevoDespacho.FechaDespacho = DateTime.Now;
                                    nuevoDespacho.FechaModificacion = DateTime.Now;
                                    nuevoDespacho.MaterialSpoolID = odtsMaterial.MaterialSpoolID;
                                    nuevoDespacho.NumeroUnicoID = numeroUnicoCorte.NumeroUnicoID;
                                    nuevoDespacho.OrdenTrabajoSpoolID = odtsMaterial.OrdenTrabajoSpoolID;
                                    nuevoDespacho.ProyectoID = numeroUnicoCorte.ProyectoID;
                                    nuevoDespacho.Segmento = corte.Segmento;
                                    nuevoDespacho.UsuarioModificacion = usuario.UsuarioID;

                                    ctx.Sam3_Despacho.Add(nuevoDespacho);
                                    ctx.SaveChanges();

                                    odtsMaterial.TieneCorte = true;
                                    odtsMaterial.TieneDespacho = true;
                                    odtsMaterial.CorteDetalleID = nuevoDetalle.CorteDetalleID;
                                    odtsMaterial.DespachoID = nuevoDespacho.DespachoID;

                                    odtsMaterial.CantidadDespachada += Convert.ToInt32(detalle.Cantidad);
                                    odtsMaterial.NumeroUnicoDespachadoID = numeroUnicoCorte.NumeroUnicoID;
                                    odtsMaterial.SegmentoDespachado = corte.Segmento;
                                    odtsMaterial.SegmentoCongelado = null;
                                    odtsMaterial.CantidadCongelada = 0;
                                    odtsMaterial.NumeroUnicoCongeladoID = null;
                                    odtsMaterial.NumeroUnicoSugeridoID = null;
                                    odtsMaterial.SegmentoSugerido = null;
                                    odtsMaterial.SugeridoEsEquivalente = false;
                                    odtsMaterial.DespachoEsEquivalente = false;
                                    odtsMaterial.CongeladoEsEquivalente = false;
                                    odtsMaterial.TieneInventarioCongelado = false;
                                    odtsMaterial.FechaModificacion = DateTime.Now;


                                    ctx.SaveChanges();
                                }
                                else
                                {
                                    //En el entendido de manejar proyectos nuevos, un numero unico que no existe en sam3 no puede ser despachada
                                }
                            }

                        }
                    }
                    scope.Complete();
                }

                return corte;
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