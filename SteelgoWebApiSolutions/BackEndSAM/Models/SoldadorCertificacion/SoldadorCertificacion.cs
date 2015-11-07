using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.SoldadorCertificacion
{
    public class SoldadorCertificacion
    {
        public int SoldadorCertificacionID { get; set; }
        public int ObreroID { get; set; }
        public string CodigoObrero { get; set; }
        public int PQRID { get; set; }
        public string NombrePQR { get; set; }
        public string FechaInicioCertificado { get; set; }
        public string FechaFinCertificado { get; set; }
        public int EspesorMinimo { get; set; }
        public int EspesorMaximo { get; set; }
        public int PorcentajeJuntasRequiere { get; set; }
        public string CertificadoActivo { get; set; }
        public int UsuarioModificacion { get; set; }

    }
}