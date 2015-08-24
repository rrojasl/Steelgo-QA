using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models
{
    public class FolioCuantificacion
    {
        public int FolioCuantificacionID { get; set; }
        public int FolioAvisoEntradaID { get; set; }
        public int ProyectoID { get; set; }
        public string PackingList { get; set; }
        public int TipoUsoID { get; set; }
        public string Estatus { get; set; }
        
    }

    public class InfoFolioAvisoEntrada 
    {
        public List<Proyecto> Proyecto { get; set; }
        public List<FolioLlegada1> FolioLlegada { get; set; }
        public int FolioLlegadaHijo { get; set; }
        public TipoPackingList TipoPackingList { get; set; }
        public TipoUso TipoUso { get; set; }
        public string PackingList { get; set; }
    }

    public class FolioLlegada1 
    {
        public int FolioCuantificacionID { get; set; }
        public int FolioAvisoEntradaID { get; set; }
    }

    public class TipoPackingList {
        public string id {get;set;}
        public string Nombre { get; set; }
    }

    public class TipoUso {
        public string id { get; set; }
        public string Nombre { get; set; }
    }

    public class InfoFolioLlegadaMaterial
    {
        public int ProyectoID { get; set; }
        public int FolioLlegadaHijo { get; set; }
        public TipoPackingList TipoPackingList { get; set; }
        public TipoUso TipoUso { get; set; }
        public string PackingList { get; set; }
    }

}