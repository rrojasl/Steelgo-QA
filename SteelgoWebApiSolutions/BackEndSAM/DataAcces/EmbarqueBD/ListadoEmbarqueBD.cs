using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.EmbarqueBD
{
    public class ListadoEmbarqueBD
    {
        private static readonly object _mutex = new object();
        private static ListadoEmbarqueBD _instance;

        public static ListadoEmbarqueBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new ListadoEmbarqueBD();
                    }
                }
                return _instance;
            }
        }

        public object getListadoEmbarqueDetalle(string todos, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Embarque_Get_ListadoEmbarqueDetalle_Result> result = ctx.Sam3_Embarque_Get_ListadoEmbarqueDetalle(todos, lenguaje).ToList();
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

        public object getListadoEmbarquePathReporte(int usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Embarque_ListadoEmbarque_PathReporte_Result> result = ctx.Sam3_Embarque_ListadoEmbarque_PathReporte(usuario).ToList();
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