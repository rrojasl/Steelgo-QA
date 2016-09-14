﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.ServiciosTecnicos.ReporteRT
{
    public class Proyectos
    {
        public Proyectos()
        {
            ProyectoID = 0;
            Nombre = "";
            PatioID = 0;
            PrefijoOrdenTrabajo = "";
        }
        public int ProyectoID { get; set; }
        public string Nombre { get; set; }
        public int PatioID { get; set; }
        public string PrefijoOrdenTrabajo { get; set; }
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
            NombreEquipo = "";
        }

        public int EquipoID { get; set; }
        public string NombreEquipo { get; set; }
    }

    public class Requisicion
    {
        public Requisicion()
        {
            RequisicionID = 0;
            ProyectoID = 0;
            TipoPruebaID = 0;
            NombreRequisicion = "";
            CodigoAsme = "";
            FechaRequisicion = "";
            Observacion = "";
        }

        public int RequisicionID { get; set; }
        public int ProyectoID { get; set; }
        public int TipoPruebaID { get; set; }
        public string NombreRequisicion { get; set; }
        public string CodigoAsme { get; set; }
        public string FechaRequisicion { get; set; }
        public string Observacion { get; set; }
    }

    public class TurnoLaboral
    {
        public TurnoLaboral()
        {
            TurnoLaboralID = 0;
            Turno = "";
        }

        public int TurnoLaboralID { get; set; }
        public string Turno { get; set; }
    }
}