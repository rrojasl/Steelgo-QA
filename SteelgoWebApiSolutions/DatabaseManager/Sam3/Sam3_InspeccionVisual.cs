//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DatabaseManager.Sam3
{
    using System;
    using System.Collections.Generic;
    
    public partial class Sam3_InspeccionVisual
    {
        public int InspeccionVisualID { get; set; }
        public int DetalleArmadoID { get; set; }
        public int ResultadoID { get; set; }
        public int TallerID { get; set; }
        public Nullable<int> DefectoID { get; set; }
        public int ObreroID { get; set; }
        public System.DateTime FechaInspeccion { get; set; }
        public bool Activo { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public System.DateTime FechaModificacion { get; set; }
    }
}
