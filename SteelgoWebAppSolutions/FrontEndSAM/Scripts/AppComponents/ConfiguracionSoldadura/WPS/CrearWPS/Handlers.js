function suscribirEventos() {
    suscribirEventoGuardar();
    suscribirEventoNombreWPS();
}

suscribirEventos();


function suscribirEventoGuardar() {
    $('.accionGuardar').click(function (e) {
        if ($('#Guardar').text() == _dictionary.DetalleAvisoLlegada0017[$("#language").data("kendoDropDownList").value()]) {
            AjaxExisteWPS(0);
        }
        else if ($('#Guardar').text() == _dictionary.DetalleAvisoLlegada0082[$("#language").data("kendoDropDownList").value()])
            opcionHabilitarView(false, "FieldSetView")
    });

    $('#btnGuardarYNuevo').click(function (e) {
        AjaxExisteWPS(1);
    });


}



function suscribirEventoNombreWPS() {
    $("#NomnreWPS").keyup(function (e) {
        $('#NomnreWPS').val($('#NomnreWPS').val().toUpperCase());
    });
}