using DatabaseManager.Constantes;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using static BackEndSAM.Models.ServiciosTecnicos.EditarRequisicion.EditarRequisicion;

namespace BackEndSAM.DataAcces.ServiciosTecnicos.EditarRequisicion
{
    public class EditarRequisicionBD
    {
        private static readonly object _mutex = new object();
        private static EditarRequisicionBD _instance;

        public static EditarRequisicionBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new EditarRequisicionBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerListadoElementos(string lenguaje, int RequisicionID, int TipoPruebaID, int ProyectoID, int Muestra)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<ElementosPorClasificacion> listaElementos = new List<ElementosPorClasificacion>();
                    List<Sam3_ST_Get_ElementosPorPrueba_Result> listaElementosCTX = ctx.Sam3_ST_Get_ElementosPorPrueba(lenguaje, ProyectoID, TipoPruebaID, RequisicionID, Muestra).ToList();

                    foreach (Sam3_ST_Get_ElementosPorPrueba_Result item in listaElementosCTX)
                    {
                        listaElementos.Add(new ElementosPorClasificacion
                        {
                            Accion = 2,
                            NumeroControl = item.NumeroControl,
                            EtiquetaJunta = item.EtiquetaJunta,
                            TipoJunta = item.TipoJunta,
                            NombreRequisicion = item.NombreRequisicion,
                            Cuadrante = item.Cuadrante,
                            Prioridad = item.Prioridad.GetValueOrDefault(),
                            Clasificacion = item.Clasificacion,
                            Diametro = item.Diametro,
                            Espesor = item.Espesor.GetValueOrDefault(),
                            Cedula = item.Cedula,
                            ElementoPorClasificacionPNDID = item.ElementoPorClasificacionPNDID,
                            Agregar = item.RequisicionID.GetValueOrDefault() > 0 ? true : false,
                            RequisicionID = item.RequisicionID.GetValueOrDefault(),
                            ProyectoID = item.ProyectoID,
                            SpoolID = item.SpoolID,
                            JuntaSpoolID = item.JuntaSpoolID,
                            OrdenTrabajoSpoolID = item.OrdenTrabajoSpoolID,
                            TipoPruebaID = item.TipoPruebaID.GetValueOrDefault(),
                            Especificacion = item.Especificacion
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

        public object InsertarNuevaRequisicion(DataTable dtDetalleRequisicion, int RequisicionID, string NombreRequisicion, int ProyectoID, int TipoPruebaID, string FechaRequisicion, string CodigoAsme, string Observacion, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                   
                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = {
                        { "@RequisicionID", RequisicionID.ToString() },
                        { "@NombreRequisicion", NombreRequisicion },
                        { "@ProyectoID", ProyectoID.ToString() },
                        { "@TipoPruebaID", TipoPruebaID.ToString() },
                        { "@FechaRequisicion", FechaRequisicion },
                        { "@CodigoAsme", CodigoAsme},
                        { "@Observacion", Observacion },
                        { "@UsuarioID", usuario.UsuarioID.ToString() },
                        { "@RequisicionOUTPUT", "0" } };

                    //int identityResult = _SQL.EjecutaInsertUpdate(Stords.GUARDARNUEVAREQUISICION, dtDetalleRequisicion, "@TTRequisicion", parametro);

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("Ok");

                    //if (identityResult > 0)
                        //result.ReturnMessage.Add(identityResult.ToString());

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