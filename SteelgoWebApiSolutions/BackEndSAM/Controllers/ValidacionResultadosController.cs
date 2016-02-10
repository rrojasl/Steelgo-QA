using BackEndSAM.DataAcces.ServiciosTecnicosBD.ValidacionResultadosBD;
using BackEndSAM.Models.ServiciosTecnicos.ValidacionResultados;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System;
using System.Collections.Generic;
using System.Data;
using System.Reflection;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;

namespace BackEndSAM.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ValidacionResultadosController : ApiController
    {
        [HttpGet]
        public object ObtenerListadoJuntas(string token,string lenguaje, string requisicionID)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                DetalleJuntasValidacion resultado = new DetalleJuntasValidacion();
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                List<DetalleJuntasValidacion> listaResult = new List<DetalleJuntasValidacion>();

                List<Sam3_ServiciosTecnicos_Get_JuntasValidarReporteValidacionResultados_Result> result = (List<Sam3_ServiciosTecnicos_Get_JuntasValidarReporteValidacionResultados_Result>)ValidacionResultadosBD.Instance.getListadoJuntas(requisicionID, lenguaje);
                foreach(Sam3_ServiciosTecnicos_Get_JuntasValidarReporteValidacionResultados_Result item in result)
                {
                    resultado = new DetalleJuntasValidacion
                    {
                        Accion = item.ValidacionResultadosID == null ? 1 : 2,
                        ValidacionResultadosID = item.ValidacionResultadosID == null ? 0 : int.Parse(item.ValidacionResultadosID.ToString()),
                        DatosJunta =  item.DatosJunta,
                        Ubicacion = item.Ubicacion,
                        Comentario = item.Comentario == null ? "": item.Comentario,
                        Conciliado = Convert.ToInt32(item.Conciliado),
                        NombreConciliado = item.NombreConciliado,
                        RequisicionID = item.RequisicionID,
                        DefectoID = item.DefectoID == null ? 0:  int.Parse( item.DefectoID.ToString()),
                        Nombre = item.Nombre == null ? "": item.Nombre,
                        IdentificadorForaneo = item.IdentificadorForaneo.ToString(),
                        PruebaElementoResultadoID = item.PruebaElementoResultadoID,
                        DatosDefecto = item.Defectos,
                        Defectos = (List<RazonesRechazo>)ValidacionResultadosBD.Instance.getListadoDefectos(lenguaje, "Validacion Resultados")

                    };
                    listaResult.Add(resultado);
                }
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


        [HttpGet]
        public object ObtenerDatosCabeceraEdicion(string token, string lenguaje, int requisicionID, string Ubicacion)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                RenglonEdicion resultado = new RenglonEdicion();
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                List<RenglonEdicion> listaResult = new List<RenglonEdicion>();
                string tipoPrueba = "";
                List<Sam3_ServiciosTecnicos_Get_RequisicionDetalle_Result> listaTipoPrueba = (List<Sam3_ServiciosTecnicos_Get_RequisicionDetalle_Result>)ValidacionResultadosBD.Instance.getListadoTipoPrueba(requisicionID, lenguaje);

                foreach (Sam3_ServiciosTecnicos_Get_RequisicionDetalle_Result item in listaTipoPrueba)
                {
                    tipoPrueba = item.NombrePrueba;
                }
                List<Sam3_ServiciosTecnicos_Get_ValidacionResultadosDetalle_Result> result = (List<Sam3_ServiciosTecnicos_Get_ValidacionResultadosDetalle_Result>)ValidacionResultadosBD.Instance.getRenglonEditar(requisicionID, Ubicacion);
                foreach (Sam3_ServiciosTecnicos_Get_ValidacionResultadosDetalle_Result item in result)
                {
                    resultado = new RenglonEdicion
                    {
                        Ubicacion = item.Ubicacion,
                        PruebaElementoResultadoID = item.PruebaElementoResultadoID,
                        RequisicionID = item.RequisicionID,
                        RequisicionPruebaElementoID = item.RequisicionPruebaElementoID,
                        SpoolJunta = item.SpoolJunta,
                        Defectos = (List<RazonesRechazo>)ValidacionResultadosBD.Instance.getListadoDefectos(lenguaje, tipoPrueba)
                    };
                    listaResult.Add(resultado);
                }
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


        [HttpGet]
        public object ObtenerDatosGridDefectos(string token, string lenguaje, int PruebaElementoResultadoID, int RequisicionID)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                RenglonEdicion resultado = new RenglonEdicion();
                string tipoPrueba = "";
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                List<DetalleDefectos> listaResult = new List<DetalleDefectos>();
                listaResult = (List<DetalleDefectos>)ValidacionResultadosBD.Instance.getListadoDetalleDefectos(PruebaElementoResultadoID, tipoPrueba, lenguaje, RequisicionID);
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
        public object Post(Captura listaCapturasRequisicion, string token, string lenguaje, int RequisicionID)
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
                if (listaCapturasRequisicion.ListaDetalles != null)
                {
                    dtDetalleCaptura = ToDataTable(listaCapturasRequisicion.ListaDetalles);
                }

                return ValidacionResultadosBD.Instance.InsertarValidarRequisicion(dtDetalleCaptura, usuario, lenguaje, RequisicionID);
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
        public object Post(Defectos listaCapturaDefectos, string token, string lenguaje, int defecto)
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
                if (listaCapturaDefectos.ListaDetalles != null)
                {
                    dtDetalleCaptura = ToDataTable(listaCapturaDefectos.ListaDetalles);
                }

                return ValidacionResultadosBD.Instance.InsertarDefectos(dtDetalleCaptura, usuario, lenguaje);
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
