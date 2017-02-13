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

        public object ObtieneDetalleSpool(int UsuarioID, int ProyectoID, string Spool)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Ingeneria_Get_DetalleSpool_Result> result = ctx.Sam3_Ingeneria_Get_DetalleSpool(UsuarioID, ProyectoID, Spool).ToList();
                    List<DetalleSpool> listaDetalle = new List<DetalleSpool>();

                    foreach(Sam3_Ingeneria_Get_DetalleSpool_Result item in result)
                    {
                        listaDetalle.Add( new DetalleSpool
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
    }
}