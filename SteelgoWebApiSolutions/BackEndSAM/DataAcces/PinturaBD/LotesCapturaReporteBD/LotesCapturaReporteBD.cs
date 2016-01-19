using BackEndSAM.Models.Pintura.LotesCapturaReporte;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.PinturaBD.LotesCapturaReporteBD
{
    public class LotesCapturaReporteBD
    {
        private static readonly object _mutex = new object();
        private static LotesCapturaReporteBD _instance;

        public static LotesCapturaReporteBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new LotesCapturaReporteBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerSistemaPintura()
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Pintura_Get_SistemaPintura_Result> result = ctx.Sam3_Pintura_Get_SistemaPintura().ToList();

                    List<SistemaPintura> listaSistemaPintura = new List<SistemaPintura>();
                    foreach (Sam3_Pintura_Get_SistemaPintura_Result item in result)
                    {
                        listaSistemaPintura.Add(
                         new SistemaPintura
                         {
                             NombreSistemaPintura = item.SistemaPintura,
                             SistemaPinturaID = item.SistemaPinturaID
                         });

                    }
                    return listaSistemaPintura;

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

        public object ObtenerSistemaLotes()
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Steelgo_Get_LotePintura_Result> result = ctx.Sam3_Steelgo_Get_LotePintura().ToList();

                    List<LotePintura> listaLotePintura = new List<LotePintura>();
                    foreach (Sam3_Steelgo_Get_LotePintura_Result item in result)
                    {
                        listaLotePintura.Add(
                         new LotePintura
                         {
                             LotePinturaID=item.LotePinturaID,
                             NumeroLote=item.NumeroLote
                         });

                    }
                    return listaLotePintura;

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

        public object ObtenerSpoolStatusPrueba(int sistemaPinturaID,int lotePinturaID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Pintura_Get_Status_Spool_Result> result = ctx.Sam3_Pintura_Get_Status_Spool(sistemaPinturaID, lotePinturaID).ToList();

                    List<StatusSpool> listaStatusPintura = new List<StatusSpool>();
                    foreach (Sam3_Pintura_Get_Status_Spool_Result item in result)
                    {
                        listaStatusPintura.Add(
                         new StatusSpool
                         {
                             SpoolID = item.SpoolID,
                             NombreSpool = item.NombreSpool,
                             SistemaPinturaID = item.SistemaPinturaID,
                             SistemaPintura = item.SistemaPintura,
                             ColorPinturaID = item.ColorPinturaID,
                             Color = item.Color,
                             LotePinturaID = item.LotePinturaID,
                             NumeroLote = item.NumeroLote,
                             PinturaComponenteComposicionID = item.PinturaComponenteComposicionID,
                             Nombre = item.Nombre,
                             Area = item.Area.GetValueOrDefault(),
                             CuadranteID = item.CuadranteID.GetValueOrDefault(),
                             NombreCuadrante = item.NombreCuadrante,
                             CapturaPrueba=item.CapturaPrueba.GetValueOrDefault()
                         });

                    }
                    return listaStatusPintura;

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