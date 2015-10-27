using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DatabaseManager.Sam3;
using DatabaseManager.EntidadesPersonalizadas;
using BackEndSAM.Utilities;
using System.Web.Script.Serialization;
using BackEndSAM.Models;
using SecurityManager.Api.Models;
using BackEndSAM.Utilities;
using System.Web.Mvc;
using System.Net.Http;
using System.Net;
using System.IO;
using System.Net.Http.Headers;

namespace BackEndSAM.DataAcces
{
    public class CapturasRapidasBd
    {
        private static readonly object _mutex = new object();
        private static CapturasRapidasBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private CapturasRapidasBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static CapturasRapidasBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new CapturasRapidasBd();
                    }
                }
                return _instance;
            }
        }
        /// <summary>
        /// obtiene la orden de trabajo con formato bueno y los spools que le corresponden
        /// </summary>
        /// <param name="ordentrabajo">Orden de trabajo</param>
        /// <param name="tipo">Tipo de ejecucion en el stord</param>
        /// <returns></returns>
        public object ObtenerIDOrdenTrabajo(string ordentrabajo, int tipo)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Steelgo_Get_SpoolID_Result> lista = ctx.Sam3_Steelgo_Get_SpoolID(tipo, ordentrabajo).ToList();
                    return lista;

                }
            }
            catch (Exception ex)
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }
        /// <summary>
        /// obtiene las juntas que tiene la orden de trabajo
        /// </summary>
        /// <param name="usuario">usuario</param>
        /// <param name="id">identificador de la Orden de trabajo Spool</param>
        /// <param name="sinCaptura">indica si retorna todas las juntas o solo las pendientes de capturar</param>
        /// <returns></returns>
        public object ObtenerJuntasXSpoolID(string id, int sinCaptura)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Steelgo_Get_JuntaSpool_Result> lista = ctx.Sam3_Steelgo_Get_JuntaSpool(sinCaptura, int.Parse(id)).ToList();
                    return lista;
                }
            }
            catch (Exception ex)
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;
                return result;
            }
        }
    }
}