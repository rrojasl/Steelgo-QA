//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DatabaseManager.Sam3
{
    using System;
    
    public partial class Sam3_ST_Get_ElementosTurnoAsignados_Result
    {
        public string NumeroControl { get; set; }
        public string EtiquetaJunta { get; set; }
        public string TipoJunta { get; set; }
        public string NombreRequisicion { get; set; }
        public string Cuadrante { get; set; }
        public Nullable<int> Prioridad { get; set; }
        public string Clasificacion { get; set; }
        public Nullable<decimal> Diametro { get; set; }
        public string Espesor { get; set; }
        public string Cedula { get; set; }
        public int ElementoPorClasificacionPNDID { get; set; }
        public int RequisicionID { get; set; }
        public int ProyectoID { get; set; }
        public int SpoolID { get; set; }
        public int JuntaSpoolID { get; set; }
        public int OrdenTrabajoSpoolID { get; set; }
        public Nullable<int> TipoPruebaID { get; set; }
        public string Especificacion { get; set; }
        public Nullable<int> CapacidadTurnoEquipoID { get; set; }
        public Nullable<int> CapacidadTurnoProveedorID { get; set; }
    }
}
