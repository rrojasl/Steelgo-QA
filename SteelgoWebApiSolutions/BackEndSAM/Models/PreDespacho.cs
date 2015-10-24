using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models
{
    public class PreDespacho
    {
        public int SpoolID { get; set; }
        public string Spool { get; set; }
        public int ItemCodeID { get; set; }
        public string ItemCode { get; set; }
        public string Descripcion { get; set; }
        public string NumeroUnico { get; set; }
        public List<NumerosUnicos> NumerosUnicos { get; set; }

        public PreDespacho()
        {
            NumerosUnicos = new List<NumerosUnicos>();
        }
    }

    public class DatosPredespacho
    {
        public string NumeroControl { get; set; }
        public string ItemCode { get; set; }
        public string NumeroUnico { get; set; }
        public string ProyectoID { get; set; }
    }
}