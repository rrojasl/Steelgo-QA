using BackEndSAM.Models;
using BackEndSAM.Models.Soldadura;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data;
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
                List<TrabajosAdicionalesSoldadura> listaTrabajosAdicionalesSoldadura = new List<TrabajosAdicionalesSoldadura>();

                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Steelgo_Get_TrabajoAdicional_Result> result = ctx.Sam3_Steelgo_Get_TrabajoAdicional("Soldadura").ToList();

                    foreach (Sam3_Steelgo_Get_TrabajoAdicional_Result item in result)
                    {
                        listaTrabajosAdicionalesSoldadura.Add(new TrabajosAdicionalesSoldadura
                        {
                            TrabajoAdicionalID = item.TrabajoAdicionalID,
                            TrabajoAdicional = item.NombreCorto,
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

        public object ObtenerProcesosSoldadura()
        {
            try
            {
                List<ProcesoSoldadura> listaProcesosSoldadura = new List<ProcesoSoldadura>();

                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Cat_PQR_ProcesoSoldadura_Result> result = ctx.Sam3_Cat_PQR_ProcesoSoldadura(1).ToList();

                    foreach (Sam3_Cat_PQR_ProcesoSoldadura_Result item in result)
                    {
                        listaProcesosSoldadura.Add(new ProcesoSoldadura
                        {
                            ProcesoSoldaduraID = item.ProcesoSoldaduraID,
                            Codigo = item.Codigo,
                        });
                    }

                    return listaProcesosSoldadura;
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
                List<SoldadorRaizCertificado> listaTrabajosAdicionalesSoldadura = new List<SoldadorRaizCertificado>();

                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Soldadura_SoldadorCertificacion_Result> result = ctx.Sam3_Soldadura_SoldadorCertificacion(1, null, null, null, null, null, null, null, null, null, null, null, null).ToList();

                    foreach (Sam3_Soldadura_SoldadorCertificacion_Result item in result)
                    {
                        listaTrabajosAdicionalesSoldadura.Add(new SoldadorRaizCertificado
                        {
                            ObreroID = item.OBREROID,
                            Soldador = item.CodigoObrero,
                            PQRID = item.PQRID
                        });
                    }
                    if (listaTrabajosAdicionalesSoldadura.Count == 0)
                    {
                        List<Sam3_Steelgo_Get_Obrero_Result> listresult = ctx.Sam3_Steelgo_Get_Obrero(2, "Soldador", null).ToList();

                        foreach (Sam3_Steelgo_Get_Obrero_Result item in listresult)
                        {
                            listaTrabajosAdicionalesSoldadura.Add(new SoldadorRaizCertificado
                            {
                                ObreroID = item.ObreroID,
                                Soldador = item.Codigo,
                            });
                        }
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

                    if (listaTrabajosAdicionalesSoldadura.Count == 0)
                    {
                        List<Sam3_Steelgo_Get_Obrero_Result> listresult = ctx.Sam3_Steelgo_Get_Obrero(2, "Soldador", null).ToList();
                        foreach (Sam3_Steelgo_Get_Obrero_Result item in listresult)
                        {
                            listaTrabajosAdicionalesSoldadura.Add(new Relleno
                            {
                                ObreroID = item.ObreroID,
                                Soldador = item.Codigo,
                            });
                        }
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
        public object ObtenerListadoSoldaduresTrabajo()
        {
            try
            {
                List<ObreroSoldador> listaTrabajosAdicionalesSoldadura = new List<ObreroSoldador>();

                using (SamContext ctx = new SamContext())
                {

                    List<Sam3_Steelgo_Get_Obrero_Result> listresult = ctx.Sam3_Steelgo_Get_Obrero(2, "Soldador", null).ToList();
                    foreach (Sam3_Steelgo_Get_Obrero_Result item in listresult)
                    {
                        listaTrabajosAdicionalesSoldadura.Add(new ObreroSoldador
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

        public object ObtenerValorFecha(Sam3_Usuario usuario, string lenguaje, int idCampoPredeterminado)
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

        public object DetallaSoldaduraAdicional(int JuntaSoldaduraID, Sam3_Usuario usuario)
        {

            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Soldadura_Get_DetalleTrabajoAdicional_Result> listaDetallaTrabajoAdicionalJson = ctx.Sam3_Soldadura_Get_DetalleTrabajoAdicional(JuntaSoldaduraID).ToList();
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
        public object DetallaRaizAdicional(int juntaSpoolID, Sam3_Usuario usuario)
        {

            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Soldadura_Get_DetalleSoldadorProceso_Result> listaDetallaTrabajoAdicionalJson = ctx.Sam3_Soldadura_Get_DetalleSoldadorProceso(juntaSpoolID, "Raíz").ToList();
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

        public object DetallaRellenoAdicional(int juntaSpoolID, Sam3_Usuario usuario)
        {

            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Soldadura_Get_DetalleSoldadorProceso_Result> listaDetallaTrabajoAdicionalJson = ctx.Sam3_Soldadura_Get_DetalleSoldadorProceso(juntaSpoolID, "Raíz").ToList();
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


        public object ObtenerDetalleSoldadura(DetalleDatosJsonSoldadura JsonCaptura, Sam3_Usuario usuario, string lenguaje)
        {

            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Soldadura_Get_DetalleJunta_Result> listaDetalleDatosJson = ctx.Sam3_Soldadura_Get_DetalleJunta(int.Parse(JsonCaptura.JuntaID), lenguaje).ToList();
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



        public object InsertarCapturaSoldadura(DataTable dtDetalleCaptura, DataTable dtTrabajosAdicionales, DataTable dtSoldaduraSoldado, Sam3_Usuario usuario, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    //ctx.Sam3_Armado_JuntaArmado()
                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = { { "@Usuario", usuario.UsuarioID.ToString() }, { "@Lenguaje", lenguaje } };
                    DataTable dtspooleado = _SQL.Tabla(Stords.GUARDARCAPTURASOLDADURA, dtDetalleCaptura, "@Soldadura", dtSoldaduraSoldado, "@SoldaduraSoldador", dtTrabajosAdicionales, "@TrabajosAdicionales", parametro);

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("Ok");
                    result.ReturnMessage.Add("xd");
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
    }
}