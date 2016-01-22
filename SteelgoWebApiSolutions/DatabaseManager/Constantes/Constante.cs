
namespace DatabaseManager.Sam3
{

    public static class GenericosString
    {
        #region[Caracteres]
        public static string VACIO = "";
        public static string UNESPACIOBCO = " ";
        public static string ASTERISCO = "*";
        public static string DIAGONAL = "/";
        public static string DIAGONALINVERTIDA = "\\";
        public static string CORCHETEABRE = "[";
        public static string CORCHETCIERRA = "]";
        public static string TILDE = "~";
        public static string COMILLADOBLE = "\"";
        public static string GUIONBAJO = "_";
        public static string DOSPUNTOS = ":";
        public static string GUINMEDIO = "-";
        public static string PUNTO = ".";
        #endregion
    }
    public static class GenericosChar
    {
        public static char UNESPACIOBCO = ' ';
        public static char COMA = ',';
    }
    public static class Numeros
    {
        public static int CERO = 0;
        public static int UNO = 1;
        public static int DOS = 2;
        public static int TRES = 3;
        public static int CUATRO = 4;
        public static int CINCO = 5;
        public static int SEIS = 6;
        public static int SIETE = 7;
        public static int OCHO = 8;
        public static int NUEVE = 9;
        public static int DIES = 10;
        public static int ONCE = 11;
        public static int DOCE = 12;
        public static int TRECE = 13;
        public static int CATORCE = 14;
        public static int QUINCE = 15;
        public static int DIESISEIS = 16;
        public static int DIESISIETE = 17;
        public static int DIESIOCHO = 18;
        public static int DIESINUEVE = 19;
        public static int VEINTE = 20;
    }

    public static class Stords
    {
        public static string GUARDARCAPTURAENTREGARESULTADOS = "Sam3_ServiciosTecnicos_Guardar_EntregaResultados";
        public static string GUARDARCAPTURAARMADO = "Sam3_Armado_JuntaArmado";
        public static string GUARDARCAPTURAINSPECCIONVISUALDIMENSIONAL = "Sam3_Inspeccion_VisualDimensional";
        public static string GUARDARINSPECCIONDIMENSIONAL = "Sam3_Inspeccion_Dimensional";
        public static string GUARDARCAPTURASOLDADURA = "Sam3_Soldadura_JuntaSoldadura";
        public static string GUARDARCAPTURAREQUISICIONASIGNACION = "Sam3_ServiciosTecnicos_Guardar_RequisicionAsignacion";
        public static string GUARDARGENERARREQUISICICION = "Sam3_ServiciosTecnicos_Requisicion";
        public static string GENERARFOLIOREPORTESIMPRESION = "Sam3_ServiciosTecnicos_GeneraIDReporteImpresion";
        public static string GUARDAREMBARQUEMARCADO = "Sam3_Embarque_Marcado";
        public static string GUARDARDEFECTOSVALIDACIONRESULTADOS = "Sam3_ServiciosTecnicos_Guardar_DefectosValidacionResultados";
        public static string GUARDARVALIDACIONRESULTADOS = "dbo.Sam3_ServiciosTecnicos_Guardar_ValidacionResultados";
        public static string GUARDARLISTADOEMBARQUE = "Sam3_Embarque_Set_ListadoEmbarque";
        public static string ACTUALIZARCUADRANTE = "dbo.Sam3_Embarque_Set_Paquete";
        public static string EMBARQUECARGA = "dbo.Sam3_Embarque_Set_Carga";
        public static string CierraPlana = "dbo.Sam3_Embarque_CierraPlana";
        public static string ACTUALIZARREVISIONEMBARQUESPOOL = "Sam3_Embarque_Set_RevisionSpool";
        public static string GUARDACAPTURAREPORTEPRUEBAS = "Sam3_ServiciosTecnicos_Guardar_CapturaReportePruebas";
        public static string GUARDACARGACARROBACKLOG = "Sam3_Pintura_Guardar_CargaCarroBackLog";
        public static string GUARDACAPTURAPINTURASPOOLCARGA = "Sam3_Pintura_Guardar_CargaMedioTransporte";
        public static string GUARDACAPTURAPINTURASPOOLDESCARGA = "Sam3_Pintura_Guardar_DesCargaMedioTransporte";
        public static string GUARDACAPTURAAVANCE = "Sam3_Pintura_Guarda_CapturaAvance";
        public static string GUARDACAPTURAAVANCEINTACABADO = "Sam3_Pintura_Guarda_CapturaAvanceIntAcabado";
        public static string GUARDACAPTURANUEVOMEDIOTRANSPORTE = "Sam_Pintura_Guardar_NuevoMedioTransporte";
        public static string SETCIERRACARRO = "Sam3_Pintura_Set_CierraCarro";
    }

    public static class ConstantesSteelGo
    {
        public static string PruebasNombre = "Entrega Resultados";
    }

}