/****************************/
/*    API REST Functions    */
/****************************/

var $BackEndSAM = new $.RestClient('http://localhost:60960' + '/backendsam/api/');
var $FileManager = new $.RestClient('http://localhost:60921' + '/filemanager/api/');
var $MessagesManager = new $.RestClient('http://localhost:60921' + '/messagesmanager/api/');
var $SearchManager = new $.RestClient('http://localhost:60921' + '/searchmanager/api/');
var $SecurityManager = new $.RestClient('http://localhost:60921' + '/securitymanager/api/');
$BackEndSAM.add('DummyListadoAvisoLlegada');
$BackEndSAM.add('perfil');
$SecurityManager.add('authentication');

//DetalleAvisoLlegada
var $Plana = new $.RestClient('http://localhost:60960' + '/backendsam/api/');
var $Transportista = new $.RestClient('http://localhost:60960' + '/backendsam/api/');
var $Patio = new $.RestClient('http://localhost:60960' + '/backendsam/api/');
var $Proveedor = new $.RestClient('http://localhost:60960' + '/backendsam/api/');
var $AvisoLlegada = new $.RestClient('http://localhost:60960' + '/backendsam/api/');
var $Chofer = new $.RestClient('http://localhost:60960' + '/backendsam/api/');
var $Proyecto = new $.RestClient('http://localhost:60960' + '/backendsam/api/');
var $Camion = new $.RestClient('http://localhost:60960' + '/backendsam/api/');
var $Contacto = new $.RestClient('http://localhost:60960' + '/backendsam/api/');
var $folioEntradaMaterial = new $.RestClient('http://localhost:60960' + '/backendsam/api/');
var $FiltrosListadoEntradaMaterial = new $.RestClient('http://localhost:60960' + '/backendsam/api/');
var $TipoVehiculo = new $.RestClient('http://localhost:60960' + '/backendsam/api/');
var $Cliente = new $.RestClient('http://localhost:60960' + '/backendsam/api/');
var $TipoAviso = new $.RestClient('http://localhost:60960' + '/backendsam/api/');
var $PermisoAutorizado = new $.RestClient('http://localhost:60960' + '/backendsam/api/');
var $PermisoTramite = new $.RestClient('http://localhost:60960' + '/backendsam/api/');
var $TipoArchivo = new $.RestClient('http://localhost:60960' + '/backendsam/api/');
var $DocumentoAvisoLlegada = new $.RestClient('http://localhost:60960' + '/backendsam/api/');
var $ValidacionFolioConPermisoAduana = new $.RestClient('http://localhost:60960' + '/backendsam/api/');
var redireccionAutomatica = true;

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
$TipoVehiculo.add("TipoVehiculo");
$Cliente.add("Cliente");
$TipoAviso.add("TipoAviso");
$PermisoAutorizado.add("PermisoAutorizado");
$TipoArchivo.add("TipoArchivo");
$PermisoTramite.add("PermisoAduana");
$DocumentoAvisoLlegada.add("DocumentoAvisoLlegada");
$ValidacionFolioConPermisoAduana.add("ValidacionFolioConPermisoAduana");