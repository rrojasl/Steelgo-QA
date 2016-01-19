using BackEndSAM.DataAcces.PinturaBD.LotesCapturaReporteBD;
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

namespace BackEndSAM.Controllers.PinturaControllers.LotesCapturaReporteController
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class LotesCapturaReporteController : ApiController
    {
        
        public object Get(string token,string lenguaje, int tipo)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                if(tipo== 1)
                return LotesCapturaReporteBD.Instance.ObtenerSistemaPintura();
                else
                    return LotesCapturaReporteBD.Instance.ObtenerSistemaLotes();
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

        public object Get(string token, string lenguaje, int sistemaPinturaID,int lotePinturaID)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
               
                    return LotesCapturaReporteBD.Instance.ObtenerSpoolStatusPrueba(sistemaPinturaID, lotePinturaID);
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

        ////Guarda la captura
        //public object Post(Captura listaCaptura, string token, string lenguaje, int medioTransporteID, int cerrar = 0)
        //{
        //    string payload = "";
        //    string newToken = "";
        //    bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
        //    if (tokenValido)
        //    {
        //        JavaScriptSerializer serializer = new JavaScriptSerializer();
        //        Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
        //        DataTable dtDetalleCaptura = ArmadoController.ToDataTable(listaCaptura.Detalles);
        //        return new object();//return MedioTransporteBD.Instance.GuardarMedioTransporte(dtDetalleCaptura, usuario.UsuarioID, lenguaje, medioTransporteID, cerrar);
        //    }
        //    else
        //    {
        //        TransactionalInformation result = new TransactionalInformation();
        //        result.ReturnMessage.Add(payload);
        //        result.ReturnCode = 401;
        //        result.ReturnStatus = false;
        //        result.IsAuthenicated = false;
        //        return result;
        //    }

        //}

    }
}
