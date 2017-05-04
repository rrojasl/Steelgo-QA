using BackEndSAM.Models.Sam3General.OK;
using BackEndSAM.Utilities.ConvertirDataTable;
using DatabaseManager.Constantes;
using DatabaseManager.Sam2;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace BackEndSAM.DataAcces.Sam3General.OK
{
    public class OKDB
    {
        private static readonly object _mutex = new object();
        private static OKDB _Instance;
        public static OKDB Instance
        {
            get
            {
                lock (_mutex)
                {
                    if(_Instance == null)
                    {
                        _Instance = new OKDB();
                    }
                }
                return _Instance;
            }
        }

        public object ObtenerNumeroElementosOK(int? ProyectoID, string NumControl, int? Muestra)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {                    
                    ObjectResult<int?> elementos = ctx.Sam3_Steelgo_OK_GET_NumeroElementosOK(ProyectoID, NumControl, Muestra);                    
                    var valor = elementos.Where(x => x.HasValue).Select(x => x.Value).ToList()[0];
                    return valor;
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

        public object ObtenerListaElementos(string Lenguaje, int ProyectoID, string NumControl, int Muestra, int OPC)
        {
            try
            {
                using(SamContext ctx = new SamContext())
                {
                    List<ElementosOK> ListaElementos = new List<ElementosOK>();
                    List<Sam3_Steelgo_OK_GET_ElementosOK_Result> ListaElementosOK = ctx.Sam3_Steelgo_OK_GET_ElementosOK(Lenguaje, ProyectoID, NumControl, Muestra, OPC).ToList();
                    foreach (Sam3_Steelgo_OK_GET_ElementosOK_Result item in ListaElementosOK)                    
                    {                        
                        ListaElementos.Add(new ElementosOK
                        {
                            SpoolWorkStatusID = item.SpoolWorkStatusID,
                            NumeroControl = item.NumeroControl,
                            Cuadrante = item.Cuadrante,
                            Prioridad = item.Prioridad.GetValueOrDefault(),
                            ProyectoID = item.ProyectoID,
                            SpoolID = item.SpoolID,
                            OrdenTrabajoSpoolID = item.OrdenTrabajoSpoolID,
                            OK = item.OkPND.Value,
                            Coincide = Convert.ToInt32(item.Coincide),
                            //ListaDetalle = ObtenerDetallesElementosOK(Lenguaje, item.SpoolID),
                            Detalle = Lenguaje == "es-MX" ? "Ver Detalle" : "See Details"
                        });                        
                    }
                    return ListaElementos;
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


        public List<Detalle> ObtenerDetallesElementosOK(string Lenguaje, int SpoolID)
        {
            try
            {
                using(SamContext ctx = new SamContext())
                {
                    List<Detalle> ListaDetalles = new List<Detalle>();                    
                    List<Sam3_Steelgo_OK_GET_DetallesElementosOK_Result> ListaDetallesOK = ctx.Sam3_Steelgo_OK_GET_DetallesElementosOK(SpoolID).ToList();
                    foreach (Sam3_Steelgo_OK_GET_DetallesElementosOK_Result item in ListaDetallesOK)
                    {                                                
                        ListaDetalles.Add(new Detalle {
                            JuntaSpoolID = item.JuntaSpoolID,
                            Etiqueta = item.Etiqueta,
                            Cedula = item.Cedula,
                            Codigo = item.Codigo,
                            Diametro = item.Diametro,
                            Espesor = item.Espesor,
                            Nombre = item.Nombre,
                            TipoPrueba = item.TipoPrueba,
                            NumeroRequisicion = item.NumeroRequisicion
                        });
                    }
                    return ListaDetalles;
                }
            }
            catch (Exception ex)
            {
                List<Detalle> result = null;
                return result;
            }
        }
        public object InsertarOK(DataTable dtLista, string Lenguaje, Sam3_Usuario Usuario, int ProyectoID, int OPC)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] Parametros =
                    {
                        { "@UsuarioID", Usuario.UsuarioID.ToString() },
                        { "@Lenguaje",  Lenguaje },
                        { "@ProyectoID", ProyectoID.ToString() },
                        { "@OPC",       OPC.ToString() }
                    };
                    _SQL.Ejecuta(Stords.STEELGO_SET_OK, dtLista, "@TTOK", Parametros);
                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("OK");
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

        public object actualizarOKMasivo(DataTable Data, int ProyectoID, string lenguaje, Sam3_Usuario usuario, int OPC)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    object res = new object();
                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = {
                        { "@ProyectoID", ProyectoID.ToString()},
                        { "@UsuarioID", usuario.UsuarioID.ToString()},
                        { "@Lenguaje", lenguaje },
                        { "@OPC", OPC.ToString() }

                    };
                        DataTable OKPND = _SQL.EjecutaDataAdapter(Stords.STEELGO_SET_OK_MASIVO, Data, "@TTOK", parametro);
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