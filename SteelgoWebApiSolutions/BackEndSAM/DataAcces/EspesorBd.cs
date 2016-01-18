using BackEndSAM.Models;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces
{
    public class EspesorBd
    {
         private static readonly object _mutex = new object();
        private static EspesorBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private EspesorBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static EspesorBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new EspesorBd();
                    }
                }
                return _instance;
            }
        }

        /// <summary>
        /// Function para obtener los Espesores existentes en el catalogo
        /// para la pantalla Catalogo Item Code Steelgo
        /// </summary>
        /// <param name="diametro1">diametro 1 seleccionado</param>
        /// <param name="diametro2">diametro 2 seleccionado</param>
        /// <returns></returns>
        public object ObtenerEspesores(string diametro1, string diametro2)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    int d1 = Convert.ToInt32(diametro1);
                    int d2 = Convert.ToInt32(diametro2);
                    List<ListaCombos> lista = (from es in ctx.Sam3_Espesor
                                               where es.Activo == 1 && es.DiametroID == d1 || es.DiametroID == d2
                                               select new ListaCombos
                                               {
                                                   id = es.EspesorID.ToString(),
                                                   value = es.Valor.ToString()
                                               }).AsParallel().ToList();
                    return lista;
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object ObtenerEspesoresIN(int diametro1, int diametro2)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    decimal factor = Convert.ToDecimal(0.0393701);

                    List<ListaCombos> lista = (from es in ctx.Sam3_Espesor
                                               where es.Activo == 1 && es.DiametroID == diametro1 || es.DiametroID == diametro2
                                               select new ListaCombos
                                               {
                                                   id = es.EspesorID.ToString(),
                                                   value = (es.Valor * factor).ToString()
                                               }).AsParallel().ToList();

                    foreach (var item in lista)
                    {
                        item.value = Math.Round(Convert.ToDecimal(item.value), 4).ToString();
                    }


                    return lista;
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }
    }
}