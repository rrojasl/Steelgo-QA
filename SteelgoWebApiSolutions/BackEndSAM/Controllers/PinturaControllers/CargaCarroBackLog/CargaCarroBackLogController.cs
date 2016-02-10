using BackEndSAM.DataAcces.PinturaBD.CargaCarroBackLogBD;
using BackEndSAM.DataAcces.PinturaBD.MedioTransporteBD;
using BackEndSAM.Models.Pintura.CargaCarroBackLog;
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

namespace BackEndSAM.Controllers.PinturaControllers.CargaCarroBackLog
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CargaCarroBackLogController : ApiController
    {
        [HttpGet]
        public object ObtieneListadoSpool(int medioTransporteID, string token)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return CargaCarroBackLogBD.Instance.ObtenerListadoSpool(medioTransporteID);
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
                string cerrar = (string)CargaCarroBackLogBD.Instance.ObtenerValorCerrarCarro(usuario, lenguaje, 37);
                
                CamposPredeterminados cargarCarroBackLogCamposPredeterminados = new CamposPredeterminados();

                cargarCarroBackLogCamposPredeterminados = new CamposPredeterminados
                {
                    Cerrar = cerrar
                };

                return cargarCarroBackLogCamposPredeterminados;
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
        public object GuardarCargaCarroBackLog(Captura listaCapturasRequisicion, string token, string lenguaje, int medioTransporteID, int cerrar)
        {
            string payload = "";
            string newToken = "";

            JavaScriptSerializer serializer = new JavaScriptSerializer();
             
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {

                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                DataTable dtDetalleSpool = new DataTable();
                if (listaCapturasRequisicion.ListaDetalles != null)
                {
                    dtDetalleSpool = ToDataTable(listaCapturasRequisicion.ListaDetalles);
                }

                //return CargaCarroBackLogBD.Instance.InsertarCargaCarroBackLog(dtDetalleSpool, usuario,medioTransporteID,cerrar);
                return MedioTransporteBD.Instance.GuardarMedioTransporte(dtDetalleSpool, usuario, lenguaje, medioTransporteID,listaCapturasRequisicion.ListaDetalles[0].MedioTransporteCargaID, cerrar);
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
