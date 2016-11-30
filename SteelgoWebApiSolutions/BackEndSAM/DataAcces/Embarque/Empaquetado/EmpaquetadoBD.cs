using BackEndSAM.Models.Embarque.Empaquetado;
using DatabaseManager.Constantes;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Core.Objects;
using System.Linq;

namespace BackEndSAM.DataAcces.Embarque.Empaquetado
{
    public class EmpaquetadoBD
    {
        private static readonly object _mutex = new object();
        private static EmpaquetadoBD _instance;

        public static EmpaquetadoBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new EmpaquetadoBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerPaquetes(int ProyectoID, string Lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Embarque_Get_ListadoPaquetes_Result> result = ctx.Sam3_Embarque_Get_ListadoPaquetes(ProyectoID, Lenguaje).ToList();
                    List<DetallePaquete> listaDetalle = new List<DetallePaquete>();
                    listaDetalle.Add(new DetallePaquete());

                    foreach (Sam3_Embarque_Get_ListadoPaquetes_Result item in result)
                    {
                        listaDetalle.Add(new DetallePaquete
                        {
                            PaqueteID = item.PaqueteID,
                            Nombre = item.Nombre, 
                            Cerrado = item.Cerrado,
                            FechaCreacion = item.FechaCreacion,
                            ProyectoID = ProyectoID, 
                            CuadrantePaqueteSam2ID = item.CuadrantePaqueteSam2ID.GetValueOrDefault(),
                            CuadrantePaqueteSam3ID = item.CuadrantePaqueteSam3ID.GetValueOrDefault(),
                            CuadranteUbicacion = item.CuadranteUbicacion.GetValueOrDefault(),
                            ZonaID = item.ZonaID.GetValueOrDefault()
                        });
                    }

                    return listaDetalle;
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

        public object ObtenerZonas(int PatioID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Steelgo_Get_ZonaPlana_Result> result = ctx.Sam3_Steelgo_Get_ZonaPlana(PatioID).ToList();
                    List<ZonaPaquete> listaDetalle = new List<ZonaPaquete>();
                    listaDetalle.Add(new ZonaPaquete());

                    foreach (Sam3_Steelgo_Get_ZonaPlana_Result item in result)
                    {
                        listaDetalle.Add(new ZonaPaquete
                        {
                            ZonaID = item.ZonaID,
                            Nombre = item.Nombre
                        });
                    }
                    return listaDetalle;
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

        public object ObtenerDetalleCargaPaquete(int PaqueteID, int Todos)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Embarque_Get_DetalleCargaPaquete_Result> result = ctx.Sam3_Embarque_Get_DetalleCargaPaquete(PaqueteID, Todos).ToList();
                    List<DetalleCargaPaquete> listaDetalle = new List<DetalleCargaPaquete>();

                    foreach (Sam3_Embarque_Get_DetalleCargaPaquete_Result item in result)
                    {
                        listaDetalle.Add(new DetalleCargaPaquete
                        {
                            Accion = 2,
                            EmpaquetadoID = item.EmpaquetadoID,
                            SpoolID = item.SpoolID,
                            NumeroControl = item.NumeroControl,
                            Area = item.Area.GetValueOrDefault(),
                            Peso = item.Peso.GetValueOrDefault()/1000,
                            CuadranteSam2ID = item.CuadranteSam2ID,
                            CuadranteSam3ID = item.CuadranteSam3ID,
                            Cuadrante = item.Cuadrante,
                            CuadranteAnteriorSam2ID = item.CuadranteAnteriorSam2ID.GetValueOrDefault(),
                            CuadranteAnteriorSam3ID = item.CuadranteAnteriorSam3ID.GetValueOrDefault(),
                            ZonaAnteriorID = item.ZonaAnteriorID.GetValueOrDefault(),
                            ModificadoPorUsuario = false
                        });
                    }
                    return listaDetalle;
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

        public object ObtieneDetalleSpoolAgregar(int TipoConsulta, int OrdenTrabajoSpoolID, string Codigo)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Embarque_Empaquetado_Get_DetalleSpool_Result> result = ctx.Sam3_Embarque_Empaquetado_Get_DetalleSpool(TipoConsulta, OrdenTrabajoSpoolID, Codigo).ToList();
                    List<DetalleSpoolAgregar> listaDetalle = new List<DetalleSpoolAgregar>();
                    foreach (Sam3_Embarque_Empaquetado_Get_DetalleSpool_Result item in result)
                    {
                        listaDetalle.Add(new DetalleSpoolAgregar
                        {
                            Accion = 1,
                            EmpaquetadoID = item.EmpaquetadoID.GetValueOrDefault(),
                            SpoolID = item.SpoolID,
                            NumeroControl = item.NumeroControl,
                            Area = item.Area.GetValueOrDefault(),
                            Peso = item.Peso.GetValueOrDefault() / 1000,
                            ProyectoID = item.ProyectoID,
                            CuadranteSam2ID = item.CuadranteSam2ID,
                            CuadranteSam3ID = item.CuadranteSam3ID,
                            Cuadrante = item.Cuadrante,
                            CuadranteAnteriorSam2ID = item.CuadranteAnteriorSam2ID.GetValueOrDefault(),
                            CuadranteAnteriorSam3ID = item.CuadranteAnteriorSam3ID.GetValueOrDefault(),
                            Empaquetado = item.Empaquetado,
                            Paquete = item.Paquete,
                            CargaPlana = item.CargaPlana,
                            Plana = item.Plana,
                            ModificadoPorUsuario = true
                        });
                    }

                    return listaDetalle;
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

        public object DescargaSpoolPaquete(int EmpaquetadoID, int SpoolID, int CuadranteID, int CuadranteAnteriorSam2, int CuadranteAnteriorSam3, int UsuarioID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    ctx.Sam3_Embarque_Empaquetado_DescargaSpool(EmpaquetadoID, SpoolID, CuadranteID, CuadranteAnteriorSam2, CuadranteAnteriorSam3, UsuarioID);

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

        public object GuardaNuevoPaquete(int UsuarioID, string lenguaje, int PaqueteID, string NombrePaquete, int CuadranteID, int Cerrado, string FechaPaquete, int CuadrantePaquereSam2ID, int CuadrantePaquereSam3ID, DataTable dtDetalle)
        {
            try
            {
                ObjetosSQL _SQL = new ObjetosSQL();
                string[,] parametros = {
                    { "@UsuarioID", UsuarioID.ToString() },
                    { "@PaqueteID", PaqueteID.ToString() },
                    { "@NombrePaquete", NombrePaquete },
                    { "@CuadranteID", CuadranteID.ToString() },
                    { "@Cerrado", Cerrado.ToString() },
                    { "@FechaPaquete", FechaPaquete },
                    { "@Lenguaje", lenguaje },
                    { "@CuadrantePaqueteSam2ID", CuadrantePaquereSam2ID.ToString() },
                    { "@CuadrantePaqueteSam3ID", CuadrantePaquereSam3ID.ToString() }
                };

                int identityResult = _SQL.EjecutaInsertUpdate(Stords.GUARDARPAQUETE, dtDetalle, "@TTEmpaquetado", parametros);

                TransactionalInformation result = new TransactionalInformation();
                

                if (identityResult > 0)
                {
                    result.ReturnMessage.Add("Ok");
                    result.ReturnMessage.Add(identityResult.ToString());
                }
                else
                    result.ReturnMessage.Add("Paquete Existe");

                result.ReturnCode = 200;
                result.ReturnStatus = true;
                result.IsAuthenicated = true;

                return result;
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

        public object EliminarPaquete(int UsuarioID, int PaqueteID, int CuadrantePaqueteSam2ID, int CuadrantePaqueteSam3ID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ObjectResult<int?> resultSp = ctx.Sam3_Embarque_EliminarPaquete(UsuarioID, PaqueteID, CuadrantePaqueteSam2ID, CuadrantePaqueteSam3ID);
                    var valor = resultSp.Where(x => x.HasValue).Select(x => x.Value).ToList()[0];

                    TransactionalInformation result = new TransactionalInformation();
                    if (valor > 0)
                    {
                        result.ReturnMessage.Add("Ok");
                        result.ReturnCode = 200;
                        result.ReturnStatus = true;
                        result.IsAuthenicated = true;
                    }else
                    {
                        result.ReturnMessage.Add("El Paquete contiene spools cargados");
                        result.ReturnCode = 201;
                        result.ReturnStatus = true;
                        result.IsAuthenicated = true;
                    }

                    return result;
                }
            }catch(Exception ex)
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