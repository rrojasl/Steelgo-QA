using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DatabaseManager.Sam3;
using BackEndSAM.Models;
using SecurityManager.Api.Models;

namespace BackEndSAM.DataAcces
{
    public class PickingTicketBd
    {
        private static readonly object _mutex = new object();
        private static PickingTicketBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private PickingTicketBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static PickingTicketBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new PickingTicketBd();
                    }
                }
                return _instance;
            }
        }

        public object ListadoFoliosParaCombo(Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<ListaCombos> listado = (from pk in ctx.Sam3_FolioPickingTicket
                                                 where pk.Activo
                                                 && !(from en in ctx.Sam3_Entrega
                                                      where en.Activo
                                                      select en.FolioPickingTicketID).Contains(pk.FolioPickingTicketID)
                                                 select new ListaCombos
                                                 {
                                                     id = pk.FolioPickingTicketID.ToString(),
                                                     value = pk.FolioPickingTicketID.ToString()
                                                 }).AsParallel().Distinct().ToList();


                    return listado.OrderBy(x => x.value).ToList();
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