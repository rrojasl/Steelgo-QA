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
            DummyDespacho despacho1 = new DummyDespacho();
            DummyDespacho despacho2 = new DummyDespacho();
            DummyDespacho despacho3 = new DummyDespacho();

            despacho1.NumeroControl = "E008-001";
            despacho1.ItemCode = "AAAC957927003";
            despacho1.Descripcion = "Pipe 3";
            despacho1.NumeroUnico = "";
            lstDespacho.Add(despacho1);

            despacho2.NumeroControl = "E008-001";
            despacho2.ItemCode = "AAAC957927005";
            despacho2.Descripcion = "Pipe 5";
            despacho2.NumeroUnico = "111";
            lstDespacho.Add(despacho2);

            despacho3.NumeroControl = "E008-001";
            despacho3.ItemCode = "AAAC957927006";
            despacho3.Descripcion = "Pipe 6";
            despacho3.NumeroUnico = "";
            lstDespacho.Add(despacho3);

            return lstDespacho.AsEnumerable();
        }

        public IEnumerable<DummyNumeroControl> Get(string id, string texto, string token)
        {
            List<DummyNumeroControl> lstNumeroUnico = new List<DummyNumeroControl>();
            DummyNumeroControl numerounico1 = new DummyNumeroControl();
            DummyNumeroControl numerounico2 = new DummyNumeroControl();
            DummyNumeroControl numerounico3 = new DummyNumeroControl();

            numerounico1.NumeroControlID = "1";
            numerounico1.NumeroControl = "Numero Unico 1";
            lstNumeroUnico.Add(numerounico1);

            numerounico2.NumeroControlID = "2";
            numerounico2.NumeroControl = "Numero Unico 2";
            lstNumeroUnico.Add(numerounico2);

            numerounico3.NumeroControlID = "3";
            numerounico3.NumeroControl = "Numero Unico 3";
            lstNumeroUnico.Add(numerounico3);

            return lstNumeroUnico.AsEnumerable();
        }

    
        public IEnumerable<NumerosUnicos> Get(string token)
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
    }
}
