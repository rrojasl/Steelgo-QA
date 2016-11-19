using BackEndSAM.Models.Embarque.EmbarqueGeneral;
using DatabaseManager.Constantes;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data;
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

        public object GuardarNuevaPlana(DataTable dtDetalle, int UsuarioID)
        {
            try
            {
                ObjetosSQL _SQL = new ObjetosSQL();
                string[,] parametros = { { "@Usuario", UsuarioID.ToString() } };

                _SQL.EjecutaInsertUpdate(Stords.GUARDARNUEVAPLANA, dtDetalle, "@TablaPlana", parametros);

                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add("OK");
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

    }
}