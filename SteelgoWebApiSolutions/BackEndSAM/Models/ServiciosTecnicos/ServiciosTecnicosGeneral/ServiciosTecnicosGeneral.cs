using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.ServiciosTecnicos.ServiciosTecnicosGeneral
{
    public class TiposDePrueba {
        public TiposDePrueba() {
            TipoPruebaID = 0;
            Nombre = "";
            Categoria = "";
            TipoPruebaPorSpool = 0;
        }

        public int TipoPruebaID { get; set; }
        public string Nombre { get; set; }
        public string Categoria { get; set; }
        public int TipoPruebaPorSpool { get; set; }
    }

    public class Requisicion
    {
        public Requisicion()
        {
            RequisicionID = 0;
            ProyectoID = 0;
            TipoPruebaID = 0;
            NombreRequisicion = "";
        }

        public int RequisicionID { get; set; }
        public int ProyectoID { get; set; }
        public int TipoPruebaID { get; set; }
        public string NombreRequisicion { get; set; }
    }



    public class Proveedor
    {
        public Proveedor()
        {
            ProveedorID = 0;
            Nombre = "";
        }

        public int ProveedorID { get; set; }
        public string Nombre { get; set; }
    }

    public class Equipo
    {
        public Equipo()
        {
            EquipoID = 0;
            Nombre = "";
            ProveedorEquipoID = 0;
            TipoPruebaProveedorID = 0;
        }
        public int EquipoID { get; set; }
        public string Nombre { get; set; }
        public int ProveedorEquipoID { get; set; }
        public int TipoPruebaProveedorID { get; set; }
    }

    public class TurnoLaboral
    {
        public int TurnoLaboralID { get; set; }
        public string Nombre { get; set; }
        public int Capacidad { get; set; }
        public int TipoPruebaProveedorID { get; set; }
        public int CapacidadTurnoProveedorID { get; set; }
        public int CapacidadTurnoEquipoID { get; set; }
    }
}