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
    public class CamionBd
    {
        private static readonly object _mutex = new object();
        private static CamionBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private CamionBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static CamionBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new CamionBd();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerListadoCamiones()
        {
            try
            {
                List<Camion> lstCamiones = new List<Camion>();
                //lstCamiones.Add(new Camion { CamionID = "0", Placas = "Agregar nuevo" });
                using (SamContext ctx = new SamContext())
                {
                    List<Camion> result = (from r in ctx.Sam3_Camion
                                           where r.Activo
                                           select new Camion
                                           {
                                               CamionID = r.CamionID.ToString(),
                                               Placas = r.Placas
                                           }).AsParallel().ToList();

                    lstCamiones.AddRange(result);

                    return lstCamiones;
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

        public object InsertarCamion(Sam3_Camion cambios, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_Camion nuevoCamion = new Sam3_Camion();
                    nuevoCamion.Activo = true;
                    nuevoCamion.ChoferID = cambios.ChoferID;
                    nuevoCamion.Estatus = "";
                    nuevoCamion.FechaModificacion = DateTime.Now;
                    nuevoCamion.Placas = cambios.Placas;
                    nuevoCamion.PolizaSeguro = cambios.PolizaSeguro;
                    nuevoCamion.TarjetaCirulacion = cambios.TarjetaCirulacion;
                    nuevoCamion.TransportistaID = cambios.TransportistaID;
                    nuevoCamion.UsuarioModificacion = usuario.UsuarioID;

                    ctx.Sam3_Camion.Add(nuevoCamion);
                    ctx.SaveChanges();

                    return new Camion { Placas = nuevoCamion.Placas, CamionID = nuevoCamion.CamionID.ToString() };
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

        public object ActualizarCamion(Sam3_Camion cambios, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    return null;
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

        public object EliminarCamion(int camionID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_Camion camion = ctx.Sam3_Camion.Where(x => x.CamionID == camionID).AsParallel().SingleOrDefault();
                    camion.Activo = false;
                    camion.FechaModificacion = DateTime.Now;
                    camion.UsuarioModificacion = usuario.UsuarioID;

                    ctx.SaveChanges();

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("OK");
                    result.ReturnCode = 200;
                    result.ReturnStatus = true;
                    result.IsAuthenicated = true;

                    return result;
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

    }//Fin clase
}