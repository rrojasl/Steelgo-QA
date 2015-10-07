using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DatabaseManager.Sam3;
using DatabaseManager.EntidadesPersonalizadas;
using BackEndSAM.Utilities;
using System.Web.Script.Serialization;
using BackEndSAM.Models;
using SecurityManager.Api.Models;

namespace BackEndSAM.DataAcces
{
    public class ItemCodeSteelgoBd
    {
        private static readonly object _mutex = new object();
        private static ItemCodeSteelgoBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private ItemCodeSteelgoBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static ItemCodeSteelgoBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new ItemCodeSteelgoBd();
                    }
                }
                return _instance;
            }
        }

        /// <summary>
        /// Obtener los item code steelgo para el grid de materiales en cuantificacion
        /// </summary>
        /// <returns>Lista de ICS</returns>
        public object ObtenerListadoItemCodeSteelgo()
        {
            try
            {
                //List<ListaCombos> ics = new List<ListaCombos>();
                using (SamContext ctx = new SamContext())
                {
                    //ics.Add(new ListaCombos { id = "0", value = "Agregar Nuevo" });
                    List<ListaCombos> listado = (from r in ctx.Sam3_ItemCodeSteelgo
                                                 where r.Activo
                                                 select new ListaCombos
                                                 {
                                                     id = r.ItemCodeSteelgoID.ToString(),
                                                     value = r.Codigo
                                                 }).AsParallel().ToList();
                    //ics.AddRange(listado);
                    return listado;

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
        /// Obtener la relacion de un itemcode con un steelgo
        /// </summary>
        /// <returns>Lista de ICS</returns>
        public object ObtenerListadoRelacionItemCodeSteelgo(string itemcode)
        {
            try
            {
                //List<ListaCombos> ics = new List<ListaCombos>();
                using (SamContext ctx = new SamContext())
                {
                    //ics.Add(new ListaCombos { id = "0", value = "Agregar Nuevo" });
                    List<ListaCombos> listado = (from r in ctx.Sam3_ItemCodeSteelgo
                                                 join rel in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on r.ItemCodeSteelgoID equals rel.ItemCodeSteelgoID
                                                 join item in ctx.Sam3_ItemCode on rel.ItemCodeID equals item.ItemCodeID
                                                 where r.Activo && rel.Activo && item.Activo && item.Codigo==itemcode
                                                 select new ListaCombos
                                                 {
                                                     id = r.ItemCodeSteelgoID.ToString(),
                                                     value = r.Codigo
                                                 }).AsParallel().ToList();



                    if (listado.Count <= 0)
                    {

                        listado = (from r in ctx.Sam3_ItemCodeSteelgo
                                   where r.Activo
                                   select new ListaCombos
                                   {
                                       id = r.ItemCodeSteelgoID.ToString(),
                                       value = r.Codigo
                                   }).AsParallel().ToList();
                    }

                    //ics.AddRange(listado);
                    return listado;

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
        /// Obtener el detalle de un item code steelgo
        /// </summary>
        /// <param name="itemCodeSteelgoID">item code steelgo seleccionado</param>
        /// <param name="usuario">usuario actual</param>
        /// <returns>objeto con la informacion del item code steelgo</returns>
        public object ObtenerDetalleitemCodeSteelgo(string itemCodeSteelgo, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ItemCodeSteelgoJson detalle = (from r in ctx.Sam3_ItemCodeSteelgo
                                                   join c in ctx.Sam3_Cedula on r.CedulaID equals c.CedulaID
                                                   where r.Activo && r.Codigo ==itemCodeSteelgo && c.Activo
                                                   select new ItemCodeSteelgoJson
                                                   {
                                                       Area = r.Area,
                                                       Cedula = c.Diametro + "-" + c.CedulaA + "-" + c.CedulaB + "-" + c.CedulaC,
                                                       DescripcionEspanol = r.DescripcionEspanol,
                                                       DescripcionIngles = r.DescripcionIngles,
                                                       Diametro1 = r.Diametro1,
                                                       Diametro2 = r.Diametro2,
                                                       Familia = (from fa in ctx.Sam3_FamiliaAcero
                                                                  where fa.FamiliaAceroID == r.FamiliaAceroID && fa.Activo && r.Activo
                                                                  select fa.Nombre).FirstOrDefault(),
                                                       ItemCodeSteelgoID = r.ItemCodeSteelgoID,
                                                       Peso = r.Peso,
                                                       Codigo = r.Codigo,
                                                       TipoAcero = (from fa in ctx.Sam3_FamiliaAcero
                                                                    join fm in ctx.Sam3_FamiliaMaterial on fa.FamiliaMaterialID equals fm.FamiliaMaterialID
                                                                    where fa.FamiliaAceroID == r.FamiliaAceroID && fa.Activo && fm.Activo
                                                                    select fm.Nombre).FirstOrDefault(),
                                                   }).AsParallel().SingleOrDefault();
                    return detalle;
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
        /// Obtener el detalle de un item code steelgo
        /// </summary>
        /// <param name="itemCodeSteelgoID">item code steelgo seleccionado</param>
        /// <param name="usuario">usuario actual</param>
        /// <returns>objeto con la informacion del item code steelgo</returns>
        public object ObtenerDetalleRelacionitemCodeSteelgo(string ItemCode, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_ItemCode item = ctx.Sam3_ItemCode.Where(x => x.Codigo == ItemCode && x.Activo).FirstOrDefault();


                    ItemCodeSteelgoJson detalle = (from r in ctx.Sam3_ItemCodeSteelgo
                                                   join ris in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on r.ItemCodeSteelgoID equals ris.ItemCodeSteelgoID
                                                   join ic in ctx.Sam3_ItemCode on ris.ItemCodeID equals ic.ItemCodeID
                                                   join c in ctx.Sam3_Cedula on r.CedulaID equals c.CedulaID
                                                   where r.Activo && ris.ItemCodeID == item.ItemCodeID && c.Activo
                                                   select new ItemCodeSteelgoJson
                                                   {
                                                       Area = r.Area,
                                                       Cedula = c.CedulaA,
                                                       DescripcionEspanol = r.DescripcionEspanol,
                                                       DescripcionIngles = r.DescripcionIngles,
                                                       Diametro1 = r.Diametro1,
                                                       Diametro2 = r.Diametro2,
                                                       Familia = (from fa in ctx.Sam3_FamiliaAcero
                                                                  where fa.FamiliaAceroID == r.FamiliaAceroID && fa.Activo && r.Activo
                                                                  select fa.Nombre).FirstOrDefault(),
                                                       ItemCodeSteelgoID = r.ItemCodeSteelgoID,
                                                       Peso = r.Peso,
                                                       Codigo = r.Codigo,
                                                       TipoAcero = (from fa in ctx.Sam3_FamiliaAcero
                                                                    join fm in ctx.Sam3_FamiliaMaterial on fa.FamiliaMaterialID equals fm.FamiliaMaterialID
                                                                    where fa.FamiliaAceroID == r.FamiliaAceroID && fa.Activo && fm.Activo
                                                                    select fm.Nombre).FirstOrDefault(),
                                                       Cantidad = ic.Cantidad,
                                                       ColadaNombre = (from co in ctx.Sam3_Colada where co.ColadaID == ic.ColadaID && co.Activo select co.NumeroColada).FirstOrDefault()
                                                   }).AsParallel().SingleOrDefault();

                    if (detalle != null)
                    {
                        return detalle;

                    }
                    else {
                        ItemCodeSteelgoJson detalleItem = (from ic in ctx.Sam3_ItemCode
                                                           where ic.ItemCodeID == item.ItemCodeID
                                                           select new ItemCodeSteelgoJson
                                                           {
                                                               Cantidad = ic.Cantidad,
                                                               ColadaNombre = (from c in ctx.Sam3_Colada where c.ColadaID == ic.ColadaID && c.Activo select c.NumeroColada).FirstOrDefault()
                                                           }).AsParallel().SingleOrDefault();
                        return detalleItem;
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

        public object InsertarRelacionItemCodes(List<AsociacionItemCodeSteelgo> asociaciones, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_Rel_ItemCode_ItemCodeSteelgo nuevoRegistro;
                    foreach (AsociacionItemCodeSteelgo asc in asociaciones)
                    {
                        foreach (int i in asc.Itemcodes)
                        {
                            nuevoRegistro = new Sam3_Rel_ItemCode_ItemCodeSteelgo();
                            nuevoRegistro.Activo = true;
                            nuevoRegistro.FechaModificacion = DateTime.Now;
                            nuevoRegistro.ItemCodeID = i;
                            nuevoRegistro.ItemCodeSteelgoID = asc.ItemCodeSteelgo;
                            nuevoRegistro.UsuarioModificacion = usuario.UsuarioID;

                            ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo.Add(nuevoRegistro);
                        }

                    }
                    ctx.SaveChanges();

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("Ok");
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

        public object InsertarItemCodeSteelgo(ItemCodeSteelgoJson json, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_ItemCodeSteelgo nuevoItem = new Sam3_ItemCodeSteelgo();
                    nuevoItem.Activo = true;
                    nuevoItem.Area = json.Area;
                    nuevoItem.CedulaID = json.CedulaID;
                    nuevoItem.DescripcionEspanol = json.DescripcionEspanol;
                    nuevoItem.DescripcionIngles = json.DescripcionIngles;
                    nuevoItem.Diametro1 = json.Diametro1;
                    nuevoItem.Diametro2 = json.Diametro2;
                    nuevoItem.FamiliaAceroID = json.FamiliaAceroID;
                    nuevoItem.FechaModificacion = DateTime.Now;
                    nuevoItem.Peso = json.Peso;
                    nuevoItem.UsuarioModificacion = usuario.UsuarioID;
                    nuevoItem.Codigo = json.Codigo;

                    ctx.Sam3_ItemCodeSteelgo.Add(nuevoItem);

                    ctx.SaveChanges();

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add(nuevoItem.ItemCodeSteelgoID.ToString());
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

        public object ActualizarItemCodeSteelgo(ItemCodeSteelgoJson json, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_ItemCodeSteelgo itemBd = ctx.Sam3_ItemCodeSteelgo.Where(x => x.ItemCodeSteelgoID == json.ItemCodeSteelgoID)
                        .AsParallel().SingleOrDefault();

                    itemBd.Area = json.Area;
                    itemBd.CedulaID = json.CedulaID;
                    itemBd.DescripcionEspanol = json.DescripcionEspanol;
                    itemBd.DescripcionIngles = json.DescripcionIngles;
                    itemBd.Diametro1 = json.Diametro1;
                    itemBd.Diametro2 = json.Diametro2;
                    itemBd.FamiliaAceroID = json.FamiliaAceroID;
                    itemBd.FechaModificacion = DateTime.Now;
                    itemBd.Peso = json.Peso;
                    itemBd.UsuarioModificacion = usuario.UsuarioID;
                    itemBd.Codigo = json.Codigo;

                    ctx.SaveChanges();

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("Ok");
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

        public object EliminarItemCodeSteelgo(int itemCodeSteelgoID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_ItemCodeSteelgo itemBd = ctx.Sam3_ItemCodeSteelgo.Where(x => x.ItemCodeSteelgoID == itemCodeSteelgoID)
                        .AsParallel().SingleOrDefault();

                    itemBd.Activo = false;
                    itemBd.FechaModificacion = DateTime.Now;
                    itemBd.UsuarioModificacion = usuario.UsuarioID;

                    ctx.SaveChanges();

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("Ok");
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