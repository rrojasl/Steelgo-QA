using BackEndSAM.Models.Embarque.Empaquetado;
using DatabaseManager.Constantes;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data;
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

        public object ObtenerPaquetes(int ProyectoID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Embarque_Get_ListadoPaquetes_Result> result = ctx.Sam3_Embarque_Get_ListadoPaquetes(ProyectoID).ToList();
                    List<DetallePaquete> listaDetalle = new List<DetallePaquete>();
                    listaDetalle.Add(new DetallePaquete());

                    foreach (Sam3_Embarque_Get_ListadoPaquetes_Result item in result)
                    {
                        listaDetalle.Add(new DetallePaquete
                        {
                            PaqueteID = item.PaqueteID,
                            Nombre = item.Nombre, 
                            Cerrado = item.Cerrado,
                            ProyectoID = ProyectoID, 
                            CuadrantePaqueteSam2 = item.CuadrantePaqueteSam2.GetValueOrDefault(),
                            CuadrantePaqueteSam3 = item.CuadrantePaqueteSam3.GetValueOrDefault()
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
                            EmpaquetadoID = item.EmpaquetadoID,
                            SpoolID = item.SpoolID,
                            NumeroControl = item.NumeroControl,
                            Area = item.Area.GetValueOrDefault(),
                            Peso = item.Peso.GetValueOrDefault(),
                            CuadranteID = item.CuadranteID.GetValueOrDefault(),
                            CuadranteAnteriorID = item.CuadranteAnteriorID.GetValueOrDefault(),
                            ZonaAnteriorID = item.ZonaAnterior.GetValueOrDefault()
                        });
                    }
                    return null;
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

        //public object ObtieneDetalleSpoolAgregar(int CargaPlanaID, int TipoConsulta, int OrdenTrabajoSpoolID)
        //{
        //    try
        //    {
        //        using (SamContext ctx = new SamContext())
        //        {
                    //List<Sam3_Embarque_Get_DetalleSpool_Result> result = ctx.Sam3_Embarque_Get_DetalleSpool(CargaPlanaID, TipoConsulta, OrdenTrabajoSpoolID).ToList();
                    //List<DetalleCargaPlana> listaDetalle = new List<DetalleCargaPlana>();

                    //foreach (Sam3_Embarque_Get_DetalleSpool_Result item in result)
                    //{
                    //    listaDetalle.Add(new DetalleCargaPlana
                    //    {
                    //        Accion = 1,
                    //        DetalleCargaID = item.DetalleCargaID.GetValueOrDefault(),
                    //        SpoolID = item.SpoolID,
                    //        OrdenTrabajoID = item.OrdenTrabajoID,
                    //        Spool = item.NumeroControl,
                    //        PaqueteID = item.PaqueteID,
                    //        Paquete = item.NombrePaquete,
                    //        Peso = item.Peso.GetValueOrDefault(),
                    //        CuadranteID = item.CuadranteID.GetValueOrDefault(),
                    //        CuadranteAnteriorID = item.CuadranteAnteriorID.GetValueOrDefault(),
                    //        ModificadoPorUsuario = false
                    //    });
                    //}
        //            return null;
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        TransactionalInformation result = new TransactionalInformation();
        //        result.ReturnMessage.Add(ex.Message);
        //        result.ReturnCode = 500;
        //        result.ReturnStatus = false;
        //        result.IsAuthenicated = true;

        //        return result;
        //    }
        //}

        //public object CerrarCargaPaquete(DataTable dtDetalle, int UsuarioID)
        //{
        //    try
        //    {
        //        ObjetosSQL _SQL = new ObjetosSQL();
        //        string[,] parametros = { { "@Usuario", UsuarioID.ToString() } };

        //        _SQL.EjecutaInsertUpdate("", dtDetalle, "@TablaCargaPlana", parametros);

        //        TransactionalInformation result = new TransactionalInformation();
        //        result.ReturnMessage.Add("OK");
        //        result.ReturnCode = 200;
        //        result.ReturnStatus = true;
        //        result.IsAuthenicated = true;

        //        return result;
        //    }
        //    catch (Exception ex)
        //    {
        //        TransactionalInformation result = new TransactionalInformation();
        //        result.ReturnMessage.Add(ex.Message);
        //        result.ReturnCode = 500;
        //        result.ReturnStatus = false;
        //        result.IsAuthenicated = true;

        //        return result;
        //    }
        //}

        //public object DescargaSpoolPaquete(int DetalleCargaID, int SpoolID, int CuadranteID, int CuadranteAnterior, int UsuarioID)
        //{
        //    try
        //    {
        //        using (SamContext ctx = new SamContext())
        //        {

        //            ctx.Sam3_Embarque_DescargaSpool(DetalleCargaID, SpoolID, CuadranteID, CuadranteAnterior, UsuarioID);

        //            TransactionalInformation result = new TransactionalInformation();
        //            result.ReturnMessage.Add("OK");
        //            result.ReturnCode = 200;
        //            result.ReturnStatus = true;
        //            result.IsAuthenicated = true;

        //            return result;
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        TransactionalInformation result = new TransactionalInformation();
        //        result.ReturnMessage.Add(ex.Message);
        //        result.ReturnCode = 500;
        //        result.ReturnStatus = false;
        //        result.IsAuthenicated = true;

        //        return result;
        //    }
        //}

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

                _SQL.Ejecuta(Stords.GUARDARCAPTURACARGAPLANA, dtDetalle, "@DetalleCarga", parametros);

                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add("OK");
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
    }
}