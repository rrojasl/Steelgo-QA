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

        public object ListadoGenerarDespacho(string numeroControl, Sam3_Usuario usuario)
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



                    using (Sam2Context ctx2 = new Sam2Context())
                    {
                        int ordenSpoolID = Convert.ToInt32(numeroControl);

                        List<LstGenerarDespacho> listado = (from odts in ctx2.OrdenTrabajoSpool
                                                            join odtm in ctx2.OrdenTrabajoMaterial on odts.OrdenTrabajoSpoolID equals odtm.OrdenTrabajoSpoolID
                                                            join ms in ctx2.MaterialSpool on odtm.MaterialSpoolID equals ms.MaterialSpoolID
                                                            join nu in ctx2.NumeroUnico on odtm.NumeroUnicoCongeladoID equals nu.NumeroUnicoID
                                                            join it in ctx2.ItemCode on nu.ItemCodeID equals it.ItemCodeID
                                                            join odt in ctx2.OrdenTrabajo on odts.OrdenTrabajoID equals odt.OrdenTrabajoID
                                                            where odts.OrdenTrabajoSpoolID == ordenSpoolID
                                                            && !(from d in ctx2.Despacho
                                                                 where d.Cancelado == false
                                                                 select d.OrdenTrabajoSpoolID).Contains(odts.OrdenTrabajoSpoolID)
                                                            && proyectos.Contains(odt.ProyectoID)
                                                            && it.TipoMaterialID == 2
                                                            select new LstGenerarDespacho
                                                            {
                                                                Descripcion = it.DescripcionEspanol,
                                                                ItemCode = it.Codigo,
                                                                NumeroControl = odts.NumeroControl,
                                                                NumeroUnico = nu.Codigo,
                                                                Etiqueta = ms.Etiqueta,
                                                                Hold = (from sh in ctx2.SpoolHold
                                                                        where sh.SpoolID == odts.SpoolID
                                                                        && (sh.TieneHoldCalidad || sh.TieneHoldIngenieria || sh.Confinado)
                                                                        select sh).Any(),
                                                                ProyectoID = odt.ProyectoID.ToString()
                                                            }).Distinct().AsParallel().ToList();

                        //eliminar numeros unicos que no se encuentren en sam3


#if DEBUG
                        JavaScriptSerializer serializer = new JavaScriptSerializer();
                        string json = serializer.Serialize(listado);
#endif

                        return listado.OrderBy(x => x.Etiqueta).ToList();
                    }
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


        public object GenerarDespachos(List<DespachoItems> despachos, Sam3_Usuario usuario)
        {
            try
            {
                Sam3_Despacho nuevoDespacho = new Sam3_Despacho();
                using (SamContext ctx = new SamContext())
                {
                    using (Sam2Context ctx2 = new Sam2Context())
                    {
                        foreach (DespachoItems datosJson in despachos)
                        {
                            int proyectoID = datosJson.ProyectoID != "" ? Convert.ToInt32(datosJson.ProyectoID) : 0;

                            //traemos los datos de la orden de trabajo spool de Sam2
                            OrdenTrabajoSpool odtSpool = (from odts in ctx2.OrdenTrabajoSpool
                                                          join odt in ctx2.OrdenTrabajo on odts.OrdenTrabajoID equals odt.OrdenTrabajoID
                                                          where odts.NumeroControl == datosJson.NumeroControl
                                                          && odt.ProyectoID == proyectoID
                                                          select odts).AsParallel().SingleOrDefault();

                            //traemos los datos del material de Sam 2
                            MaterialSpool materialSpool = (from ms in ctx2.MaterialSpool
                                                           join odts in ctx2.OrdenTrabajoSpool on ms.SpoolID equals odts.SpoolID
                                                           where odts.OrdenTrabajoSpoolID == odtSpool.OrdenTrabajoSpoolID
                                                           && ms.Etiqueta == datosJson.Etiqueta
                                                           select ms).AsParallel().SingleOrDefault();

                            //traemos los datos de la orden de trabajo material de Sam 2
                            OrdenTrabajoMaterial odtMaterial = (from odtm in ctx2.OrdenTrabajoMaterial
                                                                where odtm.OrdenTrabajoSpoolID == odtSpool.OrdenTrabajoSpoolID
                                                                && odtm.MaterialSpoolID == materialSpool.MaterialSpoolID
                                                                select odtm).AsParallel().SingleOrDefault();

                            //Dividimos el codigo del numero para buscarlo en sam3
                            string[] elementosCodigo = datosJson.NumeroUnico.Split('-').ToArray();
                            int consecutivoNumeroUnico = Convert.ToInt32(elementosCodigo[1]);
                            string prefijoNumeroUnico = elementosCodigo[0];

                            int sam3_ProyectoID = (from nueq in ctx.Sam3_EquivalenciaProyecto
                                                   where nueq.Activo && nueq.Sam2_ProyectoID == proyectoID
                                                   select nueq.Sam3_ProyectoID).AsParallel().SingleOrDefault();

                            //buscamos el numero unico en SAM 3
                            if (ctx.Sam3_NumeroUnico.Where(x => x.Prefijo == prefijoNumeroUnico
                                && x.Consecutivo == consecutivoNumeroUnico && x.ProyectoID == sam3_ProyectoID).AsParallel().Any())
                            {
                                int sam2_numeroUnicoID = 0;

                                Sam3_NumeroUnico numeroUnico = ctx.Sam3_NumeroUnico.Where(x => x.Prefijo == prefijoNumeroUnico
                                && x.Consecutivo == consecutivoNumeroUnico && x.ProyectoID == sam3_ProyectoID).AsParallel().SingleOrDefault();

                                //buscamos el id equivalente de sam2
                                sam2_numeroUnicoID = ctx.Sam3_EquivalenciaNumeroUnico
                                    .Where(x => x.Sam3_NumeroUnicoID == numeroUnico.NumeroUnicoID)
                                    .Select(x => x.Sam2_NumeroUnicoID).AsParallel().SingleOrDefault();

                                //Actualizamos los inventarios del numero unico en sam 3
                                Sam3_NumeroUnicoInventario numInventario = ctx.Sam3_NumeroUnicoInventario
                                    .Where(x => x.NumeroUnicoID == numeroUnico.NumeroUnicoID).AsParallel().SingleOrDefault();

                                numInventario.InventarioFisico -= odtMaterial.CantidadCongelada.Value;
                                numInventario.InventarioBuenEstado -= odtMaterial.CantidadCongelada.Value;
                                numInventario.InventarioDisponibleCruce -= odtMaterial.CantidadCongelada.Value;
                                //numInventario.InventarioCongelado -= odtMaterial.CantidadCongelada.Value;
                                numInventario.FechaModificacion = DateTime.Now;
                                numInventario.UsuarioModificacion = usuario.UsuarioID;

                                //generamos el nuevo movimiento de inventario
                                Sam3_NumeroUnicoMovimiento movimientoSam3 = new Sam3_NumeroUnicoMovimiento();
                                movimientoSam3.Activo = true;
                                movimientoSam3.Cantidad = odtMaterial.CantidadCongelada.Value;
                                movimientoSam3.Estatus = "A";
                                movimientoSam3.FechaModificacion = DateTime.Now;
                                movimientoSam3.FechaMovimiento = DateTime.Now;
                                movimientoSam3.NumeroUnicoID = numeroUnico.NumeroUnicoID;
                                movimientoSam3.ProyectoID = numeroUnico.ProyectoID;
                                movimientoSam3.Referencia = odtSpool.NumeroControl;
                                movimientoSam3.Segmento = null;
                                movimientoSam3.TipoMovimientoID = (from tp in ctx.Sam3_TipoMovimiento
                                                                   where tp.Nombre == "Despacho Accesorio"
                                                                   select tp.TipoMovimientoID).AsParallel().SingleOrDefault();
                                movimientoSam3.UsuarioModificacion = usuario.UsuarioID;

                                ctx.Sam3_NumeroUnicoMovimiento.Add(movimientoSam3);
                                ctx.SaveChanges(); // guardamos los cambios para obtener el id del movimiento de inventario

                                int salidaInventarioSam3 = movimientoSam3.NumeroUnicoMovimientoID;

                                //generamos el despacho en sam3
                                nuevoDespacho.Activo = true;
                                nuevoDespacho.Cancelado = false;
                                nuevoDespacho.Cantidad = odtMaterial.CantidadCongelada != null ? odtMaterial.CantidadCongelada.Value : 1;
                                nuevoDespacho.EsEquivalente = odtMaterial.CongeladoEsEquivalente;
                                nuevoDespacho.FechaDespacho = DateTime.Now;
                                nuevoDespacho.FechaModificacion = DateTime.Now;
                                nuevoDespacho.MaterialSpoolID = odtMaterial.MaterialSpoolID;
                                nuevoDespacho.NumeroUnicoID = numeroUnico.NumeroUnicoID;
                                nuevoDespacho.OrdenTrabajoSpoolID = odtSpool.OrdenTrabajoSpoolID;
                                nuevoDespacho.ProyectoID = sam3_ProyectoID;
                                nuevoDespacho.SalidaInventarioID = salidaInventarioSam3;
                                nuevoDespacho.Segmento = null;
                                nuevoDespacho.UsuarioModificacion = usuario.UsuarioID;

                                ctx.Sam3_Despacho.Add(nuevoDespacho);
                                ctx.SaveChanges();// guardamos el nuevo despacho

                                //HAY QUE HACER EL MISMO PROCESO CON LOS INVENTARIOS DE SAM 2
                                //buscamos su inventario
                                NumeroUnicoInventario inventarioSam2 = ctx2.NumeroUnicoInventario
                                    .Where(x => x.NumeroUnicoID == sam2_numeroUnicoID).AsParallel().SingleOrDefault();

                                //Actualizamos
                                inventarioSam2.FechaModificacion = DateTime.Now;
                                inventarioSam2.InventarioBuenEstado -= odtMaterial.CantidadCongelada.Value;
                                inventarioSam2.InventarioCongelado -= odtMaterial.CantidadCongelada.Value;
                                inventarioSam2.InventarioDisponibleCruce -= odtMaterial.CantidadCongelada.Value;
                                inventarioSam2.InventarioFisico -= odtMaterial.CantidadCongelada.Value;

                                //generamos el movimiento de inventario
                                DatabaseManager.Sam2.NumeroUnicoMovimiento nuevoMovSam2 = new DatabaseManager.Sam2.NumeroUnicoMovimiento();
                                nuevoMovSam2.Cantidad = odtMaterial.CantidadCongelada.Value;
                                nuevoMovSam2.Estatus = "A";
                                nuevoMovSam2.FechaModificacion = DateTime.Now;
                                nuevoMovSam2.FechaMovimiento = DateTime.Now;
                                nuevoMovSam2.NumeroUnicoID = sam2_numeroUnicoID;
                                nuevoMovSam2.ProyectoID = proyectoID;
                                nuevoMovSam2.Referencia = odtSpool.NumeroControl;
                                nuevoMovSam2.Segmento = null;
                                nuevoMovSam2.TipoMovimientoID = (from tp in ctx2.TipoMovimiento
                                                                 where tp.Nombre == "Despacho Accesorio"
                                                                 select tp.TipoMovimientoID).AsParallel().SingleOrDefault();
                                //guardamos los cambios
                                ctx2.NumeroUnicoMovimiento.Add(nuevoMovSam2);
                                ctx2.SaveChanges();

                                int salidaInventarioSam2 = nuevoMovSam2.NumeroUnicoMovimientoID;

                                //verificamos si el numero unico que se despacho es igual al que esta congelado en la orden de trabajo material
                                if (odtMaterial.NumeroUnicoCongeladoID == sam2_numeroUnicoID)
                                {
                                    //si el numero unico despacho es igual al que se tenia congelado se actualiza la odtm
                                    odtMaterial.CantidadDespachada = nuevoDespacho.Cantidad;
                                    odtMaterial.CantidadCongelada -= nuevoDespacho.Cantidad;
                                    odtMaterial.DespachoEsEquivalente = nuevoDespacho.EsEquivalente;
                                    odtMaterial.DespachoID = nuevoDespacho.DespachoID;
                                    odtMaterial.FechaModificacion = DateTime.Now;
                                    odtMaterial.NumeroUnicoCongeladoID = null;
                                    odtMaterial.NumeroUnicoDespachadoID = sam2_numeroUnicoID;
                                    odtMaterial.TieneDespacho = true;
                                    odtMaterial.TieneInventarioCongelado = false;

                                    //guardamos los cambios en sam2
                                    ctx2.SaveChanges();

                                }
                                else
                                {
                                    //si el numero unico es diferente antes de actualizar la odtm hay que regresar a inventario el 
                                    //material que estaba congelado
                                    //Buscamos el numero unico que estaba congelado
                                    DatabaseManager.Sam2.NumeroUnicoInventario numeroCongelado = ctx2.NumeroUnicoInventario
                                        .Where(x => x.NumeroUnicoID == odtMaterial.NumeroUnicoCongeladoID).AsParallel().SingleOrDefault();
                                    //actualizamos
                                    numeroCongelado.FechaModificacion = DateTime.Now;
                                    numeroCongelado.InventarioBuenEstado += odtMaterial.CantidadCongelada.Value;
                                    numeroCongelado.InventarioCongelado -= odtMaterial.CantidadCongelada.Value;
                                    numeroCongelado.InventarioDisponibleCruce += odtMaterial.CantidadCongelada.Value;
                                    numeroCongelado.InventarioFisico += odtMaterial.CantidadCongelada.Value;

                                    //ahora si actualizamos la odtm
                                    //si el numero unico despacho es igual al que se tenia congelado se actualiza la odtm
                                    odtMaterial.CantidadDespachada = nuevoDespacho.Cantidad;
                                    odtMaterial.CantidadCongelada -= nuevoDespacho.Cantidad;
                                    odtMaterial.DespachoEsEquivalente = nuevoDespacho.EsEquivalente;
                                    odtMaterial.DespachoID = nuevoDespacho.DespachoID;
                                    odtMaterial.FechaModificacion = DateTime.Now;
                                    odtMaterial.NumeroUnicoCongeladoID = null;
                                    odtMaterial.NumeroUnicoDespachadoID = sam2_numeroUnicoID;
                                    odtMaterial.TieneDespacho = true;
                                    odtMaterial.TieneInventarioCongelado = false;

                                    //guardamos los cambios en sam2
                                    ctx2.SaveChanges();
                                }
                            }
                        }
                    }
                }

                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add("Ok");
                result.ReturnMessage.Add(nuevoDespacho.DespachoID.ToString());
                result.ReturnCode = 200;
                result.ReturnStatus = true;
                result.IsAuthenicated = true;

                return result;
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