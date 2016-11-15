using BackEndSAM.Models.Pintura.IntermedioAcabado;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.Pintura.IntermedioAcabado
{
    public class IntermedioAcabadoBD
    {
        private static readonly object _mutex = new object();
        private static IntermedioAcabadoBD _instance;

        public static IntermedioAcabadoBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new IntermedioAcabadoBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerListadoZonas(Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Zona> listaZonas = new List<Zona>();
                    //List<Sam3_ST_CRRT_Get_ListaProyectos_Result> listaProyectosCTX = ctx.Sam3_ST_CRRT_Get_ListaProyectos(usuario.UsuarioID).ToList();
                    listaZonas.Add(new Zona());

                    for (int i = 1; i < 4; i++)
                    {
                        listaZonas.Add(new Zona
                        {
                            ZonaID = i,
                            Nombre = "Zona " + i
                        });
                    }

                    //foreach (Sam3_ST_CRRT_Get_ListaProyectos_Result item in listaProyectosCTX)
                    //{
                    //    listaZonas.Add(new Zona
                    //    {
                    //        ProyectoID = item.ProyectoID,
                    //        Nombre = item.Nombre,
                    //        PatioID = item.PatioID,
                    //        PrefijoOrdenTrabajo = item.PrefijoOrdenTrabajo
                    //    });
                    //}

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

        public object ObtenerListadoCuadrantes(Sam3_Usuario usuario, int ZonaID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Cuadrante> listaCuadrante = new List<Cuadrante>();
                    //List<Sam3_ST_CRRT_Get_ListaProyectos_Result> listaProyectosCTX = ctx.Sam3_ST_CRRT_Get_ListaProyectos(usuario.UsuarioID).ToList();
                    listaCuadrante.Add(new Cuadrante());

                    for (int i = 1; i < 5; i++)
                    {
                        listaCuadrante.Add(new Cuadrante
                        {
                            CuadranteID = i,
                            Nombre = "Cuadrante " + i
                        });
                    }

                    //foreach (Sam3_ST_CRRT_Get_ListaProyectos_Result item in listaProyectosCTX)
                    //{
                    //    listaZonas.Add(new Zona
                    //    {
                    //        ProyectoID = item.ProyectoID,
                    //        Nombre = item.Nombre,
                    //        PatioID = item.PatioID,
                    //        PrefijoOrdenTrabajo = item.PrefijoOrdenTrabajo
                    //    });
                    //}

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

        public object ObtenerListadoSistemaPintura(Sam3_Usuario usuario, int ZonaID, int CuadranteID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<BackEndSAM.Models.Pintura.IntermedioAcabado.SistemaPintura> listaSistemaPintura = new List<BackEndSAM.Models.Pintura.IntermedioAcabado.SistemaPintura>();
                    //List<Sam3_ST_CRRT_Get_ListaProyectos_Result> listaProyectosCTX = ctx.Sam3_ST_CRRT_Get_ListaProyectos(usuario.UsuarioID).ToList();
                    listaSistemaPintura.Add(new BackEndSAM.Models.Pintura.IntermedioAcabado.SistemaPintura());

                    for (int i = 1; i < 5; i++)
                    {
                        listaSistemaPintura.Add(new BackEndSAM.Models.Pintura.IntermedioAcabado.SistemaPintura
                        {
                            SistemaPinturaID = i,
                            Nombre = "SistemaPintura " + i,
                            ColorID = i,
                            NoPintable = false
                        });
                    }

                    //foreach (Sam3_ST_CRRT_Get_ListaProyectos_Result item in listaProyectosCTX)
                    //{
                    //    listaZonas.Add(new Zona
                    //    {
                    //        ProyectoID = item.ProyectoID,
                    //        Nombre = item.Nombre,
                    //        PatioID = item.PatioID,
                    //        PrefijoOrdenTrabajo = item.PrefijoOrdenTrabajo
                    //    });
                    //}

                    return listaSistemaPintura;
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

        public object ObtenerListadoColores(int ColorID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Color> listaColores = new List<BackEndSAM.Models.Pintura.IntermedioAcabado.Color>();
                    //List<Sam3_ST_CRRT_Get_ListaProyectos_Result> listaProyectosCTX = ctx.Sam3_ST_CRRT_Get_ListaProyectos(usuario.UsuarioID).ToList();
                    listaColores.Add(new BackEndSAM.Models.Pintura.IntermedioAcabado.Color());

                    for (int i = 1; i < 5; i++)
                    {
                        listaColores.Add(new BackEndSAM.Models.Pintura.IntermedioAcabado.Color
                        {
                            ColorID = i,
                            Nombre = "Color " + i
                        });
                    }

                    //foreach (Sam3_ST_CRRT_Get_ListaProyectos_Result item in listaProyectosCTX)
                    //{
                    //    listaZonas.Add(new Zona
                    //    {
                    //        ProyectoID = item.ProyectoID,
                    //        Nombre = item.Nombre,
                    //        PatioID = item.PatioID,
                    //        PrefijoOrdenTrabajo = item.PrefijoOrdenTrabajo
                    //    });
                    //}

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