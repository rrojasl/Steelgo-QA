using BackEndSAM.Models.ServiciosTecnicos.ReporteRT;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.ServiciosTecnicos.ReporteRT
{
    public class ReporteRTBD
    {
        private static readonly object _mutex = new object();
        private static ReporteRTBD _instance;

        public static ReporteRTBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new ReporteRTBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerListadoProyectos(Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Proyectos> listaProyectos = new List<Proyectos>();
                    List<Sam3_ST_CRRT_Get_ListaProyectos_Result> listaProyectosCTX = ctx.Sam3_ST_CRRT_Get_ListaProyectos(usuario.UsuarioID).ToList();
                    listaProyectos.Add(new Proyectos());
                    foreach (Sam3_ST_CRRT_Get_ListaProyectos_Result item in listaProyectosCTX)
                    {
                        listaProyectos.Add(new Proyectos
                        {
                            ProyectoID = item.ProyectoID,
                            Nombre = item.Nombre,
                            PatioID = item.PatioID,
                            PrefijoOrdenTrabajo = item.PrefijoOrdenTrabajo
                        });
                    }

                    return listaProyectos;
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object ObtenerListadoProveedores(int proyectoID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Proveedor> listaProveedores = new List<Proveedor>();
                    List<Sam3_ST_CRRT_Get_Proveedores_Result> listaProveedorCTX = ctx.Sam3_ST_CRRT_Get_Proveedores(proyectoID).ToList();
                    listaProveedores.Add(new Proveedor());
                    foreach (Sam3_ST_CRRT_Get_Proveedores_Result item in listaProveedorCTX)
                    {
                        listaProveedores.Add(new Proveedor
                        {
                            ProveedorID = item.ProveedorID,
                            Nombre = item.Proveedor
                        });
                    }

                    return listaProveedores;
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }


        public object ObtenerTipoPruebas(int proyectoID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<TipoPruebaRT> listatiposPruebas = new List<TipoPruebaRT>();
                    List<Sam3_ReportesRT_ST_Get_Tipos_Pruebas_Result> listaTipoPruebasCTX = ctx.Sam3_ReportesRT_ST_Get_Tipos_Pruebas(proyectoID).ToList();
                    listatiposPruebas.Add(new TipoPruebaRT());
                    foreach (Sam3_ReportesRT_ST_Get_Tipos_Pruebas_Result item in listaTipoPruebasCTX)
                    {
                        listatiposPruebas.Add(new TipoPruebaRT
                        {
                            TipoPruebaID = item.TipoPruebaID,
                            Nombre = item.Nombre
                        });
                    }

                    return listatiposPruebas;
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }


        public object ObtenerListadoRequisiciones(Sam3_Usuario usuario, int proyectoID, int proveedorID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    List<Requisicion> listaRequisiciones = new List<Requisicion>();
                    List<Sam3_ST_CRRT_Get_Requisiciones_Result> listaRequisicionesCTX = ctx.Sam3_ST_CRRT_Get_Requisiciones(proyectoID, proveedorID).ToList();
                    listaRequisiciones.Add(new Requisicion());
                    foreach (Sam3_ST_CRRT_Get_Requisiciones_Result item in listaRequisicionesCTX)
                    {
                        listaRequisiciones.Add(new Requisicion
                        {
                            RequisicionID = item.RequisicionID,
                            ProyectoID = item.ProyectoID,
                            TipoPruebaID = item.TipoPruebaID.GetValueOrDefault(),
                            NombreRequisicion = item.NombreRequisicion,
                            FechaRequisicion = item.FechaRequisicion.ToString(),
                            Observacion = item.Observaciones
                        });
                    }

                    return listaRequisiciones;
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object ObtenerListadoEquipos(string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    List<Equipo> listaEquipos = new List<Equipo>();
                    List<Sam3_ST_CRRT_Get_Equipo_Result> listaEquiposCTX = ctx.Sam3_ST_CRRT_Get_Equipo(lenguaje).ToList();
                    listaEquipos.Add(new Equipo());
                    foreach (Sam3_ST_CRRT_Get_Equipo_Result item in listaEquiposCTX)
                    {
                        listaEquipos.Add(new Equipo
                        {
                            EquipoID = item.EquipoID,
                            NombreEquipo = item.Equipo
                        });
                    }

                    return listaEquipos;
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object ObtenerListadoTurnos(string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    List<TurnoLaboral> listaTurnosLaborales = new List<TurnoLaboral>();
                    List<Sam3_ST_CRRT_Get_TurnoLaboral_Result> listaTurnosLaboralesCTX = ctx.Sam3_ST_CRRT_Get_TurnoLaboral(lenguaje).ToList();
                    listaTurnosLaborales.Add(new TurnoLaboral());
                    foreach (Sam3_ST_CRRT_Get_TurnoLaboral_Result item in listaTurnosLaboralesCTX)
                    {
                        listaTurnosLaborales.Add(new TurnoLaboral
                        {
                            TurnoLaboralID = item.TurnoLaboralID,
                            Turno = item.Turno
                        });
                    }

                    return listaTurnosLaborales;
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }


        public object ObtieneElementosRequisicion(string lenguaje, int requisicionID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ElementoRequisicion elemento = null;
                    //Sam3_ST_Get_AR_RequisicionParametro_Result result = ctx.Sam3_ST_Get_AR_RequisicionParametro(lenguaje, requisicionID).SingleOrDefault();
                    Sam3_ST_Get_CR_RequisicionParametro_Result result = ctx.Sam3_ST_Get_CR_RequisicionParametro(lenguaje, requisicionID).SingleOrDefault();

                    if (result != null && result.RequisicionID != 0)
                    {
                        elemento = new ElementoRequisicion();

                        List<Proyecto> listaProyecto = new List<Proyecto>();
                        listaProyecto.Add(new Proyecto());
                        listaProyecto.Add(new Proyecto
                        {
                            ProyectoID = result.ProyectoID,
                            Nombre = result.Proyecto,
                            PatioID = result.PatioID,
                            ProveedorID = result.ProveedorID

                        });

                        List<TipoPrueba> listaTipoPrueba = new List<TipoPrueba>();
                        listaTipoPrueba.Add(new TipoPrueba());
                        listaTipoPrueba.Add(new TipoPrueba
                        {
                            TipoPruebaID = result.TipoPruebaID.GetValueOrDefault(),
                            Nombre = result.TipoPrueba
                        });

                        List<Proveedor> ListaProveedor = new List<Proveedor>();
                        ListaProveedor.Add(new Proveedor());
                        ListaProveedor.Add(new Proveedor {
                            ProveedorID = result.ProveedorID,
                            Nombre = result.Proveedor
                        });

                        List<Requisicion2> listaRequisicion = new List<Requisicion2>();
                        listaRequisicion.Add(new Requisicion2());
                        listaRequisicion.Add(new Requisicion2
                        {
                            RequisicionID = result.RequisicionID,
                            ProyectoID = result.ProyectoID,
                            NombreRequisicion = result.NumeroRequisicion,
                            TipoPruebaID = result.TipoPruebaID.GetValueOrDefault(),
                        });


                        elemento.RequisicionID = result.RequisicionID;
                        elemento.ProyectoID = result.ProyectoID;
                        elemento.TipoPruebaID = result.TipoPruebaID.GetValueOrDefault();
                        elemento.listaProyecto = listaProyecto;
                        elemento.listaTipoPrueba = listaTipoPrueba;
                        elemento.listaProveedor = ListaProveedor;
                        elemento.listaRequisicion = listaRequisicion;
                    }
                    return elemento;
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