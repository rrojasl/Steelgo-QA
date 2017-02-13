using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Ingenieria.BuscaSpool
{
    
    public class DetalleSpool
    {
        public int SpoolID { get; set; }
        public int ProyectoID { get; set; }
        public string RevisionCliente { get; set; }
        public string RevisionSteelgo { get; set; }
        public int? FamiliarAcero1ID { get; set; }
        public int? FamiliarAcero2ID { get; set; }
        public string Especificacion { get; set; }
        public string SistemaPintura { get; set; }
        public string ColorPintura { get; set; }
        public decimal? PDI { get; set; }
        public string Acero { get; set; }
    }
}