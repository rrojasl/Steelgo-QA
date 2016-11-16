using BackEndSAM.Models.Sam3General.Cuadrante;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.Sam3General.Cuadrante
{
    public class CuadranteBD
    {
        private static readonly object _mutex = new object();
        private static CuadranteBD _instance;

        public static CuadranteBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new CuadranteBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerCuadrante(int ZonaID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Steelgo_Get_Cuadrante_Result> result = ctx.Sam3_Steelgo_Get_Cuadrante(ZonaID).ToList();
                    List<UbicacionCuadrante> list = new List<UbicacionCuadrante>();
                    list.Add(new UbicacionCuadrante());

                    foreach (Sam3_Steelgo_Get_Cuadrante_Result item in result)
                    {
                        list.Add(new UbicacionCuadrante {
                            CuadranteID = item.CuadranteID,
                            Nombre = item.Nombre,
                            ZonaID = item.ZonaID.GetValueOrDefault()
                        });
                    }
                    return list;

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