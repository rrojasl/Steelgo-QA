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
    public class DummyNumerosUnicosController : ApiController
    {
        // GET api/dummynumerosunicos
        public object Get(string token)
        {
            //List<DummyNumeroControl> lstNumeroUnico = new List<DummyNumeroControl>();
            //DummyNumeroControl numerounico1 = new DummyNumeroControl();
            //DummyNumeroControl numerounico2 = new DummyNumeroControl();
            //DummyNumeroControl numerounico3 = new DummyNumeroControl();

            //numerounico1.NumeroControlID = "1";
            //numerounico1.NumeroControl = "Numero Unico 1";
            //lstNumeroUnico.Add(numerounico1);

            //numerounico2.NumeroControlID = "2";
            //numerounico2.NumeroControl = "Numero Unico 2";
            //lstNumeroUnico.Add(numerounico2);

            //numerounico3.NumeroControlID = "3";
            //numerounico3.NumeroControl = "Numero Unico 3";
            //lstNumeroUnico.Add(numerounico3);

            return NumeroUnicoBd.Instance.ListadoNumerosUnicosCorte(16, "EI",  new Sam3_Usuario());
        
        }


        public object Get(string NumeroUnicoID, string token)
        {
            //DummyDetalleNumeroUnico numerounico1 = new DummyDetalleNumeroUnico();
            //numerounico1.Cantidad = "3500";
            //numerounico1.ItemCode = "Item Code 1";
            //numerounico1.D1 = "5";
            //numerounico1.Tolerancia = "10";

            return NumeroUnicoBd.Instance.DetalleNumeroUnicoCorte(Convert.ToInt32(NumeroUnicoID), new Sam3_Usuario());

        }

        public object Put(ParametrosBusquedaODT DatosODT, string token)
        {
            return CorteBd.Instance.ListadoGenerarCorte(DatosODT, new Sam3_Usuario());
        }

        public void Post(DummyDatosODTCorteGuardar Cortes, string token)
        {

        }
    }
}
