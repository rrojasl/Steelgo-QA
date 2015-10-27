using BackEndSAM.Models;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces
{
    public class TipoObreroBD
    {
        private static readonly object _mutex = new object();
        private static TipoObreroBD _instance;

        public TipoObreroBD()
        {

        }

        public static TipoObreroBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new TipoObreroBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerTipoObrero()
        {
            try
            {
                List<TipoObreroModel> obrero = new List<TipoObreroModel>();

                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Cat_TipoObrero_Result> result = ctx.Sam3_Cat_TipoObrero(1, 0, 0, "", 0).ToList();

                    foreach (Sam3_Cat_TipoObrero_Result elem in result)
                    {
                        obrero.Add(new TipoObreroModel
                        {
                            TipoObreroID = elem.TipoObreroID,
                            TipoObrero = elem.TipoObrero,
                            TipoObreroJefe = int.Parse(elem.TipoObreroJefe.ToString()),
                            TipoObreroJefeNombre = elem.TipoObreroJefeNombre
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



        public object InsertarTipoObrero(Sam3_TipoObrero TipoObrero, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    if(TipoObrero.TipoObreroJefe == null)
                    {
                        TipoObrero.TipoObreroJefe = 0;
                    }
                      ctx.Sam3_Cat_TipoObrero(2, 0, usuario.UsuarioID, TipoObrero.TipoObrero, TipoObrero.TipoObreroJefe);

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

        public object EliminarTipoObrero(int TipoObreroID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ctx.Sam3_Cat_TipoObrero(4, TipoObreroID, usuario.UsuarioID,null,null);

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

        public object ModificarTipoObrero(Sam3_TipoObrero CambiosTipoObrero, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ctx.Sam3_Cat_TipoObrero(3, CambiosTipoObrero.TipoObreroID, usuario.UsuarioID
                        , CambiosTipoObrero.TipoObrero, CambiosTipoObrero.TipoObreroJefe);

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