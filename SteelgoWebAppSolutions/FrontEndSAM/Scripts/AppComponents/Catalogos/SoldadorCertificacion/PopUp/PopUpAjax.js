
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
       
        $("#SoldadorCertificacionCargarPQRID").data("kendoComboBox").dataSource.data(data);
    }
)
};
function ObtenerListadoProcesoSoldaduraAjax() {

    CrearDropDownListProcesoSoldadura();


    $PQR.PQR.read({ TipoDato: 1, ConsultaProcesoSoldadura: 0, token: Cookies.get("token") }).done(function (data) {
        $("#SoldadorCertificacionProcesoSoldaduraID").data("kendoComboBox").dataSource.data(data);
        
    });


};
function ObtenerListadoTipoDePruebaAjax() {
    CrearDropDownListTipoDePrueba();

    $SoldadorCertificacion.SoldadorCertificacion.read({ TipoDato: 1, token: Cookies.get("token") }).done(function (data) {
        $("#SoldadorCertificacionTipoDePruebaID").data("kendoComboBox").dataSource.data(data);

    });

};
function ObtenerListadoPosicionAjax() {
    CrearDropDownListPosicion();
   
    $SoldadorCertificacion.SoldadorCertificacion.read({ token: Cookies.get("token"), TipoDeDato: 1 }).done(function (data) {
        $("#SoldadorCertificacionPosicionID").data("kendoComboBox").dataSource.data(data);

    });
};


function AgrarSoldadorCertificacionPopUpAjax(SoldadorCertificacionModal) {
  
    $SoldadorCertificacion.SoldadorCertificacion.create(SoldadorCertificacionModal, { token: Cookies.get("token"), Lenguaje: $("#language").val(), PasosSoldadura: TotalPasosSoldadura }).done(function (data) {
        loadingStart();
        ObtenerJSONParaGrid();
        $("#windowSoldadorCertificacion").data("kendoWindow").close();
        loadingStop();
    });

};
function EditaSoldadorCertificacionPopUpAjax(SoldadorCertificacionModal) {
    $SoldadorCertificacion.SoldadorCertificacion.update(SoldadorCertificacionModal, { token: Cookies.get("token"), Lenguaje: $("#language").val(), PasosSoldadura: TotalPasosSoldadura }).done(function (data) {
        loadingStart();
        ObtenerJSONParaGrid();
        $("#windowSoldadorCertificacion").data("kendoWindow").close();
        loadingStop();
    });

};


function ObtenerEspesoresPQRAjax(PQRIDBuscar) {

    $PQR.PQR.read({ token: Cookies.get("token"), TipoDato: 5, PQRIDABuscar: PQRIDBuscar, var1: "valoruno" }).done(function (data) {
        EspesorRellenoPQR = data[0].EspesorRelleno;
        CalcularEspesorMaximo(EspesorRellenoPQR);

    });

};


