using System.Collections.Generic;

namespace BackEndSAM.Models.ServiciosTecnicos.EntregaResultados
{
    public class EntregaResultados
    {
        public int Accion { get; set; }
        public string FOLIO { get; set; }
        public string DESCRIPCION { get; set; }
        public bool RECIBIDO { get; set; }
        public int CONDICIONESFISICASID { get; set; }
        public string CONDICIONESFISICAS { get; set; }
        public int DEFECTOSID { get; set; }
        public string DEFECTOS { get; set; }
        public int EntregaResultadosID { get; set; }
        public int RequisicionPruebaElementoID { get; set; }
        public List<CondicionesFisicas> ListCondicionesFisicas { get; set; }
        public List<Defectos> ListDefectos { get; set; }
        public List<Defectos> ListDefectosGeneral { get; set; }
        public int DatosJunta { get; set; }
        public string Ubicacion { get; set; }
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
        public string Accion { get; set; }
        public int EntregaResultadosID { get; set; }
        public bool RECIBIDO { get; set; }
        public int CONDICIONESFISICASID { get; set; }
        public int? DEFECTOSID { get; set; }
        public int RequisicionPruebaElementoID { get; set; }

    }

    public class Captura
    {
        public List<GuardarEntregaResultados> Detalles { get; set; }
    }
}