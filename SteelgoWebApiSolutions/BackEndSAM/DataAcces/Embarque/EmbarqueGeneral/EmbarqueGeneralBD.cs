using BackEndSAM.Models.Embarque.EmbarqueGeneral;
using DatabaseManager.Constantes;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.Embarque.EmbarqueGeneral
{
    public class EmbarqueGeneralBD
    {
        private static readonly object _mutex = new object();
        private static EmbarqueGeneralBD _instance;

        public static EmbarqueGeneralBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if(_instance == null)
                    {
                        _instance = new EmbarqueGeneralBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerPlanas(int ProveedorID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Embarque_CG_Get_ListadoPlanas_Result> result = ctx.Sam3_Embarque_CG_Get_ListadoPlanas(ProveedorID).ToList();
                    List<DetallePlana> listaDetalle = new List<DetallePlana>();
                    listaDetalle.Add(new DetallePlana());

                    foreach (Sam3_Embarque_CG_Get_ListadoPlanas_Result item in result)
                    {
                        listaDetalle.Add(new DetallePlana {
                            PlanaID = item.PlanaID,
                            Nombre = item.Nombre, 
                            CargaPlanaID = item.CargaPlanaID.GetValueOrDefault(),
                            StatusCarga =       item.StatusCarga.GetValueOrDefault(),
                            ProyectoID = item.ProyectoID.GetValueOrDefault(),
                            CuadrantePlanaSam2 = item.CuadrantePlanaSam2.GetValueOrDefault(),
                            CuadrantePlanaSam3 = item.CuadrantePlanaSam3.GetValueOrDefault()
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

        public object GuardarNuevaPlana(string NombrePlana, int ProveedorID, int UsuarioID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ObjectResult<int?> resultSp = ctx.Sam3_Embarque_CG_CreatePlana(NombrePlana, ProveedorID, UsuarioID);
                    var valor = resultSp.Where(x => x.HasValue).Select(x => x.Value).ToList()[0];

                    TransactionalInformation result = new TransactionalInformation();

                    if (valor > 0)
                    {
                        result.ReturnMessage.Add("Ok");
                        result.ReturnCode = 200;
                        result.ReturnStatus = true;
                        result.IsAuthenicated = true;
                    }
                    else
                    {
                        result.ReturnMessage.Add("La plana para ese proveedor ya existe");
                        result.ReturnCode = 200;
                        result.ReturnStatus = true;
                        result.IsAuthenicated = true;
                    }

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