using System.Collections.Generic;

namespace BackEndSAM.Models.ServiciosTecnicos.AsignarRequisicion
{
    public class AsignarRequisicion
    {

    }

    public class Proveedor
    {
        public int ProveedorID { get; set; }
        public string Nombre { get; set; }
        public string Capacidad { get; set; }
        public List<HerramientaPrueba> ListaHerramientaPrueba { get; set; }
        public List<TurnoLaboral> ListaTurnoLaboral { get; set; }
    }

    public class RequisicionAsignacion
    {
        public int Accion { get; set; }
        public string Nombre { get; set; }
        public string Clave { get; set; }
        public string Observacion { get; set; }
        public string Fecha { get; set; }
        public int RequisicionID { get; set; }

        public string Requisicion { get; set; }
        public int CantidadJuntas { get; set; }
        public int ProveedorID { get; set; }
        public string Proveedor { get; set; }
        public List<Proveedor> ListaProveedor { get; set; }
        public int HerramientadePruebaID { get; set; }
        public string HerramientadePrueba { get; set; }
        public List<HerramientaPrueba> ListaHerramientaPrueba { get; set; }
        public int TurnoLaboralID { get; set; }
        public string TurnoLaboral { get; set; }
        public List<TurnoLaboral> ListaTurnoLaboral { get; set; }
    }

    public class HerramientaPrueba
    {
        public int HerramientadePruebaID { get; set; }

        public string HerramientadePrueba { get; set; }

        public string DescHerramientaPrueba { get; set; }

        public string Modelo { get; set; }
    }

    public class TurnoLaboral
    {
        public int TurnoLaboralID { get; set; }
        public string Turno { get; set; }
    }

    public class GuardarRequisicionAsignacion
    {
        public int Accion { get; set; }
        public int RequisicionID { get; set; }
        public int ProveedorID { get; set; }
        public int HerramientadePruebaID { get; set; }
        public int TurnoLaboralID { get; set; }
        public string Fecha { get; set; }
    }

    public class Captura
    {
        public List<GuardarRequisicionAsignacion> Detalles { get; set; }
    }
}