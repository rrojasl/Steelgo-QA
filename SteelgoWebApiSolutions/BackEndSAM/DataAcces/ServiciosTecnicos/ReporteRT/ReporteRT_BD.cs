
using BackEndSAM.Controllers.ServiciosTecnicos.ReporteRT;
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

        public object ObtenerRequisicionesDetalle(int proyectoID, int proveedorID, int requisicionID, int equipoID, int turnoID)
        {
            try
            {

                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ReportesRT_ST_Get_Requisiciones_Detalle1_Result> result = ctx.Sam3_ReportesRT_ST_Get_Requisiciones_Detalle1(proyectoID, proveedorID, requisicionID, equipoID, turnoID).ToList();

                    System.Text.StringBuilder cad = new System.Text.StringBuilder();
                    cad.Append('[');
                    for (int i = 0; i < result.Count; i++)
                    {
                        cad.Append("{ \"SpoolJunta\": \"" + result[i].Spool+ "\", \"Junta\": \"" + result[i].JuntaSpoolID+ "\", \"NumeroControl\": \"" + result[i].SpoolID+ "\", \"EtiquetaJunta\": \"" + result[i].NumeroRequisicion+ "\", \"ClasificacionPND\": \"" + result[i].TipoPruebaProveedorID+ "\", \"TipoPrueba\": \"" + result[i].TipoPruebaProveedorID+ "\", \"Observaciones\": \"" + result[i].Observaciones+ "\", \"CodigoAsme\": \"" + result[i].CodigoAsme+ "\", \"NumeroPlacas\": 0, \"Densidad\": 0, \"Tamano\": 0, \"ResultadoConciliacion\": \"N/A\", \"RazonNoConciliacion\": \"N/A\", \"InformacionResultados\": [], \"Accion\": 1 }");
                        if (i != (result.Count - 1))
                            cad.Append(',');
                    }
                    cad.Append(']');

                    return cad.ToString();//result;
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

        public object InsertarCapturaReportesRT(DataTable dtDetalleCaptura, int usuario, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    //ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = { { "@Usuario", usuario.ToString() }, { "@Lenguaje", lenguaje } };

                    //_SQL.Ejecuta(Stords.GUARDACAPTURAENTREGAPLACASGRAFICAS, dtDetalleCaptura, "@EntregaPlacasGraficas", parametro);
                    //Ejecuta(Stords.GUARDACAPTURAENTREGAPLACASGRAFICAS, dtDetalleCaptura, "@EntregaPlacasGraficas", parametro);


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