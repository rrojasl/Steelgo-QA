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
        public int? FamiliarAcero1ID { get; set; }
        public int? FamiliarAcero2ID { get; set; }
        public string Especificacion { get; set; }
        public string SistemaPintura { get; set; }
        public string ColorPintura { get; set; }
        public decimal? PDI { get; set; }
        public string Acero { get; set; }
        List<DetalleJsonGrid> SalidasEstandar { get; set; }
        List<DetalleJsonGrid> SalidasJuntasCerradas { get; set; }
    }

    public class DetalleJsonGrid
    {
        public int PosicionSalida { get; set; }
        public string ClaveSalida { get; set; }
        public int TipoSalidaID { get; set; }
        public string TipoSalida { get; set; }

        //Etiqueta y Material
        public int DetalleMaterialSpoolID { get; set; }
        public string DetalleMaterialSpool { get; set; }
        public List<DetalleMaterialSpool> DetalleMaterialSpoolLista { get; set; }

        //Catalogo
        public int SpoolItemCodeID { get; set; }
        public string SpoolItemCode { get; set; }        
        public string ItemCodeSelect { get; set; }
        public int DetalleJuntaSpoolID { get; set; }
        public string DetalleJuntaSpool { get; set; }
        public int Nivel { get; set; }
        public int PosicionSalidaPadre { get; set; }
        public string ClaveSalidaPadre { get; set; }
        public int TipoCorte1ID { get; set; }
        public string TipoCorte1 { get; set; }
        public int TipoCorte2ID { get; set; }
        public string TipoCorte2 { get; set; }
        public double Cantidad { get; set; }
        //Cedula: '',
        //            FamiliaAceroMaterial1ID: 0,
        //            FamiliaAceroMaterial1: '',
        //            FamiliaAceroMaterial2ID: 0,
        //            FamiliaAceroMaterial2: '',

        //Listados
        public List<DetalleTipoSalida> TipoSalidaLista { get; set; }
        public List<DetalleMaterialSpool> SpoolItemCodeLista { get; set; }
        public List<ListaTipoCorte> TipoCorte1Lista { get; set; }
        public List<ListaTipoCorte> TipoCorte2Lista { get; set; }
        public List<DetalleJuntaSpool> DetalleJuntaSpoolLista { get; set; }
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
}