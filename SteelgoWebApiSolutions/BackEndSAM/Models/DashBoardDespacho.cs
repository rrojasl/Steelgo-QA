using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models
{
    public class DashBoardDespacho
    {
        public string CantidadODT { get; set; }
        public string CantidadODTActiva { get; set; }
        public string PreDespacho { get; set; }
        public string PorDespachar { get; set; }
        public string PorEntregar { get; set; }
        public string TrevelerPendiente { get; set; }
    }

    public class ListadoODTDespacho
    {
        public string SpoolID { get; set; }
        public string Spool { get; set; }
    }
}