﻿using BackEndSAM.DataAcces.Pintura.SistemaPintura;
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
using BackEndSAM.Models.Pintura.SistemaPintura;

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

                return SistemaPinturaBD.Instance.ObtenerSistemaPinturaNuevo(Lenguaje,SistemaPinturaID,ProyectoID);
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
        public object GuardarCaptura(DetalleGuardarCaptura Captura, string token, string lenguaje)
        {
            string payload = "";
            string newToken = "";

            JavaScriptSerializer serializer = new JavaScriptSerializer();
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                DataTable dataTablePruebasProceso = null;
                DataTable dtDetalleSPNuevo = Utilities.ConvertirDataTable.ToDataTable.Instance.toDataTable(Captura.Detalles[0].ListaSPNuevo);
                DataTable dtDetalleSPColor = Captura.Detalles[0].ListaSPColor==null ? null: Utilities.ConvertirDataTable.ToDataTable.Instance.toDataTable(Captura.Detalles[0].ListaSPColor);
                DataTable dtDetalleSPProyecto = Utilities.ConvertirDataTable.ToDataTable.Instance.toDataTable(Captura.Detalles[0].ListaSPProyecto);
                DataTable dtDetalleProyectoProceso = Captura.Detalles[0].ListaSPProyectoProceso == null ? null : Utilities.ConvertirDataTable.ToDataTable.Instance.toDataTable(Captura.Detalles[0].ListaSPProyectoProceso);

                if (Captura.Detalles[0].ListaSPProyectoProceso != null)
                {
                    foreach (SPProyectoProceso item in Captura.Detalles[0].ListaSPProyectoProceso)
                    {
                        if (item.ListadoPruebas != null)
                        {
                            if (dataTablePruebasProceso == null)
                                dataTablePruebasProceso = Utilities.ConvertirDataTable.ToDataTable.Instance.toDataTable(item.ListadoPruebas);
                            else
                                dataTablePruebasProceso.Merge(Utilities.ConvertirDataTable.ToDataTable.Instance.toDataTable(item.ListadoPruebas));
                        }
                    }
                    dtDetalleProyectoProceso.Columns.Remove("ListadoPruebas");
                }

              

                return SistemaPinturaBD.Instance.CrearNuevoSistemaPintura(dtDetalleSPNuevo, dtDetalleSPColor, dtDetalleSPProyecto, dtDetalleProyectoProceso, dataTablePruebasProceso, lenguaje, usuario.UsuarioID);

                //null;// AsignarRequisicionBD.Instance.InsertarCaptura(dtDetalle, usuario, lenguaje);
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
        public object ComprobarExistente(Existencia listaExistencia, string token, string lenguaje, int comprobar)
        {
            string payload = "";
            string newToken = "";

            JavaScriptSerializer serializer = new JavaScriptSerializer();


            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                DataTable dtDetalle = Utilities.ConvertirDataTable.ToDataTable.Instance.toDataTable(listaExistencia.Detalles);
                return SistemaPinturaBD.Instance.RevisaSistemaCaptura(dtDetalle, lenguaje);
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
