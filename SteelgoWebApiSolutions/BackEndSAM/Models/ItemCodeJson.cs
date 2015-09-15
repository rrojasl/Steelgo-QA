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
        public string ColadaNombre { get; set; }
    }

    public class ItemCodeComplemento
    {
        public string NumeroUnico { get; set; }
        public string NumeroUnicoCliente { get; set; }
        public string ItemCode { get; set; }
        public int ItemCodeID { get; set; }
        public string Descripcion { get; set; }
        public string Cedula { get; set; }
        public string TipoAcero { get; set; }
        public string D1 { get; set; }
        public string D2 { get; set; }
        public string Catidad { get; set; }
        public string MM { get; set; }
        public string Colada { get; set; }
        public string EstatusFisico { get; set; }
        public string EstatusDocumental { get; set; }
        public string TipoUso { get; set; }
        public int ProyectoID { get; set; }
    }
}