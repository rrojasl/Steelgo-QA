using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Soldadura
{
    public class CapturaSoldadura
    {
        public string NumeroControl { get; set; }
        public string Junta { get; set; }
        public string FechaControl { get; set; }
        public string Tubero { get; set; }
        public string Taller { get; set; }

    }

    public class TrabajosAdicionalesSoldadura
    {
        public int JuntaSpoolID { get; set; }
        public int TrabajoAdicionalID { get; set; }
        public string TrabajoAdicional { get; set; }
        public int ObreroID { get; set; }
        public string Soldador { get; set; }
        public string Observacion { get; set; }
        List<TrabajosAdicionales> listaTrabajosAdicionalesSoldadura { get; set; }
    }


    public class DetalleDatosJsonSoldadura
    {
        public string Proyecto { get; set; }
        public string IdOrdenTrabajo { get; set; }
        public string OrdenTrabajo { get; set; }
        public string idVal { get; set; }
        public string idText { get; set; }
        public string SpoolID { get; set; }
        public string JuntaID { get; set; }
        public string Junta { get; set; }
        public string FechaArmado { get; set; }
        public string tallerID { get; set; }
        public string Taller { get; set; }
        public string TipoJunta { get; set; }
        public string Diametro { get; set; }
        public string Cedula { get; set; }
        public string Localizacion { get; set; }
        public string TemplateMensajeTrabajosAdicionales { get; set; }
        public List<TrabajosAdicionalesSoldadura> DetalleAdicional { get; set; }
        public List<TrabajosAdicionales> listaTrabajosAdicionalesSoldadura { get; set; }
        public List<Raiz> ListadoRaiz { get; set; }
        public List<Relleno> ListadoRelleno { get; set; }
        public string SinCaptura { get; set; }
        public int juntaSpoolID { get; set; }
        public int procesoSoldaduraRaizID { get; set; }
        public int procesoSoldaduraRellenoID { get; set; }
    }

    public class TrabajoAdicional
    {
        public string Trabajo { get; set; }
        public string Observacion { get; set; }
    }

    public class Raiz
    {
        public int ObreroID { get; set; }
        public string Soldador { get; set; }
        public string wps { get; set; }
    }

    public class Relleno
    {
        public int ProcesoSoldaduraID { get; set; }
        public string Proceso { get; set; }
        public int ObreroID { get; set; }
        public string Soldador { get; set; }
        public string wps { get; set; }
    }
    public class CamposPredeterminados
    {
        public string FechaSoldadura { get; set; }
        public bool Muestra { get; set; }
    }

    public class IdOrdenTrabajo
    {
        public string OrdenTrabajo { get; set; }
        public List<IDS> idStatus { get; set; }
    }
    
    public class IDS
    {
        public string Status { get; set; }
        public string IDValido { get; set; }
        public int Valor { get; set; }
        public string Proyecto { get; set; }
        public int ProyectoID { get; set; }
    }
}