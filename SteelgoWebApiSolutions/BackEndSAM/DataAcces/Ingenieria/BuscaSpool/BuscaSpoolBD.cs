using BackEndSAM.Models.Ingenieria.BuscaSpool;
using DatabaseManager.Constantes;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.Ingenieria.BuscaSpool
{
    public class BuscaSpoolBD
    {
        private static readonly object _mutex = new object();
        private static BuscaSpoolBD _instance;

        public static BuscaSpoolBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new BuscaSpoolBD();
                    }
                }

                return _instance;
            }
        }

        public object ObtieneListadoTipoSalida()
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Ingenieria_Get_ListadoTipoSalida_Result> result = ctx.Sam3_Ingenieria_Get_ListadoTipoSalida().ToList();
                    List<DetalleTipoSalida> listaDetalle = new List<DetalleTipoSalida>();
                    listaDetalle.Add(new DetalleTipoSalida());

                    foreach (Sam3_Ingenieria_Get_ListadoTipoSalida_Result item in result)
                    {
                        listaDetalle.Add(new DetalleTipoSalida {
                            TipoSalidaID = item.TipoSalidaID,
                            Nombre = item.Nombre
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

        public object ObtieneListadoTipoCorte()
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Steelgo_Get_TipoCorte_Result> result = ctx.Sam3_Steelgo_Get_TipoCorte().ToList();
                    List<ListaTipoCorte> listaDetalle = new List<ListaTipoCorte>();
                    listaDetalle.Add(new ListaTipoCorte());

                    foreach (Sam3_Steelgo_Get_TipoCorte_Result item in result)
                    {
                        listaDetalle.Add(new ListaTipoCorte
                        {
                            TipoCorteID = item.TipoCorteID,
                            Nombre = item.Nombre
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

        public object ObtieneListadoSpool(int ProyectoID, string SpoolContiene)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Ingenieria_Get_ListadoSpool_Result> result = ctx.Sam3_Ingenieria_Get_ListadoSpool(ProyectoID, SpoolContiene).ToList();
                    List<ListaSpool> listaDetalle = new List<ListaSpool>();
                    listaDetalle.Add(new ListaSpool());

                    foreach (Sam3_Ingenieria_Get_ListadoSpool_Result item in result)
                    {
                        listaDetalle.Add(new ListaSpool
                        {
                            SpoolID = item.SpoolID,
                            Nombre = item.Nombre
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

        public object ObtieneListadoJuntaSpool(int SpoolID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Ingenieria_Get_ListadoJuntaSpool_Result> result = ctx.Sam3_Ingenieria_Get_ListadoJuntaSpool(SpoolID).ToList();
                    List<ListaJuntaSpool> listaDetalle = new List<ListaJuntaSpool>();
                    listaDetalle.Add(new ListaJuntaSpool());

                    foreach (Sam3_Ingenieria_Get_ListadoJuntaSpool_Result item in result)
                    {
                        listaDetalle.Add(new ListaJuntaSpool
                        {
                            JuntaSpoolID = item.JuntaSpoolID,
                            Etiqueta = item.Etiqueta
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


        public object ObtieneDetalleMaterialSpool(int SpoolID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Ingenieria_Get_MaterialSpool_Result> result = ctx.Sam3_Ingenieria_Get_MaterialSpool(SpoolID).ToList();
                    List<DetalleMaterialSpool> listaDetalle = new List<DetalleMaterialSpool>();

                    foreach (Sam3_Ingenieria_Get_MaterialSpool_Result item in result)
                    {
                        listaDetalle.Add(new DetalleMaterialSpool
                        {
                            MaterialSpoolID = item.MaterialSpoolID,
                            ItemCodeID = item.ItemCodeID,
                            Etiqueta = item.Etiqueta,
                            Diametro1 = item.Diametro1,
                            Diametro2 = item.Diametro2,
                            DescripcionMaterial = item.DescripcionMaterial,
                            Codigo = item.Codigo
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

        public object ObtieneDetalleSpool(int UsuarioID, int ProyectoID, string Spool)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_Ingenieria_Get_DetalleSpool_Result result = ctx.Sam3_Ingenieria_Get_DetalleSpool(UsuarioID, ProyectoID, Spool).SingleOrDefault();
                    DetalleSpool listaDetalle = null;

                    if (result != null)
                    {
                        listaDetalle = new DetalleSpool {
                            SpoolID = result.SpoolID,
                            NombreSpool = result.Nombre,
                            ProyectoID = result.ProyectoID,
                            RevisionCliente = result.RevisionCliente,
                            RevisionSteelgo = result.RevisionSteelgo,
                            FamiliarAcero1ID = result.FamiliaAcero1ID,
                            FamiliarAcero2ID = result.FamiliaAcero2ID,
                            Especificacion = result.Especificacion,
                            SistemaPintura = result.SistemaPintura,
                            ColorPintura = result.ColorPintura,
                            PDI = result.PDI,
                            Acero1 = result.Acero1,
                            Acero2 = result.Acero2
                        };
                        

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

        public object ObtieneDetalleJuntaSpool(int JuntaSpoolID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Ingenieria_Get_DetalleJuntaSpool_Result> result = ctx.Sam3_Ingenieria_Get_DetalleJuntaSpool(JuntaSpoolID).ToList();
                    List<DetalleJuntaSpool> listaDetalle = new List<DetalleJuntaSpool>();

                    foreach (Sam3_Ingenieria_Get_DetalleJuntaSpool_Result item in result)
                    {
                        listaDetalle.Add(new DetalleJuntaSpool {
                            JuntaSpoolID = item.JuntaSpoolID,
                            TipoJuntaID = item.TipoJuntaID,
                            TipoJunta = item.TipoJunta,
                            Cedula = item.Cedula,
                            FamiliaAceroMaterial1ID = item.FamiliaAceroMaterial1ID,
                            FamiliaAceroMaterial1 = item.FamiliAcero1,
                            FamiliaAceroMaterial2ID = item.FamiliaAceroMaterial2ID,
                            FamiliaAceroMaterial2 = item.FamiliAcero2,
                            Diametro = item.Diametro
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

        public object ObtieneDetalleAgrupadoSalidaLoop(int DetalleSalidaID, int SpoolID, int ProyectoSpoolID, int ProyectoSoporteID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<DetalleTipoSalida> listaTipoSalida = (List<DetalleTipoSalida>)ObtieneListadoTipoSalida();
                    List<ListaTipoCorte> listaTipoCorte = (List<ListaTipoCorte>)ObtieneListadoTipoCorte();
                    List<DetalleMaterialSpool> listaMaterialSpool = (List<DetalleMaterialSpool>)ObtieneDetalleMaterialSpool(SpoolID);
                    List<ListaJuntaSpool> listaJuntaSpool = (List<ListaJuntaSpool>)ObtieneListadoJuntaSpool(SpoolID);
                    List<ListaSpool> listaSpool = (List<ListaSpool>)ObtieneListadoSpool(ProyectoSpoolID, "NG-121");
                    List<ListaSpool> listaSpoolSoporte = (List<ListaSpool>)ObtieneListadoSpool(ProyectoSoporteID, "11-PG");

                    List<Sam3_Ingenieria_Get_DetalleAgrupadoSalidas_Result> result = ctx.Sam3_Ingenieria_Get_DetalleAgrupadoSalidas(DetalleSalidaID).ToList();
                    List<DetalleAgrupadoSalidasConsulta> listaDetalle = new List<DetalleAgrupadoSalidasConsulta>();

                    foreach (Sam3_Ingenieria_Get_DetalleAgrupadoSalidas_Result item in result)
                    {
                        listaDetalle.Add(new DetalleAgrupadoSalidasConsulta {
                            Salidas_AgrupadoID = item.Salidas_AgrupadoID,
                            Detalle_SalidasID = item.Detalle_SalidasID,
                            PosicionSalida = item.PosicionSalida,
                            ClaveSalida = item.ClaveSalida,
                            PosicionSalidaPadre = item.PosicionSalidaPadre,
                            ClaveSalidaPadre = item.ClaveSalidaPadre,
                            Salidas_AgrupadoID_Padre = item.Salidas_AgrupadoID_Padre,
                            Nivel = item.Nivel,
                            TipoSalidaID = item.TipoSalidaID,
                            TipoSalida = item.TipoSalida,
                            MaterialSpoolID = item.MaterialSpoolID,
                            ItemCode = item.ItemCode,
                            ItemCodeID = item.ItemCodeID,
                            SpoolItemCodeID = item.SpoolItemCodeID,
                            SpoolItemCode = item.SpoolItemCode,
                            MaterialItemCodeID = item.MaterialItemCodeID,
                            MaterialItemCode = item.MaterialItemCode,
                            JuntaSpoolID = item.JuntaSpoolID,
                            Etiqueta = item.Etiqueta,
                            TipoJuntaID = item.TipoJuntaID,
                            TipoJunta = item.TipoJunta,
                            Cedula = item.Cedula,
                            FamiliaAceroMaterial1ID = item.FamiliaAceroMaterial1ID,
                            FamiliaAceroMaterial1 = item.FamiliaAceroMaterial1,
                            FamiliaAceroMaterial2ID = item.FamiliaAceroMaterial2ID,
                            FamiliaAceroMaterial2 = item.FamiliaAceroMaterial2,
                            Diametro = item.Diametro,
                            TipoCorte1ID = item.TipoCorte1ID,
                            TipoCorte1 = item.TipoCorte1,
                            TipoCorte2ID = item.TipoCorte2ID,
                            TipoCorte2 = item.TipoCorte2,
                            Cantidad = item.Cantidad,
                            TipoSalidaLista = listaTipoSalida,
                            DetalleMaterialSpoolLista = listaMaterialSpool,
                            SpoolItemCodeLista = listaSpool,
                            SpoolItemCodeListaSoporte = listaSpoolSoporte,
                            ItemCodeLista = listaMaterialSpool,
                            DetalleJuntaSpoolLista = listaJuntaSpool,
                            TipoCorte1Lista = listaTipoCorte,
                            TipoCorte2Lista = listaTipoCorte
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

        public object ObtieneDetalleSalidaLoop(int LoopID, int ProyectoSpoolID, int ProyectoSoporteID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Ingenieria_Get_DetalleSalidaLoop_Result> result = ctx.Sam3_Ingenieria_Get_DetalleSalidaLoop(LoopID).ToList();
                    List<DetalleSalidasConsulta> listaDetalleSalida = new List<DetalleSalidasConsulta>();

                    foreach (Sam3_Ingenieria_Get_DetalleSalidaLoop_Result item in result)
                    {
                        listaDetalleSalida.Add(new DetalleSalidasConsulta {
                            Detalle_SalidasID = item.Detalle_SalidasID,
                            SpoolID = item.SpoolID,
                            NombreSpool = item.NombreSpool,
                            Posicion = item.Posicion,
                            RevisionSteelgo = item.RevisionSteelgo,
                            RevisionCliente = item.RevisionCliente,
                            FamiliaAcero1ID = item.FamiliaAcero1ID,
                            FamiliaAcero1 = item.FamiliaAcero1,
                            FamiliaAcero2ID = item.FamiliaAcero2ID,
                            FamiliaAcero2 = item.FamiliaAcero2,
                            Especificacion = item.Especificacion,
                            PDI = item.PDI,
                            SistemaPintura = item.SistemaPintura,
                            ColorPintura = item.ColorPintura,
                            detalleAgrupadoSalidas = (List<DetalleAgrupadoSalidasConsulta>) ObtieneDetalleAgrupadoSalidaLoop(item.Detalle_SalidasID, item.SpoolID, ProyectoSpoolID, ProyectoSoporteID)
                        });
                    }


                    return listaDetalleSalida;
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

        public object ObtieneDetalleLoop(int ProyectoID, int ProyectoSpoolID, int ProyectoSoporteID, string NombreLoop, int UsuarioID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_Ingenieria_Get_DetalleLoop_Result result = ctx.Sam3_Ingenieria_Get_DetalleLoop(ProyectoID, NombreLoop).SingleOrDefault();
                    SpoolMasterConsulta loopMaster = new SpoolMasterConsulta();

                    if (result != null)
                    {
                        loopMaster.LoopID = result.LoopID;
                        loopMaster.ProyectoID = result.ProyectoID;
                        loopMaster.NombreLoop = result.NombreLoop;
                        loopMaster.Dibujo = result.Dibujo;
                        loopMaster.PND = result.PorcentajePND;
                        loopMaster.RequierePWHT = result.RequierePWHT;
                        loopMaster.detalleSalidas = (List<DetalleSalidasConsulta>)ObtieneDetalleSalidaLoop(result.LoopID, ProyectoSpoolID, ProyectoSoporteID);
                    }

                    return loopMaster;
                }
            }
            catch (Exception ex){
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object GuardarCaptura(DataTable DtListaSpool, DataTable DtListaJuntaSpool, SpoolMasterGuardado Captura,  int UsuarioID) 
        {
            try
            {
                ObjetosSQL _SQL = new ObjetosSQL();
                string[,] parametros = { { "@UsuarioID", UsuarioID.ToString() }, { "@ProyectoID", Captura.ProyectoID.ToString() }, { "@LoopID", Captura.LoopID.ToString() }, { "@NombreLoop", Captura.NombreLoop }, {"@Dibujo", Captura.Dibujo }, {"@PorcentajePND", Captura.PND.ToString() }, {"@RequierePWHT", Captura.RequierePWHT.ToString() } };

               bool resultado = _SQL.Ejecuta(Stords.GUARDARCAPTURABUSCASPOOL, DtListaSpool, "@TTDetalleSalidas", DtListaJuntaSpool, "@TTDetalleAgrupadoSalidas", parametros);

                TransactionalInformation result = new TransactionalInformation();
                result.ReturnCode = 200;
                result.ReturnStatus = true;
                result.IsAuthenicated = true;

                if (resultado)
                {
                    result.ReturnMessage.Add("Ok");
                }
                else
                {
                    result.ReturnMessage.Add("Error");
                }
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
    }
}