using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.ServiciosTecnicos.AsignarRequisicion
{
    public class AsignarRequisicion
    {

    }

    public class Proveedor
    {
        public int ProveedorID { get; set; }
        public string Nombre { get; set; }
        public string Capacidad { get; set; }
    }

    public class RequisicionAsignacion
    {
        public string Clave { get; set; }
        public string Observacion { get; set; }
        public string Fecha { get; set; }
        public int RequisicionID { get; set; }

        public int CantidadJuntas { get; set; }

        public int ProveedorID { get; set; }
        public string Proveedor { get; set; }

        public List<Proveedor> ListaProveedor { get; set; }
    }

}