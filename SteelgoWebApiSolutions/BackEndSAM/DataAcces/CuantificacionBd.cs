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
        /// Obtener la informacion que tendra el grid de Cuantificacion
        /// </summary>
        /// <param name="avisoEntrada">folio de aviso de entrada</param>
        /// <param name="folioCuantificacion">folio cuantificacion</param>
        /// <returns></returns>
        public object gridCuantificacionInfo(int avisoEntrada, int folioCuantificacion, int esBulto)
        {
            try
            {
                List<ListadoCuantificacion> listado = new List<ListadoCuantificacion>();

                using (SamContext ctx = new SamContext())
                {
                    listado = (from fc in ctx.Sam3_Rel_FolioCuantificacion_ItemCode
                               where fc.FolioCuantificacionID == folioCuantificacion
                               join ic in ctx.Sam3_ItemCode on fc.ItemCodeID equals ic.ItemCodeID
                               join ric in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on ic.ItemCodeID equals ric.ItemCodeID
                               join ics in ctx.Sam3_ItemCodeSteelgo on ric.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                               join fa in ctx.Sam3_FamiliaAcero on ics.FamiliaAceroID equals fa.FamiliaAceroID
                               select new ListadoCuantificacion
                               {
                                   ItemCode = ic.ItemCodeID.ToString(),
                                   Descripcion = ic.DescripcionEspanol,
                                   D1 = ic.Diametro1,
                                   D2 = ic.Diametro2,
                                   ColadaID = 1,//ic.ColadaID,
                                   Cantidad = ic.Cantidad,
                                   MM = ic.MM,
                                   ItemCodeSteelgo = ric.ItemCodeSteelgoID.ToString(),
                                   FamiliaID = ics.FamiliaAceroID,
                                   Familia = fa.Nombre,
                                   FamiliaMaterialID = fa.FamiliaMaterialID,
                                   Cedula = ics.Cedula
                               }).AsParallel().ToList();

                    foreach (var item in listado)
                    {
                        if(ctx.Sam3_Rel_Bulto_ItemCode.Where(c=> c.ItemCodeID.ToString() == item.ItemCode).Any())
                        {
                            item.ItemCode = "Bulto";
                            item.Detallar = true;
                        }

                        item.Colada = (from c in ctx.Sam3_Colada
                                       where c.ColadaID == item.ColadaID
                                       select c.NumeroColada
                                           ).AsParallel().FirstOrDefault();

                        item.TipoAcero = (from fm in ctx.Sam3_FamiliaMaterial
                                          where fm.FamiliaMaterialID == item.FamiliaMaterialID
                                          select fm.Nombre).AsParallel().FirstOrDefault();
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