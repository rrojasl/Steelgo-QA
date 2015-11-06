using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DatabaseManager.Sam3;
using DatabaseManager.Sam2;
using DatabaseManager.EntidadesPersonalizadas;
using BackEndSAM.Utilities;
using System.Web.Script.Serialization;
using BackEndSAM.Models;
using SecurityManager.Api.Models;
using System.Transactions;
using System.Globalization;

namespace BackEndSAM.DataAcces
{
    public class NumeroUnicoBd
    {
        private static readonly object _mutex = new object();
        private static NumeroUnicoBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private NumeroUnicoBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static NumeroUnicoBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new NumeroUnicoBd();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerInfoEtiquetas(int ordenRecepcionID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    int numeroDigitos = (from r in ctx.Sam3_OrdenRecepcion
                                         join rel in ctx.Sam3_Rel_OrdenRecepcion_ItemCode on r.OrdenRecepcionID equals rel.OrdenRecepcionID
                                         join i in ctx.Sam3_ItemCode on rel.ItemCodeID equals i.ItemCodeID
                                         join p in ctx.Sam3_ProyectoConfiguracion on i.ProyectoID equals p.ProyectoID
                                         where r.Activo && rel.Activo && i.Activo
                                         && r.OrdenRecepcionID == ordenRecepcionID
                                         select p.DigitosNumeroUnico).AsParallel().FirstOrDefault();

                    string formato = "D" + numeroDigitos.ToString();


                    List<InfoEtiquetaNumeroUnico> etiquetas = (from r in ctx.Sam3_NumeroUnico
                                                               join o in ctx.Sam3_Rel_OrdenRecepcion_ItemCode on r.ItemCodeID equals o.ItemCodeID
                                                               join it in ctx.Sam3_ItemCode on o.ItemCodeID equals it.ItemCodeID
                                                               join c in ctx.Sam3_Colada on r.ColadaID equals c.ColadaID
                                                               join p in ctx.Sam3_Proyecto on r.ProyectoID equals p.ProyectoID
                                                               where r.Activo && o.Activo
                                                               && o.OrdenRecepcionID == ordenRecepcionID
                                                               select new InfoEtiquetaNumeroUnico
                                                               {
                                                                   Cedula = r.Cedula,
                                                                   Certificado = c.NumeroCertificado,
                                                                   Colada = c.NumeroColada,
                                                                   Descripcion = it.DescripcionEspanol,
                                                                   Diametro1 = r.Diametro1.ToString(),
                                                                   Diametro2 = r.Diametro2.ToString(),
                                                                   ItemCode = it.Codigo,
                                                                   NumeroUnico = r.Prefijo + "-" + r.Consecutivo.ToString(),
                                                                   Proyecto = p.Nombre
                                                               }).AsParallel().ToList();

                    foreach (InfoEtiquetaNumeroUnico et in etiquetas)
                    {
                        List<string> elementos = et.NumeroUnico.Split('-').ToList();
                        int folio = Convert.ToInt32(elementos[1]);
                        et.NumeroUnico = elementos[0] + '-' + folio.ToString(formato);
                    }

#if DEBUG
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    string json = serializer.Serialize(etiquetas);
#endif

                    return etiquetas;
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

        public object ListadoNumerosUnicosCorte(int proyectoID, string busqueda, Sam3_Usuario usuario)
        {
            try
            {
                List<ListaComboNumeroUnicoCOrte> listado = new List<ListaComboNumeroUnicoCOrte>();
                using (SamContext ctx = new SamContext())
                {
                    using (Sam2Context ctx2 = new Sam2Context())
                    {

                        char[] elementosBusqueda = busqueda.ToCharArray();
                        List<string> buscar = new List<string>();
                        string temp = "%";
                        foreach (char i in elementosBusqueda)
                        {
                            buscar.Add(i.ToString());
                            temp += i + "%";
                        }

                        int sam2_proyectoID = ctx.Sam3_EquivalenciaProyecto.Where(x => x.Sam3_ProyectoID == proyectoID)
                            .Select(x => x.Sam2_ProyectoID).AsParallel().SingleOrDefault();

                        //Busco los numeros unicos con despachos pendientes en sam 2
                        List<int> sam2_NumerosUnicos = (from nu in ctx2.NumeroUnico
                                                        join odtm in ctx2.OrdenTrabajoMaterial on nu.NumeroUnicoID equals odtm.NumeroUnicoCongeladoID
                                                        join odts in ctx2.OrdenTrabajoSpool on odtm.OrdenTrabajoSpoolID equals odts.OrdenTrabajoSpoolID
                                                        join it in ctx2.ItemCode on nu.ItemCodeID equals it.ItemCodeID
                                                        where nu.ProyectoID == sam2_proyectoID
                                                        && odtm.CorteDetalleID == null && odtm.DespachoID == null
                                                        && !(from sh in ctx2.SpoolHold
                                                             where sh.SpoolID == odts.SpoolID
                                                             && (sh.Confinado || sh.TieneHoldCalidad || sh.TieneHoldIngenieria)
                                                             select sh).Any()
                                                        && it.TipoMaterialID == 1
                                                        && buscar.Any(x => nu.Codigo.Contains(x))
                                                        select nu.NumeroUnicoID).Distinct().AsParallel().ToList();

                        //ahora buscamos las equivalencias de esos numeros unicos en sam 3

                        List<int> sam3_NumerosUnicos = (from nueq in ctx.Sam3_EquivalenciaNumeroUnico
                                                        where nueq.Activo
                                                        && sam2_NumerosUnicos.Contains(nueq.Sam2_NumeroUnicoID)
                                                        select nueq.Sam3_NumeroUnicoID).Distinct().AsParallel().ToList();

                        listado = (from nu in ctx.Sam3_NumeroUnico
                                   join nus in ctx.Sam3_NumeroUnicoSegmento on nu.NumeroUnicoID equals nus.NumeroUnicoID
                                   where nu.Activo && nus.Activo
                                   && sam3_NumerosUnicos.Contains(nu.NumeroUnicoID)
                                   select new ListaComboNumeroUnicoCOrte
                                   {
                                       NumeroControlID = nu.NumeroUnicoID.ToString(),
                                       NumeroControl = nu.Prefijo + "-" + nu.Consecutivo + "-" + nus.Segmento
                                   }).Distinct().AsParallel().ToList();

                        Sam3_ProyectoConfiguracion configuracion = ctx.Sam3_ProyectoConfiguracion.Where(x => x.ProyectoID == proyectoID).AsParallel().SingleOrDefault();

                        foreach (ListaComboNumeroUnicoCOrte lst in listado)
                        {
                            string formato = "D" + configuracion.DigitosNumeroUnico.ToString();
                            string[] elementos = lst.NumeroControl.Split('-').ToArray();
                            int consecutivo = Convert.ToInt32(elementos[1]);
                            string codigo = elementos[0] + "-" + consecutivo.ToString(formato) + "-" + elementos[2];
                            lst.NumeroControl = codigo;
                        }
                    }
                }
                return listado;
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

        public object DetalleNumeroUnicoCorte(int numeroUnicoID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    return (from nu in ctx.Sam3_NumeroUnico
                            join nui in ctx.Sam3_NumeroUnicoInventario on nu.NumeroUnicoID equals nui.NumeroUnicoID
                            join it in ctx.Sam3_ItemCode on nu.ItemCodeID equals it.ItemCodeID
                            join pc in ctx.Sam3_ProyectoConfiguracion on nu.ProyectoID equals pc.ProyectoID
                            where nu.Activo && nui.Activo && it.Activo && pc.Activo
                            && nu.NumeroUnicoID == numeroUnicoID
                            select new DetalleNumeroUnicoCorte
                            {
                                Cantidad = nui.InventarioFisico.ToString(),
                                D1 = nu.Diametro1.ToString(),
                                ItemCode = it.Codigo,
                                Tolerancia = pc.ToleranciaCortes.Value.ToString()
                            }).Distinct().AsParallel().SingleOrDefault();
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

        public object ListadoNumeroUnicoComboGridDespacho(string numeroControl, string etiqueta, string itemcode, int proyectoID, Sam3_Usuario usuario)
        {
            try
            {
                List<ListaCombos> listado = new List<ListaCombos>();
                using (SamContext ctx = new SamContext())
                {
                    using (Sam2Context ctx2 = new Sam2Context())
                    {
                        List<int> sam2_NumerosUnicosIDs = (from odts in ctx2.OrdenTrabajoSpool
                                                           join odt in ctx2.OrdenTrabajo on odts.OrdenTrabajoID equals odt.OrdenTrabajoID
                                                           join ms in ctx2.MaterialSpool on odts.SpoolID equals ms.SpoolID
                                                           join it in ctx2.ItemCode on ms.ItemCodeID equals it.ItemCodeID
                                                           join nu in ctx2.NumeroUnico on it.ItemCodeID equals nu.ItemCodeID
                                                           join nui in ctx2.NumeroUnicoInventario on nu.NumeroUnicoID equals nui.NumeroUnicoID
                                                           where ms.Etiqueta == etiqueta
                                                           && odts.NumeroControl == numeroControl
                                                           && it.TipoMaterialID == 2
                                                           && it.Codigo == itemcode
                                                           && odt.ProyectoID == proyectoID
                                                           && ms.Diametro1 == nu.Diametro1
                                                           && ms.Diametro2 == nu.Diametro2
                                                           select nu.NumeroUnicoID).Distinct().AsParallel().ToList();

                        listado = (from nu in ctx.Sam3_NumeroUnico
                                   join nueq in ctx.Sam3_EquivalenciaNumeroUnico on nu.NumeroUnicoID equals nueq.Sam3_NumeroUnicoID
                                   where nu.Activo && nueq.Activo
                                   && sam2_NumerosUnicosIDs.Contains(nueq.Sam2_NumeroUnicoID)
                                   select new ListaCombos
                                   {
                                       id = nu.NumeroUnicoID.ToString(),
                                       value = nu.Prefijo + "-" + nu.Consecutivo
                                   }).Distinct().AsParallel().ToList();

                        foreach (ListaCombos lst in listado)
                        {
                            string[] elementos = lst.value.Split('-');

                            int temp = Convert.ToInt32(lst.id);

                            int digitos = (from nu in ctx.Sam3_NumeroUnico
                                           join p in ctx.Sam3_ProyectoConfiguracion on nu.ProyectoID equals p.ProyectoID
                                           where nu.Activo && p.Activo
                                           && nu.NumeroUnicoID == temp
                                           select p.DigitosNumeroUnico).AsParallel().SingleOrDefault();

                            string formato = "D" + digitos.ToString();
                            int consecutivo = Convert.ToInt32(elementos[1]);

                            lst.value = elementos[0] + "-" + consecutivo.ToString(formato);

                        }
                    }
                }
                return listado;
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

        public List<ListadoIncidencias> ListadoIncidencias(int clienteID, int proyectoID, List<int> proyectos, List<int> patios, List<int> IDs)
        {
            try
            {
                List<ListadoIncidencias> listado;
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_NumeroUnico> registros = new List<Sam3_NumeroUnico>();

                    if (proyectoID > 0)
                    {
                        registros = (from nu in ctx.Sam3_NumeroUnico
                                     join p in ctx.Sam3_Proyecto on nu.ProyectoID equals p.ProyectoID
                                     join pa in ctx.Sam3_Patio on p.PatioID equals pa.PatioID
                                     where nu.Activo && p.Activo && pa.Activo
                                     && proyectos.Contains(p.ProyectoID)
                                     && patios.Contains(pa.PatioID)
                                     && p.ProyectoID == proyectoID
                                     && IDs.Contains(nu.NumeroUnicoID)
                                     select nu).AsParallel().Distinct().ToList();
                    }
                    else
                    {
                        registros = (from nu in ctx.Sam3_NumeroUnico
                                     join p in ctx.Sam3_Proyecto on nu.ProyectoID equals p.ProyectoID
                                     join pa in ctx.Sam3_Patio on p.PatioID equals pa.PatioID
                                     where nu.Activo && p.Activo && pa.Activo
                                     && proyectos.Contains(p.ProyectoID)
                                     && patios.Contains(pa.PatioID)
                                     && IDs.Contains(nu.NumeroUnicoID)
                                     select nu).AsParallel().Distinct().ToList();
                    }

                    if (clienteID > 0)
                    {
                        int sam3Cliente = (from c in ctx.Sam3_Cliente
                                           where c.Activo && c.Sam2ClienteID == clienteID
                                           select c.ClienteID).AsParallel().SingleOrDefault();
                        registros = (from r in registros
                                     join p in ctx.Sam3_Proyecto on r.ProyectoID equals p.ProyectoID
                                     where p.Activo
                                     && p.ClienteID == sam3Cliente
                                     select r).AsParallel().Distinct().ToList();
                    }

                    listado = (from r in registros
                               join rin in ctx.Sam3_Rel_Incidencia_NumeroUnico on r.NumeroUnicoID equals rin.NumeroUnicoID
                               join inc in ctx.Sam3_Incidencia on rin.IncidenciaID equals inc.IncidenciaID
                               join c in ctx.Sam3_ClasificacionIncidencia on inc.ClasificacionID equals c.ClasificacionIncidenciaID
                               join tpi in ctx.Sam3_TipoIncidencia on inc.TipoIncidenciaID equals tpi.TipoIncidenciaID
                               where rin.Activo && inc.Activo && c.Activo && tpi.Activo
                               select new ListadoIncidencias
                               {
                                   Clasificacion = c.Nombre,
                                   Estatus = inc.Estatus,
                                   TipoIncidencia = tpi.Nombre,
                                   RegistradoPor = (from us in ctx.Sam3_Usuario
                                                    where us.Activo && us.UsuarioID == inc.UsuarioID
                                                    select us.Nombre + " " + us.ApellidoPaterno).SingleOrDefault(),
                                   FolioIncidenciaID = inc.IncidenciaID.ToString(),
                                   FechaRegistro = inc.FechaCreacion.ToString()
                               }).AsParallel().Distinct().ToList();
                }
                return listado;
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                return null;
            }
        }
    }
}