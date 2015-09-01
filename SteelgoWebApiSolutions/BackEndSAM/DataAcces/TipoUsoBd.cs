using BackEndSAM.Models;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces
{
    public class TipoUsoBd
    {

         private static readonly object _mutex = new object();
         private static TipoUsoBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private TipoUsoBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static TipoUsoBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new TipoUsoBd();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerTipoUso()
        {
            try
            {
                List<TipoUso> listTU = new List<TipoUso>();

                using (SamContext ctx = new SamContext())
                {
                    listTU = (from t in ctx.Sam3_TipoUso
                              where t.Activo == true
                              select new TipoUso
                                {
                                    id = t.TipoUsoID.ToString(),
                                    Nombre = t.Nombre
                                }).AsParallel().ToList();
                }
                return listTU;
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