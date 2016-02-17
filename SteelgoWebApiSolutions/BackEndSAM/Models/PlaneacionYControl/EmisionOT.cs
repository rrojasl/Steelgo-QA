using System.Collections.Generic; 

namespace BackEndSAM.Models.PlaneacionYControl
{
    public class EmisionOT
    {
    }

    public class DetalleProyectoPrueba
    {
        public int FamiliaID { get; set; }
        public int TipoProductoID { get; set; }
        public string TipoProducto { get; set; }
        public string FamiliaAcero { get; set; }
        public string Acero { get; set; }
        public string FibeLine { get; set; }
        public List<DetalleSpoolPrueba> ListaSpools { get; set; } 
        public int ProyectoID { get; set; }
        public string Proyecto { get; set; }
        public List<DetallePatio> ListaPatio { get; set; }
    }

    public class DetalleSpoolPrueba
    {
        public int SpoolID { get; set; }
        public int Seleccionado { get; set; }
        public int Proyectado { get; set; }
        public string Proyeccion { get; set; }
        public int TipoID { get; set; }
        public string Tipo { get; set; }
        public string SpoolNombre { get; set; }
        public string Dibujo { get; set; }
        public int DiametroMaximo { get; set; }
        public int DiametroPromedio { get; set; }
        public int Peso { get; set; }
        public int Area { get; set; }
        public List<DetalleJuntasPrueba> ListaJuntas { get; set; }
    }

    public class DetalleJuntasPrueba
    {
        public int TipoJuntaID { get; set; }
        public string Fabclas { get; set; }
        public string TipoJunta { get; set; }
        public int Peqs { get; set; }
    }

    public class DetalleProyecto
    {
        public int ProyectoID { get; set; }
        public string Proyecto { get; set; }
        public List<DetallePatio> ListaPatio { get; set; }
    }

    public class DetallePatio
    {
        public int PatioID { get; set; }
        public string NombrePatio { get; set; }
    } 
}