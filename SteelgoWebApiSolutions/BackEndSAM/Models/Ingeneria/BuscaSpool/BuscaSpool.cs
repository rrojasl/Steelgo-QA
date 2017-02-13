using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Ingenieria.BuscaSpool
{
    
    public class DetalleSpool
    {
        public int SpoolID { get; set; }
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
            Nombre = "";
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

    public class DetalleMaterialSpool
    {

        public int ItemCodeID { get; set; }
        public string Etiqueta { get; set; }
        public decimal Diametro1 { get; set; }
        public decimal Diametro2 { get; set; }
        public string DescripcionMaterial { get; set; }
        public string Codigo { get; set; }
    }
}