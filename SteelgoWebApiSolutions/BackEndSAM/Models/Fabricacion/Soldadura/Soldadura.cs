﻿using BackEndSAM.Models.ConfiguracionSoldadura.WPS;
using BackEndSAM.Models.Sam3General.Consumible;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Fabricacion.Soldadura
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

    public class CapturaJuntas
    {
        List<DetalleDatosJsonSoldadura> Detalles { get; set; }
    }

    public class DetalleSoldadoresRaizCapturados
    {

    }

    public class DetalleCapturaSoldadura
    {
        public int IDProyecto { get; set; }
        public string Proyecto { get; set; }
        public string IdOrdenTrabajo { get; set; }
        public string OrdenTrabajo { get; set; }
        public string idVal { get; set; }
        public string idText { get; set; }
        public string SpoolID { get; set; }
        public string JuntaID { get; set; }
        public string Junta { get; set; }
        public string FechaSoldadura { get; set; }
        public string SinCaptura { get; set; }
        public int JuntaSoldaduraID { get; set; }
    }

    public class DetalleDatosJsonSoldadura
    {
        public int Accion { get; set; }
        public int IDProyecto { get; set; }
        public string Proyecto { get; set; }
        public string IdOrdenTrabajo { get; set; }
        public string OrdenTrabajo { get; set; }
        public string idVal { get; set; }
        public string idText { get; set; }
        public string SpoolID { get; set; }
        public string DetalleJunta { get; set; }
        public string TipoJuntaID { get; set; }
        public string TipoJunta { get; set; }
        public string TallerID { get; set; }
        public string Taller { get; set; }
        public List<Taller> ListaTaller { get; set; }
        public int WPSID { get; set; }
        public string WPSNombre { get; set; }
        public List<WPS> ListaWPS { get; set; }
        public decimal Diametro { get; set; }
        public string FechaSoldadura { get; set; }
        public int ProcesoSoldaduraRaizID { get; set; }
        public string ProcesoSoldaduraRaiz { get; set; }
        public List<ProcesoSoldadura> ListadoProcesoSoldaduraRaiz { get; set; }
        public List<Soldadores> ListaSoldadoresRaizCapturados { get; set; }
        public int ProcesoSoldaduraRellenoID { get; set; }
        public string ProcesoSoldaduraRelleno { get; set; }
        public List<ProcesoSoldadura> ListadoProcesoSoldaduraRelleno { get; set; }
        public List<Soldadores> ListaSoldadoresRellenoCapturados { get; set; }
        public string TemplateTrabajosAdicionales { get; set; }
        public List<TrabajosAdicionalesSoldadura> listaTrabajosAdicionalesSoldadura { get; set; }
        public string SinCaptura { get; set; }
        public string JuntaID { get; set; }
        public string Junta { get; set; }
        public string TemplateSoldadoresRaiz { get; set; }
        public string TemplateSoldadoresRelleno { get; set; }
        public List<ObreroSoldador> ListadoSoldadoresRaiz { get; set; }
        public List<ObreroSoldador> ListadoSoldadoresRelleno { get; set; }
        public List<Consumible> ListadoColadas { get; set; }
    }

    public class Taller
    {
        public int TallerID { get; set; }
        public string Nombre { get; set; }

        public Taller()
        {
            TallerID = 0;
            Nombre = "";
        }
    }

    public class ProcesoSoldadura
    {
        public int ProcesoSoldaduraID { get; set; }
        public string Codigo { get; set; }

        public ProcesoSoldadura()
        {
            ProcesoSoldaduraID = 0;
            Codigo = "";
        }
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

        public ObreroSoldador()
        {
            ObreroID = 0;
            Soldador = "";

        }
      

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

    public class Soldadores
    {
        public int Accion { get; set; }
        public int ObreroID { get; set; }
        public string Soldador { get; set; }
        public int ColadaID { get; set; }
        public string Colada { get; set; }
        public string Observaciones { get; set; }

        public Soldadores()
        {
            Accion = 0;
            ObreroID = 0;
            Soldador = "";
            ColadaID = 0;
            Colada = "";
            Observaciones = "";
        }

    }
    public class SoldadorRaizCertificado
    {
        public int Accion { get; set; }
        public int ObreroID { get; set; }
        public string Soldador { get; set; }
        public int PQRID { get; set; }
        public int ColadaID { get; set; }
        public string Colada { get; set; }
        public string Observaciones { get; set; }
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
        public int ColadaID { get; set; }
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