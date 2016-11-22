using BackEndSAM.Models.Sam3General.Cuadrante;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Embarque.Encintado
{
    public class DetalleCaptura
    {
        
        public int SpoolID { get; set; }
        public string Spool { get; set; }
        public int ProyectoID { get; set; }
        public string Proyecto { get; set; }        
        public int? CuadranteID { get; set; }
        public string Cuadrante { get; set; }
        public int EncintadoID { get; set; }
        public bool Encintado { get; set; }
        public int EtiquetadoID { get; set; }
        public bool Etiquetado { get; set; }
        public int ColorID { get; set; }
        public string NombreColor { get; set; }
        public bool OkPintura { get; set; }
        public bool OkPND { get; set; }
        public int? ZonaID { get; set; }
        public string Zona { get; set; }
        public bool ModificadoPorUsuario { get; set; }
        public List<UbicacionCuadrante> ListaCuadrantes { get; set; }
        public List<ColorEncintado> ListaColoresCinta { get; set; }
        public int Accion { get; set; }
    }
}