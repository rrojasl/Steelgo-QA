﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Embarque.RevisionEmbarque
{
    public class RevisionEmbarque
    {
    }

    public class EmbarqueEnviado
    {
        public EmbarqueEnviado ()
        {
            EmbarqueID = 0;
            Nombre = "";
            ProyectoID = 0;
            Estatus = 0;
            Destino = "";
        }

        public int EmbarqueID { get; set; }
        public string Nombre { get; set; }
        public int ProyectoID { get; set; }
        public int Estatus { get; set; }
        public string Destino { get; set; }
    }

    public class DetalleRevisionEmbarque
    {
        public int Accion { get; set; }
        public int SpoolID { get; set; }
        public string NumeroControl { get; set; }
        public int EmbarqueID { get; set; }
        public int EmbarqueEstatusID { get; set; }
        public string Paquete { get; set; }
        public int DetalleRevisionID { get; set; }
        public bool Llego { get; set; }
        public bool NoLlego { get; set; }
        public bool LlegoComentario { get; set; }
        public string Comentario { get; set; }
        public bool CapturaManual { get; set; }
        public bool ModificadoPorUsuario { get; set; }
    }

    public class DetalleSpoolAgregar
    {
        public int Accion { get; set; }
        public int ProyectoID { get; set; }
        public int SpoolID { get; set; }
        public string NumeroControl { get; set; }
        public int EmpaquetadoID { get; set; }
        public int DetalleCargaID { get; set; }
        public int EmbarqueID { get; set; }
        public string Embarque { get; set; }
        public int EmbarqueEstatusID { get; set; }
        public int PaqueteID { get; set; }
        public string Paquete { get; set; }
        public int DetalleRevisionID { get; set; }
        public bool Llego { get; set; }
        public bool NoLlego { get; set; }
        public bool LlegoComentario { get; set; }
        public string Comentario { get; set; }
        public bool CapturaManual { get; set; }
        public bool ModificadoPorUsuario { get; set; }
    }

    public class DetallePaqueteAgregar
    {
        public int Accion { get; set; }
        public int ProyectoID { get; set; }
        public int SpoolID { get; set; }
        public string NumeroControl { get; set; }
        public int EmpaquetadoID { get; set; }
        public int CargaPlanaID { get; set; }
        public string Plana { get; set; }
        public int EmbarqueID { get; set; }
        public string Embarque { get; set; }
        public int EmbarqueEstatusID { get; set; }
        public int PaqueteID { get; set; }
        public string Paquete { get; set; }
        public int DetalleRevisionID { get; set; }
        public bool Llego { get; set; }
        public bool NoLlego { get; set; }
        public bool LlegoComentario { get; set; }
        public string Comentario { get; set; }
        public bool CapturaManual { get; set; }
        public bool ModificadoPorUsuario { get; set; }
    }
}