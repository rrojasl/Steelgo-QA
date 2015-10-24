using System.Collections.Generic;

namespace BackEndSAM.Models.CapturasRapidas
{
    public class CapturasRapidas
    {
        public class IdOrdenTrabajo
        {
            public string OrdenTrabajo { get; set; }
            public List<IDS> idStatus { get; set; }
        }
    }
    public class IDS
    {
        public string Status { get; set; }

        public string IDValido { get; set; }

        public int Valor { get; set; }

        public string Proyecto { get; set; }

        public int ProyectoID { get; set; }
    }
    public class IdOrdenTrabajo
    {
        public string OrdenTrabajo { get; set; }
        public List<IDS> idStatus { get; set; }
    }
}