using System.Web.Http;

namespace BackEndSAM.Models
{
    public class PQR : ApiController
    {

        //Grid PQR
        public string PQRID { get; set; }
        public string Nombre { get; set; }
        public bool PREHEAT { get; set; }
        public bool PWHT { get; set; }
        public string EspesorRelleno { get; set; }
        public string EspesorRaiz { get; set; }
        public string CodigoRelleno { get; set; }
        public string CodigoRaiz { get; set; }
        public string NumeroP { get; set; }
        public string GrupoMaterialBase1 { get; set; }
        public string GrupoMaterialBase2 { get; set; }
        public string Aporte { get; set; }
        public string Mezcla { get; set; }
        public string Respaldo { get; set; }
        public string GrupoF { get; set; }
        public string Codigo { get; set; }
        public string UsuarioModificacion { get; set; }
        public string FechaModificacion { get; set; }

        //NumeroP

        public int NumeroPID { get; set; }

        //ProcesoSoldadura

        public int ProcesoSoldaduraRellenoID { get; set; }
        public int ProcesoSoldaduraRaizID { get; set; }

        //Grupop
        public int GrupoMaterialBase1PID { get; set; }
        public int GrupoMaterialBase2PID { get; set; }

        //Aporte
        public int AporteID { get; set; }

        //Mezcla
        public int MezclaID { get; set; }

        //Respaldo
        public int RespaldoID { get; set; }

        //GrupoF
        public int GrupoFID { get; set; }

        //Codigo
        public int CodigoID { get; set; }

        //ValidaNombre
        public string Existe { get; set; }

    }
}
