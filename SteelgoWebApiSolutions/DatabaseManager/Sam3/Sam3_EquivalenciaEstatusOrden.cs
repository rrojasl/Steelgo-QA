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
    
    public partial class Sam3_EquivalenciaEstatusOrden
    {
        public int EquivalenciaEstatusOrden_ID { get; set; }
        public int Sam2_EstatusOrdenID { get; set; }
        public int Sam3_EstatusOrdenID { get; set; }
        public bool Activo { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
    }
}
