using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DatabaseManager.Sam2;
using DatabaseManager.Sam3;
using DatabaseManager.EntidadesPersonalizadas;
using BackEndSAM.Utilities;
using System.Web.Script.Serialization;
using BackEndSAM.Models;
using SecurityManager.Api.Models;

namespace BackEndSAM.DataAcces
{
    /// <summary>
    /// operaciones sobre la entidad Cliente
    /// </summary>
    public class ClienteBd
    {
        private static readonly object _mutex = new object();
        private static ClienteBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private ClienteBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static ClienteBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new ClienteBd();
                    }
                }
                return _instance;
            }
        }

        /// <summary>
        /// Genera un listado de clientes para mostrarse en un combo box
        /// </summary>
        /// <param name="usuario"></param>
        /// <returns></returns>
        public object ObtenerListadoClientes(Sam3_Usuario usuario, int patioID = 0)
        {
            try
            {
                using (Sam2Context ctx2 = new Sam2Context())
                {
                    using (SamContext ctx = new SamContext())
                    {
                        List<int> proyectos = new List<int>();
                        List<int> patios = new List<int>();

                        UsuarioBd.Instance.ObtenerPatiosYProyectosDeUsuario(usuario.UsuarioID, out proyectos, out patios);

                        List<Models.Cliente> cliente = new List<Models.Cliente>();

                        if (patioID > 0)
                        {
                            List<int> patiosSam2 = (from eq in ctx.Sam3_EquivalenciaPatio
                                                    where eq.Activo
                                                    && patios.Contains(eq.Sam3_PatioID)
                                                    select eq.Sam2_PatioID).AsParallel().ToList();

                            cliente = (from r in ctx2.Cliente
                                       join p in ctx2.Proyecto on r.ClienteID equals p.ClienteID
                                       join pa in ctx2.Patio on p.PatioID equals pa.PatioID
                                       where patiosSam2.Contains(pa.PatioID)
                                       select new Models.Cliente
                                       {
                                           Nombre = r.Nombre,
                                           ClienteID = r.ClienteID.ToString()
                                       }).AsParallel().ToList();
                        }
                        else
                        {
                            cliente = (from r in ctx2.Cliente
                                       select new Models.Cliente
                                       {
                                           Nombre = r.Nombre,
                                           ClienteID = r.ClienteID.ToString()
                                       }).AsParallel().ToList();
                        }

                        return cliente;
                    }
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

        /// <summary>
        /// Obtiene un solo elemento de cliente, por id.
        /// </summary>
        /// <param name="clienteID"></param>
        /// <returns></returns>
        public object ObtnerElementoClientePorID(int clienteID)
        {
            try
            {
                using (Sam2Context ctx = new Sam2Context())
                {
                    Models.Cliente clienteBd = (from r in ctx.Cliente
                                                where r.ClienteID == clienteID
                                                select new Models.Cliente
                                                {
                                                    Nombre = r.Nombre,
                                                    ClienteID = r.ClienteID.ToString()
                                                }).AsParallel().SingleOrDefault();
                    return clienteBd;
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                return ex.Message;
            }
        }

    }// Fin clase
}