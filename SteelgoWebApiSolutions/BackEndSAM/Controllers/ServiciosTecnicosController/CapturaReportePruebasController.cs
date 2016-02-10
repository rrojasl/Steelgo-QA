using BackEndSAM.DataAcces.ServiciosTecnicosBD.CapturaReportePruebasBD;
using BackEndSAM.Models.ServiciosTecnicos.CapturaReportePruebas;
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
    public class CapturaReportePruebasController : ApiController
    {

        [HttpGet]
        public object ObtieneRequisicionDetalle(string token, string lenguaje, int requisicion)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                List<Sam3_ServiciosTecnicos_Get_RequisicionDetalle_Result> list = (List<Sam3_ServiciosTecnicos_Get_RequisicionDetalle_Result>)CapturaReportePruebasBD.Instance.getRequisicionDetalle(lenguaje, requisicion);
                List<ReportePruebasCabecera> result = new List<ReportePruebasCabecera>();
                foreach (Sam3_ServiciosTecnicos_Get_RequisicionDetalle_Result item in list)
                {
                    ReportePruebasCabecera elemento = new ReportePruebasCabecera
                    {
                        HerramientaPrueba = item.HerramientaPrueba,
                        Nombre = item.Nombre,
                        NombrePrueba = item.NombrePrueba,
                        Requisicion = item.Requisicion,
                        TipoPrueba = item.TipoPrueba,
                        TurnoLaboral = item.TurnoLaboral
                    };
                    result.Add(elemento);
                }
                return result;
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
        public object ObtieneReportePruebasDetalle(string token, int requisicionID, string lenguaje)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                List<Sam3_ServiciosTecnicos_Get_ReportePruebasDetalle_Result> list = (List<Sam3_ServiciosTecnicos_Get_ReportePruebasDetalle_Result>)CapturaReportePruebasBD.Instance.getReportePruebasDetalle(requisicionID, lenguaje);
                List<CapturaReportePruebasDetalle> result = new List<CapturaReportePruebasDetalle>();

                foreach (Sam3_ServiciosTecnicos_Get_ReportePruebasDetalle_Result item in list)
                {
                    CapturaReportePruebasDetalle elemento = new CapturaReportePruebasDetalle
                    {
                        Densidad = item.Densidad,
                        NumeroPlacas = item.NumeroPlacas,
                        RequisicionPruebaElementoID = item.RequisicionPruebaElementoID,
                        SpoolJunta = item.SpoolJunta,
                        Tamano = item.Tamano,
                        listaDetallePruebas = (List<DetallePruebas>)CapturaReportePruebasBD.Instance.getPruebasDefectosDetalle(item.RequisicionPruebaElementoID, lenguaje, requisicionID)
                    };
                    result.Add(elemento);
                }
                return result;
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
        public object ObtenerDatosGridDefectos(string token, string lenguaje, int PruebaElementoResultadoID)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                string tipoPrueba = "";
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                List<DetalleDefectos> listaResult = new List<DetalleDefectos>();
                listaResult = (List<DetalleDefectos>)CapturaReportePruebasBD.Instance.getListaDetalleDefectos(PruebaElementoResultadoID, lenguaje);
                return listaResult;
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
        public object post(Captura listaCaptura, string token, string lenguaje,int reqID)
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
                DataTable dtDefectos = new DataTable();
                foreach (CapturaRequisicion item in listaCaptura.ListadoCapturaRequisicion)
                {
                    if (item.ListaCaptura != null)
                    {
                        dtDetalleCaptura = ToDataTable(item.ListaCaptura);
                    }
                    if (item.ListaDefectos != null)
                    {
                        dtDefectos = ToDataTable(item.ListaDefectos);
                    }
                }
                return CapturaReportePruebasBD.Instance.InsertarCaptura(dtDetalleCaptura, dtDefectos, usuario, lenguaje, reqID);
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
