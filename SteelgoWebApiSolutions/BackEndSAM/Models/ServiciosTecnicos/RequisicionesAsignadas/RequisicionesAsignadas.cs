

namespace BackEndSAM.Models.ServiciosTecnicos.RequisicionesAsignadas
{
    public class RequisicionesAsignadas
    {
    }

    public class StatusRequisicion
    {
        public int EstatusID { get; set; }
        public string Estatus { get; set; }
        public int CantidadRegistros { get; set; }
        public int Orden { get; set; }

    }

    public class InformacionRequisicionAsignadaXID
    {

        public string FolioTexto { get; set; }
        public string Folio { get; set; }
        public string Clave { get; set; }
        public string FechaAsignacion { get; set; }
        public string Observacion { get; set; }

        public string Nombre { get; set; }
    }
}