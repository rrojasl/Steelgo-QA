using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models
{
    public class Catalogos
    {
        public string Nombre { get; set; }
    }

    public class CatalogoPatio
    {
        public string PatioID { get; set; }
        public string Nombre { get; set; }
        public string Propietario { get; set; }
        public string Descripcion { get; set; }
    }

    public class CatalogoChofer
    {
        public string Nombre { get; set; }
        public string TransportistaNombre { get; set; }
    }
    
    public class CatalogoTransportista
    {
        public string Contacto { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Direccion { get; set; }
        public string Telefono { get; set; }
    }

    public class CatalogoTracto
    {
        public string Placas { get; set; }
        public string TarjetaCirculacion { get; set; }
        public string PolizaSeguro { get; set; }
    }

    public class CatalogoPlana
    {
        public string TractoID { get; set; }
        public string Placas { get; set; }
        public string Unidad { get; set; }
        public string Modelo { get; set; }
    }

    public class CatalogoProveedor
    {
        public string Contacto { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Direccion { get; set; }
        public string Telefono { get; set; }
    }
}