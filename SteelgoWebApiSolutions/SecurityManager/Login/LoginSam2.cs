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
using SecurityManager.Login;
using System.Web.Security;


namespace SecurityManager.Login
{
    public class LoginSam2
    {
        private static readonly object _mutex = new object();
        private static LoginSam2 _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private LoginSam2()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static LoginSam2 Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new LoginSam2();
                    }
                }
                return _instance;
            }
        }

        public TransactionalInformation Login(string usuario, string password)
        {
            try
            {
                TransactionalInformation transaction = new TransactionalInformation();
                Sam3_Usuario usuarioSam3;

                using (SamContext ctx = new SamContext())
                {
                    MembershipProvider proveedor = Membership.Provider;
                    MembershipUser usuarioRegistrado;

                    if (usuario != "samAdmin" && usuario != "samListados" && usuario != "samCreacion")
                    {
                        if (proveedor.ValidateUser(usuario, password))
                        {
                            usuarioRegistrado = proveedor.GetUser(usuario, false);
                            Guid id = (Guid)usuarioRegistrado.ProviderUserKey;

                            usuarioSam3 = ctx.Sam3_Usuario.Where(x => x.Sam2UserID == id).AsParallel().SingleOrDefault();

                            string token = ManageTokens.Instance.CreateJwtToken(usuarioSam3);

                            transaction.IsAuthenicated = true;
                            transaction.ReturnMessage.Add(usuarioSam3.Nombre + " " + usuarioSam3.ApellidoPaterno);
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
                    }
                    else
                    {

                        usuarioSam3 = (from us in ctx.Sam3_Usuario
                                   where us.NombreUsuario == usuario && us.ContrasenaHash == password
                                   select us).AsParallel().SingleOrDefault();

                        if (usuarioSam3 != null)
                        {
                            int user = string.Compare(usuarioSam3.NombreUsuario, usuario, false);
                            int pass = string.Compare(usuarioSam3.ContrasenaHash, password, false);
                        }

                        if (usuarioSam3 != null && string.Compare(usuarioSam3.ContrasenaHash, password, false) == 0 && string.Compare(usuarioSam3.NombreUsuario, usuario, false) == 0)
                        {
                            string token = ManageTokens.Instance.CreateJwtToken(usuarioSam3);
                            token = token;
                            transaction.IsAuthenicated = true;
                            transaction.ReturnMessage.Add(usuarioSam3.Nombre + " " + usuarioSam3.ApellidoPaterno);
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
                    }
                }

                return transaction;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

    }
}