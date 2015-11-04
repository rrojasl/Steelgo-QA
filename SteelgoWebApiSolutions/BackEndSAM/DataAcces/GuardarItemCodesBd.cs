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

                        datosItemCode.ItemCodeSteelgo = string.IsNullOrEmpty(datosItemCode.ItemCodeSteelgo) ? "ICS-Default" : datosItemCode.ItemCodeSteelgo;
                        datosItemCode.ItemCodeSteelgoID = string.IsNullOrEmpty(datosItemCode.ItemCodeSteelgoID) ? "1" : datosItemCode.ItemCodeSteelgoID;
                        datosItemCode.Familia = string.IsNullOrEmpty(datosItemCode.Familia) ? datosItemCode.Familia = "Familia Default" : datosItemCode.Familia;

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
                                    //buscar el itemcode steelgo atravez de su relacion con los diametros
                                    //datosItemCode.ItemCodeSteelgoID = (from ics in ctx.Sam3_ItemCodeSteelgo
                                    //                                   join rid in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro on ics.ItemCodeSteelgoID equals rid.ItemCodeSteelgoID
                                    //                                   where ics.Activo
                                    //                                   && rid.Rel_ItemCodeSteelgo_Diametro_ID.ToString() == datosItemCode.ItemCodeSteelgoID
                                    //                                   select ics.ItemCodeSteelgoID).AsParallel().SingleOrDefault().ToString();

                                    datosItemCode.FamiliaMaterial = (from fa in ctx.Sam3_FamiliaAcero
                                                                     where fa.Nombre == datosItemCode.Familia && fa.Activo
                                                                     select fa.FamiliaAceroID).AsParallel().FirstOrDefault().ToString();

                                    if (datosItemCode.FamiliaMaterial == "0")
                                    {
                                        //valor por default
                                        datosItemCode.FamiliaMaterial = "1";
                                    }

                                    datosItemCode.TipoAceroID = (from fm in ctx.Sam3_FamiliaMaterial
                                                                 where fm.Nombre == datosItemCode.TipoAcero && fm.Activo
                                                                 select fm.FamiliaMaterialID).AsParallel().FirstOrDefault();

                                    datosItemCode.ColadaID = (from c in ctx.Sam3_Colada
                                                              where c.NumeroColada == datosItemCode.Colada && c.Activo
                                                              select c.ColadaID).AsParallel().FirstOrDefault();

                                    //Buscamos el itemcode de acuerdo a la relacion con diametros
                                    int itemCodeID = (from ic in ctx.Sam3_ItemCode
                                                      join rid in ctx.Sam3_Rel_ItemCode_Diametro on ic.ItemCodeID equals rid.ItemCodeID
                                                      where ic.Activo
                                                      && rid.Rel_ItemCode_Diametro_ID.ToString() == datosItemCode.ItemCodeID
                                                      select ic.ItemCodeID).AsParallel().SingleOrDefault();

                                    //Revisar si existe el item code
                                    bool existeICenSam3 = ctx.Sam3_EquivalenciaItemCode
                                       .Where(x => x.Sam3_ItemCodeID == itemCodeID && x.Activo).Any();

                                    if (!existeICenSam3)
                                    {
                                        InsertarItemCodeSam3(datosItemCode, usuario);
                                    }


                                    datosItemCode.TipoMaterial = (from tm in ctx.Sam3_ItemCode
                                                                  where tm.ItemCodeID == itemCodeID && tm.Activo
                                                                  select tm.TipoMaterialID).AsParallel().FirstOrDefault();

                                    datosItemCode.D1 = (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                                        join rid in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro on rics.Rel_ItemCodeSteelgo_Diametro_ID equals rid.Rel_ItemCodeSteelgo_Diametro_ID
                                                        join itcs in ctx.Sam3_ItemCodeSteelgo on rid.ItemCodeSteelgoID equals itcs.ItemCodeSteelgoID
                                                        join d in ctx.Sam3_Diametro on rid.Diametro1ID equals d.DiametroID
                                                        where rics.Activo && rid.Activo && itcs.Activo
                                                        && rid.ItemCodeSteelgoID.ToString() == datosItemCode.ItemCodeSteelgoID
                                                        select d.Valor).AsParallel().SingleOrDefault();

                                    //si el diametro1 es nulo, es por que el Itemcode no tiene asociado un ItemCode Steelgo. Asi que asignamos los diametros del Itemcode
                                    if (datosItemCode.D1 <= 0)
                                    {
                                        datosItemCode.D1 = (from rid in ctx.Sam3_Rel_ItemCode_Diametro
                                                            join d1 in ctx.Sam3_Diametro on rid.Diametro1ID equals d1.DiametroID
                                                            where rid.Activo && rid.Rel_ItemCode_Diametro_ID.ToString() == datosItemCode.ItemCodeID
                                                            select d1.Valor).AsParallel().SingleOrDefault();
                                    }

                                    datosItemCode.D2 = (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                                        join rid in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro on rics.Rel_ItemCodeSteelgo_Diametro_ID equals rid.Rel_ItemCodeSteelgo_Diametro_ID
                                                        join itcs in ctx.Sam3_ItemCodeSteelgo on rid.ItemCodeSteelgoID equals itcs.ItemCodeSteelgoID
                                                        join d in ctx.Sam3_Diametro on rid.Diametro2ID equals d.DiametroID
                                                        where rics.Activo && rid.Activo && itcs.Activo
                                                        && rid.ItemCodeSteelgoID.ToString() == datosItemCode.ItemCodeSteelgoID
                                                        select d.Valor).AsParallel().SingleOrDefault();

                                    //si el diametro2 es nulo, es por que el Itemcode no tiene asociado un ItemCode Steelgo. Asi que asignamos los diametros del Itemcode
                                    if (datosItemCode.D2 <= 0)
                                    {
                                        datosItemCode.D2 = (from rid in ctx.Sam3_Rel_ItemCode_Diametro
                                                            join d2 in ctx.Sam3_Diametro on rid.Diametro1ID equals d2.DiametroID
                                                            where rid.Activo && rid.Rel_ItemCode_Diametro_ID.ToString() == datosItemCode.ItemCodeID
                                                            select d2.Valor).AsParallel().SingleOrDefault();
                                    }

                                    //Si existen ic y ics en la relacion
                                    bool existeRelICS = ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                            .Where(x => x.Rel_ItemCode_Diametro_ID.ToString() == datosItemCode.ItemCodeID
                                                && x.Rel_ItemCodeSteelgo_Diametro_ID.ToString() == datosItemCode.ItemCodeSteelgoID
                                                && x.Activo).Any();

                                    //si ya existe solo ic en la relacion
                                    bool ICexisteEnRel = ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                            .Where(x => x.Rel_ItemCode_Diametro_ID.ToString() == datosItemCode.ItemCodeID && x.Activo).Any();

                                    //Que no exista el IC en la relacion
                                    if ((!existeRelICS && !ICexisteEnRel) && (datosItemCode.ItemCodeID != null && datosItemCode.ItemCodeSteelgoID != null))
                                    {
                                        InsertarRelacionIC_ICS(datosItemCode, usuario);
                                    }

                                    //Update IC y ICS
                                    if (datosItemCode.ItemCodeID != "" && datosItemCode.ItemCodeID != null)
                                    {
                                        IC = ActualizarItemCode(datosItemCode, IC, usuario);
                                    }

                                    if (datosItemCode.ItemCodeSteelgoID != "" && datosItemCode.ItemCodeSteelgoID != null)
                                    {
                                        ICS = ActualizarItemCodeSteelgo(datosItemCode, ICS, usuario);
                                    }

                                    #region rel itemcode o bulto

                                    //se pueden tener mas de un registro de itemcode en una cuantificacion, de modo que aqui verifico si ya existe la relacion
                                    // si ya existe actualizo los datos con los que vienen de entrada y si no existe genero un nuevo registro
                                    int relFolioCItemCodeID = datosItemCode.RelFCId != "" && datosItemCode.RelFCId != null ? Convert.ToInt32(datosItemCode.RelFCId) : 0;
                                    if(relFolioCItemCodeID > 0)
                                    {
                                        //Actualiza la relacion del ItemCOde
                                        ActualizarRelacionFolioCItemCode(relFolioCItemCodeID, datosItemCode, usuario);
                                    }
                                    else
                                    {
                                        //Inserta un nuevo registro
                                        InsertarRelacionFolioCuantificacion_IC(FolioCuantificacion, datosItemCode, usuario);
                                    }


                                    #endregion

                                    listaNuevosIC.Add(new CuantificacionListado
                                    {
                                        ItemCodeID = datosItemCode.ItemCodeID, //IC.ItemCodeID.ToString(),
                                        TipoMaterial = IC.TipoMaterialID,
                                        ItemCode = datosItemCode.ItemCode, //IC.Codigo,
                                        ItemCodeSteelgo = datosItemCode.ItemCodeSteelgo, //ICS.Codigo,
                                        ItemCodeSteelgoID = datosItemCode.ItemCodeSteelgoID, //ICS.ItemCodeSteelgoID.ToString(),
                                        Descripcion = ICS.DescripcionEspanol,
                                        Peso = ICS.Peso,
                                        Cedula = datosItemCode.Cedula,
                                        D1 = (from rid in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro //ICS.Diametro1,
                                              join d in ctx.Sam3_Diametro on rid.Diametro1ID equals d.DiametroID
                                              where rid.Activo && rid.Rel_ItemCodeSteelgo_Diametro_ID.ToString() == datosItemCode.ItemCodeSteelgoID
                                              select d.Valor).SingleOrDefault(),
                                        D2 = (from rid in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro //ICS.Diametro1,
                                              join d in ctx.Sam3_Diametro on rid.Diametro2ID equals d.DiametroID
                                              where rid.Activo && rid.Rel_ItemCodeSteelgo_Diametro_ID.ToString() == datosItemCode.ItemCodeSteelgoID
                                              select d.Valor).SingleOrDefault(),
                                        Familia = datosItemCode.Familia,
                                        TipoAcero = datosItemCode.TipoAcero,
                                        Cantidad = datosItemCode.Cantidad,//IC.Cantidad,
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
                                            ItemCodeID = datosItemCode.ItemCodeID,//IC.ItemCodeID.ToString(),
                                            TipoMaterial = IC.TipoMaterialID,
                                            ItemCode = datosItemCode.ItemCode,//IC.Codigo,
                                            ItemCodeSteelgo = datosItemCode.ItemCodeSteelgo,//ICS.Codigo,
                                            ItemCodeSteelgoID = datosItemCode.ItemCodeSteelgoID,//ICS.ItemCodeSteelgoID.ToString(),
                                            Descripcion = ICS.DescripcionEspanol,
                                            Peso = ICS.Peso,
                                            Cedula = datosItemCode.Cedula,
                                            D1 = (from rid in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro //ICS.Diametro1,
                                              join d in ctx.Sam3_Diametro on rid.Diametro1ID equals d.DiametroID
                                              where rid.Activo && rid.Rel_ItemCodeSteelgo_Diametro_ID.ToString() == datosItemCode.ItemCodeSteelgoID
                                              select d.Valor).SingleOrDefault(),
                                            D2 = (from rid in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro //ICS.Diametro1,
                                              join d in ctx.Sam3_Diametro on rid.Diametro2ID equals d.DiametroID
                                              where rid.Activo && rid.Rel_ItemCodeSteelgo_Diametro_ID.ToString() == datosItemCode.ItemCodeSteelgoID
                                              select d.Valor).SingleOrDefault(),
                                            Familia = datosItemCode.Familia,
                                            TipoAcero = datosItemCode.TipoAcero,
                                            Cantidad = datosItemCode.Cantidad,//IC.Cantidad,
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

                                    //buscar el itemcode steelgo atravez de su relacion con los diametros
                                    //datosItemCode.ItemCodeSteelgoID = (from ics in ctx.Sam3_ItemCodeSteelgo
                                    //                                   join rid in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro on ics.ItemCodeSteelgoID equals rid.ItemCodeSteelgoID
                                    //                                   where ics.Activo
                                    //                                   && rid.Rel_ItemCodeSteelgo_Diametro_ID.ToString() == datosItemCode.ItemCodeSteelgoID
                                    //                                   select ics.ItemCodeSteelgoID).AsParallel().SingleOrDefault().ToString();

                                    datosItemCode.FamiliaMaterial = (from fa in ctx.Sam3_FamiliaAcero
                                                                     where fa.Nombre == datosItemCode.Familia && fa.Activo
                                                                     select fa.FamiliaAceroID).AsParallel().FirstOrDefault().ToString();

                                    if (datosItemCode.FamiliaMaterial == "0")
                                    {
                                        //valor por default
                                        datosItemCode.FamiliaMaterial = "1";
                                    }

                                    datosItemCode.TipoAceroID = (from fm in ctx.Sam3_FamiliaMaterial
                                                                 where fm.Nombre == datosItemCode.TipoAcero && fm.Activo
                                                                 select fm.FamiliaMaterialID).AsParallel().FirstOrDefault();

                                    datosItemCode.ColadaID = (from c in ctx.Sam3_Colada
                                                              where c.NumeroColada == datosItemCode.Colada && c.Activo
                                                              select c.ColadaID).AsParallel().FirstOrDefault();

                                    //Buscamos el itemcode de acuerdo a la relacion con diametros
                                    int itemCodeID  = (from ic in ctx.Sam3_ItemCode
                                                                join rid in ctx.Sam3_Rel_ItemCode_Diametro on ic.ItemCodeID equals rid.ItemCodeID
                                                                where ic.Activo
                                                                && rid.Rel_ItemCode_Diametro_ID.ToString() == datosItemCode.ItemCodeID
                                                                select ic.ItemCodeID).AsParallel().SingleOrDefault();

                                    //Revisar si existe el item code // la insercion de los itemcodes inserta en ambas bases de datos por lo que no es necesario
                                    //volver a verificar e insertat. borrar el codigo despues de las pruebas
                                    bool existeICenSam3 = ctx.Sam3_EquivalenciaItemCode
                                       .Where(x => x.Sam3_ItemCodeID == itemCodeID && x.Activo).Any();

                                    if (!existeICenSam3)
                                    {
                                        InsertarItemCodeSam3(datosItemCode, usuario);
                                    }


                                    datosItemCode.TipoMaterial = (from tm in ctx.Sam3_ItemCode
                                                                  where tm.ItemCodeID == itemCodeID && tm.Activo
                                                                  select tm.TipoMaterialID).AsParallel().FirstOrDefault();

                                    datosItemCode.D1 = (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                                        join rid in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro on rics.Rel_ItemCodeSteelgo_Diametro_ID equals rid.Rel_ItemCodeSteelgo_Diametro_ID
                                                        join itcs in ctx.Sam3_ItemCodeSteelgo on rid.ItemCodeSteelgoID equals itcs.ItemCodeSteelgoID
                                                        join d in ctx.Sam3_Diametro on rid.Diametro1ID equals d.DiametroID
                                                        where rics.Activo && rid.Activo && itcs.Activo
                                                        && rid.ItemCodeSteelgoID.ToString() == datosItemCode.ItemCodeSteelgoID
                                                        select d.Valor).AsParallel().SingleOrDefault();

                                    datosItemCode.D2 = (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                                        join rid in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro on rics.Rel_ItemCodeSteelgo_Diametro_ID equals rid.Rel_ItemCodeSteelgo_Diametro_ID
                                                        join itcs in ctx.Sam3_ItemCodeSteelgo on rid.ItemCodeSteelgoID equals itcs.ItemCodeSteelgoID
                                                        join d in ctx.Sam3_Diametro on rid.Diametro2ID equals d.DiametroID
                                                        where rics.Activo && rid.Activo && itcs.Activo
                                                        && rid.ItemCodeSteelgoID.ToString() == datosItemCode.ItemCodeSteelgoID
                                                        select d.Valor).AsParallel().SingleOrDefault();

                                    //si el diametro1 es nulo, es por que el Itemcode no tiene asociado un ItemCode Steelgo. Asi que asignamos los diametros del Itemcode
                                    if (datosItemCode.D1 <= 0)
                                    {
                                        datosItemCode.D1 = (from rid in ctx.Sam3_Rel_ItemCode_Diametro
                                                            join d1 in ctx.Sam3_Diametro on rid.Diametro1ID equals d1.DiametroID
                                                            where rid.Activo && rid.Rel_ItemCode_Diametro_ID.ToString() == datosItemCode.ItemCodeID
                                                            select d1.Valor).AsParallel().SingleOrDefault();
                                    }

                                    //si el diametro2 es nulo, es por que el Itemcode no tiene asociado un ItemCode Steelgo. Asi que asignamos los diametros del Itemcode
                                    if (datosItemCode.D2 <= 0)
                                    {
                                        datosItemCode.D2 = (from rid in ctx.Sam3_Rel_ItemCode_Diametro
                                                            join d2 in ctx.Sam3_Diametro on rid.Diametro1ID equals d2.DiametroID
                                                            where rid.Activo && rid.Rel_ItemCode_Diametro_ID.ToString() == datosItemCode.ItemCodeID
                                                            select d2.Valor).AsParallel().SingleOrDefault();
                                    }


                                    //Si existen ic y ics en la relacion
                                    bool existeRelICS = ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                            .Where(x => x.Rel_ItemCode_Diametro_ID.ToString() == datosItemCode.ItemCodeID
                                                && x.Rel_ItemCodeSteelgo_Diametro_ID.ToString() == datosItemCode.ItemCodeSteelgoID
                                                && x.Activo).Any();

                                    //si ya existe solo ic en la relacion
                                    bool ICexisteEnRel = ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                            .Where(x => x.Rel_ItemCode_Diametro_ID.ToString() == datosItemCode.ItemCodeID && x.Activo).Any();

                                    //Que no exista el IC en la relacion con itemcode steelgo
                                    if ((!existeRelICS && !ICexisteEnRel) && (datosItemCode.ItemCodeID != null && datosItemCode.ItemCodeSteelgoID != null))
                                    {
                                        InsertarRelacionIC_ICS(datosItemCode, usuario);
                                    }

                                    //Update IC y ICS
                                    if (datosItemCode.ItemCodeID != "" && datosItemCode.ItemCodeID != null)
                                    {
                                        IC = ActualizarItemCode(datosItemCode, IC, usuario);
                                    }

                                    if (datosItemCode.ItemCodeSteelgoID != "" && datosItemCode.ItemCodeSteelgoID != null)
                                    {
                                        ICS = ActualizarItemCodeSteelgo(datosItemCode, ICS, usuario);
                                    }

                                    #region rel folio itemcode
                                    int relFolioCItemCodeID = datosItemCode.RelFCId != "" && datosItemCode.RelFCId != null ? Convert.ToInt32(datosItemCode.RelFCId) : 0;
                                    if(relFolioCItemCodeID > 0)
                                    {
                                        //Actualiza la relacion del ItemCOde
                                        ActualizarRelacionFolioCItemCode(relFolioCItemCodeID, datosItemCode,usuario);
                                    }
                                    else
                                    {
                                        //Inserta un nuevo registro
                                        InsertarRelacionFolioCuantificacion_IC(FolioCuantificacion, datosItemCode, usuario);
                                    }
                                    #endregion

                                    listaNuevosIC.Add(new CuantificacionListado
                                    {
                                        ItemCodeID = datosItemCode.ItemCodeID, //IC.ItemCodeID.ToString(),
                                        TipoMaterial = IC.TipoMaterialID,
                                        ItemCode = datosItemCode.ItemCode, //IC.Codigo,
                                        ItemCodeSteelgo = datosItemCode.ItemCodeSteelgo, //ICS.Codigo,
                                        ItemCodeSteelgoID = datosItemCode.ItemCodeSteelgoID, //ICS.ItemCodeSteelgoID.ToString(),
                                        Descripcion = ICS.DescripcionEspanol,
                                        Peso = ICS.Peso,
                                        Cedula = datosItemCode.Cedula,
                                        D1 = (from rid in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro //ICS.Diametro1,
                                              join d in ctx.Sam3_Diametro on rid.Diametro1ID equals d.DiametroID
                                              where rid.Activo && rid.Rel_ItemCodeSteelgo_Diametro_ID.ToString() == datosItemCode.ItemCodeSteelgoID
                                              select d.Valor).SingleOrDefault(),
                                        D2 = (from rid in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro //ICS.Diametro1,
                                              join d in ctx.Sam3_Diametro on rid.Diametro2ID equals d.DiametroID
                                              where rid.Activo && rid.Rel_ItemCodeSteelgo_Diametro_ID.ToString() == datosItemCode.ItemCodeSteelgoID
                                              select d.Valor).SingleOrDefault(),
                                        Familia = datosItemCode.Familia,
                                        TipoAcero = datosItemCode.TipoAcero,
                                        Cantidad = datosItemCode.Cantidad,//IC.Cantidad,
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
                                            ItemCodeID = datosItemCode.ItemCodeID,//IC.ItemCodeID.ToString(),
                                            TipoMaterial = IC.TipoMaterialID,
                                            ItemCode = datosItemCode.ItemCode,//IC.Codigo,
                                            ItemCodeSteelgo = datosItemCode.ItemCodeSteelgo,//ICS.Codigo,
                                            ItemCodeSteelgoID = datosItemCode.ItemCodeSteelgoID,//ICS.ItemCodeSteelgoID.ToString(),
                                            Descripcion = ICS.DescripcionEspanol,
                                            Peso = ICS.Peso,
                                            Cedula = datosItemCode.Cedula,
                                            D1 = (from rid in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro //ICS.Diametro1,
                                                  join d in ctx.Sam3_Diametro on rid.Diametro1ID equals d.DiametroID
                                                  where rid.Activo && rid.Rel_ItemCodeSteelgo_Diametro_ID.ToString() == datosItemCode.ItemCodeSteelgoID
                                                  select d.Valor).SingleOrDefault(),
                                            D2 = (from rid in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro //ICS.Diametro1,
                                                  join d in ctx.Sam3_Diametro on rid.Diametro2ID equals d.DiametroID
                                                  where rid.Activo && rid.Rel_ItemCodeSteelgo_Diametro_ID.ToString() == datosItemCode.ItemCodeSteelgoID
                                                  select d.Valor).SingleOrDefault(),
                                            Familia = datosItemCode.Familia,
                                            TipoAcero = datosItemCode.TipoAcero,
                                            Cantidad = datosItemCode.Cantidad,//IC.Cantidad,
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
                                    //buscar el itemcode steelgo atravez de su relacion con los diametros
                                    //datosItemCode.ItemCodeSteelgoID = (from ics in ctx.Sam3_ItemCodeSteelgo
                                    //                                   join rid in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro on ics.ItemCodeSteelgoID equals rid.ItemCodeSteelgoID
                                    //                                   where ics.Activo
                                    //                                   && rid.Rel_ItemCodeSteelgo_Diametro_ID.ToString() == datosItemCode.ItemCodeSteelgoID
                                    //                                   select ics.ItemCodeSteelgoID).AsParallel().SingleOrDefault().ToString();

                                    datosItemCode.FamiliaMaterial = (from fa in ctx.Sam3_FamiliaAcero
                                                                     where fa.Nombre == datosItemCode.Familia && fa.Activo
                                                                     select fa.FamiliaAceroID).AsParallel().FirstOrDefault().ToString();

                                    if (datosItemCode.FamiliaMaterial == "0")
                                    {
                                        //valor por default
                                        datosItemCode.FamiliaMaterial = "1";
                                    }

                                    datosItemCode.TipoAceroID = (from fm in ctx.Sam3_FamiliaMaterial
                                                                 where fm.Nombre == datosItemCode.TipoAcero && fm.Activo
                                                                 select fm.FamiliaMaterialID).AsParallel().FirstOrDefault();

                                    datosItemCode.ColadaID = (from c in ctx.Sam3_Colada
                                                              where c.NumeroColada == datosItemCode.Colada && c.Activo
                                                              select c.ColadaID).AsParallel().FirstOrDefault();

                                    //Buscamos el itemcode de acuerdo a la relacion con diametros
                                    //datosItemCode.ItemCodeID = 

                                    int itemCodeID = (from ic in ctx.Sam3_ItemCode
                                                      join rid in ctx.Sam3_Rel_ItemCode_Diametro on ic.ItemCodeID equals rid.ItemCodeID
                                                      where ic.Activo
                                                      && rid.Rel_ItemCode_Diametro_ID.ToString() == datosItemCode.ItemCodeID
                                                      select ic.ItemCodeID).AsParallel().SingleOrDefault();

                                    //Revisar si existe el item code
                                    bool existeICenSam3 = ctx.Sam3_EquivalenciaItemCode
                                       .Where(x => x.Sam3_ItemCodeID == itemCodeID && x.Activo).Any();

                                    if (!existeICenSam3)
                                    {
                                        InsertarItemCodeSam3(datosItemCode, usuario);
                                    }


                                    datosItemCode.TipoMaterial = (from tm in ctx.Sam3_ItemCode
                                                                  where tm.ItemCodeID == itemCodeID && tm.Activo
                                                                  select tm.TipoMaterialID).AsParallel().FirstOrDefault();

                                    if (datosItemCode.TipoMaterial <= 0)
                                    {
                                        //valor por default
                                        datosItemCode.TipoMaterial = 1;
                                    }

                                    datosItemCode.D1 = (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                                        join rid in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro on rics.Rel_ItemCodeSteelgo_Diametro_ID equals rid.Rel_ItemCodeSteelgo_Diametro_ID
                                                        join itcs in ctx.Sam3_ItemCodeSteelgo on rid.ItemCodeSteelgoID equals itcs.ItemCodeSteelgoID
                                                        join d in ctx.Sam3_Diametro on rid.Diametro1ID equals d.DiametroID
                                                        where rics.Activo && rid.Activo && itcs.Activo
                                                        && rid.ItemCodeSteelgoID.ToString() == datosItemCode.ItemCodeSteelgoID
                                                        select d.Valor).AsParallel().SingleOrDefault();

                                    //si el diametro1 es nulo, es por que el Itemcode no tiene asociado un ItemCode Steelgo. Asi que asignamos los diametros del Itemcode
                                    if (datosItemCode.D1 <= 0)
                                    {
                                        datosItemCode.D1 = (from rid in ctx.Sam3_Rel_ItemCode_Diametro
                                                            join d1 in ctx.Sam3_Diametro on rid.Diametro1ID equals d1.DiametroID
                                                            where rid.Activo && rid.Rel_ItemCode_Diametro_ID.ToString() == datosItemCode.ItemCodeID
                                                            select d1.Valor).AsParallel().SingleOrDefault();
                                    }

                                    datosItemCode.D2 = (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                                        join rid in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro on rics.Rel_ItemCodeSteelgo_Diametro_ID equals rid.Rel_ItemCodeSteelgo_Diametro_ID
                                                        join itcs in ctx.Sam3_ItemCodeSteelgo on rid.ItemCodeSteelgoID equals itcs.ItemCodeSteelgoID
                                                        join d in ctx.Sam3_Diametro on rid.Diametro2ID equals d.DiametroID
                                                        where rics.Activo && rid.Activo && itcs.Activo
                                                        && rid.ItemCodeSteelgoID.ToString() == datosItemCode.ItemCodeSteelgoID
                                                        select d.Valor).AsParallel().SingleOrDefault();

                                    //si el diametro2 es nulo, es por que el Itemcode no tiene asociado un ItemCode Steelgo. Asi que asignamos los diametros del Itemcode
                                    if (datosItemCode.D2 <= 0)
                                    {
                                        datosItemCode.D2 = (from rid in ctx.Sam3_Rel_ItemCode_Diametro
                                                            join d2 in ctx.Sam3_Diametro on rid.Diametro1ID equals d2.DiametroID
                                                            where rid.Activo && rid.Rel_ItemCode_Diametro_ID.ToString() == datosItemCode.ItemCodeID
                                                            select d2.Valor).AsParallel().SingleOrDefault();
                                    }

                                    //Si existen ic y ics en la relacion
                                    bool existeRelICS = ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                            .Where(x => x.Rel_ItemCode_Diametro_ID.ToString() == datosItemCode.ItemCodeID
                                                && x.Rel_ItemCodeSteelgo_Diametro_ID.ToString() == datosItemCode.ItemCodeSteelgoID
                                                && x.Activo).Any();

                                    //si ya existe solo ic en la relacion
                                    bool ICexisteEnRel = ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                            .Where(x => x.Rel_ItemCode_Diametro_ID.ToString() == datosItemCode.ItemCodeID && x.Activo).Any();

                                    //Que no exista el IC en la relacion
                                    if ((!existeRelICS && !ICexisteEnRel) && (datosItemCode.ItemCodeID != null && datosItemCode.ItemCodeSteelgoID != null))
                                    {
                                        InsertarRelacionIC_ICS(datosItemCode, usuario);
                                    }
                                    //else if (ICexisteEnRel && !existeRelICS)
                                    //{
                                    //    TieneErrores = true;
                                    //}

                                    //Update IC y ICS
                                    if (datosItemCode.ItemCodeID != "" && datosItemCode.ItemCodeID != null)
                                    {
                                        IC = ActualizarItemCode(datosItemCode, IC, usuario);
                                    }

                                    if (datosItemCode.ItemCodeSteelgoID != "" && datosItemCode.ItemCodeSteelgoID != null)
                                    {
                                        ICS = ActualizarItemCodeSteelgo(datosItemCode, ICS, usuario);
                                    }

                                    #region rel folioc itemcode
                                    int relFolioCItemCodeID = datosItemCode.RelFCId != "" && datosItemCode.RelFCId != null ? Convert.ToInt32(datosItemCode.RelFCId) : 0;
                                    if (relFolioCItemCodeID > 0)
                                    {
                                        //Actualiza la relacion del ItemCOde
                                        ActualizarRelacionFolioCItemCode(relFolioCItemCodeID, datosItemCode, usuario);
                                    }
                                    else
                                    {
                                        //Inserta un nuevo registro
                                        InsertarRelacionFolioCuantificacion_IC(FolioCuantificacion, datosItemCode, usuario);
                                    }


                                    #endregion

                                    listaNuevosIC.Add(new CuantificacionListado
                                    {
                                        ItemCodeID = datosItemCode.ItemCodeID, //IC.ItemCodeID.ToString(),
                                        TipoMaterial = IC.TipoMaterialID,
                                        ItemCode = datosItemCode.ItemCode, //IC.Codigo,
                                        ItemCodeSteelgo = datosItemCode.ItemCodeSteelgo, //ICS.Codigo,
                                        ItemCodeSteelgoID = datosItemCode.ItemCodeSteelgoID, //ICS.ItemCodeSteelgoID.ToString(),
                                        Descripcion = ICS.DescripcionEspanol,
                                        Peso = ICS.Peso,
                                        Cedula = datosItemCode.Cedula,
                                        D1 = (from rid in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro //ICS.Diametro1,
                                              join d in ctx.Sam3_Diametro on rid.Diametro1ID equals d.DiametroID
                                              where rid.Activo && rid.Rel_ItemCodeSteelgo_Diametro_ID.ToString() == datosItemCode.ItemCodeSteelgoID
                                              select d.Valor).SingleOrDefault(),
                                        D2 = (from rid in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro //ICS.Diametro1,
                                              join d in ctx.Sam3_Diametro on rid.Diametro2ID equals d.DiametroID
                                              where rid.Activo && rid.Rel_ItemCodeSteelgo_Diametro_ID.ToString() == datosItemCode.ItemCodeSteelgoID
                                              select d.Valor).SingleOrDefault(),
                                        Familia = datosItemCode.Familia,
                                        TipoAcero = datosItemCode.TipoAcero,
                                        Cantidad = datosItemCode.Cantidad,//IC.Cantidad,
                                        MM = IC.MM,
                                        Colada = datosItemCode.Colada,
                                        TieneError = TieneErrores,
                                        Estatus = folioCuantificacion.Estatus,
                                        TieneNU = datosItemCode.TieneNU
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

                                    //buscar el itemcode steelgo atravez de su relacion con los diametros
                                    //datosItemCode.ItemCodeSteelgoID = (from ics in ctx.Sam3_ItemCodeSteelgo
                                    //                                   join rid in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro on ics.ItemCodeSteelgoID equals rid.ItemCodeSteelgoID
                                    //                                   where ics.Activo
                                    //                                   && rid.Rel_ItemCodeSteelgo_Diametro_ID.ToString() == datosItemCode.ItemCodeSteelgoID
                                    //                                   select ics.ItemCodeSteelgoID).AsParallel().SingleOrDefault().ToString();

                                    datosItemCode.FamiliaMaterial = (from fa in ctx.Sam3_FamiliaAcero
                                                                     where fa.Nombre == datosItemCode.Familia && fa.Activo
                                                                     select fa.FamiliaAceroID).AsParallel().FirstOrDefault().ToString();

                                    if (datosItemCode.FamiliaMaterial == "0")
                                    {
                                        //valor por default
                                        datosItemCode.FamiliaMaterial = "1";
                                    }

                                    datosItemCode.TipoAceroID = (from fm in ctx.Sam3_FamiliaMaterial
                                                                 where fm.Nombre == datosItemCode.TipoAcero && fm.Activo
                                                                 select fm.FamiliaMaterialID).AsParallel().FirstOrDefault();

                                    datosItemCode.ColadaID = (from c in ctx.Sam3_Colada
                                                              where c.NumeroColada == datosItemCode.Colada && c.Activo
                                                              select c.ColadaID).AsParallel().FirstOrDefault();

                                    //Buscamos el itemcode de acuerdo a la relacion con diametros
                                    int itemCodeID = (from ic in ctx.Sam3_ItemCode
                                                      join rid in ctx.Sam3_Rel_ItemCode_Diametro on ic.ItemCodeID equals rid.ItemCodeID
                                                      where ic.Activo
                                                      && rid.Rel_ItemCode_Diametro_ID.ToString() == datosItemCode.ItemCodeID
                                                      select ic.ItemCodeID).AsParallel().SingleOrDefault();

                                    //Revisar si existe el item code
                                    bool existeICenSam3 = ctx.Sam3_EquivalenciaItemCode
                                       .Where(x => x.Sam3_ItemCodeID == itemCodeID && x.Activo).Any();

                                    if (!existeICenSam3)
                                    {
                                        InsertarItemCodeSam3(datosItemCode, usuario);
                                    }

                                    datosItemCode.TipoMaterial = (from tm in ctx.Sam3_ItemCode
                                                                  where tm.ItemCodeID == itemCodeID && tm.Activo
                                                                  select tm.TipoMaterialID).AsParallel().FirstOrDefault();

                                    datosItemCode.D1 = (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                                        join rid in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro on rics.Rel_ItemCodeSteelgo_Diametro_ID equals rid.Rel_ItemCodeSteelgo_Diametro_ID
                                                        join itcs in ctx.Sam3_ItemCodeSteelgo on rid.ItemCodeSteelgoID equals itcs.ItemCodeSteelgoID
                                                        join d in ctx.Sam3_Diametro on rid.Diametro1ID equals d.DiametroID
                                                        where rics.Activo && rid.Activo && itcs.Activo
                                                        && rid.ItemCodeSteelgoID.ToString() == datosItemCode.ItemCodeSteelgoID
                                                        select d.Valor).AsParallel().SingleOrDefault();

                                    datosItemCode.D2 = (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                                        join rid in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro on rics.Rel_ItemCodeSteelgo_Diametro_ID equals rid.Rel_ItemCodeSteelgo_Diametro_ID
                                                        join itcs in ctx.Sam3_ItemCodeSteelgo on rid.ItemCodeSteelgoID equals itcs.ItemCodeSteelgoID
                                                        join d in ctx.Sam3_Diametro on rid.Diametro2ID equals d.DiametroID
                                                        where rics.Activo && rid.Activo && itcs.Activo
                                                        && rid.ItemCodeSteelgoID.ToString() == datosItemCode.ItemCodeSteelgoID
                                                        select d.Valor).AsParallel().SingleOrDefault();

                                    //si el diametro1 es nulo, es por que el Itemcode no tiene asociado un ItemCode Steelgo. Asi que asignamos los diametros del Itemcode
                                    if (datosItemCode.D1 <= 0)
                                    {
                                        datosItemCode.D1 = (from rid in ctx.Sam3_Rel_ItemCode_Diametro
                                                            join d1 in ctx.Sam3_Diametro on rid.Diametro1ID equals d1.DiametroID
                                                            where rid.Activo && rid.Rel_ItemCode_Diametro_ID.ToString() == datosItemCode.ItemCodeID
                                                            select d1.Valor).AsParallel().SingleOrDefault();
                                    }

                                    //si el diametro2 es nulo, es por que el Itemcode no tiene asociado un ItemCode Steelgo. Asi que asignamos los diametros del Itemcode
                                    if (datosItemCode.D2 <= 0)
                                    {
                                        datosItemCode.D2 = (from rid in ctx.Sam3_Rel_ItemCode_Diametro
                                                            join d2 in ctx.Sam3_Diametro on rid.Diametro1ID equals d2.DiametroID
                                                            where rid.Activo && rid.Rel_ItemCode_Diametro_ID.ToString() == datosItemCode.ItemCodeID
                                                            select d2.Valor).AsParallel().SingleOrDefault();
                                    }

                                    //Si existen ic y ics en la relacion
                                    bool existeRelICS = ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                            .Where(x => x.Rel_ItemCode_Diametro_ID.ToString() == datosItemCode.ItemCodeID
                                                && x.Rel_ItemCodeSteelgo_Diametro_ID.ToString() == datosItemCode.ItemCodeSteelgoID
                                                && x.Activo).Any();

                                    //si ya existe solo ic en la relacion
                                    bool ICexisteEnRel = ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                            .Where(x => x.Rel_ItemCode_Diametro_ID.ToString() == datosItemCode.ItemCodeID && x.Activo).Any();

                                    //Creo relacion ItemCode_ItemCodeSteelgo

                                    //Que no exista el IC en la relacion
                                    if ((!existeRelICS && !ICexisteEnRel) && (datosItemCode.ItemCodeID != null && datosItemCode.ItemCodeSteelgoID != null))
                                    {
                                        InsertarRelacionIC_ICS(datosItemCode, usuario);
                                    }

                                    //Update IC y ICS
                                    if (datosItemCode.ItemCodeID != "" && datosItemCode.ItemCodeID != null)
                                    {
                                        IC = ActualizarItemCode(datosItemCode, IC, usuario);
                                    }

                                    if (datosItemCode.ItemCodeSteelgoID != "" && datosItemCode.ItemCodeSteelgoID != null)
                                    {
                                        ICS = ActualizarItemCodeSteelgo(datosItemCode, ICS, usuario);
                                    }

                                    #region rel bulto itemcode

                                    int relBultoItemCodeID = datosItemCode.RelBID != null && datosItemCode.RelBID != "" ? Convert.ToInt32(datosItemCode.RelBID) : 0;

                                    if (relBultoItemCodeID > 0)
                                    {
                                        //Actualizamos
                                        ActualizaRelacionBultoItemCode(relBultoItemCodeID, datosItemCode, usuario);
                                    }
                                    else
                                    {
                                        //Insertamos nueva relacion
                                        CrearRelacionBulto_IC(datosItemCode, usuario);
                                    }

                                    #endregion

                                    listaNuevosIC.Add(new CuantificacionListado
                                    {
                                        ItemCodeID = datosItemCode.ItemCodeID, //IC.ItemCodeID.ToString(),
                                        TipoMaterial = IC.TipoMaterialID,
                                        ItemCode = datosItemCode.ItemCode, //IC.Codigo,
                                        ItemCodeSteelgo = datosItemCode.ItemCodeSteelgo, //ICS.Codigo,
                                        ItemCodeSteelgoID = datosItemCode.ItemCodeSteelgoID, //ICS.ItemCodeSteelgoID.ToString(),
                                        Descripcion = ICS.DescripcionEspanol,
                                        Peso = ICS.Peso,
                                        Cedula = datosItemCode.Cedula,
                                        D1 = (from rid in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro //ICS.Diametro1,
                                              join d in ctx.Sam3_Diametro on rid.Diametro1ID equals d.DiametroID
                                              where rid.Activo && rid.Rel_ItemCodeSteelgo_Diametro_ID.ToString() == datosItemCode.ItemCodeSteelgoID
                                              select d.Valor).SingleOrDefault(),
                                        D2 = (from rid in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro //ICS.Diametro1,
                                              join d in ctx.Sam3_Diametro on rid.Diametro2ID equals d.DiametroID
                                              where rid.Activo && rid.Rel_ItemCodeSteelgo_Diametro_ID.ToString() == datosItemCode.ItemCodeSteelgoID
                                              select d.Valor).SingleOrDefault(),
                                        Familia = datosItemCode.Familia,
                                        TipoAcero = datosItemCode.TipoAcero,
                                        Cantidad = datosItemCode.Cantidad,//IC.Cantidad,
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
                                    //buscar el itemcode steelgo atravez de su relacion con los diametros
                                    //datosItemCode.ItemCodeSteelgoID = (from ics in ctx.Sam3_ItemCodeSteelgo
                                    //                                   join rid in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro on ics.ItemCodeSteelgoID equals rid.ItemCodeSteelgoID
                                    //                                   where ics.Activo
                                    //                                   && rid.Rel_ItemCodeSteelgo_Diametro_ID.ToString() == datosItemCode.ItemCodeSteelgoID
                                    //                                   select ics.ItemCodeSteelgoID).AsParallel().SingleOrDefault().ToString();

                                    datosItemCode.FamiliaMaterial = (from fa in ctx.Sam3_FamiliaAcero
                                                                     where fa.Nombre == datosItemCode.Familia && fa.Activo
                                                                     select fa.FamiliaAceroID).AsParallel().FirstOrDefault().ToString();

                                    if (datosItemCode.FamiliaMaterial == "0")
                                    {
                                        //valor por default
                                        datosItemCode.FamiliaMaterial = "1";
                                    }

                                    datosItemCode.TipoAceroID = (from fm in ctx.Sam3_FamiliaMaterial
                                                                 where fm.Nombre == datosItemCode.TipoAcero && fm.Activo
                                                                 select fm.FamiliaMaterialID).AsParallel().FirstOrDefault();

                                    datosItemCode.ColadaID = (from c in ctx.Sam3_Colada
                                                              where c.NumeroColada == datosItemCode.Colada && c.Activo
                                                              select c.ColadaID).AsParallel().FirstOrDefault();

                                    //Buscamos el itemcode de acuerdo a la relacion con diametros
                                    int itemCodeID = (from ic in ctx.Sam3_ItemCode
                                                      join rid in ctx.Sam3_Rel_ItemCode_Diametro on ic.ItemCodeID equals rid.ItemCodeID
                                                      where ic.Activo
                                                      && rid.Rel_ItemCode_Diametro_ID.ToString() == datosItemCode.ItemCodeID
                                                      select ic.ItemCodeID).AsParallel().SingleOrDefault();

                                    //Revisar si existe el item code
                                    bool existeICenSam3 = ctx.Sam3_EquivalenciaItemCode
                                       .Where(x => x.Sam3_ItemCodeID == itemCodeID && x.Activo).Any();

                                    if (!existeICenSam3)
                                    {
                                        InsertarItemCodeSam3(datosItemCode, usuario);
                                    }


                                    datosItemCode.TipoMaterial = (from tm in ctx.Sam3_ItemCode
                                                                  where tm.ItemCodeID == itemCodeID && tm.Activo
                                                                  select tm.TipoMaterialID).AsParallel().FirstOrDefault();

                                    datosItemCode.D1 = (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                                        join rid in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro on rics.Rel_ItemCodeSteelgo_Diametro_ID equals rid.Rel_ItemCodeSteelgo_Diametro_ID
                                                        join itcs in ctx.Sam3_ItemCodeSteelgo on rid.ItemCodeSteelgoID equals itcs.ItemCodeSteelgoID
                                                        join d in ctx.Sam3_Diametro on rid.Diametro1ID equals d.DiametroID
                                                        where rics.Activo && rid.Activo && itcs.Activo
                                                        && rid.ItemCodeSteelgoID.ToString() == datosItemCode.ItemCodeSteelgoID
                                                        select d.Valor).AsParallel().SingleOrDefault();

                                    datosItemCode.D2 = (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                                        join rid in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro on rics.Rel_ItemCodeSteelgo_Diametro_ID equals rid.Rel_ItemCodeSteelgo_Diametro_ID
                                                        join itcs in ctx.Sam3_ItemCodeSteelgo on rid.ItemCodeSteelgoID equals itcs.ItemCodeSteelgoID
                                                        join d in ctx.Sam3_Diametro on rid.Diametro2ID equals d.DiametroID
                                                        where rics.Activo && rid.Activo && itcs.Activo
                                                        && rid.ItemCodeSteelgoID.ToString() == datosItemCode.ItemCodeSteelgoID
                                                        select d.Valor).AsParallel().SingleOrDefault();

                                    //si el diametro1 es nulo, es por que el Itemcode no tiene asociado un ItemCode Steelgo. Asi que asignamos los diametros del Itemcode
                                    if (datosItemCode.D1 <= 0)
                                    {
                                        datosItemCode.D1 = (from rid in ctx.Sam3_Rel_ItemCode_Diametro
                                                            join d1 in ctx.Sam3_Diametro on rid.Diametro1ID equals d1.DiametroID
                                                            where rid.Activo && rid.Rel_ItemCode_Diametro_ID.ToString() == datosItemCode.ItemCodeID
                                                            select d1.Valor).AsParallel().SingleOrDefault();
                                    }

                                    //si el diametro2 es nulo, es por que el Itemcode no tiene asociado un ItemCode Steelgo. Asi que asignamos los diametros del Itemcode
                                    if (datosItemCode.D2 <= 0)
                                    {
                                        datosItemCode.D2 = (from rid in ctx.Sam3_Rel_ItemCode_Diametro
                                                            join d2 in ctx.Sam3_Diametro on rid.Diametro1ID equals d2.DiametroID
                                                            where rid.Activo && rid.Rel_ItemCode_Diametro_ID.ToString() == datosItemCode.ItemCodeID
                                                            select d2.Valor).AsParallel().SingleOrDefault();
                                    }

                                    //Si existen ic y ics en la relacion
                                    bool existeRelICS = ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                            .Where(x => x.Rel_ItemCode_Diametro_ID.ToString() == datosItemCode.ItemCodeID
                                                && x.Rel_ItemCodeSteelgo_Diametro_ID.ToString() == datosItemCode.ItemCodeSteelgoID
                                                && x.Activo).Any();

                                    //si ya existe solo ic en la relacion
                                    bool ICexisteEnRel = ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                            .Where(x => x.Rel_ItemCode_Diametro_ID.ToString() == datosItemCode.ItemCodeID && x.Activo).Any();

                                    //Que no exista el IC en la relacion
                                    if ((!existeRelICS && !ICexisteEnRel) && (datosItemCode.ItemCodeID != null && datosItemCode.ItemCodeSteelgoID != null))
                                    {
                                        InsertarRelacionIC_ICS(datosItemCode, usuario);
                                    }
                                    else if (ICexisteEnRel && !existeRelICS)
                                    {
                                        TieneErrores = true;
                                    }

                                    //Update IC y ICS
                                    if (datosItemCode.ItemCodeID != "" && datosItemCode.ItemCodeID != null)
                                    {
                                        IC = ActualizarItemCode(datosItemCode, IC, usuario);
                                    }

                                    if (datosItemCode.ItemCodeSteelgoID != "" && datosItemCode.ItemCodeSteelgoID != null)
                                    {
                                        ICS = ActualizarItemCodeSteelgo(datosItemCode, ICS, usuario);
                                    }

                                    #region rel bulto itemcode
                                    int relBultoItemCodeID = datosItemCode.RelBID != null && datosItemCode.RelBID != "" ? Convert.ToInt32(datosItemCode.RelBID) : 0;

                                    if (relBultoItemCodeID > 0)
                                    {
                                        //Actualizamos
                                        ActualizaRelacionBultoItemCode(relBultoItemCodeID, datosItemCode, usuario);
                                    }
                                    else
                                    {
                                        //Insertamos nueva relacion
                                        CrearRelacionBulto_IC(datosItemCode, usuario);
                                    }
                                    #endregion

                                    listaNuevosIC.Add(new CuantificacionListado
                                    {
                                        ItemCodeID = datosItemCode.ItemCodeID, //IC.ItemCodeID.ToString(),
                                        TipoMaterial = IC.TipoMaterialID,
                                        ItemCode = datosItemCode.ItemCode, //IC.Codigo,
                                        ItemCodeSteelgo = datosItemCode.ItemCodeSteelgo, //ICS.Codigo,
                                        ItemCodeSteelgoID = datosItemCode.ItemCodeSteelgoID, //ICS.ItemCodeSteelgoID.ToString(),
                                        Descripcion = ICS.DescripcionEspanol,
                                        Peso = ICS.Peso,
                                        Cedula = datosItemCode.Cedula,
                                        D1 = (from rid in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro //ICS.Diametro1,
                                              join d in ctx.Sam3_Diametro on rid.Diametro1ID equals d.DiametroID
                                              where rid.Activo && rid.Rel_ItemCodeSteelgo_Diametro_ID.ToString() == datosItemCode.ItemCodeSteelgoID
                                              select d.Valor).SingleOrDefault(),
                                        D2 = (from rid in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro //ICS.Diametro1,
                                              join d in ctx.Sam3_Diametro on rid.Diametro2ID equals d.DiametroID
                                              where rid.Activo && rid.Rel_ItemCodeSteelgo_Diametro_ID.ToString() == datosItemCode.ItemCodeSteelgoID
                                              select d.Valor).SingleOrDefault(),
                                        Familia = datosItemCode.Familia,
                                        TipoAcero = datosItemCode.TipoAcero,
                                        Cantidad = datosItemCode.Cantidad,//IC.Cantidad,
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
                    IC = (from rid in ctx.Sam3_Rel_ItemCode_Diametro
                          join it in ctx.Sam3_ItemCode on rid.ItemCodeID equals it.ItemCodeID
                          where rid.Activo && it.Activo
                          && rid.Rel_ItemCode_Diametro_ID.ToString() == item.ItemCodeID
                          select it).AsParallel().SingleOrDefault();
                    //ctx.Sam3_ItemCode.Where(x => x.ItemCodeID.ToString() == item.ItemCodeID && x.Activo).AsParallel().SingleOrDefault();

                    IC.TipoMaterialID = item.TipoMaterial;
                    IC.Activo = true;
                    IC.UsuarioModificacion = usuario.UsuarioID;
                    IC.FechaModificacion = DateTime.Now;
                    //IC.Cantidad = item.Cantidad;
                    IC.MM = item.MM.ToString() == "N/A" ? null : item.MM;
                    IC.ColadaID = item.ColadaID;
                    //IC.Diametro1 = item.D1;
                    //IC.Diametro2 = item.D2;
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
                //DatabaseManager.Sam2.ItemCode itemS2 = new DatabaseManager.Sam2.ItemCode();
                //using (DatabaseManager.Sam2.Sam2Context ctx2 = new DatabaseManager.Sam2.Sam2Context())
                //{
                //    itemS2 = ctx2.ItemCode.Where(x => x.Codigo == datosItemCode.ItemCode).AsParallel().SingleOrDefault();
                //}

                //using (SamContext ctx = new SamContext())
                //{
                //    Sam3_ItemCode nuevoItem = new Sam3_ItemCode();
                //    nuevoItem.ProyectoID = (from eq in ctx.Sam3_EquivalenciaProyecto
                //                            where eq.Activo && eq.Sam2_ProyectoID == itemS2.ProyectoID
                //                            select eq.Sam3_ProyectoID).AsParallel().SingleOrDefault();
                //    nuevoItem.TipoMaterialID = itemS2.TipoMaterialID;
                //    nuevoItem.Codigo = itemS2.Codigo;
                //    nuevoItem.ItemCodeCliente = itemS2.ItemCodeCliente;
                //    nuevoItem.DescripcionEspanol = itemS2.DescripcionEspanol;
                //    nuevoItem.DescripcionIngles = itemS2.DescripcionIngles;
                //    nuevoItem.DescripcionInterna = itemS2.DescripcionInterna;
                //    //nuevoItem.Diametro1 = itemS2.Diametro1;
                //    //nuevoItem.Diametro2 = itemS2.Diametro2;
                //    nuevoItem.FamiliaAceroID = itemS2.FamiliaAceroID;
                //    nuevoItem.Peso = itemS2.Peso;
                //    nuevoItem.ColadaID = datosItemCode.ColadaID;
                //    nuevoItem.TipoUsoID = Convert.ToInt32(datosItemCode.TipoUsoID) == -1 ? 1 : Convert.ToInt32(datosItemCode.TipoUsoID);
                //    nuevoItem.FamiliaAceroID = Convert.ToInt32(datosItemCode.FamiliaMaterial);
                //    nuevoItem.Activo = true;
                //    nuevoItem.FechaModificacion = DateTime.Now;
                //    nuevoItem.UsuarioModificacion = usuario.UsuarioID;

                //    ctx.Sam3_ItemCode.Add(nuevoItem);
                //    ctx.SaveChanges();

                //    Sam3_EquivalenciaItemCode equivalencia = new Sam3_EquivalenciaItemCode();
                //    equivalencia.Sam2_ItemCodeID = itemS2.ItemCodeID;
                //    equivalencia.Sam3_ItemCodeID = nuevoItem.ItemCodeID;
                //    equivalencia.Activo = true;
                //    equivalencia.FechaModificacion = DateTime.Now;
                //    equivalencia.UsuarioModificacion = usuario.UsuarioID;

                //    ctx.Sam3_EquivalenciaItemCode.Add(equivalencia);
                //    ctx.SaveChanges();

                    //return nuevoItem;
                //}
                throw new Exception("Metodo en des uso GuardarItemCodeBd Linea 1296");
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
                    ICS = (from rid in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro
                           join ics in ctx.Sam3_ItemCodeSteelgo on rid.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                           where rid.Activo && ics.Activo
                           && rid.Rel_ItemCodeSteelgo_Diametro_ID.ToString() == item.ItemCodeSteelgoID
                           select ics).AsParallel().SingleOrDefault();

                    //ctx.Sam3_ItemCodeSteelgo.Where(x => x.ItemCodeSteelgoID.ToString() == item.ItemCodeSteelgoID && x.Activo).AsParallel().SingleOrDefault();
                    string[] splitCedulas;
                    int cedulaID = 0;

                    if (item.Cedula != null && item.Cedula != "")
                    {
                        splitCedulas = item.Cedula.Split('-');
                        var diametro = splitCedulas[0];
                        var cedulaA = splitCedulas[1];
                        var cedulaB = splitCedulas[2];
                        var cedulaC = splitCedulas[3];
                        int diametroID = ctx.Sam3_Diametro.Where(x => x.Valor.ToString() == diametro).Select(x=> x.DiametroID).AsParallel().SingleOrDefault();

                        cedulaID = ctx.Sam3_Cedula.Where(x => x.DiametroID == diametroID &&
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
        /// <param name="IC">CuantificacionListado object</param>
        /// <param name="usuario">usuario actual</param>
        public void InsertarRelacionFolioCuantificacion_IC(int FolioCuantificacion, CuantificacionListado IC, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    //Insertar la Relacion Folio Cuantificacion IC
                    Sam3_Rel_FolioCuantificacion_ItemCode relIC = new Sam3_Rel_FolioCuantificacion_ItemCode();
                    relIC.FolioCuantificacionID = FolioCuantificacion;
                    relIC.Rel_ItemCode_Diametro_ID = Convert.ToInt32(IC.ItemCodeID);
                    relIC.TieneNumerosUnicos = false;
                    relIC.FechaModificacion = DateTime.Now;
                    relIC.UsuarioModificacion = usuario.UsuarioID;
                    relIC.Activo = true;
                    relIC.Cantidad = IC.Cantidad;
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

        public void ActualizarRelacionFolioCItemCode(int relFolioCItemCodeId, CuantificacionListado IC, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    using (var ctx_tran = ctx.Database.BeginTransaction())
                    {
                        Sam3_Rel_FolioCuantificacion_ItemCode registroBd = ctx.Sam3_Rel_FolioCuantificacion_ItemCode
                            .Where(x => x.Rel_FolioCuantificacion_ItemCode_ID == relFolioCItemCodeId).AsParallel().SingleOrDefault();

                        //Supuestamente se puede cambiar el itemcode relacionado en un detalle de FC???
                        registroBd.Rel_ItemCode_Diametro_ID = Convert.ToInt32(IC.ItemCodeID);
                        registroBd.Cantidad = IC.Cantidad;
                        registroBd.FechaModificacion = DateTime.Now;
                        registroBd.UsuarioModificacion = usuario.UsuarioID;

                        ctx.SaveChanges();

                        ctx_tran.Commit();
                    }
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
                    ics.Rel_ItemCode_Diametro_ID = Int32.Parse(item.ItemCodeID);
                    ics.Rel_ItemCodeSteelgo_Diametro_ID = Int32.Parse(item.ItemCodeSteelgoID);
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
                    bic.Rel_ItemCode_Diametro_ID = Int32.Parse(item.ItemCodeID);
                    bic.TieneNumerosUnicos = false;
                    bic.FechaModificacion = DateTime.Now;
                    bic.UsuarioModificacion = usuario.UsuarioID;
                    bic.Activo = true;
                    bic.Cantidad = item.Cantidad;
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

        public void ActualizaRelacionBultoItemCode(int relBultoItemCodeID, CuantificacionListado item, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    using (var ctx_tran = ctx.Database.BeginTransaction())
                    {
                        Sam3_Rel_Bulto_ItemCode registroBd = ctx.Sam3_Rel_Bulto_ItemCode
                            .Where(x => x.Rel_Bulto_ItemCode_ID == relBultoItemCodeID).AsParallel().SingleOrDefault();

                        registroBd.Rel_ItemCode_Diametro_ID = Convert.ToInt32(item.ItemCodeID);
                        registroBd.Cantidad = item.Cantidad;
                        registroBd.FechaModificacion = DateTime.Now;
                        registroBd.UsuarioModificacion = usuario.UsuarioID;

                        ctx.SaveChanges();

                        ctx_tran.Commit();
                    }
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