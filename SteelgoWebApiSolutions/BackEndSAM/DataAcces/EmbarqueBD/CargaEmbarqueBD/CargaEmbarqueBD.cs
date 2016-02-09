using BackEndSAM.Models.Embarque.CargaEmbarque;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.EmbarqueBD.CargaEmbarqueBD
{

    public class CargaEmbarqueBD
    {
        private static readonly object _mutex = new object();
        private static CargaEmbarqueBD _instance;

        public static CargaEmbarqueBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new CargaEmbarqueBD();
                    }
                }
                return _instance;
            }
        }

        public  object ObtenerPlacasPlana(int TransportistaID, int embarquePlanaID, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<PlacaPlana> ListadoPlacaPlana = new List<PlacaPlana>();
                    if (embarquePlanaID != 0)
                    {
                        List<Sam3_Steelgo_Get_PlacasXEmbarquePlanaID_Result> result = ctx.Sam3_Steelgo_Get_PlacasXEmbarquePlanaID(embarquePlanaID, TransportistaID).ToList();

                        foreach (Sam3_Steelgo_Get_PlacasXEmbarquePlanaID_Result item in result)
                        {
                            ListadoPlacaPlana.Add(new PlacaPlana
                            {
                                Placas = item.Placas,
                                VehiculoID = item.VehiculoID.GetValueOrDefault()
                            });
                        }
                    }
                    else
                    {
                        List<Sam3_Embarque_Get_Planas_CargaEmb_Result> result = ctx.Sam3_Embarque_Get_Planas_CargaEmb(TransportistaID,lenguaje).ToList();

                        foreach (Sam3_Embarque_Get_Planas_CargaEmb_Result item in result)
                        {
                            ListadoPlacaPlana.Add(new PlacaPlana
                            {
                                EmbarquePlanaID = item.EmbarquePlanaID.GetValueOrDefault(),
                                Placas = item.Placas,
                                VehiculoID = item.VehiculoID,
                                estatus = item.Estatus
                            });
                        }
                    }
                    return ListadoPlacaPlana;
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

        public object ObtenerPaquetes(int tipo)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Embarque_Get_Paquetes_Result> result = ctx.Sam3_Embarque_Get_Paquetes(tipo).ToList();

                    List<Paquete> ListadoPaquetes = new List<Paquete>();

                    foreach (Sam3_Embarque_Get_Paquetes_Result item in result)
                    {
                        ListadoPaquetes.Add(new Paquete
                        {
                            EmbarquePaqueteID=item.EmbarquePaqueteID,
                            Folio=item.Folio
                        });
                    }
                    return ListadoPaquetes;
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

        public object ObtieneDetalle(int TipoConsulta, int OrdenTrabajoSpoolID, int Paquete, string Codigo, string lenguaje, int embarquePlanaID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Embarque_Get_CargaSpool_Result> result = ctx.Sam3_Embarque_Get_CargaSpool(TipoConsulta, OrdenTrabajoSpoolID, Paquete, Codigo,lenguaje).ToList();

                    List<DetalleCargaCaptura> ListadoDetalleCargaCaptura = new List<DetalleCargaCaptura>();

                    int consecutivo = 1;

                    foreach(Sam3_Embarque_Get_CargaSpool_Result item in result)
                    {
                        ListadoDetalleCargaCaptura.Add(new DetalleCargaCaptura
                        {
                            Accion= embarquePlanaID ==0 ?1: embarquePlanaID,
                            Consecutivo = consecutivo,
                            Cuadrante = item.Cuadrante,
                            CuadranteID = item.CuadranteID,
                            EmbarquePaqueteID = item.EmbarquePaqueteID,
                            Mensaje = item.Mensaje,
                            NumeroControl = item.NumeroControl,
                            OrdenTrabajoSpoolID = item.OrdenTrabajoSpoolID,
                            Paquete = item.Paquete,
                            Peso = double.Parse(item.Peso.ToString()),
                            SpoolID = item.SpoolID,
                            Seleccionado = false
                        });
                        consecutivo++;
                    }
                    return ListadoDetalleCargaCaptura;
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


        public object ObtieneDetalleXPlaca(int TransportistaID, int VehiuloID, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Embarque_Get_CargaSpoolCargado_Result> result = ctx.Sam3_Embarque_Get_CargaSpoolCargado(VehiuloID, TransportistaID,lenguaje).ToList();

                    List<DetalleCargaCaptura> ListadoDetalleCargaCaptura = new List<DetalleCargaCaptura>();

                    int consecutivo = 1;

                    foreach (Sam3_Embarque_Get_CargaSpoolCargado_Result item in result)
                    {
                        ListadoDetalleCargaCaptura.Add(new DetalleCargaCaptura
                        {
                            EmbarquePlanaSpoolID = item.EmbarquePlanaSpoolID,
                            Accion = 2,
                            Consecutivo = consecutivo,
                            Cuadrante = item.Cuadrante,
                            CuadranteID = item.CuadranteID,
                            EmbarquePaqueteID = item.EmbarquePaqueteID,
                            Mensaje = item.Mensaje,
                            NumeroControl = item.NumeroControl,
                            OrdenTrabajoSpoolID = item.OrdenTrabajoSpoolID,
                            Paquete = item.Paquete,
                            Peso = double.Parse(item.Peso.ToString()),
                            SpoolID = item.SpoolID,
                            Seleccionado = false
                        });
                        consecutivo++;
                    }
                    return ListadoDetalleCargaCaptura;
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


        public object ActualizarCuadrante(int EmpaquetadoPaqueteID,DataTable dtNuevoCuadrante,int usuarioID)
        {
                using (SamContext ctx = new SamContext())
                {
                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = { { "@EmbarquePaqueteID", EmpaquetadoPaqueteID.ToString() }, { "@Usuario", usuarioID.ToString() } };

                   return  _SQL.EjecutaDataAdapter(Stords.ACTUALIZARCUADRANTE, dtNuevoCuadrante, "@Tabla", parametro);

                   
                    //TransactionalInformation result = new TransactionalInformation();
                    //result.ReturnMessage.Add("Ok");

                    //result.ReturnCode = 200;
                    //result.ReturnStatus = true;
                    //result.IsAuthenicated = true;
                    
                    //return result;
                }
        }

        
        public object GuardarEmbarqueCarga(DataTable dtEmbarqueCargaSpool, int usuarioID, int proveedorID, int vehiculoID, int embarquePlanaID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = { { "@Usuario", usuarioID.ToString() }, { "@ProveedorID", proveedorID.ToString() }, { "@VehiculoID", vehiculoID.ToString() }, { "@EmbarquePlanaID", embarquePlanaID.ToString() } };

                    _SQL.Ejecuta(Stords.EMBARQUECARGA, dtEmbarqueCargaSpool, "@Tabla", parametro);

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

        public object CerrarPlana(int usuarioID , int embarquePlanaID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ObjetosSQL _SQL = new ObjetosSQL();
                    TransactionalInformation result = new TransactionalInformation();
                    string[,] parametro = { { "@Usuario", usuarioID.ToString() }, { "@EmbarquePlanaID", embarquePlanaID.ToString() }};

                    if (_SQL.EjecutaStoreExecuteReader(Stords.CierraPlana, parametro) > 0)
                    {
                        result.ReturnMessage.Add("Ok");
                        result.ReturnCode = 200;
                        result.ReturnStatus = true;
                        result.IsAuthenicated = true;
                    }
                    else
                    {
                        result.ReturnMessage.Add("Error");
                        result.ReturnCode = 400;
                        result.ReturnStatus = false;
                        result.IsAuthenicated = false;
                    }
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