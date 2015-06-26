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
    public class ChoferBd
    {
        private static readonly object _mutex = new object();
        private static ChoferBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private ChoferBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static ChoferBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new ChoferBd();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerListadoChoferes(string esAvisoEntrada)
        {
            try
            {
                List<Chofer> lstChoferes = new List<Chofer>();
                using (SamContext ctx = new SamContext())
                {
                    if (int.Parse(esAvisoEntrada) == 1)
                    {
                        lstChoferes.Add(new Chofer { Nombre = "Agregar nuevo", ChoferID = "0" });
                    }

                    List<Chofer> result = (from r in ctx.Sam3_Chofer
                                           where r.Activo
                                           select new Chofer
                                           {
                                               Nombre = r.Nombre,
                                               ChoferID = r.ChoferID.ToString()
                                           }).AsParallel().ToList();

                    lstChoferes.AddRange(result);

                    return lstChoferes;
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

        public object InsertarChofer(Sam3_Chofer chofer, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_Chofer nuevoChofer = new Sam3_Chofer();
                    nuevoChofer.Activo = true;
                    nuevoChofer.FechaModificacion = DateTime.Now;
                    nuevoChofer.Nombre = chofer.Nombre;
                    nuevoChofer.UsuarioModificacion = usuario.UsuarioID;

                    ctx.Sam3_Chofer.Add(nuevoChofer);
                    ctx.SaveChanges();

                    return new Chofer { Nombre = chofer.Nombre, ChoferID = nuevoChofer.ChoferID.ToString() };
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

        public object ActualizarChofer(Sam3_Chofer chofer, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

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

        public object EliminarChofer(int choferID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_Chofer chofer = ctx.Sam3_Chofer.Where(x => x.ChoferID == choferID).AsParallel().SingleOrDefault();

                    chofer.Activo = false;
                    chofer.FechaModificacion = DateTime.Now;
                    chofer.UsuarioModificacion = usuario.UsuarioID;

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

        public object ObtenerChoferesProTransportista(int transportistaID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Chofer> lstChoferes = (from r in ctx.Sam3_Chofer
                                                join rvc in ctx.Sam3_Rel_Vehiculo_Chofer on r.ChoferID equals rvc.ChoferID
                                                join v in ctx.Sam3_Vehiculo on rvc.VehiculoID equals v.VehiculoID
                                                join rvt in ctx.Sam3_Rel_Vehiculo_Transportista on v.VehiculoID equals rvt.VehiculoID
                                                where rvt.TransportistaID == transportistaID && r.Activo
                                                select new Chofer
                                                {
                                                    Nombre = r.Nombre,
                                                    ChoferID = r.ChoferID.ToString()
                                                }).AsParallel().ToList();

                    lstChoferes = lstChoferes.GroupBy(x => x.ChoferID).Select(x => x.First()).ToList();

                    return lstChoferes;

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