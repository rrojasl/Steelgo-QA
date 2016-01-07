function AjaxPinturaCargaMedioTransporte() {
    loadingStart();

    $MedioTransporte.MedioTransporte.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        if (data.length > 0) {
            $("#inputCarro").data("kendoDropDownList").value("");
            $("#inputCarro").data("kendoDropDownList").dataSource.data(data);

            

        } else {
            $("#inputCarro").data("kendoDropDownList").value("");
        };
        loadingStop();
    });
}

function AjaxCargarCamposPredeterminados() {
    loadingStart();
    $ListadoCamposPredeterminados.ListadoCamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: 34 }).done(function (data) {
        if (data.toLowerCase() == "spool") {
            $('input:radio[name=PinturaCargaTipoSeleccion]:nth(0)').attr('checked', true).trigger("change");
        }
        else if (data.toLowerCase() == "codigo") {
            $('input:radio[name=EmbarqueCargaTipoSeleccion]:nth(1)').attr('checked', true).trigger("change");
        }

        loadingStop();
    });

}