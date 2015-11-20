using BackEndSAM.Models.ServiciosTecnicos.AsignarRequisicion;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.ServiciosTecnicosBD.AsignarRequisicionBD
{
    public class AsignarRequisicionBD
    {
        private static readonly object _mutex = new object();

        private static AsignarRequisicionBD _instance;

        public object ObtenerListaProveedores(string lenguaje,int idPrueba)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ServiciosTecnicos_Get_Proveedores_Result> result = ctx.Sam3_ServiciosTecnicos_Get_Proveedores(lenguaje, idPrueba).ToList();

                    List<Proveedor> ListadoProveedores = new List<Proveedor>();

                    foreach (Sam3_ServiciosTecnicos_Get_Proveedores_Result item in result)
                    {
                        ListadoProveedores.Add(new Proveedor
                        {
                            ProveedorID=item.ProveedorID,
                            Nombre=item.Nombre,
                            Capacidad =item.Capacidad
                        });
                    }

                    return ListadoProveedores;
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

        public static AsignarRequisicionBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new AsignarRequisicionBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerRequisicionAsignacion(string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ServiciosTecnicos_Get_RequisicionAsignacion_Result> result = ctx.Sam3_ServiciosTecnicos_Get_RequisicionAsignacion(lenguaje).ToList();

                    List<RequisicionAsignacion> ListadoRequisicionAsignacion = new List<RequisicionAsignacion>();

                    List<Proveedor> ListadoProveedores = (List<Proveedor>) ObtenerListaProveedores(lenguaje);

                    foreach (Sam3_ServiciosTecnicos_Get_RequisicionAsignacion_Result item in result)
                    {
                        ListadoRequisicionAsignacion.Add(new RequisicionAsignacion
                        {
                            Clave = item.Clave,
                            Observacion = item.Observacion,
                            Fecha = item.Fecha,
                            CantidadJuntas = item.CantidadJuntas.GetValueOrDefault(),
                            ProveedorID = item.ProveedorID.GetValueOrDefault(),
                            Proveedor = item.Proveedor == null ? "" : item.Proveedor,
                            RequisicionID = item.RequisicionID,
                            ListaProveedor = ListadoProveedores
                        });
                    }

                    return ListadoRequisicionAsignacion;
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