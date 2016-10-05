using BackEndSAM.Models.ServiciosTecnicos.OKPND;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.ServiciosTecnicos.OKPND
{
    public class OKPNDBD
    {
        private static readonly object _mutex = new object();
        private static OKPNDBD _instance;

        public static OKPNDBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new OKPNDBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerListadoElementos(string lenguaje, int ProyectoID, int Muestra)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Elementos> listaElementos = new List<Elementos>();
                    List<Sam3_ST_OKPND_Get_Elementos_Result> listaElementosCTX = ctx.Sam3_ST_OKPND_Get_Elementos(lenguaje, ProyectoID, Muestra).ToList();

                    foreach (Sam3_ST_OKPND_Get_Elementos_Result item in listaElementosCTX)
                    {
                        listaElementos.Add(new Elementos
                        {
                            NumeroControl = item.NumeroControl,
                            Cuadrante = item.Cuadrante,
                            Prioridad = item.Prioridad.GetValueOrDefault(),
                            Estatus = item.Estatus,

                            ProyectoID = item.ProyectoID,
                            SpoolID = item.SpoolID,
                            OrdenTrabajoSpoolID = item.OrdenTrabajoSpoolID,
                            OkPND = 0,
                            TemplateMensajeTrabajosAdicionales = "Ver detalle"
                        });
                    }

                    return listaElementos;
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