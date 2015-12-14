
namespace BackEndSAM.Models
{
    public class TipoJunta
    {
        public int TipoJuntaID { get; set; }
        public string Codigo { get; set; }
        public string Nombre { get; set; }
        public int Calidad { get; set; }
        public int Relleno { get; set; }
        public int UsuarioID { get; set; }

    }
}