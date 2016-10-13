﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Pintura.ListadoSistemaPintura
{
    public class DetalleSistemaPintura
    {
        public int Accion { get; set; }
        public int SistemaPinturaID { get; set; }
        public string SistemaPintura { get; set; }
        //public int ProyectoID { get; set; }
        public bool AsignadoSpool { get; set; }
        public int ProyectoProcesoShotblastID { get; set; }
        public int ProyectoProcesoPrimarioID { get; set; }
        public int ProyectoProcesoIntermedioID { get; set; }
        public int ProyectoProcesoAcabadoID { get; set; }
        public string Proyecto { get; set; }
        public string Color { get; set; }
        public int PruebaPorLoteShotblast { get; set; }
        public double MetrosPorLoteShotblast { get; set; }
        public string PruebaShotblast { get; set; }
        public int PruebaPorLotePrimario { get; set; }
        public double MetrosPorLotePrimario { get; set; }
        public string PruebaPrimario { get; set; }
        public int PruebaPorLoteIntermedio { get; set; }
        public double MetrosPorLoteIntermedio { get; set; }
        public string PruebaIntermedio { get; set; }
        public int PruebaPorLoteAcabado { get; set; }
        public double MetrosPorLoteAcabado { get; set; }
        public string PruebaAcabado { get; set; }
        public List<DetallePruebas> ListaPruebasSB { get; set; }
        public List<DetallePruebas> ListaPruebasP { get; set; }
        public List<DetallePruebas> ListaPruebasI { get; set; }
        public List<DetallePruebas> ListaPruebasA { get; set; }
    }

    public class DetallePruebas
    {
        public int Accion { get; set; }
        public string Prueba { get; set; }
        public string UnidadMedida { get; set; }
        public double UnidadMin { get; set; }
        public double UnidadMax { get; set; }
    }

    public class ColorPintura
    {
        
        public string Nombre { get; set; }
    }

    public class EliminaCaptura
    {
        public List<DetalleEliminaJson> listaDetalleElimina { get; set; }
    }

    public class DetalleEliminaJson
    {
        public int SistemaPinturaID { get; set; }
        public int ProyectoProcesoID { get; set; }
    }
}