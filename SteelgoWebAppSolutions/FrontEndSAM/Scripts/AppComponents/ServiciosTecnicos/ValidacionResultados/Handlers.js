function SuscribirEventos() {
    suscribirEventoGuardar();
    suscribirEventoVer();
    suscribirEventoCancelar();
    suscribirEventoRequisicion();
}

SuscribirEventos();

function suscribirEventoGuardar() {

    $('#btnGuardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#botonGuardar').text() == "Guardar") {
            //opcionHabilitarView(true, "FieldSetView");
            AjaxGuardarCaptura(ds._data);
        }
        //else if ($('#botonGuardar').text() == "Editar")
        //    opcionHabilitarView(false, "FieldSetView")
    });
}

function suscribirEventoCancelar() {
    $('#btnCancelar').click(function (e) {
        Limpiar();
    });
}


function suscribirEventoVer() {

    $('#btnVer').click(function (e) {
        AjaxObtenerJuntas();
    });
}


function Limpiar() {

    $("#Requisicion").val("");
    $("#grid").data('kendoGrid').dataSource.data([]);
}

function suscribirEventoRequisicion() {
    $("#Requisicion").keydown(function (e) {

        if (e.keyCode == 13) {

            AjaxObtenerJuntas();
        }
    });
}


