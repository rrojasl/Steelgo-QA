

namespace BackEndSAM.Models.Embarque.ListadoEmbarque
{
    public class DetalleListadoEmbarque
    {
        public int EmbarqueID { get; set; }
        public string NombreEmbarque { get; set; }
        public string NombreProyecto { get; set; }
        public string NombrePlana { get; set; }
        public string NombreDestino { get; set; }
        public string SolicitudPermiso { get; set; }
        public string FechaPermiso { get; set; }
        public bool ApCliente { get; set; }
        public bool ApAduana { get; set; }
        public bool OkEmbarque { get; set; }
        public int DestinoID { get; set; }
    }

    public class ElementosPorStatus
    {
        public bool EmbarquesEnviados { get; set; }
        public bool EmbarquesNoEnviados { get; set; }
    }
}