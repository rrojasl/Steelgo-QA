using BackEndSAM.Models.Sam3General.Cuadrante;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Embarque.Encintado
{
    public class DetalleEncintado
    {
        public int Accion { get; set; }
        public int SpoolID { get; set; }
        public string Spool { get; set; }
        public int ProyectoID { get; set; }
        public string Proyecto { get; set; }
        public int CuadranteID { get; set; }
        public string Cuadrante { get; set; }
        public int EncintadoID { get; set; }
        public bool Encintado { get; set; }
        public bool ModificadoPorUsuario { get; set; }
        public bool OkPintura { get; set; }
        public bool OkPnd { get; set; }
        public int ZonaID { get; set; }
        public string Zona { get; set; }
        public List<UbicacionCuadrante> ListaCuadrantes { get; set; }
    }

    public class DetalleGuardadoEncintado
    {
        public int Accion { get; set; }
        public int SpoolID { get; set; }
        public int ColorID { get; set; }
        public int CuadranteID { get; set; }
        public int Encintado { get; set; }
    }

    public class DetalleRutaSpool
    {
        public int SpoolID { get; set; }
        public string Spool { get; set; }
        public int ProyectoID { get; set; }
        public string Proyecto { get; set; }
        public string Ruta { get; set; }
    }

    public class CapturaEncintado
    {
        public List<DetalleGuardadoEncintado> listaDetalle { get; set; }
    }

}