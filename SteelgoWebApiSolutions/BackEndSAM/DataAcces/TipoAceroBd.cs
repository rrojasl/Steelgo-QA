using BackEndSAM.Models;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces
{
    public class TipoAceroBd
    {
          private static readonly object _mutex = new object();
         private static TipoAceroBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
         private TipoAceroBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
         public static TipoAceroBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new TipoAceroBd();
                    }
                }
                return _instance;
            }
        }

        public object obtenerTipoAcero()
        {
            try
            {
                List<TipoAcero> tipoAcero = new List<TipoAcero>();

                using (SamContext ctx = new SamContext())
                {
                    tipoAcero = (from fm in ctx.Sam3_FamiliaMaterial
                                 where fm.Activo
                                 select new TipoAcero
                                 {
                                     AceroID = fm.FamiliaMaterialID.ToString(),
                                     Nomenclatura = fm.Nombre
                                 }).AsParallel().ToList();
                }
                return tipoAcero;
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