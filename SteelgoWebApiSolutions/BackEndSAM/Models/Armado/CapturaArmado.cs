using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Armado
{
    public class CapturaArmado
    {
        public string NumeroControl { get; set; }
        public string Junta { get; set; }

        public string FechaControl { get; set; }

        public string Tubero { get; set; }

        public string Taller { get; set; }

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

    public class CamposPredeterminados
    {
        public string FechaArmado { get; set; }

        public bool Muestra { get; set; }

    }



    public class DetalleDatosJson
    {
        public int IDProyecto { get; set; }
        public string Proyecto { get; set; }
        public string IdOrdenTrabajo { get; set; }
        public string OrdenTrabajo { get; set; }
        public string IdVal { get; set; }
        public string IdText { get; set; }
        public string SpoolID { get; set; }
        public string JuntaID { get; set; }
        public string Junta { get; set; }
        public string FechaArmado { get; set; }
        public string tuberoID { get; set; }
        public string Tubero { get; set; }
        public List<Tubero> ListaTubero { get; set; }
        public string TallerID { get; set; }
        public string Taller { get; set; }
        public List<Taller> ListaTaller { get; set; }
        public string TipoJunta { get; set; }
        public string Diametro { get; set; }
        public string Cedula { get; set; }
        public string Localizacion { get; set; }
        public string FamiliaAcero { get; set; }
        public string NumeroUnico1 { get; set; }
        public string NumeroUnico2 { get; set; }
        public string TemplateMensajeTrabajosAdicionales { get; set; }
        public List<NumeroUnico> ListaNumerosUnicos1 { get; set; }
        public List<NumeroUnico> ListaNumerosUnicos2 { get; set; }
        public string SinCaptura { get; set; }
        public List<DetalleTrabajoAdicional> ListaDetalleTrabajoAdicional { get; set; }

        public List<TrabajosAdicionalesXJunta> listadoTrabajosAdicionalesXJunta { get; set; }
    }

   

    public class Taller
    {
        public int TallerID { get; set; }

        public string Nombre { get; set; }
    }

    public class Tubero
    {
        public int ObreroID { get; set; }
        public string Codigo { get; set; }
    }

    public class NumeroUnico
    {
        public int NumeroUnicoID { get; set; }
        public string Clave { get; set; }

        public int EtiquetaMaterial { get; set; }

        public string Etiqueta { get; set; }
    }
    public class DetalleTrabajoAdicional
    {
        public int ArmadoTrabajoAdicionalID { get; set; }
        public int JuntaArmadoID { get; set; }
        public int TrabajoAdicionalID { get; set; }
        public string TrabajoAdicional { get; set; }
        public int ObreroID { get; set; }
        public string Tubero { get; set; }
        public string Observacion { get; set; }
    }

    public class TrabajosAdicionalesXJunta
    {
        public int TrabajoAdicionalID { get; set; }
        public string NombreCorto { get; set; }
        public string SignoInformativo { get; set; } //para saber si 
    }

    public class Captura
    {
        public List<DetalleGuardarJson> Detalles { get; set; }
    }
    public class DetalleGuardarJson
    {
        public int IDProyecto { get; set; }
        public string Proyecto { get; set; }
        public string IdOrdenTrabajo { get; set; }
        public string OrdenTrabajo { get; set; }
        public string IdVal { get; set; }
        public string IdText { get; set; }
        public string SpoolID { get; set; }
        public string JuntaID { get; set; }
        public string Junta { get; set; }
        public string FechaArmado { get; set; }
        public string TuberoID { get; set; }
        public string Tubero { get; set; }
        public string TallerID { get; set; }
        public string Taller { get; set; }
        public string TipoJunta { get; set; }
        public string Diametro { get; set; }
        public string Cedula { get; set; }
        public string Localizacion { get; set; }
        public string FamiliaAcero { get; set; }
        public string NumeroUnico1 { get; set; }
        public string NumeroUnico2 { get; set; }
        public string SinCaptura { get; set; }
        public List<DetalleTrabajoAdicional> ListaDetalleTrabajoAdicional { get; set; }
    }
}