using BackEndSAM.Models;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
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
            try
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

        public object ActualizaCamposPredeterminados(int TIPO, string ValorPorDefecto, int IdUsuario, int ID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    var lista = ctx.Sam3_Cat_CamposPredeterminados(TIPO, ValorPorDefecto, IdUsuario, ID);
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
        /// <summary>
        /// Retorna el valor del campo predeterminado tomando en consideración el identificador del mismo y el lenguaje
        /// </summary>
        /// <param name="lenguaje">lenguaje en que se retorna</param>
        /// <param name="id">identificador del Campo predeterminado</param>
        /// <returns></returns>
        public object ObtenerValorCampoPredeterminado(string lenguaje, int id)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    var oMyString = new ObjectParameter("Retorna", typeof(string));
                    var result = ctx.Sam3_Steelgo_Get_CampoPredeterminado(id, lenguaje, oMyString);
                    var data = oMyString.Value.ToString();

                    return data;
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