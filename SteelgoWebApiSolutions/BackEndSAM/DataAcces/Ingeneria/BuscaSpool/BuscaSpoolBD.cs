using BackEndSAM.Models.Ingenieria.BuscaSpool;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
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
                    List<Sam3_Ingeneria_Get_ListadoTipoSalida_Result> result = ctx.Sam3_Ingeneria_Get_ListadoTipoSalida().ToList();
                    List<DetalleTipoSalida> listaDetalle = new List<DetalleTipoSalida>();
                    listaDetalle.Add(new DetalleTipoSalida());

                    foreach (Sam3_Ingeneria_Get_ListadoTipoSalida_Result item in result)
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
        
        public object ObtieneListadoSpool(int ProyectoID, string SpoolContiene)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Ingeneria_Get_ListadoSpool_Result> result = ctx.Sam3_Ingeneria_Get_ListadoSpool(ProyectoID, SpoolContiene).ToList();
                    List<ListaSpool> listaDetalle = new List<ListaSpool>();
                    listaDetalle.Add(new ListaSpool());

                    foreach (Sam3_Ingeneria_Get_ListadoSpool_Result item in result)
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
                    List<Sam3_Ingeneria_Get_ListadoJuntaSpool_Result> result = ctx.Sam3_Ingeneria_Get_ListadoJuntaSpool(SpoolID).ToList();
                    List<ListaJuntaSpool> listaDetalle = new List<ListaJuntaSpool>();
                    listaDetalle.Add(new ListaJuntaSpool());

                    foreach (Sam3_Ingeneria_Get_ListadoJuntaSpool_Result item in result)
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
                    List<Sam3_Ingeneria_Get_MaterialSpool_Result> result = ctx.Sam3_Ingeneria_Get_MaterialSpool(SpoolID).ToList();
                    List<DetalleMaterialSpool> listaDetalle = new List<DetalleMaterialSpool>();

                    foreach (Sam3_Ingeneria_Get_MaterialSpool_Result item in result)
                    {
                        listaDetalle.Add(new DetalleMaterialSpool
                        {
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
                    List<Sam3_Ingeneria_Get_DetalleSpool_Result> result = ctx.Sam3_Ingeneria_Get_DetalleSpool(UsuarioID, ProyectoID, Spool).ToList();
                    List<DetalleSpool> listaDetalle = new List<DetalleSpool>();

                    foreach (Sam3_Ingeneria_Get_DetalleSpool_Result item in result)
                    {
                        listaDetalle.Add(new DetalleSpool
                        {
                            SpoolID = item.SpoolID,
                            ProyectoID = item.ProyectoID,
                            RevisionCliente = item.RevisionCliente,
                            RevisionSteelgo = item.RevisionSteelgo,
                            FamiliarAcero1ID = item.FamiliaAcero1ID,
                            FamiliarAcero2ID = item.FamiliaAcero2ID,
                            Especificacion = item.Especificacion,
                            SistemaPintura = item.SistemaPintura,
                            ColorPintura = item.ColorPintura,
                            PDI = item.PDI,
                            Acero = item.Acero
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

        public object ObtieneDetalleJuntaSpool(int JuntaSpoolID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Ingeneria_Get_DetalleJuntaSpool_Result> result = ctx.Sam3_Ingeneria_Get_DetalleJuntaSpool(JuntaSpoolID).ToList();
                    List<DetalleJuntaSpool> listaDetalle = new List<DetalleJuntaSpool>();

                    foreach (Sam3_Ingeneria_Get_DetalleJuntaSpool_Result item in result)
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
    }
}