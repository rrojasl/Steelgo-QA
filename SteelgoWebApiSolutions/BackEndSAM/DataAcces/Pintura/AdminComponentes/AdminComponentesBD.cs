using BackEndSAM.Models.Pintura.AdminComponentes;
using BackEndSAM.Models.Pintura.SistemaPintura;
using DatabaseManager.Constantes;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data;
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

        public object ObtenerDetalleGrid(string lenguaje)
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
                            Accion = 2,
                            AdminComponentesID = item.AdminComponentesID
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
                    List<Sam3_Pintura_Get_ComponentesAdministrados_Result> listaComponentes = ctx.Sam3_Pintura_Get_ComponentesAdministrados(lenguaje).ToList();

                    List<Componentes> listaComponentesRender = new List<Componentes>();
                    if (listaComponentes.Count > 0)
                        listaComponentesRender.Add(new Componentes());

                    foreach (Sam3_Pintura_Get_ComponentesAdministrados_Result item in listaComponentes)
                    {
                        Componentes componentes = new Componentes
                        {
                            Componente = item.Componente,
                            ComponenteID = item.ComponenteID,
                            Unidad = item.Unidad
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

        public object Guardar(DataTable dtDetalle, Sam3_Usuario usuario, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = { { "@Usuario", usuario.UsuarioID.ToString() }, { "@Lenguaje", lenguaje } };
                    _SQL.Ejecuta(Stords.GUARDARADMINISTRACIONCOMPONENTES, dtDetalle, "@TablaAdminComponentes", parametro);

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("Ok");
                    result.ReturnCode = 200;
                    result.ReturnStatus = true;
                    result.IsAuthenicated = true;

                    return result;
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

        public object ObtenerCatalogoComponentesAgregados(int SistemaPinturaProyectoProcesoID, string lenguaje, List<Componentes> listadoComponentes,bool asignadoSpool)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    List<Sam3_Pintura_Get_ComponentesAgregados_Result> listaComponentes = ctx.Sam3_Pintura_Get_ComponentesAgregados(lenguaje, SistemaPinturaProyectoProcesoID).ToList();

                    List<ComponenteAgregado> listaComponentesAgregados = new List<ComponenteAgregado>();


                    foreach (Sam3_Pintura_Get_ComponentesAgregados_Result item in listaComponentes)
                    {
                        ComponenteAgregado componentesAgregados = new ComponenteAgregado
                        {
                            Accion = asignadoSpool?2:1,
                            ComponenteAgregadoID = item.ComponenteAgregadoID,
                            ComponenteID = item.ComponenteID,
                            Nombre = item.Nombre,
                            ListadoComponentes = listadoComponentes
                        };

                        listaComponentesAgregados.Add(componentesAgregados);
                    };
                    
                    return listaComponentesAgregados;
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