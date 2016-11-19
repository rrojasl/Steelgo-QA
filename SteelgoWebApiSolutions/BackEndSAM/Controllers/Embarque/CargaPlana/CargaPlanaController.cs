using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace BackEndSAM.Controllers.Embarque.CargaPlana
{
    [EnableCors(origins:"*", headers:"*", methods:"*")]
    public class CargaPlanaController : ApiController
    {

        [HttpGet]
        public object ObtenerDetalleCargaPlana()
        {
            return null;
        }
    }
}
