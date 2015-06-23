using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DatabaseManager.Sam3;
using DatabaseManager.EntidadesPersonalizadas;
using BackEndSAM.Utilities;
using System.Web.Script.Serialization;
using BackEndSAM.Models;
using SecurityManager.Api.Models;

namespace BackEndSAM.DataAcces
{
    public class TipoAvisoBd
    {


        public object ObtenerListadoTipoAviso(Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<TipoAviso> lstTipoAviso = (from r in ctx.Sam3_TipoAviso
                                                    where r.Activo
                                                    select new TipoAviso
                                                    {
                                                        Nombre = r.Nombre,
                                                        TipoAvisoID = r.TipoAvisoID.ToString()
                                                    }).AsParallel().ToList();

                    return lstTipoAviso;
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

        public object insertarTipoAviso(TipoAviso aviso, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    return null;
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

        public object ActualizarTipoAviso(TipoAviso aviso, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    return null;
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

        public object EliminarTipoAviso(int tipoAvisoID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    return null;
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


    }// fin clase
}