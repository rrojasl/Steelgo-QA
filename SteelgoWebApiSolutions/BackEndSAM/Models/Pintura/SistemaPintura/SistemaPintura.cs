using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Pintura.SistemaPintura
{
    public class SistemaPinturaNuevo
    {
        public int ProcesoPinturaID { get; set; }
        public string Proceso { get; set; }
        public List<UnidadMedida> listadoUnidadesMedida { get; set; }
    }
    public class UnidadMedida
    {
        public int UnidadMedidaID { get; set; }
        public string Nombre { get; set; }
    }
}