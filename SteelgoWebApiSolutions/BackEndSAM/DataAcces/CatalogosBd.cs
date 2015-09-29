using BackEndSAM.Models;
using DatabaseManager.Sam2;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
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

                    Acero.id = "10";
                    Acero.value = "Acero";
                    valoresCombo.Add(Acero);

                    coladas.id = "11";
                    coladas.value = "Coladas";
                    valoresCombo.Add(coladas);

                    //familiaMaterial.id = "12";
                    //familiaMaterial.value = "Familia Material";
                    //valoresCombo.Add(familiaMaterial);

                    //familiaAcero.id = "13";
                    //familiaAcero.value = "Familia Acero";
                    //valoresCombo.Add(familiaAcero);

                    fabricante.id = "14";
                    fabricante.value = "Fabricante";
                    valoresCombo.Add(fabricante);

                    return valoresCombo;
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
                                            RequierePermiso = p.RequierePermisoAduana == true ? "Si" : "No"
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
                                         where t.Activo && rvch.Activo && rvt.Activo
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
                                        where v.Activo && rvch.Activo && rvt.Activo
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
                        case 10: //Acero
                            #region
                            List<CatalogoAcero> catAcero = new List<CatalogoAcero>();
                            catAcero = (from a in ctx.Sam3_Acero
                                        join fa in ctx.Sam3_FamiliaAcero on a.FamiliaAceroID equals fa.FamiliaAceroID
                                        where a.Activo && fa.Activo
                                        select new CatalogoAcero
                                        {
                                            AceroID = a.AceroID.ToString(),
                                            FAmiliaAceroID = fa.FamiliaAceroID.ToString(),
                                            FamiliaAcero = fa.Nombre,
                                            Nomenclatura = a.Nomenclatura,
                                            VerificadoPorCalidad = a.VerificadoPorCalidad == true ? "Si" : "No"
                                        }).AsParallel().ToList();

                            return catAcero;
                            #endregion
                        case 11: //Coladas
                            #region
                            List<CatalogoColadas> catColadas = new List<CatalogoColadas>();
                            catColadas = (from c in ctx.Sam3_Colada
                                          join f in ctx.Sam3_Fabricante on c.FabricanteID equals f.FabricanteID
                                          join a in ctx.Sam3_Acero on c.AceroID equals a.AceroID
                                          join p in ctx.Sam3_Proyecto on c.ProyectoID equals p.ProyectoID
                                          where f.Activo && a.Activo && p.Activo
                                          select new CatalogoColadas
                                          {
                                              ColadasID = c.ColadaID.ToString(),
                                              FabricanteID = f.FabricanteID.ToString(),
                                              Fabricante = f.Nombre,
                                              AceroID = a.AceroID.ToString(),
                                              Acero = a.Nomenclatura,
                                              ProyectoID = p.ProyectoID.ToString(),
                                              Proyecto = p.Nombre,
                                              NumeroColada = c.NumeroColada,
                                              NumeroCertificado = c.NumeroCertificado,
                                              HoldCalidad = c.HoldCalidad == true ? "Si" : "No"
                                          }).AsParallel().ToList();

                            return catColadas;
                            #endregion
                        case 14: //fabricante
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
        /// <param name="data"></param>
        /// <param name="catalogoID"></param>
        /// <param name="usuario"></param>
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

                            result.ReturnMessage.Add("OK");
                            result.ReturnCode = 200;
                            result.ReturnStatus = true;
                            result.IsAuthenicated = true;

                            return result;
                            #endregion
                        case 2: //chofer
                            #region
                            Sam3_Chofer chofer = serializer.Deserialize<Sam3_Chofer>(data);

                            Sam3_Chofer choferEnBd = ctx.Sam3_Chofer.Where(x => x.ChoferID == chofer.ChoferID && x.Activo).AsParallel().SingleOrDefault();
                            //choferEnBd.Activo = chofer.Activo != null && chofer.Activo != choferEnBd.Activo ?
                            //    chofer.Activo : choferEnBd.Activo;

                            choferEnBd.Nombre = chofer.Nombre != null && chofer.Nombre != choferEnBd.Nombre ?
                                chofer.Nombre : choferEnBd.Nombre;

                            choferEnBd.TransportistaID = chofer.TransportistaID != null && chofer.TransportistaID != choferEnBd.TransportistaID ?
                                chofer.TransportistaID : choferEnBd.TransportistaID;

                            choferEnBd.UsuarioModificacion = usuario.UsuarioID;

                            choferEnBd.FechaModificacion = DateTime.Now;

                            ctx.SaveChanges();

                            result.ReturnMessage.Add("OK");
                            result.ReturnCode = 200;
                            result.ReturnStatus = true;
                            result.IsAuthenicated = true;

                            return result;
                            #endregion
                        case 3: //Tipo Aviso
                            #region
                            Sam3_TipoAviso tipoAviso = serializer.Deserialize<Sam3_TipoAviso>(data);

                            Sam3_TipoAviso avisoEnBd = ctx.Sam3_TipoAviso.Where(x => x.TipoAvisoID == tipoAviso.TipoAvisoID && x.Activo).AsParallel().SingleOrDefault();

                            avisoEnBd.Nombre = tipoAviso.Nombre != null && tipoAviso.Nombre != avisoEnBd.Nombre ?
                                tipoAviso.Nombre : avisoEnBd.Nombre;

                            avisoEnBd.FechaModificacion = DateTime.Now;

                            avisoEnBd.UsuarioModificacion = usuario.UsuarioID;

                            ctx.SaveChanges();


                            result.ReturnMessage.Add("OK");
                            result.ReturnCode = 200;
                            result.ReturnStatus = true;
                            result.IsAuthenicated = true;

                            return result;
                            #endregion
                        case 4: //Transportista
                            #region
                            Sam3_Transportista transportista = serializer.Deserialize<Sam3_Transportista>(data);

                            Sam3_Transportista transEnBd = ctx.Sam3_Transportista.Where(x => x.TransportistaID == transportista.TransportistaID && x.Activo).AsParallel().SingleOrDefault();
                            transEnBd.ContactoID = transportista.ContactoID != null && transportista.ContactoID != transEnBd.ContactoID ?
                                transportista.ContactoID : transEnBd.ContactoID;

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

                            result.ReturnMessage.Add("OK");
                            result.ReturnCode = 200;
                            result.ReturnStatus = true;
                            result.IsAuthenicated = true;

                            return result;
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

                            result.ReturnMessage.Add("OK");
                            result.ReturnCode = 200;
                            result.ReturnStatus = true;
                            result.IsAuthenicated = true;

                            return result;
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

                            result.ReturnCode = 200;
                            result.ReturnStatus = true;
                            result.ReturnMessage.Add("OK");
                            result.IsAuthenicated = true;

                            return result;

                            #endregion
                        case 7: //Proveedor
                            #region
                            Sam3_Proveedor proveedor = serializer.Deserialize<Sam3_Proveedor>(data);

                            Sam3_Proveedor provEnBd = ctx.Sam3_Proveedor.Where(x => x.ProveedorID == proveedor.ProveedorID && x.Activo).AsParallel().SingleOrDefault();

                            provEnBd.ContactoID = proveedor.ContactoID != null && proveedor.ContactoID != provEnBd.ContactoID ?
                                proveedor.ContactoID : provEnBd.ContactoID;

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

                            result.ReturnMessage.Add("OK");
                            result.ReturnCode = 200;
                            result.ReturnStatus = true;
                            result.IsAuthenicated = true;

                            return result;
                            #endregion
                        case 8: //Tipo de uso
                            #region
                            Sam3_TipoUso tipoUso = serializer.Deserialize<Sam3_TipoUso>(data);

                            Sam3_TipoUso tipoUsoEnBd = ctx.Sam3_TipoUso.Where(x => x.TipoUsoID == tipoUso.TipoUsoID && x.Activo).AsParallel().SingleOrDefault();

                            tipoUsoEnBd.Nombre = tipoUso.Nombre != null && tipoUso.Nombre != tipoUsoEnBd.Nombre ?
                                tipoUso.Nombre : tipoUsoEnBd.Nombre;

                            tipoUsoEnBd.UsuarioModificacion = usuario.UsuarioID;

                            tipoUsoEnBd.FechaModificacion = DateTime.Now;

                            ctx.SaveChanges();

                            result.ReturnMessage.Add("OK");
                            result.ReturnCode = 200;
                            result.ReturnStatus = true;
                            result.IsAuthenicated = true;

                            return result;
                            #endregion
                        case 9: //Camion
                            #region
                            Sam3_TipoVehiculo camion = serializer.Deserialize<Sam3_TipoVehiculo>(data);

                            Sam3_TipoVehiculo camionEnBd = ctx.Sam3_TipoVehiculo.Where(x => x.TipoVehiculoID == camion.TipoVehiculoID && x.Activo).AsParallel().SingleOrDefault();
                            camionEnBd.Nombre = camion.Nombre != null && camion.Nombre != camionEnBd.Nombre ?
                                camion.Nombre : camionEnBd.Nombre;

                            camionEnBd.UsuarioModificacion = usuario.UsuarioID;

                            camionEnBd.FechaModificacion = DateTime.Now;

                            ctx.SaveChanges();

                            result.ReturnMessage.Add("OK");
                            result.ReturnCode = 200;
                            result.ReturnStatus = true;
                            result.IsAuthenicated = true;

                            return result;
                            #endregion
                        case 10: //Acero
                            #region
                            Sam3_Acero acero = serializer.Deserialize<Sam3_Acero>(data);

                            Sam3_Acero aceroEnBd = ctx.Sam3_Acero.Where(x => x.AceroID == acero.AceroID && x.Activo).AsParallel().SingleOrDefault();

                            aceroEnBd.FamiliaAceroID = acero.FamiliaAceroID != null && acero.FamiliaAceroID != aceroEnBd.FamiliaAceroID ?
                                acero.FamiliaAceroID : aceroEnBd.FamiliaAceroID;

                            aceroEnBd.Nomenclatura = acero.Nomenclatura != null && acero.Nomenclatura != aceroEnBd.Nomenclatura ?
                                acero.Nomenclatura : aceroEnBd.Nomenclatura;

                            aceroEnBd.VerificadoPorCalidad = acero.VerificadoPorCalidad != null && acero.VerificadoPorCalidad != aceroEnBd.VerificadoPorCalidad ?
                                acero.VerificadoPorCalidad : aceroEnBd.VerificadoPorCalidad;

                            aceroEnBd.UsuarioModificacion = usuario.UsuarioID;

                            aceroEnBd.FechaModificacion = DateTime.Now;

                            ctx.SaveChanges();

                            result.ReturnMessage.Add("OK");
                            result.ReturnCode = 200;
                            result.ReturnStatus = true;
                            result.IsAuthenicated = true;

                            return result;
                            #endregion
                        case 11: //Coladas
                            #region
                            Sam3_Colada colada = serializer.Deserialize<Sam3_Colada>(data);

                            Sam3_Colada coladaEnBd = ctx.Sam3_Colada.Where(x => x.ColadaID == colada.ColadaID && x.Activo).AsParallel().SingleOrDefault();

                            coladaEnBd.FabricanteID = colada.FabricanteID != null && colada.FabricanteID != coladaEnBd.FabricanteID ?
                                colada.FabricanteID : coladaEnBd.FabricanteID;

                            coladaEnBd.AceroID = colada.AceroID != null && colada.AceroID != coladaEnBd.AceroID ?
                                colada.AceroID : coladaEnBd.AceroID;

                            coladaEnBd.ProyectoID = colada.ProyectoID != null && colada.ProyectoID != coladaEnBd.ProyectoID ?
                                colada.ProyectoID : coladaEnBd.ProyectoID;

                            coladaEnBd.NumeroColada = colada.NumeroColada != null && colada.NumeroColada != coladaEnBd.NumeroColada ?
                                colada.NumeroColada : coladaEnBd.NumeroColada;

                            coladaEnBd.HoldCalidad = colada.HoldCalidad != null && colada.HoldCalidad != coladaEnBd.HoldCalidad ?
                                colada.HoldCalidad : coladaEnBd.HoldCalidad;

                            coladaEnBd.UsuarioModificacion = usuario.UsuarioID;

                            coladaEnBd.FechaModificacion = DateTime.Now;

                            ctx.SaveChanges();

                            result.ReturnMessage.Add("OK");
                            result.ReturnCode = 200;
                            result.ReturnStatus = true;
                            result.IsAuthenicated = true;

                            return result;
                            #endregion
                        case 14: //fabricante
                            #region
                            Sam3_Fabricante fabricante = serializer.Deserialize<Sam3_Fabricante>(data);

                            Sam3_Fabricante fabricanteEnBd = ctx.Sam3_Fabricante.Where(x => x.FabricanteID == fabricante.FabricanteID && fabricante.Activo).AsParallel().SingleOrDefault();

                            fabricanteEnBd.ContactoID = fabricante.ContactoID != null && fabricante.ContactoID != fabricanteEnBd.ContactoID ?
                                fabricante.ContactoID : fabricanteEnBd.ContactoID;

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

                            result.ReturnMessage.Add("OK");
                            result.ReturnCode = 200;
                            result.ReturnStatus = true;
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
        /// </summary>
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
                        case 10: //Aceros
                            #region

                            Sam3_Acero acero = ctx.Sam3_Acero.Where(x => x.AceroID == id).AsParallel().SingleOrDefault();
                            acero.Activo = false;
                            acero.UsuarioModificacion = usuario.UsuarioID;
                            acero.FechaModificacion = DateTime.Now;

                            ctx.SaveChanges();

                            result = new TransactionalInformation();
                            result.ReturnCode = 200;
                            result.ReturnStatus = true;
                            result.ReturnMessage.Add("OK");
                            result.IsAuthenicated = true;

                            return result;

                            #endregion
                        case 11: //Coladas
                            #region

                            Sam3_Colada colada = ctx.Sam3_Colada.Where(x => x.ColadaID == id).AsParallel().SingleOrDefault();
                            colada.Activo = false;
                            colada.UsuarioModificacion = usuario.UsuarioID;
                            colada.FechaModificacion = DateTime.Now;

                            ctx.SaveChanges();

                            result = new TransactionalInformation();
                            result.ReturnCode = 200;
                            result.ReturnStatus = true;
                            result.ReturnMessage.Add("OK");
                            result.IsAuthenicated = true;

                            return result;
                            #endregion
                        case 14:  //fabricante
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
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }

        }

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
                            patio.RequierePermisoAduana = Convert.ToBoolean(catalogoPatio.RequierePermiso);

                            res = PatioBd.Instance.InsertarPatio(patio, usuario);
                            return res;
                            #endregion
                        case 2: //Chofer
                            #region
                            CatalogoChofer catalogoChofer = serializer.Deserialize<CatalogoChofer>(data);
                            Sam3_Chofer chofer = new Sam3_Chofer();
                            chofer.Nombre = catalogoChofer.Nombre;
                            chofer.TransportistaID = Convert.ToInt32(catalogoChofer.TransportistaID);

                            res = ChoferBd.Instance.InsertarChofer(chofer, usuario);
                            return res;
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

                            result = new TransactionalInformation();
                            result.ReturnCode = 200;
                            result.ReturnStatus = true;
                            result.ReturnMessage.Add("OK");
                            result.IsAuthenicated = true;

                            return result;

                            #endregion
                        case 4: //Transportista 
                            #region
                            CatalogoTransportista catalogoTransportista = serializer.Deserialize<CatalogoTransportista>(data);
                            Sam3_Transportista transportista = new Sam3_Transportista();

                            transportista.ContactoID = Convert.ToInt32(catalogoTransportista.ContactoID);
                            transportista.Nombre = catalogoTransportista.Nombre;
                            transportista.Descripcion = catalogoTransportista.Descripcion;
                            transportista.Telefono = catalogoTransportista.Telefono;

                            res = TransportistaBd.Instance.InsertarTransportista(transportista, usuario);

                            return res;
                            #endregion
                        case 5: //Tracto
                            #region

                            VehiculoJson tracto = serializer.Deserialize<VehiculoJson>(data);
                            res = TractoBd.Instance.InsertarTracto(tracto, usuario);

                            return res;

                            #endregion
                        case 6: //Plana
                            #region

                            VehiculoJson plana = serializer.Deserialize<VehiculoJson>(data);
                            res = TractoBd.Instance.InsertarTracto(plana, usuario);

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

                            res = ProveedorBd.Instance.InsertarProveedor(proveedor, usuario);
                            return res;

                            #endregion
                        case 8: //Tipo de uso
                            #region


                            Catalogos catalogoTipoUso = serializer.Deserialize<Catalogos>(data);
                            Sam3_TipoUso tipoUso = new Sam3_TipoUso();

                            tipoUso.Nombre = catalogoTipoUso.Nombre;

                            res = TipoUsoBd.Instance.InsertarTipoUso(tipoUso.Nombre, usuario);

                            return res;

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

                            result = new TransactionalInformation();
                            result.ReturnCode = 200;
                            result.ReturnStatus = true;
                            result.ReturnMessage.Add("OK");
                            result.IsAuthenicated = true;

                            return result;

                            #endregion
                        case 10: //Aceros
                            #region

                            CatalogoAcero catalogoAcero = serializer.Deserialize<CatalogoAcero>(data);
                            Sam3_Acero acero = new Sam3_Acero();
                            acero.FamiliaAceroID = Convert.ToInt32(catalogoAcero.FAmiliaAceroID);
                            acero.Nomenclatura = catalogoAcero.Nomenclatura;
                            acero.VerificadoPorCalidad = Convert.ToBoolean(catalogoAcero.VerificadoPorCalidad);

                            acero.Activo = true;
                            acero.FechaModificacion = DateTime.Now;
                            acero.UsuarioModificacion = usuario.UsuarioID;

                            ctx.Sam3_Acero.Add(acero);
                            ctx.SaveChanges();

                            result = new TransactionalInformation();
                            result.ReturnCode = 200;
                            result.ReturnStatus = true;
                            result.ReturnMessage.Add("OK");
                            result.IsAuthenicated = true;

                            return result;

                            #endregion
                        case 11: //Coladas
                            #region
                            CatalogoColadas catalogoColadas = serializer.Deserialize<CatalogoColadas>(data);
                            Sam3_Colada colada = new Sam3_Colada();

                            colada.FabricanteID = Convert.ToInt32(catalogoColadas.FabricanteID);
                            colada.AceroID = Convert.ToInt32(catalogoColadas.AceroID);
                            colada.ProyectoID = Convert.ToInt32(catalogoColadas.ProyectoID);
                            colada.NumeroColada = catalogoColadas.NumeroColada;
                            colada.NumeroCertificado = catalogoColadas.NumeroCertificado;
                            colada.HoldCalidad = Convert.ToBoolean(catalogoColadas.HoldCalidad);

                            res = ColadaBd.Instance.GuardarColadaPopUp(colada, usuario);

                            return res;

                            #endregion
                        case 14:  //fabricante
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
                                 Diametro1 = ics.Diametro1.ToString(),
                                 Diametro2 = ics.Diametro2.ToString(),
                                 Grupo = g.Nombre,
                                 FamiliaAceroID = ics.FamiliaAceroID.ToString(),
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
                        x.TipoAcero = (from fa in ctx2.FamiliaAcero
                                       where fa.FamiliaAceroID.ToString() == x.FamiliaAceroID
                                       select fa.Nombre).AsParallel().SingleOrDefault());
                }

                return lista;
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

        /// <summary>
        /// Guarda la informacion del ICS
        /// Pantalla Catalogo ICS
        /// </summary>
        /// <param name="datos"></param>
        /// <returns></returns>
        public object guardarItemCodeSteelgo(ICSDatosAsociacion datos)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_ItemCodeSteelgo ICSteelgo = new Sam3_ItemCodeSteelgo();
                    ICSteelgo.Codigo = datos.Codigo;
                    ICSteelgo.DescripcionEspanol = datos.Descripcion;
                    ICSteelgo.DescripcionIngles = datos.DescripcionIngles;
                    ICSteelgo.Diametro1 = Convert.ToDecimal(datos.Diametro1);
                    ICSteelgo.Diametro2 = Convert.ToDecimal(datos.Diametro2);

                    ctx.Sam3_ItemCodeSteelgo.Add(ICSteelgo);

                    //Insertar grupo
                    //Sam3_grupo grupo = new Sam3_grupo();

                    //Insertar Cedulas
                    //Sam3_Cedula cedula = new Sam3_Cedula();

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
    }
}