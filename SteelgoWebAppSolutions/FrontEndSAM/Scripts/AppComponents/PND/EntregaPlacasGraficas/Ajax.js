function AjaxCargaListaDocumentoRecibido() {
    var token = Cookies.get("token");
    var respuesta = 1;
    $EntregaPlacasGraficas.EntregaPlacasGraficas.read({ token: token, numeroCatalogo: respuesta }).done(function (data) {
        $("#inputDocumentoRecibido").data("kendoComboBox").dataSource.data([]);
        $("#inputDocumentoRecibido").data("kendoComboBox").dataSource.data(data);
        AjaxCargaListaDocumentoEstatus();
    });

}

function AjaxCargaListaDocumentoEstatus() {
    var token = Cookies.get("token");
    var respuesta = 2;
    $EntregaPlacasGraficas.EntregaPlacasGraficas.read({ token: token, numeroCatalogo: respuesta }).done(function (data) {
        $("#inputCondicionesFisicas").data("kendoComboBox").dataSource.data([]);
        $("#inputCondicionesFisicas").data("kendoComboBox").dataSource.data(data);
        AjaxCargaListaDocumentoDefecto();
    });
}

function AjaxCargaListaDocumentoDefecto() {
    var token = Cookies.get("token");
    var respuesta = 3;
    $EntregaPlacasGraficas.EntregaPlacasGraficas.read({ token: token, numeroCatalogo: respuesta }).done(function (data) {
        $("#inputDefectos").data("kendoComboBox").dataSource.data([]);
        $("#inputDefectos").data("kendoComboBox").dataSource.data(data);
    });
}