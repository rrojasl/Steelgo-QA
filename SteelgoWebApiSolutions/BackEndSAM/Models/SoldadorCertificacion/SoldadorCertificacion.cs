

namespace BackEndSAM.Models.SoldadorCertificacion
{
    public class SoldadorCertificacion
    {
        public int SoldadorCertificacionID { get; set; }
        public int ObreroID { get; set; }
        public string CodigoObrero { get; set; }
        public int PQRID { get; set; }
        public string NombrePQR { get; set; }
        public int ProcesoSoldaduraID { get; set; }
        public string ProcesoSoldadura { get; set;}
        public int TipoDePruebaID { get; set; }
        public string TipoDePrueba { get; set; }
        public int PosicionID { get; set; }
        public int Posicion { get; set; }
        public string FechaInicioCertificado { get; set; }
        public string FechaFinCertificado { get; set; }
        public string CedulaTuboCalificado { get; set; }
        public string DiametroCalificado { get; set; }
        public string EspesorMinimo { get; set; }
        public string EspesorMaximo { get; set; }
        public int PorcentajeJuntasRequiere { get; set; }
        public string CertificadoActivo { get; set; }
       public string PasosSoldadura { get; set; }
        public int UsuarioModificacion { get; set; }

    }
}