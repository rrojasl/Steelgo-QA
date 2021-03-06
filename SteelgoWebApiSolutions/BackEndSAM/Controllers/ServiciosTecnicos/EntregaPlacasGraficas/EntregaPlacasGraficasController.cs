﻿using BackEndSAM.DataAcces.ServiciosTecnicos.EntregaPlacasGraficas;
using BackEndSAM.Models.ServiciosTecnicos.EntregaPlacasGraficas;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;

namespace BackEndSAM.Controllers.ServiciosTecnicos.EntregaPlacasGraficas
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class EntregaPlacasGraficasController : ApiController
    {
        [HttpGet]
        public object ObtieneCatalogos(string token, int numeroCatalogo, string lenguaje)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                if (numeroCatalogo == 1)
                {
                    return EntregaPlacasGraficasBD.Instance.ObtenerListadoDocumentoRecibido(lenguaje);
                }else if (numeroCatalogo == 2)
                {
                    return EntregaPlacasGraficasBD.Instance.ObtenerListadoDocumentoEstatus(lenguaje);
                }else if (numeroCatalogo == 3)
                {
                    return EntregaPlacasGraficasBD.Instance.ObtenerListadoDocumentoDefecto(lenguaje);
                }
                else
                {
                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("Sin datos");
                    result.ReturnCode = 1;
                    result.ReturnStatus = false;
                    result.IsAuthenicated = false;
                    return result;
                }

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
        public object ObtenerProyectos(string token)
        {
            try
            {
                string payload = "";
                string newToken = "";
                bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
                if (totokenValido)
                {
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    Sam3_Usuario Usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                    return EntregaPlacasGraficasBD.Instance.ObtenerListadoProyecto(Usuario.UsuarioID);


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

        [HttpGet]
        public object ObtenerTipoPruebas(int proyectoID, string token, string lenguaje)
        {
            try
            {
                string payload = "";
                string newToken = "";
                bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
                if (totokenValido)
                {
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    Sam3_Usuario Usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                    return EntregaPlacasGraficasBD.Instance.ObtenerListadoTipoPrueba(proyectoID, lenguaje);


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

        [HttpGet]
        public object ObtenerProveedores(string token, int ProyectoID, int TipoPruebaID)
        {
                try
                {
                    string payload = "";
                    string newToken = "";
                    bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
                    if (totokenValido)
                    {
                        JavaScriptSerializer serializer = new JavaScriptSerializer();
                        Sam3_Usuario Usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                        return EntregaPlacasGraficasBD.Instance.ObtenerListadoProveedor(Usuario, ProyectoID, TipoPruebaID);


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

        [HttpGet]
        public object ObtenerRequisiciones(string token, int proyectoID, string lenguaje, int proveedorID, int tipoPruebaID)
        {
            try
            {
                string payload = "";
                string newToken = "";
                bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
                if (totokenValido)
                {
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    Sam3_Usuario Usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                    return EntregaPlacasGraficasBD.Instance.ObtenerListadoRequisicion(Usuario, proyectoID, proveedorID, tipoPruebaID);
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

        public object Get(string token, string lenguaje, int RequisicionID)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                return EntregaPlacasGraficasBD.Instance.ObtieneElementosRequisicion(usuario.UsuarioID, RequisicionID, lenguaje);
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
        public object ObtenerDetalleRequisicion(string token, int proyectoID, int proveedorID, int requisicionID, string lenguaje, int tipoPruebaID)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return EntregaPlacasGraficasBD.Instance.ObtenerDetalleRequisicion(proyectoID, proveedorID, requisicionID, lenguaje, tipoPruebaID);
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

        public object post(CapturaPlacasGraficas Captura, string token, string lenguaje,int requisicionID, int tipoPruebaPorSpool)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                DataTable dtDetalleCaptura = EntregaPlacasGraficasController.ToDataTable(Captura.Detalles);
                return EntregaPlacasGraficasBD.Instance.InsertarCapturaEntregaPlacasGraficas(dtDetalleCaptura, usuario.UsuarioID, lenguaje, requisicionID, tipoPruebaPorSpool);
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