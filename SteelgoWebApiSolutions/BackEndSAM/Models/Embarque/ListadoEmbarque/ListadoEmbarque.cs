

using BackEndSAM.Models.Sam3General.OpcionValidacion;
using System.Collections.Generic;

namespace BackEndSAM.Models.Embarque.ListadoEmbarque
{

    public class ListadoDestino
    {
        public ListadoDestino()
        {
            DestinoID = 0;
            Destino = "";
        }

        public int DestinoID { get; set; }
        public string Destino { get; set; }
    }

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
        public string FolioSolicitudPermiso { get; set; }
        public string FechaSolicitudPermiso { get; set; }
        public bool RequierePapCliente { get; set; }
        public bool RequierePermisoAduana { get; set; }
        public bool RequiereRevisionCliente { get; set; }
        public int AprobadoCliente { get; set; }
        public string AprobadoClienteDesc { get; set; }
        public int AprobadoAduana { get; set; }
        public string AprobadoAduanaDesc { get; set; }
        public bool OkEmbarque { get; set; }
        public bool Enviar { get; set; }
        public int CapturaEnvioID { get; set; }
        public bool ModificadoPorUsuario { get; set; }
        public bool RowOk { get; set; }
        public List<ListadoDestino> listaDestino { get; set; }
        public List<DetalleOpcionValidacion> listaEstatus { get; set; }
        
    }

    public class ElementosPorStatus
    {
        public int Pendientes { get; set; }
        public int Transito { get; set; }
    }
    
}