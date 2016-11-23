using BackEndSAM.Models.Embarque.CargaPlana;
using DatabaseManager.Constantes;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.Embarque.CargaPlana
{
    public class CargaPlanaBD
    {
        private static readonly object _mutex = new object();
        private static CargaPlanaBD _instance;

        public static CargaPlanaBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new CargaPlanaBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerDetalleCargaPlana(int PlanaID, int Todos)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Embarque_Get_DetalleCargaPlana_Result> result = ctx.Sam3_Embarque_Get_DetalleCargaPlana(PlanaID, Todos).ToList();
                    List<DetalleCargaPlana> listaDetalle = new List<DetalleCargaPlana>();

                    foreach (Sam3_Embarque_Get_DetalleCargaPlana_Result item in result)
                    {
                        listaDetalle.Add(new DetalleCargaPlana {
                            Accion = 2,
                            DetalleCargaID = item.DetalleCargaID,
                            SpoolID = item.SpoolID,
                            OrdenTrabajoID = item.OrdenTrabajoID,
                            Spool = item.NumeroControl,
                            PaqueteID = item.PaqueteID,
                            Paquete = item.NombrePaquete,
                            Peso = item.Peso.GetValueOrDefault(),
                            CuadranteAnteriorID = item.CuadranteAnteriorID.GetValueOrDefault(),
                            ModificadoPorUsuario = false
                        });
                    }
                    return listaDetalle;
                }
            }
            catch (Exception ex) {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object ObtieneDetalleSpoolAgregar(int CargaPlanaID, int TipoConsulta, int OrdenTrabajoSpoolID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Embarque_Get_DetalleSpool_Result> result = ctx.Sam3_Embarque_Get_DetalleSpool(CargaPlanaID, TipoConsulta, OrdenTrabajoSpoolID).ToList();
                    List<DetalleCargaPlana> listaDetalle = new List<DetalleCargaPlana>();

                    foreach (Sam3_Embarque_Get_DetalleSpool_Result item in result)
                    {
                        listaDetalle.Add(new DetalleCargaPlana
                        {
                            Accion = 1,
                            DetalleCargaID = item.DetalleCargaID,
                            SpoolID = item.SpoolID,
                            OrdenTrabajoID = item.OrdenTrabajoID,
                            Spool = item.NumeroControl,
                            PaqueteID = item.PaqueteID,
                            Paquete = item.NombrePaquete,
                            Peso = item.Peso.GetValueOrDefault(),
                            CuadranteAnteriorID = item.CuadranteAnteriorID,
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

        public object GuardaCapturaCargaPlana(DataTable dtDetalle, int UsuarioID, int CargaPlanaID, int PlanaID, int CerrarPlana)
        {
            try
            {
                ObjetosSQL _SQL = new ObjetosSQL();
                string[,] parametros = { { "@UsuarioID", UsuarioID.ToString() }, { "@PlanaID", PlanaID.ToString() }, { "@CargaPlanaID", CargaPlanaID.ToString() },
                        { "@CerrarPlana", CerrarPlana.ToString() } };

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

        public object CerrarCargaPlana(DataTable dtDetalle, int UsuarioID)
        {
            try
            {
                ObjetosSQL _SQL = new ObjetosSQL();
                string[,] parametros = { { "@Usuario", UsuarioID.ToString() } };

                _SQL.EjecutaInsertUpdate("", dtDetalle, "@TablaCargaPlana", parametros);

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

        public object DescargaSpoolPlana(int DetalleCargaID, int SpoolID, int CuadranteID, int CuadranteAnterior, int UsuarioID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    ctx.Sam3_Embarque_DescargaSpool(DetalleCargaID, SpoolID, CuadranteID, CuadranteAnterior, UsuarioID);

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("OK");
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