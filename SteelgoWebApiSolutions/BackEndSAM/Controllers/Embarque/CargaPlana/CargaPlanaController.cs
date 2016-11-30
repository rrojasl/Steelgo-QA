﻿using BackEndSAM.Models.Embarque.CargaPlana;
using BackEndSAM.DataAcces.Embarque.CargaPlana;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;
using System.Data;

namespace BackEndSAM.Controllers.Embarque.CargaPlana
{
    [EnableCors(origins:"*", headers:"*", methods:"*")]
    public class CargaPlanaController : ApiController
    {

        [HttpGet]
        public object ObtenerDetalleCargaPlana(string token, int PlanaID, int Todos)
        {
            string payload = "";
            string newToken = "";

            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                return CargaPlanaBD.Instance.ObtenerDetalleCargaPlana(PlanaID, Todos);
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
        public object ObtieneDetalleSpoolAgregar(string token, int CargaPlanaID, int TipoConsulta, int OrdenTrabajoSpoolID)
        {
            string payload = "";
            string newToken = "";

            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                return CargaPlanaBD.Instance.ObtieneDetalleSpoolAgregar(CargaPlanaID, TipoConsulta, OrdenTrabajoSpoolID);
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
        public object ObtieneDetallePaqueteAgregar(string token, int PaqueteID, string lenguaje)
        {
            string payload = "";
            string newToken = "";

            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                return CargaPlanaBD.Instance.ObtieneDetallePaqueteAgregar(PaqueteID, lenguaje);
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
        public object GuardaCapturaCargaPlana(Captura captura, string token, int CargaPlanaID, int PlanaID, int CerrarPlana, int CuadrantePlanaSam2, int CuadrantePlanaSam3)
        {
            string payload = "";
            string newToken = "";

            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                DataTable dtDetalle = Utilities.ConvertirDataTable.ToDataTable.Instance.toDataTable(captura.listaDetalle);

                return CargaPlanaBD.Instance.GuardaCapturaCargaPlana(dtDetalle, usuario.UsuarioID, CargaPlanaID, PlanaID, CerrarPlana, CuadrantePlanaSam2, CuadrantePlanaSam3);
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
        public object DescargaSpoolPlanaa(string token, int DetalleCargaID, int SpoolID, int CuadranteID, int CuadranteAnterior)
        {
            string payload = "";
            string newToken = "";

            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                return CargaPlanaBD.Instance.DescargaSpoolPlana(DetalleCargaID, SpoolID, CuadranteID, CuadranteAnterior, usuario.UsuarioID);
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
