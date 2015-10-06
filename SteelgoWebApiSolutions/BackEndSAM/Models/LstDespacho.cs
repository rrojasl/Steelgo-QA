using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models
{
    public class LstDespacho
    {
        public string NumeroControl { get; set; }
        public string NumeroEtiqueta { get; set; }
        public string ItemCode { get; set; }
        public int Cantidad { get; set; }
        public string Descripcion { get; set; }
        public string NumeroUnico { get; set; }
        public string FechaDespacho { get; set; }
    }

    public class LstGenerarDespacho
    {
        public string NumeroControl { get; set; }
        public string ItemCode { get; set; }
        public string Descripcion { get; set; }
        public string NumeroUnico { get; set; }
        public string Etiqueta { get; set; }
        public string Baston { get; set; }
        public string ProyectoID { get; set; }
        public bool Hold { get; set; }
    }

    public class GuardarCorte
    {
        public string CorteID { get; set; }
        public string Maquina { get; set; }
        public string Operador { get; set; }
        public string NumeroUnico { get; set; }
        public string TramoCompleto { get; set; }
        public string Total { get; set; }
        public string Sobrante { get; set; }
        public string Merma { get; set; }
        public string ProyectoID { get; set; }
        public string Segmento 
        {
            get
            {
                string[] elementos = _segmento.Split('-').ToArray();
                return elementos[2];
            }
            set
            {
                _segmento = value;
            }
        }

        private string _segmento;

        public List<DetalleCortes> Detalle { get; set; }

        public GuardarCorte()
        {
            Detalle = new List<DetalleCortes>();
        }
    }

    public class DetalleCortes
    {
        public string SpoolID { get; set; }
        public string Etiqueta { get; set; }
        public string Cantidad { get; set; }
        public string CantidadIngenieria { get; set; }
    }

    public class MaterialPendiente 
    {
        public string SpoolID { get; set; }
        public string ProyectoID { get; set; }
        public string ItemCodeSteelgo { get; set; }
    }

    public class EdicionCorte
    {
        public Maquina Maquina { get; set; }
        public Operador Operador { get; set; }
        public Proyecto Proyecto { get; set; }
        public NumerosUnicos NumeroUnico { get; set; }
        public int Cantidad { get; set; }
        public string ItemCode { get; set; }
        public decimal Diametro1 { get; set; }
        public string OrdenTrabajo { get; set; }
        public string Consecutivo { get; set; }
        public string Etiqueta { get; set; }
        public int MermaTeorica { get; set; }
        public int Tolerancia { get; set; }
    }
}