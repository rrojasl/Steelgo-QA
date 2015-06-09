using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DatabaseManager.Sam3;
using DatabaseManager.EntidadesPersonalizadas;
using BackEndSAM.Utilities;
using System.Web.Script.Serialization;
using BackEndSAM.Models;
using SecurityManager.Api.Models;

namespace BackEndSAM.DataAcces
{
    public class PlanaBd
    {
        private static readonly object _mutex = new object();
        private static PlanaBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private PlanaBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static PlanaBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new PlanaBd();
                    }
                }
                return _instance;
            }
        }

        public List<Plana> ObtenerListadoPlanas(string payload)
        {
            List<Plana> results = new List<Plana>();
            using (SamContext ctx = new SamContext())
            {
                results = (from p in ctx.Sam3_Plana
                           select new Plana
                           {
                               PlanaID = Convert.ToString(p.PlanaID),
                               Nombre = p.Placas
                           }).ToList();
            }
            return results;
        }

        public object InsertarPlana(string payload, string placas, int camionID)
        {
            try
            {
                Sam3_Plana nuevaPlana;
                using (SamContext ctx = new SamContext())
                {
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                    nuevaPlana = new Sam3_Plana
                    {
                        Activo = 1,
                        CamionID = camionID,
                        Placas = placas,
                        FechaModificacion = DateTime.Now,
                        UsuarioModificacion = usuario.UsuarioID
                    };
                    ctx.Sam3_Plana.Add(nuevaPlana);
                    ctx.SaveChanges();

                    return new Plana { Nombre = nuevaPlana.Placas, PlanaID = Convert.ToString(nuevaPlana.PlanaID) };
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

        public object ActualizarPlana(Sam3_Plana cambios, string payload)
        {
            try
            {
                TransactionalInformation result;
                using (SamContext ctx = new SamContext())
                {
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                    Sam3_Plana planaEnBd = ctx.Sam3_Plana.Where(x => x.PlanaID == cambios.PlanaID).SingleOrDefault();
                    planaEnBd.Activo = 1;
                    planaEnBd.CamionID = cambios.CamionID;
                    planaEnBd.Placas = cambios.Placas;
                    planaEnBd.UsuarioModificacion = usuario.UsuarioID;
                    planaEnBd.FechaModificacion = DateTime.Now;

                    ctx.SaveChanges();

                    result = new TransactionalInformation();
                    result.ReturnCode = 200;
                    result.ReturnStatus = true;
                    result.ReturnMessage.Add("OK");
                    result.IsAuthenicated = true;

                    return result;
                }
            }
            catch(Exception ex)
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