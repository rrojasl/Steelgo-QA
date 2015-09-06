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

        /// <summary>
        /// Valida si un item code tiene Numero unico
        /// para saber si se puede cancelar un item code
        /// </summary>
        /// <param name="folioAvisoLlegadaID">folio de llegada</param>
        /// <param name="folioCuantificacionID">folio cuantificacion</param>
        /// <param name="ItemCode">item code</param>
        /// <param name="bultoID">id del bulto</param>
        /// <returns>tru o false</returns>
        public object ValidarItemCode(int folioAvisoLlegadaID, int folioCuantificacionID, int ItemCode, int bultoID)
        {
            try
            {
                bool tieneNU = false;
                using (SamContext ctx = new SamContext())
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

        /// <summary>
        /// Eliminar/Cancelar un Item Code de grid de materiales o bulto
        /// </summary>
        /// <param name="folioAvisoLlegadaID">folio de llegada</param>
        /// <param name="folioCuantificacionID">folio cuantificacion</param>
        /// <param name="BultoID">bulto id</param>
        /// <param name="ItemCode">item code</param>
        /// <param name="usuario">usuario regisstrado</param>
        /// <returns>estatus de exito o error</returns>
        public object EliminarItemCode(int folioAvisoLlegadaID, int folioCuantificacionID, int BultoID, int ItemCode, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    if (BultoID != -1)
                    {
                        //Elimino de Rel Bulto
                        Sam3_Rel_Bulto_ItemCode bulto = ctx.Sam3_Rel_Bulto_ItemCode.Where(x => x.BultoID == BultoID && x.ItemCodeID == ItemCode).AsParallel().SingleOrDefault();
                        bulto.Activo = false;
                        bulto.UsuarioModificacion = usuario.UsuarioID;
                        bulto.FechaModificacion = DateTime.Now;

                        ctx.SaveChanges();
                    }
                    else
                    {
                        //Elimino de Rel FolioCuantificacion_ItemCode
                        Sam3_Rel_FolioCuantificacion_ItemCode itemCode = ctx.Sam3_Rel_FolioCuantificacion_ItemCode.Where(x => x.ItemCodeID == ItemCode && x.FolioCuantificacionID == folioCuantificacionID).AsParallel().SingleOrDefault();
                        itemCode.Activo = false;
                        itemCode.UsuarioModificacion = usuario.UsuarioID;
                        itemCode.FechaModificacion = DateTime.Now;

                        ctx.SaveChanges();
                    }

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("OK");
                    result.ReturnCode = 200;
                    result.ReturnStatus = true;
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