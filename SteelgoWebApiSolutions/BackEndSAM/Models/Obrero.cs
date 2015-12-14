namespace BackEndSAM.Models
{
    public class Obrero
    {
        public int ObreroID { get; set; }
        public int TipoObreroID { get; set; }
        public string Codigo { get; set; }
        public string NumeroEmpleado { get; set; }
        public bool Activo { get; set; }
        public int UsuarioModificacion { get; set; }
        public string TipoObrero { get; set; }
    }
    public class TipoObreroModel
    {
        public int TipoObreroID { get; set; }
        public string TipoObrero { get; set; }
        public int TipoObreroJefe { get; set; }
        public string TipoObreroJefeNombre { get; set; }
        public bool Activo { get; set; }
        public int UsuarioModificacion { get; set; }
    }
    public class ObreroUbicacion
    {
        public int ObreroUbicacionID { get; set; }
        public int ObreroID { get; set; }
        public int PatioID { get; set; }
        public string FechaInicioLabor { get; set; }
        public string FechaFinLabor { get; set; }
        public string Nombre { get; set; }
        public string Codigo { get; set; }
        public bool Activo { get; set; }
        public int UsuarioModificacion { get; set; }
    }
}