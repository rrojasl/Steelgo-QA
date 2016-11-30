using BackEndSAM.Models.Embarque.PreparacionEmbarque;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace BackEndSAM.DataAcces.Embarque.PreparacionEmbarque
{
    public class PreparacionEmbarqueBD
    {
        private static readonly object _mutex = new object();
        private static PreparacionEmbarqueBD _instance;

        public static PreparacionEmbarqueBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new PreparacionEmbarqueBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerDetalleAgregarPlana(int cargaPlanaID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Embarque_PE_Get_DetalleAgregar_Result> result = ctx.Sam3_Embarque_PE_Get_DetalleAgregar(cargaPlanaID).ToList();
                    List<DetalleAgregarPlana> listaDetalle = new List<DetalleAgregarPlana>();
                    listaDetalle.Add(new DetalleAgregarPlana());

                    foreach (Sam3_Embarque_PE_Get_DetalleAgregar_Result item in result)
                    {
                        listaDetalle.Add(new DetalleAgregarPlana
                        {
                            Accion = item.EmbarqueDetalleID == 0 ? 1 : 2,
                            EmbarqueDetalleID = item.EmbarqueDetalleID,
                            PlanaID = item.PlanaID,
                            Nombre = item.Nombre,
                            CargaPlanaID = item.CargaPlanaID,
                            StatusCarga = item.StatusCarga.GetValueOrDefault(),
                            CantidadElementos = item.CantidadElementos.GetValueOrDefault(),
                            M2 = item.M2.GetValueOrDefault(),
                            Peso = item.Peso.GetValueOrDefault()
                        });
                    }

                    return listaDetalle;
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