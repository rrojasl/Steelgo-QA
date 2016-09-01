using System.Collections.Generic;

namespace BackEndSAM.Models.Sam3General
{
    public class Proyectos
    {
        public Proyectos() {
            ProyectoID = 0;
            Nombre = "";
            PatioID = 0;
            PrefijoOrdenTrabajo = "";
        }
        public int ProyectoID { get; set; }
        public string Nombre { get; set; }
        public int PatioID { get; set; }
        public string PrefijoOrdenTrabajo { get; set; }
    }
}