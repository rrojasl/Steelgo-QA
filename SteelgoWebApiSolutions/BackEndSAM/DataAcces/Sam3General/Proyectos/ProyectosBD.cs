using BackEndSAM.Models.Sam3General;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BackEndSAM.DataAcces.Sam3General.Proyectos
{
    public class ProyectosBD
    {
        private static readonly object _mutex = new object();
        private static ProyectosBD _instance;

        public static ProyectosBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new ProyectosBD();
                    }
                }
                return _instance;
            }
        }
        public object ObtenerListadoProyectos(Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Models.Sam3General.Proyectos> listaProyectos = new List<Models.Sam3General.Proyectos>();
                    List<Sam3_Get_ListaProyectos_Result> listaProyectosCTX = ctx.Sam3_Get_ListaProyectos(usuario.UsuarioID).ToList();
                    listaProyectos.Add(new Models.Sam3General.Proyectos());
                    foreach (Sam3_Get_ListaProyectos_Result item in listaProyectosCTX)
                    {
                        listaProyectos.Add(new Models.Sam3General.Proyectos
                        {
                            ProyectoID = item.ProyectoID,
                            Nombre = item.Nombre,
                            PatioID = item.PatioID,
                            PrefijoOrdenTrabajo = item.PrefijoOrdenTrabajo
                        });
                    }

                    return listaProyectos;
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
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