
function ObtenerListadoObrerosPopUpAjax() {

    var tipo = 2;
    var idProyecto = 1;
    var TipoObrero = 'soldador';

    CrearDropDownListObrero();

    $Obrero.Obrero.read({ idProyecto, tipo, token: Cookies.get("token"), TipoObrero }).done(function (data) {
       
        $("#SoldadorCertificacionCargarObreroID").data("kendoComboBox").dataSource.data(data);
    });
};
function ObtenerListadoPQRPopUpAjax() {

    CrearDropDownListPQR();

    $PQR.PQR.read({ token: Cookies.get("token"), TipoAccion: 1 }).done(function (data) {
        console.log(data);
        $("#SoldadorCertificacionCargarPQRID").data("kendoComboBox").dataSource.data(data);
    }
)
};
function AgrarSoldadorCertificacionPopUpAjax(SoldadorCertificacionModal) {
  
    $SoldadorCertificacion.SoldadorCertificacion.create(SoldadorCertificacionModal, { token: Cookies.get("token"), Lenguaje: $("#language").val() }).done(function (data) {
        loadingStart();
        ObtenerJSONParaGrid();
        $("#windowSoldadorCertificacion").data("kendoWindow").close();
        loadingStop();
    });

};
function EditaSoldadorCertificacionPopUpAjax(SoldadorCertificacionModal) {

    $SoldadorCertificacion.SoldadorCertificacion.update(SoldadorCertificacionModal, { token: Cookies.get("token"), Lenguaje: $("#language").val() }).done(function (data) {
        loadingStart();
        ObtenerJSONParaGrid();
        $("#windowSoldadorCertificacion").data("kendoWindow").close();
        loadingStop();
    });

};