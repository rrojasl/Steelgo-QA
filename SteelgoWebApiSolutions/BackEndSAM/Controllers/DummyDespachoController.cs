using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;
using BackEndSAM.DataAcces;
using BackEndSAM.Models;
using CommonTools.Libraries.Strings.Security;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;

namespace BackEndSAM.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DummyDespachoController : ApiController
    {
        public IEnumerable<DummyDespacho> Get(string NumeroControl,string token)
        {
            List<DummyDespacho> lstDespacho = new List<DummyDespacho>();
            //DummyDespacho despacho1 = new DummyDespacho();
            //DummyDespacho despacho2 = new DummyDespacho();
            //DummyDespacho despacho3 = new DummyDespacho();

            //despacho1.NumeroControl = "E008-001";
            //despacho1.ItemCode = "AAAC957927003";
            //despacho1.Descripcion = "Pipe 3";
            //despacho1.NumeroUnico = "";
            //despacho1.Baston = "";
            //despacho1.Etiqueta = "1";
            //lstDespacho.Add(despacho1);

            //despacho2.NumeroControl = "E008-001";
            //despacho2.ItemCode = "AAAC957927005";
            //despacho2.Descripcion = "Pipe 5";
            //despacho2.NumeroUnico = "111";
            //despacho2.Baston = "";
            //despacho2.Etiqueta = "2";
            //lstDespacho.Add(despacho2);

            //despacho3.NumeroControl = "E008-001";
            //despacho3.ItemCode = "AAAC957927006";
            //despacho3.Descripcion = "Pipe 6";
            //despacho3.NumeroUnico = "";
            //despacho3.Baston = "";
            //despacho3.Etiqueta = "3";
            //lstDespacho.Add(despacho3);

            //return lstDespacho.AsEnumerable();
            Sam3_Usuario usuario = new Sam3_Usuario{
                UsuarioID = 1
            };

            List<LstGenerarDespacho> listado = (List<LstGenerarDespacho>)DespachoBd.Instance.ListadoGenerarDespacho(NumeroControl, usuario);

            foreach (LstGenerarDespacho lst in listado)
            {
                DummyDespacho nuevo = new DummyDespacho 
                {
                     Descripcion = lst.Descripcion,
                     Etiqueta = lst.Etiqueta, 
                     ItemCode = lst.ItemCode, 
                     NumeroControl = lst.NumeroControl, 
                     NumeroUnico = lst.NumeroUnico,
                     Hold = lst.Hold.ToString(),
                     ProyectoID = lst.ProyectoID
                };

                lstDespacho.Add(nuevo);
            }

#if DEBUG
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            string json = serializer.Serialize(lstDespacho);
#endif
            return lstDespacho;
        }

        public object Get(string id, string texto, string token)
        {
            List<ComboNumeroControl> lstNumeroUnico = new List<ComboNumeroControl>();

            Sam3_Usuario usuario = new Sam3_Usuario();
            usuario.UsuarioID = 1;
            List<ListaCombos> listado = (List<ListaCombos>)OrdenTrabajoSpoolBd.Instance.ListadoNumerosDeControl(Convert.ToInt32(id), texto, usuario);

            foreach(ListaCombos lst in listado)
            {
                ComboNumeroControl nuevo = new ComboNumeroControl
                {
                    NumeroControl = lst.value,
                    NumeroControlID = lst.id.ToString()
                };
                lstNumeroUnico.Add(nuevo);
            }

            return lstNumeroUnico;
        }

    
        public IEnumerable<NumerosUnicos> Get(string numerocontrol, string etiqueta, string itemcode, string token)
        {
            List<NumerosUnicos> lstNumeroUnico = new List<NumerosUnicos>();
            NumerosUnicos numerounico1 = new NumerosUnicos();
            NumerosUnicos numerounico2 = new NumerosUnicos();
            NumerosUnicos numerounico3 = new NumerosUnicos();

            numerounico1.NumeroUnicoID = "1";
            numerounico1.NumeroUnico = "Numero Unico 1";
            lstNumeroUnico.Add(numerounico1);

            numerounico2.NumeroUnicoID = "2";
            numerounico2.NumeroUnico = "Numero Unico 2";
            lstNumeroUnico.Add(numerounico2);

            numerounico3.NumeroUnicoID = "3";
            numerounico3.NumeroUnico = "Numero Unico 3";
            lstNumeroUnico.Add(numerounico3);

            return lstNumeroUnico.AsEnumerable();
        }

        public object Post(Despacho Despacho, string token)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return DespachoBd.Instance.GenerarDespachos(Despacho.ListaDespachos, usuario);
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
