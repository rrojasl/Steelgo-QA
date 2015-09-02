using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models
{
    public class ListaCombos
    {
        public string id { get; set; }
        public string value { get; set; }
    }

    public class ListaEnteros
    {
        public int ID { get; set; }
    }

    public class Entero
    {
        public List<ListaEnteros> ID { get; set; }
    }

}