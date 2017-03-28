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

        public object ObtenerCarrosCerradosPorProceso(string lenguaje,int procesoID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    List<Sam3_Pintura_AvanceCarro_Get_CarrosCerrados_Result> result = ctx.Sam3_Pintura_AvanceCarro_Get_CarrosCerrados( procesoID).ToList();
                    List<CarroCerrado> ListadoMedioTransporte = new List<CarroCerrado>();

                    if (result.Count > 0)
                        ListadoMedioTransporte.Add(new CarroCerrado());

                    foreach (Sam3_Pintura_AvanceCarro_Get_CarrosCerrados_Result item in result)
                    {
                        ListadoMedioTransporte.Add(new CarroCerrado
                        {
                            MedioTransporteID = item.MedioTransporteID,
                            Nombre = item.Nombre,
                            MedioTransporteCargaID= item.MedioTransporteCargaID,
                            SistemaPinturaProyectoID=item.SistemaPinturaProyectoID
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

        public object ObtenerListaMedioTransporteCargado(int medioTransporteCargaID, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    RetornaDetalles detalles = new RetornaDetalles();
                    int sPinturaID = 0;
                    List<Sam3_Pintura_Get_DetalleSpoolCapturaAvance_Result> result = ctx.Sam3_Pintura_Get_DetalleSpoolCapturaAvance(medioTransporteCargaID, lenguaje).ToList();
                    List<DetalleCapturaAvanceCarro> ListadoMedioTransporte = new List<DetalleCapturaAvanceCarro>();
                    List<Sam3_Pintura_Get_DetalleSpoolCapturaAvance_Result> spoolsCargados = new List<Sam3_Pintura_Get_DetalleSpoolCapturaAvance_Result>();
                    List<Sam3_Steelgo_Get_Cuadrante_Result> GetlistaCuandrantes = (List<Sam3_Steelgo_Get_Cuadrante_Result>)CuadranteBD.Instance.ObtenerCuadrante(6);

                    List<UbicacionCuadrante> ListaCuandrantes = new List<UbicacionCuadrante>();
                    foreach (Sam3_Steelgo_Get_Cuadrante_Result item in GetlistaCuandrantes)
                    {
                        ListaCuandrantes.Add(
                             new UbicacionCuadrante
                             {
                                 CuadranteID = item.CuadranteID,
                                 Nombre = item.Nombre
                             });
                    }

                    foreach (Sam3_Pintura_Get_DetalleSpoolCapturaAvance_Result item in result)
                    {

                        bool existe = spoolsCargados.Exists(element => element.SpoolID == item.SpoolID);
                        if (!existe)
                        {
                            spoolsCargados.Add(item);
                        }
                    }

                    foreach (Sam3_Pintura_Get_DetalleSpoolCapturaAvance_Result item in spoolsCargados)
                    {
                        ListadoMedioTransporte.Add(new DetalleCapturaAvanceCarro
                        {
                            Accion = item.PinturaSpoolID == null ? 1 : 2,
                            CargaCarroID = item.CargaCarroID,
                            Area = item.Area.GetValueOrDefault(),
                            Color = item.ColorPintura,
                            ColorPinturaID = item.ColorPinturaID,                           
                            SistemaPintura = item.SistemaPintura,
                            SistemaPinturaID = item.SistemaPinturaID,                           
                            SpoolID = item.SpoolID,
                            Spool = item.SpoolJunta,
                            FechaShotblast = item.FechaShootblast,
                            ListaShotblasteros = (List<PintorSpool>)CapturaAvanceBD.Instance.ObtenerObreros(lenguaje, 2, "ShotBlastero"),
                            ListaShotblasteroGuargado = (List<PintorSpool>)CapturaAvanceBD.Instance.ObtenerObrerosGuardados(lenguaje, item.PinturaSpoolIDShotblastero.GetValueOrDefault(), 1),
                            ListaShotblasteroInicial = (List<PintorSpool>)CapturaAvanceBD.Instance.ObtenerObrerosGuardados(lenguaje, item.PinturaSpoolIDShotblastero.GetValueOrDefault(), 1),
                            plantillaShotblastero = shotblasteros,
                            Lote="Falta Agoritmo de lotes."
                        });
                        sPinturaID = item.SistemaPinturaID;
                    }
                    detalles.listaCapturaAvance = ListadoMedioTransporte;
                   
                   
                    return detalles;
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

        public object ObtenerSpoolNuevo(int OrdenTrabajoSpoolID, string lenguaje, List<PintorSpool> shotblastero, List<PintorSpool> pintor)
        {
            try
            {
                pintores = "";
                shotblasteros = "";
                using (SamContext ctx = new SamContext())
                {
                    foreach (PintorSpool item in shotblastero)
                    {
                        shotblasteros = shotblasteros + item.Codigo + ", ";
                    }

                    foreach (PintorSpool item in pintor)
                    {
                        pintores = pintores + item.Codigo + ", ";
                    }

                    List<Sam3_Pintura_Get_DetalleSpoolAgregar_Result> result = ctx.Sam3_Pintura_Get_DetalleSpoolAgregar(OrdenTrabajoSpoolID).ToList();
                    List<DetalleCapturaAvanceCarro> ListadoMedioTransporte = new List<DetalleCapturaAvanceCarro>();

                    foreach (Sam3_Pintura_Get_DetalleSpoolAgregar_Result item in result)
                    {

                        ListadoMedioTransporte.Add(new DetalleCapturaAvanceCarro
                        {
                            Accion = 1,
                            PinturaSpoolIDShotblastero = 0,
                            PinturaSpoolIDShotPrimario = 0,
                            MedioTransporteCargaID = 0,
                            MedioTransporteID = 0,
                            Metros2 = item.Area.GetValueOrDefault(),
                            Color = item.ColorPintura,
                            ColorPinturaID = item.ColorPinturaID,
                            OrdenImportancia = item.OrdenImportancia.GetValueOrDefault(),
                            Peso = item.Peso.GetValueOrDefault(),
                            SistemaPintura = item.SistemaPintura,
                            SistemaPinturaID = item.SistemaPinturaID,
                            SpoolID = item.SpoolID,
                            Spool = item.SpoolJunta,
                            ListaPintores = (List<PintorSpool>)CapturaAvanceBD.Instance.ObtenerObreros(lenguaje, 2, "Pintor"),
                            ListaShotblasteros = (List<PintorSpool>)CapturaAvanceBD.Instance.ObtenerObreros(lenguaje, 1, "ShotBlastero"),
                            ListaPintorGuargado = new List<PintorSpool>(),
                            ListaShotblasteroGuargado = new List<PintorSpool>(),
                            ListaPintorInicial = new List<PintorSpool>(),
                            ListaShotblasteroInicial = new List<PintorSpool>(),
                            plantillaPintor = "",
                            plantillaShotblastero = ""

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

        public object ObtenerLayoutProcesoPintura(int sistemaPinturaProyectoId, int procesoID,string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    List<Sam3_Pintura_AvanceCarro_Get_LayoutComponentes_Result> result = ctx.Sam3_Pintura_AvanceCarro_Get_LayoutComponentes(sistemaPinturaProyectoId, procesoID, lenguaje).ToList();
                    List<Componente> ListadoLayoutComponentes = new List<Componente>();

                    

                    foreach (Sam3_Pintura_AvanceCarro_Get_LayoutComponentes_Result item in result)
                    {
                        ListadoLayoutComponentes.Add(new Componente
                        {
                           NombreComponente=item.NombreComponente
                        });
                    }
                    return ListadoLayoutComponentes;
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