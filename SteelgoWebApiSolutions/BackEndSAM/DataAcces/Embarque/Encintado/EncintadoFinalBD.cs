using BackEndSAM.Models.Embarque.Encintado;
using BackEndSAM.Models.Sam3General.Cuadrante;
using DatabaseManager.Constantes;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.Embarque.Encintado
{
    public class EncintadoFinalBD
    {
        private static readonly object _mutex = new object();
        private static EncintadoFinalBD _instance;

        public static EncintadoFinalBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new EncintadoFinalBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerDetalleZona(int ZonaID, int CuadranteID, int todos, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Steelgo_Get_Cuadrante_Result> result = ctx.Sam3_Steelgo_Get_Cuadrante(ZonaID).ToList();
                    List<UbicacionCuadrante> listaCuadrante = new List<UbicacionCuadrante>();
                    
                    foreach (Sam3_Steelgo_Get_Cuadrante_Result item in result)
                    {
                        listaCuadrante.Add(new UbicacionCuadrante
                        {
                            CuadranteID = item.CuadranteID,
                            Nombre = item.Nombre,
                            ZonaID = item.ZonaID.GetValueOrDefault()
                        });
                    }
                    //return listaCuadrante.OrderBy(x => x.Nombre).ToList<UbicacionCuadrante>();


                    List<Sam3_Embarque_get_Encintado_Colores_Result> resultColor = ctx.Sam3_Embarque_get_Encintado_Colores(lenguaje).ToList();
                    List<ColorEncintado> listaColores = new List<ColorEncintado>();

                    foreach (Sam3_Embarque_get_Encintado_Colores_Result item in resultColor)
                    {
                        listaColores.Add(new ColorEncintado
                        {
                            ColorID = item.ColorID,
                            Nombre = item.Color
                        });
                    }


                    List<Sam3_Embarque_Get_Encintado_Zona_Result> listaEncintadoCTX = ctx.Sam3_Embarque_Get_Encintado_Zona(ZonaID, CuadranteID, todos).ToList();

                    List<DetalleCaptura> detalleCapturaList = new List<DetalleCaptura>();
                    foreach (Sam3_Embarque_Get_Encintado_Zona_Result item in listaEncintadoCTX)
                    {
                        detalleCapturaList.Add(new DetalleCaptura
                        {
                            SpoolID = item.SpoolID,
                            Spool = item.Spool,
                            ProyectoID = item.ProyectoID,
                            Proyecto = item.Proyecto,
                            CuadranteID = item.CuadranteID,
                            Cuadrante = item.Cuadrante,
                            EncintadoID = item.EncintadoID,
                            Encintado = item.Encintado,
                            EtiquetadoID = item.EtiquetadoID,
                            Etiquetado = item.Etiquetado,
                            ColorID = ((item.ColorID == null) ?(0):((int)item.ColorID)),
                            NombreColor = item.NombreColor,
                            OkPintura = ((item.OkPintura == 1) ? (true) : (false)),
                            OkPND = item.OkPND,
                            ZonaID = item.ZonaID,
                            Zona = item.Zona,
                            ModificadoPorUsuario = true,
                            ListaCuadrantes = listaCuadrante,
                            ListaColoresCinta = listaColores,
                            Accion = item.Accion

                        });
                    }

                    return detalleCapturaList;
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object ObtenerDetalleZona(int ZonaID, string NumeroControl, int todos, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Steelgo_Get_Cuadrante_Result> result = ctx.Sam3_Steelgo_Get_Cuadrante(ZonaID).ToList();
                    List<UbicacionCuadrante> listaCuadrante = new List<UbicacionCuadrante>();

                    foreach (Sam3_Steelgo_Get_Cuadrante_Result item in result)
                    {
                        listaCuadrante.Add(new UbicacionCuadrante
                        {
                            CuadranteID = item.CuadranteID,
                            Nombre = item.Nombre,
                            ZonaID = item.ZonaID.GetValueOrDefault()
                        });
                    }
                    

                    List<Sam3_Embarque_get_Encintado_Colores_Result> resultColor = ctx.Sam3_Embarque_get_Encintado_Colores(lenguaje).ToList();
                    List<ColorEncintado> listaColores = new List<ColorEncintado>();

                    foreach (Sam3_Embarque_get_Encintado_Colores_Result item in resultColor)
                    {
                        listaColores.Add(new ColorEncintado
                        {
                            ColorID = item.ColorID,
                            Nombre = item.Color
                        });
                    }


                    List<Sam3_Embarque_get_Encintado_NumeroControl_Result> listaEncintadoCTX = ctx.Sam3_Embarque_get_Encintado_NumeroControl(NumeroControl, todos).ToList();

                    List<DetalleCaptura> detalleCapturaList = new List<DetalleCaptura>();
                    foreach (Sam3_Embarque_get_Encintado_NumeroControl_Result item in listaEncintadoCTX)
                    {
                        detalleCapturaList.Add(new DetalleCaptura
                        {
                            SpoolID = item.SpoolID,
                            Spool = item.Spool,
                            ProyectoID = item.ProyectoID,
                            Proyecto = item.Proyecto,
                            CuadranteID = item.CuadranteID,
                            Cuadrante = item.Cuadrante,
                            EncintadoID = item.EncintadoID,
                            Encintado = item.Encintado,
                            EtiquetadoID = item.EtiquetadoID,
                            Etiquetado = item.Etiquetado,
                            ColorID = ((item.ColorID == null) ? (0) : ((int)item.ColorID)),
                            NombreColor = item.NombreColor,
                            OkPintura = ((item.OkPintura == 1) ? (true) : (false)),
                            OkPND = ((item.OkPND== 1) ? (true) : (false)),
                            ZonaID = item.ZonaID,
                            Zona = item.Zona,
                            ModificadoPorUsuario = true,
                            ListaCuadrantes = listaCuadrante,
                            ListaColoresCinta = listaColores,
                            Accion = item.Accion

                        });
                    }

                    return detalleCapturaList;
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object ActualizaCapturaEncintado(DataTable dtDetalleCaptura, int usuario, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = { { "@Usuario", usuario.ToString() }, { "@Lenguaje", lenguaje } };
                    _SQL.Ejecuta(Stords.GUARDARCAPTURAENCINTADO, dtDetalleCaptura, "@EmbarqueEncintado", parametro);
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