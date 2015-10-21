using BackEndSAM.Models;
using DatabaseManager.Sam3;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace BackEndSAM.DataAcces
{
    public class ListadoCamposPredeterminadosBd
    {
        private static readonly object _mutex = new object();
        private static ListadoCamposPredeterminadosBd _instance;


        public static ListadoCamposPredeterminadosBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new ListadoCamposPredeterminadosBd();
                    }
                }
                return _instance;
            }
        }



        public object ObtenerListadoCamposPredeterminados(int TipoDato)
        {
            using (SamContext ctx = new SamContext())
            {

                List<ListadoCamposPredeterminados> data = (from LCP in ctx.Sam3_Cat_CamposPredeterminados(TipoDato, null, null, null)
                                                           select new ListadoCamposPredeterminados
                                                           {
                                                               id_CampoPredeterminado = LCP.ID_CampoPredeterminado.ToString(),
                                                               pagina = LCP.Pagina,
                                                               NombreDelCampo = LCP.NombreDelCampo,
                                                               TipoDelCampo = LCP.TipoDelCampo,
                                                               ValorPorDefecto = LCP.ValorPorDefecto

                                                           }).AsParallel().ToList();
                return data;
            }

        }

        public object ActualizaCamposPredeterminados(int TIPO, string ValorPorDefecto, int IdUsuario, int ID)
        {
            using (SamContext ctx = new SamContext())
            {

                var lista = ctx.Sam3_Cat_CamposPredeterminados(TIPO, ValorPorDefecto, IdUsuario, ID);
                return lista;

            }
        }
    }
}