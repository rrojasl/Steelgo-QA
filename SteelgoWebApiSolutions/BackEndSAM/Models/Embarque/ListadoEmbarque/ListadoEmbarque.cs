

namespace BackEndSAM.Models.Embarque.ListadoEmbarque
{
    public class DetalleListadoEmbarque
    {
        public int EmbarqueID { get; set; }
        public string Embarque { get; set; }
        public int EstatusEmbarqueID { get; set; }
        public int ProyectoID { get; set; }
        public string Proyecto { get; set; }
        public string Planas { get; set; }
        public int DestinoID { get; set; }
        public string Destino { get; set; }
        public string SolicitudPermiso { get; set; }
        public string FechaSolicitudPermiso { get; set; }
        public bool RequierePapCliente { get; set; }
        public bool RequiereAduana { get; set; }
        public bool RequiereRevisionCliente { get; set; }
        public bool AprobadoCliente { get; set; }
        public bool AprobadoAduana { get; set; }
        public bool OkEmbarque { get; set; }
        public bool Enviar { get; set; }
        public bool ModificadoPorUsuario { get; set; }
        public bool RowOk { get; set; }
    }

    public class ElementosPorStatus
    {
        public int Pendientes { get; set; }
        public int Transito { get; set; }
    }
}