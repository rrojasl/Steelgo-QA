using BackEndSAM.Models.ServiciosTecnicos.ImpresionPruebas;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.ServiciosTecnicosBD.ImpresionPruebasBD
{
    public class ImpresionPruebasBD
    {
        private static readonly object _mutex = new object();
        private static ImpresionPruebasBD _instance;
        public static ImpresionPruebasBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new ImpresionPruebasBD();
                    }
                }
                return _instance;
            }
        }
        public object ObtenerListaImpresionPruebas(string lenguaje)
        {
            try
            {


                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ServiciosTecnicos_Get_Pruebas_Reporte_Impresion_Result> result = ctx.Sam3_ServiciosTecnicos_Get_Pruebas_Reporte_Impresion(lenguaje).ToList();
                    List<ImpresionPruebas> ListadoImpresionPruebas = new List<ImpresionPruebas>();
                    foreach (Sam3_ServiciosTecnicos_Get_Pruebas_Reporte_Impresion_Result item in result)
                    {
                        ListadoImpresionPruebas.Add(new ImpresionPruebas
                        {
                            Clave = item.Clave,
                            SpoolJunta = item.NumeroControl + "," + item.EtiquetaJunta,
                            Nombre = item.Nombre,
                            NumeroPruebas = item.NumeroPruebas.GetValueOrDefault(),
                            RequisicionPruebaElementoID = item.RequisicionPruebaElementoID,
                            ReporteID = item.ReporteID,
                            Seleccionado = false,
                            Status= item.ReporteID != null ? "A" : "SA",
                            ReportePath=item.ReportePath
                        });
                    }


                    return ListadoImpresionPruebas;
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

        public object GenerarFolioReporte(DataTable dtDetalleCaptura, Sam3_Usuario usuario, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = { { "@Usuario", usuario.UsuarioID.ToString() }, { "@Lenguaje", lenguaje } };
                    _SQL.Coleccion(Stords.GENERARFOLIOREPORTESIMPRESION, dtDetalleCaptura, "@GenerarReporteID", parametro);
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