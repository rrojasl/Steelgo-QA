using BackEndSAM.Models.Pintura.PinturaGeneral;
using DatabaseManager.Constantes;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
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
                    List<Sam3_Pintura_Get_MedioTransporte_Result> result = ctx.Sam3_Pintura_Get_MedioTransporte(lenguaje, proyectoID).ToList();

                    listaMedioTransporte.Add(new MedioTransporte());
                    foreach (Sam3_Pintura_Get_MedioTransporte_Result item in result)
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

        public object GuardarMedioTransporte(DataTable dtMedioTransporte)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ObjetosSQL _SQL = new ObjetosSQL();

                    int resultSp = _SQL.EjecutaInsertUpdate(Stords.GUARDACAPTURANUEVOMEDIOTRANSPORTE, dtMedioTransporte, "@TablaMedioTransporte");
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
                            Nombre = item.Nombre
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

        public object ObtenerSpoolConSP(int proyectoID,string dato,int tipoBusqueda,string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<PinturaRevision> listaRevisionSpool = new List<PinturaRevision>();
                    List<Sam3_Pintura_Get_Revision_Result> result = ctx.Sam3_Pintura_Get_Revision(proyectoID, dato, tipoBusqueda, lenguaje).ToList();

                    listaRevisionSpool.Add(new PinturaRevision());
                    foreach (Sam3_Pintura_Get_Revision_Result item in result)
                    {
                        listaRevisionSpool.Add(new PinturaRevision
                        {
                            Accion = item.GenerarRevision == 0 ? 1 : 2,
                            SpoolID = item.SpoolID,
                            NumeroControl = item.NumeroControl,
                            SistemaPintura = item.SistemaPintura,
                            Color = item.Color,
                            Area =item.Area,
                            GenerarRevision = item.GenerarRevision,
                            Comentario =item.Comentario,
                            Version=item.Version
                        });
                    }
                    return listaRevisionSpool;
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

        public object GuardarImagenSerializa(string imgSerializada)
        {
            try
            {
                ObjetosSQL _SQL = new ObjetosSQL();
                

                using (SqlCommand cmd = new SqlCommand("SAM3_ImagenesPrueba", new SqlConnection(ConfigurationManager.ConnectionStrings["SqlServer"].ConnectionString)))
                {
                    cmd.Parameters.Add("@imageBits", SqlDbType.VarChar).Value = imgSerializada;// StringToBytes();
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

        public byte[] StringToBytes(String cadenaImagenSerializar)
        {
            System.Text.ASCIIEncoding codificador = new System.Text.ASCIIEncoding();
            return codificador.GetBytes(cadenaImagenSerializar);
        }
    }
}