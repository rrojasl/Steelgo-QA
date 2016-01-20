using BackEndSAM.DataAcces;
using BackEndSAM.DataAcces.ArmadoBD;
using BackEndSAM.DataAcces.InspeccionDimensionalBD;
using BackEndSAM.Models.Inspeccion;
using BackEndSAM.Models.InspeccionDimensional;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System.Collections.Generic;
using System.Data;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;

namespace BackEndSAM.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class InspeccionDimensionalController : ApiController
    {
        public object Get(string JsonCaptura, string token, string Lenguaje)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                InspeccionDimensional.DetalleDatosJson capturaDatosJson = serializer.Deserialize<InspeccionDimensional.DetalleDatosJson>(JsonCaptura);

                List<InspeccionDimensional.DetalleDatosJson> listaDetalleDatos = new List<InspeccionDimensional.DetalleDatosJson>();

                List<Sam3_Inspeccion_Get_DetalleDimensional_Result> listaObtenerDetalleDimensional = (List<Sam3_Inspeccion_Get_DetalleDimensional_Result>)CapturasRapidasBd.Instance.ObtenerDetalleDimensional(int.Parse(capturaDatosJson.OrdenTrabajoSpoolID), Lenguaje);


                string fecha = (string)CapturaArmadoBD.Instance.ObtenerValorFecha(usuario, Lenguaje, 16);


                if (listaObtenerDetalleDimensional.Count == 0)
                {
                    InspeccionDimensional.DetalleDatosJson detalleDatos = new InspeccionDimensional.DetalleDatosJson
                    {
                        Accion = 1,
                        InspeccionDimensionalID = 0,
                        ProyectoID = capturaDatosJson.ProyectoID,
                        OrdenTrabajoSpoolID = capturaDatosJson.OrdenTrabajoSpoolID,
                        OrdenTrabajoSpool = capturaDatosJson.OrdenTrabajoSpool,
                        FechaInspeccion = capturaDatosJson.FechaInspeccion,
                        DefectosID = capturaDatosJson.DefectosID,
                        Defectos = capturaDatosJson.Defectos,
                        ListaDefectos = ObtenerListaDefectos((List<Sam3_Steelgo_Get_Defectos_Result>)DefectosBd.Instance.listadoDefectos(Lenguaje, "Inspección dimensional")),
                        InspectorID = capturaDatosJson.InspectorID,
                        Inspector = capturaDatosJson.Inspector,
                        ListaInspector = ObtenerListaInspector((List<Sam3_Steelgo_Get_Obrero_Result>)ObreroBD.Instance.ObtenerObrero(capturaDatosJson.ProyectoID, 2, "Inspector Visual Dimensional")),
                        ResultadoID = capturaDatosJson.ResultadoID,
                        Resultado = capturaDatosJson.Resultado,
                        ListaResultados = ObtenerListaResultado((List<Sam3_Steelgo_Get_TipoResultado_Result>)TipoResultadoBd.Instance.ObtenerListadoResultados(Lenguaje)),
                    };
                    listaDetalleDatos.Add(detalleDatos);
                }
                else
                {
                    foreach (Sam3_Inspeccion_Get_DetalleDimensional_Result item in listaObtenerDetalleDimensional)
                    {
                        InspeccionDimensional.DetalleDatosJson detalleDatos = new InspeccionDimensional.DetalleDatosJson
                        {
                           
                            Accion = 2,
                            InspeccionDimensionalID = item.InspeccionDimensionalID,
                            ProyectoID = capturaDatosJson.ProyectoID,
                            OrdenTrabajoSpoolID = capturaDatosJson.OrdenTrabajoSpoolID,
                            OrdenTrabajoSpool = capturaDatosJson.OrdenTrabajoSpool,
                            FechaInspeccion = item.FechaInspeccion == null ? fecha : item.FechaInspeccion.ToString(),
                            DefectosID = item.DefectoID.GetValueOrDefault().ToString(),
                            Defectos = item.Defecto,
                            ListaDefectos = ObtenerListaDefectos((List<Sam3_Steelgo_Get_Defectos_Result>)DefectosBd.Instance.listadoDefectos(Lenguaje, "Inspección dimensional")),
                            InspectorID = item.ObreroID.ToString(),
                            Inspector = item.Inspector,
                            ListaInspector = ObtenerListaInspector((List<Sam3_Steelgo_Get_Obrero_Result>)ObreroBD.Instance.ObtenerObrero(capturaDatosJson.ProyectoID, 2, "Inspector Visual Dimensional")),
                            ResultadoID = item.ResultadoID.ToString(),
                            Resultado = item.Resultado,
                            ListaResultados = ObtenerListaResultado((List<Sam3_Steelgo_Get_TipoResultado_Result>)TipoResultadoBd.Instance.ObtenerListadoResultados(Lenguaje)),
                        };
                        listaDetalleDatos.Add(detalleDatos);
                    }
                }

                return serializer.Serialize(listaDetalleDatos);

            }
            else
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(payload);
                result.ReturnCode = 401;
                result.ReturnStatus = false;
                result.IsAuthenicated = false;
                return result;
            }
        }

        private List<Defectos> ObtenerListaDefectos(List<Sam3_Steelgo_Get_Defectos_Result> listaDefecto)
        {
            List<Defectos> listaDefectos = new List<Defectos>();
            foreach (Sam3_Steelgo_Get_Defectos_Result item in listaDefecto)
            {
                Defectos Defecto = new Defectos
                {
                    DefectoID = item.DefectoID,
                    Nombre = item.Nombre
                };
                listaDefectos.Add(Defecto);
            }
            return listaDefectos;
        }
        private List<Resultado> ObtenerListaResultado(List<Sam3_Steelgo_Get_TipoResultado_Result> listaResultado)
        {
            List<Resultado> listaResultados = new List<Resultado>();
            foreach (Sam3_Steelgo_Get_TipoResultado_Result item in listaResultado)
            {
                Resultado resultado = new Resultado
                {
                    _Resultado = item.Resultado,
                    _ResultadoID = item.TipoResultadoID.ToString()
                };
                listaResultados.Add(resultado);
            }
            return listaResultados;
        }

        private List<Inspector> ObtenerListaInspector(List<Sam3_Steelgo_Get_Obrero_Result> listaInspector)
        {
            List<Inspector> listaInspectors = new List<Inspector>();
            foreach (Sam3_Steelgo_Get_Obrero_Result item in listaInspector)
            {
                Inspector tubero = new Inspector
                {
                    ObreroID = item.ObreroID,
                    Codigo = item.Codigo
                };
                listaInspectors.Add(tubero);
            }
            return listaInspectors;
        }

        public object Post(InspeccionDimensional.Captura listaCaptura, string token, string lenguaje)
        {
            string payload = "";
            string newToken = "";

            JavaScriptSerializer serializer = new JavaScriptSerializer();

            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                DataTable dtDetalleCaptura = ArmadoController.ToDataTable(listaCaptura.Detalles);
                
                return InspeccionDimensionalBD.Instance.InsertarCapturaInspeccion(dtDetalleCaptura, usuario, lenguaje);
            }
            else
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(payload);
                result.ReturnCode = 401;
                result.ReturnStatus = false;
                result.IsAuthenicated = false;
                return result;
            }
        }
    }
}
