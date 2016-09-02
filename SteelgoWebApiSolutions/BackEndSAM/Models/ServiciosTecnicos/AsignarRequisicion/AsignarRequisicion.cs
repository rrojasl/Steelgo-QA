using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.ServiciosTecnicos.AsignarRequisicion
{
    public class AsignarRequisicion
    {
    }

    public class RequisicionAsignacion
    {
        public int Accion { get; set; }
        public int RequisicionAsignacionID { get; set; }
        public string Nombre { get; set; }
        public int TipoPruebaID { get; set; }
        public string Clave { get; set; }
        public string Observacion { get; set; }
        public string Fecha { get; set; }
        public int RequisicionID { get; set; }
        public int ProyectoID { get; set; }
        public string Requisicion { get; set; }
        public int CantidadJuntas { get; set; }
        public int ProveedorID { get; set; }
        public int ProveedorOriginalID { get; set; }
        public string Proveedor { get; set; }
        public string Capacidad { get; set; }
        public List<Proveedor> ListaProveedor { get; set; }
        public int HerramientadePruebaID { get; set; }
        public int HerramientadePruebaOriginalID { get; set; }
        public string HerramientadePrueba { get; set; }
        public List<Equipo> ListaHerramientaPrueba { get; set; }
        public List<Equipo> ListaHerramientaPruebaTotal { get; set; }
        public int TurnoLaboralID { get; set; }
        public int TurnoLaboralOriginalID { get; set; }
        public string TurnoLaboral { get; set; }
        public List<TurnoLaboral> ListaTurnoLaboral { get; set; }
        public List<TurnoLaboral> ListaTurnoLaboralTotal { get; set; }
        
        public string JuntasAsignadas { get; set; }
        public string JuntasAsignadasOriginal { get; set; }
    }

    public class Proveedor
    {
        public Proveedor()
        {
            ProveedorID = 0;
            Nombre = "";
            Capacidad = "";
            ListaHerramientaPrueba = new List<Equipo>();
            ListaTurnoLaboral = new List<TurnoLaboral>();
        }
        public int ProveedorID { get; set; }
        public string Nombre { get; set; }
        public string Capacidad { get; set; }
        public List<Equipo> ListaHerramientaPrueba { get; set; }
        public List<TurnoLaboral> ListaTurnoLaboral { get; set; }
    }


    public class Equipo
    {
        public Equipo()
        {
            HerramientadePruebaID = 0;
            HerramientadePrueba = "";
            DescHerramientaPrueba = "";
            Modelo = "";
            ProveedorID = 0;
        }

        public int HerramientadePruebaID { get; set; }
        public string HerramientadePrueba { get; set; }
        public string DescHerramientaPrueba { get; set; }
        public string Modelo { get; set; }
        public int ProveedorID { get; set; }
    }

    public class TurnoLaboral
    {
        public TurnoLaboral()
        {
            TurnoLaboralID = 0;
            Turno = "";
            ProveedorID = 0;
            Capacidad = 0;
            JuntasAsignadas = 0;
            HerramientaDePruebaID = 0;
            TipoPruebaID = 0;
        }

        public int TurnoLaboralID { get; set; }
        public string Turno { get; set; }
        public int ProveedorID { get; set; }
        public int Capacidad { get; set; }
        public int JuntasAsignadas { get; set; }
        public int HerramientaDePruebaID { get; set; }
        public int TipoPruebaID { get; set; }
    }
}