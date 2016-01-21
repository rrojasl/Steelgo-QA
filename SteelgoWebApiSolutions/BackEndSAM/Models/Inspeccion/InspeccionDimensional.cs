using BackEndSAM.Models.Inspeccion;
using System.Collections.Generic;

namespace BackEndSAM.Models.InspeccionDimensional
{
    public class InspeccionDimensional
    {
        public class CamposPred
        {
            public string Fecha { get; set; }
            public string Resultado  { get; set; }
            public string Llena { get; set; }
        }
        public class Captura
        {
            public List<DetalleGuardarJson> Detalles { get; set; }
        }

        public class DetalleDatosJson
        {
            public int Accion { get; set; }
            public int InspeccionDimensionalID { get; set; }
            public int ProyectoID { get; set; }
            public string Proyecto { get; set; }
            public string OrdenTrabajoSpoolID { get; set; }
            public string OrdenTrabajoSpool { get; set; }
            public string ResultadoID { get; set; }
            public string Resultado { get; set; }
            public List<Resultado> ListaResultados { get; set; }
            public string DefectosID { get; set; }
            public string Defectos { get; set; }
            public List<Defectos> ListaDefectos { get; set; }
            public string InspectorID { get; set; }
            public string Inspector { get; set; }
            public List<Inspector> ListaInspector { get; set; }
            public string FechaInspeccion { get; set; }
        }

        public class DetalleGuardarJson
        {
            public int Accion { get; set; }
            public int InspeccionDimensionalID { get; set; }
            public string OrdenTrabajoSpoolID { get; set; }
            public string ResultadoID { get; set; }
            public string DefectosID { get; set; }
            public string InspectorID { get; set; }
            public string FechaInspeccion { get; set; }
        }
    }
}