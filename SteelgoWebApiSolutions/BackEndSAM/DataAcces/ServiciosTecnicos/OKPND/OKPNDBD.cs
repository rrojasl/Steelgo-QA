using BackEndSAM.Models.ServiciosTecnicos.OKPND;
using BackEndSAM.Utilities.ConvertirDataTable;
using DatabaseManager.Constantes;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace BackEndSAM.DataAcces.ServiciosTecnicos.OKPND
{
    public class OKPNDBD
    {
        private static readonly object _mutex = new object();
        private static OKPNDBD _instance;

        public static OKPNDBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new OKPNDBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerListadoElementos(string lenguaje, int ProyectoID, string NumControl)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Elementos> listaElementos = new List<Elementos>();
                    List<Sam3_ST_OKPND_Get_Elementos_Result> listaElementosCTX = ctx.Sam3_ST_OKPND_Get_Elementos(lenguaje, ProyectoID, NumControl).ToList();

                    foreach (Sam3_ST_OKPND_Get_Elementos_Result item in listaElementosCTX)
                    {
                        listaElementos.Add(new Elementos
                        {
                            OKPNDID = item.OKPNDID.GetValueOrDefault(),
                            NumeroControl = item.NumeroControl,
                            Cuadrante = item.Cuadrante,
                            Prioridad = item.Prioridad.GetValueOrDefault(),

                            ProyectoID = item.ProyectoID,
                            SpoolID = item.SpoolID,
                            OrdenTrabajoSpoolID = item.OrdenTrabajoSpoolID,
                            OkPND = item.OKPND.GetValueOrDefault(),
                            Detalle = "Ver detalle"
                        });
                    }

                    return listaElementos;
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

        public object InsertarOKPND(DataTable dtListadoOK, string lenguaje, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    //ctx.Sam3_Armado_JuntaArmado()
                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = {
                        { "@UsuarioID", usuario.UsuarioID.ToString()},
                        { "@Lenguaje", lenguaje } };

                    _SQL.Ejecuta(Stords.OKPND, dtListadoOK, "@TTOKPND", parametro);

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

        public object actualizarOKPND(DataTable data, string lenguaje, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    object res = new object();

                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = {
                        { "@UsuarioID", usuario.UsuarioID.ToString()},
                        { "@Lenguaje", lenguaje } };

                    DataTable OKPND = _SQL.EjecutaDataAdapter(Stords.OKPNDMASIVO, data, "@TTOKPND", parametro);
                    return ToDataTable.table_to_csv(OKPND);
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
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