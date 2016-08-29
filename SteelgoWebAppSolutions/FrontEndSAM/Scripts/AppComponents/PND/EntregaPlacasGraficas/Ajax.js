function AjaxCargarCamposPredeterminados() {
    console.log("Hola personi!");
}

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
    AjaxObtieneDetalleRequisicion();
}

function AjaxObtieneDetalleRequisicion() {
    var token = Cookies.get("token");
    $EntregaPlacasGraficas.EntregaPlacasGraficas.read({ token: token, proyectoID: 0, proveedorID: 0, requisicionID: 0 }).done(function (data) {
        $("#grid").data("kendoGrid").dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;
        if(data.length>0){
            for (var i = 0; i < data.length; i++) {
                ds.add(data[i]);
            }
        }
    });
}

function AjaxGuardarCaptura(ds) {
    if (ds._data.length > 0) {

        if (validaInformacion(ds._data)) {
            //$EntregaPlacasGraficas.EntregaPlacasGraficas.create({ token: token, proyectoID: 0, proveedorID: 0, requisicionID: 0 }).done(function (data) {
                
            //});
            disableEnableView(true);
        } else {
            ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                iframe: true,
                title: _dictionary.CapturaAvanceIntAcabadoMensajeErrorGuardado[$("#language").data("kendoDropDownList").value()],
                visible: false, //the window will not appear before its .open method is called
                width: "auto",
                height: "auto",
                modal: true,
                animation: {
                    close: false,
                    open: false
                }
            }).data("kendoWindow");

            ventanaConfirm.content(_dictionary.CapturaGuardarInformacionConNumerosUnicos[$("#language").data("kendoDropDownList").value()] +
                "</br><center><button class='btn btn-blue' id='noButton'> Ok</button></center>");

            ventanaConfirm.open().center();
        }
    } else {
        displayNotify("", "No hay datos para guardar", "1");
    }
}
