using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.MedicionesClimatologicas
{
    public class CondicionClimatologica
    {
        public int CondicionClimatologicaID { get; set; }
        public int Accion { get; set; }
        public int PatioID { get; set; }
        public int ZonaID { get; set; }
        public decimal TemperaturaAmbiente { get; set; }
        public int HerramientaTempAmbienteID { get; set; }
        public decimal PorcentajeHumedad { get; set; }
        public int HerramientaHumedadID { get; set; }
        public decimal PuntoRocio { get; set; }
        public int HerramientaPuntoRocioID { get; set; }
        public string CampoX { get; set; }
        public int HerramientaCampoXID { get; set; }
        public DateTime FechaToma { get; set; }
        public TimeSpan HoraToma { get; set; }

        //Activo bit Unchecked
        //UsuarioModificacion int Checked
        //FechaModificacion datetime    Checked
        //      Unchecked

    }
}