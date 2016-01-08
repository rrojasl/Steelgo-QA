using BackEndSAM.Models.Pintura.MedioTransporte;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;


namespace BackEndSAM.DataAcces.PinturaBD.MedioTransporteBD
{
    public class MedioTransporteBD
    {
        private static readonly object _mutex = new object();
        private static MedioTransporteBD _instance;

        public static MedioTransporteBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new MedioTransporteBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerMedioTransporte(string lenguaje)
        {
          

            try
            {
                using (SamContext ctx = new SamContext())
                {
                    //
                    List<Sam3_Pintura_Get_MedioTransporte_Result> result = ctx.Sam3_Pintura_Get_MedioTransporte(lenguaje).ToList();

                    List<MedioTransporte> ListadoMedioTransporte = new List<MedioTransporte>();

                    foreach (Sam3_Pintura_Get_MedioTransporte_Result item in result)
                    {
                        ListadoMedioTransporte.Add(new MedioTransporte
                        {
                            AreaPermitidoMedioTransporte = item.AreaPermitidoMedioTransporte.GetValueOrDefault(),
                            MedioTransporteID = item.MedioTransporteID,
                            NombreMedioTransporte = item.NombreMedioTransporte,
                            NumeroUsosOcupados = item.NumeroUsosOcupados.GetValueOrDefault(),
                            NumeroUsosPermitidos = item.NumeroUsosPermitidas.GetValueOrDefault(),
                            PesoMaximoPermitido = item.PesoMaximoPermitiido.GetValueOrDefault(),
                            PesoMaximoOcupado = item.PesoMaximoOcupado.GetValueOrDefault()
                        });
                       
                    }
                    return ListadoMedioTransporte;
                    //
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



        public object ObtieneDetalle(int medioTransporteID,int TipoConsulta, int OrdenTrabajoSpoolID, string Codigo, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Pintura_Get_DetalleSpool_Result> result = ctx.Sam3_Pintura_Get_DetalleSpool(medioTransporteID, TipoConsulta, OrdenTrabajoSpoolID, Codigo, lenguaje).ToList();

                    List<DetalleSpool> ListadoDetalleSpool = new List<DetalleSpool>();

                    foreach (Sam3_Pintura_Get_DetalleSpool_Result item in result)
                    {
                        ListadoDetalleSpool.Add(new DetalleSpool
                        {

                        });
                    }
                    return ListadoDetalleSpool;
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