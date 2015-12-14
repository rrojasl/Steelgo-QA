using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.ServiciosTecnicos.ValidacionResultados
{
    public class RenglonEdicion
    {
        public int RequisicionPruebaElementoID { get; set; }
        public string SpoolJunta { get; set; }
        public string Ubicacion { get; set; }
        public int RequisicionID { get; set; }
        public int PruebaElementoResultadoID { get; set; }
        public List<RazonesRechazo> Defectos { get; set; }

    }

    public class DetalleDefectos
    {
        public int Accion { get; set; }
        public int PruebaElementoDefectoID { get; set; }
        public int PruebaElementoResultadoID { get; set; }
        public int DefectoID { get; set; }
        public string Nombre { get; set; }
        public string InicioDefecto { get; set; }
        public string FinDefecto { get; set; }
        public List<RazonesRechazo> Defectos { get; set; }
    }

    public class DetalleJuntasValidacion
    {
        public int Accion { get; set; }
        public int ValidacionResultadosID { get; set; }
        public int RequisicionID { get; set; }
        public int PruebaElementoResultadoID { get; set; }
        public int DefectoID { get; set; }
        public string Nombre { get; set; }
        public string DatosJunta { get; set; }
        public string IdentificadorForaneo { get; set; }
        public string Ubicacion { get; set; }
        public string Comentario { get; set; }
        public int Conciliado { get; set; }
        public string NombreConciliado { get; set; }
        public string DatosDefecto { get; set; }
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
        public int PruebaElementoResultadoID { get; set; }
        public int DefectoID { get; set; }
        public string Conciliado { get; set; }
        public string Comentario { get; set; }
    }

    public class Defectos
    {
        public List<DetalleGuardarDefectos> ListaDetalles { get; set; }
    }

    public class DetalleGuardarDefectos
    {
        public int Accion { get; set; }
        public int PruebaElementoDefectoID { get; set; }
        public int PruebaElementoResultadoID { get; set; }
        public int DefectoID { get; set; }
        public string InicioDefecto { get; set; }
        public string FinDefecto { get; set; }
    }



}