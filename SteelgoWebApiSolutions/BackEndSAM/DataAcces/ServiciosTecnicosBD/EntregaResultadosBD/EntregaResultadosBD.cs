using BackEndSAM.Models.ServiciosTecnicos.EntregaResultados;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace BackEndSAM.DataAcces.ServiciosTecnicosBD.EntregaResultadosBD
{
    public class EntregaResultadosBD
    {

        private static readonly object _mutex = new object();
        private static EntregaResultadosBD _instance;
        public static EntregaResultadosBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new EntregaResultadosBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerDetalleEntregaResultados(string lenguaje, string TipoPrueba)
        {
            try
            {


                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ServiciosTecnicos_Get_EntregaResultados_Result> result = ctx.Sam3_ServiciosTecnicos_Get_EntregaResultados(lenguaje).ToList();
                    List<EntregaResultados> ListadoEntregaResultados = new List<EntregaResultados>();

                    List<Sam3_ServiciosTecnicos_Get_CondicionesFisicas_Result> resultCondicionesFisicas = ctx.Sam3_ServiciosTecnicos_Get_CondicionesFisicas(lenguaje).ToList();
                    List<CondicionesFisicas> ListadoCondicionesFisicas = new List<CondicionesFisicas>();

                    List<Sam3_Steelgo_Get_Defectos_Result> resultDefault = ctx.Sam3_Steelgo_Get_Defectos(lenguaje, TipoPrueba).ToList();
                    List<Defectos> ListadoDefectos = new List<Defectos>();

                    foreach (Sam3_ServiciosTecnicos_Get_CondicionesFisicas_Result item in resultCondicionesFisicas)
                    {
                        ListadoCondicionesFisicas.Add(new CondicionesFisicas
                        {
                            CondicionesFisicasID = item.CondicionesFisicasID,
                            CondicionFisica = item.CondicionFisica
                        });
                    }

                    foreach (Sam3_Steelgo_Get_Defectos_Result item in resultDefault)
                    {
                        ListadoDefectos.Add(new Defectos
                        {
                            DefectoID = item.DefectoID,
                            Nombre = item.Nombre
                        });
                    }


                    foreach (Sam3_ServiciosTecnicos_Get_EntregaResultados_Result item in result)
                    {
                        ListadoEntregaResultados.Add(new EntregaResultados
                        {
                            Accion = item.EntregaResultadosID == null ? 1 : 2,
                            CONDICIONESFISICAS = item.CondicionFisica,
                            DESCRIPCION = item.DESCRIPCION,
                            FOLIO = item.FOLIO,
                            RECIBIDO = item.RECIBIDO.GetValueOrDefault(),
                            CONDICIONESFISICASID = item.CondicionesFisicasID.GetValueOrDefault(),
                            DEFECTOSID = item.CondicionesFisicasID == 1 ? 0 : item.DefectoID.GetValueOrDefault(),
                            DEFECTOS = item.CondicionesFisicasID == 1 ? null : item.DEFECTOS,
                            ListCondicionesFisicas = ListadoCondicionesFisicas,
                            ListDefectos = item.CondicionesFisicasID == 1 ? null : ListadoDefectos,
                            ListDefectosGeneral = ListadoDefectos,
                            EntregaResultadosID = item.EntregaResultadosID.GetValueOrDefault(),
                            RequisicionPruebaElementoID = item.RequisicionPruebaElementoID,
                            DatosJunta = Convert.ToInt32(item.JUNTA)
                        });
                    }
                    return ListadoEntregaResultados;
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

        public object InsertarCaptura(DataTable dtDetalleCaptura, Sam3_Usuario usuario, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = { { "@Usuario", usuario.UsuarioID.ToString() }, { "@Lenguaje", lenguaje } };
                    _SQL.Ejecuta(Stords.GUARDARCAPTURAENTREGARESULTADOS, dtDetalleCaptura, "@EntregaResultados", parametro);
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
    }
}