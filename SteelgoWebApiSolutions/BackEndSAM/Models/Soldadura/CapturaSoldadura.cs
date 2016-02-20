using System;
using System.Collections.Generic;


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
        public int Accion { get; set; }
        public int JuntaSpoolID { get; set; }
        public int SoldaduraTrabajoAdicionalID { get; set; }
        public int JuntaSoldaduraID { get; set; }
        public int TrabajoAdicionalID { get; set; }
        public string TrabajoAdicional { get; set; }
        public int ObreroID { get; set; }
        public string Soldador { get; set; }
        public string Observacion { get; set; }
        public string SignoInformativo { get; set; }
    }


    public class DetalleDatosJsonSoldadura
    {
        public int IDProyecto { get; set; }
        public string Proyecto { get; set; }
        public string IdOrdenTrabajo { get; set; }
        public string OrdenTrabajo { get; set; }
        public string idVal { get; set; }
        public string idText { get; set; }
        public string SpoolID { get; set; }
        public string JuntaID { get; set; }
        public string JuntaTrabajoID { get; set; }
        public string Junta { get; set; }
        public string FechaSoldadura { get; set; }
        public string TallerID { get; set; }
        public string Taller { get; set; }
        public string TipoJuntaID { get; set; }
        public string TipoJunta { get; set; }
        public string Cedula { get; set; }
        public string Localizacion { get; set; }
        public string TemplateMensajeTrabajosAdicionales { get; set; }
        public string NumeroUnico1ID { get; set; }
        public string NumeroUnico2ID { get; set; }
        public List<TrabajosAdicionalesSoldadura> DetalleAdicional { get; set; }
        public List<Raiz> Raiz { get; set; }
        public List<Raiz> RaizDetalle { get; set; }
        public List<Raiz> RaizInicial { get; set; }
        public List<Raiz> Relleno { get; set; }
        public List<Raiz> RellenoDetalle { get; set; }
        public List<Raiz> RellenoInicial { get; set; }
        public List<TrabajosAdicionalesSoldadura> listaTrabajosAdicionalesSoldadura { get; set; }
        public List<SoldadorRaizCertificado> ListadoRaiz { get; set; }
        public List<ProcesoSoldadura> ListadoProcesoSoldadura { get; set; }
        public List<SoldadorRaizCertificado> ListadoRelleno { get; set; }
        public List<ObreroSoldador> ListadoSoldadoresTrabajos { get; set; }
        public string SinCaptura { get; set; }
        public int juntaSpoolID { get; set; }
        public int procesoSoldaduraRaizID { get; set; }
        public int procesoSoldaduraRellenoID { get; set; }
        public string procesoSoldaduraRaiz { get; set; }
        public string procesoSoldaduraRelleno { get; set; }
        public int Accion { get; set; }
        public int JuntaSoldaduraID { get; set; }
        public string Etiqueta { get; set; }
        public string EtiquetaMaterial1 { get; set; }
        public string EtiquetaMaterial2 { get; set; }
        public string SoldadoresRaiz { get; set; }
        public string TrabajosAdicionales { get; set; }
        public string SoldadoresRelleno { get; set; }
        public List<Taller> ListaTaller { get; set; }
        public string DetalleJunta { get; set; }
        public decimal Diametro { get; set; }
        public decimal Espesor { get; set; }
        public bool PermiteTerminadoRelleno { get; set; }
        public bool PermiteTerminadoRaiz { get; set; }

    }

    public class Taller
    {
        public int TallerID { get; set; }
        public string Nombre { get; set; }
    }

    public class ProcesoSoldadura
    {
        public int ProcesoSoldaduraID { get; set; }
        public string Codigo { get; set; }
    }

    public class TrabajoAdicional
    {
        public string Trabajo { get; set; }
        public string Observacion { get; set; }
    }
    public class ObreroSoldador
    {
        public int ObreroID { get; set; }
        public string Soldador { get; set; }
    }

    public class Raiz
    {
        public int Accion { get; set; }
        public int JuntaSoldaduraSoldadoID { get; set; }
        public int JuntaSoldaduraID { get; set; }
        public int ObreroID { get; set; }
        public string Soldador { get; set; }
        public string wps { get; set; }
    }

    public class SoldadorRaizCertificado
    {
        
        public int ObreroID { get; set; }
        public string Soldador { get; set; }
        public int PQRID { get; set; }
    }

    public class Relleno
    {
        public int Accion { get; set; }
        public int JuntaSoldaduraSoldadoID { get; set; }
        public int JuntasoldaduraID { get; set; }
        public int ObreroID { get; set; }
        public string Soldador { get; set; }
        public string wps { get; set; }
    }
    public class CamposPredeterminados
    {
        public string FechaSoldadura { get; set; }
        public string Muestra { get; set; }
        public string Llena { get; set; }
        public string FormatoFecha { get; set; }
        public string TipoCaptura { get; set; }
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

    public class Captura
    {
        public List<DetalleGuardarJson> Detalles { get; set; }
    }

    public class DetalleGuardarJson
    {
        public int Accion { get; set; }
        public string OrdenTrabajoSpoolID { get; set; }
        public string JuntaSpoolID { get; set; }
        public int TipoJuntaID { get; set; }
        public string EtiquetaJunta { get; set; }
        public string EtiquetaMaterial1 { get; set; }
        public string EtiquetaMaterial2 { get; set; }
        public int JuntaSoldaduraID { get; set; }
        public int JuntaTrabajoID { get; set; }
        public string NumeroUnico1ID { get; set; }
        public string NumeroUnico2ID { get; set; }
        public string TallerID { get; set; }
        public Nullable<int> ProcesoSoldaduraRaizID { get; set; }
        public Nullable<int> ProcesoSoldaduraRellenoID { get; set; }
        public string FechaSoldadura { get; set; }
        public string FechaReporte { get; set; }

        public List<DetalleGuardarTrabajoAdicional> ListaDetalleTrabajoAdicional { get; set; }
        public List<GuardarSoldaduraSoldado> ListaSoldaduraRaiz { get; set; }
        public List<GuardarSoldaduraSoldado> ListaSoldaduraRelleno { get; set; }

    }

    public class GuardarSoldaduraSoldado
    {
        public int Accion { get; set; }
        public int JuntaSpoolID { get; set; }
        public int JuntaSoldaduraSoldadoID { get; set; }
        public int JuntaSoldaduraID { get; set; }
        public int ObreroID { get; set; }
        public int TipoSoldaduraID { get; set; }
    }


    public class DetalleGuardarTrabajoAdicional
    {
        public int Accion { get; set; }
        public int JuntaSpoolID { get; set; }
        public int SoldaduraTrabajoAdicionalID { get; set; }
        public int JuntaSoldaduraID { get; set; }
        public int TrabajoAdicionalID { get; set; }
        public int ObreroID { get; set; }
        public string Observacion { get; set; }
    }

}