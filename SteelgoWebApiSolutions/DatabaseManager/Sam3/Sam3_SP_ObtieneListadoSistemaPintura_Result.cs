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
    
    public partial class Sam3_SP_ObtieneListadoSistemaPintura_Result
    {
        public int SistemaPinturaID { get; set; }
        public string SistemaPintura { get; set; }
        public Nullable<bool> AsignadoSpool { get; set; }
        public string Proyecto { get; set; }
        public Nullable<int> ProyectoProcesoShotblastID { get; set; }
        public Nullable<int> PruebaPorLoteShotblast { get; set; }
        public Nullable<double> MetrosPorLoteShotblast { get; set; }
        public Nullable<int> ProyectoProcesoPrimarioID { get; set; }
        public Nullable<int> PruebaPorLotePrimario { get; set; }
        public Nullable<double> MetrosPorLotePrimario { get; set; }
        public Nullable<int> ProyectoProcesoIntermedioID { get; set; }
        public Nullable<int> PruebaPorLoteIntermedio { get; set; }
        public Nullable<double> MetrosPorLoteIntermedio { get; set; }
        public Nullable<int> ProyectoProcesoAcabadoID { get; set; }
        public Nullable<int> PruebaPorLoteAcabado { get; set; }
        public Nullable<double> MetrosPorLoteAcabado { get; set; }
    }
}
