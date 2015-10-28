using BackEndSAM.Models.Inspeccion;
using System;
using System.Collections.Generic;
using System.Linq;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;

namespace BackEndSAM.DataAcces
{
    /// <summary>
    /// Clase que contiene funciones relacionadas con los avisos de Llegada 
    /// </summary>
    public class InspeccionBD
    {
        private static readonly object _mutex = new object();
        private static InspeccionBD _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private InspeccionBD()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static InspeccionBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new InspeccionBD();
                    }
                }
                return _instance;
            }
        }
        /// <summary>
        /// Obtiene el detalle de la junta con respecto  la inspeccion
        /// </summary>
        /// <param name="JsonCaptura"></param>
        /// <param name="usuario"></param>
        /// <param name="Lenguaje"></param>
        /// <returns></returns>
        public object ObtenerDetalleJunta(CapturaVisualDimensional.DetalleDatosJson JsonCaptura, Sam3_Usuario usuario, string Lenguaje)
        {

            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Inspeccion_Get_DetalleJunta_Result> listaDetalleDatosJson = ctx.Sam3_Inspeccion_Get_DetalleJunta(int.Parse(JsonCaptura.JuntaID),Lenguaje).ToList();
                    return listaDetalleDatosJson;
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
        /// Retorna el listado de numeros unicos ¿
        /// </summary>
        /// <param name="JsonCaptura"></param>
        /// <param name="usuario"></param>
        /// <returns></returns>
        public object listaNumeroUnicos(CapturaVisualDimensional.DetalleDatosJson JsonCaptura, Sam3_Usuario usuario)
        {

            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Armado_Get_MaterialesSpool_Result> listaDetallaTrabajoAdicionalJson = ctx.Sam3_Armado_Get_MaterialesSpool(int.Parse(JsonCaptura.JuntaID), 1).ToList();
                    return listaDetallaTrabajoAdicionalJson;
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