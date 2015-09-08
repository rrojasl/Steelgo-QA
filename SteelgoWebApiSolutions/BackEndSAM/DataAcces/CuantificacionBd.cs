using System;
using System.Collections.Generic;
using System.Linq;
using DatabaseManager.Sam2;
using DatabaseManager.Sam3;
using BackEndSAM.Models;
using SecurityManager.Api.Models;

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

                using (SamContext ctx = new SamContext())
                {
                    //Para cuando no es la pantalla de Bulto
                    if (bultoID == 0)
                    {
                        listado = (from fc in ctx.Sam3_Rel_FolioCuantificacion_ItemCode
                                   join ic in ctx.Sam3_ItemCode on fc.ItemCodeID equals ic.ItemCodeID
                                   join ric in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on ic.ItemCodeID equals ric.ItemCodeID
                                   join ics in ctx.Sam3_ItemCodeSteelgo on ric.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                   where fc.FolioCuantificacionID == folioCuantificacion && ic.Activo && ric.Activo && ics.Activo && fc.Activo
                                   select new CuantificacionListado
                                   {
                                       ItemCode = ctx.Sam3_Rel_Bulto_ItemCode.Where(c => c.ItemCodeID == ic.ItemCodeID).Any() ? "Bulto" : ic.Codigo,
                                       Detallar = ctx.Sam3_Rel_Bulto_ItemCode.Where(c => c.ItemCodeID == ic.ItemCodeID).Any() ? "Si" : "No",
                                       BultoID = ctx.Sam3_Rel_Bulto_ItemCode.Where(c => c.ItemCodeID == ic.ItemCodeID).Any() ? ctx.Sam3_Rel_Bulto_ItemCode.Select(b => b.BultoID.ToString()).FirstOrDefault() : "",
                                       Descripcion = ics.DescripcionEspanol,
                                       D1 = ics.Diametro1,
                                       D2 = ics.Diametro2,
                                       Cantidad = ic.Cantidad,
                                       MM = ic.MM,
                                       ItemCodeSteelgo = ics.Codigo,//ric.ItemCodeSteelgoID.ToString(),

                                       Familia = (from fa in ctx.Sam3_FamiliaAcero
                                                  where fa.FamiliaAceroID == ics.FamiliaAceroID
                                                  select fa.Nombre).FirstOrDefault(),

                                       Cedula = ics.Cedula,

                                       Colada = (from c in ctx.Sam3_Colada
                                                 where c.ColadaID == ic.ColadaID
                                                 select c.NumeroColada).FirstOrDefault(),

                                       TipoAcero = (from fa in ctx.Sam3_FamiliaAcero
                                                    where fa.FamiliaAceroID == ics.FamiliaAceroID
                                                    join fm in ctx.Sam3_FamiliaMaterial on fa.FamiliaMaterialID equals fm.FamiliaMaterialID
                                                    select fm.Nombre).FirstOrDefault(),

                                       TieneNU = ctx.Sam3_NumeroUnico.Count(n => n.ItemCodeID == ic.ItemCodeID) == ic.Cantidad ? "Si" : ctx.Sam3_NumeroUnico.Count(n => n.ItemCodeID == ic.ItemCodeID) == 0 ? "No" : "Parcial"
                                   }).AsParallel().ToList();
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
                                                  where fa.FamiliaAceroID == ics.FamiliaAceroID
                                                  select fa.Nombre).FirstOrDefault(),

                                       Cedula = ics.Cedula,

                                       Colada = (from c in ctx.Sam3_Colada
                                                 where c.ColadaID == ic.ColadaID
                                                 select c.NumeroColada).FirstOrDefault(),

                                       TipoAcero = (from fa in ctx.Sam3_FamiliaAcero
                                                    where fa.FamiliaAceroID == ics.FamiliaAceroID
                                                    join fm in ctx.Sam3_FamiliaMaterial on fa.FamiliaMaterialID equals fm.FamiliaMaterialID
                                                    select fm.Nombre).FirstOrDefault(),

                                       TieneNU = ctx.Sam3_NumeroUnico.Count(n => n.ItemCodeID == ic.ItemCodeID) == ic.Cantidad ? "Si" : ctx.Sam3_NumeroUnico.Count(n => n.ItemCodeID == ic.ItemCodeID) == 0 ? "No" : "Parcial"
                                   }).AsParallel().ToList();
                    }
                }
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