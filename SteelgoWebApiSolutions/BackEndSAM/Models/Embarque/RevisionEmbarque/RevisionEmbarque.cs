using System;
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

    public partial class DetalleRevisionEmbarque
    {
        public int SpoolID { get; set; }
        public string NumeroControl { get; set; }
        public int ProyectoID { get; set; }
        public int EmbarqueID { get; set; }
        public string Embarque { get; set; }
        public int Estatus { get; set; }
        public string Destino { get; set; }
        public int RevisionEmbarqueID { get; set; }
        public bool Llego { get; set; }
        public bool NoLlego { get; set; }
        public bool LlegoComentario { get; set; }
        public string Comentario { get; set; }
    }

}