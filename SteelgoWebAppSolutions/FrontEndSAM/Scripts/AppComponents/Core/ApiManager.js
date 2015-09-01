/********************************************/
/********************************************/
/*********                          *********/
/*********    API Manager           *********/
/*********                          *********/
/********************************************/
/********************************************/

/****************************/
/*    Global Variables      */
/****************************/

//LOCALHOST BASE URL's

var $BackEndSAMUri = 'http://localhost:60960';
var $SecuritySAMUri = 'http://localhost:60921';
var $MessagesSAMUri = 'http://localhost:60966';
var $SearchSAMUri = 'http://localhost:60921';
var $FilesSAMUri = 'http://localhost:60921'; 

//DEVELOPMENT Steelgo BASE URL's
//var $BackEndSAMUri = 'http://192.168.1.7:60960';
//var $SecuritySAMUri = 'http://192.168.1.7:60921';
//var $MessagesSAMUri = 'http://192.168.1.7:60921';
//var $SearchSAMUri = 'http://192.168.1.7:60921';
//var $FilesSAMUri = 'http://192.168.1.7:60921';

//Combos Base URL
var $DocumentoAvisoLlegadaUploadFiles = $BackEndSAMUri+"/backendsam/api/DocumentoAvisoLlegada?folioAvisoLlegadaID=";
var $DocumentoPermisoAduana = $BackEndSAMUri + "/backendsam/api/DocumentoPermisoAduana";
var $DocumentoPaseSalidaUploadFiles = $BackEndSAMUri + "/backendsam/api/DocumentoPaseSalida?folioAvisoLlegada=";
var $DocumentoLlegadaMaterialUploadFiles = $BackEndSAMUri + "/backendsam/api/DocumentoFolioAvisoEntrada?folioAvisoEntradaID=";
var $DummyTipoAcero = $BackEndSAMUri + '/backendsam/api/DummyTipoAcero?';
var $ComboDummyItemCode = $BackEndSAMUri + '/backendsam/api/DummyItemCode?';
var $ComboDummyItemCodeSteelgo = $BackEndSAMUri + '/backendsam/api/DummyItemCodeSteelgo';

//Base API's
var $BackEndSAM = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $FileManager = new $.RestClient($FilesSAMUri + '/filemanager/api/');
var $MessagesManager = new $.RestClient($MessagesSAMUri + '/messagesmanager/api/');
var $SearchManager = new $.RestClient($SearchSAMUri + '/searchmanager/api/');
var $SecurityManager = new $.RestClient($SecuritySAMUri + '/securitymanager/api/');
//DetalleAvisoLlegada
var $Plana = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Transportista = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Patio = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Proveedor = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $AvisoLlegada = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Chofer = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Proyecto = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Camion = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Contacto = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $folioEntradaMaterial = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $FiltrosListadoEntradaMaterial = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $FiltrosListadoLlegadaMaterial = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $TipoVehiculo = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Cliente = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $TipoAviso = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $PermisoAutorizado = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $PermisoTramite = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $TipoArchivo = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DocumentoAvisoLlegada = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $ValidacionFolioConPermisoAduana = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Incidencias = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DocumentoPaseSalida = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $PaseSalida= new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DocumentoFolioAvisoEntrada = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $FolioAvisoEntrada = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $OrdenDescarga = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $dummyObtenerDatosFolioAviso = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $dummyObtenerDatosFolioLlegadaMaterial = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DummyTipoPackingList = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DummyTipoUso = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DummyGuardarFolioLlegadaCuantificacion = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DumyValidarItemCodeNuCuantificacion = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DummyObtenerColadasPorProyecto = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DummyObtenerFamiliaItemCode = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DummyObtenerFamiliaItemCodeSteelgo = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DummyItemCode = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DummyItemCodeSteelgo = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DummyFabricanteColada = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DummyAceroColada = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DummyColada = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DummyCambiarEstatusCuantificacion = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DummyOrdenRecepcionFoliosAvisoEntrada = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DummyOrdenRecepcionItemCode = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DummyGridOrdenRecepcion = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $OrdenRecepcion = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
/****************************/
/*    Document Ready        */
/****************************/

//Method to be called on the document ready and contains all the pertinent code for a partial view
function apiManagerToBeExecutedOnDocumentReady() {
    //CODE
}

/****************************/
/*    Global Functions      */
/****************************/

$BackEndSAM.add('DummyListadoAvisoLlegada');
$BackEndSAM.add('perfil');
$SecurityManager.add('authentication');

//Detalle Aviso Llegada
$Plana.add("Plana");
$Transportista.add("Transportista");
$Patio.add("Patio");
$Proveedor.add("Proveedor");
$AvisoLlegada.add("AvisoLlegada");
$Chofer.add("Chofer");
$Proyecto.add("Proyecto");
$Camion.add("Tracto");
$Contacto.add("Contacto");
$folioEntradaMaterial.add("Listado");
$FiltrosListadoEntradaMaterial.add("AvisoLlegada");
$FiltrosListadoLlegadaMaterial.add("FolioAvisoEntrada");
$TipoVehiculo.add("TipoVehiculo");
$Cliente.add("Cliente");
$TipoAviso.add("TipoAviso");
$PermisoAutorizado.add("PermisoAutorizado");
$TipoArchivo.add("TipoArchivo");
$PermisoTramite.add("PermisoAduana");
$DocumentoAvisoLlegada.add("DocumentoAvisoLlegada");
$ValidacionFolioConPermisoAduana.add("ValidacionFolioConPermisoAduana");
$Incidencias.add("DummyIncidencias")
$DocumentoPaseSalida.add("DocumentoPaseSalida");
$PaseSalida.add("PaseSalida");
$DocumentoFolioAvisoEntrada.add("DocumentoFolioAvisoEntrada");
$FolioAvisoEntrada.add("FolioAvisoEntrada");
$OrdenDescarga.add("OrdenDescarga");
$MessagesManager.add("MessageManager");
$dummyObtenerDatosFolioAviso.add("DummyObtenerDatosFolioAvisoEntrada");
$dummyObtenerDatosFolioLlegadaMaterial.add("DummyObtenerDatosFolioLlegadaMaterial");
$DummyTipoPackingList.add("DummyTipoPackingList");
$DummyTipoUso.add("DummyTipoUso");
$DummyGuardarFolioLlegadaCuantificacion.add("DummyGuardarFolioLlegadaCuantificacion");
$DumyValidarItemCodeNuCuantificacion.add("DumyValidarItemCodeNuCuantificacion");
$DummyObtenerColadasPorProyecto.add("DummyColadasPorProyecto");
$DummyObtenerFamiliaItemCode.add("FamiliaAcero");
$DummyObtenerFamiliaItemCodeSteelgo.add("FamiliaAcero");
$DummyItemCode.add("DummyItemCode");
$DummyItemCodeSteelgo.add("DummyItemCodeSteelgo");
$DummyFabricanteColada.add("DummyFabricante");
$DummyAceroColada.add("DummyAcero");
$DummyColada.add("DummyColada");
$DummyCambiarEstatusCuantificacion.add("DummyCambiarEstatusCuantificacion");
$DummyOrdenRecepcionFoliosAvisoEntrada.add("DummyOrdenRecepcionFoliosAvisoEntrada");
$DummyOrdenRecepcionItemCode.add("DummyOrdenRecepcionItemCode");
$DummyGridOrdenRecepcion.add("DummyGridOrdenRecepcion");
$OrdenRecepcion.add("OrdenRecepcion");