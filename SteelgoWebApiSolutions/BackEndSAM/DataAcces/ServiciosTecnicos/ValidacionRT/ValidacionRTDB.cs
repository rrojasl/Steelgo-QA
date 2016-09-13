using BackEndSAM.Models.ServiciosTecnicos.ValidacionRT;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BackEndSAM.DataAcces.ServiciosTecnicos.ValidacionRT
{
    public class ValidacionRTDB
    {
        private static readonly object _mutex = new object();
        private static ValidacionRTDB _instance;

        public static ValidacionRTDB Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new ValidacionRTDB();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerListadoProyectosVR(Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Proyectos> listaProyectos = new List<Proyectos>();
                    List<Sam3_ST_VR_Get_ListaProyectos_Result> listaProyectosCTX = ctx.Sam3_ST_VR_Get_ListaProyectos(usuario.UsuarioID).ToList();
                    listaProyectos.Add(new Proyectos());
                    foreach (Sam3_ST_VR_Get_ListaProyectos_Result item in listaProyectosCTX)
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

        public object ObtenerListadoTiposPruebaVR(String lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<TiposDePrueba> listaTiposDePrueba = new List<TiposDePrueba>();
                    List<Sam3_ST_VR_Get_TiposDePrueba_Result> listaTiposDePruebaCTX = ctx.Sam3_ST_VR_Get_TiposDePrueba(lenguaje).ToList();
                    listaTiposDePrueba.Add(new TiposDePrueba());
                    foreach (Sam3_ST_VR_Get_TiposDePrueba_Result item in listaTiposDePruebaCTX)
                    {
                        listaTiposDePrueba.Add(new TiposDePrueba
                        {
                            TipoPruebaID = item.TipoPruebaID,
                            Nombre = item.Nombre,
                            Categoria = item.Categoria,
                            TipoPruebaPorSpool = item.TipoPruebaPorSpool.GetValueOrDefault(),
                            RequiereEquipo = (bool)item.RequiereEquipo
                        });
                    }

                    return listaTiposDePrueba;
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

        public object ObtenerListadoRequisicionesVR(Sam3_Usuario usuario, int proyectoID, int tipoPruebaID, int proveedorID, int estatusID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    List<Requisicion> listaRequisiciones = new List<Requisicion>();
                    List<Sam3_ST_VR_Get_ListaRequisiciones_Result> listaRequisicionesCTX = ctx.Sam3_ST_VR_Get_ListaRequisiciones(usuario.UsuarioID, proyectoID, tipoPruebaID, proveedorID, estatusID).ToList();
                    listaRequisiciones.Add(new Requisicion());
                    foreach (Sam3_ST_VR_Get_ListaRequisiciones_Result item in listaRequisicionesCTX)
                    {
                        listaRequisiciones.Add(new Requisicion
                        {
                            RequisicionID = item.RequisicionID,
                            ProyectoID = item.ProyectoID,
                            TipoPruebaID = item.TipoPruebaID.GetValueOrDefault(),
                            NombreRequisicion = item.NombreRequisicion,
                            CodigoAsme = item.CodigoAsme,
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


        public object ObtenerListadoProveedoresVR(int proyectoID, int tipoPruebaID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Proveedor> listaProveedores = new List<Proveedor>();
                    List<Sam3_ST_VR_Get_Proveedores_Result> listaProveedorCTX = ctx.Sam3_ST_VR_Get_Proveedores(proyectoID, tipoPruebaID).ToList();
                    listaProveedores.Add(new Proveedor());
                    foreach (Sam3_ST_VR_Get_Proveedores_Result item in listaProveedorCTX)
                    {
                        listaProveedores.Add(new Proveedor
                        {
                            ProveedorID = item.ProveedorID,
                            TipoPruebaProveedorID = item.TipoPruebaProveedorID,
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

        public object ObtenerLOGINProveedor(int ProveedorID, int ProyectoID, string NombreProveedor, string Password)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<LoginProveedor> listaProveedores = new List<LoginProveedor>();
                    List<Sam3_ST_Get_LOGINProveedores_Result> listaProveedorCTX = ctx.Sam3_ST_Get_LOGINProveedores(ProveedorID, ProyectoID, NombreProveedor, Password).ToList();
                    foreach (Sam3_ST_Get_LOGINProveedores_Result item in listaProveedorCTX)
                    {
                        listaProveedores.Add(new LoginProveedor
                        {
                            ProveedorID = item.ProveedorID,
                            Nombre = item.Nombre
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
    }
}