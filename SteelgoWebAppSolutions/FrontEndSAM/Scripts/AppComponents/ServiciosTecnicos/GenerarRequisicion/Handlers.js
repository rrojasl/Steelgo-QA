function SuscribirEventos() {
    suscribirEventoGuardar();
    suscribirEventoCambioTipoPrueba();
}

$("#Fecha").data("kendoDatePicker").value("");



function suscribirEventoGuardar() {
    $('#btnGuardar').click(function (e) {
        if ($('#botonGuardar').text() == "Guardar") {
            opcionHabilitarView(true, "FieldSetView");
            AjaxGuardarCaptura(ds._data);
        }
        else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });
}


function suscribirEventoCambioTipoPrueba() {
    $('#tipoPrueba').change(function (e) {
        ajaxObtenerJuntasSoldadas();
    });
}