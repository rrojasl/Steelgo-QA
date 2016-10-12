﻿using BackEndSAM.Models.Pintura.SistemaPinturaAplicable;
using BackEndSAM.Utilities.ConvertirDataTable;
using DatabaseManager.Constantes;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.Pintura.SistemaPinturaAplicable
{
    public class SistemaPinturaAplicableBD
    {
        private static readonly object _mutex = new object();
        private static SistemaPinturaAplicableBD _instance;

        public static SistemaPinturaAplicableBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new SistemaPinturaAplicableBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtieneListadoSistemaPintura(int ProyectoID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<SistemaPinturaData> list = new List<SistemaPinturaData>();
                    List<Sam3_SPA_Get_SistemaPintura_Result> result = ctx.Sam3_SPA_Get_SistemaPintura(ProyectoID).ToList();

                    list.Add(new SistemaPinturaData());

                    foreach (Sam3_SPA_Get_SistemaPintura_Result item in result)
                    {
                        list.Add(new SistemaPinturaData {
                            SistemaPinturaID = item.SistemaPinturaID,
                            Nombre = item.Nombre.Split('~')[0]
                        });
                    }
                    return list;
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

        public object ObtieneListadoColorPintura(int SistemaPinturaID, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<ColorPintura> list = new List<ColorPintura>();
                    List<Sam3_SPA_Get_ColorPintura_Result> result = ctx.Sam3_SPA_Get_ColorPintura(SistemaPinturaID, lenguaje).ToList();

                    list.Add(new ColorPintura());
                    foreach (Sam3_SPA_Get_ColorPintura_Result item in result)
                    {
                        list.Add(new ColorPintura {
                            SistemaPinturaColorID = item.SistemaPinturaColorID,
                            ColorPinturaID = item.ColorPinturaID,
                            Nombre = item.ColorPintura
                        });
                    }

                    return list;
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

        public object ObtieneDetalleSpool(int ProyectoID, int TipoBusqueda, string Cadena, string Lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<SpoolAplicableDetalle> listaDetalle = new List<SpoolAplicableDetalle>();
                    List<Sam3_SPA_GetDetalleSpool_Result> result= ctx.Sam3_SPA_GetDetalleSpool(ProyectoID, TipoBusqueda, Cadena, Lenguaje).ToList();

                    foreach (Sam3_SPA_GetDetalleSpool_Result item in result)
                    {
                        listaDetalle.Add(new SpoolAplicableDetalle {
                            Accion = item.Accion,
                            SpoolAplicableID = item.SpoolAplicableID.GetValueOrDefault(),
                            OrdenTrabajoID = item.OrdenTrabajoID.GetValueOrDefault(),
                            SpoolID = item.SpoolID,
                            Spool = item.Nombre,
                            NumeroControl = item.NumeroControl,
                            Diametro = item.Diametro.GetValueOrDefault(),
                            SistemaPinturaID = item.SistemaPinturaID.GetValueOrDefault(),
                            SistemaPintura = item.SistemaPintura != null ? item.SistemaPintura.Split('~')[0] : "",
                            SistemaPinturaColorID = item.SistemaPinturaColorID.GetValueOrDefault(),
                            ColorPinturaID = item.ColorID.GetValueOrDefault(),
                            Color = item.Color != null ? item.Color : "",
                            EstatusCaptura = item.EstatusCaptura,
                            ListaSistemPintura = (List<SistemaPinturaData>)SistemaPinturaAplicableBD.Instance.ObtieneListadoSistemaPintura(ProyectoID),
                            ListaColorPintura = null
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

        public object InsertaCapturaSistemaPinturaAplicable(DataTable dtDetalleCaptura, int UsuarioID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = { { "@UsuarioID", UsuarioID.ToString() } };

                    _SQL.Ejecuta(Stords.GUARDACAPTURASISTEMAPINTURAAPLICABLE, dtDetalleCaptura, "@Tabla", parametro);

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

        public object InsertaCapturaSistemaPinturaAplicableMasivo(DataTable dtDetalleCaptura, int UsuarioID, int TipoCarga, string Lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext()) {

                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = { { "@UsuarioID", UsuarioID.ToString() }, { "@TipoCarga", TipoCarga.ToString() }, { "@Lenguaje", Lenguaje.ToString() } };

                    DataTable list = _SQL.EjecutaDataAdapter(Stords.GUARDACAPTURASISTEMAAPLICABLEMASIVO, dtDetalleCaptura, "@TablaCargaMasiva", parametro);

                    return ToDataTable.table_to_csv(list);
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