using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models
{
    public class ItemCodeJson
    {
        public int ItemCodeID { get; set; }
        public int ProyectoID { get; set; }
        public int TipoPackingList { get; set; }
        public string ItemCode { get; set; }
        public string ItemCodeCliente { get; set; }
        public string Descripcion { get; set; }
        public string DescripcionIngles { get; set; }
        public Nullable<decimal> Peso { get; set; }
        public string DescripcionInterna { get; set; }
        public Nullable<decimal> Diametro1 { get; set; }
        public Nullable<decimal> Diametro2 { get; set; }
        public Nullable<int> FamiliaID { get; set; }
        public bool Activo { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public Nullable<int> Cantidad { get; set; }
        public Nullable<int> MM { get; set; }
        public int ColadaID { get; set; }
    }
}