using DatabaseManager.Sam3;
using System.Collections.Generic;

namespace BackEndSAM.Models.GenerarRequisicion
{
    public class Pruebas
    {
        public int PruebasID { get; set; }
        public string Clave { get; set; }
        public string Nombre { get; set; }
    }
    public class JsonRequisicion
    {
        public int Accion { get; set; }
        public string Clasificacion { get; set; }
        public int PruebasClasificacionID { get; set; }
        public string Cuadrante { get; set; }
        public int Prioridad { get; set; }
        public string Proyecto { get; set; }
        public int ProyectoID { get; set; }
        public int PruebasID { get; set; }
        public int PruebaElementoID { get; set; }
        public int IdentificadorForaneo { get; set; }
        public int PruebasProyectoID { get; set; }
        public string NumeroControl { get; set; }
        public string EtiquetaJunta { get; set; }
        public bool Agregar { get; set; }
        public int RequisicionPruebaElementoID { get; set; }
        public int RequisicionID { get; set; }
        public string Folio { get; set; }
        public List<Sam3_Steelgo_Get_Calsificaciones_Result> listaClasificaciones { get; set; }

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
        public string Fecha { get; set; }
        public string Muestra { get; set; }
        public string FormatoFecha { get; set; }
    }

    public class Captura
    {
        public List<DetalleGuardarJson> listaRequisiciones { get; set; }
        public string Folio { get; set; }
        public string FechaRequisicion { get; set; }
        public string Observacion { get; set; }
        public int PruebasID { get; set; }
        public int EstatusID { get; set; }
        public int RequisicionID { get; set; }
    }
    public class DetalleGuardarJson
    {
        public string Accion { get; set; }
        public string RequisicionPruebaElementoID { get; set; }
        public string PruebaElementoID { get; set; }
        public string PruebasProyectoID { get; set; }
        public string IdentificadorForaneo { get; set; }
        public string PruebasClasificacionID { get; set; }
    }
}
