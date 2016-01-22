using BackEndSAM.Models.Pintura.CapturaAvanceIntAcabado;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Core.Objects;
using System.Linq;

namespace BackEndSAM.DataAcces.PinturaBD.CapturaAvanceIntAcabado
{
    public class CapturaAvanceIntAcabadoBD
    {
        private static readonly object _mutex = new object();
        private static CapturaAvanceIntAcabadoBD _instance;

        public static CapturaAvanceIntAcabadoBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new CapturaAvanceIntAcabadoBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerCamposPredeterminadosBD(Sam3_Usuario usuario, string lenguaje, int idCampoPredeterminado)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    var oMyString = new ObjectParameter("Retorna", typeof(string));
                    var result = ctx.Sam3_Steelgo_Get_CampoPredeterminado(idCampoPredeterminado, lenguaje, oMyString);
                    var data = oMyString.Value.ToString();

                    //ObjectParameter objectParameter = new ObjectParameter("Retorna", typeof(String));


                    return data;
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

        public object ObtenerCuadrante(int id)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Steelgo_Get_Cuadrante_Result> result = ctx.Sam3_Steelgo_Get_Cuadrante(id).ToList();
                    

                    List<Cuadrante> cuadranteList = new List<Cuadrante>();

                    foreach (Sam3_Steelgo_Get_Cuadrante_Result item in result)
                    {
                        cuadranteList.Add(new Cuadrante
                        {
                            CuadranteID = item.CuadranteID,
                            Nombre = item.Nombre
                        });
                    }

                    return cuadranteList;
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

        public object ObtenerLote()
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                     

                    return ObtenerListaLotes();
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
         
