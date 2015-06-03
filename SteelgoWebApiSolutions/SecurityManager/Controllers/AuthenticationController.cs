using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;
using CommonTools.Libraries.Strings.Security;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;

namespace SecurityManager
{
    /// <summary>
    ///     This Class Manages the Authentication Actions 
    ///         GET Method validates a session
    ///         POST Method creates a session
    ///         DELETE Method removes a session
    /// </summary>
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AuthenticationController : ApiController
    {
        Base64Security dataSecurity = new Base64Security();

        /// <summary>
        ///     Receives the username and token to be validated
        ///     Decrypt the received parameters
        ///     Then validates the session associated to that data
        /// </summary>
        /// <param name="username">
        ///     Username associated to the session encrypted in Base64
        /// </param>
        /// <param name="token">
        ///     Token associated to the session encrypted in Base64
        /// </param>
        /// <returns> TransactionalInformation Object in a JSON Response  </returns>
        /// <example> GET securitymanager/api/authentication/ </example>
        public TransactionalInformation Get(string username, string token)
        {
            username = dataSecurity.Decode(username);
            token = dataSecurity.Decode(token);

            //Create a generic return object
            TransactionalInformation transaction = new TransactionalInformation();
            transaction.IsAuthenicated = false;
            //transaction.ReturnMessage.Add(encodedData);

            if (username == "admin" && token == "EsteEsUnTokenGeneradoDeAlgunaManera") {
                transaction.IsAuthenicated = true;    
            }

            return transaction;
        }

        /// <summary>
        ///     Receives the username and password to be validated
        ///     Decrypt the received parameters
        ///     Then validates and creates a session associated to that data
        /// </summary>
        /// <param name="username">
        ///     Username associated to the session encrypted in Base64
        /// </param>
        /// <param name="token">
        ///     Password associated to the session encrypted in Base64
        /// </param>
        /// <returns> TransactionalInformation Object in a JSON Response  </returns>
        /// <example> POST securitymanager/api/authentication/ </example>
        public TransactionalInformation Post(string username, string password)
        {
            username = dataSecurity.Decode(username);
            password = dataSecurity.Decode(password);
            DatabaseManager.Sam3.Usuario usuario;
            string perfil = "";
            //Check in data base
            using (SamContext ctx = new SamContext())
            {
                usuario = (from us in ctx.Usuario
                           where us.NombreUsuario == username && us.ContrasenaHash == password
                           select us).SingleOrDefault();
                if (usuario != null && usuario.PerfilID > 0)
                {
                    perfil = ctx.Perfil.Where(x => x.PerfilID == usuario.PerfilID).Select(x => x.Nombre).SingleOrDefault();
                }
            }

            //Create a generic return object
            TransactionalInformation transaction = new TransactionalInformation();
            transaction.IsAuthenicated = false;

            if (usuario != null)
            {
                string token = ManageTokens.Instance.CreateJwtToken(usuario.NombreUsuario, usuario.ContrasenaHash, "");
                token = dataSecurity.Encode(token);
                transaction.IsAuthenicated = true;
                transaction.ReturnMessage.Add(token);
                transaction.ReturnCode = 200;
                transaction.ReturnStatus = true;
            }
            else
            {
                string message = "Datos de usuario no valido";
                transaction.ReturnCode = 400;
                transaction.ReturnMessage.Add(message);
                transaction.IsAuthenicated = false;
                transaction.ReturnStatus = false;
            }

            return transaction;
        }

        /// <summary>
        ///     Receives the username and token of the session to be removed
        ///     Decrypt the received parameters
        ///     Then validates the data and removes the session
        /// </summary>
        /// <param name="username">
        ///     Username associated to the session encrypted in Base64
        /// </param>
        /// <param name="token">
        ///     Token associated to the session encrypted in Base64
        /// </param>
        /// <returns> TransactionalInformation Object in a JSON Response  </returns>
        /// <example> GET securitymanager/api/authentication/ </example>
        public TransactionalInformation Delete(string username, string token)
        {
            username = dataSecurity.Decode(username);
            token = dataSecurity.Decode(token);

            //Create a generic return object
            TransactionalInformation transaction = new TransactionalInformation();
            transaction.IsAuthenicated = true;

            if (username == "admin" && token == "EsteEsUnTokenGeneradoDeAlgunaManera")
            {
                transaction.IsAuthenicated = false;
            }

            return transaction;
        }
    }
}