
namespace SteelGoOp.App_Code
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

        public static string YES = "YES";
        public static string NO = "NO";
        public static string DEFAULTCONNECTION = "DefaultConnection";

        public static string SELECT = "SELECT ";
        public static string FROM = " FROM ";

        public static string CLASIFICACIONPND_ = "ClasificacionPND_";
        public static string FUPCSV = "FUPcsv";

        public static string PROYECTOID = "ProyectoID";
        public static string NOMBRE = "Nombre";
        public static string VALUES = "Values";
        public static string TEXT = "Text";

        public static string METROSLINEALES = "PIPE";
        public static string METROSLINEALESTIPOACCESORIO = "ACCESORY";
        public static string DESCRIPTION = "description";
        public static string VALUE = "value";
        public static string SPOOL = "spool";
        public static string VALOR = "valor";


        #region[Especificos]
        public static string JETOLEDB = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=";
        public static string JEtOLEDBExtended = "; Extended Properties =\"Text;HDR=";
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
    public static class Extenciones
    {
        public static string CSV = ".csv";
        public static string TXT = ".txt";
    }
    public static class Rutas
    {
        public static string DESCARGAS_HTML = "../Content/Archivos/Descargas/";
        public static string DESCARGAS = "~/Content/Archivos/Descargas/";
        public static string CARGAS = "~/Content/Archivos/Cargas/";
        public static string CARGASHTML = "../Content/Archivos/Cargas/";
        public static string RESPALDO = "~/Content/Archivos/Respaldo/";
        public static string RESPALDOHTML = "../Content/Archivos/Respaldo/";
    }
    public static class Stords
    {
        public static string CLASIFICACION_PND = "CargaClasPND";
        public static string PROYECTOS = "MFP1_Proyectos";
        public static string OBTENERVISTAREVISIONCLIENTE = "MF_SP_TC_RevisionCliente";
        public static string OBTENERCATALOGOREVISION = "MF_SP_TC_Revision";
        public static string OBTENERCATALOGOESPECIFICACION = "MF_SP_TC_Especificacion";
        public static string OBTENERCATALOGOSISTEMAPINTURA = "MF_SP_TC_SistemaPintura";
        public static string OBTENERCATALOGOFAMILIAACERO = "MF_SP_TC_FamiliaAcero";
        public static string OBTENERCATALOGOCOLORPINTURA = "MF_SP_TC_ColorPintura";
        public static string OBTENERCATALOGOTIPOCORTE = "MF_SP_TC_TipoCorte";
        public static string OBTENERCATALOGOITEMCODE = "MF_SP_TC_ItemCode";
        public static string GUARDARSUBEINGENIERIA = "MF_SP_SubeIngenieria";
        public static string OBTENERCATALOGODIAMETRO = "MF_SP_TC_Cat_Diametro";
        public static string OBTENERSEGUIMIENTOJUNTAS = "ObtenerSeguimientoDeJuntasPorProyecto";
        public static string OBTENERCATALOGODATOS = "MFP1_SPOOL_CAMPOS";
        public static string ACTUALIZASPOOL = "MFP1_Actualiza_Spool";

    }
    public static class Parametros_SQL
    {
        public static string TCLASIF = "@tClasif";
        public static string TIPODATO = "@tipodato";
        public static string TIPODECARGA = "@tipodecarga";
        public static string PROYECTOID = "@proyectoid";
        public static string PATIOID = "@PATIOID";

    }
    public static class Paginas
    {
        public static string CLASIFPND = "ClasifPND";
    }
    public static class Mensajes
    {
        public static string TIPO_OBLIGATORIO = "Tipo es obligatorio";
        public static string OPERACION_OBLIGATORIO = "Operacion es obligatorio";
        public static string NO_HA_SELECCIONADO_ARCHIVO = "No ha Seleccionado un archivo.";
        public static string NO_TIENE_EXTENCION_CSV = "El archivo no tiene extención csv";
        public static string EL_ARCHIVO_NO_SE_GENERO = "El archivo de exportacion no se genero de forma correcta";

    }
    public static class _HTML
    {
        public static string A_HREF = "<a href='";
        public static string DESCARGA = "'> Descargar </a>";
    }

}