using System;
using System.Collections.Generic;
using System.Linq;
using DatabaseManager.Sam2;
using DatabaseManager.Sam3;
using BackEndSAM.Models;
using SecurityManager.Api.Models;
using System.Web.Script.Serialization;

namespace BackEndSAM.DataAcces
{
    public class CuantificacionBd
    {
        private static readonly object _mutex = new object();
        private static CuantificacionBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private CuantificacionBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static CuantificacionBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new CuantificacionBd();
                    }
                }
                return _instance;
            }
        }

        /// <summary>
        /// Obtener la informacion del grid de Cuantificacion
        /// </summary>
        /// <param name="avisoEntrada">folio de aviso de entrada</param>
        /// <param name="folioCuantificacion">folio cuantificacion</param>
        /// <param name="bultoID">id del bulto</param>
        /// <returns>informacion</returns>
        public object gridCuantificacionInfo(int folioCuantificacion, int bultoID = 0)
        {
            try
            {
                List<CuantificacionListado> listado = new List<CuantificacionListado>();
                List<CuantificacionListado> listadoBultos = new List<CuantificacionListado>();

                using (SamContext ctx = new SamContext())
                {
                    //Para cuando no es la pantalla de Bulto
                    if (bultoID == 0)
                    {
                    listado = (from fc in ctx.Sam3_Rel_FolioCuantificacion_ItemCode
                               join ic in ctx.Sam3_ItemCode on fc.ItemCodeID equals ic.ItemCodeID
                               //join ric in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on ic.ItemCodeID equals ric.ItemCodeID
                               //join ics in ctx.Sam3_ItemCodeSteelgo on ric.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                               where fc.FolioCuantificacionID == folioCuantificacion && ic.Activo && fc.Activo//&& ric.Activo && ics.Activo
                               select new CuantificacionListado
                               {
                                   ItemCode = ctx.Sam3_Rel_Bulto_ItemCode.Where(c => c.ItemCodeID == ic.ItemCodeID && c.Activo && ic.Activo).Any() ? "Bulto" : ic.Codigo,

                                   Detallar = ctx.Sam3_Rel_Bulto_ItemCode.Where(c => c.ItemCodeID == ic.ItemCodeID && c.Activo && ic.Activo).Any() ? "Si" : "No",

                                   BultoID = ctx.Sam3_Rel_Bulto_ItemCode.Where(c => c.ItemCodeID == ic.ItemCodeID && c.Activo && ic.Activo).Any() ?
                                    ctx.Sam3_Rel_Bulto_ItemCode.Select(b => b.BultoID.ToString()).FirstOrDefault() : "",

                                   Descripcion = (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                                  join ics in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                                  join it in ctx.Sam3_ItemCode on rics.ItemCodeID equals it.ItemCodeID
                                                  where rics.Activo && ics.Activo && it.Activo
                                                  && rics.ItemCodeID == ic.ItemCodeID
                                                  select ics.DescripcionEspanol).FirstOrDefault(),

                                   D1 = (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                         join ics in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                         join it in ctx.Sam3_ItemCode on rics.ItemCodeID equals it.ItemCodeID
                                         where rics.Activo && ics.Activo && it.Activo
                                         && rics.ItemCodeID == ic.ItemCodeID
                                         select ics.Diametro1).FirstOrDefault(),

                                   D2 = (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                         join ics in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                         join it in ctx.Sam3_ItemCode on rics.ItemCodeID equals it.ItemCodeID
                                         where rics.Activo && ics.Activo && it.Activo
                                         && rics.ItemCodeID == ic.ItemCodeID
                                         select ics.Diametro2).FirstOrDefault(),
                                   Cantidad = ic.Cantidad,
                                   MM = ic.MM,

                                   ItemCodeSteelgo = (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                                      join ics in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                                      join it in ctx.Sam3_ItemCode on rics.ItemCodeID equals it.ItemCodeID
                                                      where rics.Activo && ics.Activo && it.Activo
                                                      && rics.ItemCodeID == ic.ItemCodeID
                                                      select ics.Codigo).FirstOrDefault(),

                                   Familia = (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                              join ics in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                              join it in ctx.Sam3_ItemCode on rics.ItemCodeID equals it.ItemCodeID
                                              join fa in ctx.Sam3_FamiliaAcero on ics.FamiliaAceroID equals fa.FamiliaAceroID
                                              where rics.Activo && ics.Activo && it.Activo
                                              && rics.ItemCodeID == ic.ItemCodeID
                                              select fa.Nombre).FirstOrDefault(),

                                   Cedula = (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                             join ics in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                             join it in ctx.Sam3_ItemCode on rics.ItemCodeID equals it.ItemCodeID
                                             where rics.Activo && ics.Activo && it.Activo
                                             && rics.ItemCodeID == ic.ItemCodeID
                                             select ics.Cedula).FirstOrDefault(),

                                   Colada = (from c in ctx.Sam3_Colada
                                             where c.ColadaID == ic.ColadaID && c.Activo && ic.Activo
                                             select c.NumeroColada).FirstOrDefault(),

                                   TipoAcero = (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                                join ics in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                                join it in ctx.Sam3_ItemCode on rics.ItemCodeID equals it.ItemCodeID
                                                join fa in ctx.Sam3_FamiliaAcero on ics.FamiliaAceroID equals fa.FamiliaAceroID
                                                join fm in ctx.Sam3_FamiliaMaterial on fa.FamiliaMaterialID equals fm.FamiliaMaterialID
                                                where rics.Activo && ics.Activo && it.Activo
                                                && rics.ItemCodeID == ic.ItemCodeID
                                                select fm.Nombre).FirstOrDefault(),

                                   TieneNU = ctx.Sam3_NumeroUnico.Count(n => n.ItemCodeID == ic.ItemCodeID && n.Activo && ic.Activo) == ic.Cantidad ? "Si" :
                                    ctx.Sam3_NumeroUnico.Count(n => n.ItemCodeID == ic.ItemCodeID && n.Activo && ic.Activo) == 0 ? "No" : "Parcial"

                               }).AsParallel().ToList();

                    listadoBultos = (from b in ctx.Sam3_Bulto
                                     where b.FolioCuantificacionID == folioCuantificacion && b.Activo
                                     select new CuantificacionListado
                                     {
                                         ItemCode = "Bulto",
                                         Detallar = "Si",
                                         Cantidad = 1,
                                         BultoID = b.BultoID.ToString()
                                     }).AsParallel().ToList();

                    listado.AddRange(listadoBultos);

                    }
                    else //Cuando es la pantalla de Bulto
                    {
                        listado = (from rbic in ctx.Sam3_Rel_Bulto_ItemCode
                                   join ic in ctx.Sam3_ItemCode on rbic.ItemCodeID equals ic.ItemCodeID
                                   join rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on ic.ItemCodeID equals rics.ItemCodeID
                                   join ics in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                   where rbic.BultoID == bultoID && ic.Activo && rics.Activo && ics.Activo && rbic.Activo
                                   select new CuantificacionListado
                                   {
                                       ItemCode = ic.ItemCodeID.ToString(),
                                       Detallar = "No",
                                       BultoID = rbic.BultoID.ToString(),
                                       Descripcion = ics.DescripcionEspanol,
                                       D1 = ics.Diametro1,
                                       D2 = ics.Diametro2,
                                       Cantidad = ic.Cantidad,
                                       MM = ic.MM,
                                       ItemCodeSteelgo = ics.Codigo,//ric.ItemCodeSteelgoID.ToString(),

                                       Familia = (from fa in ctx.Sam3_FamiliaAcero
                                                  where fa.FamiliaAceroID == ics.FamiliaAceroID && fa.Activo && ics.Activo
                                                  select fa.Nombre).FirstOrDefault(),

                                       Cedula = ics.Cedula,

                                       Colada = (from c in ctx.Sam3_Colada
                                                 where c.ColadaID == ic.ColadaID && c.Activo && ic.Activo
                                                 select c.NumeroColada).FirstOrDefault(),

                                       TipoAcero = (from fa in ctx.Sam3_FamiliaAcero
                                                    join fm in ctx.Sam3_FamiliaMaterial on fa.FamiliaMaterialID equals fm.FamiliaMaterialID
                                                    where fa.FamiliaAceroID == ics.FamiliaAceroID && fa.Activo && fm.Activo
                                                    select fm.Nombre).FirstOrDefault(),

                                       TieneNU = ctx.Sam3_NumeroUnico.Count(n => n.ItemCodeID == ic.ItemCodeID && n.Activo && ic.Activo) == ic.Cantidad ? "Si" : ctx.Sam3_NumeroUnico.Count(n => n.ItemCodeID == ic.ItemCodeID && n.Activo && ic.Activo) == 0 ? "No" : "Parcial"
                                   }).AsParallel().ToList();
                    }
                }

#if DEBUG
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                string json = serializer.Serialize(listado);
#endif

                return listado;
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