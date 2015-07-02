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

        public List<Plana> ObtenerListadoPlanas(Sam3_Usuario usuario)
        {
            List<Plana> results = new List<Plana>();
            using (SamContext ctx = new SamContext())
            {
                results.Add(new Plana { Nombre = "Agregar nuevo", PlanaID = "0" });

                List<Plana> encontrados = (from p in ctx.Sam3_Vehiculo
                                           select new Plana
                                           {
                                               PlanaID = p.VehiculoID.ToString(),
                                               Nombre = p.Placas
                                           }).AsParallel().ToList();

                results.AddRange(encontrados);

            }
            return results;
        }

        public object InsertarPlana(VehiculoJson plana, Sam3_Usuario usuario)
        {
            try
            {
                Sam3_Vehiculo nuevaPlana;
                using (SamContext ctx = new SamContext())
                {

                    nuevaPlana = new Sam3_Vehiculo
                    {
                        TipoVehiculoID = Convert.ToInt32(plana.TipoVehiculoID),
                        Activo = true,
                        TractoID = Convert.ToInt32(plana.TractoID),
                        Placas = plana.Placas,
                        Unidad = plana.Unidad,
                        Modelo = plana.Modelo,
                        FechaModificacion = DateTime.Now,
                        UsuarioModificacion = usuario.UsuarioID
                    };
                    ctx.Sam3_Vehiculo.Add(nuevaPlana);
                    ctx.SaveChanges();

                    return new Plana { Nombre = nuevaPlana.Placas, PlanaID = Convert.ToString(nuevaPlana.VehiculoID) };
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

        public object ActualizarPlana(VehiculoJson cambios, Sam3_Usuario usuario)
        {
            try
            {
                TransactionalInformation result;
                using (SamContext ctx = new SamContext())
                {
                    int vehiculoID = Convert.ToInt32(cambios.VehiculoID);
                    Sam3_Vehiculo planaEnBd = ctx.Sam3_Vehiculo.Where(x => x.VehiculoID == vehiculoID).AsParallel().SingleOrDefault();
                    planaEnBd.Activo = true;
                    planaEnBd.TractoID = Convert.ToInt32(cambios.TractoID);
                    planaEnBd.Placas = cambios.Placas;
                    planaEnBd.Unidad = cambios.Unidad;
                    planaEnBd.Modelo = cambios.Modelo;
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

        public object EliminarPlana(int vehiculoID, Sam3_Usuario usuario)
        {
            try
            {
                TransactionalInformation result;
                using (SamContext ctx = new SamContext())
                {
                    Sam3_Vehiculo plana = ctx.Sam3_Vehiculo.Where(x => x.VehiculoID == vehiculoID).AsParallel().SingleOrDefault();
                    plana.Activo = false;
                    plana.UsuarioModificacion = usuario.UsuarioID;
                    plana.FechaModificacion = DateTime.Now;

                    ctx.SaveChanges();

                    result = new TransactionalInformation();
                    result.ReturnCode = 200;
                    result.ReturnStatus = true;
                    result.ReturnMessage.Add("OK");
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
    }
}