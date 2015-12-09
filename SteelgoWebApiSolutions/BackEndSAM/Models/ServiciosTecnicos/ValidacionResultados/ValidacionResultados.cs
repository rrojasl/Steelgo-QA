using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.ServiciosTecnicos.ValidacionResultados
{
    public class ValidacionResultados
    {

    }
    public class DetalleJuntasValidacion
    {
        public int Accion { get; set; }
        public int ValidacionResultadosID { get; set; }
        public int RequisicionID { get; set; }
        public int PruebaElementoID { get; set; }
        public int DefectoID { get; set; }
        public string Nombre { get; set; }
        public string DatosJunta { get; set; }
        public string IdentificadorForaneo { get; set; }
        public string Ubicacion { get; set; }
        public string Comentario { get; set; }
        public string Conciliado { get; set; }
        public int RequisicionPruebaElementoID { get; set; }
        public List<RazonesRechazo> Defectos { get; set; }
    }
    public class RazonesRechazo
    {
        public int DefectoID { get; set; }
        public string Nombre { get; set; }
    }
    public class Estado
    {
        public int estadoID { get; set; }
        public string Nombre { get; set; }
    }

    public class Captura
    {
        public List<DetalleGuardarJson> ListaDetalles { get; set; }
    }

    public class DetalleGuardarJson
    {
        public int Accion { get; set; }
        public int ValidacionResultadosID { get; set; }
        public int RequisicionID { get; set; }
        public int DefectoID { get; set; }
        public int IdentificadorForaneo { get; set; }
        public int PruebaElementoID { get; set; }
        public string Conciliado { get; set; }
        public string Ubicacion { get; set; }
        public string Comentario { get; set; }
        public int RequisicionPruebaElementoID { get; set; }
        
    }

    }