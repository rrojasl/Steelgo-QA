using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BackEndSAM.Models;
using System.Web.Http.Cors;

namespace BackEndSAM.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class FormatoPaseSalidaController : ApiController
    {
        // GET api/formatopasesalida
        public FormatoPaseSalida Get(string folioentradaid, string folioLlegadaid, string username, string token)
        {
            List<Plana> lstPlana = new List<Plana>();
            Plana plana = new Plana();
            plana.Nombre = "Plana 1";
            plana.PlanaID = "1A11";
            lstPlana.Add(plana);

            Plana plana2= new Plana();
            plana2.Nombre = "Plana 2";
            plana2.PlanaID = "2A22";
            lstPlana.Add(plana2);

            RegistroTiempos registrotiempos= new RegistroTiempos();
            registrotiempos.HoraLlegada = "9:00";
            registrotiempos.HoraInicio = "10:00";
            registrotiempos.HoraFin = "11:00";

            Incidencia incidencia = new Incidencia();
            incidencia.TieneIncidencia = true;
            incidencia.Numero = "1242415A";

            FormatoPaseSalida formato = new FormatoPaseSalida();
            formato.NombreProyecto = "Proyecto 1";
            formato.NombreOperador = "Operador 1";
            formato.FechaHoy = DateTime.Today;
            formato.CantidadPlanas = 4;
            formato.PlacaTracto = "A10B15";
            formato.Plana = lstPlana;
            formato.TienePedimento = true;
            formato.TieneFactura = false;
            formato.TieneRemision = true;
            formato.RegistroTiempos = registrotiempos;
            formato.Incidencia = incidencia;

            return formato;
        }

        // GET api/formatopasesalida/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/formatopasesalida
        public void Post([FromBody]string value)
        {
        }

        // PUT api/formatopasesalida/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/formatopasesalida/5
        public void Delete(int id)
        {
        }
    }
}
