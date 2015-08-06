using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DatabaseManager.Sam2;
using DatabaseManager.Sam3;
using DatabaseManager.EntidadesPersonalizadas;
using BackEndSAM.Utilities;
using System.Web.Script.Serialization;
using BackEndSAM.Models;
using SecurityManager.Api.Models;
using BackEndSAM.Utilities;
using System.Web.Mvc;
using System.Net.Http;
using System.Net;
using System.IO;
using System.Net.Http.Headers;

namespace BackEndSAM.DataAcces
{
    public class FolioAvisoEntradaBd
    {
         private static readonly object _mutex = new object();
        private static FolioAvisoEntradaBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private FolioAvisoEntradaBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static FolioAvisoEntradaBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new FolioAvisoEntradaBd();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerListadoAvisosEntrada(FiltrosJson filtros, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<int> lstFoliosAvisoEntrada = new List<int>();
                    DateTime fechaInicial = new DateTime();
                    DateTime fechaFinal = new DateTime();
                    DateTime.TryParse(filtros.FechaInicial, out fechaInicial);
                    DateTime.TryParse(filtros.FechaFinal, out fechaFinal);

                    List<int> patiosUsuario;
                    List<int> proyectosUsuario;
                    UsuarioBd.Instance.ObtenerPatiosYProyectosDeUsuario(usuario.UsuarioID, out proyectosUsuario, out patiosUsuario);
                    int patioID = filtros.PatioID != string.Empty ? Convert.ToInt32(filtros.PatioID) > 0 ? Convert.ToInt32(filtros.PatioID) : 0 : 0;
                    int clienteID = filtros.ClienteID != string.Empty ? Convert.ToInt32(filtros.ClienteID) > 0 ? Convert.ToInt32(filtros.ClienteID) : 0 :0;
                    int folioAvisoLlegadaID = filtros.FolioAvisoLlegadaID != string.Empty ? Convert.ToInt32(filtros.FolioAvisoLlegadaID) > 0 ?
                        Convert.ToInt32(filtros.FolioAvisoLlegadaID) : 0 : 0;
                    int folioEntradaID = filtros.FolioAvisoEntradaID != string.Empty ? Convert.ToInt32(filtros.FolioAvisoEntradaID) > 0 ?
                        Convert.ToInt32(filtros.FolioAvisoEntradaID) : 0 : 0;

                    if (fechaFinal.ToShortDateString() == "1/1/0001")
                    {
                        fechaFinal = DateTime.Now;
                    }

                    if (fechaInicial.ToShortDateString() == "1/1/0001")
                    {
                        int mes = DateTime.Now.Month != 1 ? DateTime.Now.Month - 1 : 12;
                        int year = DateTime.Now.Month == 1 ? DateTime.Now.Year - 1 : DateTime.Now.Year;
                        fechaInicial = new DateTime(year, mes, DateTime.Now.Day);
                    }

                    List<Sam3_FolioAvisoEntrada> result = new List<Sam3_FolioAvisoEntrada>();

                    if (folioEntradaID > 0)
                    {
                        result = (from r in ctx.Sam3_FolioAvisoEntrada
                                                 where r.Activo && r.FolioAvisoEntradaID == folioEntradaID
                                                 select r).AsParallel().ToList();
                    }
                    else
                    {
                        result = (from r in ctx.Sam3_FolioAvisoEntrada
                                  where r.Activo
                                  && (r.FechaModificacion >= fechaInicial.Date && r.FechaModificacion <= fechaFinal.Date)
                                  select r).AsParallel().ToList();

                        if (result.Count > 0)
                        {
                            if (folioAvisoLlegadaID > 0)
                            {
                                result = result.Where(x => x.FolioAvisoLlegadaID == folioAvisoLlegadaID).ToList();
                            }

                            if (clienteID > 0)
                            {
                                int temp = Convert.ToInt32(filtros.ClienteID);
                                result = result.Where(x => x.ClienteID == temp).ToList();
                            }

                            if (patioID > 0)
                            {
                                int temp = Convert.ToInt32(filtros.PatioID);
                                result = result.Where(x => x.PatioID == temp).ToList();
                            }
                        }
                    }

                    if (result.Count > 0)
                    {
                        if (filtros.PorLlegar)
                        {
                            result = result.Where(x => x.Estatus == string.Empty).ToList();
                        }

                        if (filtros.PorDescargar)
                        {
                            result = result.Where(x => x.FolioDescarga <= 0).ToList();
                        }

                        if (filtros.PorSalir)
                        {
                            result = (from r in result
                                      join f in ctx.Sam3_FolioAvisoLlegada on r.FolioAvisoLlegadaID equals f.FolioAvisoLlegadaID
                                      where r.Activo && f.Activo
                                      && f.PaseSalidaEnviado == false
                                      select r).AsParallel().ToList();
                        }
                    }

                    result = result.GroupBy(x => x.FolioAvisoEntradaID).Select(x => x.First()).ToList();

                    List<ElementoListadoFolioEntradaMaterial> elementos = new List<ElementoListadoFolioEntradaMaterial>();

                    foreach (Sam3_FolioAvisoEntrada folio in result)
                    {
                        ElementoListadoFolioEntradaMaterial nuevoElemento = new ElementoListadoFolioEntradaMaterial();
                        nuevoElemento.FolioAvisoEntradaID = folio.FolioAvisoEntradaID.ToString();
                        nuevoElemento.FolioAvisoLlegadaID = folio.FolioAvisoLlegadaID.ToString();
                        nuevoElemento.EstatusFolio = folio.Estatus;
                        nuevoElemento.Patio = folio.Sam3_Patio.Nombre;
                        nuevoElemento.FechaCreación = folio.FechaModificacion.Value.ToString("dd/MM/yyyy");

                        elementos.Add(nuevoElemento);
                    }

                    return elementos;
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

        public object DetalleAvisoEntrada(int folio, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    DetalleAvisoEntradaJson detalle = new DetalleAvisoEntradaJson();
                    Sam3_FolioAvisoEntrada registro =  ctx.Sam3_FolioAvisoEntrada.Where(x => x.FolioAvisoLlegadaID == folio).AsParallel().SingleOrDefault();

                    detalle.Cliente = (from c in ctx.Sam3_Cliente
                                       where c.ClienteID == registro.ClienteID
                                       select new Models.Cliente
                                       {
                                           ClienteID = c.ClienteID.ToString(),
                                           Nombre = c.Nombre
                                       }).AsParallel().SingleOrDefault();

                    detalle.Documentos = (from d in ctx.Sam3_Rel_FolioAvisoEntrada_Documento
                                          where d.FolioAvisoEntradaID == registro.FolioAvisoEntradaID
                                          select new ListaDocumentos
                                          {
                                              DocumentoID = d.Rel_FolioAvisoEntrada_DocumentoID.ToString(),
                                              Nombre = d.Nombre,
                                              Extencion = d.Extencion,
                                              TipoArchivo = d.TipoArchivoID.ToString(),
                                              Url = d.Url
                                          }).AsParallel().ToList();

                    detalle.Estatus = registro.Estatus;
                    detalle.Factura = registro.Factura;
                    detalle.FolioAvisollegadaId = registro.FolioAvisoLlegadaID.HasValue ? registro.FolioAvisoLlegadaID.Value : 0;
                    detalle.OrdenCompra = registro.OrdenCompra;
                    detalle.FechaFinDescarga = registro.FechaFinDescarga;
                    detalle.FechaGeneracionDescarga = registro.FechaFolioDescarga;
                    detalle.FechaInicioDescarga = registro.FechainicioDescarga;
                    detalle.FolioDescarga = registro.FolioDescarga;

                    detalle.Patio = (from p in ctx.Sam3_Patio
                                     where p.PatioID == registro.PatioID
                                     select new Models.Patio
                                     {
                                         PatioID = p.PatioID.ToString(),
                                         Nombre = p.Nombre
                                     }).AsParallel().SingleOrDefault();

                    detalle.Proveedor = (from p in ctx.Sam3_Proveedor
                                         where p.ProveedorID == registro.ProveedorID
                                         select new Models.Proveedor
                                         {
                                             ProveedorID = p.ProveedorID.ToString(),
                                             Nombre = p.Nombre
                                         }).AsParallel().SingleOrDefault();

                    detalle.Proyectos = (from r in ctx.Sam3_Rel_FolioAvisoEntrada_Proyecto
                                         join p in ctx.Sam3_Proyecto on r.ProyectoID equals p.ProyectoID
                                         where r.FolioAvisoEntradaID == registro.FolioAvisoEntradaID
                                         && r.Activo
                                         select new Models.Proyecto
                                         {
                                             ProyectoID = r.ProyectoID.ToString(),
                                             Nombre=p.Nombre
                                         }).AsParallel().SingleOrDefault();

                    return detalle;
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

        public object InsertarFolioAvisoEntrada(FolioAvisoEntradaJson json, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    int consecutivo = (from r in ctx.Sam3_FolioAvisoEntrada
                                       select r.Consecutivo).Max().Value;

                    Sam3_Cliente cliente = ctx.Sam3_Cliente.Where(x => x.Sam2ClienteID == json.ClienteId).AsParallel().SingleOrDefault();

                    if (cliente == null)
                    {
                        cliente = new Sam3_Cliente();
                        DatabaseManager.Sam2.Cliente clienteSam2;
                        using (Sam2Context ctx2 = new Sam2Context())
                        {
                            clienteSam2 = ctx2.Cliente.Where(x => x.ClienteID == json.ClienteId).AsParallel().SingleOrDefault();
                        }
                        cliente.Activo = true;
                        cliente.Ciudad = clienteSam2.Ciudad;
                        cliente.Direccion = clienteSam2.Direccion;
                        cliente.Estado = clienteSam2.Estado;
                        cliente.FechaModificacion = DateTime.Now;
                        cliente.Nombre = clienteSam2.Nombre;
                        cliente.Pais = clienteSam2.Pais;
                        cliente.Sam2ClienteID = clienteSam2.ClienteID;
                        cliente.UsuarioModificacion = usuario.UsuarioID;

                        ctx.Sam3_Cliente.Add(cliente);
                        ctx.SaveChanges();
                    }

                    Sam3_FolioAvisoEntrada nuevo = new Sam3_FolioAvisoEntrada();
                    nuevo.Activo = true;
                    nuevo.ClienteID = cliente.ClienteID;
                    nuevo.Consecutivo = consecutivo > 0 ? consecutivo : 1;
                    nuevo.Estatus = "Generado";
                    nuevo.Factura = json.Factura;
                    nuevo.FechaModificacion = DateTime.Now;
                    nuevo.FolioAvisoLlegadaID = json.FolioAvisollegadaId;
                    nuevo.OrdenCompra = json.OrdenCompra;
                    nuevo.PatioID = json.PatioID;
                    nuevo.ProveedorID = json.ProveedorID;
                    nuevo.UsuarioModificacion = usuario.UsuarioID;

                    ctx.Sam3_FolioAvisoEntrada.Add(nuevo);
                    ctx.SaveChanges();

                    if (json.ProyectoID > 0)
                    {
                        Sam3_Rel_FolioAvisoEntrada_Proyecto nFolioProyecto = new Sam3_Rel_FolioAvisoEntrada_Proyecto();
                        nFolioProyecto.Activo = true;
                        nFolioProyecto.ProyectoID = json.ProyectoID;
                        nFolioProyecto.FolioAvisoEntradaID = nuevo.FolioAvisoEntradaID;
                        nFolioProyecto.FechaModificacion = DateTime.Now;
                        nFolioProyecto.UsuarioModificacion = usuario.UsuarioID;
                        ctx.Sam3_Rel_FolioAvisoEntrada_Proyecto.Add(nFolioProyecto);
                    }

                    ctx.SaveChanges();

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("Ok");
                    result.ReturnMessage.Add(nuevo.FolioAvisoEntradaID.ToString());
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

        public object ActualizarFolioEntrada(FolioAvisoEntradaJson json, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_FolioAvisoEntrada registroBd = ctx.Sam3_FolioAvisoEntrada
                        .Where(x => x.FolioAvisoEntradaID == json.FolioAvisollegadaId).AsParallel().SingleOrDefault();
                    registroBd.ClienteID = json.ClienteId;
                    registroBd.Estatus = json.Estatus;
                    registroBd.Factura = json.Factura;
                    registroBd.FechaModificacion = DateTime.Now;
                    registroBd.FolioAvisoLlegadaID = json.FolioAvisollegadaId;
                    registroBd.OrdenCompra = json.OrdenCompra;
                    registroBd.PatioID = json.PatioID;
                    registroBd.ProveedorID = json.ProveedorID;
                    registroBd.UsuarioModificacion = usuario.UsuarioID;

                    if (!registroBd.Sam3_Rel_FolioAvisoEntrada_Proyecto.Where(x => x.ProyectoID == json.ProyectoID).Any())
                    {
                        Sam3_Rel_FolioAvisoEntrada_Proyecto nuevaRelProyecto = new Sam3_Rel_FolioAvisoEntrada_Proyecto();
                        nuevaRelProyecto.Activo = true;
                        nuevaRelProyecto.FechaModificacion = DateTime.Now;
                        nuevaRelProyecto.FolioAvisoEntradaID = registroBd.FolioAvisoEntradaID;
                        nuevaRelProyecto.ProyectoID = json.ProyectoID;
                        nuevaRelProyecto.UsuarioModificacion = usuario.UsuarioID;
                        ctx.Sam3_Rel_FolioAvisoEntrada_Proyecto.Add(nuevaRelProyecto);
                    }

                    ctx.SaveChanges();

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("Ok");
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

        public object EliminarFolioEntrada(int folio, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_FolioAvisoEntrada avisoBd = ctx.Sam3_FolioAvisoEntrada
                        .Where(x => x.FolioAvisoEntradaID == folio).AsParallel().SingleOrDefault();

                    avisoBd.Activo = false;
                    avisoBd.FechaModificacion = DateTime.Now;
                    avisoBd.UsuarioModificacion = usuario.UsuarioID;

                    ctx.SaveChanges();

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("Ok");
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

        public object TieneOrdenDescarga(int folioAvisoEntradaID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    int folio = ctx.Sam3_FolioAvisoEntrada.Where(x => x.FolioAvisoEntradaID == folioAvisoEntradaID)
                        .Select(x => x.FolioDescarga).SingleOrDefault();

                    return folio > 0 ? true : false; 
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

        public object GenerarFolioDescarga(int folioAvisoEntradaID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    int? consecutivo = ctx.Sam3_FolioAvisoEntrada.Select(x => x.FolioDescarga).Max();
                    consecutivo = consecutivo.HasValue ? consecutivo.Value + 1 : 1;
                    Sam3_FolioAvisoEntrada registroBd = ctx.Sam3_FolioAvisoEntrada.Where(x => x.FolioAvisoEntradaID == folioAvisoEntradaID)
                        .AsParallel().SingleOrDefault();
                    registroBd.Estatus = "Folio Descarga Generado";
                    registroBd.FolioDescarga = consecutivo.Value;
                    registroBd.FechaFolioDescarga = DateTime.Now;
                    registroBd.FechaModificacion = DateTime.Now;
                    registroBd.UsuarioModificacion = usuario.UsuarioID;
                    ctx.SaveChanges();

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("Ok");
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