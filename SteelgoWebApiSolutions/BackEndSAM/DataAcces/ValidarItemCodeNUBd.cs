using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces
{
    public class ValidarItemCodeNUBd
    {
         private static readonly object _mutex = new object();
         private static ValidarItemCodeNUBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
         private ValidarItemCodeNUBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
         public static ValidarItemCodeNUBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new ValidarItemCodeNUBd();
                    }
                }
                return _instance;
            }
        }

         public object ValidarItemCode(int folioAvisoLlegadaID, int folioCuantificacionID, int ItemCode, int bultoID)
         {
             try
             {
                 bool tieneNU = false;
                 using(SamContext ctx = new SamContext())
                 {
                     if (bultoID != -1)
                     {
                         tieneNU = (from bic in ctx.Sam3_Rel_Bulto_ItemCode
                                    where bic.ItemCodeID == ItemCode && bic.BultoID == bultoID
                                    select bic.TieneNumerosUnicos).AsParallel().FirstOrDefault();
                     }
                     else
                     {
                         tieneNU = (from fcic in ctx.Sam3_Rel_FolioCuantificacion_ItemCode
                                    where fcic.ItemCodeID == ItemCode && fcic.FolioCuantificacionID == folioCuantificacionID
                                    select fcic.TieneNumerosUnicos).AsParallel().FirstOrDefault();
                     }

                     return tieneNU;
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