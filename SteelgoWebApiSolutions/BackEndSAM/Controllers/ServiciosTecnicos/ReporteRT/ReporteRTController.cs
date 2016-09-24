﻿using BackEndSAM.DataAcces.ServiciosTecnicos.ReporteRT;
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

namespace BackEndSAM.Controllers.ServiciosTecnicos.ReporteRT
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ReporteRTController : ApiController
    {
        public object Get(string token)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);


                return ReporteRTBD.Instance.ObtenerListadoProyectos(usuario);
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
        public object GetProveedores(string token, int proyectoID)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);


                return ReporteRTBD.Instance.ObtenerListadoProveedores(proyectoID);
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
        public object GetTipoPruebas(string token, int proyectoID, string x, string y)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);


                return ReporteRTBD.Instance.ObtenerTipoPruebas(proyectoID);
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
        public object GetRequisiciones(string token, int ProyectoID, int ProveedorID)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);


                return ReporteRTBD.Instance.ObtenerListadoRequisiciones(usuario, ProyectoID, ProveedorID);
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
        public object GetEquipos(string token, string lenguaje, string x)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);


                return ReporteRTBD.Instance.ObtenerListadoEquipos(lenguaje);
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
        public object GetTurnos(string token, string lenguaje)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);


                return ReporteRTBD.Instance.ObtenerListadoTurnos(lenguaje);
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
        public object GetRequisicionesDetalle(string token, int proyectoID, int tipoPruebaID, int proveedorID, int requisicionID, int equipoID, int turnoID,string lenguaje)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);


                return ReporteRT_BD.Instance.ObtenerRequisicionesDetalle(proyectoID, tipoPruebaID, proveedorID, requisicionID, equipoID, turnoID,lenguaje);
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

        public object Post(Models.ServiciosTecnicos.ReporteRT.CapturaReporteRT Captura, string token, string lenguaje)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);

            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                DataTable dtDetalleCaptura = ReporteRTController.ToDataTable(Captura.Detalles);    
                DataTable dtDetalleResultados = new DataTable("detalleResultados");
                DataTable dtDetalleDefectos = new DataTable("detalleDefectos");

                for (int i = 0; i < Captura.Detalles.Count; i++)
                {
                    DataTable dtResultados = null;
                    
                    DataTable dtDefectos = null;

                    if (Captura.Detalles[i].ListaDetallePorPlacasGuardar != null)
                    {
                        for (int j = 0; j < Captura.Detalles[i].ListaDetallePorPlacasGuardar.Count; j++)
                        {
                            if (Captura.Detalles[i].ListaDetallePorPlacasGuardar[j].ListaDetalleDefectos != null)
                            {
                                dtDefectos = ReporteRTController.ToDataTable(Captura.Detalles[i].ListaDetallePorPlacasGuardar[j].ListaDetalleDefectos);
                                dtDetalleDefectos.Merge(dtDefectos);
                            }
                        }

                        dtResultados = ReporteRTController.ToDataTable(Captura.Detalles[i].ListaDetallePorPlacasGuardar);
                        dtDetalleResultados.Merge(dtResultados);
                    }
                }

                dtDetalleCaptura.Columns.RemoveAt(11);
                dtDetalleCaptura.Columns.RemoveAt(11);
                dtDetalleCaptura.Columns.RemoveAt(11);
                dtDetalleCaptura.Columns.RemoveAt(11);
                dtDetalleCaptura.Columns.RemoveAt(11);
                dtDetalleCaptura.Columns.RemoveAt(11);
                dtDetalleCaptura.Columns.RemoveAt(11);
                dtDetalleCaptura.Columns.RemoveAt(11);
                dtDetalleCaptura.Columns.RemoveAt(11);
                

                dtDetalleResultados.Columns.RemoveAt(8);
                dtDetalleResultados.Columns.RemoveAt(8);
                dtDetalleResultados.Columns.RemoveAt(8);
                dtDetalleResultados.Columns.RemoveAt(8);
                dtDetalleResultados.Columns.RemoveAt(8);

                dtDetalleDefectos.Columns.RemoveAt(9);
                dtDetalleDefectos.Columns.RemoveAt(9);

                return ReporteRT_BD.Instance.InsertarCapturaReportesRT(dtDetalleCaptura, dtDetalleResultados, dtDetalleDefectos, usuario.UsuarioID, lenguaje);
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
