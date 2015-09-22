using BackEndSAM.Models;
using DatabaseManager.Sam2;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Cors;

namespace BackEndSAM.DataAcces
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ListadoMaterialesPorItemCodeBd
    {
        private static readonly object _mutex = new object();
        private static ListadoMaterialesPorItemCodeBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private ListadoMaterialesPorItemCodeBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static ListadoMaterialesPorItemCodeBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new ListadoMaterialesPorItemCodeBd();
                    }
                }
                return _instance;
            }
        }

        public object obtenerListadoPorItemCode(string proyectoID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<ListadoMaterialesPorItemCode> listado = (from ic in ctx.Sam3_ItemCode
                                                                  join rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on ic.ItemCodeID equals rics.ItemCodeID
                                                                  join ics in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                                                  join tm in ctx.Sam3_TipoMaterial on ic.TipoMaterialID equals tm.TipoMaterialID
                                                                  where ic.Activo && rics.Activo && ics.Activo && tm.Activo
                                                                  && ic.ProyectoID.ToString() == proyectoID
                                                                  select new ListadoMaterialesPorItemCode
                                                                  {
                                                                      ItemCodeID = ic.ItemCodeID.ToString(),
                                                                      ItemCode = ic.Codigo,
                                                                      ItemCodeSteelgoID = ics.ItemCodeSteelgoID.ToString(),
                                                                      ItemCodeSteelgo = ics.Codigo,
                                                                      Descripcion = ics.DescripcionEspanol,
                                                                      D1 = ics.Diametro1.ToString(),
                                                                      D2 = ics.Diametro2.ToString(),
                                                                      TipoMaterial = tm.Nombre,

                                                                      TotalRecibido = (from nui in ctx.Sam3_NumeroUnicoInventario
                                                                                       join nu in ctx.Sam3_NumeroUnico on nui.NumeroUnicoID equals nu.NumeroUnicoID
                                                                                       where nui.Activo && nu.Activo
                                                                                       && nu.ItemCodeID == ic.ItemCodeID
                                                                                       select nui.CantidadRecibida
                                                                                           ).Sum().ToString(),

                                                                      OtrasEntradas = (from num in ctx.Sam3_NumeroUnicoMovimiento
                                                                                       join tmov in ctx.Sam3_TipoMovimiento on num.TipoMovimientoID equals tmov.TipoMovimientoID
                                                                                       join nu in ctx.Sam3_NumeroUnico on num.NumeroUnicoID equals nu.NumeroUnicoID
                                                                                       where num.Activo && tmov.Activo == 1 && nu.Activo
                                                                                       && tmov.TipoMovimientoID == 9
                                                                                       && nu.ItemCodeID == ic.ItemCodeID
                                                                                       select num.Cantidad).Sum().ToString(),

                                                                      TotalCondicionada = (from num in ctx.Sam3_NumeroUnicoMovimiento
                                                                                           join nu in ctx.Sam3_NumeroUnico on num.NumeroUnicoID equals nu.NumeroUnicoID
                                                                                           where num.Activo && nu.Activo
                                                                                           && nu.ItemCodeID == ic.ItemCodeID
                                                                                           && num.Estatus == "C"
                                                                                           select num.Cantidad).Sum().ToString(),

                                                                      TotalRechazado = (from num in ctx.Sam3_NumeroUnicoMovimiento
                                                                                        join nu in ctx.Sam3_NumeroUnico on num.NumeroUnicoID equals nu.NumeroUnicoID
                                                                                        where num.Activo && nu.Activo
                                                                                        && nu.ItemCodeID == ic.ItemCodeID
                                                                                        && num.Estatus == "R"
                                                                                        select num.Cantidad).Sum().ToString(),

                                                                      TotalDanado = (from num in ctx.Sam3_NumeroUnicoMovimiento
                                                                                     join nu in ctx.Sam3_NumeroUnico on num.NumeroUnicoID equals nu.NumeroUnicoID
                                                                                     where num.Activo && nu.Activo
                                                                                     && nu.ItemCodeID == ic.ItemCodeID
                                                                                     && num.Estatus == "D"
                                                                                     select num.Cantidad).Sum().ToString(),

                                                                      TotalRecibidoNeto = (from nui in ctx.Sam3_NumeroUnicoInventario
                                                                                           join nu in ctx.Sam3_NumeroUnico on nui.NumeroUnicoID equals nu.NumeroUnicoID
                                                                                           where nui.Activo && nu.Activo
                                                                                           && nu.ItemCodeID == ic.ItemCodeID
                                                                                           select nui.CantidadRecibida - nui.CantidadDanada).Sum().ToString(),

                                                                      EntradasDesdeICEquivalente = "",

                                                                      SalidasTemporales = (from num in ctx.Sam3_NumeroUnicoMovimiento
                                                                                           join tmov in ctx.Sam3_TipoMovimiento on num.TipoMovimientoID equals tmov.TipoMovimientoID
                                                                                           join nu in ctx.Sam3_NumeroUnico on num.NumeroUnicoID equals nu.NumeroUnicoID
                                                                                           where num.Activo && tmov.Activo == 1 && nu.Activo
                                                                                           && nu.ItemCodeID == ic.ItemCodeID
                                                                                           && tmov.TipoMovimientoID == 12
                                                                                           select num.Cantidad).Sum().ToString(),

                                                                      TotalOtrasSalidas = (from num in ctx.Sam3_NumeroUnicoMovimiento
                                                                                           join tmov in ctx.Sam3_TipoMovimiento on num.TipoMovimientoID equals tmov.TipoMovimientoID
                                                                                           join nu in ctx.Sam3_NumeroUnico on num.NumeroUnicoID equals nu.NumeroUnicoID
                                                                                           where num.Activo && tmov.Activo == 1 && nu.Activo
                                                                                           && tmov.TipoMovimientoID == 8
                                                                                           && nu.ItemCodeID == ic.ItemCodeID
                                                                                           select num.Cantidad).Sum().ToString(),

                                                                      TotalMermas = (from num in ctx.Sam3_NumeroUnicoMovimiento
                                                                                     join tmov in ctx.Sam3_TipoMovimiento on num.TipoMovimientoID equals tmov.TipoMovimientoID
                                                                                     join nu in ctx.Sam3_NumeroUnico on num.NumeroUnicoID equals nu.NumeroUnicoID
                                                                                     where num.Activo && tmov.Activo == 1 && nu.Activo
                                                                                     && nu.ItemCodeID == ic.ItemCodeID
                                                                                     && tmov.TipoMovimientoID == 4
                                                                                     select num.Cantidad).Sum().ToString(),

                                                                      TotalDespachadoPorCortar = (from num in ctx.Sam3_NumeroUnicoMovimiento
                                                                                                  join tmov in ctx.Sam3_TipoMovimiento on num.TipoMovimientoID equals tmov.TipoMovimientoID
                                                                                                  join nu in ctx.Sam3_NumeroUnico on num.NumeroUnicoID equals nu.NumeroUnicoID
                                                                                                  where num.Activo && tmov.Activo == 1 && nu.Activo
                                                                                                  && tmov.TipoMovimientoID == 12
                                                                                                  && nu.ItemCodeID == ic.ItemCodeID
                                                                                                  select num.Cantidad).Sum().ToString(),

                                                                      TotalCortado = (from num in ctx.Sam3_NumeroUnicoMovimiento
                                                                                      join tmov in ctx.Sam3_TipoMovimiento on num.TipoMovimientoID equals tmov.TipoMovimientoID
                                                                                      join nu in ctx.Sam3_NumeroUnico on num.NumeroUnicoID equals nu.NumeroUnicoID
                                                                                      where num.Activo && tmov.Activo == 1 && nu.Activo
                                                                                      && tmov.TipoMovimientoID == 15
                                                                                      && nu.ItemCodeID == ic.ItemCodeID
                                                                                      select num.Cantidad).Sum().ToString(),

                                                                      DespachadoAProduccion = (from num in ctx.Sam3_NumeroUnicoMovimiento
                                                                                               join tmov in ctx.Sam3_TipoMovimiento on num.TipoMovimientoID equals tmov.TipoMovimientoID
                                                                                               join nu in ctx.Sam3_NumeroUnico on num.NumeroUnicoID equals nu.NumeroUnicoID
                                                                                               where num.Activo && tmov.Activo == 1 && nu.Activo
                                                                                               && tmov.TipoMovimientoID == 2
                                                                                               && nu.ItemCodeID == ic.ItemCodeID
                                                                                               select num.Cantidad).Sum().ToString(),

                                                                      TotalFisicoEnAlmacen = (from nui in ctx.Sam3_NumeroUnicoInventario
                                                                                              join nu in ctx.Sam3_NumeroUnico on nui.NumeroUnicoID equals nu.NumeroUnicoID
                                                                                              where nui.Activo && nu.Activo
                                                                                              && nu.ItemCodeID == ic.ItemCodeID
                                                                                              select nui.InventarioFisico).Sum().ToString(),

                                                                      InventarioDisponibleCruce = (from nui in ctx.Sam3_NumeroUnicoInventario
                                                                                                   join nu in ctx.Sam3_NumeroUnico on nui.NumeroUnicoID equals nu.NumeroUnicoID
                                                                                                   where nui.Activo && nu.Activo
                                                                                                   && nu.ItemCodeID == ic.ItemCodeID
                                                                                                   select nui.InventarioDisponibleCruce).Sum().ToString(),



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
    }
}