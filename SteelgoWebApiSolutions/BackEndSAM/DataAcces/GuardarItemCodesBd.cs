using BackEndSAM.Models;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
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

        public object TerminarYNuevo(bool cerrar, bool incompletos, int FolioAvisollegadaId, int FolioCuantificacion, List<CuantificacionListado> datosItemCode)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope())
                {
                    using (SamContext ctx = new SamContext())
                    {
                        Sam3_FolioCuantificacion folioCuantificacion = ctx.Sam3_FolioCuantificacion.Where(x => x.FolioAvisoEntradaID == FolioAvisollegadaId && x.FolioCuantificacionID == FolioCuantificacion).AsParallel().SingleOrDefault();
                        List<Sam3_ItemCode> listIC = new List<Sam3_ItemCode>();
                        List<Object> listaNuevosIC = new List<Object>();
                        Sam3_ItemCode IC = null;
                        List<string> creados = new List<string>();

                        creados = (from ic in ctx.Sam3_ItemCode
                                   where ic.Activo
                                   select ic.Codigo).AsParallel().ToList();

                        foreach (var item in datosItemCode)
                        {
                            Sam3_Rel_FolioCuantificacion_ItemCode relIC = new Sam3_Rel_FolioCuantificacion_ItemCode();
                            IC = new Sam3_ItemCode();

                            //Si tengo un bulto guardo en la tabla de bultos
                            if (item.ItemCode == "Bulto")
                            {
                                Sam3_Bulto bulto = new Sam3_Bulto();
                                bulto.FolioCuantificacionID = FolioCuantificacion;
                                bulto.Estatus = "Orden en Proceso de Recepcion";
                                bulto.FechaModificacion = DateTime.Now;
                                bulto.UsuarioModificacion = 1; //usuario.UsuarioID
                                bulto.Activo = true;
                            }
                            else
                            {
                                //Si es un item Code repetido, se suman las cantidades
                                if (creados.Contains(item.ItemCodeCodigo))
                                {
                                    IC = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode).AsParallel().SingleOrDefault();
                                    IC.Cantidad = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode).Select(c => c.Cantidad).AsParallel().SingleOrDefault() + item.Cantidad;
                                    IC.UsuarioModificacion = 1; //usuario.UsuarioID ************************************************************
                                    IC.FechaModificacion = DateTime.Now;
                                }
                                else
                                {

                                    bool existeYnumerosunicos = ctx.Sam3_Rel_FolioCuantificacion_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode && x.FolioCuantificacionID == FolioCuantificacion && x.Activo && x.TieneNumerosUnicos == true).Any();
                                    bool existeSINnumerosunicos = ctx.Sam3_Rel_FolioCuantificacion_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode && x.FolioCuantificacionID == FolioCuantificacion && x.Activo && x.TieneNumerosUnicos == false).Any();

                                    //Si ya existe Item Code y tiene NU
                                    if (existeYnumerosunicos)
                                    {
                                        //Solo suma cantidad
                                        IC = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode).AsParallel().SingleOrDefault();
                                        IC.Cantidad = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode).Select(c => c.Cantidad).AsParallel().SingleOrDefault() + item.Cantidad;
                                        IC.UsuarioModificacion = 1; //usuario.UsuarioID ************************************************************
                                        IC.FechaModificacion = DateTime.Now;
                                    }
                                    else if (existeSINnumerosunicos)
                                    {
                                        //Update IC
                                        IC = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode).AsParallel().SingleOrDefault();
                                        IC.ProyectoID = folioCuantificacion.ProyectoID;
                                        IC.TipoMaterialID = item.TipoMaterial;
                                        IC.Codigo = item.ItemCodeCodigo;

                                        IC.DescripcionEspanol = item.Descripcion;
                                        IC.DescripcionIngles = item.Descripcion;
                                        IC.Peso = item.Peso;
                                        IC.DescripcionInterna = item.Descripcion;
                                        IC.Diametro1 = item.D1;
                                        IC.Diametro2 = item.D2;
                                        IC.FamiliaAceroID = Int32.Parse(item.Familia);
                                        IC.Activo = true;
                                        IC.UsuarioModificacion = 1; //usuario.UsuarioID; *****************************************************************
                                        IC.FechaModificacion = DateTime.Now;
                                        IC.Cantidad = item.Cantidad;
                                        IC.MM = item.MM.ToString() == "N/A" ? null : item.MM;
                                        IC.ColadaID = Int32.Parse(item.Colada);

                                        ctx.SaveChanges();
                                    }
                                    else //no existe
                                    {
                                        //Crea IC
                                        IC.ProyectoID = folioCuantificacion.ProyectoID;
                                        IC.TipoMaterialID = item.TipoMaterial;
                                        IC.Codigo = item.ItemCodeCodigo;
                                        IC.DescripcionEspanol = item.Descripcion;
                                        IC.DescripcionIngles = item.Descripcion;
                                        IC.Peso = item.Peso;
                                        IC.DescripcionInterna = item.Descripcion;
                                        IC.Diametro1 = item.D1;
                                        IC.Diametro2 = item.D2;
                                        IC.FamiliaAceroID = Int32.Parse(item.Familia);
                                        IC.Activo = true;
                                        IC.UsuarioModificacion = 1; //usuario.UsuarioID; *****************************************************************
                                        IC.FechaModificacion = DateTime.Now;
                                        IC.Cantidad = item.Cantidad;
                                        IC.MM = item.MM.ToString() == "N/A" ? null : item.MM;
                                        IC.ColadaID = Int32.Parse(item.Colada);
                                        
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
                                }
                                listaNuevosIC.Add(IC);

                                //Creo relacion ItemCode_ItemCodeSteelgo
                                bool existeRelICS = ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo.Where(x => x.ItemCodeID.ToString() == item.ItemCode && x.ItemCodeSteelgoID == item.ItemCodeSteelgo && x.Activo).Any();

                                if (!existeRelICS)
                                {
                                    Sam3_Rel_ItemCode_ItemCodeSteelgo ics = new Sam3_Rel_ItemCode_ItemCodeSteelgo();
                                    ics.ItemCodeID = Int32.Parse(item.ItemCode);
                                    ics.ItemCodeSteelgoID = item.ItemCodeSteelgo;
                                    ics.Activo = true;
                                    ics.FechaModificacion = DateTime.Now;
                                    ics.UsuarioModificacion = 1; //usuario.UsuarioID;
                                }
                                creados.Add(item.ItemCodeCodigo);
                            }
                        }

                        if (cerrar && incompletos)
                        {
                            //Cambiar estatus a folio cuantificacion
                            folioCuantificacion.Estatus = "Terminado";
                            folioCuantificacion.UsuarioModificacion = 1; //usuario.UsuarioID; *********************************************************
                            folioCuantificacion.FechaModificacion = DateTime.Now;
                            ctx.SaveChanges();
                        }
                        listaNuevosIC.Insert(0,folioCuantificacion.Estatus);
                        scope.Complete();
                        return listaNuevosIC; //enviar tambien el estatus
                    }
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

        public object  SaveAndClose(bool cerrar, bool incompletos, int FolioAvisollegadaId, int FolioCuantificacion, List<CuantificacionListado> datosItemCode)
        { 
            try
            {
                using (TransactionScope scope = new TransactionScope())
                {
                    using (SamContext ctx = new SamContext())
                    {
                        Sam3_FolioCuantificacion folioCuantificacion = ctx.Sam3_FolioCuantificacion.Where(x => x.FolioAvisoEntradaID == FolioAvisollegadaId && x.FolioCuantificacionID == FolioCuantificacion).AsParallel().SingleOrDefault();
                        List<Sam3_ItemCode> listIC = new List<Sam3_ItemCode>();
                        Sam3_ItemCode IC = null;
                        List<string> creados = new List<string>();

                        creados = (from ic in ctx.Sam3_ItemCode
                                   where ic.Activo
                                   select ic.Codigo).AsParallel().ToList();

                        foreach (var item in datosItemCode)
                        {
                            Sam3_Rel_FolioCuantificacion_ItemCode relIC = new Sam3_Rel_FolioCuantificacion_ItemCode();
                            IC = new Sam3_ItemCode();

                            //Si tengo un bulto guardo en la tabla de bultos
                            if (item.ItemCode == "Bulto")
                            {
                                Sam3_Bulto bulto = new Sam3_Bulto();
                                bulto.FolioCuantificacionID = FolioCuantificacion;
                                bulto.Estatus = "Orden en Proceso de Recepcion";
                                bulto.FechaModificacion = DateTime.Now;
                                bulto.UsuarioModificacion = 1; //usuario.UsuarioID
                                bulto.Activo = true;
                            }
                            else
                            {
                                //Si es un item Code repetido, se suman las cantidades
                                if (creados.Contains(item.ItemCodeCodigo))
                                {
                                    IC = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode).AsParallel().SingleOrDefault();
                                    IC.Cantidad = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode).Select(c => c.Cantidad).AsParallel().SingleOrDefault() + item.Cantidad;
                                    IC.UsuarioModificacion = 1; //usuario.UsuarioID ************************************************************
                                    IC.FechaModificacion = DateTime.Now;
                                }
                                else
                                {

                                    bool existeYnumerosunicos = ctx.Sam3_Rel_FolioCuantificacion_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode && x.FolioCuantificacionID == FolioCuantificacion && x.Activo && x.TieneNumerosUnicos == true).Any();
                                    bool existeSINnumerosunicos = ctx.Sam3_Rel_FolioCuantificacion_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode && x.FolioCuantificacionID == FolioCuantificacion && x.Activo && x.TieneNumerosUnicos == false).Any();

                                    //Si ya existe Item Code y tiene NU
                                    if (existeYnumerosunicos)
                                    {
                                        //Solo suma cantidad
                                        IC = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode).AsParallel().SingleOrDefault();
                                        IC.Cantidad = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode).Select(c => c.Cantidad).AsParallel().SingleOrDefault() + item.Cantidad;
                                        IC.UsuarioModificacion = 1; //usuario.UsuarioID ************************************************************
                                        IC.FechaModificacion = DateTime.Now;
                                    }
                                    else if (existeSINnumerosunicos)
                                    {
                                        //Update IC
                                        IC = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode).AsParallel().SingleOrDefault();
                                        IC.ProyectoID = folioCuantificacion.ProyectoID;
                                        IC.TipoMaterialID = item.TipoMaterial;
                                        IC.Codigo = item.ItemCodeCodigo;

                                        IC.DescripcionEspanol = item.Descripcion;
                                        IC.DescripcionIngles = item.Descripcion;
                                        IC.Peso = item.Peso;
                                        IC.DescripcionInterna = item.Descripcion;
                                        IC.Diametro1 = item.D1;
                                        IC.Diametro2 = item.D2;
                                        IC.FamiliaAceroID = Int32.Parse(item.Familia);
                                        IC.Activo = true;
                                        IC.UsuarioModificacion = 1; //usuario.UsuarioID; *****************************************************************
                                        IC.FechaModificacion = DateTime.Now;
                                        IC.Cantidad = item.Cantidad;
                                        IC.MM = item.MM.ToString() == "N/A" ? null : item.MM;
                                        IC.ColadaID = Int32.Parse(item.Colada);

                                        ctx.SaveChanges();
                                    }
                                    else //no existe
                                    {
                                        //Crea IC
                                        IC.ProyectoID = folioCuantificacion.ProyectoID;
                                        IC.TipoMaterialID = item.TipoMaterial;
                                        IC.Codigo = item.ItemCodeCodigo;
                                        IC.DescripcionEspanol = item.Descripcion;
                                        IC.DescripcionIngles = item.Descripcion;
                                        IC.Peso = item.Peso;
                                        IC.DescripcionInterna = item.Descripcion;
                                        IC.Diametro1 = item.D1;
                                        IC.Diametro2 = item.D2;
                                        IC.FamiliaAceroID = Int32.Parse(item.Familia);
                                        IC.Activo = true;
                                        IC.UsuarioModificacion = 1; //usuario.UsuarioID; *****************************************************************
                                        IC.FechaModificacion = DateTime.Now;
                                        IC.Cantidad = item.Cantidad;
                                        IC.MM = item.MM.ToString() == "N/A" ? null : item.MM;
                                        IC.ColadaID = Int32.Parse(item.Colada);

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
                                }
                                listIC.Add(IC);

                                //Creo relacion ItemCode_ItemCodeSteelgo
                                bool existeRelICS = ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo.Where(x => x.ItemCodeID.ToString() == item.ItemCode && x.ItemCodeSteelgoID == item.ItemCodeSteelgo && x.Activo).Any();

                                if (!existeRelICS)
                                {
                                    Sam3_Rel_ItemCode_ItemCodeSteelgo ics = new Sam3_Rel_ItemCode_ItemCodeSteelgo();
                                    ics.ItemCodeID = Int32.Parse(item.ItemCode);
                                    ics.ItemCodeSteelgoID = item.ItemCodeSteelgo;
                                    ics.Activo = true;
                                    ics.FechaModificacion = DateTime.Now;
                                    ics.UsuarioModificacion = 1; //usuario.UsuarioID;
                                }
                                creados.Add(item.ItemCodeCodigo);
                            }
                        }

                        if (cerrar && incompletos)
                        {
                            //Cambiar estatus a folio cuantificacion
                            folioCuantificacion.Estatus = "Cerrado";
                            folioCuantificacion.UsuarioModificacion = 1; //usuario.UsuarioID; *********************************************************
                            folioCuantificacion.FechaModificacion = DateTime.Now;
                            ctx.SaveChanges();
                        }
                        scope.Complete();
                        return listIC; //enviar tambien el estatus
                    }
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

        //Para Bulto
        public object GuardaryTerminar(bool cerrar, bool incompletos, int FolioAvisollegadaId, int FolioCuantificacion, List<CuantificacionListado> datosItemCode)
        {
            try 
            {
                using (TransactionScope scope = new TransactionScope())
                {
                    using (SamContext ctx = new SamContext())
                    {
                        Sam3_FolioCuantificacion folioCuantificacion = ctx.Sam3_FolioCuantificacion.Where(x => x.FolioAvisoEntradaID == FolioAvisollegadaId && x.FolioCuantificacionID == FolioCuantificacion).AsParallel().SingleOrDefault();
                        List<Sam3_ItemCode> listIC = new List<Sam3_ItemCode>();
                        Sam3_ItemCode IC = null;
                        List<string> creados = new List<string>();

                        foreach (var item in datosItemCode)
                        {
                            Sam3_Rel_FolioCuantificacion_ItemCode relIC = new Sam3_Rel_FolioCuantificacion_ItemCode();
                            IC = new Sam3_ItemCode();
                            //Si es un item Code repetido, se suman las cantidades
                            if (creados.Contains(item.ItemCodeCodigo))
                            {
                                IC = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode).AsParallel().SingleOrDefault();
                                IC.Cantidad = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode).Select(c => c.Cantidad).AsParallel().SingleOrDefault() + item.Cantidad;
                                IC.UsuarioModificacion = 1; //usuario.UsuarioID ************************************************************
                                IC.FechaModificacion = DateTime.Now;
                            }
                            else
                            {
                                bool existeYnumerosunicos = ctx.Sam3_Rel_Bulto_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode && x.BultoID.ToString() == item.BultoID && x.Activo && x.TieneNumerosUnicos == true).Any();
                                bool existeSINnumerosunicos = ctx.Sam3_Rel_Bulto_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode && x.BultoID.ToString() == item.BultoID && x.Activo && x.TieneNumerosUnicos == false).Any();

                                //Si ya existe Item Code en la Rel Bulto y tiene NU
                                if (existeYnumerosunicos)
                                {
                                    //Solo suma cantidad
                                    IC = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode).AsParallel().SingleOrDefault();
                                    IC.Cantidad = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode).Select(c => c.Cantidad).AsParallel().SingleOrDefault() + item.Cantidad;
                                    IC.UsuarioModificacion = 1; //usuario.UsuarioID ************************************************************
                                    IC.FechaModificacion = DateTime.Now;
                                }
                                else if (existeSINnumerosunicos)
                                {
                                    //Update IC
                                    IC = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode).AsParallel().SingleOrDefault();
                                    IC.ProyectoID = folioCuantificacion.ProyectoID;
                                    IC.TipoMaterialID = item.TipoMaterial;
                                    IC.Codigo = item.ItemCodeCodigo;

                                    IC.DescripcionEspanol = item.Descripcion;
                                    IC.DescripcionIngles = item.Descripcion;
                                    IC.Peso = item.Peso;
                                    IC.DescripcionInterna = item.Descripcion;
                                    IC.Diametro1 = item.D1;
                                    IC.Diametro2 = item.D2;
                                    IC.FamiliaAceroID = Int32.Parse(item.Familia);
                                    IC.Activo = true;
                                    IC.UsuarioModificacion = 1; //usuario.UsuarioID; *****************************************************************
                                    IC.FechaModificacion = DateTime.Now;
                                    IC.Cantidad = item.Cantidad;
                                    IC.MM = item.MM.ToString() == "N/A" ? null : item.MM;
                                    IC.ColadaID = Int32.Parse(item.Colada);

                                    ctx.SaveChanges();
                                }
                                else //no existe
                                {
                                    //Crea IC
                                    IC.ProyectoID = folioCuantificacion.ProyectoID;
                                    IC.TipoMaterialID = item.TipoMaterial;
                                    IC.Codigo = item.ItemCodeCodigo;
                                    IC.DescripcionEspanol = item.Descripcion;
                                    IC.DescripcionIngles = item.Descripcion;
                                    IC.Peso = item.Peso;
                                    IC.DescripcionInterna = item.Descripcion;
                                    IC.Diametro1 = item.D1;
                                    IC.Diametro2 = item.D2;
                                    IC.FamiliaAceroID = Int32.Parse(item.Familia);
                                    IC.Activo = true;
                                    IC.UsuarioModificacion = 1; //usuario.UsuarioID; *****************************************************************
                                    IC.FechaModificacion = DateTime.Now;
                                    IC.Cantidad = item.Cantidad;
                                    IC.MM = item.MM.ToString() == "N/A" ? null : item.MM;
                                    IC.ColadaID = Int32.Parse(item.Colada);

                                    ctx.Sam3_ItemCode.Add(IC);

                                    //creo la relacion
                                    Sam3_Rel_Bulto_ItemCode bic = new Sam3_Rel_Bulto_ItemCode();
                                    bic.BultoID = Int32.Parse(item.BultoID);
                                    bic.ItemCodeID = IC.ItemCodeID;
                                    bic.TieneNumerosUnicos = false;
                                    bic.FechaModificacion = DateTime.Now;
                                    bic.UsuarioModificacion = 1; //usuario.UsuarioID;
                                    bic.Activo = true;
                                    ctx.Sam3_Rel_Bulto_ItemCode.Add(bic);

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
                            }
                            listIC.Add(IC);

                            //Creo relacion ItemCode_ItemCodeSteelgo
                            bool existeRelICS = ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo.Where(x => x.ItemCodeID.ToString() == item.ItemCode && x.ItemCodeSteelgoID == item.ItemCodeSteelgo && x.Activo).Any();

                            if (!existeRelICS)
                            {
                                Sam3_Rel_ItemCode_ItemCodeSteelgo ics = new Sam3_Rel_ItemCode_ItemCodeSteelgo();
                                ics.ItemCodeID = Int32.Parse(item.ItemCode);
                                ics.ItemCodeSteelgoID = item.ItemCodeSteelgo;
                                ics.Activo = true;
                                ics.FechaModificacion = DateTime.Now;
                                ics.UsuarioModificacion = 1; //usuario.UsuarioID;
                            }
                            creados.Add(item.ItemCodeCodigo);
                        }

                        if (cerrar && incompletos)
                        {
                            //Cambiar estatus al bulto
                            Sam3_Bulto bulto = new Sam3_Bulto();

                            bulto.Estatus = "Terminado";
                            bulto.UsuarioModificacion = 1; //usuario.UsuarioID ***************************************************
                            bulto.FechaModificacion = DateTime.Now;
                            ctx.SaveChanges();
                        }
                        scope.Complete();
                        return listIC; //enviar tambien el estatus
                    }
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

        public object GuardarParcial(bool cerrar, bool incompletos, int FolioAvisollegadaId, int FolioCuantificacion, List<CuantificacionListado> datosItemCode)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope())
                {
                    using (SamContext ctx = new SamContext())
                    {
                        Sam3_FolioCuantificacion folioCuantificacion = ctx.Sam3_FolioCuantificacion.Where(x => x.FolioAvisoEntradaID == FolioAvisollegadaId && x.FolioCuantificacionID == FolioCuantificacion).AsParallel().SingleOrDefault();
                        List<Sam3_ItemCode> listIC = new List<Sam3_ItemCode>();
                        Sam3_ItemCode IC = null;
                        List<string> creados = new List<string>();

                        creados = (from ic in ctx.Sam3_ItemCode
                                   where ic.Activo
                                   select ic.Codigo).AsParallel().ToList();

                        foreach (var item in datosItemCode)
                        {
                            Sam3_Rel_FolioCuantificacion_ItemCode relIC = new Sam3_Rel_FolioCuantificacion_ItemCode();
                            IC = new Sam3_ItemCode();

                            //Si tengo un bulto guardo en la tabla de bultos
                            if (item.ItemCode == "Bulto")
                            {
                                Sam3_Bulto bulto = new Sam3_Bulto();
                                bulto.FolioCuantificacionID = FolioCuantificacion;
                                bulto.Estatus = "Orden en Proceso de Recepcion";
                                bulto.FechaModificacion = DateTime.Now;
                                bulto.UsuarioModificacion = 1; //usuario.UsuarioID
                                bulto.Activo = true;
                            }
                            else
                            {
                                //Si es un item Code repetido, se suman las cantidades
                                if (creados.Contains(item.ItemCodeCodigo))
                                {
                                    IC = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode).AsParallel().SingleOrDefault();
                                    IC.Cantidad = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode).Select(c => c.Cantidad).AsParallel().SingleOrDefault() + item.Cantidad;
                                    IC.UsuarioModificacion = 1; //usuario.UsuarioID ************************************************************
                                    IC.FechaModificacion = DateTime.Now;
                                }
                                else
                                {

                                    bool existeYnumerosunicos = ctx.Sam3_Rel_FolioCuantificacion_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode && x.FolioCuantificacionID == FolioCuantificacion && x.Activo && x.TieneNumerosUnicos == true).Any();
                                    bool existeSINnumerosunicos = ctx.Sam3_Rel_FolioCuantificacion_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode && x.FolioCuantificacionID == FolioCuantificacion && x.Activo && x.TieneNumerosUnicos == false).Any();

                                    //Si ya existe Item Code y tiene NU
                                    if (existeYnumerosunicos)
                                    {
                                        //Solo suma cantidad
                                        IC = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode).AsParallel().SingleOrDefault();
                                        IC.Cantidad = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode).Select(c => c.Cantidad).AsParallel().SingleOrDefault() + item.Cantidad;
                                        IC.UsuarioModificacion = 1; //usuario.UsuarioID ************************************************************
                                        IC.FechaModificacion = DateTime.Now;
                                    }
                                    else if (existeSINnumerosunicos)
                                    {
                                        //Update IC
                                        IC = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode).AsParallel().SingleOrDefault();
                                        IC.ProyectoID = folioCuantificacion.ProyectoID;
                                        IC.TipoMaterialID = item.TipoMaterial;
                                        IC.Codigo = item.ItemCodeCodigo;

                                        IC.DescripcionEspanol = item.Descripcion;
                                        IC.DescripcionIngles = item.Descripcion;
                                        IC.Peso = item.Peso;
                                        IC.DescripcionInterna = item.Descripcion;
                                        IC.Diametro1 = item.D1;
                                        IC.Diametro2 = item.D2;
                                        IC.FamiliaAceroID = Int32.Parse(item.Familia);
                                        IC.Activo = true;
                                        IC.UsuarioModificacion = 1; //usuario.UsuarioID; *****************************************************************
                                        IC.FechaModificacion = DateTime.Now;
                                        IC.Cantidad = item.Cantidad;
                                        IC.MM = item.MM.ToString() == "N/A" ? null : item.MM;
                                        IC.ColadaID = Int32.Parse(item.Colada);

                                        ctx.SaveChanges();
                                    }
                                    else //no existe
                                    {
                                        //Crea IC
                                        IC.ProyectoID = folioCuantificacion.ProyectoID;
                                        IC.TipoMaterialID = item.TipoMaterial;
                                        IC.Codigo = item.ItemCodeCodigo;
                                        IC.DescripcionEspanol = item.Descripcion;
                                        IC.DescripcionIngles = item.Descripcion;
                                        IC.Peso = item.Peso;
                                        IC.DescripcionInterna = item.Descripcion;
                                        IC.Diametro1 = item.D1;
                                        IC.Diametro2 = item.D2;
                                        IC.FamiliaAceroID = Int32.Parse(item.Familia);
                                        IC.Activo = true;
                                        IC.UsuarioModificacion = 1; //usuario.UsuarioID; *****************************************************************
                                        IC.FechaModificacion = DateTime.Now;
                                        IC.Cantidad = item.Cantidad;
                                        IC.MM = item.MM.ToString() == "N/A" ? null : item.MM;
                                        IC.ColadaID = Int32.Parse(item.Colada);

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
                                }
                                listIC.Add(IC);

                                //Creo relacion ItemCode_ItemCodeSteelgo
                                bool existeRelICS = ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo.Where(x => x.ItemCodeID.ToString() == item.ItemCode && x.ItemCodeSteelgoID == item.ItemCodeSteelgo && x.Activo).Any();

                                if (!existeRelICS)
                                {
                                    Sam3_Rel_ItemCode_ItemCodeSteelgo ics = new Sam3_Rel_ItemCode_ItemCodeSteelgo();
                                    ics.ItemCodeID = Int32.Parse(item.ItemCode);
                                    ics.ItemCodeSteelgoID = item.ItemCodeSteelgo;
                                    ics.Activo = true;
                                    ics.FechaModificacion = DateTime.Now;
                                    ics.UsuarioModificacion = 1; //usuario.UsuarioID;
                                }
                                creados.Add(item.ItemCodeCodigo);
                            }
                        }

                        if (cerrar && incompletos)
                        {
                            //Cambiar estatus a folio cuantificacion
                            folioCuantificacion.Estatus = "Orden en Proceso de Recepcion";
                            folioCuantificacion.UsuarioModificacion = 1; //usuario.UsuarioID; *********************************************************
                            folioCuantificacion.FechaModificacion = DateTime.Now;
                            ctx.SaveChanges();
                        }
                        scope.Complete();
                        return listIC; //enviar tambien el estatus
                    }
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

        public object GuardarParcialBulto(bool cerrar, bool incompletos, int FolioAvisollegadaId, int FolioCuantificacion, List<CuantificacionListado> datosItemCode)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope())
                {
                    using (SamContext ctx = new SamContext())
                    {
                        Sam3_FolioCuantificacion folioCuantificacion = ctx.Sam3_FolioCuantificacion.Where(x => x.FolioAvisoEntradaID == FolioAvisollegadaId && x.FolioCuantificacionID == FolioCuantificacion).AsParallel().SingleOrDefault();
                        List<Sam3_ItemCode> listIC = new List<Sam3_ItemCode>();
                        Sam3_ItemCode IC = null;
                        List<string> creados = new List<string>();

                        foreach (var item in datosItemCode)
                        {
                            Sam3_Rel_FolioCuantificacion_ItemCode relIC = new Sam3_Rel_FolioCuantificacion_ItemCode();
                            IC = new Sam3_ItemCode();

                            //Si es un item Code repetido, se suman las cantidades
                            if (creados.Contains(item.ItemCodeCodigo))
                            {
                                IC = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode).AsParallel().SingleOrDefault();
                                IC.Cantidad = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode).Select(c => c.Cantidad).AsParallel().SingleOrDefault() + item.Cantidad;
                                IC.UsuarioModificacion = 1; //usuario.UsuarioID ************************************************************
                                IC.FechaModificacion = DateTime.Now;
                            }
                            else
                            {
                                bool existeYnumerosunicos = ctx.Sam3_Rel_Bulto_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode && x.BultoID.ToString() == item.BultoID && x.Activo && x.TieneNumerosUnicos == true).Any();
                                bool existeSINnumerosunicos = ctx.Sam3_Rel_Bulto_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode && x.BultoID.ToString() == item.BultoID && x.Activo && x.TieneNumerosUnicos == false).Any();

                                //Si ya existe Item Code en la Rel Bulto y tiene NU
                                if (existeYnumerosunicos)
                                {
                                    //Solo suma cantidad
                                    IC = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode).AsParallel().SingleOrDefault();
                                    IC.Cantidad = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode).Select(c => c.Cantidad).AsParallel().SingleOrDefault() + item.Cantidad;
                                    IC.UsuarioModificacion = 1; //usuario.UsuarioID ************************************************************
                                    IC.FechaModificacion = DateTime.Now;
                                }
                                else if (existeSINnumerosunicos)
                                {
                                    //Update IC
                                    IC = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode).AsParallel().SingleOrDefault();
                                    IC.ProyectoID = folioCuantificacion.ProyectoID;
                                    IC.TipoMaterialID = item.TipoMaterial;
                                    IC.Codigo = item.ItemCodeCodigo;

                                    IC.DescripcionEspanol = item.Descripcion;
                                    IC.DescripcionIngles = item.Descripcion;
                                    IC.Peso = item.Peso;
                                    IC.DescripcionInterna = item.Descripcion;
                                    IC.Diametro1 = item.D1;
                                    IC.Diametro2 = item.D2;
                                    IC.FamiliaAceroID = Int32.Parse(item.Familia);
                                    IC.Activo = true;
                                    IC.UsuarioModificacion = 1; //usuario.UsuarioID; *****************************************************************
                                    IC.FechaModificacion = DateTime.Now;
                                    IC.Cantidad = item.Cantidad;
                                    IC.MM = item.MM.ToString() == "N/A" ? null : item.MM;
                                    IC.ColadaID = Int32.Parse(item.Colada);

                                    ctx.SaveChanges();
                                }
                                else //no existe
                                {
                                    //Crea IC
                                    IC.ProyectoID = folioCuantificacion.ProyectoID;
                                    IC.TipoMaterialID = item.TipoMaterial;
                                    IC.Codigo = item.ItemCodeCodigo;
                                    IC.DescripcionEspanol = item.Descripcion;
                                    IC.DescripcionIngles = item.Descripcion;
                                    IC.Peso = item.Peso;
                                    IC.DescripcionInterna = item.Descripcion;
                                    IC.Diametro1 = item.D1;
                                    IC.Diametro2 = item.D2;
                                    IC.FamiliaAceroID = Int32.Parse(item.Familia);
                                    IC.Activo = true;
                                    IC.UsuarioModificacion = 1; //usuario.UsuarioID; *****************************************************************
                                    IC.FechaModificacion = DateTime.Now;
                                    IC.Cantidad = item.Cantidad;
                                    IC.MM = item.MM.ToString() == "N/A" ? null : item.MM;
                                    IC.ColadaID = Int32.Parse(item.Colada);

                                    ctx.Sam3_ItemCode.Add(IC);

                                    //creo la relacion
                                    Sam3_Rel_Bulto_ItemCode bic = new Sam3_Rel_Bulto_ItemCode();
                                    bic.BultoID = Int32.Parse(item.BultoID);
                                    bic.ItemCodeID = IC.ItemCodeID;
                                    bic.TieneNumerosUnicos = false;
                                    bic.FechaModificacion = DateTime.Now;
                                    bic.UsuarioModificacion = 1; //usuario.UsuarioID;
                                    bic.Activo = true;
                                    ctx.Sam3_Rel_Bulto_ItemCode.Add(bic);

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
                            }
                            listIC.Add(IC);

                            //Creo relacion ItemCode_ItemCodeSteelgo
                            bool existeRelICS = ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo.Where(x => x.ItemCodeID.ToString() == item.ItemCode && x.ItemCodeSteelgoID == item.ItemCodeSteelgo && x.Activo).Any();

                            if (!existeRelICS)
                            {
                                Sam3_Rel_ItemCode_ItemCodeSteelgo ics = new Sam3_Rel_ItemCode_ItemCodeSteelgo();
                                ics.ItemCodeID = Int32.Parse(item.ItemCode);
                                ics.ItemCodeSteelgoID = item.ItemCodeSteelgo;
                                ics.Activo = true;
                                ics.FechaModificacion = DateTime.Now;
                                ics.UsuarioModificacion = 1; //usuario.UsuarioID;
                            }
                            creados.Add(item.ItemCodeCodigo);
                        }

                        if (cerrar && incompletos)
                        {
                            //Cambiar estatus al bulto
                            Sam3_Bulto bulto = new Sam3_Bulto();

                            bulto.Estatus = "Orden en Proceso de Recepcion";
                            bulto.UsuarioModificacion = 1; //usuario.UsuarioID ***************************************************
                            bulto.FechaModificacion = DateTime.Now;
                            ctx.SaveChanges();
                        }
                        scope.Complete();
                        return listIC; //enviar tambien el estatus
                    }
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