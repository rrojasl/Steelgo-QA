function AjaxCargarCamposPredeterminados() {
    //$CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoID }).done(function (data) {
    //    if (data == "sin captura") {
    //        $('input:radio[name=Muestra]:nth(0)').trigger("click");
    //    }
    //    else if (data == "Todos") {
    //        $('input:radio[name=Muestra]:nth(1)').trigger("click");
    //    }
    //    loadingStop();
    //});

    AjaxCargaListadoCarro();
};

function AjaxCargaListadoCarro() {
    $DescargaCarrito.DescargaCarro.read({ token: Cookies.get("token") }).done(function (data) {
        $("#inputCarro").data("kendoComboBox").dataSource.data(data);

        if ($("#inputCarro").data("kendoComboBox").dataSource._data.length == 2) {
            $("#inputCarro").data("kendoComboBox").select(1);
            $("#inputCarro").data("kendoComboBox").trigger("change");
        }
    });
}

function AjaxCargaListadoZona() {

}

function AjaxCargaListadoCuadrante() {

}