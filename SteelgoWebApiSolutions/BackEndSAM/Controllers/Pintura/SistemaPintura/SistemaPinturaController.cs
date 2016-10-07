using BackEndSAM.DataAcces.Pintura.SistemaPintura;
using BackEndSAM.Models.Pintura.SistemaPintura;
using BackEndSAM.Utilities.ConvertirDataTable;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;

namespace BackEndSAM.Controllers.Pintura.SistemaPintura
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class SistemaPinturaController : ApiController
    {
        [HttpGet]
        public object GetCreacionSistemaPintura(string token, string Lenguaje, int SistemaPinturaID, int ProyectoID)
        {
            //Create a generic return object
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                return SistemaPinturaBD.Instance.ObtenerSistemaPinturaNuevo(Lenguaje, SistemaPinturaID, ProyectoID);
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
        public object GetCreacionSistemaPintura(string token, string Lenguaje, int SistemaPinturaID)
        {
            //Create a generic return object
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                return SistemaPinturaBD.Instance.ObtenerSistemaPinturaEdicicion(Lenguaje, SistemaPinturaID);
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
        public object GuardarCaptura(Captura listaCaptura, string token, string lenguaje)
        {
            string payload = "";
            string newToken = "";

            JavaScriptSerializer serializer = new JavaScriptSerializer();


            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                DataTable dtDetallePruebasProcesos = null;
                 

                foreach (GuardarSistemaPintura item in listaCaptura.Detalles)
                {
                    if (item.ListadoPruebasProceso != null)
                    {
                        foreach (GuardarPruebasProceso index in item.ListadoPruebasProceso)
                        {
                            if (dtDetallePruebasProcesos == null)
                                dtDetallePruebasProcesos = ToDataTable.Instance.toDataTable(item.ListadoPruebasProceso);
                            else
                                dtDetallePruebasProcesos.Merge(ToDataTable.Instance.toDataTable(item.ListadoPruebasProceso));
                        }
                    }
                }

                DataTable dtDetalleProcesos = Utilities.ConvertirDataTable.ToDataTable.Instance.toDataTable(listaCaptura.Detalles);
                dtDetalleProcesos.Columns.Remove("ListadoPruebasProceso");

                return SistemaPinturaBD.Instance.InsertarCaptura(dtDetalleProcesos, usuario, lenguaje);
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
