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
    using System.Collections.Generic;
    
    public partial class Sam3_Pruebas
    {
        public int PruebasID { get; set; }
        public Nullable<int> PruebasCategoriaID { get; set; }
        public string Clave { get; set; }
        public string Nombre { get; set; }
        public string NombreIngles { get; set; }
        public Nullable<int> PruebasTipoInformeID { get; set; }
        public Nullable<int> PruebasNivelID { get; set; }
        public bool Activo { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public System.DateTime FechaModificacion { get; set; }
    }
}