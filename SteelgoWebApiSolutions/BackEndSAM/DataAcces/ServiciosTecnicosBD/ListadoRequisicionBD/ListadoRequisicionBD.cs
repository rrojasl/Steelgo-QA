using BackEndSAM.Models.ServiciosTecnicos.ListadoRequisicion;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BackEndSAM.DataAcces.ServiciosTecnicosBD.ListadoRequisicionBD
{
    public class ListadoRequisicionBD
    {
        private static readonly object _mutex = new object();

        private static ListadoRequisicionBD _instance;
        public object ObtenerListaStatusRequisiciones(string lenguaje)
        {
            try
            {
               

                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ServiciosTecnicos_Get_EstatusRequisiciones_Result> result = ctx.Sam3_ServiciosTecnicos_Get_EstatusRequisiciones(lenguaje).ToList();
                    List<StatusRequisicion> ListadoStatusRequisicion = new List<StatusRequisicion>(); 
                    foreach (Sam3_ServiciosTecnicos_Get_EstatusRequisiciones_Result item in result)
                    {
                        ListadoStatusRequisicion.Add(new StatusRequisicion
                        {
                          CantidadRegistros= item.Cuantos,
                          Estatus=item.Estatus,
                          EstatusID=item.EstatusID,
                          Orden=item.Orden.GetValueOrDefault()
                        });
                    }

                    return ListadoStatusRequisicion;
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


        public object ObtenerInformacionRequisicionXStatus(string lenguaje,int idStatus)
        {
            try
            {


                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ServiciosTecnicos_Get_Requisiciones_Result> result = ctx.Sam3_ServiciosTecnicos_Get_Requisiciones(lenguaje,idStatus).ToList();
                    List<InformacionRequisicionXID> ListadoRequisicion = new List<InformacionRequisicionXID>();
                    foreach (Sam3_ServiciosTecnicos_Get_Requisiciones_Result item in result)
                    {
                        ListadoRequisicion.Add(new InformacionRequisicionXID
                        {
                            Estatus=item.Estatus,
                            EstatusID=item.EstatusID.GetValueOrDefault(),
                            FechaRequisicion=item.FechaRequisicion,
                            Folio=item.Folio,
                            Observacion=item.Observacion,
                            Orden=item.Orden.GetValueOrDefault(),
                            Prueba=item.Prueba,
                            PruebasProyectoID = item.PruebasProyectoID,
                            RequisicionID=item.RequisicionID
                        });
                    }

                    return ListadoRequisicion;
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


        public static ListadoRequisicionBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new  ListadoRequisicionBD();
                    }
                }
                return _instance;
            }
        }


    }
}