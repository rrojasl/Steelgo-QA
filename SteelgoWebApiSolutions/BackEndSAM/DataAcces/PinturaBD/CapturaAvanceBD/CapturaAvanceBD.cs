using BackEndSAM.Models.Pintura.MedioTransporte;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using BackEndSAM.Models.Pintura.CapturaAvance;

namespace BackEndSAM.DataAcces.PinturaBD.CapturaAvanceBD
{
    public class CapturaAvanceBD
    {

        private static readonly object _mutex = new object();
        private static CapturaAvanceBD _instance;

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

        public object ObtenerMedioTransporteCargado(string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    List<Sam3_Pintura_Get_MedioTransporteCargado_Result> result = ctx.Sam3_Pintura_Get_MedioTransporteCargado(lenguaje).ToList();
                    List<MedioTransporte> ListadoMedioTransporte = new List<MedioTransporte>();

                    foreach (Sam3_Pintura_Get_MedioTransporteCargado_Result item in result)
                    {
                        ListadoMedioTransporte.Add(new MedioTransporte
                        {
                            MedioTransporteCargaID = item.MedioTransporteID.GetValueOrDefault(),
                            NombreMedioTransporte = item.NombreMedioTransporte
                        });

                    }
                    return ListadoMedioTransporte;
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

        public object ObtenerListaMedioTransporteCargado(int medioTransporteCargaID, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    RetornaDetalles detalles = new RetornaDetalles();
                    int sPinturaID = 0;
                    List<Sam3_Pintura_Get_DetalleCarrosCargados_Result> result = ctx.Sam3_Pintura_Get_DetalleCarrosCargados(medioTransporteCargaID).ToList();
                    List<CapturaAvance> ListadoMedioTransporte = new List<CapturaAvance>();

                    foreach (Sam3_Pintura_Get_DetalleCarrosCargados_Result item in result)
                    {
                        ListadoMedioTransporte.Add(new CapturaAvance
                        {
                            Accion = 2,
                            MedioTransporteCargaID = item.MedioTransporteCargaID,
                            MedioTransporteID = item.MedioTransporteID.GetValueOrDefault(),
                            Metros2 = item.Area.GetValueOrDefault(),
                            Color = item.ColorPintura,
                            OrdenImportancia = item.OrdenImportancia.GetValueOrDefault(),
                            Peso = item.Peso.GetValueOrDefault(),
                            pintorID = item.PintorID,
                            ShotblasteroID = item.ShotblasteroID,
                            pintor = item.Pintor,
                            Shotblastero = item.Shotblastero,
                            SistemaPintura = item.SistemaPintura,
                            SistemaPinturaID = item.SistemaPinturaID,
                            SpoolID = item.SpoolID,
                            Spool = item.SpoolJunta,
                            ListaPintores = (List<Pintor>)CapturaAvanceBD.Instance.ObtenerObreros(lenguaje, 2, "Pintor"),
                            ListaShotblasteros = (List<Pintor>)CapturaAvanceBD.Instance.ObtenerObreros(lenguaje, 2, "ShotBlastero")
                        });
                        sPinturaID = item.SistemaPinturaID;
                    }
                    detalles.listaCapturaAvance = ListadoMedioTransporte;
                    List<Sam3_Pintura_Get_ComponenteSistemaPintura_Result> result2 = ctx.Sam3_Pintura_Get_ComponenteSistemaPintura(sPinturaID).ToList();
                    List<ComponenteDetalle> listaComponentes = new List<ComponenteDetalle>();

                    foreach(Sam3_Pintura_Get_ComponenteSistemaPintura_Result item in result2)
                    {
                        listaComponentes.Add(new ComponenteDetalle
                        {
                            Componente = item.Componente,
                            ComponenteID = item.ComponenteID
                        });
                    }
                    detalles.listaComponenteDetalle = listaComponentes;
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

        public object ObtenerSpoolNuevo(int OrdenTrabajoSpoolID, string lenguaje, int shotblasteroID, string shotblastero, int pintorID, string pintor)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    
                    List<Sam3_Pintura_Get_DetalleSpoolAgregar_Result> result = ctx.Sam3_Pintura_Get_DetalleSpoolAgregar(OrdenTrabajoSpoolID).ToList();
                    List<CapturaAvance> ListadoMedioTransporte = new List<CapturaAvance>();

                    foreach (Sam3_Pintura_Get_DetalleSpoolAgregar_Result item in result)
                    {
                        ListadoMedioTransporte.Add(new CapturaAvance
                        {
                            Accion = 1,
                            MedioTransporteCargaID = 0,
                            MedioTransporteID = 0,
                            Metros2 = item.Area.GetValueOrDefault(),
                            Color = item.ColorPintura,
                            OrdenImportancia = item.OrdenImportancia.GetValueOrDefault(),
                            Peso = item.Peso.GetValueOrDefault(),
                            pintorID = pintorID,
                            ShotblasteroID = shotblasteroID,
                            pintor = pintor,
                            Shotblastero = shotblastero,
                            SistemaPintura = item.SistemaPintura,
                            SistemaPinturaID = item.SistemaPinturaID,
                            SpoolID = item.SpoolID,
                            Spool = item.SpoolJunta,
                            ListaPintores = (List<Pintor>)CapturaAvanceBD.Instance.ObtenerObreros(lenguaje, 2, "Pintor"),
                            ListaShotblasteros = (List<Pintor>)CapturaAvanceBD.Instance.ObtenerObreros(lenguaje, 2, "ShotBlastero")
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

                    List<Sam3_Steelgo_Get_Obrero_Result> result = ctx.Sam3_Steelgo_Get_Obrero(tipo,tipoObrero,null,null).ToList();
                    List<Pintor> ListadoPintores = new List<Pintor>();

                    foreach (Sam3_Steelgo_Get_Obrero_Result item in result)
                    {
                        ListadoPintores.Add(new Pintor
                        {
                            Codigo = item.Codigo,
                            ObreroID = item.ObreroID,
                            TipoObrero = item.TipoObrero
                        });
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
    }
}