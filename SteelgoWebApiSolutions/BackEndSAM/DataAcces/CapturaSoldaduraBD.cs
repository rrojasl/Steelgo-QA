using BackEndSAM.Models;
using BackEndSAM.Models.Soldadura;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces
{
    public class CapturaSoldaduraBD
    {

        private static readonly object _mutex = new object();
        private static CapturaSoldaduraBD _instance;

        public static CapturaSoldaduraBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new CapturaSoldaduraBD();
                    }
                }
                return _instance;
            }
        }


        public object ObtenerTrabajosAdicionales(int juntaSpoolID)
        {
            try
            {
                List<TrabajosAdicionales> listaTrabajosAdicionalesSoldadura = new List<TrabajosAdicionales>();

                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Soldadura_Get_DetalleTrabajoAdicional_Result > result = ctx.Sam3_Soldadura_Get_DetalleTrabajoAdicional(juntaSpoolID).ToList();

                    foreach (Sam3_Soldadura_Get_DetalleTrabajoAdicional_Result item in result)
                    {
                        listaTrabajosAdicionalesSoldadura.Add(new TrabajosAdicionales
                        {
                             TipoTrabajoAdicionalID= item.TrabajoAdicionalID,
                              NombreCorto = item.TrabajoAdicional,
                        });
                    }

                    return listaTrabajosAdicionalesSoldadura;
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

        public object ObtenerListadoRaiz(int procesoSoldaduraID)
        {
            try
            {
                List<Raiz> listaTrabajosAdicionalesSoldadura = new List<Raiz>();

                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Steelgo_Get_SoldadorCertificado_Result> result = ctx.Sam3_Steelgo_Get_SoldadorCertificado(procesoSoldaduraID).ToList();

                    foreach (Sam3_Steelgo_Get_SoldadorCertificado_Result item in result)
                    {
                        listaTrabajosAdicionalesSoldadura.Add(new Raiz
                        {
                            ObreroID  = item.ObreroID,
                            Soldador = item.Codigo,
                        });
                    }

                    return listaTrabajosAdicionalesSoldadura;
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

        public object ObtenerListadoRelleno(int procesoSoldaduraID)
        {
            try
            {
                List<Relleno> listaTrabajosAdicionalesSoldadura = new List<Relleno>();

                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Steelgo_Get_SoldadorCertificado_Result> result = ctx.Sam3_Steelgo_Get_SoldadorCertificado(procesoSoldaduraID).ToList();

                    foreach (Sam3_Steelgo_Get_SoldadorCertificado_Result item in result)
                    {
                        listaTrabajosAdicionalesSoldadura.Add(new Relleno
                        {
                            ObreroID = item.ObreroID,
                            Soldador = item.Codigo,
                        });
                    }

                    return listaTrabajosAdicionalesSoldadura;
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

        public object MostrarCapturaSoldadura(int avisoLlegadaID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("Ok");
                    result.ReturnCode = 200;
                    result.ReturnStatus = false;
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

        public object AgregarDetalleCapturaSoldadura(Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    return new object();

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

        public object ObtenerIDOrdenTrabajo(Sam3_Usuario usuario, string ordentrabajo, int tipo)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Steelgo_Get_SpoolID_Result> lista = ctx.Sam3_Steelgo_Get_SpoolID(tipo, ordentrabajo).ToList();// Sam3_Steelgo_Get_SpoolID(tipo, ordentrabajo).ToList();
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

        public object ObtenerValorFecha(Sam3_Usuario usuario, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    var oMyString = new ObjectParameter("Retorna", typeof(string));
                    var result = ctx.Sam3_Steelgo_Get_CampoPredeterminado(4, lenguaje, oMyString);
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

        public object DetallaSoldaduraAdicional(DetalleDatosJsonSoldadura JsonCaptura, Sam3_Usuario usuario)
        {

            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Soldadura_Get_DetalleTrabajoAdicional_Result> listaDetallaTrabajoAdicionalJson = ctx.Sam3_Soldadura_Get_DetalleTrabajoAdicional(int.Parse(JsonCaptura.JuntaID)).ToList();
                    return listaDetallaTrabajoAdicionalJson;
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

        public object ObtenerDetalleSoldadura(DetalleDatosJsonSoldadura JsonCaptura, Sam3_Usuario usuario)
        {

            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Soldadura_Get_DetalleJunta_Result> listaDetalleDatosJson = ctx.Sam3_Soldadura_Get_DetalleJunta(int.Parse(JsonCaptura.JuntaID)).ToList();
                    return listaDetalleDatosJson;
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

        public object ObtenerJuntasXSpoolID(Sam3_Usuario usuario, string ordenTrabajo, string id, int sinCaptura)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Steelgo_Get_JuntaSpool_Result> lista = ctx.Sam3_Steelgo_Get_JuntaSpool(sinCaptura, int.Parse(id)).ToList();
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

        public object ObtenerTrabajosXProyecto(Sam3_Usuario usuario, int idProyecto)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Soldadura_Get_DetalleTrabajoAdicional_Result> lista = ctx.Sam3_Soldadura_Get_DetalleTrabajoAdicional(idProyecto).ToList();
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

        public object ObtenerTallerXPoryecto(Sam3_Usuario usuario, int idProyecto)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_SteelGo_Get_Taller_Result> lista = ctx.Sam3_SteelGo_Get_Taller(idProyecto).ToList();
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

        public object listaTrabajosAdicionalesXJunta(Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Steelgo_Get_TrabajoAdicional_Result> lista = ctx.Sam3_Steelgo_Get_TrabajoAdicional("Soldadura").ToList();
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
    }
}