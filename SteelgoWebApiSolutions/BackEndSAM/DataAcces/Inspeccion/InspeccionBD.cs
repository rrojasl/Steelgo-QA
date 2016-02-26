using BackEndSAM.Models.Inspeccion;
using System;
using System.Collections.Generic;
using System.Linq;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System.Data;

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

                    List<Sam3_Inspeccion_Get_DetalleJunta_Result> listaDetalleDatosJson = ctx.Sam3_Inspeccion_Get_DetalleJunta(int.Parse(JsonCaptura.OrdenTrabajoSpoolID), Lenguaje).ToList();
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
        /// Obtiene el detalle de la junta con respecto  la inspeccion
        /// </summary>
        /// <param name="JsonCaptura"></param>
        /// <param name="usuario"></param>
        /// <param name="Lenguaje"></param>
        /// <returns></returns>
        public object ObtenerDetalleJunta(string OrdenTrabajoSpoolID, Sam3_Usuario usuario, string Lenguaje)
        {

            try
            {
                using (SamContext ctx = new SamContext())
                {

                    List<Sam3_Inspeccion_Get_DetalleJunta_Result> listaDetalleDatosJson = ctx.Sam3_Inspeccion_Get_DetalleJunta(int.Parse(OrdenTrabajoSpoolID), Lenguaje).ToList();
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
        /// Obtiene el detalle de las juntas seleccionadas con respecto a  la inspeccion
        /// </summary>
        /// <param name="JsonCaptura"></param>
        /// <param name="usuario"></param>
        /// <param name="Lenguaje"></param>
        /// <returns></returns>
        public object ObtenerDetalleJuntaSeleccionada(string OrdenTrabajoSpoolID,int defectoID, Sam3_Usuario usuario, string Lenguaje)
        {

            try
            {
                using (SamContext ctx = new SamContext())
                {

                    List<int?> listaDetalleDatosSeleciconadoJson = ctx.Sam3_Inspeccion_Get_DetalleJuntaSeleccionada(int.Parse(OrdenTrabajoSpoolID), Lenguaje, defectoID).ToList();
                    return listaDetalleDatosSeleciconadoJson;
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
        public object listaNumeroUnicos(int JuntaSpoolID, Sam3_Usuario usuario,int pagina)
        {

            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Armado_Get_MaterialesSpool_Result> listaDetallaTrabajoAdicionalJson = ctx.Sam3_Armado_Get_MaterialesSpool(JuntaSpoolID, 1,pagina).ToList();
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



        public object InsertarCapturaInspeccion(DataTable dtDetalleCaptura,DataTable dtJuntaLista, int usuario, string lenguaje, int inspeccionDimensionalID, int ordenTrabajoSpoolID, string fechaInspeccion, int resultadoID, int obreroID, int defectoID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    // ctx.Sam3_Armado_JuntaArmado()
                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = {
                        { "@Usuario", usuario.ToString() },
                        { "@Lenguaje", lenguaje },
                        { "@InspeccionDimensionalID", inspeccionDimensionalID.ToString() },
                        { "@OrdenTrabajoSpoolID", ordenTrabajoSpoolID.ToString() },
                        { "@FechaInspeccion", fechaInspeccion.Trim() },
                        { "@ResultadoID", resultadoID.ToString() },
                        { "@ObreroID", obreroID.ToString() },
                        { "@DefectoID", defectoID.ToString() }
                       
                    };
                    _SQL.Ejecuta(Stords.GUARDARCAPTURAINSPECCIONVISUALDIMENSIONAL, dtDetalleCaptura, "@Inspeccion", dtJuntaLista, "@juntas", parametro);


                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("Ok");
                   
                    result.ReturnCode = 200;
                    result.ReturnStatus = true;
                    result.IsAuthenicated = true;

                    return result;
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