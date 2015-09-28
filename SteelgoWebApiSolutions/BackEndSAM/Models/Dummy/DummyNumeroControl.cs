using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models
{
    public class DummyNumeroControl
    {
        public string NumeroControl { get; set; }
        public string NumeroControlID { get; set; }
    }
    public class DummyDetalleNumeroUnico 
    {
        public string Cantidad { get; set; }
        public string ItemCode { get; set; }
        public string D1 { get; set; }
        public string Tolerancia { get; set; }
    }

    public class DummyDatosValidar
    {
        public string NumerUnicoID { get; set; }
        public string OrdenTrabajo { get; set; }
        public string Consecutivo { get; set; }
        public string Etiqueta { get; set; }
        public string EsTramoCompleto { get; set; }
        public string SpoolID { get; set; }
        public decimal Cantidad { get; set; }
        public decimal CantidadIngenieria { get; set; }
    }

    public class DummyDatosODTCorte {
        public DummyDatosValidar DatosODT { get; set; }

        public DummyDatosODTCorte()
        {
            DatosODT = new DummyDatosValidar();
        }
    }


    public class DummyDatosODTCorteGuardar
    {
        public string Maquina { get; set; }
        public string Operador { get; set; }
        public string NumeroUnico { get; set; }
        public string TramoCompleto { get; set; }
        public string Total { get; set; }
        public string Sobrante { get; set; }
        public string Merma { get; set; }

        public List<DummyDatosValidarGuardar> Cortes { get; set; }

        public DummyDatosODTCorteGuardar()
        {
            Cortes = new List<DummyDatosValidarGuardar>();
        }
    }

    public class DummyDatosValidarGuardar
    {
        public string SpoolID { get; set; }
        public string Etiqueta { get; set; }
        public string Cantidad { get; set; }
        public string CantidadIngenieria { get; set; }
    }

    public class Despacho
    {
        public List<DespachoItems> ListaDespachos { get; set; }

        public Despacho()
        {
            ListaDespachos = new List<DespachoItems>();
        }
    }
    public class DespachoItems
    {
        public string NumeroControl { get; set; }
        public string ItemCode { get; set; }
        public string NumeroUnico { get; set; }
        public string Etiqueta { get; set; }
        public string Baston { get; set; }
        public string ProyectoID { get; set; }
    }
}