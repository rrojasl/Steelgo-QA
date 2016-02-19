using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Embarque
{
    public class Embarque
    {
        public int Accion { get; set; }
        public int EmbarqueID { get; set; }
        public int TractoID { get; set; }
        public string Tracto { get; set; }
        public int ChoferID { get; set; }
        public string Chofer { get; set; }
        public string Plana { get; set; }
        public string Estatus { get; set; }
        public int PlanaID { get; set; }
        public int TransportistaID { get; set; }
        public int ProyectoID { get; set; }
        public int DestinoID { get; set; }
    }

    public class Destinos
    {
        public string Nombre { get; set; }
        public int DestinoID { get; set; }
    }
    public class CapturaEmbarque
    {
        public List<ListaDetalles> Lista { get; set;} 
    }

    public class ListaDetalles
    {
        public int embarqueID { get; set; }
        public int tractoID { get; set; }
        public int choferID { get; set; }
        public int destinoID { get; set; }
        public int accionPlanaID1 { get; set; }
        public int accionPlanaID2 { get; set; }
        public int planaID1 {get; set;}
        public int planaID2 { get; set; }
        public int planaID3 { get; set; }
        public int planaID4 { get; set; }
    }
}