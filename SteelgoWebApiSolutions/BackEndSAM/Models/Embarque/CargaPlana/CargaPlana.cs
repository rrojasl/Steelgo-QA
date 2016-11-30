﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Embarque.CargaPlana
{
    public class DetalleCargaPlana
    {
        public int Accion { get; set; }
        public int DetalleCargaID { get; set; }
        public int SpoolID { get; set; }
        public int OrdenTrabajoID { get; set; }
        public string Spool { get; set; }
        public int PaqueteID { get; set; }
        public string Paquete { get; set; }
        public decimal Peso { get; set; }
        public int CuadranteID { get; set; }
        public int CuadranteAnteriorID { get; set; }
        public bool ModificadoPorUsuario { get; set; }
    }

    public class DetalleSpoolAgregar
    {
        public int Accion { get; set; }
        public int DetalleCargaID { get; set; }
        public int SpoolID { get; set; }
        public int OrdenTrabajoID { get; set; }
        public string Spool { get; set; }
        public int Empaquetado { get; set; }
        public string Paquete { get; set; }
        public int PaqueteID { get; set; }
        public decimal Peso { get; set; }
        public int CuadranteID { get; set; }
        public int CuadranteAnteriorID { get; set; }
        public bool ModificadoPorUsuario { get; set; }
        public int Cargado { get; set; }
        public string PlanaCargado { get; set; }
    }

    public class DetallePaqueteAgregar
    {
        public int Accion { get; set; }
        public int DetalleCargaID { get; set; }
        public int SpoolID { get; set; }
        public int OrdenTrabajoID { get; set; }
        public string Spool { get; set; }
        public int PaqueteID { get; set; }
        public string Paquete { get; set; }
        public decimal Peso { get; set; }
        public int CuadranteID { get; set; }
        public int CuadranteAnteriorID { get; set; }
        public bool ModificadoPorUsuario { get; set; }
        public int Cargado { get; set; }
        public string PlanaCargado { get; set; }
    }

    public class Captura
    {
        public List<DetalleGuardadoCargaPlana> listaDetalle { get; set; }
    }

    public class DetalleGuardadoCargaPlana
    {
        public int Accion { get; set; }
        public int DetalleCargaID { get; set; }
        public int SpoolID { get; set; }
        public int OrdenTrabajoID { get; set; }
        public int CuadranteActualID { get; set; }
        public int PaqueteID { get; set; }
    }
}