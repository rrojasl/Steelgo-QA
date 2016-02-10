using BackEndSAM.Models.ServiciosTecnicos.RequisicionesAsignadas;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BackEndSAM.DataAcces.ServiciosTecnicosBD.RequisicionesAsignadasBD
{
    public class RequisicionesAsignadasBD
    {
        private static readonly object _mutex = new object();
        private static RequisicionesAsignadasBD _instance;
        public static RequisicionesAsignadasBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new RequisicionesAsignadasBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerListaStatusRequisiciones(string lenguaje,int ProveedorID)
        {
            try
            {


                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ServiciosTecnicos_Get_EstatusRequisicionesAsignadas_Result> result = ctx.Sam3_ServiciosTecnicos_Get_EstatusRequisicionesAsignadas(lenguaje, ProveedorID).ToList();
                    List<StatusRequisicion> ListadoStatusRequisicionesAsignada = new List<StatusRequisicion>();
                    foreach (Sam3_ServiciosTecnicos_Get_EstatusRequisicionesAsignadas_Result item in result)
                    {
                        ListadoStatusRequisicionesAsignada.Add(new StatusRequisicion
                        {
                            CantidadRegistros = item.Cuantos,
                            Estatus = item.Estatus,
                            EstatusID = item.EstatusID,
                            Orden = item.Orden.GetValueOrDefault()
                          

                        });
                    }

                    return ListadoStatusRequisicionesAsignada;
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

        public object ObtenerInformacionRequisicionXStatus(string lenguaje,int proveedorId, int idStatus)
        {
            try
            {


                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ServiciosTecnicos_Get_RequisicionesAsignadas_Result> result = ctx.Sam3_ServiciosTecnicos_Get_RequisicionesAsignadas(lenguaje, proveedorId, idStatus).ToList();
                    List<InformacionRequisicionAsignadaXID> ListadoRequisicionesAsignadas = new List<InformacionRequisicionAsignadaXID>();
                    foreach (Sam3_ServiciosTecnicos_Get_RequisicionesAsignadas_Result item in result)
                    {
                        ListadoRequisicionesAsignadas.Add(new InformacionRequisicionAsignadaXID
                        {
                            Clave=item.Clave,
                            Nombre=item.Nombre,
                            FechaAsignacion=item.FechaAsignacion.ToString().Split(' ')[0],
                            Folio=item.Folio.ToString(),
                            Observacion=item.Observacion,
                            FolioTexto=item.FolioTexto
                            
                        });
                    }

                    return ListadoRequisicionesAsignadas;
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