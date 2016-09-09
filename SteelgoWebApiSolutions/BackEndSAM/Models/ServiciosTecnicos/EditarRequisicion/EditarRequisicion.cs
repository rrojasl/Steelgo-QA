﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.ServiciosTecnicos.EditarRequisicion
{
    public class EditarRequisicion
    {
        public class ElementosPorClasificacion
        {
            public ElementosPorClasificacion()
            {
                Accion = 0;
                NumeroControl = "";
                EtiquetaJunta = "";
                TipoJunta = "";
                NombreRequisicion = "";
                Cuadrante = "";
                Prioridad = 0;
                Clasificacion = "";
                Diametro = 0;
                Espesor = 0;
                Cedula = "";
                ElementoPorClasificacionPNDID = 0;
                Agregar = false;
                RequisicionID = 0;
                ProyectoID = 0;
                SpoolID = 0;
                JuntaSpoolID = 0;
                OrdenTrabajoSpoolID = 0;
                TipoPruebaID = 0;
                Especificacion = "";
            }

            public int Accion { get; set; }
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
            public bool Agregar { get; set; }
            public int RequisicionID { get; set; }
            public int ProyectoID { get; set; }
            public int SpoolID { get; set; }
            public int JuntaSpoolID { get; set; }
            public int OrdenTrabajoSpoolID { get; set; }
            public int TipoPruebaID { get; set; }
            public string Especificacion { get; set; }
        }

        public class Captura
        {
            public Captura()
            {
                RequisicionID = 0;
                Requisicion = "";
                ProyectoID = 0;
                TipoPruebaID = 0;
                CodigoAsme = "";
                Observacion = "";
            }
            public int RequisicionID { get; set; }
            public string Requisicion { get; set; }
            public int ProyectoID { get; set; }
            public int TipoPruebaID { get; set; }
            public string FechaRequisicion { get; set; }
            public string CodigoAsme { get; set; }
            public string Observacion { get; set; }
            public List<DetalleCaptura> listaDetalle { get; set; }
        }

        public class DetalleCaptura
        {
            public DetalleCaptura()
            {
                RequisicionID = 0;
                ElementoPorClasificacionPNDID = 0;
            }

            public int Accion { get; set; }
            public int RequisicionID { get; set; }
            public int ElementoPorClasificacionPNDID { get; set; }
        }

        public class Proyecto
        {
            public Proyecto()
            {
                ProyectoID = 0;
                Nombre = "";
            }
            public int ProyectoID { get; set; }
            public string Nombre { get; set; }
        }

        public class TipoPrueba
        {
            public TipoPrueba()
            {
                TipoPruebaID = 0;
                Nombre = "";
            }

            public int TipoPruebaID { get; set; }
            public string Nombre { get; set; }
        }

        public class Requisicion
        {
            public Requisicion()
            {
                RequisicionID = 0;
                TipoPruebaID = 0;
                ProyectoID = 0;
                NombreRequisicion = "";
            }

            public int RequisicionID { get; set; }
            public int TipoPruebaID { get; set; }
            public int ProyectoID { get; set; }
            public string NombreRequisicion { get; set; }

        }

        public class ElementosRequisicion
        {
            public int RequisicionID { get; set; }
            public int ProyectoID { get; set; }
            public int TipoPruebaID { get; set; }
            public List<Proyecto> listaProyecto { get; set; }
            public List<TipoPrueba> listaTipoPrueba { get; set; }
            public List<Requisicion> listaRequisicion { get; set; }
        }
    }
}