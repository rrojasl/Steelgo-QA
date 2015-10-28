using BackEndSAM.DataAcces;
using BackEndSAM.DataAcces.ArmadoBD;
using BackEndSAM.Models.Inspeccion;

using DatabaseManager.Sam3;
using Newtonsoft.Json;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;

namespace BackEndSAM.Controllers
{
    public class InspeccionController : ApiController
    {
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public object Get(string JsonCaptura, string token, string Lenguaje)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                CapturaVisualDimensional.DetalleDatosJson capturaDatosJson = serializer.Deserialize<CapturaVisualDimensional.DetalleDatosJson>(JsonCaptura);

                List<CapturaVisualDimensional.DetalleDatosJson> listaDetalleDatos = new List<CapturaVisualDimensional.DetalleDatosJson>();

                List<Sam3_Inspeccion_Get_DetalleJunta_Result> detalle = (List<Sam3_Inspeccion_Get_DetalleJunta_Result>)InspeccionBD.Instance.ObtenerDetalleJunta(capturaDatosJson, usuario, Lenguaje);

                List<Sam3_Armado_Get_MaterialesSpool_Result> listaNumeroUnicos = (List<Sam3_Armado_Get_MaterialesSpool_Result>)InspeccionBD.Instance.listaNumeroUnicos(capturaDatosJson, usuario);

                List<NumeroUnico> listNumeroUnico1 = GenerarListaNumerosUnicos(listaNumeroUnicos, 1);

                List<NumeroUnico> listNumeroUnico2 = GenerarListaNumerosUnicos(listaNumeroUnicos, 2);

                foreach (Sam3_Inspeccion_Get_DetalleJunta_Result item in detalle)
                {
                    CapturaVisualDimensional.DetalleDatosJson detalleDatos = new CapturaVisualDimensional.DetalleDatosJson
                    {
                        Accion = item.InspeccionVisualID == null ? 1 : 2,
                        JuntaTrabajoID = 0,
                        JuntaArmadoID = item.JuntaArmadoID == null ? 0 : int.Parse(item.JuntaArmadoID.ToString()),
                        InspeccionVisualID = item.InspeccionVisualID == null ? 0 : int.Parse(item.InspeccionVisualID.ToString()),
                        Proyecto = capturaDatosJson.Proyecto,
                        OrdenTrabajoID = capturaDatosJson.OrdenTrabajoID,
                        OrdenTrabajo = capturaDatosJson.OrdenTrabajo,
                        OrdenTrabajoSpoolID = capturaDatosJson.OrdenTrabajoSpoolID,
                        OrdenTrabajoSpool = capturaDatosJson.OrdenTrabajoSpool,
                        SpoolID = capturaDatosJson.OrdenTrabajo + "-" + capturaDatosJson.OrdenTrabajoSpool,
                        JuntaID = capturaDatosJson.JuntaID,
                        Junta = capturaDatosJson.Junta,
                        TipoJunta = item.TipoJunta,
                        TipoJuntaID = item.TipoJuntaID.ToString(),
                        Diametro = item.Diametro.ToString(),
                        FechaInspeccion = item.FechaInspeccion == null ? capturaDatosJson.FechaInspeccion : item.FechaInspeccion.ToString(),
                        Defectos = item.Defecto == null ? capturaDatosJson.Defectos : item.Defecto.ToString(),
                        DefectosID = item.DefectoID == null ? capturaDatosJson.DefectosID : item.DefectoID.ToString(),
                        TallerID = item.TallerID == null ? capturaDatosJson.TallerID : item.TallerID.ToString(),
                        Taller = item.Taller == null ? capturaDatosJson.Taller : item.Taller,
                        Inspector = item.Inspector == null ? capturaDatosJson.Inspector : item.Inspector.ToString(),
                        InspectorID = item.ObreroID == null ? capturaDatosJson.InspectorID : item.ObreroID.ToString(),
                        NumeroUnico1 = item.NumeroUnico1ID == null ? (listNumeroUnico1.Count == 1 ? listNumeroUnico1[0].Clave : "") : item.NumeroUnico1ID.ToString(),
                        NumeroUnico2 = item.NumeroUnico2ID == null ? (listNumeroUnico2.Count == 1 ? listNumeroUnico2[0].Clave : "") : item.NumeroUnico2ID.ToString(),
                        ListaNumerosUnicos1 = listNumeroUnico1,
                        ListaNumerosUnicos2 = listNumeroUnico2,
                        ProyectoID = capturaDatosJson.ProyectoID,
                        Resultado = item.Resultado == null ? capturaDatosJson.Resultado : item.Resultado.ToString(),
                        ResultadoID = item.ResultadoID == null ? capturaDatosJson.ResultadoID : item.ResultadoID.ToString(),
                        ListaInspector = ObtenerListaInspector((List<Sam3_Steelgo_Get_Obrero_Result>)ObreroBD.Instance.ObtenerObrero(capturaDatosJson.ProyectoID, 2, "Inspector Visual Dimensional")),
                        ListaTaller = ObtenerListaTaller((List<Sam3_SteelGo_Get_Taller_Result>)TallerBD.Instance.ObtenerTallerXPoryecto(capturaDatosJson.ProyectoID)),
                        ListaDefectos = ObtenerListaDefectos((List<Sam3_Steelgo_Get_Defectos_Result>)DefectosBd.Instance.listadoDefectos(Lenguaje, "Inspección Visual")),
                        ListaResultados = ObtenerListaResultado((List<Sam3_Steelgo_Get_TipoResultado_Result>)TipoResultadoBd.Instance.ObtenerListadoResultados(Lenguaje))
                        
                    };
                    listaDetalleDatos.Add(detalleDatos);
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
        public List<NumeroUnico> GenerarListaNumerosUnicos(List<Sam3_Armado_Get_MaterialesSpool_Result> listaNumerosUnicos, int numeroSeleccionado)
        {
            List<NumeroUnico> numerosUnicos = new List<NumeroUnico>();

            foreach (Sam3_Armado_Get_MaterialesSpool_Result item in listaNumerosUnicos)
            {
                if (int.Parse(item.Etiqueta.ToString()) == numeroSeleccionado)
                {
                    NumeroUnico numeroUnico = new NumeroUnico
                    {

                        NumeroUnicoID = item.NumeroUnicoID,
                        Clave = item.Clave,
                        EtiquetaMaterial = int.Parse(item.EtiquetaMaterial.ToString()),
                        Etiqueta = item.Etiqueta

                    };
                    numerosUnicos.Add(numeroUnico);
                }

            }

            return numerosUnicos;
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
        private List<Taller> ObtenerListaTaller(List<Sam3_SteelGo_Get_Taller_Result> listaTaller)
        {
            List<Taller> listaTalleres = new List<Taller>();
            foreach (Sam3_SteelGo_Get_Taller_Result item in listaTaller)
            {
                Taller taller = new Taller
                {
                    TallerID = item.TallerID,
                    Nombre = item.Nombre
                };
                listaTalleres.Add(taller);
            }
            return listaTalleres;
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
      
      
    }
}
