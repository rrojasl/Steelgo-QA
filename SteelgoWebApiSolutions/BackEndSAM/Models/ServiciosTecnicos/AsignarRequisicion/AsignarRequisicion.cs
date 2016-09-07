﻿using BackEndSAM.Models.ServiciosTecnicos.ServiciosTecnicosGeneral;
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
        public List<ServiciosTecnicosGeneral.Proveedor> ListaProveedor { get; set; }
        public int EquipoID { get; set; }
        public int HerramientadePruebaOriginalID { get; set; }
        public string Equipo { get; set; }
        public List<Equipo> ListaEquipos { get; set; }
        public List<Equipo> ListaEquiposTotal { get; set; }
        public int TurnoLaboralID { get; set; }
        public int TurnoLaboralOriginalID { get; set; }
        public string TurnoLaboral { get; set; }
        public bool RequiereEquipo { get; set; }
        public List<TurnoLaboral> ListaTurnoLaboral { get; set; }
        public List<TurnoLaboral> ListaTurnoLaboralTotal { get; set; }
        public List<ElementosRequisicion> ListaElementosRequisicion { get; set; }
        public string JuntasAsignadas { get; set; }
        public string JuntasAsignadasOriginal { get; set; }
        public int CapacidadTurnoProveedorID { get; set; }
        public int CapacidadTurnoEquipoID { get; set; }
        public int ProveedorEquipoID { get; set; }
        public int TipoPruebaProveedorID { get; set; }
    }
    

    public class GuardarRequisicionAsignacion
    {
        public int Accion { get; set; }
        public int RequisicionAsignacionID { get; set; }
        public int RequisicionID { get; set; }
        public int ProveedorID { get; set; }
        public int EquipoID { get; set; }
        public int TurnoLaboralID { get; set; }
        public string Fecha { get; set; }
    }

    public class Captura
    {
        public List<GuardarRequisicionAsignacion> Detalles { get; set; }
    }

    public  class ElementosRequisicion
    {
        public string NumeroControl { get; set; }
        public string EtiquetaJunta { get; set; }
        public string TipoJunta { get; set; }
        public string NombreRequisicion { get; set; }
        public string Cuadrante { get; set; }
        public int Prioridad { get; set; }
        public string Clasificacion { get; set; }
        public decimal Diametro { get; set; }
        public decimal Espesor { get; set; }
        public string Cedula { get; set; }
        public int ElementoPorClasificacionPNDID { get; set; }
        public int RequisicionID { get; set; }
        public int ProyectoID { get; set; }
        public int SpoolID { get; set; }
        public int JuntaSpoolID { get; set; }
        public int OrdenTrabajoSpoolID { get; set; }
        public int TipoPruebaID { get; set; }
        public string Especificacion { get; set; }
    }

}