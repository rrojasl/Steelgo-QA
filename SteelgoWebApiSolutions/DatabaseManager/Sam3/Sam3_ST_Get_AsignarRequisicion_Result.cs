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
    
    public partial class Sam3_ST_Get_AsignarRequisicion_Result
    {
        public int RequisicionID { get; set; }
        public string Requisicion { get; set; }
        public string Observaciones { get; set; }
        public string Fecha { get; set; }
        public int ProyectoID { get; set; }
        public Nullable<int> TipoPruebaID { get; set; }
        public string TipoPrueba { get; set; }
        public bool RequiereEquipo { get; set; }
        public Nullable<int> ProveedorID { get; set; }
        public string Proveedor { get; set; }
        public Nullable<int> EquipoID { get; set; }
        public string Equipo { get; set; }
        public Nullable<int> TurnoLaboralID { get; set; }
        public string TurnoLaboral { get; set; }
        public int RequisicionAsignacionID { get; set; }
        public int CapacidadTurnoProveedorID { get; set; }
        public int CapacidadTurnoEquipoID { get; set; }
        public int ProveedorEquipoID { get; set; }
        public int TipoPruebaProveedorID { get; set; }
        public Nullable<int> NumeroElementos { get; set; }
        public int ElementosAsignados { get; set; }
        public Nullable<int> Capacidad { get; set; }
    }
}