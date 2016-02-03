
using BackEndSAM.DataAcces.EmbarqueBD.CargaEmbarqueBD;
using BackEndSAM.Models.Embarque.CargaEmbarque;
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

namespace BackEndSAM.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CargaEmbarqueController : ApiController
    {
        //obtiene las placas de las planas.
        public object Get(string token, int TransportistaID,int embarquePlanaID, string lenguaje)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return CargaEmbarqueBD.Instance.ObtenerPlacasPlana(TransportistaID, embarquePlanaID, lenguaje);
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
        public object ObtenerDetalleXPlana(string token, int proveedorID, int placaID, string lenguaje)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return CargaEmbarqueBD.Instance.ObtieneDetalleXPlaca(proveedorID, placaID,lenguaje);
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


        //obtiene los paquetes
        public object Get(string token, string tipo)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return CargaEmbarqueBD.Instance.ObtenerPaquetes(int.Parse(tipo));
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

        //obtiene el detalle
        public object Get(string token, int TipoConsulta, int OrdenTrabajoSpoolID, int Paquete, string Codigo, string lenguaje,int embarquePlanaID)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return CargaEmbarqueBD.Instance.ObtieneDetalle(TipoConsulta,OrdenTrabajoSpoolID,Paquete,Codigo , lenguaje, embarquePlanaID);
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

        //actualiza  el cuadrante y / o crea paquetes a partir de un paquete id
        public object Post(Captura listaCapturaArmado, string token, int EmpaquetadoPaqueteID)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                DataTable dtDetalleCaptura = ArmadoController.ToDataTable(listaCapturaArmado.Detalles);
                DataTable dt=  (DataTable) CargaEmbarqueBD.Instance.ActualizarCuadrante(EmpaquetadoPaqueteID, dtDetalleCaptura, usuario.UsuarioID);
                NuevoPaquete nuevoPaquete = new NuevoPaquete();
                nuevoPaquete.EmbarquePaqueteID = int.Parse(dt.Rows[0][0].ToString());
                nuevoPaquete.Folio = dt.Rows[0][1].ToString();
                return nuevoPaquete;


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

        //Guarda la plana
        public object Post(Captura listaCapturaArmado, string token, int proveedorID,int vehiculoID, int embarquePlanaID)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                DataTable dtDetalleCaptura = ArmadoController.ToDataTable(listaCapturaArmado.Detalles);
                return CargaEmbarqueBD.Instance.GuardarEmbarqueCarga(dtDetalleCaptura, usuario.UsuarioID, proveedorID, vehiculoID, embarquePlanaID);
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




        public object Put(CierraPlana  cierraPlana , string token)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
               
                return CargaEmbarqueBD.Instance.CerrarPlana(usuario.UsuarioID, cierraPlana.EmbarquePlanaID);
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
