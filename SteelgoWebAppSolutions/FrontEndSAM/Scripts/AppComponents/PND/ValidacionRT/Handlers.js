SuscribirEventos();

function SuscribirEventos() {
    suscribirEventoCancelar();
    suscribirEventoProyecto();
    suscribirEventoProveedor();
    suscribirEventoTipoPrueba();
    suscribirEventoRequisicion();
}

function suscribirEventoCancelar() {
    $('#btnCancelar').click(function (e) {
        Limpiar();
    });
}

function Limpiar() {
    $("#Requisicion").val("");
    $("#grid").data('kendoGrid').dataSource.data([]);
}

function suscribirEventoProyecto() {
    $("#inputProyecto").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProyectoID",
        suggest: true,
        filter: "contains",
        change: function (e) {
        }
    });
}

function suscribirEventoProveedor() {
    $("#inputProveedor").kendoComboBox({
        dataTextField: "",
        dataValueField: "",
        suggest: true,
        filter: "contains",
        change: function (e) {
        }
    });
}

function suscribirEventoTipoPrueba() {
    $("#inputTipoPrueba").kendoComboBox({
        dataTextField: "",
        dataValueField: "",
        suggest: true,
        filter: "contains",
        change: function (e) {
        }
    });
}

function suscribirEventoRequisicion() {
    $("#inputRequisicion").kendoComboBox({
        dataTextField: "FolioTexto",
        dataValueField: "Folio",
        suggest: true,
        filter: "contains",
        change: function (e) {
        }
    });
}

function opcionHabilitarView(valor, name) {
    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $("#Requisicion").data("kendoComboBox").enable(false);

        $('#Guardar1').text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar").text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);

    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("#Requisicion").data("kendoComboBox").enable(true);
        $('#Guardar1').text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);

    }
}