using BackEndSAM.Models.Pintura.CargaCarro;
using DatabaseManager.Constantes;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.Pintura.CargaCarro
{
    public class CargaCarroBD
    {
        private static readonly object _mutex = new Object();
        private static CargaCarroBD _instance;

        public static CargaCarroBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {

                        _instance = new CargaCarroBD();
                    }
                }
                return _instance;
            }
        }

        public object CierraCarro(Sam3_Usuario usuario, int medioTransporteID, int medioTransporteCargaID, int cerrar)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = { { "@Usuario", usuario.UsuarioID.ToString() }, { "@MedioTransporteID", medioTransporteID.ToString() }, { "@MedioTransporteCargaID", medioTransporteCargaID.ToString() }, { "@Cerrar", cerrar.ToString() } };
                    _SQL.Ejecuta(Stords.SETCIERRACARRO, parametro);

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

        public object ObtieneDetalle(int medioTransporteID, int TipoConsulta, int OrdenTrabajoSpoolID, string Codigo, string lenguaje)
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
                            Accion = item.Accion,
                            Area = item.Area.GetValueOrDefault(),
                            OrdenImportancia = item.OrdenImportancia.GetValueOrDefault(),
                            Peso = item.Peso.GetValueOrDefault(),
                            SistemaPintura = item.SistemaPintura,
                            SistemaPinturaID = item.SistemaPinturaID,
                            SpoolID = item.SpoolID,
                            SpoolJunta = item.SpoolJunta,
                            ProyectoID = item.ProyectoID,
                            CuadranteID = item.CuadranteID.GetValueOrDefault(),
                            NombreMedioTransporte = item.NombreMedioTransporte,
                            CuadranteMedioTransporte = item.Cuadrante,
                            ColorPintura = item.ColorPintura,
                            PinturaSpoolID = item.PinturaSpoolID.GetValueOrDefault()
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

        public object ObtenerMedioTransporteDetalleCargado(int medioTransporteCargaID, int medioTransporteID, string lenguaje, int proyectoID, int todos)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    List<Sam3_Pintura_Get_DetalleCarrosCargados_Result> result = ctx.Sam3_Pintura_Get_DetalleCarrosCargados(medioTransporteCargaID, medioTransporteID, proyectoID, todos).ToList();

                    //List<Sam3_Steelgo_Get_Cuadrante_Result> GetlistaCuandrantes = (List<Sam3_Steelgo_Get_Cuadrante_Result>)CuadranteBD.Instance.ObtenerCuadrante(0);

                    List<DetalleMedioTransporteCarga> ListadoDetalleMedioTransporteCarga = new List<DetalleMedioTransporteCarga>();
                    

                    foreach (Sam3_Pintura_Get_DetalleCarrosCargados_Result item in result)
                    {
                        ListadoDetalleMedioTransporteCarga.Add(new DetalleMedioTransporteCarga
                        {
                            Accion = 2,
                            MedioTransporteID = item.MedioTransporteID.GetValueOrDefault(),
                            Area = item.Area.GetValueOrDefault(),
                            ColorPintura = item.ColorPintura,
                            MedioTransporteCargaID = item.MedioTransporteCargaID.GetValueOrDefault(),
                            OrdenImportancia = item.OrdenImportancia.GetValueOrDefault(),
                            Peso = item.Peso.GetValueOrDefault(),
                            SistemaPintura = item.SistemaPintura,
                            SistemaPinturaID = item.SistemaPinturaID,
                            SpoolID = item.SpoolID,
                            NumeroControl = item.SpoolJunta,
                            CuadranteID = item.CuadranteID.GetValueOrDefault(),
                            CuadranteSpool = item.Cuadrante,
                            CuadranteMT = item.EstatusCarga.GetValueOrDefault() ? item.Nombre : item.Cuadrante,
                            ProyectoID = item.ProyectoID,
                            CarroCerrado = item.CarroCerrado.GetValueOrDefault()

                        });

                    }
                    return ListadoDetalleMedioTransporteCarga.OrderByDescending(x => x.NumeroControl);
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

        public object ObtenerListadoSpool(int medioTransporteCargaID, int medioTransporteID, int proyectoID, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Pintura_Get_SpoolCarroBackLog_Result> result = ctx.Sam3_Pintura_Get_SpoolCarroBackLog(medioTransporteCargaID, medioTransporteID, proyectoID, lenguaje).ToList();
                    List<CargaCarroBackLog> lista = new List<CargaCarroBackLog>();
                    foreach (Sam3_Pintura_Get_SpoolCarroBackLog_Result item in result)
                    {
                        CargaCarroBackLog elemento = new CargaCarroBackLog
                        {
                            Accion = item.EstatusCarga.GetValueOrDefault() ? 2 : 1,
                            Area = item.Area.GetValueOrDefault(),
                            Color = item.ColorPintura,
                            CuadranteSpool = item.Cuadrante,
                            CuadranteMT = item.EstatusCarga.GetValueOrDefault() ? item.Nombre : item.Cuadrante,
                            CuadranteID = item.CuadranteID.GetValueOrDefault(),
                            MedioTransporte = item.Nombre,
                            OrdenImportancia = item.OrdenImportancia.GetValueOrDefault(),
                            Peso = Math.Round(item.Peso.GetValueOrDefault(), 2),
                            ProyectoID = item.ProyectoID,
                            SistemaPintura = item.SistemaPintura,
                            SistemaPinturaID = item.SistemaPinturaID,
                            SpoolID = item.SpoolID,
                            NumeroControl = item.SpoolJunta,
                            Seleccionado = item.EstatusCarga.GetValueOrDefault(),
                            Status = item.EstatusCarga.GetValueOrDefault(),
                            CarroCerrado = item.CarroCerrado.GetValueOrDefault(),
                            MedioTransporteCargaID = item.MedioTransporteCargaID.GetValueOrDefault()
                        };
                        lista.Add(elemento);
                    }

                    return lista.OrderByDescending(x => x.Status).ToList<CargaCarroBackLog>();

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

        public object GuardarMedioTransporte(DataTable dtCarga, Sam3_Usuario usuario, string lenguaje, int medioTransporteID, int medioTransporteCargaID, int cerrar)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = { { "@Usuario", usuario.UsuarioID.ToString() }, { "@MedioTransporteID", medioTransporteID.ToString() },
                        { "@MedioTransporteCargaID", medioTransporteCargaID.ToString() }, { "@Cerrar", cerrar.ToString() } };

                    _SQL.Ejecuta(Stords.GUARDACAPTURAPINTURASPOOLCARGA, dtCarga, "@Tabla", parametro);

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