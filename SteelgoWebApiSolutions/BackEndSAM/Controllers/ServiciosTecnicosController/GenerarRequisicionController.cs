using BackEndSAM.DataAcces;
using BackEndSAM.Models;
using BackEndSAM.Models.GenerarRequisicion;
using DatabaseManager.Sam3;
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


namespace BackEndSAM.Controllers.ServiciosTecnicosController
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class GenerarRequisicionController : ApiController
    {

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
        public object ObtenerListaClasificaciones(string token, string lenguaje, int pruebasProyectoID)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                return GenerarRequisicionBD.Instance.getListaClasificaciones(pruebasProyectoID, lenguaje);
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
        public object ObtenerRequisicion(string token, string lenguaje, int requisicionID)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                return GenerarRequisicionBD.Instance.getRequisicion(lenguaje, requisicionID);
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
        public object ObtenerNuevaJunta(string token, int juntaTrabajoID, int pruebaID, int proyectoID)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                return GenerarRequisicionBD.Instance.getNuevaJunta(juntaTrabajoID, pruebaID, proyectoID);
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
        public object obtenerListaJuntasSoldadas(string token, int pruebaID, string todos, string lenguaje, int reqID)
        {
            string payload = "";
            string newToken = "";
            int all = todos.ToLower() == "todos" ? 1 : 0;
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                List<JsonRequisicion> listaJson = new List<JsonRequisicion>();
                List<Sam3_ServiciosTecnicos_Get_JuntasXPrueba_Result> lista = GenerarRequisicionBD.Instance.getDetalleJuntas(pruebaID, all, reqID);
                foreach (Sam3_ServiciosTecnicos_Get_JuntasXPrueba_Result item in lista)
                {
                    JsonRequisicion elemento;
                    try
                    {


                        elemento = new JsonRequisicion
                        {
                            Accion = item.RequisicionPruebaElementoID == null ? 1 : 2,
                            Agregar = false,
                            Clasificacion = item.Clasificacion,
                            Cuadrante = item.Cuadrante,
                            EtiquetaJunta = item.EtiquetaJunta,
                            Folio = item.Folio == null ? "" : item.Folio,
                            IdentificadorForaneo = item.IdentificadorForaneo,
                            NumeroControl = item.NumeroControl,
                            Prioridad = item.Prioridad.GetValueOrDefault(),
                            Proyecto = item.Proyecto,
                            ProyectoID = item.ProyectoID,
                            PruebaElementoID = item.PruebaElementoID,
                            PruebasClasificacionID = int.Parse(item.PruebasClasificacionID.ToString()),
                            PruebasID = item.PruebasID,
                            PruebasProyectoID = item.PruebasProyectoID,
                            RequisicionID = item.RequisicionID == null ? 0 : int.Parse(item.RequisicionID.ToString()),
                            RequisicionPruebaElementoID = item.RequisicionPruebaElementoID == null ? 0 : int.Parse(item.RequisicionPruebaElementoID.ToString()),
                            listaClasificaciones = (List<Sam3_Steelgo_Get_Calsificaciones_Result>)GenerarRequisicionBD.Instance.getListaClasificaciones(item.PruebasProyectoID, lenguaje)
                        };
                    }
                    catch (Exception ex)
                    {

                        throw;
                    }
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
        public object ObtenerOrdenTrabajo(string ordenTrabajo, int tipo, string token, string lenguaje)
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

                List<Sam3_Steelgo_Get_SpoolID_Result> lista = (List<Sam3_Steelgo_Get_SpoolID_Result>)CapturaSoldaduraBD.Instance.ObtenerIDOrdenTrabajo(usuario, ordenTrabajo, tipo, lenguaje);
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

        [HttpGet]
        public object ObtenerPruebaProyectoID(string token, int pruebaID, int requisicionID)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                return GenerarRequisicionBD.Instance.getPruebaProyectoID(pruebaID, requisicionID);
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
        public object ObtieneCamposPredeterminados(string token, string lenguaje)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                IdOrdenTrabajo idOrdenTrabajo = new IdOrdenTrabajo();


                string muestra = (string)CapturaSoldaduraBD.Instance.ObtenerValorFecha(usuario, lenguaje, 30);


                CamposPredeterminados GenerarRequisicionCamposPredeterminados = new CamposPredeterminados();

                GenerarRequisicionCamposPredeterminados = new CamposPredeterminados
                {
                    Muestra = muestra,
                    FormatoFecha = lenguaje == "es-MX" ? "dd/MM/yyyy" : "MM-dd-yyyy",
                };

                return GenerarRequisicionCamposPredeterminados;
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


        [HttpPost]
        public object Post(Captura listaCapturasRequisicion, string token, string lenguaje)
        {
            string payload = "";
            string newToken = "";

            JavaScriptSerializer serializer = new JavaScriptSerializer();
            // DetalleDatosJson[] ejemplo = serializer.Deserialize<DetalleDatosJson[]>(capturaArmado);

            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {

                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                DataTable dtDetalleCaptura = new DataTable();
                if (listaCapturasRequisicion.listaRequisiciones != null)
                {
                    dtDetalleCaptura = ToDataTable(listaCapturasRequisicion.listaRequisiciones);
                }

                return GenerarRequisicionBD.Instance.InsertarGenerarRequisicion(dtDetalleCaptura, usuario, lenguaje, listaCapturasRequisicion.RequisicionID,
                    listaCapturasRequisicion.Folio, listaCapturasRequisicion.PruebasID, listaCapturasRequisicion.FechaRequisicion, listaCapturasRequisicion.Observacion, listaCapturasRequisicion.EstatusID);
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

        public static DataTable ToDataTable<T>(List<T> l_oItems)
        {
            DataTable oReturn = new DataTable(typeof(T).Name);
            object[] a_oValues;
            int i;

            //#### Collect the a_oProperties for the passed T
            PropertyInfo[] a_oProperties = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);

            //#### Traverse each oProperty, .Add'ing each .Name/.BaseType into our oReturn value
            //####     NOTE: The call to .BaseType is required as DataTables/DataSets do not support nullable types, so it's non-nullable counterpart Type is required in the .Column definition
            foreach (PropertyInfo oProperty in a_oProperties)
            {
                oReturn.Columns.Add(oProperty.Name, BaseType(oProperty.PropertyType));
            }

            //#### Traverse the l_oItems
            foreach (T oItem in l_oItems)
            {
                //#### Collect the a_oValues for this loop
                a_oValues = new object[a_oProperties.Length];

                //#### Traverse the a_oProperties, populating each a_oValues as we go
                for (i = 0; i < a_oProperties.Length; i++)
                {
                    a_oValues[i] = a_oProperties[i].GetValue(oItem, null);
                }

                //#### .Add the .Row that represents the current a_oValues into our oReturn value
                oReturn.Rows.Add(a_oValues);
            }

            //#### Return the above determined oReturn value to the caller
            return oReturn;
        }
        public static Type BaseType(Type oType)
        {
            //#### If the passed oType is valid, .IsValueType and is logicially nullable, .Get(its)UnderlyingType
            if (oType != null && oType.IsValueType &&
                oType.IsGenericType && oType.GetGenericTypeDefinition() == typeof(Nullable<>)
            )
            {
                return Nullable.GetUnderlyingType(oType);
            }
            //#### Else the passed oType was null or was not logicially nullable, so simply return the passed oType
            else
            {
                return oType;
            }
        }
    }
}
