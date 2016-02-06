using System; 

namespace BackEndSAM.Models.Cuadrante
{
    public class Cuadrante
    {
        public int CuadranteID { get; set; }
        public string Nombre { get; set; }
        public Nullable<int> AreaID { get; set; }
        public Nullable<int> PatioID { get; set; }
    }
}

   