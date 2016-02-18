using BackEndSAM.DataAcces.EmbarqueBD;
using BackEndSAM.Models.Embarque;
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
    public class MarcadoController : ApiController
    {
        [HttpGet]
        public object ObtieneListaMarcado(string token, int AreaID, int CuadranteID, int Impreso, int Etiquetado, int ConCinta, string lenguaje)
        {
            
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                List<Marcado> lista = new List<Marcado>();
                List<Sam3_Embarque_Get_Marcado_Result> result =(List<Sam3_Embarque_Get_Marcado_Result>) MarcadoBD.Instance.ObtenerDatosConsulta(AreaID, CuadranteID, Impreso,Etiquetado,ConCinta, lenguaje);
                foreach(Sam3_Embarque_Get_Marcado_Result item in result)
                {
                    Marcado elemento = new Marcado
                    {
                        Accion = item.EmbarqueMarcadoID == 0 ? 1: 2,
                        AreaID = int.Parse(item.AreaID.ToString()),
                        ColorCinta = item.ColorCinta,
                        ColorCintaID = item.ColorCintaID,
                        ConCinta = item.ColorCintaID == 0 ? false : true,
                        Cuadrante = item.Cuadrante,
                        CuadranteID = item.CuadranteID,
                        EmbarqueMarcadoID = item.EmbarqueMarcadoID,
                        Etiquetado = item.Etiquetado,
                        Impreso = item.Impreso,
                        SpoolID = item.SpoolID,
                        NumeroControl = item.NumeroControl,
                        ListadoColores = (List<Color>)MarcadoBD.Instance.ObtenerColor(lenguaje)
                    };
                    lista.Add(elemento);
                }
                return lista; 
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
                

                string impresion = (string)MarcadoBD.Instance.ObtenerValorimpresion(usuario, lenguaje, 31);
                string etiquetado = (string)MarcadoBD.Instance.ObtenerValorimpresion(usuario, lenguaje, 45);
                string conCinta = (string)MarcadoBD.Instance.ObtenerValorimpresion(usuario, lenguaje, 44);

                CamposPredeterminados armadoCamposPredeterminados = new CamposPredeterminados();

                armadoCamposPredeterminados = new CamposPredeterminados
                {
                    Impreso = impresion,
                    ConCinta = conCinta,
                    Etiquetado = etiquetado
                };

                return armadoCamposPredeterminados;
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
        public object GuardarMarcado(Captura listaCapturasRequisicion, string token)
        {
            string payload = "";
            string newToken = "";

            JavaScriptSerializer serializer = new JavaScriptSerializer();
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {

                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                DataTable dtDetalleCaptura = new DataTable();
                if (listaCapturasRequisicion.ListaDetalles != null)
                {
                    dtDetalleCaptura = ToDataTable(listaCapturasRequisicion.ListaDetalles);
                }

                return MarcadoBD.Instance.InsertarMarcado(dtDetalleCaptura, usuario);
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
