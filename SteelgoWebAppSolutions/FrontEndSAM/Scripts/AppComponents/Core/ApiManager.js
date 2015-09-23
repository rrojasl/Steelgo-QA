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
var $URLItemCode = $BackEndSAMUri + '/backendsam/api/ItemCode?';
var $URLColada = $BackEndSAMUri + '/backendsam/api/Colada?';
var $URLItemCodeSteelgo = $BackEndSAMUri + '/backendsam/api/ObtenerRelacionItemCodeSteelgo?';
var $UrlTipoUso = $BackEndSAMUri + '/backendsam/api/TipoUso?';
var $UrlDummyDespacho = $BackEndSAMUri + '/backendsam/api/DummyDespacho?';
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
var $ObtenerDatosFolioAvisoEntrada = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $ObtenerDatosFolioLlegadaMaterial = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $TipoPackingList = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $TipoUso = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $ListadoCuantificacion = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $ValidarItemCodeNuCuantificacion = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DummyObtenerColadasPorProyecto = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Familia = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $ItemCode = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $ItemCodeSteelgo = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Fabricantes = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $TipoAcero = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DummyColada = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DummyCambiarEstatusCuantificacion = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DummyOrdenRecepcionFoliosAvisoEntrada = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DummyOrdenRecepcionItemCode = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DummyGridOrdenRecepcion = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $OrdenRecepcion = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $NumeroUnico = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $OrdenAlmacenaje = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $GenerarOrdenAlmacenaje = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $FoliosCuantificacion = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $CargarGridCuantificacion = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Colada = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $GuardarFolioLlegadaCuantificacion = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $CambiarEstatusCuantificacion = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $ComplementarRecepcion = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $ListadoMateriales = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Almacenaje = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DetalleNumeroUnico = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $ListadoMaterialesPorItemCode = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DummyDespacho = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
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
$ObtenerDatosFolioAvisoEntrada.add("ObtenerDatosFolioAvisoEntrada");
$ObtenerDatosFolioLlegadaMaterial.add("ObtenerDatosFolioLlegadaMaterial");
$TipoPackingList.add("TipoPackingList");
$TipoUso.add("TipoUso");
$ListadoCuantificacion.add("ListadoCuantificacion");
$ValidarItemCodeNuCuantificacion.add("ValidarItemCodeNuCuantificacion");
$DummyObtenerColadasPorProyecto.add("DummyColadasPorProyecto");
$Familia.add("Familia");
$ItemCode.add("ItemCode");
$ItemCodeSteelgo.add("ItemCodeSteelgo");
$Fabricantes.add("Fabricantes");
$TipoAcero.add("TipoAcero");
$DummyColada.add("DummyColada");
$DummyCambiarEstatusCuantificacion.add("DummyCambiarEstatusCuantificacion");
$DummyOrdenRecepcionFoliosAvisoEntrada.add("DummyOrdenRecepcionFoliosAvisoEntrada");
$DummyOrdenRecepcionItemCode.add("DummyOrdenRecepcionItemCode");
$DummyGridOrdenRecepcion.add("DummyGridOrdenRecepcion");
$OrdenRecepcion.add("OrdenRecepcion");
$NumeroUnico.add("NumeroUnico");
$OrdenAlmacenaje.add("OrdenAlmacenaje");
$GenerarOrdenAlmacenaje.add("GenerarOrdenAlmacenaje");
$FoliosCuantificacion.add("FoliosCuantificacion");
$CargarGridCuantificacion.add("CargarGridCuantificacion");
$Colada.add("Colada");
$GuardarFolioLlegadaCuantificacion.add("GuardarFolioLlegadaCuantificacion");
$CambiarEstatusCuantificacion.add("CambiarEstatusCuantificacion");
$ComplementarRecepcion.add("ComplementarRecepcion");
$ListadoMateriales.add("ListadoMateriales")
$Almacenaje.add("Almacenaje");
$DetalleNumeroUnico.add("DetalleNumeroUnico");
$ListadoMaterialesPorItemCode.add("ListadoMaterialesPorItemCode");
$DummyDespacho.add("DummyDespacho");