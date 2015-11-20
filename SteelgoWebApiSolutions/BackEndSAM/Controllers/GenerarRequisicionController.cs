using BackEndSAM.DataAcces;
using BackEndSAM.Models;
using BackEndSAM.Models.GenerarRequisicion;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;

namespace BackEndSAM.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class GenerarRequisicionController : ApiController
    {
        [HttpGet]
        public object ObtenerTiposPruebas(string token, int proyectoID, string lenguaje)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                return GenerarRequisicionBD.Instance.getListaTipoPrueba(lenguaje, proyectoID);
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

        [HttpGet]
        public object ObtenerListaProyectos(string token)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                return GenerarRequisicionBD.Instance.getListaProyectos();
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

        [HttpGet]
        public object obtenerListaJuntasSoldadas(string token, int pruebaID, int todos, string lenguaje)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                List<JsonRequisicion> listaJson = new List<JsonRequisicion>();
                    List<Sam3_ServiciosTecnicos_Get_JuntasXPrueba_Result> lista = (List<Sam3_ServiciosTecnicos_Get_JuntasXPrueba_Result>) GenerarRequisicionBD.Instance.getDetalleJuntas(pruebaID, todos);
                foreach (Sam3_ServiciosTecnicos_Get_JuntasXPrueba_Result item in lista)
                {
                    JsonRequisicion elemento = new JsonRequisicion
                    { 
                        Agregar = item.Agregar,
                        Clasificacion = item.Clasificacion,
                        Cuadrante = item.Cuadrante,
                        EtiquetaJunta = item.EtiquetaJunta,
                        Folio = item.Folio == null ? "": item.Folio,
                        IdentificadorForaneo = item.IdentificadorForaneo,
                        NumeroControl = item.NumeroControl,
                        Prioridad = long.Parse (item.Prioridad.ToString()),
                        Proyecto = item.Proyecto,
                        ProyectoID = item.ProyectoID,
                        PruebaElementoID = item.PruebaElementoID,
                        PruebasClasificacionID = int.Parse(item.PruebasClasificacionID.ToString()),
                        PruebasID = item.PruebasID,
                        PruebasProyectoID = item.PruebasProyectoID,
                        RequisicionID = item.RequisicionID == null ? 0 : int.Parse(item.RequisicionID.ToString()),
                        RequisicionPruebaElementoID = item.RequisicionPruebaElementoID == null ? 0 : int.Parse(item.RequisicionPruebaElementoID.ToString()),
                        listaClasificaciones = (List<Sam3_Steelgo_Get_Calsificaciones_Result>)GenerarRequisicionBD.Instance.getListaClasificaciones(item.PruebasProyectoID,lenguaje)
                    };
                    listaJson.Add(elemento);
                }
                return listaJson;
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

        [HttpGet]
        public object ObtenerOrdenTrabajo(string ordenTrabajo, int tipo, string token)
        {
            //Create a generic return object
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                IdOrdenTrabajo idOrdenTrabajo = new IdOrdenTrabajo();

                List<Sam3_Steelgo_Get_SpoolID_Result> lista = (List<Sam3_Steelgo_Get_SpoolID_Result>)CapturaSoldaduraBD.Instance.ObtenerIDOrdenTrabajo(usuario, ordenTrabajo, tipo);
                List<IDS> listaStatus = new List<IDS>();
                if (lista.Count > 0)
                {
                    foreach (var item in lista)
                    {
                        listaStatus.Add(new IDS { Status = item.status, IDValido = item.ID, Proyecto = item.NombreProyecto, Valor = item.OrdenTrabajoSpoolID, ProyectoID = item.ProyectoID });
                    }

                    idOrdenTrabajo = new IdOrdenTrabajo
                    {
                        OrdenTrabajo = lista[0].OrdenTrabajo,
                        idStatus = listaStatus
                    };
                }
                else
                {
                    idOrdenTrabajo = new IdOrdenTrabajo
                    {
                        OrdenTrabajo = "",
                        idStatus = listaStatus
                    };
                };
                return idOrdenTrabajo;

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
