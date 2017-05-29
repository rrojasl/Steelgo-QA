using BackEndSAM.Models.Pintura.AvanceCuadrante;
using BackEndSAM.Models.Pintura.CapturaAvance;
using DatabaseManager.Constantes;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.Pintura.AvanceCuadrante
{
    public class AvanceCuadranteBD
    {
        private static readonly object _mutex = new Object();
        private static AvanceCuadranteBD _instance;

        public static AvanceCuadranteBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {

                        _instance = new AvanceCuadranteBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerObrerosGuardados(int spoolID, int procesoID, int usuarioID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Pintura_AvanceCuadrante_Get_ObrerosProcesoPintura_Result> result = ctx.Sam3_Pintura_AvanceCuadrante_Get_ObrerosProcesoPintura(spoolID, procesoID).ToList();

                    List<object> listaObreros = new List<object>();


                    List<PintorSpool> ListadoPintores = new List<PintorSpool>();

                    foreach (Sam3_Pintura_AvanceCuadrante_Get_ObrerosProcesoPintura_Result item in result)
                    {
                        ListadoPintores.Add(new PintorSpool
                        {
                            Accion = 2,
                            ObreroID = item.ObreroID.GetValueOrDefault(),
                            Codigo = item.Codigo,
                            AvanceCarroObreroId = item.AvanceCuadranteObreroId,
                        });
                    }
                    listaObreros.Add(ListadoPintores);
                    listaObreros.Add(BackEndSAM.DataAcces.PinturaBD.CapturaAvanceBD.CapturaAvanceBD.Instance.ObtenerObreros(procesoID, usuarioID));
                    return listaObreros;
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

        public object ObtenerDetalle(int cuadranteID, int sistemaPinturaProyectoID,int? sistemaPinturaColorID,string lenguaje,int procesoPinturaID,int todosSinCaptura,int UsuarioID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                   
                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = { { "@CuadranteID", cuadranteID.ToString() }, { "@SistemaPinturaProyectoID", sistemaPinturaProyectoID.ToString() }, { "@SistemaPinturaColorID", sistemaPinturaColorID.ToString() }, { "@Lenguaje", lenguaje }, { "@ProcesoPinturaID", procesoPinturaID.ToString() }, { "@TodosSinCaptura", todosSinCaptura.ToString() }, { "@UsuarioID", UsuarioID.ToString() } };
                    DataTable dtDetalle = _SQL.EjecutaDataAdapter(Stords.OBTIENEDETALLEAVANCECUADRANTE, parametro);
                    return dtDetalle;
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

        public object ObtenerListadoZonas(Sam3_Usuario usuario, int procesoPintura, int ProyectoID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    List<Sam3_Pintura_AvanceCuadrante_Get_Zonas_Result> result = ctx.Sam3_Pintura_AvanceCuadrante_Get_Zonas(usuario.UsuarioID, procesoPintura, ProyectoID).ToList();

                    List<BackEndSAM.Models.Pintura.IntermedioAcabado.Zona> listaZonas = new List<BackEndSAM.Models.Pintura.IntermedioAcabado.Zona>();

                    if (result.Count > 0)
                        listaZonas.Add(new BackEndSAM.Models.Pintura.IntermedioAcabado.Zona());

                    foreach (Sam3_Pintura_AvanceCuadrante_Get_Zonas_Result item in result)
                    {
                        listaZonas.Add(new BackEndSAM.Models.Pintura.IntermedioAcabado.Zona
                        {
                            Nombre = item.Nombre,
                            ZonaID = item.ZonaID
                        });
                    }
                    return listaZonas;
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

        public object ObtenerListadoCuadrantes(Sam3_Usuario usuario, int ZonaID, int procesoPintura)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Pintura_AvanceCuadrante_Get_Cuadrantes_Result> result = ctx.Sam3_Pintura_AvanceCuadrante_Get_Cuadrantes(usuario.UsuarioID, procesoPintura).ToList();

                    List<BackEndSAM.Models.Pintura.IntermedioAcabado.Cuadrante> listaCuadrante = new List<BackEndSAM.Models.Pintura.IntermedioAcabado.Cuadrante>();

                    if (result.Count > 0)
                        listaCuadrante.Add(new BackEndSAM.Models.Pintura.IntermedioAcabado.Cuadrante());

                    foreach (Sam3_Pintura_AvanceCuadrante_Get_Cuadrantes_Result item in result)
                    {
                        listaCuadrante.Add(new BackEndSAM.Models.Pintura.IntermedioAcabado.Cuadrante
                        {
                            Nombre = item.Nombre,
                            CuadranteID = item.CuadranteID
                        });
                    }
                    return listaCuadrante;

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

        public object ObtenerListadoSistemaPintura(Sam3_Usuario usuario, int ZonaID, int CuadranteID, int procesoPintura, string lenguaje, int proyectoID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    List<Sam3_Pintura_AvanceCuadrante_Get_SP_Result> result = ctx.Sam3_Pintura_AvanceCuadrante_Get_SP(CuadranteID, lenguaje, procesoPintura, proyectoID).ToList();

                    List<BackEndSAM.Models.Pintura.IntermedioAcabado.SistemaPintura> listaSP = new List<BackEndSAM.Models.Pintura.IntermedioAcabado.SistemaPintura>();

                    if (result.Count > 0)
                        listaSP.Add(new BackEndSAM.Models.Pintura.IntermedioAcabado.SistemaPintura());

                    foreach (Sam3_Pintura_AvanceCuadrante_Get_SP_Result item in result)
                    {
                        listaSP.Add(new BackEndSAM.Models.Pintura.IntermedioAcabado.SistemaPintura
                        {
                            SistemaPinturaID = item.SistemaPinturaID,
                            Nombre = item.Nombre,
                            SistemaPinturaProyectoID=item.SistemaPinturaProyectoID
                        });
                    }

                    return listaSP;
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

        public object ObtenerListadoColores(int SistemaPinturaID, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Pintura_AvanceCuadrante_Get_Color_Result> result = ctx.Sam3_Pintura_AvanceCuadrante_Get_Color(SistemaPinturaID, lenguaje).ToList();

                    List<BackEndSAM.Models.Pintura.IntermedioAcabado.Color> listaColores = new List<BackEndSAM.Models.Pintura.IntermedioAcabado.Color>();

                    if (result.Count > 0)
                        listaColores.Add(new BackEndSAM.Models.Pintura.IntermedioAcabado.Color());

                    foreach (Sam3_Pintura_AvanceCuadrante_Get_Color_Result item in result)
                    {
                        listaColores.Add(new BackEndSAM.Models.Pintura.IntermedioAcabado.Color
                        {
                            SistemaPinturaColorID = item.SistemaPinturaColorID,
                            ColorID = item.ColorID,
                            Nombre = item.Nombre
                        });
                    }

                    return listaColores;

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
    }
}