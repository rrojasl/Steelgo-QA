using BackEndSAM.Models;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces
{
    public class ObreroUbicacionBD
    {
        private static readonly object _mutex = new object();
        private static ObreroUbicacionBD _instance;

        public ObreroUbicacionBD()
        {

        }

        public static ObreroUbicacionBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new ObreroUbicacionBD();
                    }
                }
                return _instance;
            }
        }

        public object ObreroUbicacion(string Lenguaje)
        {
            try
            {
                List<ObreroUbicacion> obrero = new List<ObreroUbicacion>();

                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Cat_ObreroUbicacion_Result> result = ctx.Sam3_Cat_ObreroUbicacion(1, null,null,null,null,null,null, Lenguaje).ToList();

                    foreach (Sam3_Cat_ObreroUbicacion_Result elem in result)
                    {
                        
                        obrero.Add(new ObreroUbicacion
                        {
                            ObreroUbicacionID = elem.ObreroUbicacionID,
                            ObreroID = elem.ObreroID,
                            FechaInicioLabor = elem.FechaInicioLabor,
                            FechaFinLabor = elem.FechaFinLabor,
                            PatioID = elem.PatioID,
                            Codigo = elem.Codigo,
                            Nombre = elem.Nombre
                        });
                    }


                    return obrero;
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



        public object InsertarObreroUbicacion(ObreroUbicacion TipoObrero, string Lenguaje, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    ctx.Sam3_Cat_ObreroUbicacion(2, TipoObrero.ObreroUbicacionID, usuario.UsuarioID, TipoObrero.ObreroID, TipoObrero.PatioID, TipoObrero.FechaInicioLabor.Trim(), TipoObrero.FechaFinLabor.Trim(), Lenguaje);
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

        public object EliminarObreroUbicacion(int ObreroUbicacionID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ctx.Sam3_Cat_ObreroUbicacion(4,ObreroUbicacionID,null,null,null,null,null,null);

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

        public object ModificarObreroUbicacion(ObreroUbicacion CambiosTipoObrero, string Lenguaje, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ctx.Sam3_Cat_ObreroUbicacion(3, CambiosTipoObrero.ObreroUbicacionID,usuario.UsuarioID,CambiosTipoObrero.ObreroID,CambiosTipoObrero.PatioID,CambiosTipoObrero.FechaInicioLabor.Trim(),CambiosTipoObrero.FechaFinLabor.Trim(), Lenguaje);

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