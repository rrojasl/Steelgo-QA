using BackEndSAM.Models;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces
{
    public class CedulasBd
    {
         private static readonly object _mutex = new object();
        private static CedulasBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private CedulasBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static CedulasBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new CedulasBd();
                    }
                }
                return _instance;
            }
        }

        public object obtenerCedulas()
        {
            try
            { 
                using(SamContext ctx = new SamContext())
                {
                    List<ListaCombos> cedulas = (from c in ctx.Sam3_Cedula
                                                 join d in ctx.Sam3_Diametro on c.DiametroID equals d.DiametroID
                                                 where c.Activo && d.Activo
                                                 select new ListaCombos
                                                 {
                                                     id = c.CedulaID.ToString(),
                                                     value = d.Valor + "-" + c.CedulaA + "-" + c.CedulaB + "-" + c.CedulaC
                                                 }).AsParallel().ToList();

                    return cedulas;
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
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