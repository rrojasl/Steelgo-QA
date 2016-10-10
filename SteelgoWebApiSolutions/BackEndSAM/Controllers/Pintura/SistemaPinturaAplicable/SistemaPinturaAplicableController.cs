using BackEndSAM.DataAcces.Pintura.SistemaPinturaAplicable;
using BackEndSAM.Models.Pintura.SistemaPinturaAplicable;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;

namespace BackEndSAM.Controllers.Pintura.SistemaPinturaAplicable
{
    [EnableCors(origins:"*", headers:"*",methods:"*")]
    public class SistemaPinturaAplicableController : ApiController
    {
        [HttpGet]
        public object ObtieneSistemaPintura(string token, int ProyectoID)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                return SistemaPinturaAplicableBD.Instance.ObtieneListadoSistemaPintura(ProyectoID);
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
        public object ObtieneColorPintura(string token, int SistemaPinturaID, string Lenguaje)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                return SistemaPinturaAplicableBD.Instance.ObtieneListadoColorPintura(SistemaPinturaID, Lenguaje);
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
        public object ObtieneDetalleSpool(string token, int ProyectoID, int TipoBusqueda, string Cadena, string Lenguaje) {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                return SistemaPinturaAplicableBD.Instance.ObtieneDetalleSpool(ProyectoID, TipoBusqueda, Cadena, Lenguaje);
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
        public object GuardaCapturaSistemaPinturaAplicable(Captura captura,string token)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                DataTable dtDetalleCaptura = Utilities.ConvertirDataTable.ToDataTable.Instance.toDataTable(captura.detalle);

                return SistemaPinturaAplicableBD.Instance.InsertaCapturaSistemaPinturaAplicable(dtDetalleCaptura, usuario.UsuarioID);
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
        public object GuardaCapturaSistemaPinturaAplicableMasivo(CargaMasiva captura, string token, int TipoCarga, string Lenguaje)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
               
                int posicion = 0;
                while (captura.detalle.Count>0 && posicion < captura.detalle.Count)
                {
                    if (captura.detalle[posicion].Color == null && captura.detalle[posicion].NombreSpool == null && captura.detalle[posicion].NumeroControl == null && captura.detalle[posicion].SistemaPintura == null)
                    {
                        captura.detalle.RemoveAt(posicion);
                        posicion--;
                    }
                    else
                        posicion++;
                }

                DataTable dtDetalleCaptura = Utilities.ConvertirDataTable.ToDataTable.Instance.toDataTable(captura.detalle);



                return SistemaPinturaAplicableBD.Instance.InsertaCapturaSistemaPinturaAplicableMasivo(dtDetalleCaptura, usuario.UsuarioID, TipoCarga, Lenguaje);
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