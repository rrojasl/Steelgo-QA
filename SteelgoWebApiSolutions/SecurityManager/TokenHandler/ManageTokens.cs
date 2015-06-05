using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Web;
using JWT;
using System.Runtime.Remoting;
using System.Configuration;
using DatabaseManager.Sam3;

namespace SecurityManager.TokenHandler
{
    public class ManageTokens
    {
        private static readonly object _mutex = new object();
        private static ManageTokens _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private ManageTokens()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static ManageTokens Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new ManageTokens();
                    }
                }
                return _instance;
            }
        }


        public string CreateJwtToken(Sam3_Usuario usuario)
        {
            DateTime unixEpoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            double now = Math.Round((DateTime.UtcNow.AddMinutes(30) - unixEpoch).TotalSeconds);
            var time = (DateTime.UtcNow.AddMinutes(30) - unixEpoch).TotalSeconds;
            //double now = Math.Round((DateTime.UtcNow - unixEpoch).TotalSeconds);

            Dictionary<string, object> payload = new Dictionary<string, object>()
            {
                { "UserName", usuario.NombreUsuario },
                { "Password", usuario.ContrasenaHash },
                { "ProfileID", usuario.PerfilID},
                { "exp", now}
            };

            string token = JWT.JsonWebToken.Encode(payload, ConfigurationManager.AppSettings["scrKey"], JWT.JwtHashAlgorithm.HS256);
            return token;
        }

        public string ValidateToken(string token)
        {
            try
            {
                string payLoad = JsonWebToken.Decode(token, ConfigurationManager.AppSettings["scrKey"]);
                return payLoad;
            }
            catch (JWT.SignatureVerificationException ex)
            {
                return ex.Message;
            }
        }
    }
}