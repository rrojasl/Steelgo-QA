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

        [HttpGet]
        public object ObtieneCamposPredeterminados(string token, string lenguaje)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);


                InspeccionDimensional.CamposPred CamposPredeterminados = new InspeccionDimensional.CamposPred();

                CamposPredeterminados = new InspeccionDimensional.CamposPred
                {
                    Fecha = (string)CapturaArmadoBD.Instance.ObtenerValorFecha(usuario, lenguaje, 24),
                    Resultado = (string)CapturaArmadoBD.Instance.ObtenerValorFecha(usuario, lenguaje, 25),
                    Llena = (string)CapturaArmadoBD.Instance.ObtenerValorFecha(usuario, lenguaje, 26),
                };

                return CamposPredeterminados;
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

                List<Sam3_Inspeccion_Get_DetalleJunta_Result> listaJuntasPorOrdenTrabajo = (List<Sam3_Inspeccion_Get_DetalleJunta_Result>)InspeccionBD.Instance.ObtenerDetalleJunta(capturaDatosJson.OrdenTrabajoSpoolID, usuario, Lenguaje);

                List<InspeccionDimensional.JuntaXSpool> listJuntaXSpool = new List<InspeccionDimensional.JuntaXSpool>();

                foreach (Sam3_Inspeccion_Get_DetalleJunta_Result item in listaJuntasPorOrdenTrabajo)
                {
                    listJuntaXSpool.Add(new InspeccionDimensional.JuntaXSpool
                    {
                        Accion = 1,//por estar solo en la lista habilitado para seleccionar.
                        Junta = item.Etiqueta,
                        JuntaID = item.JuntaSpoolID
                    });
                }

               


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
                        FechaInspeccion = null,
                        DefectosID = "",
                        Defectos = "",
                        ListaDefectos = ObtenerListaDefectos((List<Sam3_Steelgo_Get_Defectos_Result>)DefectosBd.Instance.listadoDefectos(Lenguaje, "Inspección dimensional")),
                        InspectorID = "",
                        Inspector = "",
                        ListaInspector = ObtenerListaInspector((List<Sam3_Steelgo_Get_Obrero_Result>)ObreroBD.Instance.ObtenerObrero(capturaDatosJson.ProyectoID, 2, "Inspector Visual Dimensional")),
                        ResultadoID = "",
                        Resultado = "",
                        ListaResultados = ObtenerListaResultado((List<Sam3_Steelgo_Get_TipoResultado_Result>)TipoResultadoBd.Instance.ObtenerListadoResultados(Lenguaje)),
                        ListaJuntas = listJuntaXSpool,
                        TemplateRender = " "
                    };
                    listaDetalleDatos.Add(detalleDatos);
                }
                else
                {
                    foreach (Sam3_Inspeccion_Get_DetalleDimensional_Result item in listaObtenerDetalleDimensional)
                    {
                        List<int?> ListaJutasSeleccionadasXSpoolID = (List<int?>)InspeccionBD.Instance.ObtenerDetalleJuntaSeleccionada(capturaDatosJson.OrdenTrabajoSpoolID,item.DefectoID.GetValueOrDefault(), usuario, Lenguaje);

                        InspeccionDimensional.DetalleDatosJson detalleDatos = new InspeccionDimensional.DetalleDatosJson
                        {
                            
                            Accion = 2,
                            InspeccionDimensionalID = item.InspeccionDimensionalID,
                            ProyectoID = capturaDatosJson.ProyectoID,
                            OrdenTrabajoSpoolID = capturaDatosJson.OrdenTrabajoSpoolID,
                            OrdenTrabajoSpool = capturaDatosJson.OrdenTrabajoSpool,
                            FechaInspeccion = item.FechaInspeccion,
                            DefectosID = item.DefectoID.GetValueOrDefault().ToString(),
                            Defectos = item.Defecto,
                            ListaDefectos = ObtenerListaDefectos((List<Sam3_Steelgo_Get_Defectos_Result>)DefectosBd.Instance.listadoDefectos(Lenguaje, "Inspección dimensional")),
                            InspectorID = item.ObreroID.ToString(),
                            Inspector = item.Inspector,
                            ListaInspector = ObtenerListaInspector((List<Sam3_Steelgo_Get_Obrero_Result>)ObreroBD.Instance.ObtenerObrero(capturaDatosJson.ProyectoID, 2, "Inspector Visual Dimensional")),
                            ResultadoID = item.ResultadoID.ToString(),
                            Resultado = item.Resultado,
                            ListaResultados = ObtenerListaResultado((List<Sam3_Steelgo_Get_TipoResultado_Result>)TipoResultadoBd.Instance.ObtenerListadoResultados(Lenguaje)),
                            ListaJuntas = listJuntaXSpool,
                            IDDEFECTOTIPO= item.IdDefectoTipo.GetValueOrDefault(),
                            ListaJuntasSeleccionadas= ObtenerJuntasID(ListaJutasSeleccionadasXSpoolID),
                            TemplateRender = Lenguaje == "es-MX" ? "Existen " + ListaJutasSeleccionadasXSpoolID.Count + " Juntas" : "There are " + ListaJutasSeleccionadasXSpoolID.Count + " board",
                            TIPO =item.Tipo
                        };
                        detalleDatos.ListaJuntas = ObtenerJuntasSeleccionadas(detalleDatos.ListaJuntas, detalleDatos.ListaJuntasSeleccionadas);
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

        public static List<InspeccionDimensional.JuntaXSpool> ObtenerJuntasSeleccionadas(List<InspeccionDimensional.JuntaXSpool> listaJuntas, List<InspeccionDimensional.JuntaXSpool> ListaJuntasSeleccionadas)
        {
            for (int i = 0; i < listaJuntas.Count; i++)
            {
                for (int j = 0; j < ListaJuntasSeleccionadas.Count; j++)
                {
                    if (listaJuntas[i].JuntaID == ListaJuntasSeleccionadas[j].JuntaID) {
                        listaJuntas[i].Accion = 2;
                    }
                }
            }

            return listaJuntas;
        }

        public static List<InspeccionDimensional.JuntaXSpool> ObtenerJuntasID(List<int?> listaJuntasPorOrdenTrabajoSeleccionada)
        {
            List<InspeccionDimensional.JuntaXSpool> listJuntaXSpoolSeleccionado = new List<InspeccionDimensional.JuntaXSpool>();
            foreach (int item in listaJuntasPorOrdenTrabajoSeleccionada)
            {
                listJuntaXSpoolSeleccionado.Add(new InspeccionDimensional.JuntaXSpool
                {
                    Accion = 2,//dos porque existe ya en el defecto.
                    Junta = "",
                    JuntaID = item
                });
            }
            return listJuntaXSpoolSeleccionado;
        }
        private List<Defectos> ObtenerListaDefectos(List<Sam3_Steelgo_Get_Defectos_Result> listaDefecto)
        {
            List<Defectos> listaDefectos = new List<Defectos>();
            foreach (Sam3_Steelgo_Get_Defectos_Result item in listaDefecto)
            {
                Defectos Defecto = new Defectos
                {
                    DefectoID = item.DefectoID,
                    Nombre = item.Nombre,
                    IDDEFECTOTIPO = item.IdDefectoTipo,
                    TIPO = item.Tipo
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
               
                DataTable JuntasSeleccionadas = null;

                foreach (BackEndSAM.Models.InspeccionDimensional.InspeccionDimensional.DetalleGuardarJson item in listaCaptura.Detalles)
                {
                    if (item.ListaJuntas != null)
                    {
                        if (JuntasSeleccionadas == null)
                            JuntasSeleccionadas = ArmadoController.ToDataTable(item.ListaJuntas);
                        else
                            JuntasSeleccionadas.Merge(ArmadoController.ToDataTable(item.ListaJuntas));

                    }
                }

                DataTable dtDetalleCaptura = ArmadoController.ToDataTable(listaCaptura.Detalles);
                dtDetalleCaptura.Columns.Remove("ListaJuntas");

                return InspeccionDimensionalBD.Instance.InsertarCapturaInspeccion(dtDetalleCaptura, JuntasSeleccionadas, usuario, lenguaje);
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
