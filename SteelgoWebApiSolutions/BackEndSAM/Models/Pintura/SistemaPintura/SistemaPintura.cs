using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Pintura.SistemaPintura
{
    public class SistemaPinturaNuevo
    {
        public int Accion { get; set; }
        public bool Agregar { get; set; }
        public int ProcesoPinturaID { get; set; }
        public string Proceso { get; set; }
        public List<UnidadMedida> listadoUnidadesMedida { get; set; }
        public List<PruebasProcesos> listadoPruebasProceso { get; set; }
        public List<DetallePruebas> listadoPruebasDetalle { get; set; }
    }

    public class UnidadMedida
    {
        public UnidadMedida()
        {
            UnidadMedidaID = 0;
            Nombre = "";
        }
        public int UnidadMedidaID { get; set; }
        public string Nombre { get; set; }
    }

    public class PruebasProcesos
    {
        public PruebasProcesos()
        {
            ProcesoPinturaID = 0;
            Nombre = "";
            PruebaProcesoPinturaID = 0;
        }
        public int ProcesoPinturaID { get; set; }
        public string Nombre { get; set; }
        public int PruebaProcesoPinturaID { get; set; }
    }

    public class DetallePruebas
    {
        public int Accion { get; set; }
        public string Prueba { get; set; }
        public int PruebaID { get; set; }
        public string UnidadMedida { get; set; }
        public int UnidadMedidaID { get; set; }
        public int UnidadMinima { get; set; }
        public int UnidadMaxima { get; set; }
    }
}