﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Pintura.SistemaPinturaAplicable
{

    public class SistemaPinturaData
    {
        public SistemaPinturaData()
        {
            SistemaPinturaID = 0;
            Nombre = "";
        }
        public int SistemaPinturaID { get; set; }
        public string Nombre { get; set; }
    }

    public class ColorPintura
    {
        public ColorPintura()
        {
            SistemaPinturaColorID = 0;
            ColorPinturaID = 0;
            Nombre = "";
        }

        public int SistemaPinturaColorID { get; set; }
        public int ColorPinturaID { get; set; }
        public string Nombre { get; set; }
    }

    public class SpoolAplicableDetalle
    {
        public int Accion { get; set; }
        public int SpoolAplicableID { get; set; }
        public int OrdenTrabajoID { get; set; }
        public int SpoolID { get; set; }
        public string Spool { get; set; }
        public string NumeroControl { get; set; }
        public decimal Diametro { get; set; }
        public int SistemaPinturaID { get; set; }
        public string SistemaPintura { get; set; }
        public int SistemaPinturaColorID { get; set; }
        public int ColorPinturaID { get; set; }
        public string Color { get; set; }
        public int EstatusCaptura { get; set; }
        public List<SistemaPinturaData> ListaSistemPintura { get; set; }
    }

    public class DetalleGuardarJson
    {
        public int Accion { get; set; }
        public int SpoolAplicableID { get; set; }
        public int OrdenTrabajoID { get; set; }
        public int SpoolID { get; set; }
        public int SistemaPinturaID { get; set; }
        public int SistemaPinturaColorID { get; set; }
        public int Estatus { get; set; }
    }

    public class Captura
    {
       public List<DetalleGuardarJson> detalle { get; set; }
    }
}