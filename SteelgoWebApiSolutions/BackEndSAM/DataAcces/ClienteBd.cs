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

        public object ObtenerListadoClientes(Sam3_Usuario usuario)
        {
            try
            {
                using (Sam2Context ctx = new Sam2Context())
                {
                    List<Models.Cliente> cliente = (from r in ctx.Cliente
                                                    select new Models.Cliente
                                                    {
                                                        Nombre = r.Nombre,
                                                        ClienteID = r.ClienteID.ToString()
                                                    }).AsParallel().ToList();
                    return cliente;
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
                return ex.Message;
            }
        }

    }// Fin clase
}