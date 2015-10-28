using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Inspeccion
{
    public class CapturaVisualDimensional
    {
        public class DetalleDatosJson
        {
            public int Accion { get; set; }
            public int JuntaTrabajoID { get; set; }
            public int JuntaArmadoID { get; set; }
            public int InspeccionVisualID { get; set; }
            public int ProyectoID { get; set; }
            public string Proyecto { get; set; }
            public string OrdenTrabajoID { get; set; }
            public string OrdenTrabajo { get; set; }
            public string OrdenTrabajoSpoolID { get; set; }
            public string OrdenTrabajoSpool { get; set; }
            public string SpoolID { get; set; }
            public string JuntaID { get; set; }
            public string Junta { get; set; }
            public string TipoJunta { get; set; }
            public string TipoJuntaID { get; set; }
            public string Diametro { get; set; }
            public string Resultado { get; set; }
            public string ResultadoID { get; set; }
            public string TallerID { get; set; }
            public string Taller { get; set; }
            public List<Taller> ListaTaller { get; set; }
            public string DefectosID { get; set; }
            public string Defectos { get; set; }
            public List<Defectos> ListaDefectos { get; set; }
            public string InspectorID { get; set; }
            public string Inspector { get; set; }
            public List<Inspector> ListaInspector { get; set; }
            public string FechaInspeccion { get; set; }
            public string NumeroUnico1 { get; set; }
            public string NumeroUnico2 { get; set; }
            public List<NumeroUnico> ListaNumerosUnicos1 { get; set; }
            public List<NumeroUnico> ListaNumerosUnicos2 { get; set; }
            public List<Resultado> ListaResultados { get; set; }

        }
    }
    public class Inspector
    {
        public int ObreroID { get; set; }
        public string Codigo { get; set; }
    }
    public class Defectos
    {
        public int DefectoID { get; set; }
        public string Nombre { get; set; }
    }
    public class NumeroUnico
    {
        public int NumeroUnicoID { get; set; }
        public string Clave { get; set; }
        public int EtiquetaMaterial { get; set; }
        public string Etiqueta { get; set; }
    }
    public class Taller
    {
        public int TallerID { get; set; }

        public string Nombre { get; set; }
    }
    public class Resultado
    {
        public string _ResultadoID { get; set; }
        public string _Resultado { get; set; }
    }
}