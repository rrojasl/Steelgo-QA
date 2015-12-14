
namespace BackEndSAM.Models.WPS
{
    public class WPS
    {

        public int WPSID { get; set; }
        public string WPSNombre { get; set; }
        public int PQRRaizId { get; set; }
        public string NombrePQRRaiz { get; set; }
        public int PQRRellenoId { get; set; }
        public string NombrePQRRelleno { get; set; }
        public int GrupoPId { get; set; }
        public string GrupoP { get; set; }
        public int PWHTId { get; set; }
        public string PWHT { get; set; }
        public string EspesorMaximoRaiz { get; set; }
        public string EspesorMinimoRaiz { get; set; }
        public string EspesorMaximoRelleno { get; set; }
        public string EspesorMinimoRelleno { get; set; }

        public int GrupoPIdRaiz { get; set; }
        public int PWHTRaiz { get; set; }
    }
}
