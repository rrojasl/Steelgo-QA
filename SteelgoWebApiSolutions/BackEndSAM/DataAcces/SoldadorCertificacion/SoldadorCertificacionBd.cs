using DatabaseManager.Sam3;
using BackEndSAM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SecurityManager.Api.Models;
using System.Data.Entity.Core.Objects;
using BackEndSAM.Models.SoldadorCertificacion;

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
                List<SoldadorCertificacion> data = (from SC in ctx.Sam3_Soldadura_SoldadorCertificacion(TipoDato, null, null, null, null, null, null, null, null, null, null, Lenguaje, null)
                                                    select new SoldadorCertificacion
                                                    {
                                                        SoldadorCertificacionID = SC.SoldadorCertificacionID,
                                                        ObreroID = SC.OBREROID,
                                                        CodigoObrero = SC.CodigoObrero,
                                                        PQRID = SC.PQRID,
                                                        NombrePQR = SC.NombrePQR,
                                                        FechaInicioCertificado = SC.FechaInicioCertificado,
                                                        FechaFinCertificado = SC.FechaFinCertificado,
                                                        EspesorMinimo = Convert.ToInt32(SC.EspesorMinimo),
                                                        EspesorMaximo = Convert.ToInt32(SC.EspesorMaximo),
                                                        PorcentajeJuntasRequiere = Convert.ToInt32(SC.PorcentajeJuntasRequiere),
                                                        CertificadoActivo = Convert.ToString(SC.CertificadoActivo)
                                                    }).AsParallel().ToList();
                return data;


            }

        }


        public object EliminaSoldadorCertificacion(int TipoDeDato, int SoldadorCertificacionID, int IdUsuario)
        {


            using (SamContext ctx = new SamContext())
            {

                var lista = ctx.Sam3_Soldadura_SoldadorCertificacion(TipoDeDato, SoldadorCertificacionID, null, null, null, null, null, null, null, null, null, null, IdUsuario);
                return lista;

            }





        }





        public object ActualizaSoldadorCertificacion(SoldadorCertificacion SC, string Lenguaje, Sam3_Usuario usuario)
        {

            try
            {
                using (SamContext ctx = new SamContext())
                {
                    
                    ctx.Sam3_Soldadura_SoldadorCertificacion(3, SC.SoldadorCertificacionID, SC.ObreroID, SC.PQRID, SC.FechaInicioCertificado.Trim(), SC.FechaFinCertificado.Trim(), SC.EspesorMinimo, SC.EspesorMaximo, SC.PorcentajeJuntasRequiere, Convert.ToBoolean(SC.CertificadoActivo), SC.UsuarioModificacion, Lenguaje,  usuario.UsuarioID);
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



        public object AgregarSoldadorCertificacion(SoldadorCertificacion SC, string Lenguaje, Sam3_Usuario usuario)
        {

            try
            {
                using (SamContext ctx = new SamContext())
                {

                    ctx.Sam3_Soldadura_SoldadorCertificacion(2, null, SC.ObreroID, SC.PQRID, SC.FechaInicioCertificado.Trim(), SC.FechaFinCertificado.Trim(), SC.EspesorMinimo, SC.EspesorMaximo, SC.PorcentajeJuntasRequiere, Convert.ToBoolean(SC.CertificadoActivo), SC.UsuarioModificacion, Lenguaje, usuario.UsuarioID);
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

    }
}