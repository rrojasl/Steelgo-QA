using BackEndSAM.Models.ServiciosTecnicos.AsignarRequisicion;
using BackEndSAM.Models.ServiciosTecnicos.ServiciosTecnicosGeneral;
using DatabaseManager.Constantes;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.ServiciosTecnicos
{
    public class AsignarRequisicionBD
    {
        private static readonly object _mutex = new object();
        private static AsignarRequisicionBD _instance;

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


        public object ObtenerRequisicionAsignacion(string lenguaje, int tipoVista, int tipoPruebaID, int proyectoID, int patioID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ST_Get_AsignarRequisicion_Result> result = ctx.Sam3_ST_Get_AsignarRequisicion(lenguaje, tipoVista, tipoPruebaID, proyectoID).ToList();
                    List<RequisicionAsignacion> ListadoRequisicionAsignacion = new List<RequisicionAsignacion>();

                    List<TurnoLaboral> listaTurnoLaboralAll = (List<TurnoLaboral>) ObtenerTurnoLaboralTotal(lenguaje);
                    List<Equipo> listaEquipoAll = (List<Equipo>)ServiciosTecnicosGeneral.ServiciosTecnicosGeneralBD.Instance.ObtenerListadoEquipos(tipoPruebaID, 0, lenguaje);

                    foreach (Sam3_ST_Get_AsignarRequisicion_Result item in result)
                    {
                        ListadoRequisicionAsignacion.Add(new RequisicionAsignacion
                        {
                            Accion = item.RequisicionAsignacionID == 0 ? 1 : 2,
                            RequisicionAsignacionID = item.RequisicionAsignacionID,
                            Nombre = item.TipoPrueba,
                            TipoPruebaID = item.TipoPruebaID.GetValueOrDefault(),
                            Observacion = item.Observaciones,
                            Fecha = item.Fecha,
                            CantidadJuntas = item.NumeroElementos.GetValueOrDefault(),
                            Capacidad = "",
                            JuntasAsignadas = "",
                            JuntasAsignadasOriginal = "0",
                            ProveedorID = item.ProveedorID.GetValueOrDefault(),
                            ProveedorOriginalID = item.ProveedorID.GetValueOrDefault(),
                            Proveedor = item.Proveedor == null ? "" : item.Proveedor,
                            RequisicionID = item.RequisicionID,
                            Requisicion = item.Requisicion,
                            ProyectoID = item.ProyectoID,
                            ListaProveedor = (List<Proveedor>)ServiciosTecnicosGeneral.ServiciosTecnicosGeneralBD.Instance.ObtenerListadoProveedores(item.ProyectoID, patioID, item.TipoPruebaID.GetValueOrDefault()),
                            Equipo = item.Equipo,
                            EquipoID = item.EquipoID.GetValueOrDefault(),
                            HerramientadePruebaOriginalID = item.EquipoID.GetValueOrDefault(),
                            TurnoLaboral = item.TurnoLaboral,
                            TurnoLaboralID = item.TurnoLaboralID.GetValueOrDefault(),
                            TurnoLaboralOriginalID = item.TurnoLaboralID.GetValueOrDefault(),
                            ListaEquipos = (List<Equipo>)ServiciosTecnicosGeneral.ServiciosTecnicosGeneralBD.Instance.ObtenerListadoEquipos(item.TipoPruebaID.GetValueOrDefault(), item.ProveedorID.GetValueOrDefault(), lenguaje),
                            ListaEquiposTotal = listaEquipoAll,
                            ListaTurnoLaboral = (List<TurnoLaboral>)ServiciosTecnicosGeneral.ServiciosTecnicosGeneralBD.Instance.ObtenerListadoTurnos(item.TipoPruebaID.GetValueOrDefault(), item.ProveedorID.GetValueOrDefault(), item.EquipoID.GetValueOrDefault(), lenguaje),
                            ListaTurnoLaboralTotal = listaTurnoLaboralAll,
                            RequiereEquipo = item.RequiereEquipo,
                            ListaElementosRequisicion = (List<ElementosRequisicion>) ObtenerElementosRequisicion(lenguaje, item.ProyectoID,item.TipoPruebaID.GetValueOrDefault(),item.RequisicionID),
                            CapacidadTurnoEquipoID = item.CapacidadTurnoEquipoID,
                            TipoPruebaProveedorID = item.CapacidadTurnoProveedorID,
                            CapacidadTurnoProveedorID = item.CapacidadTurnoProveedorID,
                            ProveedorEquipoID = item.ProveedorEquipoID

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


        public object ObtenerElementosRequisicion(string lenguaje, int proyectoID, int tipoPruebaID, int requisicionID)
        {
            try
            {
                List<ElementosRequisicion> listaElementosRequisicion = new List<ElementosRequisicion>();
                using (SamContext ctx = new SamContext())
                {
                    
                    List<Sam3_ST_Get_ElementosPorPruebaRequisicion_Result> result = ctx.Sam3_ST_Get_ElementosPorPruebaRequisicion(lenguaje,proyectoID,tipoPruebaID,requisicionID).ToList();
                    foreach (var item in result)
                    {
                        listaElementosRequisicion.Add(new ElementosRequisicion
                        {
                            Cedula = item.Cedula,
                            Clasificacion = item.Clasificacion,
                            Cuadrante = item.Cuadrante,
                            Diametro = item.Diametro,
                            ElementoPorClasificacionPNDID = item.ElementoPorClasificacionPNDID,
                            Especificacion = item.Especificacion,
                            Espesor  = item.Espesor.GetValueOrDefault(),
                            EtiquetaJunta = item.EtiquetaJunta,
                            JuntaSpoolID = item.JuntaSpoolID,
                            NombreRequisicion = item.NombreRequisicion,
                            NumeroControl = item.NumeroControl,
                            OrdenTrabajoSpoolID = item.OrdenTrabajoSpoolID,
                            Prioridad = item.Prioridad.GetValueOrDefault(),
                            ProyectoID = item.ProyectoID,
                            RequisicionID = item.RequisicionID,
                            SpoolID = item.SpoolID,
                            TipoJunta = item.TipoJunta,
                            TipoPruebaID = item.TipoPruebaID.GetValueOrDefault()

                        });
                    }
                }
                return listaElementosRequisicion;
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

        public object ObtenerTurnoLaboralTotal (string lenguaje)
        {
            try
            {
                List<TurnoLaboral> listaTurnoLaboralTotal = new List<TurnoLaboral>();
                using (SamContext ctx = new SamContext())
                {

                    List<Sam3_ST_Get_TurnoLaboralAsignarRequisicion_Result> result = ctx.Sam3_ST_Get_TurnoLaboralAsignarRequisicion(lenguaje).ToList();
                    foreach (var item in result)
                    {
                        listaTurnoLaboralTotal.Add(new TurnoLaboral
                        {
                            TurnoLaboralID = item.TurnoLaboralID,
                            Nombre = item.Turno,
                            TipoPruebaProveedorID = item.TipoPruebaProveedorID,
                            Capacidad = item.Capacidad,
                            CapacidadTurnoEquipoID = item.CapacidadTurnoEquipoID,
                            CapacidadTurnoProveedorID = item.CapacidadTurnoProveedorID
                        });
                    }
                }
                return listaTurnoLaboralTotal;
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