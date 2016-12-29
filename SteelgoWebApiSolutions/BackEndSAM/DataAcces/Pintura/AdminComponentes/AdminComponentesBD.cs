using BackEndSAM.Models.Pintura.AdminComponentes;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.Pintura.AdminComponentes
{
    public class AdminComponentesBD
    {

        private static readonly object _mutex = new object();

        private static AdminComponentesBD _instance;

        public static AdminComponentesBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new AdminComponentesBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerDetalleGrid( string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Pintura_AdminComponentes_Get_Detalle_Result> lista = ctx.Sam3_Pintura_AdminComponentes_Get_Detalle(lenguaje).ToList();
                    List<DetalleGrid> detalleGrid = new List<DetalleGrid>();
                    foreach (Sam3_Pintura_AdminComponentes_Get_Detalle_Result item in lista)
                    {
                        DetalleGrid detalle = new DetalleGrid
                        {
                            Cantidad = item.Cantidad,
                            Componente = item.Componente,
                            ComponenteID = item.ComponenteID,
                            Lote = item.Lote,
                            RowOk = false,
                            Unidad = item.Unidad,
                            Accion=2
                        };
                        detalleGrid.Add(detalle);
                    }


                    return detalleGrid;
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

        public object ObtenerCatalogoComponentes(string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Pintura_Get_Componentes_Result> listaComponentes = ctx.Sam3_Pintura_Get_Componentes(lenguaje).ToList();

                    List<Componentes> listaComponentesRender = new List<Componentes>();
                    if (listaComponentes.Count > 0)
                        listaComponentesRender.Add(new Componentes());

                    foreach (Sam3_Pintura_Get_Componentes_Result item in listaComponentes)
                    {
                        Componentes componentes = new Componentes
                        {
                            Componente = item.Componente,
                            ComponenteID = item.ComponenteID,
                            Unidad=item.Unidad
                        };
                        listaComponentesRender.Add(componentes);
                    }
                    return listaComponentesRender;
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