using System.Collections.Generic;

namespace BackEndSAM.Models.Sam3General
{
    public class ListaProyectos
    {
        public ListaProyectos() {
            ProyectoID = 0;
            Nombre = "";
            PrefijoOrdenTrabajo = "";
        }
        public int ProyectoID { get; set; }
        public string Nombre { get; set; }
        public string PrefijoOrdenTrabajo { get; set; }
    }
}