

namespace BackEndSAM.Models.ServiciosTecnicos.ListadoRequisicion
{
    public class ListadoRequisicion
    {


    }

    public class StatusRequisicion
    {
        public int EstatusID { get; set; }
        public string Estatus { get; set; }
        public int CantidadRegistros { get; set; }
        public int Orden { get; set; }

    }

    public class InformacionRequisicionXID
    {
        public int RequisicionID { get; set; }
        public string Folio { get; set; }
        public int PruebasProyectoID { get; set; }
        public string Prueba { get; set; }
        public string FechaRequisicion { get; set; }
        public string Observacion { get; set; }
        public int EstatusID { get; set; }
        public string Estatus { get; set; }
        public int Orden { get; set; }

    }
}