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
using System.Web.Mvc;
using System.Net.Http;
using System.Net;
using System.IO;
using System.Net.Http.Headers;
namespace BackEndSAM.DataAcces
{
    public class TrabajosAdicionalesBD
    {
        private static readonly object _mutex = new object();
        private static TrabajosAdicionalesBD _instance;

        public TrabajosAdicionalesBD()
        {

        }

        public static TrabajosAdicionalesBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new TrabajosAdicionalesBD();
                    }
                }
                return _instance;
            }
        }

        
        public object ObtenerTrabajosAdicionales()
        {
            try
            {
                List<TrabajosAdicionales> trabaoAdicional = new List<TrabajosAdicionales>();

                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Cat_TrabajoAdicional_Result> result = ctx.Sam3_Cat_TrabajoAdicional(1, 1, 1, 1, "", "", "", "").ToList();

                    foreach(Sam3_Cat_TrabajoAdicional_Result item in result)
                    {
                        trabaoAdicional.Add(new TrabajosAdicionales
                        {
                            TrabajoAdicionalID = item.TrabajoAdicionalID,
                            TipoTrabajoAdicionalID = item.TipoTrabajoAdicionalID,
                            NombreTipoTrabajoAdicional = item.TipoTrabajoAdicional,
                            NombreCorto = item.NombreCorto,
                            NombreExtendido = item.NombreExtendido,
                            CuentaContable = item.CuentaContable,
                            SignoInformativo = item.SignoInformativo,
                        });
                    }

                    return trabaoAdicional;
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
        /// <summary>
        /// Obtiene el listado de trabajos adicionales en base al tipo
        /// </summary>
        /// <param name="TipoTrabajoAdicional">nombre del tipo de trabajo adicional</param>
        /// <returns></returns>
        public object ObtenerListadoTrabajosAdicionales(string TipoTrabajoAdicional)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Steelgo_Get_TrabajoAdicional_Result> lista = ctx.Sam3_Steelgo_Get_TrabajoAdicional(TipoTrabajoAdicional).ToList();
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
        public object EliminarTrabajoAdicional(int TrabajoAdicionalID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ctx.Sam3_Cat_TrabajoAdicional(4, TrabajoAdicionalID,usuario.UsuarioID, 0, "", "", "", "");
                    
                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("OK");
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

        public object InsertarTrabajoAdicional(Sam3_TrabajoAdicional trabajoAdicional)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    ctx.Sam3_Cat_TrabajoAdicional(2, 0, 0, trabajoAdicional.TipoTrabajoAdicionalID, trabajoAdicional.NombreCorto,
                        trabajoAdicional.NombreExtendido, trabajoAdicional.CuentaContable, trabajoAdicional.SignoInformativo);

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("OK");
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

        public object ModificarTrabajoAdicional(Sam3_TrabajoAdicional CambiostrabajoAdicional, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ctx.Sam3_Cat_TrabajoAdicional(3, CambiostrabajoAdicional.TrabajoAdicionalID, usuario.UsuarioID,
                        CambiostrabajoAdicional.TipoTrabajoAdicionalID, CambiostrabajoAdicional.NombreCorto,
                        CambiostrabajoAdicional.NombreExtendido, CambiostrabajoAdicional.CuentaContable, CambiostrabajoAdicional.SignoInformativo);
                    
                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("OK");
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