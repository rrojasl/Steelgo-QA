using BackEndSAM.DataAcces.PinturaBD.MedioTransporteBD;
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

namespace BackEndSAM.Controllers.PinturaControllers.DescargaCarroController
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DescargaCarroController : ApiController
    {
       
    }
}
