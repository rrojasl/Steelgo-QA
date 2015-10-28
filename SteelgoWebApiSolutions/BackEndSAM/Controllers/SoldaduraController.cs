using BackEndSAM.DataAcces;
using BackEndSAM.Models;
using BackEndSAM.Models.Soldadura;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;

namespace BackEndSAM.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class SoldaduraController : ApiController
    {
        [HttpGet]
        public object RetornaTrabajosAdicionales(int juntaSpoolID, string token )
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

        public object Get(string ordenTrabajo, int tipo, string token)
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

                List<Sam3_Steelgo_Get_SpoolID_Result> lista = (List<Sam3_Steelgo_Get_SpoolID_Result>)CapturaSoldaduraBD.Instance.ObtenerIDOrdenTrabajo(usuario, ordenTrabajo, tipo);
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
        public object ObtieneFecha(string token, string lenguaje)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                IdOrdenTrabajo idOrdenTrabajo = new IdOrdenTrabajo();

                string fecha = (string)CapturaSoldaduraBD.Instance.ObtenerValorFecha(usuario, lenguaje);


                CamposPredeterminados soldadoCamposPredeterminados = new CamposPredeterminados();

                soldadoCamposPredeterminados = new CamposPredeterminados
                {
                    FechaSoldadura = fecha.Replace("\\", "-"),
                    Muestra = false
                };

                return soldadoCamposPredeterminados;
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


        public object Get(string JsonCaptura, string token)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                DetalleDatosJsonSoldadura capturaDatosJson = serializer.Deserialize<DetalleDatosJsonSoldadura>(JsonCaptura);
                capturaDatosJson.SinCaptura = capturaDatosJson.SinCaptura == "Todos" ? "1" : "0";
                //string json= serializer.Serialize(CapturaArmadoBD.Instance.ObtenerDetalleArmado(capturaDatosJson, usuario));
                //return json;
                List<DetalleDatosJsonSoldadura> listaDetalleDatos = new List<DetalleDatosJsonSoldadura>();
                List<Sam3_Soldadura_Get_DetalleJunta_Result> detalle = (List<Sam3_Soldadura_Get_DetalleJunta_Result>)CapturaSoldaduraBD.Instance.ObtenerDetalleSoldadura(capturaDatosJson, usuario);
                List<Sam3_Soldadura_Get_DetalleTrabajoAdicional_Result> detallaArmadoAdicional = (List<Sam3_Soldadura_Get_DetalleTrabajoAdicional_Result>)CapturaSoldaduraBD.Instance.DetallaSoldaduraAdicional(capturaDatosJson, usuario);
                

                foreach (Sam3_Soldadura_Get_DetalleJunta_Result item in detalle)
                {
                    DetalleDatosJsonSoldadura detalleDatos = new DetalleDatosJsonSoldadura
                    {
                        procesoSoldaduraRaizID = item.ProcesoSoldaduraRaizID == null ? 0 : int.Parse(item.ProcesoSoldaduraRaizID.ToString()),
                        procesoSoldaduraRellenoID = item.ProcesoSoldaduraRellenoID == null ? 0 : int.Parse(item.ProcesoSoldaduraRellenoID.ToString()),
                        Proyecto = capturaDatosJson.Proyecto,
                        IdOrdenTrabajo = capturaDatosJson.IdOrdenTrabajo,
                        OrdenTrabajo = capturaDatosJson.OrdenTrabajo,
                        idVal = capturaDatosJson.idVal,
                        idText = capturaDatosJson.idText,
                        SpoolID = capturaDatosJson.OrdenTrabajo + "-" + capturaDatosJson.idText,
                        JuntaID = capturaDatosJson.JuntaID,
                        Junta = capturaDatosJson.Junta,
                        TipoJunta = item.TipoJunta,
                        Cedula = item.Cedula,
                        FechaArmado = item.FechaSoldadura == null ? capturaDatosJson.FechaArmado : item.FechaSoldadura.ToString(),
                        tallerID = item.TallerID == null ? capturaDatosJson.tallerID : item.TallerID.ToString(),
                        Taller = item.Taller == null ? capturaDatosJson.Taller : item.Taller,
                        Localizacion = item.Localizacion,
                        TemplateMensajeTrabajosAdicionales = item.TabajosAdicionales,
                        juntaSpoolID = item.JuntaSpoolID,
                        DetalleAdicional = GenerarDetalleAdicionalJson(detallaArmadoAdicional, item.JuntaSpoolID),
                        listaTrabajosAdicionalesSoldadura = (List<TrabajosAdicionales>)CapturaSoldaduraBD.Instance.ObtenerTrabajosAdicionales(item.JuntaSpoolID),
                        ListadoRaiz = (List<Raiz>)CapturaSoldaduraBD.Instance.ObtenerListadoRaiz(item.ProcesoSoldaduraRaizID == null ? 0 : int.Parse(item.ProcesoSoldaduraRaizID.ToString())),
                        ListadoRelleno = (List<Relleno>)CapturaSoldaduraBD.Instance.ObtenerListadoRelleno(item.ProcesoSoldaduraRaizID == null ? 0 : int.Parse(item.ProcesoSoldaduraRellenoID.ToString()))

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


        
        public List<TrabajosAdicionalesSoldadura> GenerarDetalleAdicionalJson(List<Sam3_Soldadura_Get_DetalleTrabajoAdicional_Result> listaTrabajoAdicional, int juntaSpoolId)
        {

            List<TrabajosAdicionalesSoldadura> listaDetalleAdicional = new List<TrabajosAdicionalesSoldadura>();

            foreach (Sam3_Soldadura_Get_DetalleTrabajoAdicional_Result item in listaTrabajoAdicional)
            {
                TrabajosAdicionalesSoldadura detalleAdicional = new TrabajosAdicionalesSoldadura
                {
                    Observacion = "",
                    TrabajoAdicional= "",
                    TrabajoAdicionalID = 0,
                    ObreroID = 0,
                    Soldador = "",
                    JuntaSpoolID = juntaSpoolId,

                };
                listaDetalleAdicional.Add(detalleAdicional);
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
    }
}
