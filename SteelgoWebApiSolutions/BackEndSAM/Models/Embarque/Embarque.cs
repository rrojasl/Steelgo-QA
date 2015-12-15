using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Embarque
{
    public class Embarque
    {
        public int Accion { get; set; }
        public int EmbarqueID { get; set; }
        public int TractoID { get; set; }
        public string Tracto { get; set; }
        public int ChoferID { get; set; }
        public string Chofer { get; set; }
        public string Plana { get; set; }
        public string Estatus { get; set; }
        public int EmbarquePlanaID { get; set; }
    }
}