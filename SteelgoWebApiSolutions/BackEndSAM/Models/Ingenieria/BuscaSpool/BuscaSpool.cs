using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Ingenieria.BuscaSpool
{
    
    public class DetalleSpool
    {
        public int SpoolID { get; set; }
        public string NombreSpool { get; set; }
        public int ProyectoID { get; set; }
        public string RevisionCliente { get; set; }
        public string RevisionSteelgo { get; set; }
        public int? FamiliaAcero1ID { get; set; }
        public int? FamiliaAcero2ID { get; set; }
        public string Especificacion { get; set; }
        public string SistemaPintura { get; set; }
        public string ColorPintura { get; set; }
        public decimal? PDI { get; set; }
        public string Acero1 { get; set; }
        public string Acero2 { get; set; }
        public string Cedula { get; set; }
        public string Dibujo { get; set; }
        public decimal? Peso { get; set; }
        public decimal? Area { get; set; }
    }

    public class DetalleJuntaSpool
    {
        public int JuntaSpoolID { get; set; }
        public int TipoJuntaID { get; set; }
        public string TipoJunta { get; set; }
        public string Cedula { get; set; }
        public int? FamiliaAceroMaterial1ID { get; set; }
        public string FamiliaAceroMaterial1 { get; set; }
        public int? FamiliaAceroMaterial2ID { get; set; }
        public string FamiliaAceroMaterial2 { get; set; }
        public decimal? Diametro { get; set; }
    }

    public class ListaSpool
    {
        public ListaSpool()
        {
            SpoolID = 0;
            Nombre = "Sin Definir";
        }

        public int SpoolID { get; set; }
        public string Nombre { get; set; }
    }

    public class ListaJuntaSpool
    {
        public ListaJuntaSpool()
        {
            JuntaSpoolID = 0;
            Etiqueta = "";
        }

        public int JuntaSpoolID { get; set; }
        public string Etiqueta { get; set; }
    }

    public class DetalleTipoSalida
    {
        public DetalleTipoSalida()
        {
            TipoSalidaID = 0;
            Nombre = "";
        }

        public int TipoSalidaID { get; set; }
        public string Nombre { get; set; }
    }

    public class ListaTipoCorte
    {
        public ListaTipoCorte()
        {
            TipoCorteID = 0;
            Nombre = "";
        }

        public int TipoCorteID { get; set; }
        public string Nombre { get; set; }
    }

    public class DetalleMaterialSpool
    {
        public int MaterialSpoolID { get; set; }
        public int ItemCodeID { get; set; }
        public string Etiqueta { get; set; }
        public decimal Diametro1 { get; set; }
        public decimal Diametro2 { get; set; }
        public string DescripcionMaterial { get; set; }
        public string Codigo { get; set; }
    }

    public class SpoolMasterConsulta
    {
        public int LoopID { get; set; }
        public int ProyectoID { get; set; }
        public string NombreLoop { get; set; }
        public string Dibujo { get; set; }
        public int PND { get; set; }
        public bool RequierePWHT { get; set; }
        //public string RevisionSteelgo { get; set; }
        //public int RevisionCliente { get; set; }
        //public int FamiliaAcero1ID { get; set; }
        //public int FamiliaAcero2ID { get; set; }
        //public string Especificacion { get; set; }
        //public decimal PDI { get; set; }
        //public string SistemaPintura { get; set; }
        //public string ColorPintura { get; set; }
        public List<DetalleSalidasConsulta> detalleSalidas { get; set; }

    }

    public class DetalleSalidasConsulta
    {
        public int Detalle_SalidasID { get; set; }
        public int SpoolID { get; set; }
        public string NombreSpool { get; set; }
        public int Posicion { get; set; }
        public string RevisionSteelgo { get; set; }
        public int? RevisionCliente { get; set; }
        public int? FamiliaAcero1ID { get; set; }
        public string Acero1 { get; set; }
        public int? FamiliaAcero2ID { get; set; }
        public string Acero2 { get; set; }
        public string Especificacion { get; set; }
        public decimal? PDI { get; set; }
        public string SistemaPintura { get; set; }
        public string ColorPintura { get; set; }
        public List<DetalleAgrupadoSalidasConsulta> detalleAgrupadoSalidas { get; set; }
    }

    public class DetalleAgrupadoSalidasConsulta
    {
        public int? Salidas_AgrupadoID { get; set; }
        public int? Detalle_SalidasID { get; set; }
        public int? PosicionSalida { get; set; }
        public string ClaveSalida { get; set; }
        public int? PosicionSalidaPadre { get; set; }
        public string ClaveSalidaPadre { get; set; }
        public int? Salidas_AgrupadoID_Padre { get; set; }
        public int Nivel { get; set; }
        public int TipoSalidaID { get; set; }
        public string TipoSalida { get; set; }
        public int MaterialSpoolID { get; set; }
        public string ItemCode { get; set; }
        public int? ItemCodeID { get; set; }
        public decimal? DiametroMaterialIC1 { get; set; }
        public decimal? DiametroMaterialIC2 { get; set; }
        public int? SpoolItemCodeID { get; set; }
        public string SpoolItemCode { get; set; }
        public int? MaterialItemCodeID { get; set; }
        public string MaterialItemCode { get; set; }
        public int? JuntaSpoolID { get; set; }
        public string Etiqueta { get; set; }
        public int? TipoJuntaID { get; set; }
        public string TipoJunta { get; set; }
        public string Cedula { get; set; }
        public int? FamiliaAceroMaterial1ID { get; set; }
        public string FamiliaAceroMaterial1 { get; set; }
        public int? FamiliaAceroMaterial2ID { get; set; }
        public string FamiliaAceroMaterial2 { get; set; }
        public decimal? Diametro { get; set; }
        public int? TipoCorte1ID { get; set; }
        public string TipoCorte1 { get; set; }
        public int? TipoCorte2ID { get; set; }
        public string TipoCorte2 { get; set; }
        public decimal? Cantidad { get; set; }
        public List<DetalleTipoSalida> TipoSalidaLista { get; set; }
        public List<DetalleMaterialSpool> DetalleMaterialSpoolLista { get; set; }
        public List<ListaSpool> SpoolItemCodeLista { get; set; }
        public List<ListaSpool> SpoolItemCodeListaSoporte { get; set; }
        public List<DetalleMaterialSpool> ItemCodeLista { get; set; }
        public List<ListaJuntaSpool> DetalleJuntaSpoolLista { get; set; }
        public List<ListaTipoCorte> TipoCorte1Lista { get; set; }
        public List<ListaTipoCorte> TipoCorte2Lista { get; set; }
    }

    public class SpoolMasterGuardado
    {
        public int LoopID { get; set; }
        public int ProyectoID { get; set; }
        public string NombreLoop { get; set; }
        public string Dibujo { get; set; }
        public int PND { get; set; }
        public bool RequierePWHT { get; set; }
        //public string RevisionSteelgo { get; set; }
        //public int RevisionCliente { get; set; }
        //public int FamiliaAcero1ID { get; set; }
        //public int FamiliaAcero2ID { get; set; }
        //public string Especificacion { get; set; }
        //public decimal PDI { get; set; }
        //public string SistemaPintura { get; set; }
        //public string ColorPintura { get; set; }
        public List<DetalleSalidas> detalleSalidas { get; set; }

    }

    public class DetalleSalidas
    {
        public int Detalle_SalidasID { get; set; }
        public int SpoolID { get; set; }
        public int Posicion { get; set; }
        public string RevisionSteelgo { get; set; }
        public int RevisionCliente { get; set; }
        public int FamiliaAcero1ID { get; set; }
        public int FamiliaAcero2ID { get; set; }
        public string Especificacion { get; set; }
        public decimal PDI { get; set; }
        public string SistemaPintura { get; set; }
        public string ColorPintura { get; set; }
        public List<DetalleAgrupadoSalidas> detalleAgrupadoSalidas { get; set; }
    }

    public class DetalleSalidasGuardado
    {
        public int Detalle_SalidasID { get; set; }
        public int SpoolID { get; set; }
        public int Posicion { get; set; }
        public string RevisionSteelgo { get; set; }
        public int RevisionCliente { get; set; }
        public int FamiliaAcero1ID { get; set; }
        public int FamiliaAcero2ID { get; set; }
        public string Especificacion { get; set; }
        public decimal PDI { get; set; }
        public string SistemaPintura { get; set; }
        public string ColorPintura { get; set; }
    }

    public class DetalleAgrupadoSalidas
    {
        public int Salidas_AgrupadoID { get; set; }
        public int Detalle_SalidasID { get; set; }
        public int SpoolID { get; set; }
        public int PosicionSalida { get; set; }
        public string ClaveSalida { get; set; }
        public int PosicionSalidaPadre { get; set; }
        public string ClaveSalidaPadre { get; set; }
        public int Salidas_AgrupadoID_Padre { get; set; }
        public int Nivel { get; set; }
        public int TipoSalidaID { get; set; }
        public int MaterialSpoolID { get; set; }
        public int ItemCodeID { get; set; }
        public decimal? DiametroMaterialIC1 { get; set; }
        public decimal? DiametroMaterialIC2 { get; set; }
        public int SpoolItemCodeID { get; set; }
        public int MaterialItemCodeID { get; set; }
        public int JuntaSpoolID { get; set; }
        public int TipoJuntaID { get; set; }
        public string Cedula { get; set; }
        public int FamiliaAceroMaterial1ID { get; set; }
        public int FamiliaAceroMaterial2ID { get; set; }
        public decimal Diametro { get; set; }
        public int TipoCorte1ID { get; set; }
        public int TipoCorte2ID { get; set; }
        public decimal Cantidad { get; set; }
    }
}