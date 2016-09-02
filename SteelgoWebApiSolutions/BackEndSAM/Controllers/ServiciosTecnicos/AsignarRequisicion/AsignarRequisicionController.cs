﻿using BackEndSAM.DataAcces.ServiciosTecnicos;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace BackEndSAM.Controllers.ServiciosTecnicos.AsignarRequisicion
{
    public class AsignarRequisicionController : ApiController
    {
        
        [HttpGet]
        public object GetAsignarRequisicion(string lenguaje, string token, string mostrar, int idPrueba, int proyectoID)
        {
            //Create a generic return object
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                int tipoVista = mostrar == "Todos" ? 1 : 2;

                return new object();// AsignarRequisicionBD.Instance.ObtenerRequisicionAsignacion(lenguaje, tipoVista, idPrueba, proyectoID);
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
