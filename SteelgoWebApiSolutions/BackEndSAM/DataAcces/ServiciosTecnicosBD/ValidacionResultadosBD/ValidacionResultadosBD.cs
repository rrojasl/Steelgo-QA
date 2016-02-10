using BackEndSAM.Models.ServiciosTecnicos.ValidacionResultados;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.ServiciosTecnicosBD.ValidacionResultadosBD
{
    public class ValidacionResultadosBD
    {

        private static readonly object _mutex = new object();
        private static ValidacionResultadosBD _instance;


        public static ValidacionResultadosBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new ValidacionResultadosBD();
                    }
                }
                return _instance;
            }
        }


        public object getListadoJuntas(string requisicionID, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ServiciosTecnicos_Get_JuntasValidarReporteValidacionResultados_Result> result = ctx.Sam3_ServiciosTecnicos_Get_JuntasValidarReporteValidacionResultados(requisicionID, lenguaje).ToList();
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

        public object getListadoDefectos(string lenguaje, string tipoPrueba)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Steelgo_Get_Defectos_Result> result = ctx.Sam3_Steelgo_Get_Defectos(lenguaje,tipoPrueba).ToList();
                    List<RazonesRechazo> lista = new List<RazonesRechazo>();
                    foreach(Sam3_Steelgo_Get_Defectos_Result item in result)
                    {
                        RazonesRechazo objeto = new RazonesRechazo {
                            DefectoID = item.DefectoID,
                            Nombre = item.Nombre
                        };
                        lista.Add(objeto);
                    }
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


        public object getListadoDetalleDefectos(int pruebaElementoResultadoID, string tipoPrueba, string lenguaje, int requisicionID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ServiciosTecnicos_Get_RequisicionDetalle_Result> listaTipoPrueba = (List<Sam3_ServiciosTecnicos_Get_RequisicionDetalle_Result>)ValidacionResultadosBD.Instance.getListadoTipoPrueba(requisicionID,lenguaje);

                    foreach (Sam3_ServiciosTecnicos_Get_RequisicionDetalle_Result item in listaTipoPrueba)
                    {
                        tipoPrueba = item.NombrePrueba;
                    }

                    List<Sam3_ServiciosTecnicos_Get_DefectosEditarValidacionResultados_Result> result = ctx.Sam3_ServiciosTecnicos_Get_DefectosEditarValidacionResultados(pruebaElementoResultadoID).ToList();
                    List<DetalleDefectos> lista = new List<DetalleDefectos>();
                    foreach (Sam3_ServiciosTecnicos_Get_DefectosEditarValidacionResultados_Result item in result)
                    {
                        DetalleDefectos objeto = new DetalleDefectos
                        {
                            PruebaElementoDefectoID = item.PruebaElementoDefectoID,
                            Accion = 2,
                            DefectoID = item.DefectoID == null ? 0: int.Parse( item.DefectoID.ToString()),
                            Nombre = item.Nombre,
                            InicioDefecto = item.InicioDefecto,
                            FinDefecto = item.FinDefecto,
                            PruebaElementoResultadoID = int.Parse( item.PruebaElementoResultadoID.ToString()),
                            Defectos = (List<RazonesRechazo>)ValidacionResultadosBD.Instance.getListadoDefectos(lenguaje, tipoPrueba)
                        };
                        lista.Add(objeto);
                    }
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

        public object getRenglonEditar(int requisicionID, string ubicacion)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ServiciosTecnicos_Get_ValidacionResultadosDetalle_Result> result = ctx.Sam3_ServiciosTecnicos_Get_ValidacionResultadosDetalle(requisicionID,ubicacion).ToList();
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


        public object getListadoTipoPrueba(int requisicionID,string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ServiciosTecnicos_Get_RequisicionDetalle_Result> result = ctx.Sam3_ServiciosTecnicos_Get_RequisicionDetalle(requisicionID,lenguaje).ToList();
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




        public object InsertarValidarRequisicion(DataTable dtDetalleRequisicion, Sam3_Usuario usuario, string lenguaje, int RequisicionID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    //ctx.Sam3_Armado_JuntaArmado()
                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = { { "@Usuario", usuario.UsuarioID.ToString() }, { "@Lenguaje", lenguaje }, { "@RequisicionID",RequisicionID.ToString() } };
                    _SQL.Ejecuta(Stords.GUARDARVALIDACIONRESULTADOS, dtDetalleRequisicion, "@Tabla", parametro);

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("Ok");
                    result.ReturnMessage.Add("xd");
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


        public object InsertarDefectos(DataTable dtDetalleDefectos, Sam3_Usuario usuario, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    //ctx.Sam3_Armado_JuntaArmado()
                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = { { "@Usuario", usuario.UsuarioID.ToString() }, { "@Lenguaje", lenguaje } };
                    _SQL.Ejecuta(Stords.GUARDARDEFECTOSVALIDACIONRESULTADOS, dtDetalleDefectos, "@Tabla", parametro);

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("Ok");
                    result.ReturnMessage.Add("xd");
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