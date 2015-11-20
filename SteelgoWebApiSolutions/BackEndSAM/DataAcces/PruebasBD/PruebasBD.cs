using BackEndSAM.Models.Pruebas;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.PruebasBD
{
    public class PruebasBD
    {
        private static readonly object _mutex = new object();
        private static PruebasBD _instance;


        public static PruebasBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new PruebasBD();
                    }
                }
                return _instance;
            }
        }

        public object getListaTipoPrueba(string lenguaje, int proyectoID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Pruebas> listaResult = new List<Pruebas>();
                    List<Sam3_SteelGo_Get_Pruebas_Result> result = ctx.Sam3_SteelGo_Get_Pruebas(proyectoID, lenguaje).ToList();
                    foreach(Sam3_SteelGo_Get_Pruebas_Result item in  result)
                    {
                        Pruebas renglon = new Pruebas
                        {
                            Clave = item.Clave,
                            Nombre = item.Nombre,
                            PruebasID = item.PruebasID
                        };
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