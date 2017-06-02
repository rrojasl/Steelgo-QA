using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static BackEndSAM.Models.Dynasol.PackingList;

namespace BackEndSAM.DataAcces.Dynasol
{
    public class PackingListBD
    {
        private static readonly object _mutex = new object();
        private static PackingListBD _instance;

        public static PackingListBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new PackingListBD();
                    }
                }
                return _instance;
            }
        }
        public object ObtenerDetallePackingList(int OrdenCompra, string PackingList)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Dynasol_GET_PackingList_Result> result = ctx.Sam3_Dynasol_GET_PackingList(OrdenCompra, PackingList).ToList();
                    List<RevisionClass> listaRevision = new List<RevisionClass>();
                    foreach (Sam3_Dynasol_GET_PackingList_Result item in result)
                    {
                        listaRevision.Add(new RevisionClass
                        {
                            Accion = item.Accion,
                            RevisionID = item.RevisionID,
                            OrdenCompraID = item.OrdenCompraID.GetValueOrDefault(),
                            Rev = item.Revision,
                            Descripcion = item.Descripcion,
                            MaterialNorma = item.MaterialNorma,
                            Diametro1 = (float)item.Diametro1.GetValueOrDefault(),
                            Diametro2 = (float)item.Diametro2.GetValueOrDefault(),
                            Schedule = item.Shedule,
                            Rating = item.Rating,
                            PreparacionExtremos = item.PrepExt,
                            Cant = item.Cantidad.GetValueOrDefault(),
                            PrecioUnidad = item.PrecioUnidad.GetValueOrDefault(),
                            Total = item.Total.GetValueOrDefault(),
                            Partida = item.Partida,
                            CantC = item.CantidadC.GetValueOrDefault(),
                            CantG = item.CantidadG.GetValueOrDefault(),
                            CantS = item.CantidadS.GetValueOrDefault(),
                            ColadaID = item.ColadaID,
                            Colada = item.Colada,
                            RowOk = true
                        });
                    }
                    return listaRevision;
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