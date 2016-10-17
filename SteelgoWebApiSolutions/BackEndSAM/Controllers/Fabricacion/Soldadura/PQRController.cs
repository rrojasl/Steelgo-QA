using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace BackEndSAM.Controllers.Fabricacion.Soldadura
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PQRController : ApiController
    {
        //Obtiene el DataSource Para PQR
        public object Get(int TipoDato, int Proyecto, int PruebaID, string Especificacion, string Codigo, string token)
        {
            try
            {
                string payload = "";
                string newToken = "";
                bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
                if (totokenValido)
                {
                    return PQRBd.Instance.ObtenerListadoPQRActivos(TipoDato, Proyecto, PruebaID, Especificacion, Codigo);
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

        public object Get(int Proyecto, int PruebaID, string token)
        {
            try
            {
                string payload = "";
                string newToken = "";
                bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
                if (totokenValido)
                {
                    return PQRBd.Instance.ObtenerListasPQR(Proyecto, PruebaID);
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

        public object Post(Captura listaCaptura, string token, int accion)
        {
            try
            {
                if (accion == 2)
                {
                    string payload = "";
                    string newToken = "";
                    bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
                    if (totokenValido)
                    {
                        JavaScriptSerializer serializer = new JavaScriptSerializer();
                        Sam3_Usuario Usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                        DataTable dtDetalleCaptura = new DataTable();
                        if (listaCaptura.Detalles != null)
                        {
                            dtDetalleCaptura = ToDataTable(listaCaptura.Detalles);
                        }
                        return PQRBd.Instance.AgregarPQR(dtDetalleCaptura, Usuario);
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
                if (accion == 1)
                {
                    string payload = "";
                    string newToken = "";
                    bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
                    if (totokenValido)
                    {
                        JavaScriptSerializer serializer = new JavaScriptSerializer();
                        Sam3_Usuario Usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                        DataTable dtDetalleCaptura = new DataTable();
                        if (listaCaptura.Detalles != null)
                        {
                            dtDetalleCaptura = ToDataTable(listaCaptura.Detalles);
                        }
                        return PQRBd.Instance.AgregarNuevoPQR(dtDetalleCaptura, Usuario);
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
                return null;
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

        //Obtiene el listado de PQR Activos, (PQRID , NOMBREPQR)
        public object Get(string token, int TipoAccion)
        {
            try
            {

                string payload = "";
                string newToken = "";
                bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
                if (totokenValido)
                {
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                    return PQRBd.Instance.ObtenerListadoPQRActivos(TipoAccion, 28, 2, null, null);
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

        public object Get(string token, string nombre)
        {
            try
            {
                string payload = "";
                string newToken = "";
                bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
                if (totokenValido)
                {
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                    return PQRBd.PQRExist(nombre);
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
