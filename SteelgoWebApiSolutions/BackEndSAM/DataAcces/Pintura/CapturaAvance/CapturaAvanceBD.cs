using BackEndSAM.Models.Pintura.PinturaGeneral;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using BackEndSAM.Models.Pintura.CapturaAvance;
using System.Data;
using DatabaseManager.Constantes;
using BackEndSAM.Models.Sam3General.Cuadrante;
using BackEndSAM.DataAcces.Sam3General.Cuadrante;
using Newtonsoft.Json;

namespace BackEndSAM.DataAcces.PinturaBD.CapturaAvanceBD
{
    public class CapturaAvanceBD
    {

        private static readonly object _mutex = new object();
        private static CapturaAvanceBD _instance;
        string pintores = "", shotblasteros = "";

        public static CapturaAvanceBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new CapturaAvanceBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerCamposPredeterminados(Sam3_Usuario usuario, string lenguaje, int idCampoPredeterminado)
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

        public object ObtenerCarrosCerradosPorProceso(string lenguaje, int procesoID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    List<Sam3_Pintura_AvanceCarro_Get_CarrosCerrados_Result> result = ctx.Sam3_Pintura_AvanceCarro_Get_CarrosCerrados(procesoID).ToList();
                    List<CarroCerrado> ListadoMedioTransporte = new List<CarroCerrado>();

                    if (result.Count > 0)
                        ListadoMedioTransporte.Add(new CarroCerrado());

                    foreach (Sam3_Pintura_AvanceCarro_Get_CarrosCerrados_Result item in result)
                    {
                        ListadoMedioTransporte.Add(new CarroCerrado
                        {
                            MedioTransporteID = item.MedioTransporteID,
                            Nombre = item.Nombre,
                            MedioTransporteCargaID = item.MedioTransporteCargaID,
                            SistemaPinturaProyectoID = item.SistemaPinturaProyectoID
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

        public object ObtenerListaMedioTransporteCargado(int cargaCarroID, string lenguaje, int sistemaPinturaProyectoID, int procesoPinturaID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    RetornaDetalles detalles = new RetornaDetalles();

                    //List<Sam3_Pintura_AvanceCarro_Get_Detalle_Result> result = ctx.Sam3_Pintura_AvanceCarro_Get_Detalle(cargaCarroID, lenguaje,sistemaPinturaProyectoID,procesoPinturaID).ToList();

                    //La clase es DetalleCapturaAvanceCarro

                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = { { "@cargaCarroID", cargaCarroID.ToString() }, { "@Lenguaje", lenguaje }, { "@sistemaPinturaProyectoID", sistemaPinturaProyectoID.ToString() }, { "@procesoPinturaID", procesoPinturaID.ToString() } };
                    DataTable dtDetalle = _SQL.EjecutaDataAdapter(Stords.OBTIENEDETALLEAVANCECARRO, parametro);

                    return JsonConvert.SerializeObject(dtDetalle);

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

        public object ObtenerSpoolNuevo(int OrdenTrabajoSpoolID, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Pintura_AvanceCarro_Get_AgregarSpool_Result> result = ctx.Sam3_Pintura_AvanceCarro_Get_AgregarSpool(OrdenTrabajoSpoolID, lenguaje).ToList();
                    List<DetalleCapturaAvanceCarro> ListadoMedioTransporte = new List<DetalleCapturaAvanceCarro>();

                    foreach (Sam3_Pintura_AvanceCarro_Get_AgregarSpool_Result item in result)
                    {
                        ListadoMedioTransporte.Add(new DetalleCapturaAvanceCarro
                        {
                            FechaShotblast = "",
                            Accion = 1,
                            SpoolID = item.SpoolID,
                            Spool = item.NumeroControl,
                            SistemaPinturaID = item.SistemaPinturaID,
                            SistemaPintura = item.SistemaPintura,
                            SistemaPinturaProyectoID = item.SistemaPinturaProyectoID,
                            ColorPinturaID = item.ColorID,
                            Color = item.Color,
                            Area = item.Area.GetValueOrDefault(),
                            plantillaShotblastero = "",
                            CargaCarroID = item.CargaCarroID,
                            CarroID = item.CarroID,
                            Lote = item.Lote,
                            CuadranteAnteriorID=item.CuadranteAnteriorID,
                            ZonaAnteriorID=item.ZonaAnteriorID,
                            CuadranteID=item.CuadranteID,
                            Cuadrante=item.Cuadrante,
                            PatioID=item.PatioID
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

        public object ObtenerObreros(string lenguaje, int tipo, string tipoObrero)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    List<Sam3_Steelgo_Get_Obrero_Result> result = ctx.Sam3_Steelgo_Get_Obrero(tipo, tipoObrero, null, null, null).ToList();
                    List<PintorSpool> ListadoPintores = new List<PintorSpool>();

                    foreach (Sam3_Steelgo_Get_Obrero_Result item in result)
                    {
                        ListadoPintores.Add(new PintorSpool
                        {
                            Accion = 1,
                            Codigo = item.Codigo,
                            ObreroID = item.ObreroID,
                            PinturaSpoolObreroID = 0
                        });
                    }




                    return ListadoPintores.OrderBy(x => x.ObreroID).ToList();
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

        public object ObtenerObrerosGuardados(string lenguaje, int pinturaSpoolID, int pasoID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    pintores = pasoID == 2 ? "" : pintores;
                    shotblasteros = pasoID == 1 ? "" : shotblasteros;
                    List<Sam3_Pintura_Get_DetalleSpoolObreroPaso_Result> result = ctx.Sam3_Pintura_Get_DetalleSpoolObreroPaso(pinturaSpoolID, pasoID, lenguaje).ToList();
                    List<PintorSpool> ListadoPintores = new List<PintorSpool>();

                    foreach (Sam3_Pintura_Get_DetalleSpoolObreroPaso_Result item in result)
                    {
                        ListadoPintores.Add(new PintorSpool
                        {
                            Accion = 2,
                            ObreroID = item.ObreroID.GetValueOrDefault(),
                            Codigo = item.Codigo,
                            PinturaSpoolObreroID = item.PinturaSpoolObreroId,
                        });
                    }

                    foreach (PintorSpool item in ListadoPintores)
                    {
                        if (pasoID == 2)
                        {
                            pintores = pintores + item.Codigo + ", ";
                        }
                        else if (pasoID == 1)
                        {
                            shotblasteros = shotblasteros + item.Codigo + ", ";
                        }
                    }

                    return ListadoPintores;
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

        public object InsertarCargaSpool(DataTable dtDetalleCaptura, DataTable dtDetalleObreros, Sam3_Usuario usuario, string lenguaje, int medioTransporteCargaID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = { { "@Usuario", usuario.UsuarioID.ToString() }, { "@Lenguaje", lenguaje }, { "@medioTransporteCargaID", medioTransporteCargaID.ToString() } };
                    _SQL.Ejecuta(Stords.GUARDACAPTURAAVANCE, dtDetalleCaptura, "@Tabla", dtDetalleObreros, "@TablaObreros", parametro);

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

        public object ObtenerLayoutProcesoPintura(int sistemaPinturaProyectoId, int procesoID, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    List<Sam3_Pintura_AvanceCarro_Get_LayoutComponentes_Result> result = ctx.Sam3_Pintura_AvanceCarro_Get_LayoutComponentes(sistemaPinturaProyectoId, procesoID, lenguaje).ToList();

                    List<Sam3_Pintura_AvanceCarro_Get_LayoutReducores_Result> resultReductores = ctx.Sam3_Pintura_AvanceCarro_Get_LayoutReducores(sistemaPinturaProyectoId, procesoID, lenguaje).ToList();

                    List<object> listadoColumns = new List<object>();

                    List<Componente> ListadoLayoutComponentes = new List<Componente>();
                    List<Reductor> ListadoLayoutReductor = new List<Reductor>();


                    foreach (Sam3_Pintura_AvanceCarro_Get_LayoutComponentes_Result item in result)
                    {
                        ListadoLayoutComponentes.Add(new Componente
                        {
                            NombreComponente = item.NombreComponente
                        });
                    }

                    foreach (Sam3_Pintura_AvanceCarro_Get_LayoutReducores_Result item in resultReductores)
                    {
                            ListadoLayoutReductor.Add(new Reductor
                            {
                                NombreReductor = item.NombreReductor
                            });
                    }

                    listadoColumns.Add(ListadoLayoutComponentes);
                    listadoColumns.Add(ListadoLayoutReductor);

                    return listadoColumns;
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



        public object ObtenerLotesComponentes(string componente, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Pintura_AvanceCarro_Get_LotesComponente_Result> result = ctx.Sam3_Pintura_AvanceCarro_Get_LotesComponente(componente, lenguaje).ToList();
                    List<Lote> ListadoLotes = new List<Lote>();
                    if (result.Count > 0)
                        ListadoLotes.Add(new Lote());

                    foreach (Sam3_Pintura_AvanceCarro_Get_LotesComponente_Result item in result)
                    {
                        ListadoLotes.Add(new Lote
                        {
                            NombreLote=item.Lote,
                            Cantidad=item.Cantidad
                        });
                    }
                    return ListadoLotes;
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

        public object ObtenerLotesReductor(string componente, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Pintura_AvanceCarro_Get_LotesReductor_Result> result = ctx.Sam3_Pintura_AvanceCarro_Get_LotesReductor(componente, lenguaje).ToList();
                    List<Lote> ListadoLotes = new List<Lote>();
                    if (result.Count > 0)
                        ListadoLotes.Add(new Lote());

                    foreach (Sam3_Pintura_AvanceCarro_Get_LotesReductor_Result item in result)
                    {
                        ListadoLotes.Add(new Lote
                        {
                            NombreLote = item.Lote,
                            Cantidad = item.Cantidad
                        });
                    }
                    return ListadoLotes;
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