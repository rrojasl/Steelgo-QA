using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Embarque.Empaquetado
{
    public class DetallePaquete
    {
        public DetallePaquete()
        {
            PaqueteID = 0;
            Nombre = "";
            Cerrado = false;
            ProyectoID = 0;
            CuadrantePaqueteSam2 = 0;
            CuadrantePaqueteSam3 = 0;
        }

        public int PaqueteID { get; set; }
        public string Nombre { get; set; }
        public bool Cerrado { get; set; }
        public int ProyectoID { get; set; }
        public int CuadrantePaqueteSam2 { get; set; }
        public int CuadrantePaqueteSam3 { get; set; }
    }

    public class DetalleCargaPaquete
    {
        public DetalleCargaPaquete()
        {
            EmpaquetadoID = 0;
            SpoolID = 0;
            NumeroControl = "";
            Area = 0;
            Peso = 0;
            CuadranteID = 0;
            CuadranteAnteriorID = 0;
            ZonaAnteriorID = 0;
        }

        public int EmpaquetadoID { get; set; }
        public int SpoolID { get; set; }
        public string NumeroControl { get; set; }
        public decimal Area { get; set; }
        public decimal Peso { get; set; }
        public int CuadranteID { get; set; }
        public int CuadranteAnteriorID { get; set; }
        public int ZonaAnteriorID { get; set; }
    }

    public class Captura
    {
        public List<DetalleGuardadoCargaPaquete> listaDetalle { get; set; }
    }

    public class DetalleGuardadoCargaPaquete
    {
        public int Accion { get; set; }
        public int SpoolID { get; set; }
        public int CuadranteActualID { get; set; }
    }
}