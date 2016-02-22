using BackEndSAM.Models.Patios;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.PatiosBD
{
    public class PatiosBD
    {
        private static readonly object _mutex = new object();
        private static PatiosBD _instance;
        public static PatiosBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new PatiosBD();
                    }
                }
                return _instance;
            }
        }
        
        public object GetPatios(int tipo, int proyectoID)
        {
            List<Patios> listPatios = new List<Patios>();
            List<Sam3_SteelGo_Get_Patios_Result> listPatiosResult;

            try
            {
                using (SamContext ctx = new SamContext())
                {
                    if (proyectoID > 0)
                    {
                        listPatiosResult = ctx.Sam3_SteelGo_Get_Patios(tipo, proyectoID).ToList();
                    }
                    else
                    {
                        listPatiosResult = ctx.Sam3_SteelGo_Get_Patios(tipo, null).ToList();
                    }
                    
                    foreach (var p in listPatiosResult)
                    {
                        Patios patio = new Patios();
                        patio.PatioID = p.PatioID;
                        patio.Nombre = p.Nombre;
                        patio.Propietario = p.Propietario;
                        patio.Descripcion = p.Descripcion;
                        listPatios.Add(patio);
                    }
                }
                return listPatios;
            }
            catch (Exception ex)
            {
                TransactionalInformation result = null; result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;
                return result;
            }
        }



    }
}