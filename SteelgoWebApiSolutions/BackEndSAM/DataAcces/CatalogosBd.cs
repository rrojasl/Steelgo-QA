using BackEndSAM.Models;
using DatabaseManager.Sam2;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace BackEndSAM.DataAcces
{
    public class CatalogosBd
    {
        private static readonly object _mutex = new object();
        private static CatalogosBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private CatalogosBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static CatalogosBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new CatalogosBd();
                    }
                }
                return _instance;
            }
        }

        /// <summary>
        /// Funcion con llenar el combo de catalogos
        /// Catalogos ABC
        /// </summary>
        /// <returns></returns>
        public object obtenerCatalogos()
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<ListaCombos> valoresCombo = new List<ListaCombos>();

                    ListaCombos patios = new ListaCombos();
                    ListaCombos chofer = new ListaCombos();
                    ListaCombos tipoAviso = new ListaCombos();
                    ListaCombos transportista = new ListaCombos();
                    ListaCombos tracto = new ListaCombos();
                    ListaCombos plana = new ListaCombos();
                    ListaCombos proveedor = new ListaCombos();
                    ListaCombos tipoUso = new ListaCombos();
                    ListaCombos camion = new ListaCombos();
                    ListaCombos Acero = new ListaCombos();
                    ListaCombos coladas = new ListaCombos();
                    ListaCombos familiaMaterial = new ListaCombos();
                    ListaCombos familiaAcero = new ListaCombos();
                    ListaCombos fabricante = new ListaCombos();
                    ListaCombos Cedulas = new ListaCombos();

                    patios.id = "1";
                    patios.value = "Patios";
                    valoresCombo.Add(patios);

                    chofer.id = "2";
                    chofer.value = "Chofer";
                    valoresCombo.Add(chofer);

                    tipoAviso.id = "3";
                    tipoAviso.value = "Tipo Aviso";
                    valoresCombo.Add(tipoAviso);

                    transportista.id = "4";
                    transportista.value = "Transportista";
                    valoresCombo.Add(transportista);

                    tracto.id = "5";
                    tracto.value = "Tracto";
                    valoresCombo.Add(tracto);

                    plana.id = "6";
                    plana.value = "Plana";
                    valoresCombo.Add(plana);

                    proveedor.id = "7";
                    proveedor.value = "Proveedor";
                    valoresCombo.Add(proveedor);

                    tipoUso.id = "8";
                    tipoUso.value = "Tipo de Uso";
                    valoresCombo.Add(tipoUso);

                    camion.id = "9";
                    camion.value = "Camion";
                    valoresCombo.Add(camion);

                    fabricante.id = "10";
                    fabricante.value = "Fabricante";
                    valoresCombo.Add(fabricante);

                    Cedulas.id = "11";
                    Cedulas.value = "Cédulas";
                    valoresCombo.Add(Cedulas);

                    return valoresCombo;
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        /// <summary>
        /// Muestra la informacion del catalogo seleccionado
        /// </summary>
        /// <param name="catalogoID"></param>
        /// <returns></returns>
        public object obtenerInformacionCatalogos(string catalogoID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    switch (Convert.ToInt32(catalogoID))
                    {
                        case 1: //Patios
                            #region
                            List<CatalogoPatio> catPatio = new List<CatalogoPatio>();
                            catPatio = (from p in ctx.Sam3_Patio
                                        where p.Activo
                                        select new CatalogoPatio
                                        {
                                            PatioID = p.PatioID.ToString(),
                                            Nombre = p.Nombre,
                                            Propietario = p.Propietario,
                                            Descripcion = p.Descripcion,
                                            RequierePermisoAduana = p.RequierePermisoAduana == true ? "Si" : "No"
                                        }).AsParallel().ToList();

                            return catPatio;
                            #endregion
                        case 2: //Chofer
                            #region
                            List<CatalogoChofer> catChofer = new List<CatalogoChofer>();
                            catChofer = (from ch in ctx.Sam3_Chofer
                                         join t in ctx.Sam3_Transportista on ch.TransportistaID equals t.TransportistaID
                                         where ch.Activo && t.Activo
                                         select new CatalogoChofer
                                         {
                                             ChoferID = ch.ChoferID.ToString(),
                                             Nombre = ch.Nombre,
                                             TransportistaID = t.TransportistaID.ToString(),
                                             TransportistaNombre = t.Nombre
                                         }).AsParallel().ToList();

                            return catChofer;
                            #endregion
                        case 3: //Tipo Aviso
                            #region
                            List<Catalogos> catTipoAviso = new List<Catalogos>();
                            catTipoAviso = (from ta in ctx.Sam3_TipoAviso
                                            where ta.Activo
                                            select new Catalogos
                                            {
                                                Id = ta.TipoAvisoID.ToString(),
                                                Nombre = ta.Nombre
                                            }).AsParallel().ToList();

                            return catTipoAviso;
                            #endregion
                        case 4: //Transportista
                            #region
                            List<CatalogoTransportista> catTransportista = new List<CatalogoTransportista>();
                            catTransportista = (from t in ctx.Sam3_Transportista
                                                join c in ctx.Sam3_Contacto on t.ContactoID equals c.ContactoID
                                                where t.Activo && c.Activo
                                                select new CatalogoTransportista
                                                {
                                                    ContactoID = c.ContactoID.ToString(),
                                                    Contacto = c.Nombre,
                                                    TransportistaID = t.TransportistaID.ToString(),
                                                    Nombre = t.Nombre,
                                                    Descripcion = t.Descripcion,
                                                    Direccion = t.Direccion,
                                                    Telefono = t.Telefono
                                                }).AsParallel().ToList();

                            return catTransportista;
                            #endregion
                        case 5: //Tracto
                            #region
                            List<CatalogoTracto> catTracto = new List<CatalogoTracto>();
                            catTracto = (from t in ctx.Sam3_Vehiculo
                                         join rvch in ctx.Sam3_Rel_Vehiculo_Chofer on t.VehiculoID equals rvch.VehiculoID
                                         join ch in ctx.Sam3_Chofer on rvch.ChoferID equals ch.ChoferID
                                         join rvt in ctx.Sam3_Rel_Vehiculo_Transportista on t.VehiculoID equals rvt.VehiculoID
                                         join tr in ctx.Sam3_Transportista on rvt.TransportistaID equals tr.TransportistaID
                                         where t.Activo && rvch.Activo && rvt.Activo && ch.Activo && tr.Activo
                                         && t.TipoVehiculoID == 1
                                         select new CatalogoTracto
                                         {
                                             VehiculoID = t.VehiculoID.ToString(),
                                             Placas = t.Placas,
                                             TarjetaCirculacion = t.TarjetaCirculacion,
                                             PolizaSeguro = t.PolizaSeguro,
                                             choferID = rvch.ChoferID.ToString(),
                                             choferNombre = ch.Nombre,
                                             transportistaID = rvt.TransportistaID.ToString(),
                                             transportistaNombre = tr.Nombre,
                                             relVehiculoChoferID = rvch.Rel_Vehiculo_Chofer_ID.ToString(),
                                             relVehiculoTransportistaID = rvt.Rel_Vehiculo_Transportista_ID.ToString()
                                         }).AsParallel().ToList();

                            return catTracto;
                            #endregion
                        case 6: //Plana
                            #region
                            List<CatalogoPlana> catPlana = new List<CatalogoPlana>();
                            catPlana = (from v in ctx.Sam3_Vehiculo
                                        join rvch in ctx.Sam3_Rel_Vehiculo_Chofer on v.VehiculoID equals rvch.VehiculoID
                                        join ch in ctx.Sam3_Chofer on rvch.ChoferID equals ch.ChoferID
                                        join rvt in ctx.Sam3_Rel_Vehiculo_Transportista on v.VehiculoID equals rvt.VehiculoID
                                        join tr in ctx.Sam3_Transportista on rvt.TransportistaID equals tr.TransportistaID
                                        where v.Activo && rvch.Activo && rvt.Activo && ch.Activo && tr.Activo
                                        && v.TipoVehiculoID == 2
                                        select new CatalogoPlana
                                        {
                                            VehiculoID = v.VehiculoID.ToString(),
                                            Placas = v.Placas,
                                            Unidad = v.Unidad,
                                            Modelo = v.Modelo,
                                            TractoID = v.TractoID == -1 ? "" : v.TractoID.ToString(),
                                            choferID = rvch.ChoferID.ToString(),
                                            choferNombre = ch.Nombre,
                                            transportistaID = rvt.TransportistaID.ToString(),
                                            transportistaNombre = tr.Nombre,
                                            relVehiculoChoferID = rvch.Rel_Vehiculo_Chofer_ID.ToString(),
                                            relVehiculoTransportistaID = rvt.Rel_Vehiculo_Transportista_ID.ToString()
                                        }).AsParallel().ToList();

                            return catPlana;
                            #endregion
                        case 7: //Proveedor
                            #region
                            List<CatalogoProveedor> catProveedor = new List<CatalogoProveedor>();
                            catProveedor = (from p in ctx.Sam3_Proveedor
                                            join c in ctx.Sam3_Contacto on p.ContactoID equals c.ContactoID
                                            where p.Activo && c.Activo
                                            select new CatalogoProveedor
                                            {
                                                ProveedorID = p.ProveedorID.ToString(),
                                                ContactoID = c.ContactoID.ToString(),
                                                Contacto = c.Nombre,
                                                Nombre = p.Nombre,
                                                Descripcion = p.Descripcion,
                                                Direccion = p.Direccion,
                                                Telefono = p.Telefono
                                            }).AsParallel().ToList();

                            return catProveedor;
                            #endregion
                        case 8: //Tipo de Uso
                            #region
                            List<Catalogos> catTipoUso = new List<Catalogos>();
                            catTipoUso = (from tu in ctx.Sam3_TipoUso
                                          where tu.Activo
                                          select new Catalogos
                                          {
                                              Id = tu.TipoUsoID.ToString(),
                                              Nombre = tu.Nombre
                                          }).AsParallel().ToList();

                            return catTipoUso;
                            #endregion
                        case 9: //Camion
                            #region
                            List<Catalogos> catCamion = new List<Catalogos>();
                            catCamion = (from v in ctx.Sam3_TipoVehiculo

                                         where v.Activo
                                         select new Catalogos
                                         {
                                             Id = v.TipoVehiculoID.ToString(),
                                             Nombre = v.Nombre
                                         }).AsParallel().ToList();

                            return catCamion;
                            #endregion
                        case 10: //fabricante
                            #region
                            List<CatalogoFabricante> catFabricante = new List<CatalogoFabricante>();
                            catFabricante = (from f in ctx.Sam3_Fabricante
                                             join c in ctx.Sam3_Contacto on f.ContactoID equals c.ContactoID
                                             where f.Activo && c.Activo
                                             select new CatalogoFabricante
                                             {
                                                 FabricanteID = f.FabricanteID.ToString(),
                                                 ContactoID = c.ContactoID.ToString(),
                                                 Contacto = c.Nombre,
                                                 Nombre = f.Nombre,
                                                 Descripcion = f.Descripcion,
                                                 Direccion = f.Direccion,
                                                 Telefono = f.Telefono
                                             }).AsParallel().ToList();
                            return catFabricante;
                            #endregion
                        case 11: //Catalogo Cedulas
                            #region
                            List<CatalogoCedulas> catCedulas = new List<CatalogoCedulas>();
                            catCedulas = (from c in ctx.Sam3_Cedula
                                          where c.Activo
                                          select new CatalogoCedulas
                                          {
                                              CedulaID = c.CedulaID.ToString(),
                                              Diametro1 = c.Diametro.ToString() != "" ? c.Diametro.ToString() : "0-9999",
                                              CedulaA = c.CedulaA,
                                              CedulaB = c.CedulaB,
                                              CedulaC = c.CedulaC,
                                              CedulaIn = c.CedulaIn.ToString(),
                                              CedulaMM = c.CedulaMM.ToString(),
                                              Espesor = c.Espesor.ToString()
                                          }).AsParallel().ToList();

                            return catCedulas;
                            #endregion
                        default:
                            #region
                            TransactionalInformation result = new TransactionalInformation();
                            result.ReturnMessage.Add("Listado no encontrado");
                            result.ReturnCode = 500;
                            result.ReturnStatus = false;
                            result.IsAuthenicated = false;
                            return result;
                            #endregion
                    }
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }


        /// <summary>
        /// Funcion para actualizar la informacion de los catalogos
        /// Segun la informacion capturada en el grid de Administracion de Catalogos
        /// </summary>
        /// <param name="data">datos a actualizar</param>
        /// <param name="catalogoID">id del catalogo seleccionado</param>
        /// <param name="usuario">usuario actua</param>
        /// <returns></returns>
        public object actualizarCatalogo(string data, string catalogoID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    object res = new object();
                    TransactionalInformation result = new TransactionalInformation();

                    switch (Convert.ToInt32(catalogoID))
                    {
                        case 1: //Patios
                            #region
                            Sam3_Patio patio = serializer.Deserialize<Sam3_Patio>(data);

                            Sam3_Patio patioEnBd = ctx.Sam3_Patio.Where(x => x.PatioID == patio.PatioID && x.Activo).AsParallel().SingleOrDefault();

                            patioEnBd.Descripcion = patio.Descripcion != null && patio.Descripcion != patioEnBd.Descripcion ?
                        patio.Descripcion : patioEnBd.Descripcion;
                            patioEnBd.Nombre = patio.Nombre != null && patio.Nombre != patioEnBd.Nombre ?
                        patio.Nombre : patioEnBd.Nombre;
                            patioEnBd.Propietario = patio.Propietario != null && patio.Propietario != patioEnBd.Propietario ?
                        patio.Propietario : patioEnBd.Propietario;
                            patioEnBd.RequierePermisoAduana = patio.RequierePermisoAduana != null && patio.RequierePermisoAduana != patioEnBd.RequierePermisoAduana ?
                        patio.RequierePermisoAduana : patioEnBd.RequierePermisoAduana;

                            patioEnBd.UsuarioModificacion = usuario.UsuarioID;
                            patioEnBd.FechaModificacion = DateTime.Now;

                            ctx.SaveChanges();
                            return new CatalogoPatio
                            {
                                PatioID = patioEnBd.PatioID.ToString(),
                                Nombre = patioEnBd.Nombre,
                                Descripcion = patioEnBd.Descripcion,
                                Propietario = patioEnBd.Propietario,
                                RequierePermisoAduana = patioEnBd.RequierePermisoAduana == true ? "Si" : "No"
                            };
                            #endregion
                        case 2: //chofer
                            #region
                            CatalogoChofer chofer = serializer.Deserialize<CatalogoChofer>(data);

                            Sam3_Chofer choferEnBd = ctx.Sam3_Chofer.Where(x => x.ChoferID.ToString() == chofer.ChoferID && x.Activo).AsParallel().SingleOrDefault();

                            choferEnBd.Nombre = chofer.Nombre != null && chofer.Nombre != choferEnBd.Nombre ?
                                chofer.Nombre : choferEnBd.Nombre;

                            choferEnBd.TransportistaID = chofer.TransportistaID != null && chofer.TransportistaID != choferEnBd.TransportistaID.ToString() ?
                                Convert.ToInt32(chofer.TransportistaID) : choferEnBd.TransportistaID;

                            choferEnBd.UsuarioModificacion = usuario.UsuarioID;

                            choferEnBd.FechaModificacion = DateTime.Now;

                            ctx.SaveChanges();

                            return new CatalogoChofer
                            {
                                ChoferID = choferEnBd.ChoferID.ToString(),
                                Nombre = choferEnBd.Nombre,
                                TransportistaID = choferEnBd.TransportistaID.ToString(),
                                TransportistaNombre = chofer.TransportistaNombre
                            };
                            #endregion
                        case 3: //Tipo Aviso
                            #region
                            Catalogos tipoAviso = serializer.Deserialize<Catalogos>(data);

                            Sam3_TipoAviso avisoEnBd = ctx.Sam3_TipoAviso.Where(x => x.TipoAvisoID.ToString() == tipoAviso.Id && x.Activo).AsParallel().SingleOrDefault();

                            avisoEnBd.Nombre = tipoAviso.Nombre != null && tipoAviso.Nombre != avisoEnBd.Nombre ?
                                tipoAviso.Nombre : avisoEnBd.Nombre;

                            avisoEnBd.FechaModificacion = DateTime.Now;

                            avisoEnBd.UsuarioModificacion = usuario.UsuarioID;

                            ctx.SaveChanges();

                            return new Catalogos
                            {
                                Id = avisoEnBd.TipoAvisoID.ToString(),
                                Nombre = avisoEnBd.Nombre
                            };
                            #endregion
                        case 4: //Transportista
                            #region
                            CatalogoTransportista transportista = serializer.Deserialize<CatalogoTransportista>(data);

                            Sam3_Transportista transEnBd = ctx.Sam3_Transportista.Where(x => x.TransportistaID.ToString() == transportista.TransportistaID && x.Activo).AsParallel().SingleOrDefault();
                            transEnBd.ContactoID = transportista.ContactoID != null && transportista.ContactoID != transEnBd.ContactoID.ToString() ?
                                Convert.ToInt32(transportista.ContactoID) : transEnBd.ContactoID;

                            transEnBd.Nombre = transportista.Nombre != null && transportista.Nombre != transEnBd.Nombre ?
                                transportista.Nombre : transEnBd.Nombre;

                            transEnBd.Descripcion = transportista.Descripcion != null && transportista.Descripcion != transEnBd.Descripcion ?
                                transportista.Descripcion : transEnBd.Descripcion;

                            transEnBd.Direccion = transportista.Direccion != null && transportista.Direccion != transEnBd.Direccion ?
                                transportista.Direccion : transEnBd.Direccion;

                            transEnBd.Telefono = transportista.Telefono != null && transportista.Telefono != transEnBd.Telefono ?
                                transportista.Telefono : transEnBd.Telefono;

                            transEnBd.UsuarioModificacion = usuario.UsuarioID;

                            transEnBd.FechaModificacion = DateTime.Now;

                            ctx.SaveChanges();

                            return new CatalogoTransportista
                            {
                                TransportistaID = transEnBd.TransportistaID.ToString(),
                                ContactoID = transEnBd.ContactoID.ToString(),
                                Contacto = transportista.Contacto,
                                Descripcion = transEnBd.Descripcion,
                                Direccion = transEnBd.Direccion,
                                Nombre = transEnBd.Nombre,
                                Telefono = transEnBd.Telefono
                            };

                            #endregion
                        case 5: //Tracto
                            #region
                            CatalogoTracto vehiculo = serializer.Deserialize<CatalogoTracto>(data);

                            Sam3_Vehiculo vehiculoEnBd = ctx.Sam3_Vehiculo.Where(x => x.VehiculoID.ToString() == vehiculo.VehiculoID && x.Activo).AsParallel().SingleOrDefault();

                            vehiculoEnBd.Placas = vehiculo.Placas != null && vehiculo.Placas != vehiculoEnBd.Placas ?
                                vehiculo.Placas : vehiculoEnBd.Placas;

                            vehiculoEnBd.TarjetaCirculacion = vehiculo.TarjetaCirculacion != null && vehiculo.TarjetaCirculacion != vehiculoEnBd.TarjetaCirculacion ?
                                vehiculo.TarjetaCirculacion : vehiculoEnBd.TarjetaCirculacion;

                            vehiculoEnBd.PolizaSeguro = vehiculo.PolizaSeguro != null && vehiculo.PolizaSeguro != vehiculoEnBd.PolizaSeguro ?
                                vehiculo.PolizaSeguro : vehiculoEnBd.PolizaSeguro;

                            vehiculoEnBd.UsuarioModificacion = usuario.UsuarioID;

                            vehiculoEnBd.FechaModificacion = DateTime.Now;

                            ctx.SaveChanges();

                            Sam3_Rel_Vehiculo_Chofer relVehiculoChofer = ctx.Sam3_Rel_Vehiculo_Chofer
                                .Where(x => x.Rel_Vehiculo_Chofer_ID.ToString() == vehiculo.relVehiculoChoferID && x.Activo).AsParallel().SingleOrDefault();

                            relVehiculoChofer.ChoferID = Convert.ToInt32(vehiculo.choferID);
                            relVehiculoChofer.Activo = true;
                            relVehiculoChofer.UsuarioModificacion = usuario.UsuarioID;
                            relVehiculoChofer.FechaModificacion = DateTime.Now;
                            ctx.SaveChanges();


                            Sam3_Rel_Vehiculo_Transportista relVehiculotransportista = ctx.Sam3_Rel_Vehiculo_Transportista
                                .Where(x => x.Rel_Vehiculo_Transportista_ID.ToString() == vehiculo.relVehiculoTransportistaID && x.Activo).AsParallel().SingleOrDefault();

                            relVehiculotransportista.TransportistaID = Convert.ToInt32(vehiculo.transportistaID);
                            relVehiculotransportista.Activo = true;
                            relVehiculotransportista.UsuarioModificacion = usuario.UsuarioID;
                            relVehiculotransportista.FechaModificacion = DateTime.Now;
                            ctx.SaveChanges();

                            return new CatalogoTracto
                            {
                                VehiculoID = vehiculoEnBd.VehiculoID.ToString(),
                                Placas = vehiculoEnBd.Placas,
                                TarjetaCirculacion = vehiculoEnBd.TarjetaCirculacion,
                                PolizaSeguro = vehiculoEnBd.PolizaSeguro,
                                choferNombre = vehiculo.choferNombre,
                                choferID = relVehiculoChofer.ChoferID.ToString(),
                                transportistaNombre = vehiculo.transportistaNombre,
                                transportistaID = relVehiculotransportista.TransportistaID.ToString(),
                                relVehiculoChoferID = relVehiculoChofer.Rel_Vehiculo_Chofer_ID.ToString(),
                                relVehiculoTransportistaID = relVehiculotransportista.Rel_Vehiculo_Transportista_ID.ToString()
                            };
                            #endregion
                        case 6: //Plana
                            #region
                            CatalogoPlana plana = serializer.Deserialize<CatalogoPlana>(data);

                            int vehiculoID = Convert.ToInt32(plana.VehiculoID);
                            Sam3_Vehiculo planaEnBd = ctx.Sam3_Vehiculo.Where(x => x.VehiculoID == vehiculoID).AsParallel().SingleOrDefault();
                            //planaEnBd.Activo = true;
                            planaEnBd.TractoID = Convert.ToInt32(plana.TractoID);
                            planaEnBd.Placas = plana.Placas;
                            planaEnBd.Unidad = plana.Unidad;
                            planaEnBd.Modelo = plana.Modelo;
                            planaEnBd.UsuarioModificacion = usuario.UsuarioID;
                            planaEnBd.FechaModificacion = DateTime.Now;

                            ctx.SaveChanges();

                            Sam3_Rel_Vehiculo_Chofer relVehiculoChoferPlana = ctx.Sam3_Rel_Vehiculo_Chofer
                                .Where(x => x.Rel_Vehiculo_Chofer_ID.ToString() == plana.relVehiculoChoferID && x.Activo).AsParallel().SingleOrDefault();

                            relVehiculoChoferPlana.ChoferID = Convert.ToInt32(plana.choferID);
                            relVehiculoChoferPlana.Activo = true;
                            relVehiculoChoferPlana.UsuarioModificacion = usuario.UsuarioID;
                            relVehiculoChoferPlana.FechaModificacion = DateTime.Now;
                            ctx.SaveChanges();


                            Sam3_Rel_Vehiculo_Transportista relVehiculotransportistaPlana = ctx.Sam3_Rel_Vehiculo_Transportista
                                .Where(x => x.Rel_Vehiculo_Transportista_ID.ToString() == plana.relVehiculoTransportistaID && x.Activo).AsParallel().SingleOrDefault();

                            relVehiculotransportistaPlana.TransportistaID = Convert.ToInt32(plana.transportistaID);
                            relVehiculotransportistaPlana.Activo = true;
                            relVehiculotransportistaPlana.UsuarioModificacion = usuario.UsuarioID;
                            relVehiculotransportistaPlana.FechaModificacion = DateTime.Now;
                            ctx.SaveChanges();

                            return new CatalogoPlana
                            {
                                VehiculoID = planaEnBd.VehiculoID.ToString(),
                                Placas = planaEnBd.Placas,
                                Unidad = planaEnBd.Unidad,
                                Modelo = planaEnBd.Modelo,
                                choferNombre = plana.choferNombre,
                                choferID = relVehiculoChoferPlana.ChoferID.ToString(),
                                transportistaNombre = plana.transportistaNombre,
                                transportistaID = relVehiculotransportistaPlana.TransportistaID.ToString(),
                                relVehiculoChoferID = relVehiculoChoferPlana.Rel_Vehiculo_Chofer_ID.ToString(),
                                relVehiculoTransportistaID = relVehiculotransportistaPlana.Rel_Vehiculo_Transportista_ID.ToString()
                            };

                            #endregion
                        case 7: //Proveedor
                            #region
                            CatalogoProveedor proveedor = serializer.Deserialize<CatalogoProveedor>(data);

                            Sam3_Proveedor provEnBd = ctx.Sam3_Proveedor.Where(x => x.ProveedorID.ToString() == proveedor.ProveedorID && x.Activo).AsParallel().SingleOrDefault();

                            provEnBd.ContactoID = proveedor.ContactoID != null && proveedor.ContactoID != provEnBd.ContactoID.ToString() ?
                                Convert.ToInt32(proveedor.ContactoID) : provEnBd.ContactoID;

                            provEnBd.Nombre = proveedor.Nombre != null && proveedor.Nombre != provEnBd.Nombre ?
                                proveedor.Nombre : provEnBd.Nombre;

                            provEnBd.Descripcion = proveedor.Descripcion != null && proveedor.Descripcion != provEnBd.Descripcion ?
                                proveedor.Descripcion : provEnBd.Descripcion;

                            provEnBd.Direccion = proveedor.Direccion != null && proveedor.Direccion != provEnBd.Direccion ?
                                proveedor.Direccion : provEnBd.Direccion;

                            provEnBd.Telefono = proveedor.Telefono != null && proveedor.Telefono != provEnBd.Telefono ?
                                proveedor.Telefono : provEnBd.Telefono;

                            provEnBd.UsuarioModificacion = usuario.UsuarioID;

                            provEnBd.FechaModificacion = DateTime.Now;

                            ctx.SaveChanges();

                            return new CatalogoProveedor
                            {
                                Contacto = proveedor.Contacto,
                                ContactoID = provEnBd.ContactoID.ToString(),
                                Nombre = provEnBd.Nombre,
                                Descripcion = provEnBd.Descripcion,
                                Direccion = provEnBd.Direccion,
                                Telefono = provEnBd.Telefono
                            };
                            #endregion
                        case 8: //Tipo de uso
                            #region
                            Catalogos tipoUso = serializer.Deserialize<Catalogos>(data);

                            Sam3_TipoUso tipoUsoEnBd = ctx.Sam3_TipoUso.Where(x => x.TipoUsoID.ToString() == tipoUso.Id && x.Activo).AsParallel().SingleOrDefault();

                            tipoUsoEnBd.Nombre = tipoUso.Nombre != null && tipoUso.Nombre != tipoUsoEnBd.Nombre ?
                                tipoUso.Nombre : tipoUsoEnBd.Nombre;

                            tipoUsoEnBd.UsuarioModificacion = usuario.UsuarioID;

                            tipoUsoEnBd.FechaModificacion = DateTime.Now;

                            ctx.SaveChanges();

                            return new Catalogos
                            {
                                Id = tipoUsoEnBd.TipoUsoID.ToString(),
                                Nombre = tipoUsoEnBd.Nombre
                            };
                            #endregion
                        case 9: //Camion
                            #region
                            Catalogos camion = serializer.Deserialize<Catalogos>(data);

                            Sam3_TipoVehiculo camionEnBd = ctx.Sam3_TipoVehiculo.Where(x => x.TipoVehiculoID.ToString() == camion.Id && x.Activo).AsParallel().SingleOrDefault();
                            camionEnBd.Nombre = camion.Nombre != null && camion.Nombre != camionEnBd.Nombre ?
                                camion.Nombre : camionEnBd.Nombre;

                            camionEnBd.UsuarioModificacion = usuario.UsuarioID;

                            camionEnBd.FechaModificacion = DateTime.Now;

                            ctx.SaveChanges();

                            return new Catalogos
                            {
                                Id = camionEnBd.TipoVehiculoID.ToString(),
                                Nombre = camionEnBd.Nombre
                            };
                            #endregion
                        case 10: //fabricante
                            #region
                            CatalogoFabricante fabricante = serializer.Deserialize<CatalogoFabricante>(data);

                            Sam3_Fabricante fabricanteEnBd = ctx.Sam3_Fabricante.Where(x => x.FabricanteID.ToString() == fabricante.FabricanteID && x.Activo).AsParallel().SingleOrDefault();

                            fabricanteEnBd.ContactoID = fabricante.ContactoID != null && fabricante.ContactoID != fabricanteEnBd.ContactoID.ToString() ?
                                Convert.ToInt32(fabricante.ContactoID) : fabricanteEnBd.ContactoID;

                            fabricanteEnBd.Nombre = fabricante.Nombre != null && fabricante.Nombre != fabricanteEnBd.Nombre ?
                                fabricante.Nombre : fabricanteEnBd.Nombre;

                            fabricanteEnBd.Descripcion = fabricante.Descripcion != null && fabricante.Descripcion != fabricanteEnBd.Descripcion ?
                                fabricante.Descripcion : fabricanteEnBd.Descripcion;

                            fabricanteEnBd.Direccion = fabricante.Direccion != null && fabricante.Direccion != fabricanteEnBd.Direccion ?
                                fabricante.Direccion : fabricanteEnBd.Direccion;

                            fabricanteEnBd.Telefono = fabricante.Telefono != null && fabricante.Telefono != fabricanteEnBd.Telefono ?
                                fabricante.Telefono : fabricanteEnBd.Telefono;

                            fabricanteEnBd.UsuarioModificacion = usuario.UsuarioID;

                            fabricanteEnBd.FechaModificacion = DateTime.Now;

                            ctx.SaveChanges();

                            return new CatalogoFabricante
                            {
                                Contacto = fabricante.Contacto,
                                ContactoID = fabricante.ContactoID,
                                Nombre = fabricanteEnBd.Nombre,
                                Descripcion = fabricanteEnBd.Descripcion,
                                Direccion = fabricanteEnBd.Direccion,
                                Telefono = fabricanteEnBd.Telefono
                            };
                            #endregion
                        default:
                            #region
                            TransactionalInformation resultado = new TransactionalInformation();
                            resultado.ReturnMessage.Add("Listado no encontrado");
                            resultado.ReturnCode = 500;
                            resultado.ReturnStatus = false;
                            resultado.IsAuthenicated = false;
                            return resultado;
                            #endregion
                    }
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        /// <summary>
        /// Funcion para eliminar un elemento del catalogo
        /// Catalogos ABC 
        /// </summary>
        /// <param name="id">id del elemento a eliminar</param>
        /// <param name="catalogoID">catalogo seleccionado</param>
        /// <param name="usuario">usuario actual</param>
        /// <returns></returns>
        public object EliminarElementoCatalogo(int id, string catalogoID, Sam3_Usuario usuario)
        {
            try
            {
                object res = new object();
                TransactionalInformation result = new TransactionalInformation();

                using (SamContext ctx = new SamContext())
                {
                    switch (Convert.ToInt32(catalogoID))
                    {
                        case 1: //Patios
                            #region
                            res = PatioBd.Instance.EliminarPatio(id, usuario);
                            return res;
                            #endregion
                        case 2: //Chofer
                            #region

                            res = ChoferBd.Instance.EliminarChofer(id, usuario);
                            return res;

                            #endregion
                        case 3: //Tipo Aviso
                            #region

                            Sam3_TipoAviso tipoAviso = ctx.Sam3_TipoAviso.Where(x => x.TipoAvisoID == id).AsParallel().SingleOrDefault();

                            tipoAviso.Activo = false;
                            tipoAviso.UsuarioModificacion = usuario.UsuarioID;
                            tipoAviso.FechaModificacion = DateTime.Now;

                            ctx.SaveChanges();

                            result = new TransactionalInformation();
                            result.ReturnCode = 200;
                            result.ReturnStatus = true;
                            result.ReturnMessage.Add("OK");
                            result.IsAuthenicated = true;

                            return result;

                            #endregion
                        case 4: //Transportista 
                            #region

                            res = TransportistaBd.Instance.EliminarTransportista(id, usuario);
                            return res;

                            #endregion
                        case 5: //Tracto
                            #region

                            res = TractoBd.Instance.EliminarTracto(id, usuario);
                            return res;

                            #endregion
                        case 6: //Plana
                            #region

                            res = PlanaBd.Instance.EliminarPlana(id, usuario);
                            return res;

                            #endregion
                        case 7: //Proveedor
                            #region

                            res = ProveedorBd.Instance.EliminarProveedor(id, usuario);
                            return res;

                            #endregion
                        case 8: //Tipo de uso
                            #region

                            Sam3_TipoUso tipoUso = ctx.Sam3_TipoUso.Where(x => x.TipoUsoID == id).AsParallel().SingleOrDefault();
                            tipoUso.Activo = false;
                            tipoUso.UsuarioModificacion = usuario.UsuarioID;
                            tipoUso.FechaModificacion = DateTime.Now;

                            ctx.SaveChanges();

                            result = new TransactionalInformation();
                            result.ReturnCode = 200;
                            result.ReturnStatus = true;
                            result.ReturnMessage.Add("OK");
                            result.IsAuthenicated = true;

                            return result;

                            #endregion
                        case 9: //Camion
                            #region

                            Sam3_TipoVehiculo tipoVehiculo = ctx.Sam3_TipoVehiculo.Where(x => x.TipoVehiculoID == id).AsParallel().SingleOrDefault();
                            tipoVehiculo.Activo = false;
                            tipoVehiculo.UsuarioModificacion = usuario.UsuarioID;
                            tipoVehiculo.FechaModificacion = DateTime.Now;

                            ctx.SaveChanges();

                            result = new TransactionalInformation();
                            result.ReturnCode = 200;
                            result.ReturnStatus = true;
                            result.ReturnMessage.Add("OK");
                            result.IsAuthenicated = true;

                            return result;

                            #endregion
                        case 10:  //fabricante
                            #region

                            Sam3_Fabricante fabricante = ctx.Sam3_Fabricante.Where(x => x.FabricanteID == id).AsParallel().SingleOrDefault();
                            fabricante.Activo = false;
                            fabricante.UsuarioModificacion = usuario.UsuarioID;
                            fabricante.FechaModificacion = DateTime.Now;

                            ctx.SaveChanges();

                            result = new TransactionalInformation();
                            result.ReturnCode = 200;
                            result.ReturnStatus = true;
                            result.ReturnMessage.Add("OK");
                            result.IsAuthenicated = true;

                            return result;

                            #endregion
                        default:
                            #region
                            TransactionalInformation resultado = new TransactionalInformation();
                            resultado.ReturnMessage.Add("Listado no encontrado");
                            resultado.ReturnCode = 500;
                            resultado.ReturnStatus = false;
                            resultado.IsAuthenicated = false;
                            return resultado;
                            #endregion
                    }
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }

        }

        /// <summary>
        /// Funcion para insertar un nuevo elemento del 
        /// catalogo seleccionado a la base de datos
        /// Catalogos ABC
        /// </summary>
        /// <param name="data">datos capturados en el grid</param>
        /// <param name="catalogoID">catalogo seleccionado</param>
        /// <param name="usuario">usuario actual</param>
        /// <returns>datos del elemento insertado</returns>
        public object InsertarElementoAlCatalogo(string data, string catalogoID, Sam3_Usuario usuario)
        {
            try
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                object res = new object();
                TransactionalInformation result = new TransactionalInformation();

                using (SamContext ctx = new SamContext())
                {
                    switch (Convert.ToInt32(catalogoID))
                    {
                        case 1: //Patios
                            #region
                            CatalogoPatio catalogoPatio = serializer.Deserialize<CatalogoPatio>(data);
                            Sam3_Patio patio = new Sam3_Patio();
                            patio.Nombre = catalogoPatio.Nombre;
                            patio.Descripcion = catalogoPatio.Descripcion;
                            patio.Propietario = catalogoPatio.Propietario;
                            patio.RequierePermisoAduana = Convert.ToBoolean(catalogoPatio.RequierePermisoAduana);

                            PatioBd.Instance.InsertarPatio(patio, usuario);

                            return new CatalogoPatio
                            {
                                PatioID = patio.PatioID.ToString(),
                                Nombre = patio.Nombre,
                                Descripcion = patio.Descripcion,
                                Propietario = patio.Propietario,
                                RequierePermisoAduana = patio.RequierePermisoAduana == true ? "Si" : "No"
                            };
                            #endregion
                        case 2: //Chofer
                            #region
                            CatalogoChofer catalogoChofer = serializer.Deserialize<CatalogoChofer>(data);
                            Sam3_Chofer chofer = new Sam3_Chofer();
                            chofer.Nombre = catalogoChofer.Nombre;
                            chofer.TransportistaID = Convert.ToInt32(catalogoChofer.TransportistaID);

                            ChoferBd.Instance.InsertarChofer(chofer, usuario);
                            return new CatalogoChofer
                            {
                                ChoferID = chofer.ChoferID.ToString(),
                                Nombre = chofer.Nombre,
                                TransportistaID = chofer.TransportistaID.ToString(),
                                TransportistaNombre = catalogoChofer.TransportistaNombre
                            };
                            #endregion
                        case 3: //Tipo Aviso
                            #region

                            Catalogos CatalogotipoAviso = serializer.Deserialize<Catalogos>(data);
                            Sam3_TipoAviso tipoAviso = new Sam3_TipoAviso();

                            tipoAviso.Nombre = CatalogotipoAviso.Nombre;
                            tipoAviso.Activo = true;
                            tipoAviso.UsuarioModificacion = usuario.UsuarioID;
                            tipoAviso.FechaModificacion = DateTime.Now;

                            ctx.Sam3_TipoAviso.Add(tipoAviso);
                            ctx.SaveChanges();

                            return new Catalogos
                            {
                                Id = tipoAviso.TipoAvisoID.ToString(),
                                Nombre = tipoAviso.Nombre
                            };

                            #endregion
                        case 4: //Transportista 
                            #region
                            CatalogoTransportista catalogoTransportista = serializer.Deserialize<CatalogoTransportista>(data);
                            Sam3_Transportista transportista = new Sam3_Transportista();

                            transportista.ContactoID = Convert.ToInt32(catalogoTransportista.ContactoID);
                            transportista.Nombre = catalogoTransportista.Nombre;
                            transportista.Descripcion = catalogoTransportista.Descripcion;
                            transportista.Direccion = catalogoTransportista.Direccion;
                            transportista.Telefono = catalogoTransportista.Telefono;

                            TransportistaBd.Instance.InsertarTransportista(transportista, usuario);

                            return new CatalogoTransportista
                            {
                                TransportistaID = transportista.TransportistaID.ToString(),
                                ContactoID = transportista.ContactoID.ToString(),
                                Contacto = catalogoTransportista.Contacto,
                                Descripcion = transportista.Descripcion,
                                Direccion = transportista.Direccion,
                                Nombre = transportista.Nombre,
                                Telefono = transportista.Telefono
                            };
                            #endregion
                        case 5: //Tracto
                            #region

                            VehiculoJson tracto = serializer.Deserialize<VehiculoJson>(data);
                            tracto.TipoVehiculoID = "1";
                            res = TractoBd.Instance.InsertarTracto(tracto, usuario);
                            return res;

                            #endregion
                        case 6: //Plana
                            #region

                            VehiculoJson plana = serializer.Deserialize<VehiculoJson>(data);
                            plana.TipoVehiculoID = "2";
                            res = PlanaBd.Instance.InsertarPlana(plana, usuario);

                            return res;

                            #endregion
                        case 7: //Proveedor
                            #region

                            CatalogoProveedor catalogoProveedor = serializer.Deserialize<CatalogoProveedor>(data);
                            Sam3_Proveedor proveedor = new Sam3_Proveedor();

                            proveedor.ContactoID = Convert.ToInt32(catalogoProveedor.ContactoID);
                            proveedor.Nombre = catalogoProveedor.Nombre;
                            proveedor.Descripcion = catalogoProveedor.Descripcion;
                            proveedor.Direccion = catalogoProveedor.Direccion;
                            proveedor.Telefono = catalogoProveedor.Telefono;

                            ProveedorBd.Instance.InsertarProveedor(proveedor, usuario);
                            return new CatalogoProveedor
                            {
                                Contacto = catalogoProveedor.Contacto,
                                ContactoID = proveedor.ContactoID.ToString(),
                                Nombre = proveedor.Nombre,
                                Descripcion = proveedor.Descripcion,
                                Direccion = proveedor.Direccion,
                                Telefono = proveedor.Telefono,
                                ProveedorID = proveedor.ProveedorID.ToString()
                            };

                            #endregion
                        case 8: //Tipo de uso
                            #region
                            Catalogos catalogoTipoUso = serializer.Deserialize<Catalogos>(data);
                            Sam3_TipoUso tipoUso = new Sam3_TipoUso();

                            if (!ctx.Sam3_TipoUso.Where(x => x.Nombre == catalogoTipoUso.Nombre).Any())
                            {
                                tipoUso.Activo = true;
                                tipoUso.FechaModificacion = DateTime.Now;
                                tipoUso.Nombre = catalogoTipoUso.Nombre; ;
                                tipoUso.UsuarioModificacion = usuario.UsuarioID;

                                ctx.Sam3_TipoUso.Add(tipoUso);
                                ctx.SaveChanges();
                            }

                            return new Catalogos
                            {
                                Id = tipoUso.TipoUsoID.ToString(),
                                Nombre = tipoUso.Nombre
                            };

                            #endregion
                        case 9: //Camion
                            #region

                            Catalogos catalogosVehiculo = serializer.Deserialize<Catalogos>(data);
                            Sam3_TipoVehiculo vehiculo = new Sam3_TipoVehiculo();

                            vehiculo.Nombre = catalogosVehiculo.Nombre;

                            vehiculo.Activo = true;
                            vehiculo.FechaModificacion = DateTime.Now;
                            vehiculo.UsuarioModificacion = usuario.UsuarioID;

                            ctx.Sam3_TipoVehiculo.Add(vehiculo);
                            ctx.SaveChanges();

                            return new Catalogos
                            {
                                Id = vehiculo.TipoVehiculoID.ToString(),
                                Nombre = vehiculo.Nombre
                            };

                            #endregion
                        case 10:  //fabricante
                            #region
                            CatalogoFabricante catalogoFabricante = serializer.Deserialize<CatalogoFabricante>(data);
                            Sam3_Fabricante fabricante = new Sam3_Fabricante();

                            fabricante.ContactoID = Convert.ToInt32(catalogoFabricante.ContactoID);
                            fabricante.Nombre = catalogoFabricante.Nombre;
                            fabricante.Descripcion = catalogoFabricante.Descripcion;
                            fabricante.Direccion = catalogoFabricante.Direccion;
                            fabricante.Telefono = catalogoFabricante.Telefono;

                            fabricante.Activo = true;
                            fabricante.UsuarioModificacion = usuario.UsuarioID;
                            fabricante.FechaModificacion = DateTime.Now;

                            ctx.Sam3_Fabricante.Add(fabricante);
                            ctx.SaveChanges();

                            return new CatalogoFabricante
                            {
                                FabricanteID = fabricante.FabricanteID.ToString(),
                                Contacto = catalogoFabricante.Contacto,
                                ContactoID = catalogoFabricante.ContactoID,
                                Nombre = fabricante.Nombre,
                                Descripcion = fabricante.Descripcion,
                                Direccion = fabricante.Direccion,
                                Telefono = fabricante.Telefono
                            };
                            #endregion

                        default:
                            #region
                            TransactionalInformation resultado = new TransactionalInformation();
                            resultado.ReturnMessage.Add("Listado no encontrado");
                            resultado.ReturnCode = 500;
                            resultado.ReturnStatus = false;
                            resultado.IsAuthenicated = false;
                            return resultado;
                            #endregion
                    }
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        /// <summary>
        /// Guardar nueva cedula
        /// </summary>
        /// <param name="data"></param>
        /// <param name="catalogoID"></param>
        /// <param name="factorConversion"></param>
        /// <param name="usuario"></param>
        /// <returns></returns>
        public object InsertarCedula(string data, string catalogoID, string factorConversion, Sam3_Usuario usuario)
        {
            try 
            {
                using (SamContext ctx = new SamContext())
                {
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    List<CatalogoCedulas> catalogoCedulas = serializer.Deserialize<List<CatalogoCedulas>>(data);
                    List<CatalogoCedulas> cedulasCorrectas = new List<CatalogoCedulas>();

                    bool existe = false;

                    foreach (CatalogoCedulas item in catalogoCedulas)
                    {
                        decimal factor = Convert.ToDecimal(factorConversion);

                        if (String.IsNullOrEmpty(item.Diametro1))
                        {
                            existe = (from ced in ctx.Sam3_Cedula
                                      where (ced.CedulaA == item.CedulaA ||
                                      ced.CedulaB == item.CedulaB ||
                                      ced.CedulaC == item.CedulaC)
                                      select ced.CedulaID).Any();

                            List<int> id = (from ced in ctx.Sam3_Cedula
                                            where (ced.CedulaA == item.CedulaA ||
                                            ced.CedulaB == item.CedulaB ||
                                            ced.CedulaC == item.CedulaC)
                                            select ced.CedulaID).AsParallel().ToList();
                        }
                        else
                        {
                            existe = (from ced in ctx.Sam3_Cedula
                                      where ced.Activo && ((ced.CedulaA == item.CedulaA ||
                                      ced.CedulaB == item.CedulaB ||
                                      ced.CedulaC == item.CedulaC) &&
                                      ced.Diametro.ToString() == item.Diametro1) ||
                                      ((ced.CedulaA == item.CedulaA ||
                                      ced.CedulaB == item.CedulaB ||
                                      ced.CedulaC == item.CedulaC) &&
                                      String.IsNullOrEmpty(ced.Diametro.ToString()))
                                      select ced.CedulaID).Any();

                            int id = (from ced in ctx.Sam3_Cedula
                                       where ced.Activo && ((ced.CedulaA == item.CedulaA ||
                                       ced.CedulaB == item.CedulaB ||
                                       ced.CedulaC == item.CedulaC) &&
                                       ced.Diametro.ToString() == item.Diametro1) ||
                                       ((ced.CedulaA == item.CedulaA ||
                                       ced.CedulaB == item.CedulaB ||
                                       ced.CedulaC == item.CedulaC) &&
                                       String.IsNullOrEmpty(ced.Diametro.ToString()))
                                       select ced.CedulaID).AsParallel().SingleOrDefault();
                        }
                        if (!existe) //Insert
                        {
                            Sam3_Cedula cedulas = new Sam3_Cedula();

                            cedulas.Diametro = String.IsNullOrEmpty(item.Diametro1) ? (int?)null : Convert.ToInt32(item.Diametro1);
                            cedulas.CedulaA = item.CedulaA;
                            cedulas.CedulaB = item.CedulaB;
                            cedulas.CedulaC = item.CedulaC;
                            cedulas.CedulaIn = String.IsNullOrEmpty(item.CedulaIn) ? Decimal.Parse((Decimal.Parse(item.CedulaMM) / factor).ToString("0.####")) : Decimal.Parse(item.CedulaIn);
                            cedulas.CedulaMM = String.IsNullOrEmpty(item.CedulaMM) ? Decimal.Parse((Decimal.Parse(item.CedulaIn) * factor).ToString("0.####")) : Decimal.Parse(item.CedulaMM);
                            cedulas.Espesor = Decimal.Parse(item.Espesor);
                            cedulas.Activo = true;
                            cedulas.UsuarioModificacion = usuario.UsuarioID;
                            cedulas.FechaModificacion = DateTime.Now;

                            ctx.Sam3_Cedula.Add(cedulas);
                            ctx.SaveChanges();

                            cedulasCorrectas.Add(new CatalogoCedulas
                            {
                                EstatusCorrecto = true,
                                Diametro1 = cedulas.Diametro.ToString(),
                                CedulaID = cedulas.CedulaID.ToString(),
                                CedulaA = cedulas.CedulaA,
                                CedulaB = cedulas.CedulaB,
                                CedulaC = cedulas.CedulaC,
                                CedulaIn = cedulas.CedulaIn.ToString(),
                                CedulaMM = cedulas.CedulaMM.ToString(),
                                Espesor = cedulas.Espesor.ToString()
                            });
                        }
                        else //Update
                        {
                            List<CatalogoCedulas> lista = new List<CatalogoCedulas>();

                            Sam3_Cedula cedula = ctx.Sam3_Cedula.Where(x => x.Activo &&
                            ((x.CedulaA == item.CedulaA ||
                                      x.CedulaB == item.CedulaB ||
                                      x.CedulaC == item.CedulaC) &&
                                      x.Diametro.ToString() == item.Diametro1) ||
                                      ((x.CedulaA == item.CedulaA ||
                                      x.CedulaB == item.CedulaB ||
                                      x.CedulaC == item.CedulaC) &&
                                      String.IsNullOrEmpty(x.Diametro.ToString()))).AsParallel().SingleOrDefault();


                                //(x.Diametro.ToString() == item.Diametro1 && (x.CedulaA == item.CedulaA ||
                                //x.CedulaB == item.CedulaB ||
                                //x.CedulaC == item.CedulaC)) ||
                                //(x.Diametro.ToString() == null &&
                                //(x.CedulaA == item.CedulaA ||
                                //x.CedulaB == item.CedulaB ||
                                //x.CedulaC == item.CedulaC))).AsParallel().FirstOrDefault();

                            cedula.Diametro = String.IsNullOrEmpty(item.Diametro1) ? (int?)null : Convert.ToInt32(item.Diametro1);
                            cedula.CedulaA = item.CedulaA;
                            cedula.CedulaB = item.CedulaB;
                            cedula.CedulaC = item.CedulaC;
                            cedula.CedulaIn = String.IsNullOrEmpty(item.CedulaIn) ? Decimal.Parse((Decimal.Parse(item.CedulaMM) / factor).ToString("0.####")) : Decimal.Parse(item.CedulaIn);
                            cedula.CedulaMM = String.IsNullOrEmpty(item.CedulaMM) ? Decimal.Parse((Decimal.Parse(item.CedulaIn) * factor).ToString("0.####")) : Decimal.Parse(item.CedulaMM);
                            cedula.Espesor = Decimal.Parse(item.Espesor);

                            cedula.Activo = true;
                            cedula.UsuarioModificacion = usuario.UsuarioID;
                            cedula.FechaModificacion = DateTime.Now;

                            ctx.SaveChanges();

                            cedulasCorrectas.Add(new CatalogoCedulas
                            {
                                EstatusCorrecto = false,
                                Diametro1 = cedula.Diametro.ToString(),
                                CedulaID = cedula.CedulaID.ToString(),
                                CedulaA = cedula.CedulaA,
                                CedulaB = cedula.CedulaB,
                                CedulaC = cedula.CedulaC,
                                CedulaIn = cedula.CedulaIn.ToString(),
                                CedulaMM = cedula.CedulaMM.ToString(),
                                Espesor = cedula.Espesor.ToString()
                            });
                        }
                    }

                    return cedulasCorrectas;
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        /// <summary>
        /// Funcion para validar si una cedula tiene conflictos
        /// Que afecte 
        /// </summary>
        /// <param name="data"></param>
        /// <param name="catalogoID"></param>
        /// <param name="usuario"></param>
        /// <returns></returns>
        public object validarCedulas(string data, string catalogoID, Sam3_Usuario usuario)
        {
            try
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                List<CatalogoCedulas> catalogoCedulas = serializer.Deserialize<List<CatalogoCedulas>>(data);
                List<CatalogoCedulas> cedulasEnBD = new List<CatalogoCedulas>();
                ValidarCedulas datos = new ValidarCedulas();
                datos.HayConflictos = false;

                using (SamContext ctx = new SamContext())
                {
                    foreach (CatalogoCedulas item in catalogoCedulas)
                    {


                        //existe = (from ced in ctx.Sam3_Cedula
                        //          where ced.Activo && ((ced.CedulaA == item.CedulaA ||
                        //          ced.CedulaB == item.CedulaB ||
                        //          ced.CedulaC == item.CedulaC) &&
                        //          ced.Diametro.ToString() == item.Diametro1) ||
                        //          ((ced.CedulaA == item.CedulaA ||
                        //          ced.CedulaB == item.CedulaB ||
                        //          ced.CedulaC == item.CedulaC) &&
                        //          String.IsNullOrEmpty(ced.Diametro.ToString()))
                        //          select ced.CedulaID).Any();





                        cedulasEnBD = (from c in ctx.Sam3_Cedula
                                       where c.Activo && ((c.CedulaA == item.CedulaA ||
                                  c.CedulaB == item.CedulaB ||
                                  c.CedulaC == item.CedulaC) &&
                                  c.Diametro.ToString() == item.Diametro1) ||
                                  ((c.CedulaA == item.CedulaA ||
                                  c.CedulaB == item.CedulaB ||
                                  c.CedulaC == item.CedulaC) &&
                                  String.IsNullOrEmpty(c.Diametro.ToString()))
                                       select new CatalogoCedulas 
                                       {
                                           CedulaID = c.CedulaID.ToString(),
                                           Diametro1 = c.Diametro.ToString(),
                                           CedulaA = c.CedulaA,
                                           CedulaB = c.CedulaB,
                                           CedulaC = c.CedulaC,
                                           CedulaIn = c.CedulaIn.ToString(),
                                           CedulaMM = c.CedulaMM.ToString(),
                                           Espesor = c.Espesor.ToString()
                                       }).AsParallel().ToList();

                        if (cedulasEnBD.Count > 1)
                        {
                            datos.HayConflictos = true;
                            datos.CedulasExistentes.AddRange(cedulasEnBD);
                            datos.CedulasNuevas.AddRange(catalogoCedulas);
                        }
                    }
                    return datos;
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }


        /// <summary>
        /// Se obtiene el factor de conversion 
        /// para el catalogo de Cedulas
        /// </summary>
        /// <param name="catalogoID">catalogo de cedulas</param>
        /// <returns>string con el dato del factor</returns>
        public object obtenerFactorConversion(string catalogoID)
        {
            try
            {
                string factor = ConfigurationManager.AppSettings["factorConversion"];

                return factor;
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        /// <summary>
        /// Se obtienen los datos del ICS para el Grid
        /// Pantalla Catalogo ICS
        /// </summary>
        /// <returns></returns>
        public object obtenerDatosCatalogoICS()
        {
            try
            {
                List<ICSDatosAsociacion> lista = new List<ICSDatosAsociacion>();
                using (SamContext ctx = new SamContext())
                {

                    lista = (from ics in ctx.Sam3_ItemCodeSteelgo
                             join g in ctx.Sam3_Grupo on ics.GrupoID equals g.GrupoID
                             join c in ctx.Sam3_Cedula on ics.CedulaID equals c.CedulaID
                             where ics.Activo && g.Activo && c.Activo
                             select new ICSDatosAsociacion
                             {
                                 ItemCodeSteelgoID = ics.ItemCodeSteelgoID.ToString(),
                                 Codigo = ics.Codigo,
                                 Descripcion = ics.DescripcionEspanol,
                                 DescripcionIngles = ics.DescripcionIngles,
                                 DescripcionLarga = ics.DescripcionLargaEspanol,
                                 DescripcionLargaIngles = ics.DescripcionLargaIngles,
                                 Diametro1 = ics.Diametro1.ToString(),
                                 Diametro2 = ics.Diametro2.ToString(),
                                 Grupo = g.Nombre,
                                 GrupoID = ics.GrupoID.ToString(),
                                 AceroID = ics.FamiliaAceroID.ToString(),
                                 CedulaID = ics.CedulaID.ToString(),
                                 CedulaA = c.CedulaA,
                                 CedulaB = c.CedulaB,
                                 Libra = c.CedulaC,
                                 Inch = c.CedulaIn.ToString(),
                                 MM = c.CedulaMM.ToString(),
                                 Espesor = c.Espesor.ToString(),
                                 Peso = ics.Peso.ToString(),
                                 Area = ics.Area.ToString()
                             }).AsParallel().ToList();
                }

                using (Sam2Context ctx2 = new Sam2Context())
                {
                    lista.ForEach(x =>
                        x.Acero = (from fa in ctx2.FamiliaAcero
                                   where fa.FamiliaAceroID.ToString() == x.AceroID
                                   select fa.Nombre).AsParallel().SingleOrDefault());
                }

                return lista;
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        /// <summary>
        /// Guarda la informacion del ICS
        /// Pantalla Catalogo ICS
        /// </summary>
        /// <param name="datos"></param>
        /// <returns></returns>
        public object guardarItemCodeSteelgo(ICSDatosAsociacion datos, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_ItemCodeSteelgo ICSteelgo = new Sam3_ItemCodeSteelgo();
                    ICSteelgo.Codigo = datos.Codigo;
                    ICSteelgo.DescripcionEspanol = datos.Descripcion;
                    ICSteelgo.DescripcionLargaEspanol = datos.DescripcionLarga;
                    ICSteelgo.DescripcionLargaIngles = datos.DescripcionLargaIngles;
                    ICSteelgo.DescripcionIngles = datos.DescripcionIngles;
                    ICSteelgo.Diametro1 = Convert.ToDecimal(datos.Diametro1);
                    ICSteelgo.Diametro2 = Convert.ToDecimal(datos.Diametro2);
                    ICSteelgo.GrupoID = Convert.ToInt32(datos.GrupoID);
                    ICSteelgo.CedulaID = Convert.ToInt32(datos.CedulaID);
                    ICSteelgo.Peso = Convert.ToDecimal(datos.Peso);
                    ICSteelgo.Area = Convert.ToInt32(datos.Area);
                    ICSteelgo.FamiliaAceroID = Convert.ToInt32(datos.AceroID);
                    ICSteelgo.Activo = true;
                    ICSteelgo.UsuarioModificacion = usuario.UsuarioID;
                    ICSteelgo.FechaModificacion = DateTime.Now;

                    ctx.Sam3_ItemCodeSteelgo.Add(ICSteelgo);

                    ctx.SaveChanges();

                    return new ICSDatosAsociacion
                    {
                        ItemCodeSteelgoID = ICSteelgo.ItemCodeSteelgoID.ToString(),
                        Codigo = ICSteelgo.Codigo,
                        Descripcion = ICSteelgo.DescripcionEspanol,
                        DescripcionLarga = ICSteelgo.DescripcionLargaEspanol,
                        DescripcionIngles = ICSteelgo.DescripcionIngles,
                        DescripcionLargaIngles = ICSteelgo.DescripcionLargaIngles,
                        Diametro1 = ICSteelgo.Diametro1.ToString(),
                        Diametro2 = ICSteelgo.Diametro2.ToString(),
                        Grupo = datos.Grupo,
                        Acero = datos.Acero,
                        CedulaA = datos.CedulaA,
                        CedulaB = datos.CedulaB,
                        Libra = datos.Libra,
                        Inch = datos.Inch,
                        MM = datos.MM,
                        Espesor = datos.Espesor,
                        Peso = ICSteelgo.Peso.ToString(),
                        Area = ICSteelgo.Area.ToString()
                    };
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        /// <summary>
        /// Funcion para obtener los datos de las cedulas para un item code steelgo
        /// catalogo item code steelgo
        /// </summary>
        /// <param name="datosCedulas"> </param>
        /// <returns></returns>
        public object obtenerCedulasICS(CatalogoCedulas datosCedulas)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    CatalogoCedulas cedula = new CatalogoCedulas();

                    List<CatalogoCedulas> lista = (from c in ctx.Sam3_Cedula
                                                   where c.Activo
                                                       //&& c.Diametro.ToString() == datosCedulas.Diametro
                                                   && (!String.IsNullOrEmpty(datosCedulas.CedulaA) ? c.CedulaA == datosCedulas.CedulaA :
                                                   !String.IsNullOrEmpty(datosCedulas.CedulaB) ? c.CedulaB == datosCedulas.CedulaB :
                                                   !String.IsNullOrEmpty(datosCedulas.CedulaC) ? c.CedulaC == datosCedulas.CedulaC : c.Diametro.ToString() == datosCedulas.Diametro1)
                                                   select new CatalogoCedulas
                                                   {
                                                       CedulaID = c.CedulaID.ToString(),
                                                       Diametro1 = c.Diametro.ToString(),
                                                       CedulaA = c.CedulaA,
                                                       CedulaB = c.CedulaB,
                                                       CedulaC = c.CedulaC,
                                                       CedulaIn = c.CedulaIn.ToString(),
                                                       CedulaMM = c.CedulaMM.ToString(),
                                                       Espesor = c.Espesor.ToString()
                                                   }).AsParallel().ToList();

                    cedula = lista.Where(x => x.Diametro1 == datosCedulas.Diametro1).Count() == 0 ?
                        lista.Where(x => x.Diametro1 == "").AsParallel().SingleOrDefault() :
                        lista.Where(x => x.Diametro1 == datosCedulas.Diametro1).AsParallel().SingleOrDefault();

                    return cedula;
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        /// <summary>
        /// Funcion para editar un item Code Steelgo
        /// Catalogo item code steelgo
        /// </summary>
        /// <param name="datos">datos a editar</param>
        /// <param name="usuario">usuario actual</param>
        /// <returns>datos editados</returns>
        public object editarItemCodeSteelgo(ICSDatosAsociacion datos, Sam3_Usuario usuario)
        {
            try 
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_ItemCodeSteelgo ics = ctx.Sam3_ItemCodeSteelgo.Where(x => x.ItemCodeSteelgoID.ToString() == datos.ItemCodeSteelgoID && x.Activo).AsParallel().SingleOrDefault();
                    ics.Codigo = datos.Codigo;
                    ics.DescripcionEspanol = datos.Descripcion;
                    ics.DescripcionIngles = datos.DescripcionIngles;
                    ics.DescripcionLargaEspanol = datos.DescripcionLarga;
                    ics.DescripcionLargaIngles = datos.DescripcionLargaIngles;
                    ics.Diametro1 = Decimal.Parse(datos.Diametro1);
                    ics.Diametro2 = Decimal.Parse(datos.Diametro2);
                    ics.GrupoID = Int32.Parse(datos.GrupoID);
                    ics.FamiliaAceroID = Int32.Parse(datos.AceroID);
                    ics.CedulaID = Int32.Parse(datos.CedulaID);
                    ics.Peso = Decimal.Parse(datos.Peso);
                    ics.Area = Int32.Parse(datos.Area);
                    ics.Activo = true;
                    ics.UsuarioModificacion = usuario.UsuarioID;
                    ics.FechaModificacion = DateTime.Now;

                    ctx.SaveChanges();

                    return new ICSDatosAsociacion
                    {
                        ItemCodeSteelgoID = ics.ItemCodeSteelgoID.ToString(),
                        Codigo = ics.Codigo,
                        Descripcion = ics.DescripcionEspanol,
                        DescripcionIngles = ics.DescripcionIngles,
                        DescripcionLarga = ics.DescripcionLargaEspanol,
                        DescripcionLargaIngles = ics.DescripcionLargaIngles,
                        Diametro1 = ics.Diametro1.ToString(),
                        Diametro2 = ics.Diametro2.ToString(),
                        GrupoID = ics.GrupoID.ToString(),
                        Grupo = datos.Grupo,
                        Acero = datos.Acero,
                        AceroID = ics.FamiliaAceroID.ToString(),
                        CedulaA = datos.CedulaA,
                        CedulaB = datos.CedulaB,
                        CedulaID = ics.CedulaID.ToString(),
                        Libra = datos.Libra,
                        Inch = datos.Inch,
                        MM = datos.MM,
                        Espesor = datos.Espesor,
                        Peso = ics.Peso.ToString(),
                        Area = ics.Area.ToString()
                    };
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        /// <summary>
        /// Funcion para eliminar un item code steelgo
        /// Catalogo item code steelgo
        /// </summary>
        /// <param name="id">id del elemento a eliminar</param>
        /// <param name="usuario">usuario actual</param>
        /// <returns></returns>
        public object EliminarItemCodeSteelgo(int id, Sam3_Usuario usuario)
        {
            try 
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_ItemCodeSteelgo ics = ctx.Sam3_ItemCodeSteelgo.Where(x => x.ItemCodeSteelgoID == id && x.Activo).AsParallel().SingleOrDefault();
                    ics.Activo = false;
                    ics.UsuarioModificacion = usuario.UsuarioID;
                    ics.FechaModificacion = DateTime.Now;

                    ctx.SaveChanges();

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnCode = 200;
                    result.ReturnStatus = true;
                    result.ReturnMessage.Add("OK");
                    result.IsAuthenicated = true;

                    return result;
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
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