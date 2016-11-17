﻿using BackEndSAM.DataAcces.Sam3General.Cuadrante;
using BackEndSAM.Models.Embarque.Etiquetado;
using BackEndSAM.Models.Sam3General.Cuadrante;
using DatabaseManager.Constantes;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.Embarque.Etiquetado
{
    public class EtiquetadoBD
    {
        private static readonly object _mutex = new object();
        private static EtiquetadoBD _instance;

        public static EtiquetadoBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new EtiquetadoBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtieneDetalleEtiquetadoPorZona(int ZonaID, int CuadranteID, int Todos)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Embarque_get_Etiquetado_Zona_Result> result = ctx.Sam3_Embarque_get_Etiquetado_Zona(ZonaID, CuadranteID, Todos).ToList();
                    List<DetalleEtiquetado> listaDetalle = new List<DetalleEtiquetado>();

                    foreach (Sam3_Embarque_get_Etiquetado_Zona_Result item in result)
                    {
                        listaDetalle.Add(new DetalleEtiquetado {
                            Accion = item.EtiquetadoID != 0 ? 2 : 1,
                            SpoolID = item.SpoolID,
                            Spool = item.Spool,
                            ProyectoID = item.ProyectoID,
                            Proyecto = item.Proyecto,
                            CuadranteID = item.CuadranteID.GetValueOrDefault(),
                            Cuadrante = item.Cuadrante,
                            EtiquetadoID = item.EtiquetadoID,
                            Etiquetado = item.Etiquetado,
                            ModificadoPorUsuario = false,
                            OkPintura = item.OkPintura == 0 ? false : true,
                            OkPnd = item.OkPND == 0 ? false : true,
                            ZonaID = item.ZonaID,
                            Zona = item.Zona,
                            EstatusCaptura = 0,
                            ListaCuadrantes = (List<UbicacionCuadrante>)CuadranteBD.Instance.ObtenerCuadrante(item.ZonaID)
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

        public object ObtieneDetalleEtiquetadoPorSpool(string SpoolContiene, int Todos)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Embarque_get_Etiquetado_NumeroControl_Result> result = ctx.Sam3_Embarque_get_Etiquetado_NumeroControl(SpoolContiene, Todos).ToList();
                    List<DetalleEtiquetado> listaDetalle = new List<DetalleEtiquetado>();

                    foreach (Sam3_Embarque_get_Etiquetado_NumeroControl_Result item in result)
                    {
                        listaDetalle.Add(new DetalleEtiquetado
                        {
                            Accion = item.EtiquetadoID != 0 ? 2 : 1,
                            SpoolID = item.SpoolID,
                            Spool = item.Spool,
                            ProyectoID = item.ProyectoID,
                            Proyecto = item.Proyecto,
                            CuadranteID = item.CuadranteID.GetValueOrDefault(),
                            Cuadrante = item.Cuadrante,
                            EtiquetadoID = item.EtiquetadoID,
                            Etiquetado = item.Etiquetado,
                            ModificadoPorUsuario = false,
                            OkPintura = item.OkPintura == 0 ? false : true,
                            OkPnd = item.OkPND == 0 ? false : true,
                            ZonaID = item.ZonaID.GetValueOrDefault(),
                            Zona = item.Zona,
                            EstatusCaptura = 0,
                            ListaCuadrantes = (List<UbicacionCuadrante>)CuadranteBD.Instance.ObtenerCuadrante(item.ZonaID.GetValueOrDefault())
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

        public object ObtieneRutaSpool(int SpoolID, int TipoReporte)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Steelgo_Get_PathEtiquetadoTraveler_Result> result = ctx.Sam3_Steelgo_Get_PathEtiquetadoTraveler(SpoolID, TipoReporte).ToList();
                    List<DetalleRutaSpool> listaDetalle = new List<DetalleRutaSpool>();
                    foreach (Sam3_Steelgo_Get_PathEtiquetadoTraveler_Result item in result)
                    {
                        listaDetalle.Add(new DetalleRutaSpool {
                            SpoolID = item.SpoolID,
                            Spool = item.Spool,
                            ProyectoID = item.ProyectoID,
                            Proyecto = item.Proyecto,
                            Ruta = item.Ruta
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

        public object GuardaCapturaEtiquetado(DataTable dtEtiquetado, int UsuarioID, string Lenguaje)
        {
            try
            {

                using (SamContext ctx = new SamContext())
                {
                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = { { "@Usuario", UsuarioID.ToString()}, { "@Lenguaje", Lenguaje } };
                    _SQL.Ejecuta(Stords.GUARDARCAPTURAETIQUETADO, dtEtiquetado, "@EmbarqueEtiquetado", parametro);

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