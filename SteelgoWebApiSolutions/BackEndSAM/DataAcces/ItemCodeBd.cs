using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BackEndSAM.Models;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces
{
    public class ItemCodeBd
    {
         private static readonly object _mutex = new object();
         private static ItemCodeBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
         private ItemCodeBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
         public static ItemCodeBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new ItemCodeBd();
                    }
                }
                return _instance;
            }
        }

         public object ObtenerItemCode(int tipoPackingListID)
         {
             try
             {
                 List<ListaCombos> itemCode = new List<ListaCombos>();

                 using (SamContext ctx = new SamContext())
                 {
                     itemCode = (from ic in ctx.Sam3_ItemCode
                                 where ic.Activo && ic.TipoMaterialID == tipoPackingListID
                                 select new ListaCombos
                                 {
                                     id = ic.ItemCodeID.ToString(),
                                     value = ic.Codigo
                                 }).AsParallel().ToList();
                 }

                 return itemCode;
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