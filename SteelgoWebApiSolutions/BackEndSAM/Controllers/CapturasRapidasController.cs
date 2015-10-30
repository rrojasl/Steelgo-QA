using BackEndSAM.DataAcces;
using BackEndSAM.Models.CapturasRapidas;
using BackEndSAM.Models.Inspeccion;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;

namespace BackEndSAM.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CapturasRapidasController : ApiController
    {
        /// <summary>
        /// Obtiene SpoolID
        /// </summary>
        /// <param name="ordenTrabajo">Orden de trabajo Sin formato</param>
        /// <param name="tipo">Tipo de ejecución en el stord</param>
        /// <param name="token">token</param>
        /// <returns></returns>
        public object Get(string ordenTrabajo, int tipo, string token)
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

                List<Sam3_Steelgo_Get_SpoolID_Result> lista = (List<Sam3_Steelgo_Get_SpoolID_Result>)CapturasRapidasBd.Instance.ObtenerIDOrdenTrabajo(ordenTrabajo, tipo);
                List<IDS> listaAtatus = new List<IDS>();
                if (lista.Count > 0)
                {
                    foreach (var item in lista)
                    {
                        listaAtatus.Add(new IDS { Status = item.status, IDValido = item.ID, Proyecto = item.NombreProyecto, Valor = item.OrdenTrabajoSpoolID, ProyectoID = item.ProyectoID });
                    }

                    idOrdenTrabajo = new IdOrdenTrabajo
                    {
                        OrdenTrabajo = lista[0].OrdenTrabajo,
                        idStatus = listaAtatus
                    };
                }
                else
                {
                    idOrdenTrabajo = new IdOrdenTrabajo
                    {
                        OrdenTrabajo = "",
                        idStatus = listaAtatus
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
        /// <summary>
        /// Obtiene Detalle Dimensional dependiendo de una juntaSpoolID

        /// </summary>
        /// <param name="id">Spool ID</param>
        /// <param name="sinCaptura">muestra lso datos con o sin capturas</param>
        /// <param name="token">token</param>
        /// <returns></returns>
        public object Get(string id, string sinCaptura, string token,string lenguaje)
        {

            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                //return 

                DetalleJuntaDimension detalleJuntaDimension = new DetalleJuntaDimension();

               // List<Sam3_Steelgo_Get_JuntaSpool_Result> lista = (List < Sam3_Steelgo_Get_JuntaSpool_Result >) CapturasRapidasBd.Instance.ObtenerJuntasXSpoolID(id, sinCaptura == "todos" ? 1 : 0);

                List<Sam3_Inspeccion_Get_DetalleDimensional_Result> listaObtenerDetalleDimensional=(List<Sam3_Inspeccion_Get_DetalleDimensional_Result>) CapturasRapidasBd.Instance.ObtenerDetalleDimensional(int.Parse(id), lenguaje);

               //List<JuntaXSpoolID> listaJuntaXSpoolID = new List<JuntaXSpoolID>();
                List<DetalleDimensional> listaDetalleDimensional = new List<DetalleDimensional>(); 

                //foreach (Sam3_Steelgo_Get_JuntaSpool_Result item in lista)
                //{
                //    JuntaXSpoolID juntaXSpoolID = new JuntaXSpoolID
                //    {
                //        Etiqueta = item.Etiqueta,
                //        JuntaSpoolID = item.JuntaSpoolID
                //    };
                //}

                foreach (Sam3_Inspeccion_Get_DetalleDimensional_Result item in listaObtenerDetalleDimensional)
                {
                    DetalleDimensional detalleDimensional = new DetalleDimensional
                    {
                        Defecto = item.Defecto,
                        DefectoID =  item.DefectoID.GetValueOrDefault(),
                        FechaInspeccion=item.FechaInspeccion,
                        InspeccionDimensionalID=item.InspeccionDimensionalID,
                        Inspector=item.Inspector,
                        ObreroID=item.ObreroID,
                        OrdenTrabajoSpoolID=item.OrdenTrabajoSpoolID.GetValueOrDefault(),
                        Resultado=item.Resultado,
                        ResultadoID=item.ResultadoID
                    
                    };

                    listaDetalleDimensional.Add(detalleDimensional);
                }


                //detalleJuntaDimension.ListaJuntaXSpoolID = listaJuntaXSpoolID;

                detalleJuntaDimension.ListaDetalleDimensional = listaDetalleDimensional;

                return detalleJuntaDimension;
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
