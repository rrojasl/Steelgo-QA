using System;
using System.Collections.Generic;
using System.Linq;
using DatabaseManager.Sam2;
using DatabaseManager.Sam3;
using BackEndSAM.Models;
using SecurityManager.Api.Models;

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

        /// <summary>
        /// Genera un set de datos para el grid de Avisos de entrada de material
        /// </summary>
        /// <param name="filtros"></param>
        /// <param name="usuario"></param>
        /// <returns></returns>
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
                                  && (r.FechaModificacion >= fechaInicial && r.FechaModificacion <= fechaFinal)
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
                            result = result.Where(x => x.Estatus == "").ToList();
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

        /// <summary>
        /// Genera el set de datos para la pantalla de detalle de entrada de material
        /// </summary>
        /// <param name="folio"></param>
        /// <param name="usuario"></param>
        /// <returns></returns>
        public object DetalleAvisoEntrada(int folio, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    DetalleAvisoEntradaJson detalle = new DetalleAvisoEntradaJson();
                    Sam3_FolioAvisoEntrada registro =  ctx.Sam3_FolioAvisoEntrada.Where(x => x.FolioAvisoLlegadaID == folio).AsParallel().SingleOrDefault();
                    Sam3_FolioAvisoLlegada FolioAvisoLlegada = ctx.Sam3_FolioAvisoLlegada.Where(x => x.FolioAvisoLlegadaID == folio).AsParallel().SingleOrDefault();

                    int ClienteFolioAvisoLlegada = FolioAvisoLlegada.ClienteID.GetValueOrDefault();
                    detalle.Cliente = (Models.Cliente)ClienteBd.Instance.ObtnerElementoClientePorID(ClienteFolioAvisoLlegada);

                    //devuelvo la lista de proyectos registrados en la relacion de aviso de llegada
                    detalle.Proyectos = (from r in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto
                                         join f in ctx.Sam3_FolioAvisoLlegada on r.FolioAvisoLlegadaID equals f.FolioAvisoLlegadaID
                                         join p in ctx.Sam3_Proyecto on r.ProyectoID equals p.ProyectoID
                                         where r.Activo && f.Activo && p.Activo
                                         && r.FolioAvisoLlegadaID == folio
                                         select r.ProyectoID).AsParallel().ToList();

                    if (registro != null)
                    {

                        int ClienteID= registro.ClienteID!=null? registro.ClienteID: ClienteFolioAvisoLlegada;
                        detalle.Cliente = (Models.Cliente)ClienteBd.Instance.ObtnerElementoClientePorID(ClienteFolioAvisoLlegada);

                        //detalle.Cliente = (from c in ctx.Sam3_Cliente
                        //                   where c.ClienteID == ClienteID
                        //                   select new Models.Cliente
                        //                   {
                        //                       ClienteID = c.ClienteID.ToString(),
                        //                       Nombre = c.Nombre
                        //                   }).AsParallel().SingleOrDefault();

                        detalle.Documentos = (from d in ctx.Sam3_Rel_FolioAvisoEntrada_Documento
                                              where d.FolioAvisoEntradaID == registro.FolioAvisoEntradaID && d.Activo
                                              select new ListaDocumentos
                                              {
                                                  DocumentoID = d.Rel_FolioAvisoEntrada_DocumentoID.ToString(),
                                                  Nombre = d.Nombre,
                                                  Extencion = d.Extencion,
                                                  TipoArchivo = d.TipoArchivoID.ToString(),
                                                  Url = d.Url,
                                                  Descripcion = d.Descripcion
                                              }).AsParallel().ToList();
                        detalle.FolioAvisoEntradaID = registro.FolioAvisoEntradaID;
                        detalle.Estatus = registro.Estatus;
                        detalle.Factura = registro.Factura;
                        detalle.FolioAvisollegadaId = registro.FolioAvisoLlegadaID.HasValue ? registro.FolioAvisoLlegadaID.Value : 0;
                        detalle.OrdenCompra = registro.OrdenCompra;
                        detalle.FechaFinDescarga = registro.FechaFinDescarga;
                        detalle.FechaGeneracionDescarga = registro.FechaFolioDescarga;
                        detalle.FechaInicioDescarga = registro.FechainicioDescarga;
                        detalle.FolioDescarga = registro.FolioDescarga;
                        detalle.ComboEstatus = registro.ComboEstatus;

                        detalle.Patio = (from p in ctx.Sam3_Patio
                                         where p.Activo && p.PatioID == registro.Sam3_FolioAvisoLlegada.PatioID
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

                    }
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

        /// <summary>
        /// Inserta un nuevo registro de folio de aviso de entrada de material
        /// </summary>
        /// <param name="json"></param>
        /// <param name="usuario"></param>
        /// <returns></returns>
        public object InsertarFolioAvisoEntrada(FolioAvisoEntradaJson json, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    int consecutivo = 0;
                    if (ctx.Sam3_FolioAvisoEntrada.Select(x => x.Consecutivo).Any())
                    {
                        consecutivo = (from r in ctx.Sam3_FolioAvisoEntrada
                                       select r.Consecutivo).Max().Value;
                        consecutivo = consecutivo + 1;
                    }
                    else
                    {
                        consecutivo = 1;
                    }
                     

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
                    nuevo.Estatus = json.Estatus;
                    nuevo.Factura = json.Factura;
                    nuevo.FechaModificacion = DateTime.Now;
                    nuevo.FolioAvisoLlegadaID = json.FolioAvisollegadaId;
                    nuevo.OrdenCompra = json.OrdenCompra;
                    nuevo.PatioID = (from fa in ctx.Sam3_FolioAvisoLlegada
                                     where fa.Activo && fa.FolioAvisoLlegadaID == json.FolioAvisollegadaId
                                     select fa.PatioID).AsParallel().SingleOrDefault();
                    nuevo.ProveedorID = json.ProveedorID;
                    nuevo.UsuarioModificacion = usuario.UsuarioID;
                    nuevo.ComboEstatus = json.ComboEstatus;
                    nuevo.FechaCreacion = DateTime.Now;

                    ctx.Sam3_FolioAvisoEntrada.Add(nuevo);
                    ctx.SaveChanges();

                    if (json.Proyectos.Count > 0)
                    {
                        foreach (int i in json.Proyectos)
                        {
                            if (!ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto.Where(x => x.FolioAvisoLlegadaID == json.FolioAvisollegadaId
                                && x.ProyectoID == i).AsParallel().Any())
                            {
                                Sam3_Rel_FolioAvisoLlegada_Proyecto nFolioProyecto = new Sam3_Rel_FolioAvisoLlegada_Proyecto();
                                nFolioProyecto.Activo = true;
                                nFolioProyecto.ProyectoID = i;
                                nFolioProyecto.FolioAvisoLlegadaID = json.FolioAvisollegadaId;
                                nFolioProyecto.FechaModificacion = DateTime.Now;
                                nFolioProyecto.UsuarioModificacion = usuario.UsuarioID;
                                ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto.Add(nFolioProyecto);
                            }
                        }
                    }

                    ctx.SaveChanges();

                    Sam3_FolioAvisoLlegada FolioAvisoLlegada = ctx.Sam3_FolioAvisoLlegada.Where(x => x.FolioAvisoLlegadaID == json.FolioAvisollegadaId).AsParallel().SingleOrDefault();
                    FolioAvisoLlegada.ClienteID = json.ClienteId;
                    FolioAvisoLlegada.FechaModificacion = DateTime.Now;
                    FolioAvisoLlegada.UsuarioModificacion = usuario.UsuarioID;
                    ctx.SaveChanges();

                    if (!(bool)EnviarAvisosBd.Instance.EnviarNotificación(1,
                        string.Format("Se generó un nuevo aviso de Entrada para el folio {0} con fecha {1}",
                        nuevo.FolioAvisoLlegadaID, nuevo.FechaModificacion), usuario))
                    {
                        //Agregar error a la bitacora  PENDIENTE
                    }

                    

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

        /// <summary>
        /// Actualiza las propiedades de un registro de folio de entrada de material
        /// </summary>
        /// <param name="json"></param>
        /// <param name="usuario"></param>
        /// <returns></returns>
        public object ActualizarFolioEntrada(FolioAvisoEntradaJson json, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_FolioAvisoEntrada registroBd = ctx.Sam3_FolioAvisoEntrada
                        .Where(x => x.FolioAvisoEntradaID == json.FolioAvisoEntradaID).AsParallel().SingleOrDefault();
                    registroBd.ClienteID = json.ClienteId;
                    registroBd.Estatus = json.Estatus;
                    registroBd.Factura = json.Factura;
                    registroBd.FechaModificacion = DateTime.Now;
                    registroBd.FolioAvisoLlegadaID = json.FolioAvisollegadaId;
                    registroBd.OrdenCompra = json.OrdenCompra;
                    registroBd.PatioID = json.PatioID;
                    registroBd.ProveedorID = json.ProveedorID;
                    registroBd.UsuarioModificacion = usuario.UsuarioID;
                    registroBd.ComboEstatus = json.ComboEstatus;

                    //verificar y registrar los proyectos
                    if (json.Proyectos.Count > 0)
                    {
                        foreach (int i in json.Proyectos)
                        {
                            //si no existe registro del proyecto, se crea uno nuevo, de existir el proyecto se deja tal cual esta
                            if (!ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto.Where(x => x.FolioAvisoLlegadaID == registroBd.FolioAvisoLlegadaID 
                                && x.ProyectoID == i).AsParallel().Any())
                            {
                                Sam3_Rel_FolioAvisoLlegada_Proyecto nuevaRelProyecto = new Sam3_Rel_FolioAvisoLlegada_Proyecto();
                                nuevaRelProyecto.Activo = true;
                                nuevaRelProyecto.FechaModificacion = DateTime.Now;
                                nuevaRelProyecto.FolioAvisoLlegadaID = registroBd.FolioAvisoLlegadaID.Value;
                                nuevaRelProyecto.ProyectoID = i;
                                nuevaRelProyecto.UsuarioModificacion = usuario.UsuarioID;
                                ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto.Add(nuevaRelProyecto);
                            }
                        }
                    }

                    Sam3_FolioAvisoLlegada FolioAvisoLlegada = ctx.Sam3_FolioAvisoLlegada.Where(x => x.FolioAvisoLlegadaID == json.FolioAvisollegadaId).AsParallel().SingleOrDefault();
                    FolioAvisoLlegada.ClienteID = json.ClienteId;
                    FolioAvisoLlegada.FechaModificacion = DateTime.Now;
                    FolioAvisoLlegada.UsuarioModificacion = usuario.UsuarioID;
                    

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

        /// <summary>
        /// Elimina logicamente un aviso de entrada de material
        /// </summary>
        /// <param name="folio"></param>
        /// <param name="usuario"></param>
        /// <returns></returns>
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

        /// <summary>
        /// Verifica si un folio de aviso de entrada de material tiene orden de descarga
        /// </summary>
        /// <param name="folioAvisoEntradaID"></param>
        /// <param name="usuario"></param>
        /// <returns></returns>
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

        /// <summary>
        /// Genera un nuevo folio de descarga para un aviso de entrada de material
        /// </summary>
        /// <param name="folioAvisoEntradaID"></param>
        /// <param name="usuario"></param>
        /// <returns></returns>
        public object GenerarFolioDescarga(int folioAvisoEntradaID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    int consecutivo = 0;
                    if (ctx.Sam3_FolioAvisoEntrada.Select(x => x.FolioDescarga).Any())
                    {
                        consecutivo = ctx.Sam3_FolioAvisoEntrada.Select(x => x.FolioDescarga).Max();
                        consecutivo = consecutivo + 1;
                    }
                    else
                    {
                        consecutivo = 1;
                    }

                    Sam3_FolioAvisoEntrada registroBd = ctx.Sam3_FolioAvisoEntrada.Where(x => x.FolioAvisoEntradaID == folioAvisoEntradaID)
                        .AsParallel().SingleOrDefault();
                    registroBd.Estatus = "Orden de Descarga Generada";
                    registroBd.FolioDescarga = consecutivo;
                    registroBd.FechaFolioDescarga = DateTime.Now;
                    registroBd.FechaModificacion = DateTime.Now;
                    registroBd.FechainicioDescarga = DateTime.Now;
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

        public List<ListadoIncidencias> ListadoIncidencias(int clienteID, int proyectoID, List<int> proyectos, List<int> patios, List<int> incidenciaIDs
            , DateTime fechaInicial, DateTime fechaFinal )
        {
            try
            {
                List<ListadoIncidencias> listado;
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_FolioAvisoEntrada> registros = new List<Sam3_FolioAvisoEntrada>();
                    if (proyectoID > 0)
                    {
                        registros = (from fe in ctx.Sam3_FolioAvisoEntrada
                                     join rfp in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on fe.FolioAvisoLlegadaID equals rfp.FolioAvisoLlegadaID
                                     join p in ctx.Sam3_Proyecto on rfp.ProyectoID equals p.ProyectoID
                                     join pa in ctx.Sam3_Patio on p.PatioID equals pa.PatioID
                                     where fe.Activo && rfp.Activo && p.Activo && pa.Activo
                                     && proyectos.Contains(p.ProyectoID)
                                     && patios.Contains(pa.PatioID)
                                     && (fe.FechaCreacion >= fechaInicial && fe.FechaCreacion <= fechaFinal)
                                     && p.ProyectoID == proyectoID
                                     select fe).Distinct().AsParallel().ToList();
                    }
                    else
                    {
                        registros = (from fe in ctx.Sam3_FolioAvisoEntrada
                                     join rfp in ctx.Sam3_Rel_FolioAvisoLlegada_Proyecto on fe.FolioAvisoLlegadaID equals rfp.FolioAvisoLlegadaID
                                     join p in ctx.Sam3_Proyecto on rfp.ProyectoID equals p.ProyectoID
                                     join pa in ctx.Sam3_Patio on p.PatioID equals pa.PatioID
                                     where fe.Activo && rfp.Activo && p.Activo && pa.Activo
                                     && proyectos.Contains(p.ProyectoID)
                                     && patios.Contains(pa.PatioID)
                                     && (fe.FechaCreacion >= fechaInicial && fe.FechaCreacion <= fechaFinal)
                                     select fe).Distinct().AsParallel().ToList();
                    }

                    if (clienteID > 0)
                    {
                        registros = registros.Where(x => x.ClienteID == clienteID).ToList();
                    }

                    listado = (from r in registros
                               join rif in ctx.Sam3_Rel_Incidencia_FolioAvisoEntrada on r.FolioAvisoEntradaID equals rif.FolioAvisoEntradaID
                               join ind in ctx.Sam3_Incidencia on rif.IncidenciaID equals ind.IncidenciaID
                               join clas in ctx.Sam3_ClasificacionIncidencia on ind.ClasificacionID equals clas.ClasificacionIncidenciaID
                               join ti in ctx.Sam3_TipoIncidencia on ind.TipoIncidenciaID equals ti.TipoIncidenciaID
                               join us in ctx.Sam3_Usuario on ind.UsuarioID equals us.UsuarioID
                               where r.Activo && rif.Activo && ind.Activo && clas.Activo && ti.Activo
                               && incidenciaIDs.Contains(ind.IncidenciaID)
                               select new ListadoIncidencias
                               {
                                   Clasificacion = clas.Nombre,
                                   Estatus = ind.Estatus,
                                   FechaRegistro = ind.FechaCreacion.ToString(),
                                   FolioIncidenciaID = ind.IncidenciaID.ToString(),
                                   RegistradoPor = us.Nombre + " " + us.ApellidoPaterno,
                                   TipoIncidencia = ti.Nombre
                               }).Distinct().AsParallel().ToList();
                                                              
                }
                return listado;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}