using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Embarque.CargaEmbarque
{
    public class CargaEmbarque
    {
    }

    public class PlacaPlana
    {
        public int EmbarquePlanaID { get; set; }
        public int VehiculoID { get; set; }
        public string Placas { get; set; }
        public string estatus { get; set; }
    }

    public class Paquete
    {
        public int EmbarquePaqueteID { get; set; }
        public string Folio { get; set; }
    }

   

    public class DetalleCargaCaptura
    {
        public int EmbarquePlanaSpoolID { get; set; }
        public int Accion { get; set; }
        public int Consecutivo { get; set; }
        public int OrdenTrabajoSpoolID { get; set; }
        public int SpoolID { get; set; }
        public string NumeroControl { get; set; }
        public string Paquete { get; set; }
        public int EmbarquePaqueteID { get; set; }
        public double Peso { get; set; }
        public int CuadranteID { get; set; }
        public string Cuadrante { get; set; }
        public string Mensaje { get; set; }
        public bool Seleccionado { get; set; }
    }

    public class Captura
    {
        public List<EmbarqueCargaSpool> Detalles { get; set; }
    }

    public class EmbarqueCargaSpool
    {
        public int Accion { get; set; }
        public int SpoolID { get; set; }
        public int CuadranteID { get; set; }
    }

    public class CierraPlana
    {
        public int EmbarquePlanaID { get; set; }
    }

    public class NuevoPaquete
    {
        public int EmbarquePaqueteID { get; set; }

        public string Folio { get; set; }
    }
}