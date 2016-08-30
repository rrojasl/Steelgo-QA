using System.Web.Http.Cors;

namespace BackEndSAM.Controllers.ServiciosTecnicos.RequisicionPND
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class RequisicionPNDController
    {
        //[HttpGet]
        //public object ObtieneCamposPredeterminados(string token, string lenguaje)
        //{
        //    string payload = "";
        //    string newToken = "";
        //    bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
        //    if (tokenValido)
        //    {
        //        JavaScriptSerializer serializer = new JavaScriptSerializer();
        //        Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

        //        string muestra = (string)CapturaSoldaduraBD.Instance.ObtenerValorFecha(usuario, lenguaje, 30);


        //        CamposPredeterminados GenerarRequisicionCamposPredeterminados = new CamposPredeterminados();

        //        GenerarRequisicionCamposPredeterminados = new CamposPredeterminados
        //        {
        //            Muestra = muestra,
        //            FormatoFecha = lenguaje == "es-MX" ? "dd/MM/yyyy" : "MM-dd-yyyy",
        //        };

        //        return GenerarRequisicionCamposPredeterminados;
        //    }
        //    else
        //    {
        //        TransactionalInformation result = new TransactionalInformation();
        //        result.ReturnMessage.Add(payload);
        //        result.ReturnCode = 401;
        //        result.ReturnStatus = false;
        //        result.IsAuthenicated = false;
        //        return result;
        //    }
        //}
    }
}