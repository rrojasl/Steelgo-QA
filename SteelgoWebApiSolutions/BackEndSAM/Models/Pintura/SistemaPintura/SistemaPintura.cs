﻿using BackEndSAM.Models.Pintura.PinturaGeneral;
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
        public decimal MetrosLote { get; set; }
        public int NumeroPruebas { get; set; }
        public int SistemaPinturaProyectoProcesoID { get; set; }
        public int ProyectoID { get; set; }
        public int SistemaPinturaID { get; set; }
        public int SistemaPinturaProyectoID { get; set; }

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
        public int ProyectoProcesoPruebaID { get; set; }
        public int SistemaPinturaProyectoProcesoID { get; set; }
        public int UnidadMedidaID { get; set; }
        public string UnidadMedida { get; set; }
        public double UnidadMinima { get; set; }
        public double UnidadMaxima { get; set; }
        public int PruebaProcesoPinturaID { get; set; }
        public string ProyectoProcesoPrueba { get; set; }
    }

    public class SistemaPinturaEdicion
    {
        public string Nombre { get; set; }
        public int SistemaPinturaID { get; set; }
        public bool NoPintable { get; set; }
        public List<Sam3General.Proyectos> listadoProyectos { get; set; }
        public List<Color> listadoColor { get; set; }
    }

    public class Captura
    {
        public List<GuardarSistemaPintura> Detalles { get; set; }
    }

    public class GuardarSistemaPintura
    {
        public int Accion { get; set; }
        public int ProcesoPinturaID { get; set; }
        public decimal MetrosLote { get; set; }
        public int NumeroPruebas { get; set; }
        public int SistemaPinturaProyectoID { get; set; }
        public int SistemaPinturaProyectoProcesoID { get; set; }
        public List<GuardarPruebasProceso> ListadoPruebasProceso { get; set; }
        public List<GuardarColor> ListadoColor { get; set; }
        public List<GuardarProyecto> ListadoProyectos { get; set; }
    }
    public class GuardarPruebasProceso
    {
        public int Accion { get; set; }
        public int ProyectoProcesoPruebaID { get; set; }
        public int SistemaPinturaProyectoProcesoID { get; set; }
        public int UnidadMedidaID { get; set; }
        public decimal UnidadMinima { get; set; }
        public decimal UnidadMaxima { get; set; }
    }

    public class GuardarColor
    {
        public int Accion { get; set; }
        public int ColorID { get; set; }
    }

    public class GuardarProyecto
    {
        public int ProyectoID { get; set; }
    }

    public class DetalleGuardarCaptura
    {
        public List<DetalleGuardar> Detalles { get; set; }
    }

    public class DetalleGuardar
    {
        public List<SPNuevo> ListaSPNuevo { get; set; }
        public List<SPProyecto> ListaSPProyecto { get; set; }
        public List<SPColor> ListaSPColor { get; set; }
        public List<SPProyectoProceso> ListaSPProyectoProceso { get; set; }
        
    }

    public class SPNuevo
    {
        public string Nombre { get; set; }
        public int NoPintable { get; set; }
        public int Accion { get; set; }
    }

    public class SPProyecto {
        public int ProyectoID { get; set; }
        public int Accion { get; set; }
    }

    public class SPColor
    {
        public int ColorID { get; set; }
        public int Accion { get; set; }
    }

    public class SPProyectoProceso
    {
        public int Accion { get; set; }
        public int ProcesoPinturaID { get; set; }
        public double MetrosLote { get; set; }
        public int NumeroPruebas { get; set; }
        public int ProyectoID { get; set; }
        public List<SPProyectoProcesoPrueba> ListadoPruebas { get; set; }
    }

    public class SPProyectoProcesoPrueba
    {
        public int ProyectoID { get; set; }
        public int ProcesoPinturaID { get; set; }
        public int UnidadMedidaID { get; set; }
        public int UnidadMinima { get; set; }
        public int UnidadMaxima { get; set; }
        public int PruebaProcesoPinturaID { get; set; }
        public int Accion { get; set; }
    }

}