using DatabaseManager.Sam3;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BackEndSAM.Models.ServiciosTecnicos.CapturaReportes;

namespace BackEndSAM.DataAcces
{
    public class CapturaReportesBd : ApiController
    {
        private static readonly object _mutex = new object();
        private static CapturaReportesBd _instance;


        public static CapturaReportesBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new CapturaReportesBd();
                    }
                }
                return _instance;
            }
        }



        public object ObtenerDatosRequisicion(string IdRequisicion)
        {

            using (SamContext ctx = new SamContext())
            {
                List<CapturaReportes> data = (from CR in ctx.Sam3_ServiciosTecnicos_Get_RequisicionDetalle(Convert.ToInt32(IdRequisicion))
                                              select new CapturaReportes
                                              {
                                                  TipoPrueba = CR.TipoPrueba,
                                                  Requisicion = CR.Requisicion,
                                                  HerramientaPrueba = CR.HerramientaPrueba,
                                                  TurnoLaboral = CR.TurnoLaboral

                                              }).AsParallel().ToList();
                return data;

            }

        }

        ///---------------------2------------------///

        public object ObtenerDatosRequisicionDetalle(int RequisicionID)
        {

            using (SamContext ctx = new SamContext())
            {

                List<CapturaReporteDetalles> data = (from CRD in ctx.Sam3_ServiciosTecnicos_Get_ReportePruebasDetalle(RequisicionID)
                                                     select new CapturaReporteDetalles
                                                     {
                                                         RequisicionPruebaElementoID = Convert.ToString(CRD.RequisicionPruebaElementoID),
                                                         SpoolJunta = CRD.SpoolJunta,
                                                         NumeroPlacas = Convert.ToString(CRD.NumeroPlacas),
                                                         Tamano = CRD.Tamano,
                                                         Densidad = CRD.Densidad,
                                                         DetallePruebas = obtenerListaDetallePruebas(ctx.Sam3_ServiciosTecnicos_Get_PruebasResultadoDetalle(CRD.RequisicionPruebaElementoID).ToList())
                                                     }).AsParallel().ToList();
                return data;
            }

        }


        public List<DetallePruebas> obtenerListaDetallePruebas(List<Sam3_ServiciosTecnicos_Get_PruebasResultadoDetalle_Result> listaDetallePruebasResult)
        {
            using (SamContext ctx = new SamContext())
            {

                foreach (Sam3_ServiciosTecnicos_Get_PruebasResultadoDetalle_Result item in listaDetallePruebasResult)
                {


                    DetallePruebas detallePruebas = new DetallePruebas
                    {
                        PruebaElementoResultadoID = item.PruebaElementoResultadoID,
                        Resultado = item.Resultado.ToString(),
                        Ubicacion = item.Ubicacion,
                        DetalleDefectos = obtenerListaDefectos(ctx.Sam3_ServiciosTecnicos_Get_PruebasDefectosDetalle(item.PruebaElementoResultadoID).ToList())
                    };
                   

                }

            }

            return new List<DetallePruebas>();

        }






        public List<DetalleDefectos> obtenerListaDefectos(List<Sam3_ServiciosTecnicos_Get_PruebasDefectosDetalle_Result> listaDefectosResult)
        {
            foreach (Sam3_ServiciosTecnicos_Get_PruebasDefectosDetalle_Result item in listaDefectosResult)
            {
                DetalleDefectos detallePruebas = new DetalleDefectos
                {
                    Inicio = item.InicioDefecto,
                    Fin = item.FinDefecto
                };
                
            }

            return new List<DetalleDefectos>();
        }


    }

}
