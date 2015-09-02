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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="tipoPackingListID"></param>
        /// <returns></returns>
         public object ObtenerItemCode(int tipoPackingListID)
         {
             try
             {
                 List<ItemCode> itemCode = new List<ItemCode>();

                 using (SamContext ctx = new SamContext())
                 {
                     itemCode = (from ic in ctx.Sam3_ItemCode
                                 where ic.Activo && ic.TipoMaterialID == tipoPackingListID
                                 && !ctx.Sam3_NumeroUnico.Where(c=> c.ItemCodeID == ic.ItemCodeID).Any() 
                                 && !ctx.Sam3_Rel_OrdenRecepcion_ItemCode.Where(c=> c.ItemCodeID == ic.ItemCodeID).Any()
                                 select new ItemCode
                                 {
                                     ItemCodeID = ic.ItemCodeID.ToString(),
                                     Codigo = ic.Codigo
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="DatosItemCode"></param>
        /// <param name="usuario"></param>
        /// <returns></returns>
         public object GuardarItemCodePopUp(ItemCodeJson DatosItemCode, Sam3_Usuario usuario)
         {
             try
             {
                 using (SamContext ctx = new SamContext())
                 {
                     Sam3_ItemCode item = new Sam3_ItemCode();
                     item.ProyectoID = DatosItemCode.ProyectoID;
                     item.TipoMaterialID = DatosItemCode.TipoPackingList;
                     item.Codigo = DatosItemCode.ItemCode;
                     item.ItemCodeCliente = DatosItemCode.ItemCodeCliente;
                     item.DescripcionEspanol = DatosItemCode.Descripcion;
                     item.DescripcionIngles = DatosItemCode.Descripcion;
                     item.DescripcionInterna = DatosItemCode.Descripcion;
                     item.Peso = DatosItemCode.Peso;
                     item.Diametro1 = DatosItemCode.Diametro1;
                     item.Diametro2 = DatosItemCode.Diametro2;
                     item.FamiliaAceroID = DatosItemCode.FamiliaID;
                     item.Activo = true;
                     item.UsuarioModificacion = usuario.UsuarioID;
                     item.FechaModificacion = DateTime.Now;
                     item.Cantidad = DatosItemCode.Cantidad;
                     item.MM = DatosItemCode.MM;
                     item.ColadaID = DatosItemCode.ColadaID;
                     ctx.Sam3_ItemCode.Add(item);
                     ctx.SaveChanges();

                     TransactionalInformation result = new TransactionalInformation();
                     result.ReturnMessage.Add(item.ItemCodeID.ToString());
                     result.ReturnMessage.Add("Ok");
                     result.ReturnCode = 200;
                     result.ReturnStatus = false;
                     result.IsAuthenicated = true;

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