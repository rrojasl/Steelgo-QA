using BackEndSAM.Models;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces
{
    public class DetalleNumeroUnicoBd
    {

        private static readonly object _mutex = new object();
        private static DetalleNumeroUnicoBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private DetalleNumeroUnicoBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static DetalleNumeroUnicoBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new DetalleNumeroUnicoBd();
                    }
                }
                return _instance;
            }
        }

        /// <summary>
        /// Se obtienen los detalles del numero unico
        /// </summary>
        /// <param name="numeroUnicoID"></param>
        /// <returns></returns>
        public object obtenerDatosInventario(string numeroUnicoID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    int sumaTotalEntradas = 0;
                    int sumaTotalSalidas = 0;
                    DetalleNumeroUnico detalle = new DetalleNumeroUnico();
                    List<int> totalEntradas = (from num in ctx.Sam3_NumeroUnicoMovimiento
                                               join tm in ctx.Sam3_TipoMovimiento on num.TipoMovimientoID equals tm.TipoMovimientoID
                                               where num.Activo && tm.Activo == 1 && tm.EsEntrada &&
                                               num.NumeroUnicoID.ToString() == numeroUnicoID
                                               select num.Cantidad).AsParallel().ToList();

                    totalEntradas.ForEach(x => sumaTotalEntradas = sumaTotalEntradas + x);

                    List<int> totalSalidas = (from num in ctx.Sam3_NumeroUnicoMovimiento
                                              join tm in ctx.Sam3_TipoMovimiento on num.TipoMovimientoID equals tm.TipoMovimientoID
                                              where num.Activo && tm.Activo == 1 && !tm.EsEntrada &&
                                              num.NumeroUnicoID.ToString() == numeroUnicoID
                                              select num.Cantidad).AsParallel().ToList();

                    totalSalidas.ForEach(x => sumaTotalSalidas = sumaTotalSalidas + x);

                    detalle = (from nu in ctx.Sam3_NumeroUnico
                               join ic in ctx.Sam3_ItemCode on nu.ItemCodeID equals ic.ItemCodeID
                               join rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on ic.ItemCodeID equals rics.ItemCodeID
                               join ics in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                               join nui in ctx.Sam3_NumeroUnicoInventario on nu.NumeroUnicoID equals nui.NumeroUnicoID
                               where nu.Activo && ic.Activo && rics.Activo && ics.Activo && nui.Activo
                               && nu.NumeroUnicoID.ToString() == numeroUnicoID
                               select new DetalleNumeroUnico
                               {
                                   NumeroUnicoID = nu.NumeroUnicoID.ToString(),
                                   NumeroUnico = nu.Prefijo + "-" + nu.Consecutivo,
                                   ItemCode = ic.Codigo,
                                   ItemCodeID = ic.ItemCodeID.ToString(),
                                   ItemCodeSteelgo = ics.Codigo,
                                   D1 = ics.Diametro1.ToString(),
                                   D2 = ics.Diametro2.ToString(),
                                   Cedula = ics.Cedula,
                                   TotalRecibido = nui.CantidadRecibida.ToString(),
                                   TotalDanado = nui.CantidadDanada.ToString(),
                                   TotalEntradas = sumaTotalEntradas.ToString(),
                                   TotalSalidas = sumaTotalSalidas.ToString(),
                                   SaldoActual = nui.InventarioFisico.ToString()
                               }).AsParallel().GroupBy(x => x.NumeroUnicoID).Select(x => x.First()).SingleOrDefault();

                    int itemcodeID = Convert.ToInt32(detalle.ItemCodeID);
                    int numeroDigitos = (from it in ctx.Sam3_ItemCode
                                         join pc in ctx.Sam3_ProyectoConfiguracion on it.ProyectoID equals pc.ProyectoID
                                         where it.ItemCodeID == itemcodeID
                                         select pc.DigitosNumeroUnico).AsParallel().SingleOrDefault();

                    string formato = "D" + numeroDigitos.ToString();

                    string[] codigo = detalle.NumeroUnico.Split('-').ToArray();
                    int consecutivo = Convert.ToInt32(codigo[1]);
                    detalle.NumeroUnico = codigo[0] + "-" + consecutivo.ToString(formato);

                    return detalle;
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