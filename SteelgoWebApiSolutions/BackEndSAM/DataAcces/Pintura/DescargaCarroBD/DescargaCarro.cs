using BackEndSAM.Models.Pintura.DescargaCarro;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.Pintura.DescargaCarroBD
{
    public class DescargaCarroBD
    {
        private static readonly object _mutex = new Object();
        private static DescargaCarroBD _instance;

        public static DescargaCarroBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {

                        _instance = new DescargaCarroBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtieneDetalle(int carroID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Pintura_DescargaCarro_DetalleCarro> result = ctx.Sam3_Pintura_DescargaCarro_DetalleCarro(carroID).ToList();

                    List<DetalleCarro> ListadoDetalleSpool = new List<DetalleCarro>();

                    foreach (Sam3_Pintura_DescargaCarro_DetalleCarro item in result)
                    {
                        ListadoDetalleSpool.Add(new DetalleCarro
                        {
                            Color=item.Color,
                            CuadranteID=item.CuadranteID,
                            M2=item.Area,
                            NombreCuadrante=item.NombreCuadrante,
                            NombreSpool=item.NombreSpool,
                            SistemaPintura=item.SistemaPintura
                        });
                    }
                    return ListadoDetalleSpool;
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