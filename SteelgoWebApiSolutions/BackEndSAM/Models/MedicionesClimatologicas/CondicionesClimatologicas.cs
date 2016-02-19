using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.MedicionesClimatologicas
{
    public class CondicionClimatologica
    {
        public int Accion { get; set; }
        public decimal ZonaID { get; set; }
        public int CondicionClimatologicaID { get; set; }
        public decimal TemperaturaAmbiente { get; set; }
        public decimal PorcentajeHumedad { get; set; }
        public decimal PuntoRocio { get; set; }
        public string CampoX { get; set; }
        public DateTime FechaToma { get; set; }
        public TimeSpan HoraToma { get; set; }
        public int EquipoTomaID { get; set; }

        //Activo bit Unchecked
        //UsuarioModificacion int Checked
        //FechaModificacion datetime    Checked
        //      Unchecked

    }
}