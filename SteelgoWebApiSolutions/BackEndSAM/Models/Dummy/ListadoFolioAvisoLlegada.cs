using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models
{
    public class ListadoFolioAvisoLlegada
    {
        public int creacion { get; set; }
        public int listado { get; set; }
        public int detalle { get; set; }
        public int eliminacion { get; set; }
        public IEnumerable<propiedades> propiedades { get; set; }
        
    }

    public class propiedades
    {
        public FolioAvisoLlegadaID FolioAvisoLlegadaID { get; set; }
    }


    public class FolioAvisoLlegadaID
    {
        public int visible { get; set; }
        public int editable { get; set; }
        public int requerido { get; set; }
    }
}