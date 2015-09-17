using BackEndSAM.Models;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces
{
    public class ListadoMaterialesBd
    {
        
        private static readonly object _mutex = new object();
        private static ListadoMaterialesBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private ListadoMaterialesBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static ListadoMaterialesBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new ListadoMaterialesBd();
                    }
                }
                return _instance;
            }
        }

        public object cargarGridListado(int folioCuantificacion)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<ListadoMaterialesPorPL> lista = new List<ListadoMaterialesPorPL>();
                    lista = (from rfc in ctx.Sam3_Rel_FolioCuantificacion_ItemCode
                             join ic in ctx.Sam3_ItemCode on rfc.ItemCodeID equals ic.ItemCodeID
                             join rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on ic.ItemCodeID equals rics.ItemCodeID
                             join ics in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                             join nu in ctx.Sam3_NumeroUnico on ic.ItemCodeID equals nu.ItemCodeID
                             join fa in ctx.Sam3_FamiliaAcero on ics.FamiliaAceroID equals fa.FamiliaAceroID
                             join fm in ctx.Sam3_FamiliaMaterial on fa.FamiliaMaterialID equals fm.FamiliaMaterialID
                             where rfc.FolioCuantificacionID == folioCuantificacion
                             select new ListadoMaterialesPorPL
                             {
                                  NumeroUnico = nu.NumeroUnicoID.ToString(),
                                  ItemCode = ic.Codigo,
                                  Descripcion = ics.DescripcionEspanol,
                                  Cedula = ics.Cedula,
                                  TipoAcero = fm.Nombre,
                                  D1 = ics.Diametro1.ToString(),
                                  D2 = ics.Diametro2.ToString(),
                                  Cantidad = ic.Cantidad.ToString(),
                                  Colada = ic.ColadaID.ToString()
                             }).AsParallel().ToList();

                    return lista;
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