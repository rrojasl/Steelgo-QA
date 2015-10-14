using BackEndSAM.Models;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces
{
    public class ObreroBD
    {
        private static readonly object _mutex = new object();
        private static ObreroBD _instance;

        public ObreroBD()
        {

        }

        public static ObreroBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new ObreroBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerObrero()
        {
            try
            {
                List<Obrero> obrero = new List<Obrero>();

                using (SamContext ctx = new SamContext())
                {
                    List<SSP_sam3_Obrero_Result> result = ctx.SSP_sam3_Obrero(1, 0, 0,0,"","").ToList();

                    foreach (SSP_sam3_Obrero_Result elem in result)
                    {
                        obrero.Add(new Obrero
                        {
                            ObreroID = elem.ObreroID,
                            TipoObreroID = elem.TipoObreroID,
                            Codigo = elem.Codigo,
                            NumeroEmpleado = elem.NumeroEmpleado,
                            TipoObrero = elem.TipoObrero
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

        public object ObtenerObrero(string TipoObreroID)
        {
            try
            {
                List<Obrero> obrero = new List<Obrero>();

                using (SamContext ctx = new SamContext())
                {
                    List<SSP_sam3_Obrero_Result> result = ctx.SSP_sam3_Obrero(5, 0, 0,int.Parse( TipoObreroID), "", "").ToList();

                    foreach (SSP_sam3_Obrero_Result elem in result)
                    {
                        obrero.Add(new Obrero
                        {
                            ObreroID = elem.ObreroID,
                            Codigo = elem.Codigo,
                        });
                    }
                    if(result.Count == 0)
                    {
                        obrero.Add(new Obrero
                        {
                            ObreroID = 0,
                            Codigo = "",
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

        public object InsertarObrero(Sam3_Obrero Obrero, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    ctx.SSP_sam3_Obrero(2, 0, usuario.UsuarioID, Obrero.TipoObreroID, Obrero.Codigo, Obrero.NumeroEmpleado);

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

        public object EliminarObrero(int ObreroID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ctx.SSP_sam3_Obrero(4, ObreroID, usuario.UsuarioID,null,null,null);

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

        public object ModificarObrero(Sam3_Obrero Obrero, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ctx.SSP_sam3_Obrero(3, Obrero.ObreroID, usuario.UsuarioID, Obrero.TipoObreroID, Obrero.Codigo, Obrero.NumeroEmpleado);

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