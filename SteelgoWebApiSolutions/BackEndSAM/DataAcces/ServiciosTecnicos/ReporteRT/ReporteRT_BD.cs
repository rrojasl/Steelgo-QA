
using BackEndSAM.Controllers.ServiciosTecnicos.ReporteRT;
using BackEndSAM.Models.ServiciosTecnicos.ReporteRT;
using DatabaseManager.Constantes;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace BackEndSAM.DataAcces.ServiciosTecnicos.ReporteRT
{
    public class ReporteRT_BD
    {
        private static readonly object _mutex = new Object();
        private static ReporteRT_BD _instance;

        //Constructor
        public static ReporteRT_BD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new ReporteRT_BD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerListadoProyectos(int usuarioID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ReportesRT_Get_ListaProyectos_Result> result = ctx.Sam3_ReportesRT_Get_ListaProyectos(usuarioID).ToList();


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

        public object ObtenerListadoProveedores(int proyectoID, int patioID)
        {
            try
            {

                using (SamContext ctx = new SamContext())
                {
                    
                    List<Sam3_ReportesRT_ST_Get_Proveedores_Result> result = ctx.Sam3_ReportesRT_ST_Get_Proveedores(proyectoID, 0, patioID).ToList();
                    

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

        public object ObtenerRequisiciones(int proyectoID, int proveedorID)
        {
            try
            {

                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ReportesRT_ST_Get_Requisiciones_Result> result = ctx.Sam3_ReportesRT_ST_Get_Requisiciones(proyectoID, proveedorID).ToList();


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

        public object ObtenerRequisicionesDetalle(int proyectoID, int tipoPruebaID, int proveedorID, int requisicionID, int equipoID, int turnoID,string lenguaje)
        {
            try
            {

                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ReportesRT_ST_Get_Requisiciones_Detalle_Result> result = ctx.Sam3_ReportesRT_ST_Get_Requisiciones_Detalle(proyectoID, tipoPruebaID, proveedorID, requisicionID, equipoID, turnoID,lenguaje).ToList();

                    int? numPlacas = 0;

                    List<DetalleCaptura> listaDetalleJunta = new List<DetalleCaptura>();
                    DetalleCaptura detalle = null;
                    foreach (Sam3_ReportesRT_ST_Get_Requisiciones_Detalle_Result item in result)
                    {
                        numPlacas = 0;

                        List<InformacionResultados> detalleResultados = ObtenerReportesRTResultados(item.OrdenTrabajoID, item.SpoolID.GetValueOrDefault(), item.JuntaSpoolID.GetValueOrDefault(), out numPlacas);

                        numPlacas = (numPlacas == 0 ? null : numPlacas);

                        detalle = new DetalleCaptura
                        {
                            ReporteRTID= item.ReporteRTID.GetValueOrDefault(),
                            RequisicionID=item.RequisicionID,
                            OrdenTrabajoID=item.OrdenTrabajoID,
                            SpoolID=item.SpoolID.GetValueOrDefault(),
                            JuntaSpoolID=item.JuntaSpoolID.GetValueOrDefault(),
                            SpoolJunta=item.JuntaSpoolID.GetValueOrDefault(),
                            Junta=int.Parse(item.Etiqueta.ToString()),
                            NumeroControl=item.NumeroControl,
                            EtiquetaJunta=item.NumeroRequisicion,
                            ClasificacionPND=item.ClasificacionPND,
                            TipoPrueba=item.TipoPrueba,
                            Observaciones=item.Observaciones,
                            CodigoAsme=item.CodigoAsme,
                            NumeroPlacas= numPlacas,
                            Tamano= item.Tamano ,
                            Densidad=item.Densidad,
                            ResultadoConciliacion=item.ResultadoConciliacion,
                            RazonNoConciliacion=item.RazonNoConciliacion,
                            InformacionResultados= detalleResultados,
                            Accion= 1,
                            Estatus=item.Estatus.GetValueOrDefault(),
                            Origen= item.ORIGEN,
                        };
                        listaDetalleJunta.Add(detalle);

                    }
                    return listaDetalleJunta;
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

        public List<InformacionResultados> ObtenerReportesRTResultados(int ordenTrabajoID, int spoolID, int juntaSpoolID, out int? numeroPlacas)
        {
            List<InformacionResultados> listaDetalleResultado = new List<InformacionResultados>();
            try
            {

                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ReportesRT_Get_Resultados_Result> result = ctx.Sam3_ReportesRT_Get_Resultados(ordenTrabajoID, spoolID, juntaSpoolID).ToList();

                  
                    numeroPlacas = result.Count;

                    InformacionResultados detalleResultado = null;

                    

                    foreach (Sam3_ReportesRT_Get_Resultados_Result item in result)
                    {
                        detalleResultado = new InformacionResultados
                        {
                            ReporteRTResultadosID=item.ReporteRTResultadosID,
                            ReporteRTID=item.ReporteRTID,
                            OrdenTrabajoID=item.OrdenTrabajoID,
                            SpoolID=item.SpoolID,
                            JuntaSpoolID=item.JuntaSpoolID.GetValueOrDefault(),
                            Ubicacion= item.Ubicacion,
                            Resultado=int.Parse( item.Resultado.ToString()),
                            DetalleResultados = ObtenerReportesRTResultadosDetalle(item.ReporteRTResultadosID, item.OrdenTrabajoID, item.SpoolID, item.JuntaSpoolID.GetValueOrDefault())
                        };
                        listaDetalleResultado.Add(detalleResultado);
                    }
                    return listaDetalleResultado;
                }

            }
            catch (Exception ex)
            {
                numeroPlacas = 0;
                return listaDetalleResultado;
            }
        }

        public List<DetalleResultadosDefectos> ObtenerReportesRTResultadosDetalle(int reporteResultadosID, int ordenTrabajoID, int spoolID, int juntaSpoolID)
        {
            List<DetalleResultadosDefectos> listaDetalleResultados = new List<DetalleResultadosDefectos>();
            try
            {

                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ReportesRT_Get_Resultados_Detalle_Result> result = ctx.Sam3_ReportesRT_Get_Resultados_Detalle(reporteResultadosID ,ordenTrabajoID, spoolID, juntaSpoolID).ToList();
                    DetalleResultadosDefectos detalleResulado = null;

                    foreach (Sam3_ReportesRT_Get_Resultados_Detalle_Result item in result)
                    {
                        detalleResulado = new DetalleResultadosDefectos
                        {
                            ResultadosDefectoID=item.ResultadosDefectoID,
                            ResultadosDefecto = item.ResultadosDefectoID,
                            OrdenTrabajoID = item.OrdenTrabajoID,
                            SpoolID=item.SpoolID,
                            JuntaSpoolID=item.JuntaSpoolID.GetValueOrDefault(),
                            DefectoID= item.DefectoID,
                            InicioMM=int.Parse( item.InicioMM.ToString()),
                            FinMM= int.Parse(item.FinMM.ToString()),
                            ReporteRTID = item.ReporteResultadosID
                        };
                        listaDetalleResultados.Add(detalleResulado);
                    }

                    return listaDetalleResultados;
                }

            }
            catch (Exception ex)
            {
                return listaDetalleResultados;
            }
        }

        public object ObtenerEquipos(int tipoPruebaID, int proveedorID, string lenguaje)
        {
            try
            {

                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ST_Get_Equipo_Result> result = ctx.Sam3_ST_Get_Equipo(tipoPruebaID, proveedorID, lenguaje).ToList();


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

        public object ObtenerTurnos(int tipoPruebaID, int proveedorID, int equipoID, string lenguaje)
        {
            try
            {

                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ST_Get_TurnoLaboral_Result> result = ctx.Sam3_ST_Get_TurnoLaboral(tipoPruebaID, proveedorID, equipoID, lenguaje).ToList();


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

        public object InsertarCapturaReportesRT(DataTable dtDetalleCaptura, DataTable dtDetalleResultados, DataTable dtDetalleDefectos, int usuario, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = { { "@UsuarioID", usuario.ToString() }, { "@lenguaje", lenguaje } };
                    _SQL.Ejecuta(Stords.GUARDARCAPTURAREPORTERT, dtDetalleCaptura, "@ReporteRT", dtDetalleResultados, "@ReporteRTResultados", dtDetalleDefectos, "@ReporteRTResultadosDefectos", parametro);
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

        /*
        public bool Ejecuta(string Stord, DataTable TablaSube, String NombreTabla, string[,] Parametros = null)
        {
            using (SqlCommand cmd = new SqlCommand(Stord, Conexion()))
            {
                if (Parametros != null)
                    for (int i = Numeros.CERO; i < Parametros.Length / Numeros.DOS; i++)
                        cmd.Parameters.AddWithValue(Parametros[i, Numeros.CERO].ToString(), Parametros[i, Numeros.UNO].ToString());
                cmd.Parameters.Add(new SqlParameter(NombreTabla, TablaSube));
                cmd.CommandType = CommandType.StoredProcedure;
                try
                {
                    cmd.CommandTimeout = 0;
                    cmd.Connection.Open();
                    cmd.ExecuteNonQuery();
                    cmd.Connection.Close();
                    return true;
                }
                catch (Exception e)
                {
                    cmd.Connection.Close();
                    throw new Exception(e.Message);
                }
            }
        }
        */




    }
}