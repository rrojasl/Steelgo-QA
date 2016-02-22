using BackEndSAM.Models.Cuadrante;
using BackEndSAM.Models.Embarque.CargaEmbarque;
using BackEndSAM.Models.Pintura.MedioTransporte;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Core.Objects;
using System.Linq;


namespace BackEndSAM.DataAcces.PinturaBD.MedioTransporteBD
{
    public class MedioTransporteBD
    {
        private static readonly object _mutex = new object();
        private static MedioTransporteBD _instance;

        public static MedioTransporteBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new MedioTransporteBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerCampoPredeterminado(Sam3_Usuario usuario, string lenguaje, int idCampoPredeterminado)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    var oMyString = new ObjectParameter("Retorna", typeof(string));
                    var result = ctx.Sam3_Steelgo_Get_CampoPredeterminado(idCampoPredeterminado, lenguaje, oMyString);
                    var data = oMyString.Value.ToString();


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

        public object ObtenerMedioTransporte(string lenguaje)
        {


            try
            {
                using (SamContext ctx = new SamContext())
                {
                    //
                    List<Sam3_Pintura_Get_MedioTransporte_Result> result = ctx.Sam3_Pintura_Get_MedioTransporte(lenguaje).ToList();

                    List<MedioTransporte> ListadoMedioTransporte = new List<MedioTransporte>();

                    foreach (Sam3_Pintura_Get_MedioTransporte_Result item in result)
                    {
                        ListadoMedioTransporte.Add(new MedioTransporte
                        {
                            AreaPermitidoMedioTransporte = item.AreaPermitidoMedioTransporte.GetValueOrDefault(),
                            MedioTransporteID = item.MedioTransporteID,
                            MedioTransporteCargaID = item.MedioTransporteCargaID.GetValueOrDefault(),
                            NombreMedioTransporte = item.NombreMedioTransporte,
                            NumeroUsosOcupados = item.NumeroUsosOcupados,
                            NumeroUsosPermitidos = item.NumeroUsosPermitidas,
                            PesoMaximoPermitido = item.PesoMaximoPermitiido.GetValueOrDefault(),
                            PesoMaximoOcupado = item.PesoMaximoOcupado.GetValueOrDefault(),
                            AreaMaximoOcupado = item.AreaMaximaOcupada.GetValueOrDefault()
                        });

                    }
                    return ListadoMedioTransporte; 
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

        public object CierraCarro(Sam3_Usuario usuario, int medioTransporteID, int medioTransporteCargaID, int cerrar)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = { { "@Usuario", usuario.UsuarioID.ToString() }, { "@MedioTransporteID", medioTransporteID.ToString() }, { "@MedioTransporteCargaID", medioTransporteCargaID.ToString() }, { "@Cerrar", cerrar.ToString() } };
                    _SQL.Ejecuta(Stords.SETCIERRACARRO, parametro);

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

        public object ObtieneDetalle(int medioTransporteID, int TipoConsulta, int OrdenTrabajoSpoolID, string Codigo, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Pintura_Get_DetalleSpool_Result> result = ctx.Sam3_Pintura_Get_DetalleSpool(medioTransporteID, TipoConsulta, OrdenTrabajoSpoolID, Codigo, lenguaje).ToList();

                    List<DetalleSpool> ListadoDetalleSpool = new List<DetalleSpool>();

                    foreach (Sam3_Pintura_Get_DetalleSpool_Result item in result)
                    {
                        ListadoDetalleSpool.Add(new DetalleSpool
                        {
                            Accion = item.Accion,
                            Area = item.Area.GetValueOrDefault(),
                            OrdenImportancia = item.OrdenImportancia.GetValueOrDefault(),
                            Peso = item.Peso.GetValueOrDefault(),
                            SistemaPintura = item.SistemaPintura,
                            SistemaPinturaID = item.SistemaPinturaID,
                            SpoolID = item.SpoolID,
                            SpoolJunta = item.SpoolJunta
                        });
                    }
                    return ListadoDetalleSpool;
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

        public object GuardarMedioTransporte(DataTable dtCarga, Sam3_Usuario usuario, string lenguaje, int medioTransporteID, int medioTransporteCargaID, int cerrar)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = { { "@Usuario", usuario.UsuarioID.ToString() }, { "@MedioTransporteID", medioTransporteID.ToString() } };

                    _SQL.Ejecuta(Stords.GUARDACAPTURAPINTURASPOOLCARGA, dtCarga, "@Tabla", parametro);

                    if(cerrar == 0)
                    {
                        CierraCarro(usuario, medioTransporteID, medioTransporteCargaID, cerrar);
                    } 

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


        public object ObtenerMedioTransporteCargado(string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    //
                    List<Sam3_Pintura_Get_MedioTransporteCargado_Result> result = ctx.Sam3_Pintura_Get_MedioTransporteCargado(lenguaje).ToList();

                    List<MedioTransporteCarga> ListadoMedioTransporteCarga = new List<MedioTransporteCarga>();

                    foreach (Sam3_Pintura_Get_MedioTransporteCargado_Result item in result)
                    {
                        ListadoMedioTransporteCarga.Add(new MedioTransporteCarga
                        {
                            MedioTransporteCargaID = item.MedioTransporteCargaID.GetValueOrDefault(),
                            NombreMedioTransporte = item.NombreMedioTransporte,


                        });

                    }
                    return ListadoMedioTransporteCarga;
                    //
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

        public object ObtenerMedioTransporteDetalleCargado(string lenguaje, int idMedioTransporteCarga, int statusCarga)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    //
                    List<Sam3_Pintura_Get_DetalleCarrosCargados_Result> result = ctx.Sam3_Pintura_Get_DetalleCarrosCargados(idMedioTransporteCarga, statusCarga).ToList();

                    List<Sam3_Steelgo_Get_Cuadrante_Result> GetlistaCuandrantes = (List<Sam3_Steelgo_Get_Cuadrante_Result>)CuadranteBD.Instance.ObtenerCuadrante(0);

                    List<DetalleMedioTransporteCarga> ListadoDetalleMedioTransporteCarga = new List<DetalleMedioTransporteCarga>();

                    List<Cuadrante> ListaCuandrantes = new List<Cuadrante>();
                    foreach (Sam3_Steelgo_Get_Cuadrante_Result item in GetlistaCuandrantes)
                    {
                        ListaCuandrantes.Add(
                             new Cuadrante
                             {
                                 AreaID = item.AreaID,
                                 CuadranteID = item.CuadranteID,
                                 Nombre = item.Nombre,
                                 PatioID = item.PatioID
                             });
                    }

                    foreach (Sam3_Pintura_Get_DetalleCarrosCargados_Result item in result)
                    {
                        ListadoDetalleMedioTransporteCarga.Add(new DetalleMedioTransporteCarga
                        { 
                            Accion = 2, //no es nuevo solo se pone para tener una bandera por si el usuario hace un cambio se actualiza la accion.
                            MedioTransporteID = item.MedioTransporteID.GetValueOrDefault(),
                            Area = item.Area.GetValueOrDefault(),
                            ColorPintura = item.ColorPintura,
                            MedioTransporteCargaID = item.MedioTransporteCargaID,
                            OrdenImportancia = item.OrdenImportancia.GetValueOrDefault(),
                            Peso = item.Peso.GetValueOrDefault()/1000,
                            SistemaPintura = item.SistemaPintura,
                            SistemaPinturaID = item.SistemaPinturaID,
                            SpoolID = item.SpoolID,
                            SpoolJunta = item.SpoolJunta,
                            CuadranteID = item.CuadranteID.GetValueOrDefault(),
                            Cuadrante = item.Cuadrante,
                            ListaCuandrantes = ListaCuandrantes

                           
                        });

                    }
                    return ListadoDetalleMedioTransporteCarga;
                    //
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

        public object GuardarDescarga(DataTable dtCarga, int usuarioID, int medioTransporteCargaID, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = { { "@Usuario", usuarioID.ToString() }, { "@MedioTransporteCargaID", medioTransporteCargaID.ToString() } };

                    _SQL.Ejecuta(Stords.GUARDACAPTURAPINTURASPOOLDESCARGA, dtCarga, "@Tabla", parametro);

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

        public object GuardarNuevoMedioTransporte(DataTable dtCarga, int usuarioID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = { { "@Usuario", usuarioID.ToString() } };

                    DataTable dt = _SQL.EjecutaDataAdapter(Stords.GUARDACAPTURANUEVOMEDIOTRANSPORTE, dtCarga, "@Tabla", parametro);
                    TransactionalInformation result = new TransactionalInformation();
                    if (dt.Rows.Count == 0)
                    {

                        result.ReturnMessage.Add("Ok");
                        result.ReturnCode = 200;
                        result.ReturnStatus = true;
                        result.IsAuthenicated = true;
                    }
                    else
                    {

                        result.ReturnMessage.Add(dt.Rows[0][0].ToString());
                        result.ReturnCode = 500;
                        result.ReturnStatus = false;
                        result.IsAuthenicated = true;
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

        public object ObteneCatalogoClasificacion()
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    //
                    List<Sam_Pintura_Get_Clasificacion_Result> result = ctx.Sam_Pintura_Get_Clasificacion().ToList();

                    List<Clasificacion> ListadoClasificacion = new List<Clasificacion>();

                    foreach (Sam_Pintura_Get_Clasificacion_Result item in result)
                    {
                        ListadoClasificacion.Add(new Clasificacion
                        {
                            ClasificacionPersistenciaID = item.ClasificacionPersistenciaID,
                            NombreClasificacion = item.Clasificacion,

                        });

                    }
                    return ListadoClasificacion;
                    //
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

        public object ObtenerCatalogoPersistencia()
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    //
                    List<Sam3_Pintura_Get_TipoPersistencia_Result> result = ctx.Sam3_Pintura_Get_TipoPersistencia().ToList();

                    List<TipoPersistencia> ListadoPersistencia = new List<TipoPersistencia>();

                    foreach (Sam3_Pintura_Get_TipoPersistencia_Result item in result)
                    {
                        ListadoPersistencia.Add(new TipoPersistencia
                        {
                            TipoPersistenciaID = item.TipoPersistenciaID,
                            Tipo = item.Tipo
                        });

                    }
                    return ListadoPersistencia;
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