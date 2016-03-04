using System.Collections.Generic; 

namespace FrontEndSAM.Models.PlaneacionYControl.DetalleOrdenesTrabajo
{
    public class DetalleOrdenesTrabajo
    {
    }

    public class Talleres
    {
        public List<DetalleTaller> taller { get; set; } 
    }

    public class DetalleTaller
    {
        public int ID { get; set; }
        public int Capacidad { get; set; }
        public List<DetalleProyecciones> Proyecciones { get; set; }
    }

    public class DetalleProyecciones
    {
        public int ID { get; set; }
        public string Nombre { get; set; }
        public double Automatico { get; set; }
        public double Automan { get; set; }
        public double Manual { get; set; }
        public List<DetalleSpool> SpoolDetalle { get; set; }
    }

    public class DetalleSpool
    {
        public int SpoolID { get; set; }
        public int Seleccionado { get; set; }
        public int Proyectado { get; set; }
        public string Proyeccion { get; set; }
        public int TipoID { get; set; }
        public string Tipo { get; set; }
        public decimal Juntas { get; set; }
        public decimal Peqs { get; set; }
        public string SpoolNombre { get; set; }
        public string Dibujo { get; set; }
        public decimal DiametroMaximo { get; set; }
        public string DiametroPromedio { get; set; }
        public decimal Peso { get; set; }
        public decimal Area { get; set; }
        public List<DetalleJuntas> ListaJuntas { get; set; }
    }

    public class DetalleJuntas
    {
        public int TipoJuntaID { get; set; }
        public int FabclasID { get; set; }
        public string Fabclas { get; set; }
        public string TipoJunta { get; set; }
        public string Junta { get; set; }
        public decimal Peqs { get; set; }
    }

    public class ProyeccionDetalle
    {
        public int ProyeccionID { get; set; }
        public string Proyeccion { get; set; }
        public int ProyectoID { get; set; }
        public string Proyecto { get; set; }
        public int OrdenTrabajo { get; set; }
        public List<DetalleSpool> ListaSpools { get; set; }
    }
}