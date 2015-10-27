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
using System.Data.Entity.Core.Objects;

namespace BackEndSAM.DataAcces
{
    public class TipoTrabajoAdicionalBd
    {

        private static readonly object _mutex = new object();
        private static TipoTrabajoAdicionalBd _instance;

        public TipoTrabajoAdicionalBd()
        {

        }

        public static TipoTrabajoAdicionalBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new TipoTrabajoAdicionalBd();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerTipoTrabajosAdicionales()
        {
            try
            {
                List<TipoTrabajoAdicionalModel> trabaoAdicional = new List<TipoTrabajoAdicionalModel>();

                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Cat_TipoTrabajoAdicional_Result> result = ctx.Sam3_Cat_TipoTrabajoAdicional(1,0,0,"").ToList();
                        
                    foreach(Sam3_Cat_TipoTrabajoAdicional_Result elem in result)
                    {
                        trabaoAdicional.Add( new TipoTrabajoAdicionalModel
                                      {
                                           TipoTrabajoAdicionalID = elem.TipoTrabajoAdicionalID,
                                           TipoTrabajoAdicional = elem.TipoTrabajoAdicional
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

        public object InsertarTipoTrabajoAdicional(Sam3_TipoTrabajoAdicional trabajoAdicional, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    ctx.Sam3_Cat_TipoTrabajoAdicional(2,trabajoAdicional.TipoTrabajoAdicionalID,
                        usuario.UsuarioID,trabajoAdicional.TipoTrabajoAdicional);

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

        public object EliminarTipoTrabajoAdicional(int TrabajoAdicionalID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ObjectParameter op = new ObjectParameter("Retorna", typeof(string));
                    op.Value = null;
                    var oMyString = new ObjectParameter("Retorna", typeof(string));
                    var res = ctx.Sam3_Steelgo_Get_RelacionTrabajosAdicionales(oMyString, TrabajoAdicionalID);
                    var data = oMyString.Value.ToString();
                    TransactionalInformation result = new TransactionalInformation();
                    if (data.Equals("ok"))
                    {
                        ctx.Sam3_Cat_TipoTrabajoAdicional(4, TrabajoAdicionalID, usuario.UsuarioID, "");

                        result.ReturnMessage.Add("OK");
                    }
                    else
                    {
                        result.ReturnMessage.Add("No se elimino el tipo de trabajo, ya que se encuentra asociado a otro(s) trabajo(s) adicional(es)");
                    }

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

        public object ModificarTipoTrabajoAdicional(Sam3_TipoTrabajoAdicional CambiostrabajoAdicional, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ctx.Sam3_Cat_TipoTrabajoAdicional(3,CambiostrabajoAdicional.TipoTrabajoAdicionalID,usuario.UsuarioID,
                        CambiostrabajoAdicional.TipoTrabajoAdicional);

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