using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.Embarque.RevisionEmbarque
{
    public class RevisionEmbarque
    {

    }

    public class DetalleRevisionEmbarque
    {
        public int SpoolID { get; set; }
        public string NumeroControl { get; set; }

        public int EmbarquePaqueteID { get; set; }
        public string Paquete { get; set; }

        public bool Llego { get; set; }

        public bool NoLlego { get; set; }

        public bool LlegoComentarios { get; set; }

        //llego con comentarios , asi está el nombre en  la bd
        public bool LlegoMas { get; set; }

        public string Comentario { get; set; }

        public int EmbarquePlanaID { get; set; }
    }

    public class Captura
    {
        public List<ActualizarDetalleRevision> Detalles { get; set; }
    }

    public class ActualizarDetalleRevision
    {
        public int EmbarquePlanaID { get; set; }
        public int SpoolID { get; set; }

        public int EmbarquePaqueteID { get; set; }

        public bool Llego { get; set; }

        public bool NoLlego { get; set; }

        //llego con comentarios , asi está el nombre en  la bd
        public bool LlegoConComentarios { get; set; }

        public bool LlegoMas { get; set; }

        public string Comentario { get; set; }

    }

    public class EmbarqueEnviado
    {
        public string Folio { get; set; }
        public int EmbarquePlanaID { get; set; }
    }
}