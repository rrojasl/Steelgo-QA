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
                            CarroCerrado = true//item.CarroCerrado.GetValueOrDefault()
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

                    int resultSp = _SQL.EjecutaInsertUpdate(Stords.GUARDACAPTURANUEVOMEDIOTRANSPORTE, dtMedioTransporte, "@Tabla");
                    TransactionalInformation result = new TransactionalInformation();
                    
                    if (resultSp > 0)
                    {
                        result.ReturnMessage.Add("Ok");
                        result.ReturnCode = 200;
                        result.ReturnStatus = true;
                        result.IsAuthenicated = true;
                    }
                    else
                    {
                        result.ReturnMessage.Add("El Carro ya existe");
                        result.ReturnCode = 200;
                        result.ReturnStatus = true;
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

        public object ObtenerColor(string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Color> listaColor = new List<Color>();
                    List<Sam3_Steelgo_Get_Color_Result> result = ctx.Sam3_Steelgo_Get_Color(lenguaje).ToList();

                    listaColor.Add(new Color());
                    foreach (Sam3_Steelgo_Get_Color_Result item in result)
                    {
                        listaColor.Add(new Color
                        {
                            ColorID = item.ColorID,
                            Nombre = item.Nombre,
                            CodigoHexadecimal = item.CodigoHexadecimal
                        });
                    }

                    return listaColor;
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