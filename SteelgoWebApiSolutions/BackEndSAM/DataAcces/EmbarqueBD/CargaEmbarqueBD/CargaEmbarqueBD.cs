using BackEndSAM.Models.Embarque.CargaEmbarque;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.EmbarqueBD.CargaEmbarqueBD
{

    public class CargaEmbarqueBD
    {
        private static readonly object _mutex = new object();
        private static CargaEmbarqueBD _instance;

        public static CargaEmbarqueBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new CargaEmbarqueBD();
                    }
                }
                return _instance;
            }
        }

        public  object ObtenerPlacasPlana(int TransportistaID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Steelgo_Get_Plana_Result> result = ctx.Sam3_Steelgo_Get_Plana(TransportistaID).ToList();

                    List<PlacaPlana> ListadoPlacaPlana = new List<PlacaPlana>();

                    foreach (Sam3_Steelgo_Get_Plana_Result item in result)
                    {
                        ListadoPlacaPlana.Add(new PlacaPlana
                        {
                            Placas = item.Placas,
                            VehiculoID=item.VehiculoID 
                        });
                    }
                    return ListadoPlacaPlana;
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

        public object ObtenerPaquetes(int tipo)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Embarque_Get_Paquetes_Result> result = ctx.Sam3_Embarque_Get_Paquetes(tipo).ToList();

                    List<Paquete> ListadoPaquetes = new List<Paquete>();

                    foreach (Sam3_Embarque_Get_Paquetes_Result item in result)
                    {
                        ListadoPaquetes.Add(new Paquete
                        {
                            EmbarquePaqueteID=item.EmbarquePaqueteID,
                            Folio=item.Folio
                        });
                    }
                    return ListadoPaquetes;
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

        public object ObtieneDetalle(int TipoConsulta, int OrdenTrabajoSpoolID, int Paquete, string Codigo, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Embarque_Get_CargaSpool_Result> result = ctx.Sam3_Embarque_Get_CargaSpool(TipoConsulta, OrdenTrabajoSpoolID, Paquete, Codigo,lenguaje).ToList();

                    List<DetalleCargaCaptura> ListadoDetalleCargaCaptura = new List<DetalleCargaCaptura>();

                    int consecutivo = 1;

                    foreach(Sam3_Embarque_Get_CargaSpool_Result item in result)
                    {
                        ListadoDetalleCargaCaptura.Add(new DetalleCargaCaptura
                        {
                            Consecutivo = consecutivo,
                            Cuadrante = item.Cuadrante,
                            CuadranteID = item.CuadranteID,
                            EmbarquePaqueteID = item.EmbarquePaqueteID,
                            Mensaje = item.Mensaje,
                            NumeroControl = item.NumeroControl,
                            OrdenTrabajoSpoolID = item.OrdenTrabajoSpoolID,
                            Paquete = item.Paquete,
                            Peso = double.Parse(item.Peso.ToString()),
                            SpoolID = item.SpoolID,
                            Seleccionado = false
                        });
                        consecutivo++;
                    }
                    return ListadoDetalleCargaCaptura;
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