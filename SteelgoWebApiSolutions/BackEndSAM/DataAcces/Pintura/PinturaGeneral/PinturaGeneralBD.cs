using BackEndSAM.Models.Pintura.PinturaGeneral;
using DatabaseManager.Constantes;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.Pintura.PinturaGeneral
{
    public class PinturaGeneralBD
    {
        private static readonly object _mutex = new Object();
        private static PinturaGeneralBD _instance;

        public static PinturaGeneralBD Instance
        {
            get
            {
                lock(_mutex){
                    if (_instance == null)
                    {
                        _instance = new PinturaGeneralBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerMedioTransporte(string lenguaje, int proyectoID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<MedioTransporte> listaMedioTransporte = new List<MedioTransporte>();
                    List<Sam3_Pintura_ObtieneMedioTransporte_Result> result = ctx.Sam3_Pintura_ObtieneMedioTransporte(lenguaje, proyectoID).ToList();

                    listaMedioTransporte.Add(new MedioTransporte());
                    foreach (Sam3_Pintura_ObtieneMedioTransporte_Result item in result)
                    {
                        listaMedioTransporte.Add(new MedioTransporte {
                            MedioTransporteID = item.MedioTransporteID,
                            MedioTransporteCargaID = item.MedioTransporteCargaID.GetValueOrDefault(),
                            Nombre = item.Nombre,
                            ProyectoID = item.ProyectoID.GetValueOrDefault(),
                            CarroCerrado = item.CarroCerrado.GetValueOrDefault()
                        });
                    }

                    return listaMedioTransporte;
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

        public object ObtenerMedioTransporte(DataTable dtMedioTransporte)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ObjetosSQL _SQL = new ObjetosSQL();

                    DataTable dt = _SQL.EjecutaDataAdapter(Stords.GUARDACAPTURANUEVOMEDIOTRANSPORTE, dtMedioTransporte, "@Tabla", null);
                    TransactionalInformation result = new TransactionalInformation();
                    if (dt.Rows.Count == 0)
                    {

                        result.ReturnMessage.Add("Ok");
                        result.ReturnCode = 200;
                        result.ReturnStatus = true;
                        result.IsAuthenicated = true;
                    }
                    else
                    {

                        result.ReturnMessage.Add(dt.Rows[0][0].ToString());
                        result.ReturnCode = 500;
                        result.ReturnStatus = false;
                        result.IsAuthenicated = true;
                    }


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