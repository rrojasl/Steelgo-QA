using BackEndSAM.DataAcces;
using BackEndSAM.Models.Soldadura;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System;
using System.Collections.Generic;
using System.Data;
using System.Reflection;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;

namespace BackEndSAM.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class SoldaduraController : ApiController
    {
        [HttpGet]
        public object RetornaTrabajosAdicionales(int juntaSpoolID, string token)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                return CapturaSoldaduraBD.Instance.ObtenerTrabajosAdicionales(juntaSpoolID);
            }
            else
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(payload);
                result.ReturnCode = 401;
                result.ReturnStatus = false;
                result.IsAuthenicated = false;
                return result;
            }
        }


        public object Get(string data)
        {
            //Create a generic return object


            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(/*token*/data, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return CapturaSoldaduraBD.Instance.AgregarDetalleCapturaSoldadura(usuario);
            }
            else
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(payload);
                result.ReturnCode = 401;
                result.ReturnStatus = false;
                result.IsAuthenicated = false;
                return result;
            }

        }

        public object Get(string ordenTrabajo, int tipo, string token, string lenguaje)
        {
            //Create a generic return object
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                IdOrdenTrabajo idOrdenTrabajo = new IdOrdenTrabajo();

                List<Sam3_Steelgo_Get_SpoolID_Result> lista = (List<Sam3_Steelgo_Get_SpoolID_Result>)CapturaSoldaduraBD.Instance.ObtenerIDOrdenTrabajo(usuario, ordenTrabajo, tipo,lenguaje);
                List<IDS> listaAtatus = new List<IDS>();
                if (lista.Count > 0)
                {
                    foreach (var item in lista)
                    {
                        listaAtatus.Add(new IDS { Status = item.status, IDValido = item.ID, Proyecto = item.NombreProyecto, Valor = item.OrdenTrabajoSpoolID, ProyectoID = item.ProyectoID });
                    }

                    idOrdenTrabajo = new IdOrdenTrabajo
                    {
                        OrdenTrabajo = lista[0].OrdenTrabajo,
                        idStatus = listaAtatus
                    };
                }
                else
                {
                    idOrdenTrabajo = new IdOrdenTrabajo
                    {
                        OrdenTrabajo = "",
                        idStatus = listaAtatus
                    };
                };
                return idOrdenTrabajo;

            }
            else
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(payload);
                result.ReturnCode = 401;
                result.ReturnStatus = false;
                result.IsAuthenicated = false;
                return result;
            }

        }

        [HttpGet]
        public object ObtieneCamposPredeterminados(string token, string lenguaje)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                IdOrdenTrabajo idOrdenTrabajo = new IdOrdenTrabajo();

                string fecha = (string)CapturaSoldaduraBD.Instance.ObtenerValorFecha(usuario, lenguaje, 7);

                string muestra = (string)CapturaSoldaduraBD.Instance.ObtenerValorFecha(usuario, lenguaje, 14);

                string llena = (string)CapturaSoldaduraBD.Instance.ObtenerValorFecha(usuario, lenguaje, 15);

                string tipoCaptura = (string)CapturaSoldaduraBD.Instance.ObtenerValorFecha(usuario, lenguaje, 28);

                CamposPredeterminados armadoCamposPredeterminados = new CamposPredeterminados();

                armadoCamposPredeterminados = new CamposPredeterminados
                {
                    FechaSoldadura = fecha,
                    Muestra = muestra,
                    Llena = llena,
                    FormatoFecha = lenguaje == "es-MX" ? "dd/MM/yyyy" : "MM-dd-yyyy",
                    TipoCaptura = tipoCaptura
                };

                return armadoCamposPredeterminados;
            }
            else
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(payload);
                result.ReturnCode = 401;
                result.ReturnStatus = false;
                result.IsAuthenicated = false;
                return result;
            }
        }


        public object Get(string JsonCaptura, string lenguaje, string token)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                JsonCaptura = JsonCaptura.Replace("[","");
                JsonCaptura = JsonCaptura.Replace("]", "");
                JsonCaptura = JsonCaptura.Replace("},", "}°");

                string[] jsonArray = JsonCaptura.Split('°');
                List<DetalleDatosJsonSoldadura> listaDetalleDatos = new List<DetalleDatosJsonSoldadura>();

                foreach (string itemCaptura in jsonArray)
                {
                    DetalleDatosJsonSoldadura capturaDatosJson = serializer.Deserialize<DetalleDatosJsonSoldadura>(itemCaptura);
                    capturaDatosJson.SinCaptura = capturaDatosJson.SinCaptura == "Todos" ? "1" : "0";


                    List<Sam3_Soldadura_Get_DetalleJunta_Result> detalle = (List<Sam3_Soldadura_Get_DetalleJunta_Result>)CapturaSoldaduraBD.Instance.ObtenerDetalleSoldadura(capturaDatosJson, usuario, lenguaje);


                    foreach (Sam3_Soldadura_Get_DetalleJunta_Result item in detalle)
                    {
                        DetalleDatosJsonSoldadura detalleDatos = new DetalleDatosJsonSoldadura
                        {
                            PermiteTerminadoRaiz = bool.Parse( item.PermiteTerminadoRaiz.ToString()),
                            PermiteTerminadoRelleno = item.PermiteTerminadoRelleno,
                            DetalleJunta = "Tipo Junta: " + item.TipoJunta + " - " +  "Cedula: " + item.Cedula + " - " + "Localización: " + item.Localizacion,
                            EtiquetaMaterial1 = item.EtiquetaMaterial1,
                            EtiquetaMaterial2 = item.EtiquetaMaterial2,
                            Etiqueta = item.Etiqueta,
                            JuntaTrabajoID = item.JuntaTrabajoID.ToString(),
                            NumeroUnico1ID = item.NumeroUnico1ID == null ? "0" : item.NumeroUnico1ID.ToString(),
                            NumeroUnico2ID = item.NumeroUnico2ID == null ? "0" : item.NumeroUnico2ID.ToString(),
                            SoldadoresRaiz = item.SoldadoresRaiz,
                            SoldadoresRelleno = item.SoldadoresRelleno,
                            TipoJuntaID = item.TipoJuntaID.ToString(),
                            JuntaSoldaduraID = item.JuntaSoldaduraID == null ? 0 : int.Parse(item.JuntaSoldaduraID.ToString()),
                            Accion = item.JuntaSoldaduraID == null ? 1 : 2,
                            procesoSoldaduraRaizID = item.ProcesoSoldaduraRaizID == null ? 0 : int.Parse(item.ProcesoSoldaduraRaizID.ToString()),
                            procesoSoldaduraRellenoID = item.ProcesoSoldaduraRellenoID == null ? 0 : int.Parse(item.ProcesoSoldaduraRellenoID.ToString()),
                            procesoSoldaduraRaiz = item.CodigoRaiz == null ? "" : item.CodigoRaiz,
                            procesoSoldaduraRelleno = item.CodigoRelleno == null ? "" : item.CodigoRelleno,
                            TrabajosAdicionales = item.TabajosAdicionales,
                            Proyecto = capturaDatosJson.Proyecto,
                            IDProyecto = capturaDatosJson.IDProyecto,
                            IdOrdenTrabajo = capturaDatosJson.IdOrdenTrabajo,
                            OrdenTrabajo = capturaDatosJson.OrdenTrabajo,
                            idVal = capturaDatosJson.idVal,
                            idText = capturaDatosJson.idText,
                            SpoolID = capturaDatosJson.OrdenTrabajo + "-" + capturaDatosJson.idText,
                            JuntaID = capturaDatosJson.JuntaID,
                            Junta = capturaDatosJson.Junta,
                            TipoJunta = item.TipoJunta,
                            Cedula = item.Cedula,
                            Diametro = item.Diametro,
                            Espesor = decimal.Parse( item.Espesor.ToString()), 
                            TallerID = item.TallerID.GetValueOrDefault().ToString(),
                            Taller = item.Taller,
                            Localizacion = item.Localizacion,
                            TemplateMensajeTrabajosAdicionales = item.TabajosAdicionales,
                            juntaSpoolID = item.JuntaSpoolID,
                            FechaSoldadura = item.FechaSoldadura,
                            DetalleAdicional = GenerarTrabajoAdicionalJson((List<Sam3_Soldadura_Get_DetalleTrabajoAdicional_Result>)CapturaSoldaduraBD.Instance.DetallaSoldaduraAdicional(int.Parse(item.JuntaSpoolID.ToString()), usuario), item.JuntaSpoolID),
                            Raiz = GenerarRaizJson((List<Sam3_Soldadura_Get_DetalleSoldadorProceso_Result>)CapturaSoldaduraBD.Instance.DetallaRaizAdicional(int.Parse(item.JuntaSpoolID.ToString()), usuario), item.JuntaSpoolID),
                            RaizDetalle = GenerarRaizJson((List<Sam3_Soldadura_Get_DetalleSoldadorProceso_Result>)CapturaSoldaduraBD.Instance.DetallaRaizAdicional(int.Parse(item.JuntaSpoolID.ToString()), usuario), item.JuntaSpoolID),
                            RaizInicial = GenerarRaizJson((List<Sam3_Soldadura_Get_DetalleSoldadorProceso_Result>)CapturaSoldaduraBD.Instance.DetallaRaizAdicional(int.Parse(item.JuntaSpoolID.ToString()), usuario), item.JuntaSpoolID),
                            Relleno = GenerarRaizJson((List<Sam3_Soldadura_Get_DetalleSoldadorProceso_Result>)CapturaSoldaduraBD.Instance.DetallaRellenoAdicional(int.Parse(item.JuntaSpoolID.ToString()), usuario), item.JuntaSpoolID),
                            RellenoDetalle = GenerarRaizJson((List<Sam3_Soldadura_Get_DetalleSoldadorProceso_Result>)CapturaSoldaduraBD.Instance.DetallaRellenoAdicional(int.Parse(item.JuntaSpoolID.ToString()), usuario), item.JuntaSpoolID),
                            RellenoInicial = GenerarRaizJson((List<Sam3_Soldadura_Get_DetalleSoldadorProceso_Result>)CapturaSoldaduraBD.Instance.DetallaRellenoAdicional(int.Parse(item.JuntaSpoolID.ToString()), usuario), item.JuntaSpoolID),
                            listaTrabajosAdicionalesSoldadura = (List<TrabajosAdicionalesSoldadura>)CapturaSoldaduraBD.Instance.ObtenerTrabajosAdicionales(item.JuntaSpoolID),
                            ListadoRaiz = (List<SoldadorRaizCertificado>)CapturaSoldaduraBD.Instance.ObtenerListadoRaiz(item.ProcesoSoldaduraRaizID == null ? 0 : int.Parse(item.ProcesoSoldaduraRaizID.ToString()), item.TipoJunta,item.Diametro,decimal.Parse(item.Espesor.ToString()),item.Cedula,0, capturaDatosJson.IDProyecto),
                            ListadoRelleno = (List<SoldadorRaizCertificado>)CapturaSoldaduraBD.Instance.ObtenerListadoRelleno(item.ProcesoSoldaduraRellenoID == null ? 0 : int.Parse(item.ProcesoSoldaduraRellenoID.ToString()),item.TipoJunta,item.Diametro,decimal.Parse( item.Espesor.ToString()),item.Cedula, 1, capturaDatosJson.IDProyecto),
                            ListadoSoldadoresTrabajos = (List<ObreroSoldador>)CapturaSoldaduraBD.Instance.ObtenerListadoSoldaduresTrabajo(),
                            ListaTaller = ObtenerListaTaller((List<Sam3_SteelGo_Get_Taller_Result>)CapturaSoldaduraBD.Instance.ObtenerTallerXPoryecto(usuario, capturaDatosJson.IDProyecto)),
                            ListadoProcesoSoldadura = (List<ProcesoSoldadura>)CapturaSoldaduraBD.Instance.ObtenerProcesosSoldadura()
                        };
                        listaDetalleDatos.Add(detalleDatos);
                    }
                }
                return serializer.Serialize(listaDetalleDatos);

            }
            else
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(payload);
                result.ReturnCode = 401;
                result.ReturnStatus = false;
                result.IsAuthenicated = false;
                return result;
            }
        }

        [HttpGet]
        public object obtenerListadoProcesos(string token)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return CapturaSoldaduraBD.Instance.ObtenerProcesosSoldadura();
            }
            else
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(payload);
                result.ReturnCode = 401;
                result.ReturnStatus = false;
                result.IsAuthenicated = false;
                return result;
            }
        }

        [HttpGet]
        public object RetornaEdicion(string JsonEditar, string lenguaje, string token)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                DetalleDatosJsonSoldadura capturaDatosJson = serializer.Deserialize<DetalleDatosJsonSoldadura>(JsonEditar);
                capturaDatosJson.SinCaptura = capturaDatosJson.SinCaptura == "Todos" ? "1" : "0";
                List<DetalleDatosJsonSoldadura> listaDetalleDatos = new List<DetalleDatosJsonSoldadura>();
                List<Sam3_Soldadura_Get_DetalleJunta_Result> detalle = (List<Sam3_Soldadura_Get_DetalleJunta_Result>)CapturaSoldaduraBD.Instance.ObtenerDetalleSoldadura(capturaDatosJson, usuario, lenguaje);


                foreach (Sam3_Soldadura_Get_DetalleJunta_Result item in detalle)
                {
                    DetalleDatosJsonSoldadura detalleDatos = new DetalleDatosJsonSoldadura
                    {
                        DetalleJunta = "Tipo Junta: " + item.TipoJunta + " - " + "Cedula: " + item.Cedula + " - " + "Localización: " + item.Localizacion,
                        EtiquetaMaterial1 = item.EtiquetaMaterial1,
                        EtiquetaMaterial2 = item.EtiquetaMaterial2,
                        Etiqueta = item.Etiqueta,
                        JuntaTrabajoID = item.JuntaTrabajoID.ToString(),
                        NumeroUnico1ID = item.NumeroUnico1ID == null ? "0" : item.NumeroUnico1ID.ToString(),
                        NumeroUnico2ID = item.NumeroUnico2ID == null ? "0" : item.NumeroUnico2ID.ToString(),
                        SoldadoresRaiz = item.SoldadoresRaiz,
                        SoldadoresRelleno = item.SoldadoresRelleno,
                        TrabajosAdicionales =  item.TabajosAdicionales,
                        TipoJuntaID = item.TipoJuntaID.ToString(),
                        JuntaSoldaduraID = item.JuntaSoldaduraID == null ? 0 : int.Parse(item.JuntaSoldaduraID.ToString()),
                        Accion = item.JuntaSoldaduraID == null ? 1 : 2,
                        procesoSoldaduraRaizID = item.ProcesoSoldaduraRaizID == null ? 0 : int.Parse(item.ProcesoSoldaduraRaizID.ToString()),
                        procesoSoldaduraRellenoID = item.ProcesoSoldaduraRellenoID == null ? 0 : int.Parse(item.ProcesoSoldaduraRellenoID.ToString()),
                        procesoSoldaduraRaiz = item.CodigoRaiz == null ? "" : item.CodigoRaiz.ToString(),
                        procesoSoldaduraRelleno = item.CodigoRelleno == null ? "" : item.CodigoRelleno.ToString(),
                        Proyecto = capturaDatosJson.Proyecto,
                        IDProyecto = capturaDatosJson.IDProyecto,
                        IdOrdenTrabajo = capturaDatosJson.IdOrdenTrabajo,
                        OrdenTrabajo = capturaDatosJson.OrdenTrabajo,
                        idVal = capturaDatosJson.idVal,
                        idText = capturaDatosJson.idText,
                        SpoolID = capturaDatosJson.OrdenTrabajo + "-" + capturaDatosJson.idText,
                        JuntaID = capturaDatosJson.JuntaID,
                        Junta = capturaDatosJson.Junta,
                        TipoJunta = item.TipoJunta,
                        Cedula = item.Cedula,
                        Diametro = item.Diametro,
                        Espesor = decimal.Parse( item.Espesor.ToString()),
                        FechaSoldadura = item.FechaSoldadura == null ? capturaDatosJson.FechaSoldadura : item.FechaSoldadura.ToString(),
                        TallerID = item.TallerID == null ? capturaDatosJson.TallerID : item.TallerID.ToString(),
                        Taller = item.Taller == null ? capturaDatosJson.Taller : item.Taller,
                        Localizacion = item.Localizacion,
                        TemplateMensajeTrabajosAdicionales = item.TabajosAdicionales,
                        juntaSpoolID = item.JuntaSpoolID,
                        DetalleAdicional = GenerarTrabajoAdicionalJson((List<Sam3_Soldadura_Get_DetalleTrabajoAdicional_Result>)CapturaSoldaduraBD.Instance.DetallaSoldaduraAdicional(int.Parse(item.JuntaSpoolID.ToString()), usuario), item.JuntaSpoolID),
                        Raiz = GenerarRaizJson((List<Sam3_Soldadura_Get_DetalleSoldadorProceso_Result>)CapturaSoldaduraBD.Instance.DetallaRaizAdicional(int.Parse(item.JuntaSpoolID.ToString()), usuario), item.JuntaSpoolID),
                        RaizDetalle = GenerarRaizJson((List<Sam3_Soldadura_Get_DetalleSoldadorProceso_Result>)CapturaSoldaduraBD.Instance.DetallaRaizAdicional(int.Parse(item.JuntaSpoolID.ToString()), usuario), item.JuntaSpoolID),
                        Relleno = GenerarRaizJson((List<Sam3_Soldadura_Get_DetalleSoldadorProceso_Result>)CapturaSoldaduraBD.Instance.DetallaRellenoAdicional(int.Parse(item.JuntaSpoolID.ToString()), usuario), item.JuntaSpoolID),
                        RellenoDetalle = GenerarRaizJson((List<Sam3_Soldadura_Get_DetalleSoldadorProceso_Result>)CapturaSoldaduraBD.Instance.DetallaRellenoAdicional(int.Parse(item.JuntaSpoolID.ToString()), usuario), item.JuntaSpoolID),
                        listaTrabajosAdicionalesSoldadura = (List<TrabajosAdicionalesSoldadura>)CapturaSoldaduraBD.Instance.ObtenerTrabajosAdicionales(item.JuntaSpoolID),
                        ListadoRaiz = (List<SoldadorRaizCertificado>)CapturaSoldaduraBD.Instance.ObtenerListadoRaiz(item.ProcesoSoldaduraRaizID == null ? 0 : int.Parse(item.ProcesoSoldaduraRaizID.ToString()), item.TipoJunta, item.Diametro, decimal.Parse(item.Espesor.ToString()), item.Cedula, 1, capturaDatosJson.IDProyecto),
                        ListadoRelleno = (List<SoldadorRaizCertificado>)CapturaSoldaduraBD.Instance.ObtenerListadoRelleno(item.ProcesoSoldaduraRaizID == null ? 0 : int.Parse(item.ProcesoSoldaduraRellenoID.ToString()), item.TipoJunta, item.Diametro, decimal.Parse(item.Espesor.ToString()), item.Cedula, 0, capturaDatosJson.IDProyecto),
                        ListadoSoldadoresTrabajos = (List<ObreroSoldador>)CapturaSoldaduraBD.Instance.ObtenerListadoSoldaduresTrabajo(),
                        ListaTaller = ObtenerListaTaller((List<Sam3_SteelGo_Get_Taller_Result>)CapturaSoldaduraBD.Instance.ObtenerTallerXPoryecto(usuario, capturaDatosJson.IDProyecto)),
                        ListadoProcesoSoldadura = (List<ProcesoSoldadura>)CapturaSoldaduraBD.Instance.ObtenerProcesosSoldadura()
                    };
                    listaDetalleDatos.Add(detalleDatos);
                }

                return serializer.Serialize(listaDetalleDatos);

            }
            else
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(payload);
                result.ReturnCode = 401;
                result.ReturnStatus = false;
                result.IsAuthenicated = false;
                return result;
            }
        }

        [HttpGet]
        public object obtenerListadoRenderSoldadores(string token, int procesoSoldaduraID, string tipoJunta, decimal diametro, decimal espesor, string cedula, int proceso, int idProyecto)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return CapturaSoldaduraBD.Instance.ObtenerListadoSoldadoresCertificados(procesoSoldaduraID, tipoJunta, diametro, espesor, cedula, proceso, idProyecto);
            }
            else
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(payload);
                result.ReturnCode = 401;
                result.ReturnStatus = false;
                result.IsAuthenicated = false;
                return result;
            }
        }

        private List<Taller> ObtenerListaTaller(List<Sam3_SteelGo_Get_Taller_Result> listaTaller)
        {
            List<Taller> listaTalleres = new List<Taller>();
            foreach (Sam3_SteelGo_Get_Taller_Result item in listaTaller)
            {
                Taller taller = new Taller
                {
                    TallerID = item.TallerID,
                    Nombre = item.Nombre
                };
                listaTalleres.Add(taller);
            }
            return listaTalleres;
        }

        public List<TrabajosAdicionalesSoldadura> GenerarTrabajoAdicionalJson(List<Sam3_Soldadura_Get_DetalleTrabajoAdicional_Result> listaTrabajoAdicional, int juntaSpoolId)
        {

            List<TrabajosAdicionalesSoldadura> listaDetalleAdicional = new List<TrabajosAdicionalesSoldadura>();

            
                foreach (Sam3_Soldadura_Get_DetalleTrabajoAdicional_Result item in listaTrabajoAdicional)
                {
                    TrabajosAdicionalesSoldadura detalleAdicional = new TrabajosAdicionalesSoldadura
                    {
                        Accion = item.JuntaSoldaduraID == 0 ? 1 : 2,
                        Observacion = item.Observacion,
                        SoldaduraTrabajoAdicionalID = item.SoldaduraTrabajoAdicionalID,
                        JuntaSoldaduraID = item.JuntaSoldaduraID,
                        ObreroID = item.ObreroID,
                        TrabajoAdicional = item.TrabajoAdicional,
                        TrabajoAdicionalID = item.TrabajoAdicionalID,
                        Soldador = item.Soldador
                    };
                    listaDetalleAdicional.Add(detalleAdicional);
            }
            return listaDetalleAdicional;
        }

        public List<Raiz> GenerarRaizJson(List<Sam3_Soldadura_Get_DetalleSoldadorProceso_Result> listaTrabajoAdicional, int juntaSpoolId)
        {

            List<Raiz> listaDetalleAdicional = new List<Raiz>();
            if (listaTrabajoAdicional.Count == 0)
            {
                Raiz detalleAdicional = new Raiz
                {
                    Accion = 3,
                    JuntaSoldaduraID = 0,
                    JuntaSoldaduraSoldadoID = 0,
                    ObreroID = 0,
                    Soldador = "",
                    wps = ""
                };
                listaDetalleAdicional.Add(detalleAdicional);
            }
            else
            {


                foreach (Sam3_Soldadura_Get_DetalleSoldadorProceso_Result item in listaTrabajoAdicional)
                {
                    Raiz detalleAdicional = new Raiz
                    {
                        Accion = item.JuntaSoldaduraID == 0 ? 1 : 2,
                        JuntaSoldaduraID = item.JuntaSoldaduraID,
                        JuntaSoldaduraSoldadoID = item.JuntaSoldaduraSoldadoID,
                        ObreroID = item.ObreroID,
                        Soldador = item.Soldador,
                        wps = ""
                    };
                    listaDetalleAdicional.Add(detalleAdicional);
                }
            }
            return listaDetalleAdicional;
        }


        public List<Relleno> GenerarRellenoJson(List<Sam3_Soldadura_Get_DetalleSoldadorProceso_Result> listaTrabajoAdicional, int juntaSpoolId)
        {

            List<Relleno> listaDetalleAdicional = new List<Relleno>();
            if (listaTrabajoAdicional.Count == 0)
            {
                Relleno detalleAdicional = new Relleno
                { 
                    Accion  = 3,
                    JuntasoldaduraID = 0,
                    JuntaSoldaduraSoldadoID = 0,
                    ObreroID = 0,
                    Soldador = "",
                    wps = ""
                };
                listaDetalleAdicional.Add(detalleAdicional);
            }
            else
            {


                foreach (Sam3_Soldadura_Get_DetalleSoldadorProceso_Result item in listaTrabajoAdicional)
                {
                    Relleno detalleAdicional = new Relleno
                    {
                        Accion = item.JuntaSoldaduraID == 0 ? 1 : 2,
                        JuntasoldaduraID = item.JuntaSoldaduraID,
                        JuntaSoldaduraSoldadoID = item.JuntaSoldaduraSoldadoID,
                        ObreroID = item.ObreroID,
                        Soldador = item.Soldador,
                        wps = ""
                    };
                    listaDetalleAdicional.Add(detalleAdicional);
                }
            }
            return listaDetalleAdicional;
        }



        public object Get(string ordenTrabajo, string id, string sinCaptura, string token)
        {

            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return CapturaSoldaduraBD.Instance.ObtenerJuntasXSpoolID(usuario, ordenTrabajo, id, sinCaptura == "todos" ? 1 : 0);
            }
            else
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(payload);
                result.ReturnCode = 401;
                result.ReturnStatus = false;
                result.IsAuthenicated = false;
                return result;
            }
        }

        public object Get(int idProyecto, int tipo, string token)
        {

            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return CapturaSoldaduraBD.Instance.ObtenerTrabajosXProyecto(usuario, idProyecto);
            }
            else
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(payload);
                result.ReturnCode = 401;
                result.ReturnStatus = false;
                result.IsAuthenicated = false;
                return result;
            }
        }

        public object Get(int idProyecto, string token)
        {

            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return CapturaSoldaduraBD.Instance.ObtenerTallerXPoryecto(usuario, idProyecto);
            }
            else
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(payload);
                result.ReturnCode = 401;
                result.ReturnStatus = false;
                result.IsAuthenicated = false;
                return result;
            }
        }

        public object Get(int idProyecto, string token, string tipo)
        {

            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return CapturaSoldaduraBD.Instance.ObtenerTrabajosXProyecto(usuario, idProyecto);
            }
            else
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(payload);
                result.ReturnCode = 401;
                result.ReturnStatus = false;
                result.IsAuthenicated = false;
                return result;
            }
        }

        public object Post(Captura listaCapturasSoldadura, string token, string lenguaje)
        {
            string payload = "";
            string newToken = "";

            JavaScriptSerializer serializer = new JavaScriptSerializer();

            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                foreach (DetalleGuardarJson item in listaCapturasSoldadura.Detalles)
                {
                    if (item.ProcesoSoldaduraRaizID == 0)
                        item.ProcesoSoldaduraRaizID = null;

                    if (item.ProcesoSoldaduraRellenoID == 0)
                        item.ProcesoSoldaduraRellenoID = null;


                    if (item.ListaDetalleTrabajoAdicional != null)
                    {
                        foreach (DetalleGuardarTrabajoAdicional detalleTrabajoAdicional in item.ListaDetalleTrabajoAdicional)
                        {
                            detalleTrabajoAdicional.JuntaSpoolID = detalleTrabajoAdicional.JuntaSpoolID == 0 ? int.Parse(item.JuntaSpoolID) : detalleTrabajoAdicional.JuntaSpoolID;
                        }
                    }
                    if (item.ListaSoldaduraRaiz != null)
                    {
                        foreach (GuardarSoldaduraSoldado detalleRaizAdicional in item.ListaSoldaduraRaiz)
                        {
                            detalleRaizAdicional.JuntaSpoolID = detalleRaizAdicional.JuntaSpoolID == 0 ? int.Parse(item.JuntaSpoolID) : detalleRaizAdicional.JuntaSpoolID;
                            detalleRaizAdicional.TipoSoldaduraID = 1;
                        }
                    }
                    if (item.ListaSoldaduraRelleno != null)
                    {
                        foreach (GuardarSoldaduraSoldado detalleRellenoAdicional in item.ListaSoldaduraRelleno)
                        {
                            detalleRellenoAdicional.JuntaSpoolID = detalleRellenoAdicional.JuntaSpoolID == 0 ? int.Parse(item.JuntaSpoolID) : detalleRellenoAdicional.JuntaSpoolID;
                            detalleRellenoAdicional.TipoSoldaduraID = 2;
                        }
                    }
                    item.FechaReporte = "";
                }



                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                DataTable TabajosAdicionales = null;
                DataTable RaizAdicionales = null;
                DataTable RellenoAdicionales = null;

                foreach (DetalleGuardarJson item in listaCapturasSoldadura.Detalles)
                {
                    if (item.ListaDetalleTrabajoAdicional != null)
                    {
                        if (TabajosAdicionales == null)
                            TabajosAdicionales = ToDataTable(item.ListaDetalleTrabajoAdicional);
                        else
                            TabajosAdicionales.Merge(ToDataTable(item.ListaDetalleTrabajoAdicional));
                    }
                }

                foreach (DetalleGuardarJson item in listaCapturasSoldadura.Detalles)
                {
                    if (RaizAdicionales == null)
                    {
                        RaizAdicionales = ToDataTable(item.ListaSoldaduraRaiz);
                    }
                    else {
                        RaizAdicionales.Merge(ToDataTable(item.ListaSoldaduraRaiz));
                    }
                }

                foreach (DetalleGuardarJson item in listaCapturasSoldadura.Detalles)
                {
                    if (RellenoAdicionales == null)
                        RellenoAdicionales = ToDataTable(item.ListaSoldaduraRelleno);
                    else
                        RellenoAdicionales.Merge(ToDataTable(item.ListaSoldaduraRelleno));
                }
                DataTable dtDetalleCaptura = new DataTable();
                if (listaCapturasSoldadura.Detalles != null)
                {
                    dtDetalleCaptura = ToDataTable(listaCapturasSoldadura.Detalles);
                    RellenoAdicionales.Merge(RaizAdicionales);
                }
                
                dtDetalleCaptura.Columns.Remove("ListaDetalleTrabajoAdicional");
                dtDetalleCaptura.Columns.Remove("ListaSoldaduraRaiz");
                dtDetalleCaptura.Columns.Remove("ListaSoldaduraRelleno");
                return CapturaSoldaduraBD.Instance.InsertarCapturaSoldadura(dtDetalleCaptura, TabajosAdicionales, RellenoAdicionales, usuario, lenguaje);
            }
            else
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(payload);
                result.ReturnCode = 401;
                result.ReturnStatus = false;
                result.IsAuthenicated = false;
                return result;
            }
        }

        public static DataTable ToDataTable<T>(List<T> l_oItems)
        {
            DataTable oReturn = new DataTable(typeof(T).Name);
            object[] a_oValues;
            int i;

            //#### Collect the a_oProperties for the passed T
            PropertyInfo[] a_oProperties = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);

            //#### Traverse each oProperty, .Add'ing each .Name/.BaseType into our oReturn value
            //####     NOTE: The call to .BaseType is required as DataTables/DataSets do not support nullable types, so it's non-nullable counterpart Type is required in the .Column definition
            foreach (PropertyInfo oProperty in a_oProperties)
            {
                oReturn.Columns.Add(oProperty.Name, BaseType(oProperty.PropertyType));
            }

            //#### Traverse the l_oItems
            foreach (T oItem in l_oItems)
            {
                //#### Collect the a_oValues for this loop
                a_oValues = new object[a_oProperties.Length];

                //#### Traverse the a_oProperties, populating each a_oValues as we go
                for (i = 0; i < a_oProperties.Length; i++)
                {
                    a_oValues[i] = a_oProperties[i].GetValue(oItem, null);
                }

                //#### .Add the .Row that represents the current a_oValues into our oReturn value
                oReturn.Rows.Add(a_oValues);
            }

            //#### Return the above determined oReturn value to the caller
            return oReturn;
        }
        public static Type BaseType(Type oType)
        {
            //#### If the passed oType is valid, .IsValueType and is logicially nullable, .Get(its)UnderlyingType
            if (oType != null && oType.IsValueType &&
                oType.IsGenericType && oType.GetGenericTypeDefinition() == typeof(Nullable<>)
            )
            {
                return Nullable.GetUnderlyingType(oType);
            }
            //#### Else the passed oType was null or was not logicially nullable, so simply return the passed oType
            else
            {
                return oType;
            }
        }
    }
}