        public object ObtenerPintores()
        {
            try
            {
              
                    return ObtenerListaPintores();
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

        public object ObtenerColores(string lenguaje)
        {
            try
            {

                return ObtenerListaColores(lenguaje);
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

        public object ObtenerIDOrdenTrabajo(Sam3_Usuario usuario, string ordentrabajo, int tipo, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Steelgo_Get_SpoolID_Result> lista = ctx.Sam3_Steelgo_Get_SpoolID(tipo, ordentrabajo, lenguaje).ToList();// Sam3_Steelgo_Get_SpoolID(tipo, ordentrabajo).ToList();
                    return lista;

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
         
        public List<ObreroPintor> ObtenerListaPintores ()
        {
            using (SamContext ctx = new SamContext())
            {
                List<ObreroPintor> listaPintoresCapturaAvanceIntAcabado = new List<ObreroPintor>();
                List<Sam3_Steelgo_Get_Obrero_Result> listresult = ctx.Sam3_Steelgo_Get_Obrero(2, "Pintor", null, null).ToList();
                foreach (Sam3_Steelgo_Get_Obrero_Result item in listresult)
                {
                    listaPintoresCapturaAvanceIntAcabado.Add(new ObreroPintor
                    {
                        Accion = 1,
                        ObreroID = item.ObreroID,
                        Pintor = item.Codigo,
                    });
                }

                return listaPintoresCapturaAvanceIntAcabado;
            }
        }

        public List<Color> ObtenerListaColores(string lenguaje)
        {
            using (SamContext ctx = new SamContext())
            {
                List<Color> lista = new List<Color>();
                List<Sam3_Steelgo_Get_Color_Result> result = ctx.Sam3_Steelgo_Get_Color(lenguaje).ToList();
                foreach (Sam3_Steelgo_Get_Color_Result item in result)
                {
                    Color elemento = new Color
                    {
                        ColorID = item.ColorID,
                        Nombre = item.Color
                    };
                    lista.Add(elemento);
                }

                return lista;
            }
        }

        public List<Lote> ObtenerListaLotes()
        {
            using (SamContext ctx = new SamContext())
            {
                List<Sam3_Steelgo_Get_LotePintura_Result> result = ctx.Sam3_Steelgo_Get_LotePintura().ToList();


                List<Lote> loteList = new List<Lote>();

                foreach (Sam3_Steelgo_Get_LotePintura_Result item in result)
                {
                    loteList.Add(new Lote
                    {
                        LotePinturaID = item.LotePinturaID,
                        NumeroLote = item.NumeroLote
                    });
                }

                return loteList;
            }
        }

        public object ObtenerDetallePorCuadrante(int cuadrante,int paso, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Pintura_Get_DetalleSpoolPorCuadrante_Result> result = ctx.Sam3_Pintura_Get_DetalleSpoolPorCuadrante(cuadrante, paso, lenguaje).ToList();
                    List<Sam3_Pintura_Get_SistemaPintura_Result> resultSistemaPuntura = ctx.Sam3_Pintura_Get_SistemaPintura().ToList();


                    List<SistemaPintura> sistemaPinturaList = new List<SistemaPintura>();

                    foreach (Sam3_Pintura_Get_SistemaPintura_Result itemSistemaPintura in resultSistemaPuntura)
                    {
                        sistemaPinturaList.Add(new SistemaPintura
                        {
                            Nombre = itemSistemaPintura.SistemaPintura,
                            SistemaPinturaID = itemSistemaPintura.SistemaPinturaID
                        });
                    }
                    List<Sam3_Pintura_Get_ComponenteSistemaPintura_Result> resultComponenteComposicion = ctx.Sam3_Pintura_Get_ComponenteSistemaPintura(0).ToList();


                    List<PinturaComponenteComposicion> pinturaComponenteComposicionListGeneral = new List<PinturaComponenteComposicion>();

                    foreach (Sam3_Pintura_Get_ComponenteSistemaPintura_Result itemComponenteComposicion in resultComponenteComposicion)
                    {
                        pinturaComponenteComposicionListGeneral.Add(new PinturaComponenteComposicion
                        {
                            Componente = itemComponenteComposicion.Nombre,
                            ComponenteID = itemComponenteComposicion.PinturaComponenteComposicionID,
                            SistemaPinturaID= itemComponenteComposicion.SistemaPinturaID.GetValueOrDefault()
                        });
                    }

                    List<Color> listaColores = new List<Color>();
                    List<Lote> listaLotes = new List<Lote>();

                    List<ObreroPintor> listaPintoresCapturaAvanceIntAcabado = new List<ObreroPintor>();
                    List<DetalleCuadrante> cuadranteList = new List<DetalleCuadrante>();
                    List<ObreroPintor> listaPintoresPorSpool = new List<ObreroPintor>();
                     

                    listaPintoresCapturaAvanceIntAcabado = ObtenerListaPintores();
                    listaColores = ObtenerListaColores(lenguaje);
                    listaLotes = ObtenerListaLotes();

                    foreach (Sam3_Pintura_Get_DetalleSpoolPorCuadrante_Result item in result)
                    {
                        List<ObreroPintor> listaObrerosPorSpool = new List<ObreroPintor>();
                        
                       // int contador = 0;
                        List<Sam3_Pintura_Get_DetalleSpoolObreroPaso_Result> pintoresPorSpool = ctx.Sam3_Pintura_Get_DetalleSpoolObreroPaso(item.PinturaSpoolID, item.PasoID, lenguaje).ToList();


                        //int[] listaIDSObrerosPorSpool = new int[pintoresPorSpool.Count];

                        foreach (Sam3_Pintura_Get_DetalleSpoolObreroPaso_Result obrero in pintoresPorSpool)
                        {


                            listaObrerosPorSpool.Add(new ObreroPintor
                            {
                                PinturaSpoolObreroID = obrero.PinturaSpoolObreroId,
                                ObreroID = obrero.ObreroID.GetValueOrDefault(),
                                Pintor = obrero.Codigo,
                                Accion = 2
                            });

                            //listaIDSObrerosPorSpool[contador] = obrero.ObreroID.GetValueOrDefault();
                            //contador++;
                        }

                        List<ObreroPintor> listaObrerosPorSpoolInicial = listaObrerosPorSpool;

                        List<Sam3_Pintura_Get_ComponenteSistemaPintura_Result> resultComponenteComposicionEspecifica = ctx.Sam3_Pintura_Get_ComponenteSistemaPintura(item.SistemaPinturaID).ToList();


                        List<PinturaComponenteComposicion> pinturaComponenteComposicionListEspecifica = new List<PinturaComponenteComposicion>();

                        foreach (Sam3_Pintura_Get_ComponenteSistemaPintura_Result itemComponenteComposicion in resultComponenteComposicionEspecifica)
                        {
                            pinturaComponenteComposicionListEspecifica.Add(new PinturaComponenteComposicion
                            {
                                Componente = itemComponenteComposicion.Nombre,
                                ComponenteID = itemComponenteComposicion.PinturaComponenteComposicionID,
                                SistemaPinturaID = itemComponenteComposicion.SistemaPinturaID.GetValueOrDefault()
                            });
                        }

                        cuadranteList.Add(new DetalleCuadrante
                        { 
                            PinturaSpoolID = item.PinturaSpoolID.GetValueOrDefault(),
                            SpoolID = item.SpoolID,
                            Spool = item.NombreSpool,
                            SistemaPinturaID = item.SistemaPinturaID.GetValueOrDefault(),
                            SistemaPintura = item.SistemaPintura,
                            listaColores = listaColores,
                            ColorID =item.ColorID.GetValueOrDefault(),
                            Color = item.Color,
                            MetrosCuadrados = Convert.ToString(item.Area),
                            listaLotes = listaLotes,
                            LoteID = item.LotePinturaID.GetValueOrDefault(),
                            Lote = item.NumeroLote, 
                            ComponenteID = item.PinturaComponenteComposicionID.GetValueOrDefault(),
                            Componente = item.Componente , 
                            FechaPintura = item.Fecha,
                            ListaPintores = listaPintoresCapturaAvanceIntAcabado,
                           // ListaPintoresSeleccionadosPorSpool = listaIDSObrerosPorSpool,


                            ListaDetallePintoresPorSpool = listaObrerosPorSpool,
                            ListaDetallePintoresPorSpoolInicial = listaObrerosPorSpoolInicial,

                             

                            PasoId = item.PasoID.GetValueOrDefault(),
                            Accion = item.PinturaSpoolID==null? 1:2,
                            TemplatePintoresPorSpool = listaObrerosPorSpool.Count <= 0 ? "No existen pintores registrados para el spool" : "Existen "+ listaObrerosPorSpool.Count + " pintores",
                            listaSistemaPintura= sistemaPinturaList,
                            ListaPinturaComponenteCompGeneral= pinturaComponenteComposicionListGeneral,
                            ListaPinturaComponenteCompEspecifica = pinturaComponenteComposicionListEspecifica
                        });
                    }

                    return cuadranteList;
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

        public object InsertarCapturaAvanceIntAcabado(DataTable dtDetalleCaptura, DataTable dtPintores, Sam3_Usuario usuario, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = { { "@Usuario", usuario.UsuarioID.ToString() }, { "@Lenguaje", lenguaje } };

                    _SQL.Ejecuta(Stords.GUARDACAPTURAAVANCEINTACABADO, dtPintores, "@TablaObreros", dtDetalleCaptura, "@Tabla", parametro);

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

        public object ObtenerSpoolParaAgregar (int ordenTrabajoSpoolID)
        {
            try
            { 


                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Pintura_Get_DetalleSpoolAgregar_Result> result = ctx.Sam3_Pintura_Get_DetalleSpoolAgregar(ordenTrabajoSpoolID).ToList();


                    List<CapturaNuevo> loteList = new List<CapturaNuevo>();

                    foreach (Sam3_Pintura_Get_DetalleSpoolAgregar_Result item in result)
                    {
                        loteList.Add(new CapturaNuevo
                        {
                            Accion = 1,
                            MetrosCuadrados = item.Area.GetValueOrDefault()
                            
                        });
                    }

                    return loteList;
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

        public List<PinturaComponenteComposicion> ObtenerComponenteComposicion(int idSistemaPintura)
        {
            using (SamContext ctx = new SamContext())
            {
                List<Sam3_Pintura_Get_ComponenteSistemaPintura_Result> result = ctx.Sam3_Pintura_Get_ComponenteSistemaPintura(idSistemaPintura).ToList();


                List<PinturaComponenteComposicion> pinturaComponenteComposicionList = new List<PinturaComponenteComposicion>();

                foreach (Sam3_Pintura_Get_ComponenteSistemaPintura_Result item in result)
                {
                    pinturaComponenteComposicionList.Add(new PinturaComponenteComposicion
                    {
                       Componente=item.Nombre,
                       ComponenteID=item.PinturaComponenteComposicionID
                    });
                }

                return pinturaComponenteComposicionList;
            }
        }

        public List<SistemaPintura> ObtenerSistemaPintura()
        {
            using (SamContext ctx = new SamContext())
            {
                List<Sam3_Pintura_Get_SistemaPintura_Result> result = ctx.Sam3_Pintura_Get_SistemaPintura().ToList();


                List<SistemaPintura> sistemaPinturaList = new List<SistemaPintura>();

                foreach (Sam3_Pintura_Get_SistemaPintura_Result item in result)
                {
                    sistemaPinturaList.Add(new SistemaPintura
                    {
                        Nombre=item.SistemaPintura,
                        SistemaPinturaID=item.SistemaPinturaID
                    });
                }

                return sistemaPinturaList;
            }
        }
    }
}
