using BackEndSAM.Models.HerramientasPruebas;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.HerramientasPruebasBD
{
    public class HerramientasPruebasBD
    {
        private static readonly object _mutex = new object();
        private static HerramientasPruebasBD _instance;
        public static HerramientasPruebasBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new HerramientasPruebasBD();
                    }
                }
                return _instance;
            }
        }

        public object GetHerramientasPrueba(int PruebaID, string lenguaje)
        {
            List<HerramientaPrueba> listHerramientas = new List<HerramientaPrueba>();
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_SteelGo_Get_HerramientasDePrueba_Result> listHerramientasResult = 
                        ctx.Sam3_SteelGo_Get_HerramientasDePrueba(lenguaje,PruebaID).ToList();
                    foreach (var h in listHerramientasResult)
                    {
                        HerramientaPrueba herramienta = new HerramientaPrueba();
                        herramienta.HerramientaDePruebaID = h.HerramientaDePruebaID;
                        herramienta.Nombre = h.Nombre;
                        herramienta.Modelo = h.Modelo;
                        herramienta.Descripcion = h.DescHerramientaPrueba;
                        listHerramientas.Add(herramienta);

                    }
                }
                return listHerramientas;
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