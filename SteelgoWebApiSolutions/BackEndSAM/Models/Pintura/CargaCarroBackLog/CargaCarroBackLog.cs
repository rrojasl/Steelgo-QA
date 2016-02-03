using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Pintura.CargaCarroBackLog
{
    public class CargaCarroBackLog
    {
        public string SpoolJunta { get; set; }
        public int OrdenImportancia { get; set; }
        public decimal Peso { get; set; }
        public decimal Metros2 { get; set; }
        public string SistemaPintura { get; set; }
        public string Color { get; set; }
        public int SpoolID { get; set; }
        public string Cuadrante { get; set; }
        public string Nombre { get; set; }
        public int ProyectoID { get; set; }
        public int SistemaPinturaID { get; set; }
        public bool Seleccionado { get; set; }
    }

    public class Captura
    {
        public List<SpoolCarga> ListaDetalles { get; set; }
    }

    public class SpoolCarga
    {
        public int Spool { get; set; }
        public int MedioTransporteCargaID { get; set; }
    }

    public class CamposPredeterminados
    {
        public string Cerrar { get; set; }
    }

}