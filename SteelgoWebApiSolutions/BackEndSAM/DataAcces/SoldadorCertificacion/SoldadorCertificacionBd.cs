using DatabaseManager.Sam3;
using BackEndSAM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SecurityManager.Api.Models;
using System.Data.Entity.Core.Objects;
using BackEndSAM.Models.SoldadorCertificacion;
using SecurityManager.TokenHandler;

namespace BackEndSAM.DataAcces
{
    public class SoldadorCertificacionBd
    {
        private static readonly object _mutex = new object();
        private static SoldadorCertificacionBd _instance;


        public static SoldadorCertificacionBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new SoldadorCertificacionBd();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerSoldadorCertificacion(int TipoDato, string Lenguaje)
        {

            using (SamContext ctx = new SamContext())
            {
                List<SoldadorCertificacion> data = (from SC in ctx.Sam3_Soldadura_SoldadorCertificacion(TipoDato, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, Lenguaje, null, null)
                                                    select new SoldadorCertificacion
                                                    {
                                                        SoldadorCertificacionID = SC.SoldadorCertificacionID,
                                                        ObreroID = SC.OBREROID,
                                                        CodigoObrero = SC.CodigoObrero,
                                                        PQRID = SC.PQRID,
                                                        NombrePQR = SC.NombrePQR,
                                                        ProcesoSoldaduraID = Convert.ToInt32(SC.ProcesoSoldaduraID),
                                                        ProcesoSoldadura = SC.ProcesoSoldadura,
                                                        TipoDePruebaID = Convert.ToInt32(SC.TipoDePruebaID),
                                                        TipoDePrueba = SC.TipoPrueba,
                                                        PosicionID = Convert.ToInt32(SC.PosicionID),
                                                        Posicion = Convert.ToInt32(SC.Posicion),
                                                        FechaInicioCertificado = SC.FechaInicioCertificado,
                                                        FechaFinCertificado = SC.FechaFinCertificado,
                                                        CedulaTuboCalificado = SC.CedulaTuboCalificado,
                                                        DiametroCalificado = Convert.ToString(SC.DiametroCalificado),
                                                        EspesorMinimo = Convert.ToString(SC.EspesorMinimo),
                                                        EspesorMaximo = Convert.ToString(SC.EspesorMaximo),
                                                        PorcentajeJuntasRequiere = Convert.ToInt32(SC.PorcentajeJuntasRequiere),
                                                        CertificadoActivo = Convert.ToString(SC.CertificadoActivo),
                                                        PasosSoldadura = Convert.ToString(SC.PasosSoldadura),
                                                       

                                                    }).AsParallel().ToList();
                return data;


            }

        }

        public object EliminaSoldadorCertificacion(int TipoDeDato, int SoldadorCertificacionID, int IdUsuario)
        {


            using (SamContext ctx = new SamContext())
            {

                var lista = ctx.Sam3_Soldadura_SoldadorCertificacion(TipoDeDato, SoldadorCertificacionID, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, IdUsuario);
                return lista;

            }





        }

        public object ActualizaSoldadorCertificacion(SoldadorCertificacion SC, string Lenguaje, int PasosSoldadura,  Sam3_Usuario usuario)
        {

            try
            {
                using (SamContext ctx = new SamContext())
                {

                    ctx.Sam3_Soldadura_SoldadorCertificacion(3, SC.SoldadorCertificacionID, SC.ObreroID, SC.PQRID, SC.ProcesoSoldaduraID, SC.TipoDePruebaID, SC.PosicionID, SC.FechaInicioCertificado.Trim(), SC.FechaFinCertificado.Trim(), SC.CedulaTuboCalificado, Convert.ToDecimal(SC.DiametroCalificado), Convert.ToDecimal(SC.EspesorMinimo), Convert.ToDecimal(SC.EspesorMaximo), SC.PorcentajeJuntasRequiere, Convert.ToBoolean(SC.CertificadoActivo),  SC.UsuarioModificacion, Lenguaje, PasosSoldadura, usuario.UsuarioID);
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

                TransactionalInformation lista = new TransactionalInformation();
                lista.ReturnMessage.Add(ex.Message);
                lista.ReturnCode = 500;
                lista.ReturnStatus = false;
                lista.IsAuthenicated = true;

                return lista;
            }

        }

        public object AgregarSoldadorCertificacion(SoldadorCertificacion SC, string Lenguaje, int PasosSoldadura, Sam3_Usuario usuario)
        {

            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ctx.Sam3_Soldadura_SoldadorCertificacion(2, null, SC.ObreroID, SC.PQRID, SC.ProcesoSoldaduraID, SC.TipoDePruebaID, SC.PosicionID, SC.FechaInicioCertificado.Trim(), SC.FechaFinCertificado.Trim(), SC.CedulaTuboCalificado, Convert.ToDecimal(SC.DiametroCalificado), Convert.ToDecimal(SC.EspesorMinimo), Convert.ToDecimal(SC.EspesorMaximo), SC.PorcentajeJuntasRequiere, Convert.ToBoolean(SC.CertificadoActivo), PasosSoldadura,  Lenguaje, PasosSoldadura, usuario.UsuarioID);
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

                TransactionalInformation lista = new TransactionalInformation();
                lista.ReturnMessage.Add(ex.Message);
                lista.ReturnCode = 500;
                lista.ReturnStatus = false;
                lista.IsAuthenicated = true;

                return lista;
            }




        }

        public object ObtenerTipoPruebas(int TipoDato)
        {

            using (SamContext ctx = new SamContext())
            {

                List<SoldadorCertificacion> data = (from SC in ctx.Sam3_Soldadura_TipoPruebas(TipoDato)
                                                    select new SoldadorCertificacion
                                                    {
                                                        TipoDePruebaID = SC.TipoPruebaID,
                                                        TipoDePrueba = SC.TipoPrueba
                                                    }).AsParallel().ToList();
                return data;
            }




        }

        public object ObtenerPosicion(int TipoDeDato)
        {

            using (SamContext ctx = new SamContext())
            {

                List<SoldadorCertificacion> data = (from SC in ctx.Sam3_Soldadura_CertificacionPosicion(TipoDeDato)
                                                    select new SoldadorCertificacion
                                                    {
                                                        PosicionID = SC.PosicionID,
                                                        Posicion = Convert.ToInt32(SC.Posicion)
               
                                                    }).AsParallel().ToList();
                return data;
            }




        }


    }
}