using BackEndSAM.Models;
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

                    familiaMaterial.id = "12";
                    familiaMaterial.value = "Familia Material";
                    valoresCombo.Add(familiaMaterial);

                    familiaAcero.id = "13";
                    familiaAcero.value = "Familia Acero";
                    valoresCombo.Add(familiaAcero);

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

                        case 2: //Chofer
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

                        case 3: //Tipo Aviso
                            List<Catalogos> catTipoAviso = new List<Catalogos>();
                            catTipoAviso = (from ta in ctx.Sam3_TipoAviso
                                            where ta.Activo
                                            select new Catalogos
                                            {
                                                Id = ta.TipoAvisoID.ToString(),
                                                Nombre = ta.Nombre
                                            }).AsParallel().ToList();

                            return catTipoAviso;

                        case 4: //Transportista
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

                        case 5: //Tracto
                            List<CatalogoTracto> catTracto = new List<CatalogoTracto>();
                            catTracto = (from t in ctx.Sam3_Vehiculo
                                         where t.Activo
                                         && t.TipoVehiculoID == 1
                                         select new CatalogoTracto
                                         {
                                             VehiculoID = t.VehiculoID.ToString(),
                                             Placas = t.Placas,
                                             TarjetaCirculacion = t.TarjetaCirculacion,
                                             PolizaSeguro = t.PolizaSeguro
                                         }).AsParallel().ToList();

                            return catTracto;

                        case 6: //Plana
                            List<CatalogoPlana> catPlana = new List<CatalogoPlana>();
                            catPlana = (from v in ctx.Sam3_Vehiculo
                                        where v.Activo
                                        && v.TipoVehiculoID == 2
                                        select new CatalogoPlana
                                        {
                                            VehiculoID = v.VehiculoID.ToString(),
                                            Placas = v.Placas,
                                            Unidad = v.Unidad,
                                            Modelo = v.Modelo,
                                            TractoID = v.TractoID == -1 ? "" : v.TractoID.ToString()
                                        }).AsParallel().ToList();

                            return catPlana;

                        case 7: //Proveedor
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

                        case 8: //Tipo de Uso
                            List<Catalogos> catTipoUso = new List<Catalogos>();
                            catTipoUso = (from tu in ctx.Sam3_TipoUso
                                          where tu.Activo
                                          select new Catalogos
                                          {
                                              Id = tu.TipoUsoID.ToString(),
                                              Nombre = tu.Nombre
                                          }).AsParallel().ToList();

                            return catTipoUso;

                        case 9: //Camion
                            List<Catalogos> catCamion = new List<Catalogos>();
                            catCamion = (from v in ctx.Sam3_TipoVehiculo

                                         where v.Activo
                                         select new Catalogos
                                         {
                                             Id = v.TipoVehiculoID.ToString(),
                                             Nombre = v.Nombre
                                         }).AsParallel().ToList();

                            return catCamion;

                        case 10: //Acero
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

                        case 11: //Coladas
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

                        case 12: //Familia Material
                            List<CatalogoFamiliaMaterial> catFamiliaMaterial = new List<CatalogoFamiliaMaterial>();
                            catFamiliaMaterial = (from fm in ctx.Sam3_FamiliaMaterial
                                               where fm.Activo
                                               select new CatalogoFamiliaMaterial
                                               {
                                                   FamiliaMaterialID = fm.FamiliaMaterialID.ToString(),
                                                   Nombre = fm.Nombre,
                                                   Descripcion = fm.Descripcion
                                               }).AsParallel().ToList();

                            return catFamiliaMaterial;

                        case 13: //Familia Acero
                            List<CatalogoFamiliaAcero> catFamiliaAcero = new List<CatalogoFamiliaAcero>();
                            catFamiliaAcero = (from fa in ctx.Sam3_FamiliaAcero
                                               join fm in ctx.Sam3_FamiliaMaterial on fa.FamiliaMaterialID equals fm.FamiliaMaterialID
                                               where fa.Activo && fm.Activo
                                               select new CatalogoFamiliaAcero
                                               {
                                                   FamiliaAceroID = fa.FamiliaAceroID.ToString(),
                                                   FamiliaMaterialID = fm.FamiliaMaterialID.ToString(),
                                                   FamiliaMaterial = fm.Nombre,
                                                   Nombre = fa.Nombre,
                                                   Descripcion = fa.Descripcion,
                                                   VerificadoPorCalidad = fa.VerificadoPorCalidad == true ? "Si" : "No"
                                               }).AsParallel().ToList();

                            return catFamiliaAcero;

                        case 14: //fabricante
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

                        default:
                            TransactionalInformation result = new TransactionalInformation();
                            result.ReturnMessage.Add("Listado no encontrado");
                            result.ReturnCode = 500;
                            result.ReturnStatus = false;
                            result.IsAuthenicated = false;
                            return result;
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

        public object actualizarCatalogo(string data, string catalogoID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    object res = new object();

                    switch (Convert.ToInt32(catalogoID))
                    {

                        case 1: //Patios
                          Sam3_Patio patio = serializer.Deserialize<Sam3_Patio>(data);

                          res = PatioBd.Instance.ActualizarPatio(patio, usuario);
                          return res;

                        case 2: //chofer
                          Sam3_Chofer chofer = serializer.Deserialize<Sam3_Chofer>(data);

                          res = ChoferBd.Instance.ActualizarChofer(chofer, usuario);

                          return chofer;
                        //case 3: //Tipo Aviso
                        //  break;
                        //case 4: //Transportista
                        //  break;
                        //case 5: //Tracto
                        //  break;
                        //case 6: //Plana
                        //  break;
                        //case 7: //Proveedor
                        //  break;
                        //case 8: //Tipo de uso
                        //  break;
                        //case 9: //Camion
                        //  break;
                        //case 10: //Acero
                        //  break;
                        //case 11: //Coladas
                        //  break;
                        //case 12: //Familia material
                        //  break;
                        //case 13: //Familia Acero
                        //  break;
                        //case 14: //fabricante
                        //  break;
                        default:
                            TransactionalInformation result = new TransactionalInformation();
                            result.ReturnMessage.Add("Listado no encontrado");
                            result.ReturnCode = 500;
                            result.ReturnStatus = false;
                            result.IsAuthenicated = false;
                            return result;
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
    }
}