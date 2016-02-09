using BackEndSAM.Models.ServiciosTecnicos.AsignarRequisicion;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace BackEndSAM.DataAcces.ServiciosTecnicosBD.AsignarRequisicionBD
{
    public class AsignarRequisicionBD
    {
        private static readonly object _mutex = new object();
        private static AsignarRequisicionBD _instance;
        public object ObtenerListaProveedores(string lenguaje, int idPrueba, int ConsultaDetalle)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ServiciosTecnicos_Get_Proveedores_Result> result = ctx.Sam3_ServiciosTecnicos_Get_Proveedores(lenguaje, idPrueba).ToList();

                    List<Proveedor> ListadoProveedores = new List<Proveedor>();

                    //List<HerramientaPrueba> ListadoHerramientasPrueba = (List<HerramientaPrueba>)ObtenerListaHerramientaPruebas(lenguaje, idPrueba);

                    //List<TurnoLaboral> ListadoTurnos = (List<TurnoLaboral>)ObtenerListaTurnoLaboral(lenguaje, idPrueba);

                    if (ConsultaDetalle == 1)
                    {
                        foreach (Sam3_ServiciosTecnicos_Get_Proveedores_Result item in result)
                        {
                            ListadoProveedores.Add(new Proveedor
                            {
                                ProveedorID = item.ProveedorID,
                                Nombre = item.Nombre,
                                Capacidad = item.Capacidad,
                                //ListaHerramientaPrueba= ListadoHerramientasPrueba,
                                //ListaTurnoLaboral= ListadoTurnos
                                ListaHerramientaPrueba = (List<HerramientaPrueba>)ObtenerListaHerramientaPruebas(lenguaje, idPrueba, item.ProveedorID),
                                ListaTurnoLaboral = (List<TurnoLaboral>)ObtenerListaTurnoLaboral(lenguaje, idPrueba, item.ProveedorID)
                            });
                        }
                    }
                    else if (ConsultaDetalle == 0)
                    {
                        foreach (Sam3_ServiciosTecnicos_Get_Proveedores_Result item in result)
                        {
                            ListadoProveedores.Add(new Proveedor
                            {
                                ProveedorID = item.ProveedorID,
                                Nombre = item.Nombre,
                                Capacidad = item.Capacidad,
                            });
                        }
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
        public object ObtenerRequisicionAsignacion(string lenguaje,int tipoVista, int idPrueba, int idProveedor)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ServiciosTecnicos_Get_RequisicionAsignacion_Result> result = ctx.Sam3_ServiciosTecnicos_Get_RequisicionAsignacion(lenguaje, tipoVista).ToList();

                    List<RequisicionAsignacion> ListadoRequisicionAsignacion = new List<RequisicionAsignacion>();

                    List<Proveedor> ListadoProveedores = (List<Proveedor>)ObtenerListaProveedores(lenguaje, idPrueba, 1);

                    //List<HerramientaPrueba> ListadoHerramientasPrueba = 

                    //List<TurnoLaboral> ListadoTurnos = ;

                    foreach (Sam3_ServiciosTecnicos_Get_RequisicionAsignacion_Result item in result)
                    {
                        ListadoRequisicionAsignacion.Add(new RequisicionAsignacion
                        {
                            Accion = item.ProveedorID == null ? 1 : 2,
                            Nombre=item.Nombre,
                            Clave = item.Clave,
                            Observacion = item.Observacion,
                            Fecha = item.Fecha,
                            CantidadJuntas = item.CantidadJuntas,
                            ProveedorID = item.ProveedorID.GetValueOrDefault(),
                            Proveedor = item.Proveedor == null ? "" : item.Proveedor,
                            RequisicionID = item.RequisicionID,
                            Requisicion=item.Requisicion,
                            ListaProveedor = ListadoProveedores,
                            HerramientadePrueba = item.HerramientadePrueba,
                            HerramientadePruebaID = item.HerramientaDePruebaID.GetValueOrDefault(),
                            TurnoLaboral = item.TurnoLaboral,
                            TurnoLaboralID = item.TurnoLaboralID.GetValueOrDefault(),
                            ListaHerramientaPrueba = (List<HerramientaPrueba>)ObtenerListaHerramientaPruebas(lenguaje, idPrueba, item.ProveedorID.GetValueOrDefault()),
                            ListaTurnoLaboral = (List<TurnoLaboral>)ObtenerListaTurnoLaboral(lenguaje, idPrueba, item.ProveedorID.GetValueOrDefault()),

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
        public object ObtenerListaHerramientaPruebas(string lenguaje, int idPrueba, int idProveedor)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ServiciosTecnicos_Get_HerramientasDePrueba_Result> result = ctx.Sam3_ServiciosTecnicos_Get_HerramientasDePrueba(lenguaje, idPrueba, idProveedor).ToList();

                    List<HerramientaPrueba> ListadoHerramientaPrueba = new List<HerramientaPrueba>();

                    foreach (Sam3_ServiciosTecnicos_Get_HerramientasDePrueba_Result item in result)
                    {
                        ListadoHerramientaPrueba.Add(new HerramientaPrueba
                        {
                            DescHerramientaPrueba = item.DescHerramientaPrueba,
                            HerramientadePruebaID = item.HerramientaDePruebaID,
                            Modelo = item.Modelo,
                            HerramientadePrueba = item.Nombre
                        });
                    }

                    return ListadoHerramientaPrueba;
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
        public object ObtenerListaTurnoLaboral(string lenguaje, int idPrueba, int idProveedor)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ServiciosTecnicos_Get_TurnoLaboral_Result> result = ctx.Sam3_ServiciosTecnicos_Get_TurnoLaboral(lenguaje, idPrueba, idProveedor).ToList();

                    List<TurnoLaboral> ListadoTurnoLaboral = new List<TurnoLaboral>();

                    foreach (Sam3_ServiciosTecnicos_Get_TurnoLaboral_Result item in result)
                    {
                        ListadoTurnoLaboral.Add(new TurnoLaboral
                        {
                            Turno = item.Turno,
                            TurnoLaboralID = item.TurnoLaboralID
                        });
                    }
                    return ListadoTurnoLaboral;
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
        public object InsertarCaptura(DataTable dtDetalleCaptura, Sam3_Usuario usuario, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = { { "@Usuario", usuario.UsuarioID.ToString() }, { "@Lenguaje", lenguaje } };
                    _SQL.Ejecuta(Stords.GUARDARCAPTURAREQUISICIONASIGNACION, dtDetalleCaptura, "@AsignarRequisicion", parametro);
                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("Ok");
                    result.ReturnCode = 200;
                    result.ReturnStatus = true;
                    result.IsAuthenicated = true;
                    return result;
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