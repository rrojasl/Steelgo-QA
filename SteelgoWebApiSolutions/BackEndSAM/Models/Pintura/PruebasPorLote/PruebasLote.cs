using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Pintura.PruebasPorLote
{
    
    public class ProcesosPintura
    {
        public int ProcesoPinturaID { get; set; }
        public string ProcesoPintura { get; set; }

        public ProcesosPintura()
        {
            this.ProcesoPinturaID = 0;
            this.ProcesoPintura = "";
        }
    }
    public class SistemaPinturaLotes
    {
        public int SistemaPinturaID { get; set; }
        public string SistemaPintura { get; set; }
        public int SistemaPinturaProyectoID { get; set; }
        public SistemaPinturaLotes()
        {
            this.SistemaPinturaID = 0;
            this.SistemaPintura = "";
            this.SistemaPinturaProyectoID = 0;
        }
    }
    public class Pruebas
    {
        public int PruebaProcesoPinturaID { get; set; }
        public string Prueba { get; set; }

        public Pruebas()
        {
            this.PruebaProcesoPinturaID = 0;
            this.Prueba = "";
        }
    }

    public class Lotes
    {
        public int LoteID { get; set; }
        public string Nombre { get; set; }

        public Lotes()
        {
            this.LoteID = 0;
            this.Nombre = "";
        }
    }
}