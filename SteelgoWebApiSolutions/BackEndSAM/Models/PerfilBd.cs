using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DatabaseManager.Sam3;
using DatabaseManager.EntidadesPersonalizadas;

namespace BackEndSAM.Models
{
    public class PerfilBd
    {
        private static readonly object _mutex = new object();
        private static PerfilBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private PerfilBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static PerfilBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new PerfilBd();
                    }
                }
                return _instance;
            }
        }

        public PerfilJson ObtenerPerfilJsonPorID(string perfilID)
        {
            PerfilJson perfil;
            using (SamContext ctx = new SamContext())
            {
                
            }
            return null;
        }
    }
}