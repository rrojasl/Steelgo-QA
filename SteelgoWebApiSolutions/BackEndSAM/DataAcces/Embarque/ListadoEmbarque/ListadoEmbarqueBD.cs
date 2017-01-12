using BackEndSAM.DataAcces.Sam3General.OpcionValidacion;
using BackEndSAM.Models.Embarque.ListadoEmbarque;
using BackEndSAM.Models.Sam3General.OpcionValidacion;
using DatabaseManager.Constantes;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.Embarque.ListadoEmbarque
{
    public class ListadoEmbarqueBD
    {
        private static readonly object _mutex = new object();
        private static ListadoEmbarqueBD _instance;

        public static ListadoEmbarqueBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new ListadoEmbarqueBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerListaDestinos(int ProyectoID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Embarque_LE_Get_ListadoDestinos_Result> result = ctx.Sam3_Embarque_LE_Get_ListadoDestinos(ProyectoID).ToList();
                    List<ListadoDestino> listaDetalle = new List<ListadoDestino>();
                    listaDetalle.Add(new ListadoDestino());

                    foreach (Sam3_Embarque_LE_Get_ListadoDestinos_Result item in result)
                    {
                        listaDetalle.Add(new ListadoDestino {
                            DestinoID = item.DestinoID,
                            Destino = item.Nombre
                        });
                    }

                    return listaDetalle;
                }

            }catch(Exception ex)
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object ObtenerDetalleListado(string Lenguaje, int EstatusEmbarque, int UsuarioID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<DetalleOpcionValidacion> listado = (List<DetalleOpcionValidacion>)OpcionValidacionBD.Instance.ObtenerListaOpcionValidacion(Lenguaje);

                    List<Sam3_Embarque_LE_Get_ListadoEmbarque_Result> result = ctx.Sam3_Embarque_LE_Get_ListadoEmbarque(Lenguaje , EstatusEmbarque, UsuarioID).ToList();
                    List<DetalleListadoEmbarque> listaDetalle = new List<DetalleListadoEmbarque>();

                    foreach (Sam3_Embarque_LE_Get_ListadoEmbarque_Result item in result)
                    {
                        listaDetalle.Add(new DetalleListadoEmbarque
                        {
                            listaDestino = (List<ListadoDestino>)ListadoEmbarqueBD.Instance.ObtenerListaDestinos(item.ProyectoID.GetValueOrDefault()),
                            EmbarqueID = item.EmbarqueID,
                            Embarque = item.Embarque,
                            EstatusEmbarqueID = item.EmbarqueEstatusID,
                            ProyectoID = item.ProyectoID.GetValueOrDefault(),
                            Proyecto = item.Proyecto,
                            Planas = item.Planas,
                            DestinoAntID = item.DestinoID,
                            DestinoID = item.DestinoID,
                            Destino = item.Destino,
                            SolicitudPermisoAnt = item.SolicitudPermiso,
                            FolioSolicitudPermiso = item.RequiereAduana.GetValueOrDefault()?item.SolicitudPermiso:"NA",
                            FechaSolicitudAnt = item.FechaPermiso.ToString(),
                            FechaSolicitudPermiso = item.RequiereAduana.GetValueOrDefault() ? item.FechaPermiso.ToString() : "NA",
                            RequierePapCliente = item.RequierePapCliente.GetValueOrDefault(),
                            RequierePermisoAduana = item.RequiereAduana.GetValueOrDefault(),
                            RequiereRevisionCliente = item.RequiereRevisionCliente.GetValueOrDefault(),
                            OkClienteAnt = item.OkCliente,
                            OkCliente = item.OkCliente,
                            AprobadoAduanaAnt = item.AprobadoAduana.GetValueOrDefault(),
                            AprobadoAduana = item.RequiereAduana.GetValueOrDefault() ? item.AprobadoAduana.GetValueOrDefault() : 1,
                            AprobadoAduanaDesc = item.RequiereAduana.GetValueOrDefault() ? item.AprobadoAduanaDesc : "NA",
                            OkEmbarqueAnt = item.OkEmbarque,
                            OkEmbarque = item.OkEmbarque,
                            Enviar = item.AprobadoAduana == 1 && item.OkCliente && item.OkEmbarque && item.EmbarqueEstatusID != 2 ? true : false,
                            CapturaEnvioID = item.CapturaEnvioID.GetValueOrDefault(),
                            ModificadoPorUsuario = false,
                            RowOk = true,
                            listaEstatus = listado
                        });
                    }
                    return listaDetalle;
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

        public object ObtenerElementosPorEstatus(string lenguaje, int UsuarioID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Embarque_LE_Get_ElementosPorEstatus_Result> result = ctx.Sam3_Embarque_LE_Get_ElementosPorEstatus(lenguaje, UsuarioID).ToList();
                    List<ElementosPorStatus> listaDetalle = new List<ElementosPorStatus>();

                    foreach (Sam3_Embarque_LE_Get_ElementosPorEstatus_Result item in result)
                    {
                        listaDetalle.Add(new ElementosPorStatus
                        {
                            Pendientes = item.Pendientes.GetValueOrDefault(),
                            Transito = item.Transito.GetValueOrDefault()
                        });
                    }
                    return listaDetalle;
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

        public object GuardarCaptura(int UsuarioID, string Lenguaje, DataTable dtDetalle)
        {
            try
            {
                ObjetosSQL _SQL = new ObjetosSQL();
                string[,] parametros = { { "@UsuarioID", UsuarioID.ToString() }, { "@Lenguaje", Lenguaje } };

               _SQL.Ejecuta(Stords.GUARDARCAPTURALISTADOEMBARQUE, dtDetalle, "@TTEmbarqueListado", parametros);

                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add("Ok");
                result.ReturnCode = 200;
                result.ReturnStatus = true;
                result.IsAuthenicated = true;

                return result;
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

        public object GuardarEnvioEmbarque(int UsuarioID, string Lenguaje, int EmbarqueID, string NumeroEmbarque, string NumeroEmbarqueCliente, string FechaEnvio, int ProyectoID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ctx.Sam3_Embarque_LE_GuardarEnvio(UsuarioID, Lenguaje, EmbarqueID, NumeroEmbarque, NumeroEmbarqueCliente, FechaEnvio, ProyectoID);

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