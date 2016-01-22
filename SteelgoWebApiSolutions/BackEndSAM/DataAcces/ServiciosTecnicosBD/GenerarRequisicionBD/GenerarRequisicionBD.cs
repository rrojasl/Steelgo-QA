using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Core.Objects;
using System.Linq;

namespace BackEndSAM.DataAcces
{
    public class GenerarRequisicionBD
    {
        private static readonly object _mutex = new object();
        private static GenerarRequisicionBD _instance;


        public static GenerarRequisicionBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new GenerarRequisicionBD();
                    }
                }
                return _instance;
            }
        }

        public object getRequisicion(string lenguaje, int requisicionID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ServiciosTecnicos_Get_Requisicion_Result> result = ctx.Sam3_ServiciosTecnicos_Get_Requisicion(lenguaje,requisicionID).ToList();
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

        public object getNuevaJunta(int juntaTrabajoID, int pruebaID, int proyectoID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ServiciosTecnicos_Get_JuntasXPruebaNuevo_Result> result = ctx.Sam3_ServiciosTecnicos_Get_JuntasXPruebaNuevo(juntaTrabajoID,pruebaID,proyectoID).ToList();
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

        public object getPruebaProyectoID(int pruebaID, int requisicionID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ObjectResult<int?> result = ctx.Sam3_Steelgo_Get_PruebaProyectoID(pruebaID, requisicionID);
                    int ret = int.Parse( result.FirstOrDefault().Value.ToString());
                    return ret;
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

        public object getListaTipoPrueba(string lenguaje, int proyectoID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_SteelGo_Get_Pruebas_Result> result = ctx.Sam3_SteelGo_Get_Pruebas(proyectoID, lenguaje).ToList();
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

        public object getListaProyectos()
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_SteelGo_Get_Proyectos_Result> result = ctx.Sam3_SteelGo_Get_Proyectos().ToList();
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

        public object getJuntaApta(int todos, int ordenTrabajoSpoolID, int proceso)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Steelgo_Get_JuntaSpool_Result> result = ctx.Sam3_Steelgo_Get_JuntaSpool(todos,ordenTrabajoSpoolID,proceso).ToList();
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

        public List<Sam3_ServiciosTecnicos_Get_JuntasXPrueba_Result> getDetalleJuntas(int pruebaID, int todos,int reqID)
        {
            List<Sam3_ServiciosTecnicos_Get_JuntasXPrueba_Result> listaResult = null;
            try
            {
                using (SamContext ctx = new SamContext())
                {
                     listaResult = ctx.Sam3_ServiciosTecnicos_Get_JuntasXPrueba(pruebaID,todos, reqID).ToList();
                    return listaResult;
                }
            }
            catch (Exception ex)
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;
                return listaResult;
            }
        }
        public object getListaClasificaciones(int pruebaProyectoID, string lenguaje)
            {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Steelgo_Get_Calsificaciones_Result> listaResult = ctx.Sam3_Steelgo_Get_Calsificaciones(pruebaProyectoID, lenguaje).ToList();
                    return listaResult;
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

        public object ObtenerValorFecha(Sam3_Usuario usuario, string lenguaje, int idCampoPredeterminado)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    var oMyString = new ObjectParameter("Retorna", typeof(string));
                    var result = ctx.Sam3_Steelgo_Get_CampoPredeterminado(idCampoPredeterminado, lenguaje, oMyString);
                    var data = oMyString.Value.ToString();

                    //ObjectParameter objectParameter = new ObjectParameter("Retorna", typeof(String));


                    return data;
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

        public object InsertarGenerarRequisicion(DataTable dtDetalleRequisicion, Sam3_Usuario usuario, string lenguaje, int requisicionID, string folio, int pruebasID, string fechaRequisicion, string observacion, int estatusID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    //ctx.Sam3_Armado_JuntaArmado()
                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = { { "@Usuario", usuario.UsuarioID.ToString() }, { "@Lenguaje", lenguaje }, { "@RequisicionID",requisicionID.ToString() } , {"@Folio",folio }, {"@PruebasProyectoID",pruebasID.ToString() }, { "@FechaRequisicion",fechaRequisicion.Trim() }, { "@Observacion", observacion==null?"": observacion }, { "@EstatusID",estatusID.ToString() } };
                    DataTable dt = _SQL.Tabla(Stords.GUARDARGENERARREQUISICICION, dtDetalleRequisicion, "@Tabla", parametro);

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("Ok"+"|"+dt.Rows[0][0].ToString());
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