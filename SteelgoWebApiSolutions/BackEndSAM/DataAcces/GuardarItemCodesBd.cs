using BackEndSAM.Models;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using System.Web;
using System.Web.Script.Serialization;

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

        /// <summary>
        /// Funcion para los diferentes guardados de la informacion del grid de materiales en Cuantificacion
        /// </summary>
        /// <param name="cerrar">Si se debe cerrar/terminar el folio cuantificacion</param>
        /// <param name="incompletos">Si hay datos incompletos en el grid</param>
        /// <param name="FolioAvisollegadaId">folio aviso de llegada seleccionado</param>
        /// <param name="FolioCuantificacion">Folio cuantificacion seleccionado</param>
        /// <param name="datosItemCode">Lista de datos capturados en el grid</param>
        /// <param name="usuario">usuario actual</param>
        /// <param name="tipoGuardado">tipo de guardado que se realizara
        /// 1: Terminar y Nuevo
        /// 2: Guardar y Cerrar
        /// 3: Guardar Parcial
        /// 4: Guardar y Terminar cuando se encuentra en la pantalla de bulto
        /// 5: Guardar Parcial cuando se encuentra en la pantalla de bulto
        /// </param>
        /// <returns></returns>
        public object GuardadoInformacionItemCodes(bool cerrar, bool incompletos, int FolioAvisollegadaId, int FolioCuantificacion,
            CuantificacionListado datosItemCode, Sam3_Usuario usuario, int tipoGuardado)
        {
            try
            {
                List<Sam3_ItemCode> listIC = new List<Sam3_ItemCode>();
                List<CuantificacionListado> listaNuevosIC = new List<CuantificacionListado>();
                Sam3_ItemCode IC = null;
                Sam3_ItemCodeSteelgo ICS = null;
                Sam3_Bulto bulto = null;
                //List<string> creados = new List<string>();
                bool TieneErrores = false;

                //using (TransactionScope scope = new TransactionScope())
                //{
                using (SamContext ctx = new SamContext())
                {
                    using (var sam3_tran = ctx.Database.BeginTransaction())
                    {
                        Sam3_FolioCuantificacion folioCuantificacion = (from fc in ctx.Sam3_FolioCuantificacion
                                                                        join fe in ctx.Sam3_FolioAvisoEntrada on fc.FolioAvisoEntradaID equals fe.FolioAvisoEntradaID
                                                                        where fc.Activo && fe.Activo
                                                                        && fe.FolioAvisoLlegadaID == FolioAvisollegadaId
                                                                        && fc.FolioCuantificacionID == FolioCuantificacion
                                                                        select fc).AsParallel().SingleOrDefault();

                        datosItemCode.ItemCodeSteelgo = datosItemCode.ItemCodeSteelgo == "" ? datosItemCode.ItemCodeSteelgo = "ICS-Default" : datosItemCode.ItemCodeSteelgo;
                        datosItemCode.Familia = datosItemCode.Familia == "" ? datosItemCode.Familia = "Familia Default" : datosItemCode.Familia;

                        switch (tipoGuardado)
                        {
                            case 1: //Terminar y Nuevo
                                #region Terminar y Nuevo

                                IC = new Sam3_ItemCode();
                                ICS = new Sam3_ItemCodeSteelgo();
                                bulto = new Sam3_Bulto();

                                //Si tengo un bulto guardo en la tabla de bultos
                                if (datosItemCode.ItemCode.Contains("Bulto"))
                                {
                                    if (String.IsNullOrEmpty(datosItemCode.BultoID))
                                    {
                                        bulto = InsertarBulto(FolioCuantificacion, usuario);
                                    }
                                    else
                                    {
                                        bulto = ActualizarBulto(FolioCuantificacion, usuario, datosItemCode.BultoID);
                                    }

                                    listaNuevosIC.Add(new CuantificacionListado
                                    {
                                        ItemCode = datosItemCode.ItemCode,
                                        BultoID = bulto.BultoID.ToString(),
                                        Cantidad = datosItemCode.Cantidad,
                                        TieneError = TieneErrores,
                                        Estatus = folioCuantificacion.Estatus
                                    });
                                }
                                else
                                {
                                    datosItemCode.ItemCodeSteelgoID = (from ics in ctx.Sam3_ItemCodeSteelgo
                                                                       where ics.Codigo == datosItemCode.ItemCodeSteelgo && ics.Activo
                                                                       select ics.ItemCodeSteelgoID).AsParallel().SingleOrDefault().ToString();

                                    datosItemCode.FamiliaMaterial = (from fa in ctx.Sam3_FamiliaAcero
                                                                     where fa.Nombre == datosItemCode.Familia && fa.Activo
                                                                     select fa.FamiliaAceroID).AsParallel().FirstOrDefault().ToString();

                                    datosItemCode.TipoAceroID = (from fm in ctx.Sam3_FamiliaMaterial
                                                                 where fm.Nombre == datosItemCode.TipoAcero && fm.Activo
                                                                 select fm.FamiliaMaterialID).AsParallel().FirstOrDefault();

                                    datosItemCode.ColadaID = (from c in ctx.Sam3_Colada
                                                              where c.NumeroColada == datosItemCode.Colada && c.Activo
                                                              select c.ColadaID).AsParallel().FirstOrDefault();

                                    datosItemCode.ItemCodeID = (from ic in ctx.Sam3_ItemCode
                                                                where ic.Codigo == datosItemCode.ItemCode && ic.Activo
                                                                select ic.ItemCodeID).AsParallel().SingleOrDefault().ToString();

                                    //Revisar si existe el item code
                                    bool existeICenSam3 = ctx.Sam3_EquivalenciaItemCode
                                       .Where(x => x.Sam3_ItemCodeID.ToString() == datosItemCode.ItemCodeID && x.Activo).Any();

                                    if (!existeICenSam3)
                                    {
                                        InsertarItemCodeSam3(datosItemCode, usuario);
                                    }


                                    //Obtenemos IDS
                                    datosItemCode.ItemCodeID = (from ic in ctx.Sam3_ItemCode
                                                                where ic.Codigo == datosItemCode.ItemCode && ic.Activo
                                                                select ic.ItemCodeID).AsParallel().SingleOrDefault().ToString();


                                    int itemCodeID = Convert.ToInt32(datosItemCode.ItemCodeID);

                                    datosItemCode.TipoMaterial = (from tm in ctx.Sam3_ItemCode
                                                                  where tm.ItemCodeID == itemCodeID && tm.Activo
                                                                  select tm.TipoMaterialID).AsParallel().FirstOrDefault();

                                    datosItemCode.D1 = (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                                        join itcs in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals itcs.ItemCodeSteelgoID
                                                        where rics.Activo && itcs.Activo
                                                        && rics.ItemCodeID.ToString() == datosItemCode.ItemCodeID
                                                        select itcs.Diametro1).AsParallel().SingleOrDefault();

                                    datosItemCode.D2 = (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                                        join itcs in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals itcs.ItemCodeSteelgoID
                                                        where rics.Activo && itcs.Activo
                                                        && rics.ItemCodeID.ToString() == datosItemCode.ItemCodeID
                                                        select itcs.Diametro2).AsParallel().SingleOrDefault();

                                    bool existeYnumerosunicos = ctx.Sam3_Rel_FolioCuantificacion_ItemCode.Where(x => x.ItemCodeID == itemCodeID && x.FolioCuantificacionID == FolioCuantificacion && x.Activo && x.TieneNumerosUnicos == true).Any();

                                    bool existeSINnumerosunicos = ctx.Sam3_Rel_FolioCuantificacion_ItemCode.Where(x => x.ItemCodeID == itemCodeID && x.FolioCuantificacionID == FolioCuantificacion && x.Activo && x.TieneNumerosUnicos == false).Any();

                                    //Si existen ic y ics en la relacion
                                    bool existeRelICS = ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                            .Where(x => x.ItemCodeID.ToString() == datosItemCode.ItemCodeID
                                                && x.ItemCodeSteelgoID.ToString() == datosItemCode.ItemCodeSteelgoID
                                                && x.Activo).Any();

                                    //si ya existe solo ic en la relacion
                                    bool ICexisteEnRel = ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                            .Where(x => x.ItemCodeID.ToString() == datosItemCode.ItemCodeID && x.Activo).Any();

                                    //Que no exista el IC en la relacion
                                    if (!existeRelICS && !ICexisteEnRel)
                                    {
                                        InsertarRelacionIC_ICS(datosItemCode, usuario);
                                    }
                                    //else if (ICexisteEnRel && !existeRelICS)
                                    //{
                                    //    TieneErrores = true;
                                    //}

                                    //Update IC y ICS
                                    IC = ActualizarItemCode(datosItemCode, IC, usuario);
                                    ICS = ActualizarItemCodeSteelgo(datosItemCode, ICS, usuario);

                                    if (!existeSINnumerosunicos)
                                    {
                                        //Insertar la Relacion Folio Cuantificacion IC
                                        InsertarRelacionFolioCuantificacion_IC(FolioCuantificacion, IC, usuario);
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
                                        Cedula = datosItemCode.Cedula,
                                        D1 = ICS.Diametro1,
                                        D2 = ICS.Diametro2,
                                        Familia = datosItemCode.Familia,
                                        TipoAcero = datosItemCode.TipoAcero,
                                        Cantidad = IC.Cantidad,
                                        MM = IC.MM,
                                        Colada = datosItemCode.Colada,
                                        TieneError = TieneErrores,
                                        Estatus = folioCuantificacion.Estatus,
                                        TieneNU = datosItemCode.TieneNU
                                    });
                                    //}
                                }

                                if (cerrar && !incompletos && !TieneErrores)
                                {
                                    listaNuevosIC.Clear();

                                    Sam3_FolioCuantificacion folioC = (from fc in ctx.Sam3_FolioCuantificacion
                                                                       join fe in ctx.Sam3_FolioAvisoEntrada on fc.FolioAvisoEntradaID equals fe.FolioAvisoEntradaID
                                                                       where fc.Activo && fe.Activo
                                                                       && fe.FolioAvisoLlegadaID == FolioAvisollegadaId
                                                                       && fc.FolioCuantificacionID == FolioCuantificacion
                                                                       select fc).AsParallel().SingleOrDefault();

                                    //Cambiar estatus a folio cuantificacion
                                    folioCuantificacion.Estatus = "Terminado";
                                    folioCuantificacion.UsuarioModificacion = usuario.UsuarioID;
                                    folioCuantificacion.FechaModificacion = DateTime.Now;
                                    ctx.SaveChanges();


                                    if (datosItemCode.ItemCode.Contains("Bulto"))
                                    {
                                        listaNuevosIC.Add(new CuantificacionListado
                                        {
                                            ItemCode = datosItemCode.ItemCode,
                                            BultoID = bulto.BultoID.ToString(),
                                            Cantidad = datosItemCode.Cantidad,
                                            TieneError = TieneErrores,
                                            Estatus = folioCuantificacion.Estatus
                                        });
                                    }
                                    else
                                    {
                                        listaNuevosIC.Add(new CuantificacionListado
                                        {
                                            ItemCodeID = IC.ItemCodeID.ToString(),
                                            TipoMaterial = IC.TipoMaterialID,
                                            ItemCode = IC.Codigo,
                                            ItemCodeSteelgo = ICS.Codigo,
                                            ItemCodeSteelgoID = ICS.ItemCodeSteelgoID.ToString(),
                                            Descripcion = ICS.DescripcionEspanol,
                                            Peso = ICS.Peso,
                                            Cedula = datosItemCode.Cedula,
                                            D1 = ICS.Diametro1,
                                            D2 = ICS.Diametro2,
                                            Familia = datosItemCode.Familia,
                                            TipoAcero = datosItemCode.TipoAcero,
                                            Cantidad = IC.Cantidad,
                                            MM = IC.MM,
                                            Colada = datosItemCode.Colada,
                                            TieneError = TieneErrores,
                                            Estatus = folioCuantificacion.Estatus,
                                            TieneNU = datosItemCode.TieneNU
                                        });
                                    }
                                }
                                //scope.Complete();
                                #endregion
                                break;

                            case 2: //Guardar y Cerrar
                                #region Guardar y Cerrar


                                IC = new Sam3_ItemCode();
                                ICS = new Sam3_ItemCodeSteelgo();
                                bulto = new Sam3_Bulto();

                                //Si tengo un bulto guardo en la tabla de bultos
                                if (datosItemCode.ItemCode.Contains("Bulto"))
                                {
                                    if (String.IsNullOrEmpty(datosItemCode.BultoID))
                                    {
                                        bulto = InsertarBulto(FolioCuantificacion, usuario);
                                    }
                                    else
                                    {
                                        bulto = ActualizarBulto(FolioCuantificacion, usuario, datosItemCode.BultoID);
                                    }

                                    listaNuevosIC.Add(new CuantificacionListado
                                    {
                                        ItemCode = datosItemCode.ItemCode,
                                        BultoID = bulto.BultoID.ToString(),
                                        Cantidad = datosItemCode.Cantidad,
                                        TieneError = TieneErrores,
                                        Estatus = folioCuantificacion.Estatus
                                    });
                                }
                                else
                                {

                                    datosItemCode.ItemCodeSteelgoID = (from ics in ctx.Sam3_ItemCodeSteelgo
                                                                       where ics.Codigo == datosItemCode.ItemCodeSteelgo && ics.Activo
                                                                       select ics.ItemCodeSteelgoID).AsParallel().SingleOrDefault().ToString();

                                    datosItemCode.FamiliaMaterial = (from fa in ctx.Sam3_FamiliaAcero
                                                                     where fa.Nombre == datosItemCode.Familia && fa.Activo
                                                                     select fa.FamiliaAceroID).AsParallel().FirstOrDefault().ToString();

                                    datosItemCode.TipoAceroID = (from fm in ctx.Sam3_FamiliaMaterial
                                                                 where fm.Nombre == datosItemCode.TipoAcero && fm.Activo
                                                                 select fm.FamiliaMaterialID).AsParallel().FirstOrDefault();

                                    datosItemCode.ColadaID = (from c in ctx.Sam3_Colada
                                                              where c.NumeroColada == datosItemCode.Colada && c.Activo
                                                              select c.ColadaID).AsParallel().FirstOrDefault();

                                    datosItemCode.ItemCodeID = (from ic in ctx.Sam3_ItemCode
                                                                where ic.Codigo == datosItemCode.ItemCode && ic.Activo
                                                                select ic.ItemCodeID).AsParallel().SingleOrDefault().ToString();

                                    //Revisar si existe el item code
                                    bool existeICenSam3 = ctx.Sam3_EquivalenciaItemCode
                                       .Where(x => x.Sam3_ItemCodeID.ToString() == datosItemCode.ItemCodeID && x.Activo).Any();

                                    if (!existeICenSam3)
                                    {
                                        InsertarItemCodeSam3(datosItemCode, usuario);
                                    }


                                    //Obtenemos IDS
                                    datosItemCode.ItemCodeID = (from ic in ctx.Sam3_ItemCode
                                                                where ic.Codigo == datosItemCode.ItemCode && ic.Activo
                                                                select ic.ItemCodeID).AsParallel().SingleOrDefault().ToString();


                                    int itemCodeID = Convert.ToInt32(datosItemCode.ItemCodeID);

                                    datosItemCode.TipoMaterial = (from tm in ctx.Sam3_ItemCode
                                                                  where tm.ItemCodeID == itemCodeID && tm.Activo
                                                                  select tm.TipoMaterialID).AsParallel().FirstOrDefault();

                                    datosItemCode.D1 = (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                                        join itcs in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals itcs.ItemCodeSteelgoID
                                                        where rics.Activo && itcs.Activo
                                                        && rics.ItemCodeID.ToString() == datosItemCode.ItemCodeID
                                                        select itcs.Diametro1).AsParallel().SingleOrDefault();

                                    datosItemCode.D2 = (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                                        join itcs in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals itcs.ItemCodeSteelgoID
                                                        where rics.Activo && itcs.Activo
                                                        && rics.ItemCodeID.ToString() == datosItemCode.ItemCodeID
                                                        select itcs.Diametro2).AsParallel().SingleOrDefault();

                                    bool existeYnumerosunicos = ctx.Sam3_Rel_FolioCuantificacion_ItemCode.Where(x => x.ItemCodeID == itemCodeID && x.FolioCuantificacionID == FolioCuantificacion && x.Activo && x.TieneNumerosUnicos == true).Any();

                                    bool existeSINnumerosunicos = ctx.Sam3_Rel_FolioCuantificacion_ItemCode.Where(x => x.ItemCodeID == itemCodeID && x.FolioCuantificacionID == FolioCuantificacion && x.Activo && x.TieneNumerosUnicos == false).Any();

                                    //Si existen ic y ics en la relacion
                                    bool existeRelICS = ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                            .Where(x => x.ItemCodeID.ToString() == datosItemCode.ItemCodeID
                                                && x.ItemCodeSteelgoID.ToString() == datosItemCode.ItemCodeSteelgoID
                                                && x.Activo).Any();

                                    //si ya existe solo ic en la relacion
                                    bool ICexisteEnRel = ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                            .Where(x => x.ItemCodeID.ToString() == datosItemCode.ItemCodeID && x.Activo).Any();

                                    //Que no exista el IC en la relacion
                                    if (!existeRelICS && !ICexisteEnRel)
                                    {
                                        InsertarRelacionIC_ICS(datosItemCode, usuario);
                                    }
                                    //Update IC y ICS
                                    IC = ActualizarItemCode(datosItemCode, IC, usuario);
                                    ICS = ActualizarItemCodeSteelgo(datosItemCode, ICS, usuario);

                                    if (!existeSINnumerosunicos)
                                    {
                                        //Insertar la Relacion Folio Cuantificacion IC
                                        InsertarRelacionFolioCuantificacion_IC(FolioCuantificacion, IC, usuario);
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
                                        Cedula = datosItemCode.Cedula,
                                        D1 = ICS.Diametro1,
                                        D2 = ICS.Diametro2,
                                        Familia = datosItemCode.Familia,
                                        TipoAcero = datosItemCode.TipoAcero,
                                        Cantidad = IC.Cantidad,
                                        MM = IC.MM,
                                        Colada = datosItemCode.Colada,
                                        TieneError = TieneErrores,
                                        Estatus = folioCuantificacion.Estatus,
                                        TieneNU = datosItemCode.TieneNU
                                    });
                                    //}
                                }

                                if (cerrar && !incompletos && !TieneErrores)
                                {
                                    listaNuevosIC.Clear();

                                    Sam3_FolioCuantificacion folioC = (from fc in ctx.Sam3_FolioCuantificacion
                                                                       join fe in ctx.Sam3_FolioAvisoEntrada on fc.FolioAvisoEntradaID equals fe.FolioAvisoEntradaID
                                                                       where fc.Activo && fe.Activo
                                                                       && fe.FolioAvisoLlegadaID == FolioAvisollegadaId
                                                                       && fc.FolioCuantificacionID == FolioCuantificacion
                                                                       select fc).AsParallel().SingleOrDefault();
                                    //Cambiar estatus a folio cuantificacion
                                    folioC.Estatus = "Cerrado";
                                    folioC.UsuarioModificacion = usuario.UsuarioID;
                                    folioC.FechaModificacion = DateTime.Now;
                                    ctx.SaveChanges();

                                    if (datosItemCode.ItemCode.Contains("Bulto"))
                                    {
                                        listaNuevosIC.Add(new CuantificacionListado
                                        {
                                            ItemCode = datosItemCode.ItemCode,
                                            BultoID = bulto.BultoID.ToString(),
                                            Cantidad = datosItemCode.Cantidad,
                                            TieneError = TieneErrores,
                                            Estatus = folioCuantificacion.Estatus
                                        });
                                    }
                                    else
                                    {
                                        listaNuevosIC.Add(new CuantificacionListado
                                        {
                                            ItemCodeID = IC.ItemCodeID.ToString(),
                                            TipoMaterial = IC.TipoMaterialID,
                                            ItemCode = IC.Codigo,
                                            ItemCodeSteelgo = ICS.Codigo,
                                            ItemCodeSteelgoID = ICS.ItemCodeSteelgoID.ToString(),
                                            Descripcion = ICS.DescripcionEspanol,
                                            Peso = ICS.Peso,
                                            Cedula = datosItemCode.Cedula,
                                            D1 = ICS.Diametro1,
                                            D2 = ICS.Diametro2,
                                            Familia = datosItemCode.Familia,
                                            TipoAcero = datosItemCode.TipoAcero,
                                            Cantidad = IC.Cantidad,
                                            MM = IC.MM,
                                            Colada = datosItemCode.Colada,
                                            TieneError = TieneErrores,
                                            Estatus = folioCuantificacion.Estatus,
                                            TieneNU = datosItemCode.TieneNU
                                        });
                                    }
                                }

                                //scope.Complete();
                                #endregion
                                break;

                            case 3: //Guardar Parcial
                                #region Guardar Parcial
                                // foreach (var item in datosItemCode)
                                //{
                                IC = new Sam3_ItemCode();
                                ICS = new Sam3_ItemCodeSteelgo();
                                bulto = new Sam3_Bulto();

                                //Si tengo un bulto guardo en la tabla de bultos
                                if (datosItemCode.ItemCode.Contains("Bulto"))
                                {
                                    if (String.IsNullOrEmpty(datosItemCode.BultoID))
                                    {
                                        bulto = InsertarBulto(FolioCuantificacion, usuario);
                                    }
                                    else
                                    {
                                        bulto = ActualizarBulto(FolioCuantificacion, usuario, datosItemCode.BultoID);
                                    }

                                    listaNuevosIC.Add(new CuantificacionListado
                                    {
                                        ItemCode = datosItemCode.ItemCode,
                                        BultoID = bulto.BultoID.ToString(),
                                        Cantidad = datosItemCode.Cantidad,
                                        TieneError = TieneErrores,
                                        Estatus = folioCuantificacion.Estatus,
                                        Detallar = "Si"
                                    });
                                }
                                else
                                {
                                    datosItemCode.ItemCodeSteelgoID = (from ics in ctx.Sam3_ItemCodeSteelgo
                                                                       where ics.Codigo == datosItemCode.ItemCodeSteelgo && ics.Activo
                                                                       select ics.ItemCodeSteelgoID).AsParallel().SingleOrDefault().ToString();

                                    datosItemCode.FamiliaMaterial = (from fa in ctx.Sam3_FamiliaAcero
                                                                     where fa.Nombre == datosItemCode.Familia && fa.Activo
                                                                     select fa.FamiliaAceroID).AsParallel().FirstOrDefault().ToString();

                                    datosItemCode.TipoAceroID = (from fm in ctx.Sam3_FamiliaMaterial
                                                                 where fm.Nombre == datosItemCode.TipoAcero && fm.Activo
                                                                 select fm.FamiliaMaterialID).AsParallel().FirstOrDefault();

                                    datosItemCode.ColadaID = (from c in ctx.Sam3_Colada
                                                              where c.NumeroColada == datosItemCode.Colada && c.Activo
                                                              select c.ColadaID).AsParallel().FirstOrDefault();

                                    datosItemCode.ItemCodeID = (from ic in ctx.Sam3_ItemCode
                                                                where ic.Codigo == datosItemCode.ItemCode && ic.Activo
                                                                select ic.ItemCodeID).AsParallel().SingleOrDefault().ToString();

                                    //Revisar si existe el item code
                                    bool existeICenSam3 = ctx.Sam3_EquivalenciaItemCode
                                       .Where(x => x.Sam3_ItemCodeID.ToString() == datosItemCode.ItemCodeID && x.Activo).Any();

                                    if (!existeICenSam3)
                                    {
                                        InsertarItemCodeSam3(datosItemCode, usuario);
                                    }

                                    //Obtenemos IDS
                                    datosItemCode.ItemCodeID = (from ic in ctx.Sam3_ItemCode
                                                                where ic.Codigo == datosItemCode.ItemCode && ic.Activo
                                                                select ic.ItemCodeID).AsParallel().SingleOrDefault().ToString();

                                    int itemCodeID = Convert.ToInt32(datosItemCode.ItemCodeID);

                                    datosItemCode.TipoMaterial = (from tm in ctx.Sam3_ItemCode
                                                                  where tm.ItemCodeID == itemCodeID && tm.Activo
                                                                  select tm.TipoMaterialID).AsParallel().FirstOrDefault();

                                    datosItemCode.D1 = (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                                        join itcs in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals itcs.ItemCodeSteelgoID
                                                        where rics.Activo && itcs.Activo
                                                        && rics.ItemCodeID.ToString() == datosItemCode.ItemCodeID
                                                        select itcs.Diametro1).AsParallel().SingleOrDefault();

                                    datosItemCode.D2 = (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                                        join itcs in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals itcs.ItemCodeSteelgoID
                                                        where rics.Activo && itcs.Activo
                                                        && rics.ItemCodeID.ToString() == datosItemCode.ItemCodeID
                                                        select itcs.Diametro2).AsParallel().SingleOrDefault();

                                    //bool existeYnumerosunicos = ctx.Sam3_Rel_FolioCuantificacion_ItemCode.Where(x => x.ItemCodeID == itemCodeID && x.FolioCuantificacionID == FolioCuantificacion && x.Activo && x.TieneNumerosUnicos == true).Any();

                                    bool existeSINnumerosunicos = ctx.Sam3_Rel_FolioCuantificacion_ItemCode.Where(x => x.ItemCodeID == itemCodeID && x.FolioCuantificacionID == FolioCuantificacion && x.Activo && x.TieneNumerosUnicos == false).Any();

                                    //Si existen ic y ics en la relacion
                                    bool existeRelICS = ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                            .Where(x => x.ItemCodeID.ToString() == datosItemCode.ItemCodeID
                                                && x.ItemCodeSteelgoID.ToString() == datosItemCode.ItemCodeSteelgoID
                                                && x.Activo).Any();

                                    //si ya existe solo ic en la relacion
                                    bool ICexisteEnRel = ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                            .Where(x => x.ItemCodeID.ToString() == datosItemCode.ItemCodeID && x.Activo).Any();

                                    //Que no exista el IC en la relacion
                                    if (!existeRelICS && !ICexisteEnRel)
                                    {
                                        InsertarRelacionIC_ICS(datosItemCode, usuario);
                                    }
                                    //else if (ICexisteEnRel && !existeRelICS)
                                    //{
                                    //    TieneErrores = true;
                                    //}

                                    //Update IC y ICS
                                    IC = ActualizarItemCode(datosItemCode, IC, usuario);
                                    ICS = ActualizarItemCodeSteelgo(datosItemCode, ICS, usuario);

                                    if (!existeSINnumerosunicos)
                                    {
                                        //Insertar la Relacion Folio Cuantificacion IC
                                        InsertarRelacionFolioCuantificacion_IC(FolioCuantificacion, IC, usuario);
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
                                        Cedula = datosItemCode.Cedula,
                                        D1 = ICS.Diametro1,
                                        D2 = ICS.Diametro2,
                                        Familia = datosItemCode.Familia,
                                        TipoAcero = datosItemCode.TipoAcero,
                                        Cantidad = IC.Cantidad,
                                        MM = IC.MM,
                                        Colada = datosItemCode.Colada,
                                        TieneError = TieneErrores,
                                        Estatus = folioCuantificacion.Estatus,
                                        TieneNU = datosItemCode.TieneNU,
                                        Detallar = "No"
                                    });
                                    //}
                                }
                                //scope.Complete();
                                #endregion
                                break;

                            case 4: //Guardar y Terminar (Bulto)
                                #region Guardar y Terminar (Bulto)


                                IC = new Sam3_ItemCode();
                                ICS = new Sam3_ItemCodeSteelgo();

                                //Si tengo un bulto guardo en la tabla de bultos
                                if (datosItemCode.ItemCode.Contains("Bulto"))
                                {
                                    TieneErrores = true;

                                    listaNuevosIC.Add(new CuantificacionListado
                                    {
                                        ItemCodeID = datosItemCode.ItemCodeID,
                                        TipoMaterial = datosItemCode.TipoMaterial,
                                        ItemCode = datosItemCode.ItemCode,
                                        ItemCodeSteelgo = datosItemCode.ItemCodeSteelgo,
                                        ItemCodeSteelgoID = datosItemCode.ItemCodeSteelgoID,
                                        Descripcion = datosItemCode.Descripcion,
                                        Peso = datosItemCode.Peso,
                                        Cedula = datosItemCode.Cedula,
                                        D1 = datosItemCode.D1,
                                        D2 = datosItemCode.D2,
                                        Familia = datosItemCode.Familia,
                                        TipoAcero = datosItemCode.TipoAcero,
                                        Cantidad = datosItemCode.Cantidad,
                                        MM = datosItemCode.MM,
                                        Colada = datosItemCode.Colada,
                                        TieneError = TieneErrores,
                                        Estatus = folioCuantificacion.Estatus,
                                        TieneNU = datosItemCode.TieneNU
                                    });
                                }
                                else
                                {

                                    datosItemCode.ItemCodeSteelgoID = (from ics in ctx.Sam3_ItemCodeSteelgo
                                                                       where ics.Codigo == datosItemCode.ItemCodeSteelgo && ics.Activo
                                                                       select ics.ItemCodeSteelgoID).AsParallel().SingleOrDefault().ToString();

                                    datosItemCode.FamiliaMaterial = (from fa in ctx.Sam3_FamiliaAcero
                                                                     where fa.Nombre == datosItemCode.Familia && fa.Activo
                                                                     select fa.FamiliaAceroID).AsParallel().FirstOrDefault().ToString();

                                    datosItemCode.TipoAceroID = (from fm in ctx.Sam3_FamiliaMaterial
                                                                 where fm.Nombre == datosItemCode.TipoAcero && fm.Activo
                                                                 select fm.FamiliaMaterialID).AsParallel().FirstOrDefault();

                                    datosItemCode.ColadaID = (from c in ctx.Sam3_Colada
                                                              where c.NumeroColada == datosItemCode.Colada && c.Activo
                                                              select c.ColadaID).AsParallel().FirstOrDefault();

                                    datosItemCode.ItemCodeID = (from ic in ctx.Sam3_ItemCode
                                                                where ic.Codigo == datosItemCode.ItemCode && ic.Activo
                                                                select ic.ItemCodeID).AsParallel().SingleOrDefault().ToString();

                                    //Revisar si existe el item code
                                    bool existeICenSam3 = ctx.Sam3_EquivalenciaItemCode
                                       .Where(x => x.Sam3_ItemCodeID.ToString() == datosItemCode.ItemCodeID && x.Activo).Any();

                                    if (!existeICenSam3)
                                    {
                                        InsertarItemCodeSam3(datosItemCode, usuario);
                                    }


                                    //Obtenemos IDS
                                    datosItemCode.ItemCodeID = (from ic in ctx.Sam3_ItemCode
                                                                where ic.Codigo == datosItemCode.ItemCode && ic.Activo
                                                                select ic.ItemCodeID).AsParallel().SingleOrDefault().ToString();

                                    int itemCodeID = Convert.ToInt32(datosItemCode.ItemCodeID);

                                    datosItemCode.TipoMaterial = (from tm in ctx.Sam3_ItemCode
                                                                  where tm.ItemCodeID == itemCodeID && tm.Activo
                                                                  select tm.TipoMaterialID).AsParallel().FirstOrDefault();

                                    datosItemCode.D1 = (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                                        join itcs in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals itcs.ItemCodeSteelgoID
                                                        where rics.Activo && itcs.Activo
                                                        && rics.ItemCodeID.ToString() == datosItemCode.ItemCodeID
                                                        select itcs.Diametro1).AsParallel().SingleOrDefault();

                                    datosItemCode.D2 = (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                                        join itcs in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals itcs.ItemCodeSteelgoID
                                                        where rics.Activo && itcs.Activo
                                                        && rics.ItemCodeID.ToString() == datosItemCode.ItemCodeID
                                                        select itcs.Diametro2).AsParallel().SingleOrDefault();

                                    bool existeYnumerosunicos = ctx.Sam3_Rel_Bulto_ItemCode
                                        .Where(x => x.ItemCodeID.ToString() == datosItemCode.ItemCodeID
                                            && x.BultoID.ToString() == datosItemCode.BultoID && x.Activo && x.TieneNumerosUnicos == true).Any();

                                    bool existeSINnumerosunicos = ctx.Sam3_Rel_Bulto_ItemCode.Where(x => x.ItemCodeID.ToString() == datosItemCode.ItemCodeID
                                        && x.BultoID.ToString() == datosItemCode.BultoID && x.Activo && x.TieneNumerosUnicos == false).Any();

                                    //Existen el ics y el ic en la relacion
                                    bool existeRelICS = ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                            .Where(x => x.ItemCodeID.ToString() == datosItemCode.ItemCodeID
                                                && x.ItemCodeSteelgoID.ToString() == datosItemCode.ItemCodeSteelgoID
                                                && x.Activo).Any();

                                    //Existe solo el item code en la relacion
                                    bool ICexisteEnRel = ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                        .Where(x => x.ItemCodeID.ToString() == datosItemCode.ItemCodeID && x.Activo).Any();

                                    //Creo relacion ItemCode_ItemCodeSteelgo

                                    //Que no exista el IC en la relacion
                                    if (!existeRelICS && !ICexisteEnRel)
                                    {
                                        InsertarRelacionIC_ICS(datosItemCode, usuario);
                                    }

                                    //Update IC y ICS
                                    IC = ActualizarItemCode(datosItemCode, IC, usuario);
                                    ICS = ActualizarItemCodeSteelgo(datosItemCode, ICS, usuario);

                                    //Creo relacion bulto item code
                                    bool existeRelBultoIC = ctx.Sam3_Rel_Bulto_ItemCode.Where(x => x.BultoID.ToString() == datosItemCode.BultoID
                                        && x.ItemCodeID.ToString() == datosItemCode.ItemCodeID && x.Activo).Any();

                                    if (!existeRelBultoIC)
                                    {
                                        CrearRelacionBulto_IC(datosItemCode, usuario);
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
                                        Cedula = datosItemCode.Cedula,
                                        D1 = ICS.Diametro1,
                                        D2 = ICS.Diametro2,
                                        Familia = datosItemCode.Familia,
                                        TipoAcero = datosItemCode.TipoAcero,
                                        Cantidad = IC.Cantidad,
                                        MM = IC.MM,
                                        Colada = datosItemCode.Colada,
                                        TieneError = TieneErrores,
                                        Estatus = folioCuantificacion.Estatus,
                                        TieneNU = datosItemCode.TieneNU
                                    });
                                    //}
                                }

                                if (cerrar && !incompletos && !TieneErrores)
                                {
                                    listaNuevosIC.Clear();

                                    //Cambiar estatus al bulto
                                    bulto = ctx.Sam3_Bulto.Where(x => x.BultoID.ToString() == datosItemCode.BultoID).AsParallel().SingleOrDefault();

                                    bulto.Estatus = "Terminado";
                                    bulto.UsuarioModificacion = usuario.UsuarioID;
                                    bulto.FechaModificacion = DateTime.Now;
                                    ctx.SaveChanges();

                                    listaNuevosIC.Add(new CuantificacionListado
                                    {
                                        ItemCodeID = IC.ItemCodeID.ToString(),
                                        TipoMaterial = IC.TipoMaterialID,
                                        ItemCode = IC.Codigo,
                                        ItemCodeSteelgo = ICS.Codigo,
                                        ItemCodeSteelgoID = ICS.ItemCodeSteelgoID.ToString(),
                                        Descripcion = ICS.DescripcionEspanol,
                                        Peso = ICS.Peso,
                                        Cedula = datosItemCode.Cedula,
                                        D1 = ICS.Diametro1,
                                        D2 = ICS.Diametro2,
                                        Familia = datosItemCode.Familia,
                                        TipoAcero = datosItemCode.TipoAcero,
                                        Cantidad = IC.Cantidad,
                                        MM = IC.MM,
                                        Colada = datosItemCode.Colada,
                                        TieneError = TieneErrores,
                                        Estatus = folioCuantificacion.Estatus,
                                        TieneNU = datosItemCode.TieneNU
                                    });

                                }
                                //}
                                //scope.Complete();

                                #endregion
                                break;

                            case 5: // Guardar Parcial (bulto)
                                #region Guardar Parcial (bulto)
                                IC = new Sam3_ItemCode();
                                ICS = new Sam3_ItemCodeSteelgo();

                                //Si tengo un bulto guardo en la tabla de bultos
                                if (datosItemCode.ItemCode.Contains("Bulto"))
                                {

                                    TieneErrores = true;

                                    listaNuevosIC.Add(new CuantificacionListado
                                    {
                                        ItemCodeID = datosItemCode.ItemCodeID,
                                        TipoMaterial = datosItemCode.TipoMaterial,
                                        ItemCode = datosItemCode.ItemCode,
                                        ItemCodeSteelgo = datosItemCode.ItemCodeSteelgo,
                                        ItemCodeSteelgoID = datosItemCode.ItemCodeSteelgoID,
                                        Descripcion = datosItemCode.Descripcion,
                                        Peso = datosItemCode.Peso,
                                        Cedula = datosItemCode.Cedula,
                                        D1 = datosItemCode.D1,
                                        D2 = datosItemCode.D2,
                                        Familia = datosItemCode.Familia,
                                        TipoAcero = datosItemCode.TipoAcero,
                                        Cantidad = datosItemCode.Cantidad,
                                        MM = datosItemCode.MM,
                                        Colada = datosItemCode.Colada,
                                        TieneError = TieneErrores,
                                        Estatus = folioCuantificacion.Estatus,
                                        TieneNU = datosItemCode.TieneNU
                                    });
                                }
                                else
                                {
                                    datosItemCode.ItemCodeSteelgoID = (from ics in ctx.Sam3_ItemCodeSteelgo
                                                                       where ics.Codigo == datosItemCode.ItemCodeSteelgo && ics.Activo
                                                                       select ics.ItemCodeSteelgoID).AsParallel().SingleOrDefault().ToString();

                                    datosItemCode.FamiliaMaterial = (from fa in ctx.Sam3_FamiliaAcero
                                                                     where fa.Nombre == datosItemCode.Familia && fa.Activo
                                                                     select fa.FamiliaAceroID).AsParallel().FirstOrDefault().ToString();

                                    datosItemCode.TipoAceroID = (from fm in ctx.Sam3_FamiliaMaterial
                                                                 where fm.Nombre == datosItemCode.TipoAcero && fm.Activo
                                                                 select fm.FamiliaMaterialID).AsParallel().FirstOrDefault();

                                    datosItemCode.ColadaID = (from c in ctx.Sam3_Colada
                                                              where c.NumeroColada == datosItemCode.Colada && c.Activo
                                                              select c.ColadaID).AsParallel().FirstOrDefault();

                                    datosItemCode.ItemCodeID = (from ic in ctx.Sam3_ItemCode
                                                                where ic.Codigo == datosItemCode.ItemCode && ic.Activo
                                                                select ic.ItemCodeID).AsParallel().SingleOrDefault().ToString();

                                    //Revisar si existe el item code
                                    bool existeICenSam3 = ctx.Sam3_EquivalenciaItemCode
                                       .Where(x => x.Sam3_ItemCodeID.ToString() == datosItemCode.ItemCodeID && x.Activo).Any();

                                    if (!existeICenSam3)
                                    {
                                        InsertarItemCodeSam3(datosItemCode, usuario);
                                    }


                                    //Obtenemos IDS
                                    datosItemCode.ItemCodeID = (from ic in ctx.Sam3_ItemCode
                                                                where ic.Codigo == datosItemCode.ItemCode && ic.Activo
                                                                select ic.ItemCodeID).AsParallel().SingleOrDefault().ToString();


                                    int itemCodeID = Convert.ToInt32(datosItemCode.ItemCodeID);

                                    datosItemCode.TipoMaterial = (from tm in ctx.Sam3_ItemCode
                                                                  where tm.ItemCodeID == itemCodeID && tm.Activo
                                                                  select tm.TipoMaterialID).AsParallel().FirstOrDefault();

                                    datosItemCode.D1 = (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                                        join itcs in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals itcs.ItemCodeSteelgoID
                                                        where rics.Activo && itcs.Activo
                                                        && rics.ItemCodeID.ToString() == datosItemCode.ItemCodeID
                                                        select itcs.Diametro1).AsParallel().SingleOrDefault();

                                    datosItemCode.D2 = (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                                        join itcs in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals itcs.ItemCodeSteelgoID
                                                        where rics.Activo && itcs.Activo
                                                        && rics.ItemCodeID.ToString() == datosItemCode.ItemCodeID
                                                        select itcs.Diametro2).AsParallel().SingleOrDefault();

                                    bool existeYnumerosunicos = ctx.Sam3_Rel_Bulto_ItemCode
                                        .Where(x => x.ItemCodeID.ToString() == datosItemCode.ItemCodeID
                                            && x.BultoID.ToString() == datosItemCode.BultoID && x.Activo && x.TieneNumerosUnicos == true).Any();

                                    bool existeSINnumerosunicos = ctx.Sam3_Rel_Bulto_ItemCode.Where(x => x.ItemCodeID.ToString() == datosItemCode.ItemCodeID
                                        && x.BultoID.ToString() == datosItemCode.BultoID && x.Activo && x.TieneNumerosUnicos == false).Any();

                                    //Existen el ics y el ic en la relacion
                                    bool existeRelICS = ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                            .Where(x => x.ItemCodeID.ToString() == datosItemCode.ItemCodeID
                                                && x.ItemCodeSteelgoID.ToString() == datosItemCode.ItemCodeSteelgoID
                                                && x.Activo).Any();

                                    //Existe solo el item code en la relacion
                                    bool ICexisteEnRel = ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                        .Where(x => x.ItemCodeID.ToString() == datosItemCode.ItemCodeID && x.Activo).Any();

                                    //Que no exista el IC en la relacion
                                    if (!existeRelICS && !ICexisteEnRel)
                                    {
                                        InsertarRelacionIC_ICS(datosItemCode, usuario);
                                    }
                                    else if (ICexisteEnRel && !existeRelICS)
                                    {
                                        TieneErrores = true;
                                    }

                                    //Update IC y ICS
                                    IC = ActualizarItemCode(datosItemCode, IC, usuario);
                                    ICS = ActualizarItemCodeSteelgo(datosItemCode, ICS, usuario);

                                    //Creo relacion bulto item code
                                    bool existeRelBultoIC = ctx.Sam3_Rel_Bulto_ItemCode.Where(x => x.BultoID.ToString() == datosItemCode.BultoID
                                        && x.ItemCodeID.ToString() == datosItemCode.ItemCodeID && x.Activo).Any();

                                    if (!existeRelBultoIC)
                                    {
                                        CrearRelacionBulto_IC(datosItemCode, usuario);
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
                                        Cedula = datosItemCode.Cedula,
                                        D1 = ICS.Diametro1,
                                        D2 = ICS.Diametro2,
                                        Familia = datosItemCode.Familia,
                                        TipoAcero = datosItemCode.TipoAcero,
                                        Cantidad = IC.Cantidad,
                                        MM = IC.MM,
                                        Colada = datosItemCode.Colada,
                                        TieneError = TieneErrores,
                                        Estatus = folioCuantificacion.Estatus,
                                        TieneNU = datosItemCode.TieneNU
                                    });
                                    //}
                                }
                                //}
                                //scope.Complete();

                                #endregion
                                break;
                        }

