using BackEndSAM.Models;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces
{
    public class GuardarItemCodesBd
    {
        private static readonly object _mutex = new object();
        private static GuardarItemCodesBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private GuardarItemCodesBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static GuardarItemCodesBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new GuardarItemCodesBd();
                    }
                }
                return _instance;
            }
        }

        //Si es bultoooooooooooo*****************************/**/**/*/*********************///****************///*****************
        // que pasa si captura otro ic igual
        public object TerminarYNuevo(bool cerrar, bool incompletos, int FolioAvisollegadaId, int FolioCuantificacion, List<CuantificacionListado> datosItemCode)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_FolioCuantificacion folioCuantificacion = ctx.Sam3_FolioCuantificacion.Where(x => x.FolioAvisoEntradaID == FolioAvisollegadaId && x.FolioCuantificacionID == FolioCuantificacion).AsParallel().SingleOrDefault();
                    List<Sam3_ItemCode> listIC = new List<Sam3_ItemCode>();
                    Sam3_ItemCode IC = null;

                    foreach (var item in datosItemCode)
                    {
                        

                        Sam3_Rel_FolioCuantificacion_ItemCode relIC = new Sam3_Rel_FolioCuantificacion_ItemCode();
                        IC = new Sam3_ItemCode();

                        //seleccionamos item code id
                        int itemCodeID = (from ic in ctx.Sam3_ItemCode where ic.Codigo == item.ItemCode select ic.ItemCodeID).AsParallel().Single() != null ? (from ic in ctx.Sam3_ItemCode where ic.Codigo == item.ItemCode select ic.ItemCodeID).AsParallel().Single() : 0;






                        //if (item.BultoID != null ) // esta en la pagina de detalle de bulto
                        //{
                        //    //creo la relacion
                        //    Sam3_Rel_Bulto_ItemCode bic = new Sam3_Rel_Bulto_ItemCode();
                        //    //bic.BultoID = item.BultoID;
                        //    bic.ItemCodeID = itemCodeID;
                        //    bic.TieneNumerosUnicos = false;
                        //    bic.FechaModificacion = DateTime.Now;
                        //    bic.UsuarioModificacion = 1; //usuario.UsuarioID;
                        //    bic.Activo = true;


                        //}
                        //else //esta en la pantalla normal
                        //{
                        //    //no crea id bulto

                        //}


                        ////Si tengo un bulto se guarda en la tabla bultos
                        //if (item.ItemCode == "Bulto")
                        //{
                        //    Sam3_Bulto bulto = new Sam3_Bulto();
                        //    bulto.FolioCuantificacionID = FolioCuantificacion;
                        //    bulto.Estatus = "No Detallado"; //************************************************************ que estatus tiene?
                        //    bulto.FechaModificacion = DateTime.Now;
                        //    bulto.UsuarioModificacion = 1; //usuario.UsuarioID
                        //    bulto.Activo = true;
                        //}

                        ////Insertar en la relacion ICS
                        //Sam3_Rel_ItemCode_ItemCodeSteelgo ics = new Sam3_Rel_ItemCode_ItemCodeSteelgo();
                        //ics.ItemCodeID = itemCodeID;
                        //ics.ItemCodeSteelgoID = item.ItemCodeSteelgo;
                        //ics.Activo = true;
                        //ics.FechaModificacion = DateTime.Now;
                        //ics.UsuarioModificacion = 1; //usuario.UsuarioID;
                        




                        bool existeYnumerosunicos = ctx.Sam3_Rel_FolioCuantificacion_ItemCode.Where(x => x.ItemCodeID == itemCodeID && x.FolioCuantificacionID == FolioCuantificacion && x.Activo && x.TieneNumerosUnicos == true).Any();
                        bool existeSINnumerosunicos = ctx.Sam3_Rel_FolioCuantificacion_ItemCode.Where(x => x.ItemCodeID == itemCodeID && x.FolioCuantificacionID == FolioCuantificacion && x.Activo && x.TieneNumerosUnicos == false).Any();

                        //Si ya existe Item Code y tiene NU
                        if (existeYnumerosunicos)
                        {
                            IC = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID == itemCodeID).AsParallel().SingleOrDefault();
                            IC.Cantidad = ctx.Sam3_ItemCode.Where(x => x.Codigo == item.ItemCode).Select(c => c.Cantidad).AsParallel().SingleOrDefault() + item.Cantidad;
                            IC.UsuarioModificacion = 1; //usuario.UsuarioID ************************************************************
                            IC.FechaModificacion = DateTime.Now;
                        }
                        else if (existeSINnumerosunicos)
                        {
                            //Update al nuevo IC
                            IC = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID == itemCodeID).AsParallel().SingleOrDefault();
                            IC.ProyectoID = folioCuantificacion.ProyectoID;
                            IC.TipoMaterialID = item.TipoMaterial; 
                            IC.Codigo = item.ItemCode;
                            
                            IC.DescripcionEspanol = item.Descripcion;
                            IC.DescripcionIngles = item.Descripcion;
                            IC.Peso = item.Peso; 
                            IC.DescripcionInterna = item.Descripcion;
                            IC.Diametro1 = item.D1;
                            IC.Diametro2 = item.D2;
                            IC.FamiliaAceroID = (from f in ctx.Sam3_FamiliaAcero where f.Nombre == item.Familia select f.FamiliaAceroID).AsParallel().Single(); //Sin familia packing list ****************************************************************
                            IC.Activo = true;
                            IC.UsuarioModificacion = 1; //usuario.UsuarioID; *****************************************************************
                            IC.FechaModificacion = DateTime.Now;
                            IC.Cantidad = item.Cantidad;
                            IC.MM = item.MM.ToString() == "N/A" ? null : item.MM;
                            IC.ColadaID = (from c in ctx.Sam3_Colada where c.NumeroColada == item.Colada select c.ColadaID).AsParallel().Single() != null ? (from c in ctx.Sam3_Colada where c.NumeroColada == item.Colada select c.ColadaID).AsParallel().Single() : 1; //Sin colada en Packing List *************************

                            ctx.SaveChanges();
                        }
                        else //no existe
                        {
                            IC.ProyectoID = folioCuantificacion.ProyectoID;
                            IC.TipoMaterialID = item.TipoMaterial;
                            IC.Codigo = item.ItemCode;
                            
                            IC.DescripcionEspanol = item.Descripcion;
                            IC.DescripcionIngles = item.Descripcion;
                            IC.Peso = item.Peso;
                            IC.DescripcionInterna = item.Descripcion;
                            IC.Diametro1 = item.D1;
                            IC.Diametro2 = item.D2;
                            IC.FamiliaAceroID = (from f in ctx.Sam3_FamiliaAcero where f.Nombre == item.Familia select f.FamiliaAceroID).AsParallel().Single(); //Si no trae familiaaaaaa (datos incompletos)
                            IC.Activo = true;
                            IC.UsuarioModificacion = 1; //usuario.UsuarioID; *****************************************************************
                            IC.FechaModificacion = DateTime.Now;
                            IC.Cantidad = item.Cantidad;
                            IC.MM = item.MM.ToString() == "N/A" ? null : item.MM;
                            IC.ColadaID = (from c in ctx.Sam3_Colada where c.NumeroColada == item.Colada select c.ColadaID).AsParallel().Single(); // Si no trae colada, (datos incompletos)
                            //Errores controlados
                            //begin transaction
                            //los regreso todos o ninguno, hubo error en tales y los elimino
                            //Ejemplo de errores, si un bulto tiene IC bulto, y cantidades


                            ctx.Sam3_ItemCode.Add(IC);
                            ctx.SaveChanges();

                            //Insertar la Relacion Folio Cuantificacion IC
                            relIC.FolioCuantificacionID = FolioCuantificacion;
                            relIC.ItemCodeID = IC.ItemCodeID;
                            relIC.TieneNumerosUnicos = false;
                            relIC.FechaModificacion = DateTime.Now;
                            relIC.UsuarioModificacion = 1; //usuario.UsuarioID;
                            relIC.Activo = true;

                            ctx.Sam3_Rel_FolioCuantificacion_ItemCode.Add(relIC);
                            ctx.SaveChanges();
                        }
                        listIC.Add(IC);
                    }

                    if (cerrar && incompletos)
                    {
                        //Cambiar estatus a folio cuantificacion
                        folioCuantificacion.Estatus = "Terminado";
                        folioCuantificacion.UsuarioModificacion = 1; //usuario.UsuarioID; *********************************************************
                        folioCuantificacion.FechaModificacion = DateTime.Now;
                        ctx.SaveChanges();
                    }
                    return "IC";
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