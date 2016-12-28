

namespace BackEndSAM.Models.Embarque.ListadoEmbarque
{
    public class DetalleListadoEmbarque
    {
        public int EmbarqueID { get; set; }
        public string Embarque { get; set; }
        public string Proyecto { get; set; }
        public string Planas { get; set; }
        public int DestinoID { get; set; }
        public string Destino { get; set; }
        public string SolicitudPermiso { get; set; }
        public string FechaPermiso { get; set; }
        public bool ApCliente { get; set; }
        public bool ApAduana { get; set; }
        public bool OkEmbarque { get; set; }
        public bool RequierePapCliente { get; set; }
        public bool RequiereAduana { get; set; }
        public bool RequiereRevisionCliente { get; set; }
    }

    public class ElementosPorStatus
    {
        public int Pendientes { get; set; }
        public int Transito { get; set; }
    }
}