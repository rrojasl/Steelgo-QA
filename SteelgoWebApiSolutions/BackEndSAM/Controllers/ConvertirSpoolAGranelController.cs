using BackEndSAM.DataAcces;
using BackEndSAM.Models;
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
    public class ConvertirSpoolAGranelController : ApiController
    {
        // GET api/convertirspoolagranel
        public IEnumerable<ListaCombos> Get(string token)
        {
            List<ListaCombos> lstCombo= new List<ListaCombos>();
            ListaCombos item1= new ListaCombos();
            ListaCombos item2= new ListaCombos();
            ListaCombos item3 = new ListaCombos();

            item1.id="1";
            item1.value="Spool 1";
            lstCombo.Add(item1);

            item2.id="2";
            item2.value="Spool 2";
            lstCombo.Add(item2);

            item3.id = "3";
            item3.value = "Spool 3";
            lstCombo.Add(item3);

            return lstCombo.AsEnumerable();
        }

        // GET api/convertirspoolagranel/5
        public IEnumerable<ListadoConvertirSpoolAGranel> Get(int spoolID, string token)
        {
            List<ListadoConvertirSpoolAGranel> lstConvertirSpool = new List<ListadoConvertirSpoolAGranel>();
            ListadoConvertirSpoolAGranel item1 = new ListadoConvertirSpoolAGranel();
            ListadoConvertirSpoolAGranel item2 = new ListadoConvertirSpoolAGranel();
            if (spoolID == 1)
            {
                item1.Junta = "Junta 1";
                item1.TipoJunta = "Shop";
                item1.Status = "";
                lstConvertirSpool.Add(item1);


                item2.Junta = "Junta 2";
                item2.TipoJunta = "Shop";
                item2.Status = "";
                lstConvertirSpool.Add(item2);
            }

            if (spoolID == 2)
            {
                item1.Junta = "Junta 3";
                item1.TipoJunta = "Shop";
                item1.Status = "";
                lstConvertirSpool.Add(item1);


                item2.Junta = "Junta 4";
                item2.TipoJunta = "Field";
                item2.Status = "";
                lstConvertirSpool.Add(item2);
            
            }

            if (spoolID == 3)
            {
                item1.Junta = "Junta 5";
                item1.TipoJunta = "Shop";
                item1.Status = "error";
                lstConvertirSpool.Add(item1);


                item2.Junta = "Junta 6";
                item2.TipoJunta = "Field";
                item2.Status = "";
                lstConvertirSpool.Add(item2);

            }
            return lstConvertirSpool.AsEnumerable();
        }

        // POST api/convertirspoolagranel
        public int Post(ItemsSpoolAGranel Items, string token)
        {
            return 1;
        }

        // PUT api/convertirspoolagranel/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/convertirspoolagranel/5
        public void Delete(int id)
        {
        }
    }
}
