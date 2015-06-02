using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens;
using System.IdentityModel;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Web;
using JWT;
using System.Runtime.Remoting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.IdentityModel;
using System.Configuration;

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


        public string CreateJwtToken(string userName, string password, string profile)
        {
            DateTime unixEpoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            double now = Math.Round((DateTime.UtcNow.AddMinutes(30) - unixEpoch).TotalSeconds);
            //double now = Math.Round((DateTime.UtcNow - unixEpoch).TotalSeconds);

            Dictionary<string, object> payload = new Dictionary<string, object>()
            {
                { "UserName", userName },
                { "Password", password },
                { "Profile", profile},
                { "exp", now}
            };

            string token = JWT.JsonWebToken.Encode(payload, ConfigurationManager.AppSettings["scrKey"], JWT.JwtHashAlgorithm.HS256);
            return token;
        }

        public bool ValidateToken(string token)
        {
            return false;
        }
    }
}