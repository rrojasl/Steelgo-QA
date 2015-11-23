using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models
{
    public class InfoFolioCuantificacion
    {
        public int FolioCuantificacionID { get; set; }
        public int FolioAvisoEntradaID { get; set; }
        public int ProyectoID { get; set; }
        public string PackingList { get; set; }
        public TipoPackingList TipoPackingList { get; set; }
        public TipoUso TipoUso { get; set; }
        public string TipoUsoNombre { get; set; }
        public string Estatus { get; set; }
        public int FolioLlegadaHijo { get; set; }
        public string FolioConfiguracionCuantificacionID { get; set; }
    }

  
}