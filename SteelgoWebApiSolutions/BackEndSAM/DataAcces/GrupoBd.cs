using BackEndSAM.Models;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces
{
    public class GrupoBd
    {
        private static readonly object _mutex = new object();
        private static GrupoBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private GrupoBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static GrupoBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new GrupoBd();
                    }
                }
                return _instance;
            }
        }

        /// <summary>
        /// Obtener los grupos para el combo del Catalogo Item Code Steelgo
        /// </summary>
        /// <returns>lista de Grupos</returns>
        public object obtenerListadoGrupo()
        {
            try
            {
                using(SamContext ctx = new SamContext())
                {
                    List<ListaCombos> grupo = (from g in ctx.Sam3_Grupo
                                               where g.Activo
                                               select new ListaCombos
                                               {
                                                   id = g.GrupoID.ToString(),
                                                   value = g.Nombre
                                               }).AsParallel().ToList();

                    return grupo;
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