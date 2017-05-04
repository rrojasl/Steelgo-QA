using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Sam3General.OK
{
    public class ElementosOK
    {
        public ElementosOK()
        {
            SpoolWorkStatusID = 0;
            NumeroControl = "";
            Cuadrante = "";
            Prioridad = 0;
            ProyectoID = 0;
            SpoolID = 0;
            OrdenTrabajoSpoolID = 0;
            OK = false;
            Coincide = 0;
        }

        public int SpoolWorkStatusID { get; set; }
        public string NumeroControl { get; set; }
        public string Cuadrante { get; set; }
        public int Prioridad { get; set; }

        public int SpoolID { get; set; }
        public int ProyectoID { get; set; }
        public int OrdenTrabajoSpoolID { get; set; }
        public bool OK { get; set; }
        public int Coincide { get; set; }
        //public List<Detalle> ListaDetalle { get; set; }
        public string Detalle { get; set; }
    }

    public class Detalle
    {
        public int JuntaSpoolID { get; set; }
        public string Etiqueta { get; set; }
        public string Codigo { get; set; }
        public string Cedula { get; set; }
        public decimal Diametro { get; set; }
        public decimal Espesor { get; set; }
        public string Nombre { get; set; }
        public string TipoPrueba { get; set; }
        public string NumeroRequisicion { get; set; }
    }

    public class Datos
    {
        public List<ListaElementos> Detalle { get; set; }
    }

    public class CapturaOKMasiva
    {
        public string Detalle { get; set; }
    }

    public class ListaElementos
    {
        //public int SpoolWorkStatusID { get; set; }
        public int SpoolID { get; set; }
        public int OrdenTrabajoSpoolID { get; set; }
        public bool OK { get; set; }

    }

    public class ListaElementosMasivo
    {
        public List<ElementosOKMasivo> Elementos;
    }

    public class ElementosOKMasivo
    {
        public string NumeroControl { get; set; }
        //public string OKPND { get; set; }
        public string OK { get; set; }
        public string OE { get; set; }
    }

    public class ElementosMasivoResult
    {
        public string NumeroControl { get; set; }
        public string OK { get; set; }
        public string Actualizado { get; set; }
    }  
}