
namespace BackEndSAM.Models
{
    public class TrabajosAdicionales
    {
        public int TrabajoAdicionalID { get; set; }
        public int TipoTrabajoAdicionalID { get; set; }
        public string NombreCorto { get; set; }
        public string NombreExtendido { get; set; }
        public string CuentaContable { get; set; }
        public string SignoInformativo { get; set; }
        public bool Activo { get; set; }
        public string NombreTipoTrabajoAdicional{ get; set; }

    }
}