#if DEBUG
                        JavaScriptSerializer serializer = new JavaScriptSerializer();
                        string json = serializer.Serialize(listaNuevosIC);
#endif

                        return listaNuevosIC;
                    } //tran sam3
                }
                //}
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

        /// <summary>
        /// Funcion para insertar un bulto en la tabla Sam3_Bulto
        /// </summary>
        /// <param name="FolioCuantificacion">Folio Cuantificacion seleccionado</param>
        /// <param name="usuario">usuario actual</param>
        /// <returns>Bulto object</returns>
        public Sam3_Bulto InsertarBulto(int FolioCuantificacion, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_Bulto bulto = new Sam3_Bulto();
                    bulto.FolioCuantificacionID = FolioCuantificacion;
                    bulto.Estatus = "En Proceso de Recepción";
                    bulto.FechaModificacion = DateTime.Now;
                    bulto.UsuarioModificacion = usuario.UsuarioID;
                    bulto.Activo = true;
                    ctx.Sam3_Bulto.Add(bulto);
                    ctx.SaveChanges();

                    if (!(bool)EnviarAvisosBd.Instance.EnviarNotificación(1,
                           string.Format("Se generó un nuevo bulto para el folio Cuantificación {0} con fecha {1}",
                           FolioCuantificacion, bulto.FechaModificacion), usuario))
                    {
                        //Agregar error a la bitacora  PENDIENTE
                    }


                    return bulto;
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------

                return null;
            }
        }

        /// <summary>
        /// Funcion para Actualizar un bulto
        /// </summary>
        /// <param name="FolioCuantificacion">Folio cuantificacion seleccionado</param>
        /// <param name="usuario">usuario actual</param>
        /// <param name="bultoID">Bulto a actualizar</param>
        /// <returns>Bulto object</returns>
        public Sam3_Bulto ActualizarBulto(int FolioCuantificacion, Sam3_Usuario usuario, string bultoID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    Sam3_Bulto bulto = ctx.Sam3_Bulto.Where(x => x.BultoID.ToString() == bultoID && x.Activo).AsParallel().SingleOrDefault();
                    if (bulto.Estatus != "Terminado")
                    {
                        bulto.FolioCuantificacionID = FolioCuantificacion;
                        bulto.Estatus = "En Proceso de Recepción";
                        bulto.FechaModificacion = DateTime.Now;
                        bulto.UsuarioModificacion = usuario.UsuarioID;
                        bulto.Activo = true;

                        ctx.SaveChanges();
                    }
                    return bulto;
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------

                return null;
            }
        }


        /// <summary>
        /// Funcion para Actualizar un Item Code
        /// </summary>
        /// <param name="item">Datos capturados en el grid</param>
        /// <param name="IC">Item Code object</param>
        /// <param name="usuario">usuario actual</param>
        /// <returns>ItemCode object</returns>
        public Sam3_ItemCode ActualizarItemCode(CuantificacionListado item, Sam3_ItemCode IC, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    //Update IC
                    IC = ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCodeID && x.Activo).AsParallel().SingleOrDefault();

                    IC.TipoMaterialID = item.TipoMaterial;
                    IC.Activo = true;
                    IC.UsuarioModificacion = usuario.UsuarioID;
                    IC.FechaModificacion = DateTime.Now;
                    IC.Cantidad = item.Cantidad;
                    IC.MM = item.MM.ToString() == "N/A" ? null : item.MM;
                    IC.ColadaID = item.ColadaID;
                    IC.Diametro1 = item.D1;
                    IC.Diametro2 = item.D2;
                    //IC.DescripcionEspanol = item.Descripcion;
                    //IC.DescripcionIngles = item.Descripcion;
                    IC.FamiliaAceroID = Convert.ToInt32(item.FamiliaMaterial);


                    ctx.SaveChanges();

                    return IC;
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------

                return null;
            }
        }

        public Sam3_ItemCode InsertarItemCodeSam3(CuantificacionListado datosItemCode, Sam3_Usuario usuario)
        {
            try
            {
                DatabaseManager.Sam2.ItemCode itemS2 = new DatabaseManager.Sam2.ItemCode();
                using (DatabaseManager.Sam2.Sam2Context ctx2 = new DatabaseManager.Sam2.Sam2Context())
                {
                    itemS2 = ctx2.ItemCode.Where(x => x.Codigo == datosItemCode.ItemCode).AsParallel().SingleOrDefault();
                }

                using (SamContext ctx = new SamContext())
                {
                    Sam3_ItemCode nuevoItem = new Sam3_ItemCode();
                    nuevoItem.ProyectoID = itemS2.ProyectoID;
                    nuevoItem.TipoMaterialID = itemS2.TipoMaterialID;
                    nuevoItem.Codigo = itemS2.Codigo;
                    nuevoItem.ItemCodeCliente = itemS2.ItemCodeCliente;
                    nuevoItem.DescripcionEspanol = itemS2.DescripcionEspanol;
                    nuevoItem.DescripcionIngles = itemS2.DescripcionIngles;
                    nuevoItem.DescripcionInterna = itemS2.DescripcionInterna;
                    nuevoItem.Diametro1 = itemS2.Diametro1;
                    nuevoItem.Diametro2 = itemS2.Diametro2;
                    nuevoItem.FamiliaAceroID = itemS2.FamiliaAceroID;
                    nuevoItem.Peso = itemS2.Peso;
                    nuevoItem.ColadaID = datosItemCode.ColadaID;
                    nuevoItem.TipoUsoID = Convert.ToInt32(datosItemCode.TipoUsoID) == -1 ? 1 : Convert.ToInt32(datosItemCode.TipoUsoID);
                    nuevoItem.FamiliaAceroID = Convert.ToInt32(datosItemCode.FamiliaMaterial);
                    nuevoItem.Activo = true;
                    nuevoItem.FechaModificacion = DateTime.Now;
                    nuevoItem.UsuarioModificacion = usuario.UsuarioID;

                    ctx.Sam3_ItemCode.Add(nuevoItem);
                    ctx.SaveChanges();

                    Sam3_EquivalenciaItemCode equivalencia = new Sam3_EquivalenciaItemCode();
                    equivalencia.Sam2_ItemCodeID = itemS2.ItemCodeID;
                    equivalencia.Sam3_ItemCodeID = nuevoItem.ItemCodeID;
                    equivalencia.Activo = true;
                    equivalencia.FechaModificacion = DateTime.Now;
                    equivalencia.UsuarioModificacion = usuario.UsuarioID;

                    ctx.Sam3_EquivalenciaItemCode.Add(equivalencia);
                    ctx.SaveChanges();

                    return nuevoItem;
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------

                return null;
            }
        }

        /// <summary>
        /// Funcion para actualizar un ItemCode Steelgo
        /// </summary>
        /// <param name="item">DAtos capturados en el grid de materiales</param>
        /// <param name="ICS">ItemCodeSteelgo object</param>
        /// <param name="usuario">usuario actual</param>
        /// <returns>ItemCodeSteelgo object</returns>
        public Sam3_ItemCodeSteelgo ActualizarItemCodeSteelgo(CuantificacionListado item, Sam3_ItemCodeSteelgo ICS, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    //Update ICS
                    ICS = ctx.Sam3_ItemCodeSteelgo.Where(x => x.ItemCodeSteelgoID.ToString() == item.ItemCodeSteelgoID && x.Activo).AsParallel().SingleOrDefault();
                    string[] splitCedulas;
                    int cedulaID = 0;

                    if (item.Cedula != null && item.Cedula != "")
                    {
                        splitCedulas = item.Cedula.Split('-');
                        var diametro = splitCedulas[0];
                        var cedulaA = splitCedulas[1];
                        var cedulaB = splitCedulas[2];
                        var cedulaC = splitCedulas[3];

                        cedulaID = ctx.Sam3_Cedula.Where(x => x.Diametro.ToString() == diametro &&
                                                        x.CedulaA == cedulaA &&
                                                        x.CedulaB == cedulaB &&
                                                        x.CedulaC == cedulaC &&
                                                        x.Activo).Select(x => x.CedulaID).AsParallel().SingleOrDefault();
                    }

                    ICS.DescripcionEspanol = item.Descripcion;
                    ICS.DescripcionIngles = item.Descripcion;
                    //ICS.Peso = item.Peso;
                    //ICS.Diametro1 = item.D1;
                    //ICS.Diametro2 = item.D2;
                    ICS.FamiliaAceroID = Int32.Parse(item.FamiliaMaterial);
                    if (cedulaID > 0)
                    {
                        ICS.CedulaID = cedulaID;
                    }
                    ICS.Codigo = item.ItemCodeSteelgo;
                    ICS.Activo = true;
                    ICS.UsuarioModificacion = usuario.UsuarioID;
                    ICS.FechaModificacion = DateTime.Now;

                    ctx.SaveChanges();

                    return ICS;
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------

                return null;
            }
        }

        /// <summary>
        /// Funcion para insertar una relacion entre Folio Cuantificacion y el ItemCode seleccionados
        /// </summary>
        /// <param name="FolioCuantificacion">Folio Cuantificacion seleccionado</param>
        /// <param name="IC">ItemCode object</param>
        /// <param name="usuario">usuario actual</param>
        public void InsertarRelacionFolioCuantificacion_IC(int FolioCuantificacion, Sam3_ItemCode IC, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    //Insertar la Relacion Folio Cuantificacion IC
                    Sam3_Rel_FolioCuantificacion_ItemCode relIC = new Sam3_Rel_FolioCuantificacion_ItemCode();
                    relIC.FolioCuantificacionID = FolioCuantificacion;
                    relIC.ItemCodeID = IC.ItemCodeID;
                    relIC.TieneNumerosUnicos = false;
                    relIC.FechaModificacion = DateTime.Now;
                    relIC.UsuarioModificacion = usuario.UsuarioID;
                    relIC.Activo = true;

                    ctx.Sam3_Rel_FolioCuantificacion_ItemCode.Add(relIC);
                    ctx.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
            }
        }

        /// <summary>
        /// Funcion para insertar una Relacion entre Item Code y ItemCodeSteelgo seleccionados
        /// </summary>
        /// <param name="item">Datos capturados en el grid</param>
        /// <param name="usuario">usuario actual</param>
        public void InsertarRelacionIC_ICS(CuantificacionListado item, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_Rel_ItemCode_ItemCodeSteelgo ics = new Sam3_Rel_ItemCode_ItemCodeSteelgo();
                    ics.ItemCodeID = Int32.Parse(item.ItemCodeID);
                    ics.ItemCodeSteelgoID = Int32.Parse(item.ItemCodeSteelgoID);
                    ics.Activo = true;
                    ics.FechaModificacion = DateTime.Now;
                    ics.UsuarioModificacion = usuario.UsuarioID;

                    ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo.Add(ics);
                    ctx.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
            }
        }

        /// <summary>
        /// Funcion para insertar la relacion Bulto Item Code
        /// </summary>
        /// <param name="item">Datos capturados en el grid</param>
        /// <param name="usuario">usuario actual</param>
        public void CrearRelacionBulto_IC(CuantificacionListado item, Sam3_Usuario usuario)
        {
            try
            {
                //creo la relacion bulto IC
                using (SamContext ctx = new SamContext())
                {
                    Sam3_Rel_Bulto_ItemCode bic = new Sam3_Rel_Bulto_ItemCode();
                    bic.BultoID = Int32.Parse(item.BultoID);
                    bic.ItemCodeID = Int32.Parse(item.ItemCodeID);
                    bic.TieneNumerosUnicos = false;
                    bic.FechaModificacion = DateTime.Now;
                    bic.UsuarioModificacion = usuario.UsuarioID;
                    bic.Activo = true;
                    ctx.Sam3_Rel_Bulto_ItemCode.Add(bic);
                    ctx.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
            }
        }

    }
}