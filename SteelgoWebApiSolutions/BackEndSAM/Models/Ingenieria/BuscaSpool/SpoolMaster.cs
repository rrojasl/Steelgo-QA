using BackEndSAM.Models.Ingenieria.BuscaSpool;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Ingeneria.BuscaSpool
{
    public class SpoolMaster
    {
        public int ProyectoID { get; set; }
        public string ProyectoNombre { get; set; }
        public string NombreLoop { get; set; }
        public string Dibujo { get; set; }
        public string PND { get; set; }
        public bool RequierePWHT { get; set; }
        public int RevisionCliente { get; set; }
        public string RevisionSteelgo { get; set; }
        public string Acero { get; set; }
        public string Especificacion { get; set; }
        public double PDI { get; set; }
        public string SistemaPintura { get; set; }
        public string ColorPintura { get; set; }

        public List<DetalleSalida> DetalleSalidas { get; set; }
    }

    public class DetalleSalida
    {
        public string NombreLoop { get; set; }
        public int SpoolID { get; set; }
        public int Posicion { get; set; }
        public int RevisionCliente { get; set; }
        public string RevisionSteelgo { get; set; }
        public string SistemaPinturaID { get; set; }
        public string SistemaPintura { get; set; }
        public string ColorPinturaID { get; set; }
        public string ColorPintura { get; set; }


        public List<DetalleSalidaAgrupado> SalidasEstandar { get; set; }
        public List<DetalleSalidaAgrupado> SalidasJuntasCerradas { get; set; }
    }

    public class DetalleSalidaAgrupado
    {
        public int PosicionSalida { get; set; }
        public string ClaveSalida { get; set; }

        public int TipoSalidaID { get; set; }
        public string TipoSalida { get; set; }
        public List<DetalleTipoSalida> TipoSalidaLista { get; set; }

        //Etiqueta y Material
        public int DetalleMaterialSpoolID { get; set; }
        public string DetalleMaterialSpool { get; set; }
        public List<DetalleMaterialSpool> DetalleMaterialSpoolLista { get; set; }

        //Catalogo
        public int SpoolItemCodeID { get; set; }
        public string SpoolItemCode { get; set; }
        public List<SpoolItemCode> SpoolItemCodeLista { get; set; }

        //Solo si Tipo es Spool y SpoolItemCodeID es ItemCode
        public string ItemCodeSelect { get; set; }

        public int DetalleJuntaSpoolID { get; set; }
        public string DetalleJuntaSpool { get; set; }
        public List<DetalleJuntaSpool> DetalleJuntaSpoolLista { get; set; }

        public int Nivel { get; set; }
        public int PosicionSalidaPadre { get; set; }
        public string ClaveSalidaPadre { get; set; }

        public int TipoCorte1ID { get; set; }
        public string TipoCorte1 { get; set; }
        public List<TipoCorte> TipoCorte1Lista { get; set; }

        public int TipoCorte2ID { get; set; }
        public string TipoCorte2 { get; set; }
        public List<TipoCorte> TipoCorte2Lista { get; set; }

        public double Cantidad { get; set; }
    }

    public class SpoolItemCode
    {
        public SpoolItemCode()
        {
            SpoolItemCodeID = 0;
            Nombre = "";
        }

        public int SpoolItemCodeID { get; set; }
        public string Nombre { get; set; }
    }

    public class DetalleItemCode
    {
        
        public string ItemCode { get; set; }
        public string D1 { get; set; }
        public string D2 { get; set; }
        public string Descipcion { get; set; }
    }

    public class TipoCorte
    {
        public TipoCorte()
        {
            TipoCorteID = 0;
            Nombre = "";
        }

        public int TipoCorteID { get; set; }
        public string Nombre { get; set; }
    }
}