using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Embarque
{
    public class Marcado
    {
        public int Accion { get; set; }
        public int SpoolID { get; set; }
        public string NumeroControl { get; set; }
        public string Cuadrante { get; set; }
        public int EmbarqueMarcadoID { get; set; }
        public int Impreso { get; set; }
        public bool Etiquetado { get; set; }
        public bool ConCinta { get; set; }
        public int ColorCintaID { get; set; }
        public string ColorCinta { get; set; }
        public int AreaID { get; set; }
        public int CuadranteID { get; set; }
        public List<Color> ListadoColores { get; set; }
    }
    public class CamposPredeterminados
    {
        public string Impreso { get; set; }
        public string Etiquetado { get; set; }
        public string ConCinta { get; set; }
    }
    public class Color
    {
        public string Nombre { get; set; }
        public int ColorID { get; set; }
    }

    public class Captura
    {
        public List<listaMarcado> ListaDetalles { get; set; }   
    }

    public class listaMarcado
    {
        public int EmbarqueMarcadoID { get; set; }
        public string SpoolID { get; set; }
        public int Impreso { get; set; }
        public int Etiquetado { get; set; }
        public int ColorCintaID { get; set; }
    }

}