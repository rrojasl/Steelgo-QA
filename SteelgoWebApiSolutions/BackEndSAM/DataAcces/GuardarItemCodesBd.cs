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

        public object GuardadoInformacionItemCodes(bool cerrar, bool incompletos, int FolioAvisollegadaId, int FolioCuantificacion, List<CuantificacionListado> datosItemCode, Sam3_Usuario usuario, int tipoGuardado)
        {
            try
            {
                List<Sam3_ItemCode> listIC = new List<Sam3_ItemCode>();
                List<CuantificacionListado> listaNuevosIC = new List<CuantificacionListado>();
                Sam3_ItemCode IC = null;
                Sam3_ItemCodeSteelgo ICS = null;
                Sam3_Bulto bulto = null;
                List<string> creados = new List<string>();
                bool TieneErrores = false;

                using (TransactionScope scope = new TransactionScope())
                {
                    using (SamContext ctx = new SamContext())
                    {
                        int avisoEntradaID = ctx.Sam3_FolioAvisoEntrada.Where(x => x.FolioAvisoLlegadaID == FolioAvisollegadaId && x.Activo).Select(x => x.FolioAvisoEntradaID).AsParallel().First();
                        Sam3_FolioCuantificacion folioCuantificacion = ctx.Sam3_FolioCuantificacion.Where(x => x.FolioAvisoEntradaID == avisoEntradaID && x.FolioCuantificacionID == FolioCuantificacion).AsParallel().SingleOrDefault();

                        switch (tipoGuardado)
                        {
                            case 1: //Terminar y Nuevo
                                #region Terminar y Nuevo

                                if (cerrar && !incompletos)
                                {
                                    //Cambiar estatus a folio cuantificacion
                                    folioCuantificacion.Estatus = "Terminado";
                                    folioCuantificacion.UsuarioModificacion = 1;//usuario.UsuarioID;
                                    folioCuantificacion.FechaModificacion = DateTime.Now;
                                    ctx.SaveChanges();
                                }

                                foreach (var item in datosItemCode)
                                {
                                    //Obtenemos IDS
                                    int itemCodeID = (from ic in ctx.Sam3_ItemCode where ic.Codigo == item.ItemCode  select ic.ItemCodeID).AsParallel().Single();
                                    int itemCodeSteelgoID = (from ics in ctx.Sam3_ItemCodeSteelgo where ics.Codigo == item.ItemCodeSteelgo select ics.ItemCodeSteelgoID).AsParallel().Single();
                                    int familiaID = (from fa in ctx.Sam3_FamiliaAcero where fa.Nombre == item.Familia select fa.FamiliaAceroID).AsParallel().FirstOrDefault();
                                    int tipoAceroID = (from fm in ctx.Sam3_FamiliaMaterial where fm.Nombre == item.TipoAcero select fm.FamiliaMaterialID).AsParallel().FirstOrDefault();
                                    int coladaID = (from c in ctx.Sam3_Colada where c.NumeroColada == item.Colada select c.ColadaID).AsParallel().FirstOrDefault();
                                    int tipoMaterialID = (from tm in ctx.Sam3_ItemCode where tm.ItemCodeID == itemCodeID select tm.TipoMaterialID).AsParallel().FirstOrDefault();

                                    item.ItemCodeID = itemCodeID.ToString();
                                    item.ItemCodeSteelgoID = itemCodeSteelgoID.ToString();
                                    item.FamiliaMaterial = familiaID.ToString();
                                    item.TipoAceroID = tipoAceroID;
                                    item.Colada = coladaID.ToString();
                                    item.TipoMaterial = tipoMaterialID;

                                    IC = new Sam3_ItemCode();
                                    ICS = new Sam3_ItemCodeSteelgo();
                                    bulto = new Sam3_Bulto();

                                    //Si tengo un bulto guardo en la tabla de bultos
                                    if (item.ItemCode == "Bulto")
                                    {
                                        bulto = InsertarBulto(FolioCuantificacion);
                                    }
                                    else
                                    {
                                        //Si es un item Code repetido en el grid, se suman las cantidades
                                        if (!creados.Contains(item.ItemCodeID))
                                        {
                                            bool existeYnumerosunicos = ctx.Sam3_Rel_FolioCuantificacion_ItemCode.Where(x => x.ItemCodeID == itemCodeID && x.FolioCuantificacionID == FolioCuantificacion && x.Activo && x.TieneNumerosUnicos == true).Any();
                                            bool existeSINnumerosunicos = ctx.Sam3_Rel_FolioCuantificacion_ItemCode.Where(x => x.ItemCodeID == itemCodeID && x.FolioCuantificacionID == FolioCuantificacion && x.Activo && x.TieneNumerosUnicos == false).Any();

                                            //Si ya existe Item Code y tiene NU
                                            if (existeYnumerosunicos)
                                            {
                                                TieneErrores = SumarCantidades(item, IC);
                                            }
                                            else //Si no tiene NU o no existe en la tabla de Relacion FC_IC
                                            {
                                                //Creo relacion ItemCode_ItemCodeSteelgo
                                                bool existeRelICS = ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo.Where(x => x.ItemCodeID.ToString() == item.ItemCode && x.ItemCodeSteelgoID.ToString() == item.ItemCodeSteelgo && x.Activo).Any();

                                                if (!existeRelICS)
                                                {
                                                    InsertarRelacionIC_ICS(item);
                                                }

                                                //Update IC y ICS
                                                IC = ActualizarItemCode(item, IC);
                                                ICS = ActualizarItemCodeSteelgo(item, ICS);

                                                if (!existeSINnumerosunicos)
                                                {
                                                    //Insertar la Relacion Folio Cuantificacion IC
                                                    InsertarRelacionFolioCuantificacion_IC(FolioCuantificacion, IC);
                                                }
                                            }
                                        }
                                        else //Si es repetido en el grid
                                        {
                                            IC = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode).AsParallel().SingleOrDefault();
                                            IC.Cantidad = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode).Select(c => c.Cantidad).AsParallel().SingleOrDefault() + item.Cantidad;
                                            IC.UsuarioModificacion = 1;// usuario.UsuarioID;
                                            IC.FechaModificacion = DateTime.Now;
                                        }

                                        listaNuevosIC.Add(new CuantificacionListado
                                        {
                                            ItemCodeID = IC.ItemCodeID.ToString(),
                                            TipoMaterial = IC.TipoMaterialID,
                                            ItemCode = IC.Codigo,
                                            ItemCodeSteelgo = ICS.Codigo,
                                            ItemCodeSteelgoID = ICS.ItemCodeSteelgoID.ToString(),
                                            Descripcion = ICS.DescripcionEspanol,
                                            Peso = ICS.Peso,
                                            Cedula = item.Cedula,
                                            D1 = ICS.Diametro1,
                                            D2 = ICS.Diametro2,
                                            Familia = item.Familia,
                                            TipoAcero = item.TipoAcero,
                                            Cantidad = IC.Cantidad,
                                            MM = IC.MM,
                                            Colada = item.Colada,
                                            TieneError = TieneErrores,
                                            Estatus = folioCuantificacion.Estatus,
                                            TieneNU = item.TieneNU
                                        });

                                        creados.Add(item.ItemCodeID);
                                    }
                                }
                                scope.Complete();
                                #endregion
                                break;

                            case 2: //Guardar y Cerrar
                                #region Guardar y Cerrar
                                if (cerrar && !incompletos)
                                {
                                    //Cambiar estatus a folio cuantificacion
                                    folioCuantificacion.Estatus = "Cerrado";
                                    folioCuantificacion.UsuarioModificacion = 1;//usuario.UsuarioID;
                                    folioCuantificacion.FechaModificacion = DateTime.Now;
                                    ctx.SaveChanges();
                                }

                                 foreach (var item in datosItemCode)
                                {
                                    //Obtenemos IDS
                                    int itemCodeID = (from ic in ctx.Sam3_ItemCode where ic.Codigo == item.ItemCode  select ic.ItemCodeID).AsParallel().Single();
                                    int itemCodeSteelgoID = (from ics in ctx.Sam3_ItemCodeSteelgo where ics.Codigo == item.ItemCodeSteelgo select ics.ItemCodeSteelgoID).AsParallel().Single();
                                    int familiaID = (from fa in ctx.Sam3_FamiliaAcero where fa.Nombre == item.Familia select fa.FamiliaAceroID).AsParallel().FirstOrDefault();
                                    int tipoAceroID = (from fm in ctx.Sam3_FamiliaMaterial where fm.Nombre == item.TipoAcero select fm.FamiliaMaterialID).AsParallel().FirstOrDefault();
                                    int coladaID = (from c in ctx.Sam3_Colada where c.NumeroColada == item.Colada select c.ColadaID).AsParallel().FirstOrDefault();
                                    int tipoMaterialID = (from tm in ctx.Sam3_ItemCode where tm.ItemCodeID == itemCodeID select tm.TipoMaterialID).AsParallel().FirstOrDefault();

                                    item.ItemCodeID = itemCodeID.ToString();
                                    item.ItemCodeSteelgoID = itemCodeSteelgoID.ToString();
                                    item.FamiliaMaterial = familiaID.ToString();
                                    item.TipoAceroID = tipoAceroID;
                                    item.Colada = coladaID.ToString();
                                    item.TipoMaterial = tipoMaterialID;

                                    IC = new Sam3_ItemCode();
                                    ICS = new Sam3_ItemCodeSteelgo();
                                    bulto = new Sam3_Bulto();

                                    //Si tengo un bulto guardo en la tabla de bultos
                                    if (item.ItemCode == "Bulto")
                                    {
                                        bulto = InsertarBulto(FolioCuantificacion);
                                    }
                                    else
                                    {
                                        //Si es un item Code repetido en el grid, se suman las cantidades
                                        if (!creados.Contains(item.ItemCodeID))
                                        {
                                            bool existeYnumerosunicos = ctx.Sam3_Rel_FolioCuantificacion_ItemCode.Where(x => x.ItemCodeID == itemCodeID && x.FolioCuantificacionID == FolioCuantificacion && x.Activo && x.TieneNumerosUnicos == true).Any();
                                            bool existeSINnumerosunicos = ctx.Sam3_Rel_FolioCuantificacion_ItemCode.Where(x => x.ItemCodeID == itemCodeID && x.FolioCuantificacionID == FolioCuantificacion && x.Activo && x.TieneNumerosUnicos == false).Any();

                                            //Si ya existe Item Code y tiene NU
                                            if (existeYnumerosunicos)
                                            {
                                                TieneErrores = SumarCantidades(item, IC);
                                            }
                                            else //Si no tiene NU o no existe en la tabla de Relacion FC_IC
                                            {
                                                //Creo relacion ItemCode_ItemCodeSteelgo
                                                bool existeRelICS = ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo.Where(x => x.ItemCodeID.ToString() == item.ItemCode && x.ItemCodeSteelgoID.ToString() == item.ItemCodeSteelgo && x.Activo).Any();

                                                if (!existeRelICS)
                                                {
                                                    InsertarRelacionIC_ICS(item);
                                                }

                                                //Update IC y ICS
                                                IC = ActualizarItemCode(item, IC);
                                                ICS = ActualizarItemCodeSteelgo(item, ICS);

                                                if (!existeSINnumerosunicos)
                                                {
                                                    //Insertar la Relacion Folio Cuantificacion IC
                                                    InsertarRelacionFolioCuantificacion_IC(FolioCuantificacion, IC);
                                                }
                                            }
                                        }
                                        else //Si es repetido en el grid
                                        {
                                            IC = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode).AsParallel().SingleOrDefault();
                                            IC.Cantidad = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode).Select(c => c.Cantidad).AsParallel().SingleOrDefault() + item.Cantidad;
                                            IC.UsuarioModificacion = 1;// usuario.UsuarioID;
                                            IC.FechaModificacion = DateTime.Now;
                                        }

                                        listaNuevosIC.Add(new CuantificacionListado
                                        {
                                            ItemCodeID = IC.ItemCodeID.ToString(),
                                            TipoMaterial = IC.TipoMaterialID,
                                            ItemCode = IC.Codigo,
                                            ItemCodeSteelgo = ICS.Codigo,
                                            ItemCodeSteelgoID = ICS.ItemCodeSteelgoID.ToString(),
                                            Descripcion = ICS.DescripcionEspanol,
                                            Peso = ICS.Peso,
                                            Cedula = item.Cedula,
                                            D1 = ICS.Diametro1,
                                            D2 = ICS.Diametro2,
                                            Familia = item.Familia,
                                            TipoAcero = item.TipoAcero,
                                            Cantidad = IC.Cantidad,
                                            MM = IC.MM,
                                            Colada = item.Colada,
                                            TieneError = TieneErrores,
                                            Estatus = folioCuantificacion.Estatus,
                                            TieneNU = item.TieneNU
                                        });

                                        creados.Add(item.ItemCodeID);
                                    }
                                }
                                scope.Complete();

                                #endregion
                                break;
                            case 3: //Guardar Parcial
                                #region Guardar Parcial
                                 foreach (var item in datosItemCode)
                                {
                                    //Obtenemos IDS
                                    int itemCodeID = (from ic in ctx.Sam3_ItemCode where ic.Codigo == item.ItemCode  select ic.ItemCodeID).AsParallel().Single();
                                    int itemCodeSteelgoID = (from ics in ctx.Sam3_ItemCodeSteelgo where ics.Codigo == item.ItemCodeSteelgo select ics.ItemCodeSteelgoID).AsParallel().Single();
                                    int familiaID = (from fa in ctx.Sam3_FamiliaAcero where fa.Nombre == item.Familia select fa.FamiliaAceroID).AsParallel().FirstOrDefault();
                                    int tipoAceroID = (from fm in ctx.Sam3_FamiliaMaterial where fm.Nombre == item.TipoAcero select fm.FamiliaMaterialID).AsParallel().FirstOrDefault();
                                    int coladaID = (from c in ctx.Sam3_Colada where c.NumeroColada == item.Colada select c.ColadaID).AsParallel().FirstOrDefault();
                                    int tipoMaterialID = (from tm in ctx.Sam3_ItemCode where tm.ItemCodeID == itemCodeID select tm.TipoMaterialID).AsParallel().FirstOrDefault();

                                    item.ItemCodeID = itemCodeID.ToString();
                                    item.ItemCodeSteelgoID = itemCodeSteelgoID.ToString();
                                    item.FamiliaMaterial = familiaID.ToString();
                                    item.TipoAceroID = tipoAceroID;
                                    item.Colada = coladaID.ToString();
                                    item.TipoMaterial = tipoMaterialID;

                                    IC = new Sam3_ItemCode();
                                    ICS = new Sam3_ItemCodeSteelgo();
                                    bulto = new Sam3_Bulto();

                                    //Si tengo un bulto guardo en la tabla de bultos
                                    if (item.ItemCode == "Bulto")
                                    {
                                        bulto = InsertarBulto(FolioCuantificacion);
                                    }
                                    else
                                    {
                                        //Si es un item Code repetido en el grid, se suman las cantidades
                                        if (!creados.Contains(item.ItemCodeID))
                                        {
                                            bool existeYnumerosunicos = ctx.Sam3_Rel_FolioCuantificacion_ItemCode.Where(x => x.ItemCodeID == itemCodeID && x.FolioCuantificacionID == FolioCuantificacion && x.Activo && x.TieneNumerosUnicos == true).Any();
                                            bool existeSINnumerosunicos = ctx.Sam3_Rel_FolioCuantificacion_ItemCode.Where(x => x.ItemCodeID == itemCodeID && x.FolioCuantificacionID == FolioCuantificacion && x.Activo && x.TieneNumerosUnicos == false).Any();

                                            //Si ya existe Item Code y tiene NU
                                            if (existeYnumerosunicos)
                                            {
                                                TieneErrores = SumarCantidades(item, IC);
                                            }
                                            else //Si no tiene NU o no existe en la tabla de Relacion FC_IC
                                            {
                                                //Creo relacion ItemCode_ItemCodeSteelgo
                                                bool existeRelICS = ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo.Where(x => x.ItemCodeID.ToString() == item.ItemCode && x.ItemCodeSteelgoID.ToString() == item.ItemCodeSteelgo && x.Activo).Any();

                                                if (!existeRelICS)
                                                {
                                                    InsertarRelacionIC_ICS(item);
                                                }

                                                //Update IC y ICS
                                                IC = ActualizarItemCode(item, IC);
                                                ICS = ActualizarItemCodeSteelgo(item, ICS);

                                                if (!existeSINnumerosunicos)
                                                {
                                                    //Insertar la Relacion Folio Cuantificacion IC
                                                    InsertarRelacionFolioCuantificacion_IC(FolioCuantificacion, IC);
                                                }
                                            }
                                        }
                                        else //Si es repetido en el grid
                                        {
                                            IC = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode).AsParallel().SingleOrDefault();
                                            IC.Cantidad = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode).Select(c => c.Cantidad).AsParallel().SingleOrDefault() + item.Cantidad;
                                            IC.UsuarioModificacion = 1;// usuario.UsuarioID;
                                            IC.FechaModificacion = DateTime.Now;
                                        }

                                        listaNuevosIC.Add(new CuantificacionListado
                                        {
                                            ItemCodeID = IC.ItemCodeID.ToString(),
                                            TipoMaterial = IC.TipoMaterialID,
                                            ItemCode = IC.Codigo,
                                            ItemCodeSteelgo = ICS.Codigo,
                                            ItemCodeSteelgoID = ICS.ItemCodeSteelgoID.ToString(),
                                            Descripcion = ICS.DescripcionEspanol,
                                            Peso = ICS.Peso,
                                            Cedula = item.Cedula,
                                            D1 = ICS.Diametro1,
                                            D2 = ICS.Diametro2,
                                            Familia = item.Familia,
                                            TipoAcero = item.TipoAcero,
                                            Cantidad = IC.Cantidad,
                                            MM = IC.MM,
                                            Colada = item.Colada,
                                            TieneError = TieneErrores,
                                            Estatus = folioCuantificacion.Estatus,
                                            TieneNU = item.TieneNU
                                        });

                                        creados.Add(item.ItemCodeID);
                                    }
                                }
                                scope.Complete();
                                #endregion
                                break;

                            case 4: //Guardar y Terminar (Bulto)
                                #region Guardar y Terminar (Bulto)
                                if (cerrar && !incompletos)
                                {
                                    //Cambiar estatus al bulto
                                    bulto = new Sam3_Bulto();

                                    bulto.Estatus = "Terminado";
                                    bulto.UsuarioModificacion = usuario.UsuarioID;
                                    bulto.FechaModificacion = DateTime.Now;
                                    ctx.SaveChanges();
                                }
                                foreach (var item in datosItemCode)
                                {
                                    //Obtenemos IDS
                                    int itemCodeID = (from ic in ctx.Sam3_ItemCode where ic.Codigo == item.ItemCode select ic.ItemCodeID).AsParallel().Single();
                                    int itemCodeSteelgoID = (from ics in ctx.Sam3_ItemCodeSteelgo where ics.Codigo == item.ItemCodeSteelgo select ics.ItemCodeSteelgoID).AsParallel().Single();
                                    int familiaID = (from fa in ctx.Sam3_FamiliaAcero where fa.Nombre == item.FamiliaMaterial select fa.FamiliaAceroID).AsParallel().FirstOrDefault();
                                    int tipoAceroID = (from fm in ctx.Sam3_FamiliaMaterial where fm.Nombre == item.TipoAcero select fm.FamiliaMaterialID).AsParallel().FirstOrDefault();
                                    int coladaID = (from c in ctx.Sam3_Colada where c.NumeroColada == item.Colada select c.ColadaID).AsParallel().FirstOrDefault();
                                    int tipoMaterialID = (from tm in ctx.Sam3_ItemCode where tm.ItemCodeID == itemCodeID select tm.TipoMaterialID).AsParallel().FirstOrDefault();

                                    item.ItemCode = itemCodeID.ToString();
                                    item.ItemCodeSteelgo = itemCodeSteelgoID.ToString();
                                    item.FamiliaMaterial = familiaID.ToString();
                                    item.TipoAceroID = tipoAceroID;
                                    item.Colada = coladaID.ToString();
                                    item.TipoMaterial = tipoMaterialID;

                                    IC = new Sam3_ItemCode();
                                    ICS = new Sam3_ItemCodeSteelgo();

                                    //Si tengo un bulto guardo en la tabla de bultos
                                    if (item.ItemCode == "Bulto")
                                    {
                                        TieneErrores = true;
                                    }
                                    else
                                    {
                                        //Si es un item Code repetido en el grid, se suman las cantidades
                                        if (!creados.Contains(item.ItemCodeID))
                                        {
                                            bool existeYnumerosunicos = ctx.Sam3_Rel_Bulto_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode && x.BultoID.ToString() == item.BultoID && x.Activo && x.TieneNumerosUnicos == true).Any();
                                            bool existeSINnumerosunicos = ctx.Sam3_Rel_Bulto_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode && x.BultoID.ToString() == item.BultoID && x.Activo && x.TieneNumerosUnicos == false).Any();

                                            //Si ya existe Item Code en la Rel Bulto y tiene NU
                                            if (existeYnumerosunicos)
                                            {
                                                TieneErrores = SumarCantidades(item, IC);
                                            }
                                            else //Si no tiene NU o no existe en la tabla de Relacion FC_IC
                                            {
                                                //Creo relacion ItemCode_ItemCodeSteelgo
                                                bool existeRelICS = ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo.Where(x => x.ItemCodeID.ToString() == item.ItemCodeID && x.ItemCodeSteelgoID.ToString() == item.ItemCodeSteelgoID && x.Activo).Any();

                                                if (!existeRelICS)
                                                {
                                                    InsertarRelacionIC_ICS(item);
                                                }

                                                //Update IC y ICS
                                                IC = ActualizarItemCode(item, IC);
                                                ICS = ActualizarItemCodeSteelgo(item, ICS);

                                                //creo la relacion bulto IC
                                                Sam3_Rel_Bulto_ItemCode bic = new Sam3_Rel_Bulto_ItemCode();
                                                bic.BultoID = Int32.Parse(item.BultoID);
                                                bic.ItemCodeID = IC.ItemCodeID;
                                                bic.TieneNumerosUnicos = false;
                                                bic.FechaModificacion = DateTime.Now;
                                                bic.UsuarioModificacion = usuario.UsuarioID;
                                                bic.Activo = true;
                                                ctx.Sam3_Rel_Bulto_ItemCode.Add(bic);

                                                if (!existeSINnumerosunicos)
                                                {
                                                    //Insertar la Relacion Folio Cuantificacion IC
                                                    InsertarRelacionFolioCuantificacion_IC(FolioCuantificacion, IC);
                                                }
                                            }
                                        }
                                        else //Si es repetido en el grid
                                        {
                                            IC = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCodeID).AsParallel().SingleOrDefault();
                                            IC.Cantidad = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCodeID).Select(c => c.Cantidad).AsParallel().SingleOrDefault() + item.Cantidad;
                                            IC.UsuarioModificacion = 1;// usuario.UsuarioID;
                                            IC.FechaModificacion = DateTime.Now;
                                        }

                                        listaNuevosIC.Add(new CuantificacionListado
                                        {
                                            ItemCodeID = IC.ItemCodeID.ToString(),
                                            TipoMaterial = IC.TipoMaterialID,
                                            ItemCode = IC.Codigo,
                                            ItemCodeSteelgo = ICS.Codigo,
                                            ItemCodeSteelgoID = ICS.ItemCodeSteelgoID.ToString(),
                                            Descripcion = ICS.DescripcionEspanol,
                                            Peso = ICS.Peso,
                                            Cedula = item.Cedula,
                                            D1 = ICS.Diametro1,
                                            D2 = ICS.Diametro2,
                                            Familia = item.Familia,
                                            TipoAcero = item.TipoAcero,
                                            Cantidad = IC.Cantidad,
                                            MM = IC.MM,
                                            Colada = item.Colada,
                                            TieneError = TieneErrores,
                                            Estatus = folioCuantificacion.Estatus,
                                            TieneNU = item.TieneNU
                                        });

                                        creados.Add(item.ItemCodeID);
                                    }
                                }
                                scope.Complete();

                                #endregion
                                break;

                            case 5: // Guardar Parcial (bulto)
                                #region Guardar Parcial (bulto)
                                foreach (var item in datosItemCode)
                                {
                                    //Obtenemos IDS
                                    int itemCodeID = (from ic in ctx.Sam3_ItemCode where ic.Codigo == item.ItemCode select ic.ItemCodeID).AsParallel().Single();
                                    int itemCodeSteelgoID = (from ics in ctx.Sam3_ItemCodeSteelgo where ics.Codigo == item.ItemCodeSteelgo select ics.ItemCodeSteelgoID).AsParallel().Single();
                                    int familiaID = (from fa in ctx.Sam3_FamiliaAcero where fa.Nombre == item.FamiliaMaterial select fa.FamiliaAceroID).AsParallel().FirstOrDefault();
                                    int tipoAceroID = (from fm in ctx.Sam3_FamiliaMaterial where fm.Nombre == item.TipoAcero select fm.FamiliaMaterialID).AsParallel().FirstOrDefault();
                                    int coladaID = (from c in ctx.Sam3_Colada where c.NumeroColada == item.Colada select c.ColadaID).AsParallel().FirstOrDefault();
                                    int tipoMaterialID = (from tm in ctx.Sam3_ItemCode where tm.ItemCodeID == itemCodeID select tm.TipoMaterialID).AsParallel().FirstOrDefault();

                                    item.ItemCode = itemCodeID.ToString();
                                    item.ItemCodeSteelgo = itemCodeSteelgoID.ToString();
                                    item.FamiliaMaterial = familiaID.ToString();
                                    item.TipoAceroID = tipoAceroID;
                                    item.Colada = coladaID.ToString();
                                    item.TipoMaterial = tipoMaterialID;

                                    IC = new Sam3_ItemCode();
                                    ICS = new Sam3_ItemCodeSteelgo();

                                    //Si tengo un bulto guardo en la tabla de bultos
                                    if (item.ItemCode == "Bulto")
                                    {
                                        TieneErrores = true;
                                    }
                                    else
                                    {
                                        //Si es un item Code repetido en el grid, se suman las cantidades
                                        if (!creados.Contains(item.ItemCodeID))
                                        {
                                            bool existeYnumerosunicos = ctx.Sam3_Rel_Bulto_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode && x.BultoID.ToString() == item.BultoID && x.Activo && x.TieneNumerosUnicos == true).Any();
                                            bool existeSINnumerosunicos = ctx.Sam3_Rel_Bulto_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCode && x.BultoID.ToString() == item.BultoID && x.Activo && x.TieneNumerosUnicos == false).Any();

                                            //Si ya existe Item Code en la Rel Bulto y tiene NU
                                            if (existeYnumerosunicos)
                                            {
                                                TieneErrores = SumarCantidades(item, IC);
                                            }
                                            else //Si no tiene NU o no existe en la tabla de Relacion FC_IC
                                            {
                                                //Creo relacion ItemCode_ItemCodeSteelgo
                                                bool existeRelICS = ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo.Where(x => x.ItemCodeID.ToString() == item.ItemCodeID && x.ItemCodeSteelgoID.ToString() == item.ItemCodeSteelgoID && x.Activo).Any();

                                                if (!existeRelICS)
                                                {
                                                    InsertarRelacionIC_ICS(item);
                                                }

                                                //Update IC y ICS
                                                IC = ActualizarItemCode(item, IC);
                                                ICS = ActualizarItemCodeSteelgo(item, ICS);

                                                //creo la relacion bulto IC
                                                Sam3_Rel_Bulto_ItemCode bic = new Sam3_Rel_Bulto_ItemCode();
                                                bic.BultoID = Int32.Parse(item.BultoID);
                                                bic.ItemCodeID = IC.ItemCodeID;
                                                bic.TieneNumerosUnicos = false;
                                                bic.FechaModificacion = DateTime.Now;
                                                bic.UsuarioModificacion = usuario.UsuarioID;
                                                bic.Activo = true;
                                                ctx.Sam3_Rel_Bulto_ItemCode.Add(bic);

                                                if (!existeSINnumerosunicos)
                                                {
                                                    //Insertar la Relacion Folio Cuantificacion IC
                                                    InsertarRelacionFolioCuantificacion_IC(FolioCuantificacion, IC);
                                                }
                                            }
                                        }
                                        else //Si es repetido en el grid
                                        {
                                            IC = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCodeID).AsParallel().SingleOrDefault();
                                            IC.Cantidad = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCodeID).Select(c => c.Cantidad).AsParallel().SingleOrDefault() + item.Cantidad;
                                            IC.UsuarioModificacion = 1;// usuario.UsuarioID;
                                            IC.FechaModificacion = DateTime.Now;
                                        }

                                        listaNuevosIC.Add(new CuantificacionListado
                                        {
                                            ItemCodeID = IC.ItemCodeID.ToString(),
                                            TipoMaterial = IC.TipoMaterialID,
                                            ItemCode = IC.Codigo,
                                            ItemCodeSteelgo = ICS.Codigo,
                                            ItemCodeSteelgoID = ICS.ItemCodeSteelgoID.ToString(),
                                            Descripcion = ICS.DescripcionEspanol,
                                            Peso = ICS.Peso,
                                            Cedula = item.Cedula,
                                            D1 = ICS.Diametro1,
                                            D2 = ICS.Diametro2,
                                            Familia = item.Familia,
                                            TipoAcero = item.TipoAcero,
                                            Cantidad = IC.Cantidad,
                                            MM = IC.MM,
                                            Colada = item.Colada,
                                            TieneError = TieneErrores,
                                            Estatus = folioCuantificacion.Estatus,
                                            TieneNU = item.TieneNU
                                        });

                                        creados.Add(item.ItemCodeID);
                                    }
                                }
                                scope.Complete();
                                #endregion
                                break;
                        }
                        return listaNuevosIC;
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

        public Sam3_Bulto InsertarBulto(int FolioCuantificacion)
        {
            Sam3_Bulto bulto = new Sam3_Bulto();
            bulto.FolioCuantificacionID = FolioCuantificacion;
            bulto.Estatus = "En Proceso de Recepción";
            bulto.FechaModificacion = DateTime.Now;
            bulto.UsuarioModificacion = 1; // usuario.UsuarioID;
            bulto.Activo = true;

            return bulto;
        }

        public bool SumarCantidades(CuantificacionListado item, Sam3_ItemCode IC)
        {
            using (SamContext ctx = new SamContext())
            {
                bool TieneErrores = false;
                //Revisar la cantidad de numeros unicos existentes
                int CantidadNumerosUnicos = (from cnu in ctx.Sam3_NumeroUnico where cnu.ItemCodeID.ToString() == item.ItemCodeID && cnu.Activo select cnu.NumeroUnicoID).Count();
                int? CantidadItemCode = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCodeID).Select(c => c.Cantidad).AsParallel().SingleOrDefault();
                //Solo suma cantidad
                IC = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCodeID).AsParallel().SingleOrDefault();
                IC.Cantidad = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCodeID).Select(c => c.Cantidad).AsParallel().SingleOrDefault() + item.Cantidad;
                IC.UsuarioModificacion = 1; // usuario.UsuarioID;
                IC.FechaModificacion = DateTime.Now;

                if (CantidadNumerosUnicos < (CantidadItemCode + item.Cantidad))
                {
                    TieneErrores = true;
                }
                return TieneErrores;
            }
        }

        public Sam3_ItemCode ActualizarItemCode(CuantificacionListado item, Sam3_ItemCode IC)
        {
            using (SamContext ctx = new SamContext())
            {
                //Update IC
                IC = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCodeID).AsParallel().SingleOrDefault();

                IC.TipoMaterialID = item.TipoMaterial;
                IC.Activo = true;
                IC.UsuarioModificacion = 1;// usuario.UsuarioID;
                IC.FechaModificacion = DateTime.Now;
                IC.Cantidad = item.Cantidad;
                IC.MM = item.MM.ToString() == "N/A" ? null : item.MM;
                IC.ColadaID = item.ColadaID;

                ctx.SaveChanges();

                return IC;
            }
        }

        public Sam3_ItemCodeSteelgo ActualizarItemCodeSteelgo(CuantificacionListado item, Sam3_ItemCodeSteelgo ICS)
        {
            using (SamContext ctx = new SamContext())
            {
                //Update ICS
                ICS = ctx.Sam3_ItemCodeSteelgo.Where(x => x.ItemCodeSteelgoID.ToString() == item.ItemCodeSteelgoID).AsParallel().SingleOrDefault();

                ICS.DescripcionEspanol = item.Descripcion;
                ICS.DescripcionIngles = item.Descripcion;
                ICS.Peso = item.Peso;
                ICS.Diametro1 = item.D1;
                ICS.Diametro2 = item.D2;
                ICS.FamiliaAceroID = Int32.Parse(item.FamiliaMaterial);
                ICS.Cedula = item.Cedula;
                ICS.Codigo = item.ItemCodeSteelgo;
                ICS.Activo = true;
                ICS.UsuarioModificacion = 1; //usuario.UsuarioID;
                ICS.FechaModificacion = DateTime.Now;

                ctx.SaveChanges();

                return ICS;
            }
        }

        public void InsertarRelacionFolioCuantificacion_IC(int FolioCuantificacion, Sam3_ItemCode IC)
        {
            using (SamContext ctx = new SamContext())
            {
                //Insertar la Relacion Folio Cuantificacion IC
                Sam3_Rel_FolioCuantificacion_ItemCode relIC = new Sam3_Rel_FolioCuantificacion_ItemCode();
                relIC.FolioCuantificacionID = FolioCuantificacion;
                relIC.ItemCodeID = IC.ItemCodeID;
                relIC.TieneNumerosUnicos = false;
                relIC.FechaModificacion = DateTime.Now;
                relIC.UsuarioModificacion = 1;// usuario.UsuarioID;
                relIC.Activo = true;

                ctx.Sam3_Rel_FolioCuantificacion_ItemCode.Add(relIC);
                ctx.SaveChanges();
            }
        }

        public void InsertarRelacionIC_ICS(CuantificacionListado item)
        {
            using (SamContext ctx = new SamContext())
            {
                Sam3_Rel_ItemCode_ItemCodeSteelgo ics = new Sam3_Rel_ItemCode_ItemCodeSteelgo();
                ics.ItemCodeID = Int32.Parse(item.ItemCodeID);
                ics.ItemCodeSteelgoID = Int32.Parse(item.ItemCodeSteelgoID);
                ics.Activo = true;
                ics.FechaModificacion = DateTime.Now;
                ics.UsuarioModificacion = 1;// usuario.UsuarioID;

                ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo.Add(ics);
                ctx.SaveChanges();
            }
        }

    }
}