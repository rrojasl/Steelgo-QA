using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.ServiciosTecnicos.EntregaResultados
{
    public class EntregaResultados
    {
        public int FOLIO { get; set; }
        public string DESCRIPCION { get; set; }
        public bool RECIBIDO { get; set; }
        public int CONDICIONESFISICASID { get; set; }
        public string CONDICIONESFISICAS { get; set; }
        public int DEFECTOSID { get; set; }
        public string DEFECTOS { get; set; }
        public List<CondicionesFisicas> ListCondicionesFisicas { get; set; }
        public List<Defectos> ListDefectos { get; set; }
        public List<Defectos> ListDefectosGeneral { get; set; }
    }

    public class CondicionesFisicas
    {
        public int CondicionesFisicasID { get; set; }
        public string CondicionFisica { get; set; }
    }

    public class Defectos
    {
        public int DefectoID { get; set; }
        public string Nombre { get; set; }
    }

    public class GuardarEntregaResultados
    {
        public int FOLIO { get; set; }
        public bool RECIBIDO { get; set; }
        public int CONDICIONESFISICASID { get; set; }
        public int? DEFECTOSID { get; set; }
     
    }

    public class Captura
    {
        public List<GuardarEntregaResultados> Detalles { get; set; }
    }
}